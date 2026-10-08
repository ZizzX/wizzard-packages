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
