#!/usr/bin/env node
/**
 * The brief a new session starts from: the "Now" section of docs/PLAN.md, the live state of the
 * project board, the last merged pull requests, and any work left uncommitted. It is wired as a
 * SessionStart hook in .claude/settings.json, whose stdout the session receives as context.
 *
 * A brief must never cost a session its start. Every source is optional, and the whole brief
 * shares one deadline, well inside the hook's 30-second timeout: the network calls run in
 * parallel, each is killed when the shared budget runs out, and a safety timer emits whatever was
 * gathered if anything still hangs. No network, no `gh`, or a token without the `project` scope
 * all degrade to a shorter brief, never to an error.
 */
import { execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { promisify } from 'node:util';

const OWNER = 'ZizzX';
const REPO = `${OWNER}/wizzard-packages`;
const PROJECT_TITLE = 'wizzard-packages';

/** The whole brief, every source included. The hook allows 30 s; this leaves room for Node. */
const DEADLINE_MS = Number(process.env.BRIEF_DEADLINE_MS) || 15_000;
/** The board's columns, in the order a session needs to read them. */
const SHOWN = ['In progress', 'In review', 'Blocked'];
/** How many cards from the top of Ready to show. Ready's order is the work order. */
const NEXT_UP = 3;

const started = Date.now();
const remaining = () => Math.max(0, DEADLINE_MS - (Date.now() - started));
const exec = promisify(execFile);

const run = async (cmd, args) => {
  const timeout = remaining();
  if (timeout === 0) return undefined;
  try {
    const { stdout } = await exec(cmd, args, { encoding: 'utf8', timeout, windowsHide: true });
    return stdout;
  } catch {
    return undefined;
  }
};

const gh = async (args) => {
  const out = await run('gh', args);
  if (out === undefined) return undefined;
  try {
    return JSON.parse(out);
  } catch {
    return undefined;
  }
};

const now = () => {
  try {
    const plan = readFileSync(new URL('../docs/PLAN.md', import.meta.url), 'utf8');
    const section = plan.match(/^## Now\r?\n([\s\S]*?)(?=^## )/m)?.[1];
    return section?.replace(/<!--[\s\S]*?-->/g, '').trim();
  } catch {
    return undefined;
  }
};

const card = (item) => {
  const number = item.content?.number;
  return `  - ${number ? `#${number} ` : ''}${item.title ?? item.content?.title ?? '(untitled)'}`;
};

const board = async () => {
  const projects = await gh(['project', 'list', '--owner', OWNER, '--format', 'json']);
  const project = projects?.projects?.find((p) => p.title === PROJECT_TITLE);
  if (!project) return undefined;

  const listed = await gh([
    'project',
    'item-list',
    String(project.number),
    '--owner',
    OWNER,
    '--format',
    'json',
    '--limit',
    '300',
  ]);
  const items = listed?.items;
  if (!Array.isArray(items)) return undefined;

  const lines = [];
  for (const column of SHOWN) {
    const cards = items.filter((item) => item.status === column);
    if (cards.length > 0) lines.push(`${column}:`, ...cards.map(card));
  }
  const ready = items.filter((item) => item.status === 'Ready').slice(0, NEXT_UP);
  if (ready.length > 0) lines.push('Next up (top of Ready):', ...ready.map(card));
  return lines.length > 0
    ? lines.join('\n')
    : 'The board has nothing in progress, in review or ready.';
};

/** Without the board, the open stories by priority are the closest thing to it. */
const openStories = async () => {
  const issues = await gh([
    'issue',
    'list',
    '--repo',
    REPO,
    '--state',
    'open',
    '--label',
    'story',
    '--limit',
    '50',
    '--json',
    'number,title,labels',
  ]);
  if (!Array.isArray(issues)) return undefined;
  const rank = (issue) => {
    const p = issue.labels.map((l) => l.name).find((name) => /^P\d$/.test(name));
    return p ? Number(p.slice(1)) : 9;
  };
  return issues
    .sort((a, b) => rank(a) - rank(b) || a.number - b.number)
    .slice(0, 6)
    .map((issue) => `  - #${issue.number} ${issue.title}`)
    .join('\n');
};

/**
 * `gh pr list` promises a filter and a maximum, not an order, so the merge times are fetched and
 * sorted here. Otherwise a long-lived PR merged after newer-numbered ones drops out of the three.
 */
const merged = async () => {
  const prs = await gh([
    'pr',
    'list',
    '--repo',
    REPO,
    '--state',
    'merged',
    '--limit',
    '20',
    '--json',
    'number,title,mergedAt',
  ]);
  if (!Array.isArray(prs)) return undefined;
  return prs
    .sort((a, b) => String(b.mergedAt).localeCompare(String(a.mergedAt)))
    .slice(0, 3)
    .map((pr) => `  - #${pr.number} ${pr.title}`)
    .join('\n');
};

/** A status that could not be read is reported as unread, never as a clean tree. */
const workingTree = async () => {
  const [branch, status] = await Promise.all([
    run('git', ['rev-parse', '--abbrev-ref', 'HEAD']),
    run('git', ['status', '--porcelain']),
  ]);
  if (!branch) return undefined;
  const on = `On \`${branch.trim()}\``;
  if (status === undefined) {
    return `${on}; its status could not be read - check for uncommitted work before starting.`;
  }
  const dirty = status.split('\n').filter(Boolean).length;
  return dirty > 0
    ? `${on} with ${dirty} uncommitted change${dirty === 1 ? '' : 's'} - look before starting anything new.`
    : `${on}, working tree clean.`;
};

const HEADER =
  'Project brief for wizzard-packages. The plan is docs/PLAN.md, tasks are the GitHub board, and each issue carries its own spec and handoff notes; read the issue before starting it.';

let emitted = false;
const emit = (sections) => {
  if (emitted) return;
  emitted = true;
  const brief =
    sections.length > 0
      ? `${HEADER}\n\n${sections.join('\n\n')}`
      : 'Project brief unavailable: neither docs/PLAN.md nor GitHub could be read.';
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: brief },
    })
  );
};

const sections = [];
const plan = now();
if (plan) sections.push(`## Now (from docs/PLAN.md)\n${plan}`);

// The safety net: if something outlives its own timeout, the plan still reaches the session.
setTimeout(() => {
  emit(sections);
  process.exit(0);
}, DEADLINE_MS + 2_000).unref();

const [onBoard, stories, recent, tree] = await Promise.all([
  board(),
  openStories(),
  merged(),
  workingTree(),
]);

if (onBoard) {
  sections.push(`## The board\n${onBoard}`);
} else if (stories) {
  sections.push(
    `## Open stories by priority\nThe project board could not be read (it may not exist yet, or the token lacks the \`project\` scope).\n${stories}`
  );
}
if (recent) sections.push(`## Last merged\n${recent}`);
if (tree) sections.push(`## Working tree\n${tree}`);

emit(sections);
