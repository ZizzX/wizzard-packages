#!/usr/bin/env node
/**
 * The brief a new session starts from: the "Now" section of docs/PLAN.md, the live state of the
 * project board, the last merged pull requests, and any work left uncommitted. It is wired as a
 * SessionStart hook in .claude/settings.json, whose stdout the session receives as context.
 *
 * A brief must never cost a session its start. Every source is optional, every external call has
 * a timeout, and the script exits 0 whatever happens: no network, no `gh`, or a token without the
 * `project` scope all degrade to a shorter brief, never to an error.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const OWNER = 'ZizzX';
const REPO = `${OWNER}/wizzard-packages`;
const PROJECT_TITLE = 'wizzard-packages';

/** The board's columns, in the order a session needs to read them. */
const SHOWN = ['In progress', 'In review', 'Blocked'];
/** How many cards from the top of Ready to show. Ready's order is the work order. */
const NEXT_UP = 3;

const run = (cmd, args) => {
  try {
    return execFileSync(cmd, args, {
      encoding: 'utf8',
      timeout: 8000,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return undefined;
  }
};

const gh = (args) => {
  const out = run('gh', args);
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

const board = () => {
  const projects = gh(['project', 'list', '--owner', OWNER, '--format', 'json']);
  const project = projects?.projects?.find((p) => p.title === PROJECT_TITLE);
  if (!project) return undefined;

  const listed = gh([
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
  if (ready.length > 0) lines.push(`Next up (top of Ready):`, ...ready.map(card));
  return lines.length > 0
    ? lines.join('\n')
    : 'The board has nothing in progress, in review or ready.';
};

/** Without the board, the open stories by priority are the closest thing to it. */
const openStories = () => {
  const issues = gh([
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

const merged = () => {
  const prs = gh([
    'pr',
    'list',
    '--repo',
    REPO,
    '--state',
    'merged',
    '--limit',
    '3',
    '--json',
    'number,title',
  ]);
  return Array.isArray(prs)
    ? prs.map((pr) => `  - #${pr.number} ${pr.title}`).join('\n')
    : undefined;
};

const workingTree = () => {
  const branch = run('git', ['rev-parse', '--abbrev-ref', 'HEAD'])?.trim();
  const dirty = run('git', ['status', '--porcelain'])?.split('\n').filter(Boolean).length ?? 0;
  if (!branch) return undefined;
  return dirty > 0
    ? `On \`${branch}\` with ${dirty} uncommitted change${dirty === 1 ? '' : 's'} - look before starting anything new.`
    : `On \`${branch}\`, working tree clean.`;
};

const sections = [];
const plan = now();
if (plan) sections.push(`## Now (from docs/PLAN.md)\n${plan}`);

const onBoard = board();
if (onBoard) {
  sections.push(`## The board\n${onBoard}`);
} else {
  const stories = openStories();
  if (stories) {
    sections.push(
      `## Open stories by priority\nThe project board could not be read (it may not exist yet, or the token lacks the \`project\` scope).\n${stories}`
    );
  }
}

const recent = merged();
if (recent) sections.push(`## Last merged\n${recent}`);

const tree = workingTree();
if (tree) sections.push(`## Working tree\n${tree}`);

const brief =
  sections.length > 0
    ? `Project brief for wizzard-packages. The plan is docs/PLAN.md, tasks are the GitHub board, and each issue carries its own spec and handoff notes; read the issue before starting it.\n\n${sections.join('\n\n')}`
    : 'Project brief unavailable: neither docs/PLAN.md nor GitHub could be read.';

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: brief },
  })
);
