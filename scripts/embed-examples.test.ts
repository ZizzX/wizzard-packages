// @vitest-environment node
/**
 * The embed script guards every snippet the README shows, so a script that
 * stopped noticing a drift would pass CI with the documents rotting. CI's
 * `examples:check` only proves the real documents match today; these cases
 * prove the check still fails when they do not.
 *
 * The script finds the repository from its own location, so each case copies
 * it, the documents it reads and the files they embed into a scratch tree,
 * breaks one thing there, and runs it.
 */

import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

const ROOT = join(__dirname, '..');
const COPIED = [
  'scripts/embed-examples.mjs',
  'README.md',
  'packages/core/README.md',
  'packages/react/README.md',
  'packages/vue/README.md',
  'packages/devtools/README.md',
  'packages/validate/README.md',
  'packages/plugins/README.md',
  'site/src/content/docs/docs/validation.md',
  'site/src/content/docs/docs/persistence.md',
  'examples/quickstart/src',
  'examples/quickstart/install',
];

let tree = '';

const scratch = (): string => {
  tree = mkdtempSync(join(tmpdir(), 'embed-examples-'));
  for (const path of COPIED) cpSync(join(ROOT, path), join(tree, path), { recursive: true });
  return tree;
};

const run = (...args: string[]): { status: number | null; stderr: string } => {
  const result = spawnSync('node', [join(tree, 'scripts/embed-examples.mjs'), ...args], {
    encoding: 'utf8',
  });
  return { status: result.status, stderr: result.stderr };
};

const edit = (path: string, change: (text: string) => string): void => {
  const file = join(tree, path);
  writeFileSync(file, change(readFileSync(file, 'utf8')));
};

/** The whole marked block for `name`, as the script itself matches it. */
const blockOf = (name: string): RegExp =>
  new RegExp(`<!-- example:${name} -->\\n[\\s\\S]*?<!-- /example -->\\n*`, 'g');

afterEach(() => {
  rmSync(tree, { recursive: true, force: true });
});

describe('embed-examples --check', () => {
  it('passes on documents that match their sources', () => {
    scratch();
    expect(run('--check')).toMatchObject({ status: 0 });
  });

  it('fails on a source that changed, and the rewrite brings the document back', () => {
    scratch();
    edit('examples/quickstart/src/flow.ts', (text) => `${text}\n// a change\n`);

    const drifted = run('--check');
    expect(drifted.status).toBe(1);
    expect(drifted.stderr).toContain('"quickstart-flow" has drifted');

    expect(run().status).toBe(0);
    expect(run('--check').status).toBe(0);
    expect(readFileSync(join(tree, 'README.md'), 'utf8')).toContain('// a change');
  });

  it('fails on a manifest entry whose file is gone', () => {
    scratch();
    rmSync(join(tree, 'examples/quickstart/install/core.sh'));

    const result = run('--check');
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('examples/quickstart/install/core.sh, which does not exist');
  });

  it('fails on a manifest entry no document embeds', () => {
    scratch();
    for (const doc of COPIED.filter((path) => path.endsWith('README.md'))) {
      edit(doc, (text) => text.replace(blockOf('install-core'), ''));
    }

    const result = run('--check');
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('"install-core" is in the manifest but no document embeds it');
  });

  it('fails on a marker the manifest does not name', () => {
    scratch();
    edit('README.md', (text) =>
      text.replace('<!-- example:install-react -->', '<!-- example:install-nothing -->')
    );

    const result = run('--check');
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('marker "install-nothing" is not in the manifest');
  });

  it('fails on a marker a document uses twice', () => {
    scratch();
    const block = readFileSync(join(tree, 'README.md'), 'utf8').match(blockOf('install-react'));
    expect(block).not.toBeNull();
    edit('README.md', (text) => `${text}\n${block?.[0] ?? ''}`);

    const result = run('--check');
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('README.md: marker "install-react" appears more than once');
  });

  it('reads a Windows checkout as unchanged', () => {
    scratch();
    const crlf = (text: string): string => text.replace(/\r?\n/g, '\r\n');
    edit('examples/quickstart/src/flow.ts', crlf);
    edit('README.md', crlf);

    expect(run('--check')).toMatchObject({ status: 0 });
  });
});

describe('embed-examples --stage', () => {
  // A git hook exports GIT_DIR and friends, and this suite runs inside one
  // (pre-push). Inherited, they point the scratch repository's commands at the
  // real one: `git add -A` here once replaced this checkout's index with the
  // scratch tree. Every git call below, the script's included, runs without them.
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_'))
  );
  const git = (...args: string[]): string =>
    spawnSync('git', args, { cwd: tree, encoding: 'utf8', env }).stdout;
  const stage = (): { status: number | null; stderr: string } => {
    const result = spawnSync('node', [join(tree, 'scripts/embed-examples.mjs'), '--stage'], {
      encoding: 'utf8',
      env,
    });
    return { status: result.status, stderr: result.stderr };
  };
  /** The committed copy of a file: what the index holds. */
  const indexed = (path: string): string => git('show', `:${path}`);
  const onDisk = (path: string): string => readFileSync(join(tree, path), 'utf8');

  const repository = (): void => {
    scratch();
    git('init', '-q');
    git('add', '-A');
  };

  it('writes a staged source into the index copies, even when the documents were embedded by hand', () => {
    repository();
    edit('examples/quickstart/src/persist.ts', (text) => `${text}\n// a change\n`);
    git('add', 'examples/quickstart/src/persist.ts');
    // Run by hand before the commit: the working copies are current, the index ones are not.
    expect(run().status).toBe(0);

    expect(stage()).toMatchObject({ status: 0 });

    expect(indexed('packages/plugins/README.md')).toContain('// a change');
    expect(indexed('site/src/content/docs/docs/persistence.md')).toContain('// a change');
  });

  it('keeps what is not staged out of the index, and in the working copy', () => {
    repository();
    edit('examples/quickstart/src/persist.ts', (text) => `${text}\n// a change\n`);
    git('add', 'examples/quickstart/src/persist.ts');
    edit('examples/quickstart/src/validate.ts', (text) => `${text}\n// not staged\n`);
    edit('packages/plugins/README.md', (text) => `${text}\nAn edit of its own.\n`);

    expect(stage()).toMatchObject({ status: 0 });

    const readme = indexed('packages/plugins/README.md');
    expect(readme).toContain('// a change');
    expect(readme).not.toContain('An edit of its own.');
    expect(indexed('packages/validate/README.md')).not.toContain('// not staged');

    expect(onDisk('packages/plugins/README.md')).toContain('// a change');
    expect(onDisk('packages/plugins/README.md')).toContain('An edit of its own.');
  });

  it('writes nothing to the index when something is wrong', () => {
    repository();
    edit('examples/quickstart/src/persist.ts', (text) => `${text}\n// a change\n`);
    edit('README.md', (text) =>
      text.replace('<!-- example:install-react -->', '<!-- example:install-nothing -->')
    );
    git('add', 'examples/quickstart/src/persist.ts', 'README.md');

    const result = stage();

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('marker "install-nothing" is not in the manifest');
    expect(indexed('packages/plugins/README.md')).not.toContain('// a change');
  });

  it('names a file that is on disk but not in the index', () => {
    repository();
    git('rm', '-q', '--cached', 'packages/vue/README.md', 'examples/quickstart/src/persist.ts');

    const result = stage();

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      'packages/vue/README.md is listed in DOCUMENTS, which is not in the index; stage it'
    );
    expect(result.stderr).toContain(
      'points at examples/quickstart/src/persist.ts, which is not in the index; stage it'
    );
  });
});
