// @vitest-environment node
/**
 * CI's link check only proves the real documents have no dead link today.
 * These cases prove it still finds one: each kind of link it reads is written
 * into a scratch tree once pointing somewhere real and once pointing nowhere.
 */

import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { deadLinks } from './check-links.mjs';

let tree = '';

/** Writes `files` into a fresh tree, with the pages and files the links below can reach. */
const scratch = (files: Record<string, string>): string[] => {
  if (tree) rmSync(tree, { recursive: true, force: true });
  tree = mkdtempSync(join(tmpdir(), 'check-links-'));
  const all = {
    'docs/RELEASE.md': '# Release',
    'site/src/content/docs/docs/flow.md': '# The flow',
    'site/src/content/docs/errors/nav-blocked.md': '# nav-blocked',
    'site/src/pages/examples/index.astro': '',
    ...files,
  };
  for (const [path, text] of Object.entries(all)) {
    mkdirSync(dirname(join(tree, path)), { recursive: true });
    writeFileSync(join(tree, path), text);
  }
  return Object.keys(files);
};

const dead = (files: Record<string, string>): string[] => {
  const written = scratch(files);
  return deadLinks(tree, written).map(({ target }: { target: string }) => target);
};

afterEach(() => {
  rmSync(tree, { recursive: true, force: true });
  tree = '';
});

describe('check-links', () => {
  it('follows a relative path from the document it is written in', () => {
    expect(dead({ 'README.md': '[r](docs/RELEASE.md) [g](docs/GONE.md)' })).toEqual([
      'docs/GONE.md',
    ]);
    expect(dead({ 'docs/a.md': '[r](RELEASE.md#channels) [g](../RELEASE.md)' })).toEqual([
      '../RELEASE.md',
    ]);
  });

  it('reads a reference definition as a link', () => {
    expect(dead({ 'README.md': '[r]: docs/RELEASE.md\n[g]: docs/GONE.md' })).toEqual([
      'docs/GONE.md',
    ]);
  });

  it('follows a github.com link to this repository into the checkout', () => {
    const repo = 'https://github.com/ZizzX/wizzard-packages/blob/main';
    expect(
      dead({ 'README.md': `[r](${repo}/docs/RELEASE.md) [g](${repo}/docs/API_REFERENCE.md)` })
    ).toEqual([`${repo}/docs/API_REFERENCE.md`]);
  });

  it('asks the site for a page at a link to it', () => {
    const site = 'https://zizzx.github.io/wizzard-packages';
    expect(
      dead({
        'README.md': `[f](${site}/docs/flow/) [e](${site}/errors/nav-blocked) [x](${site}/examples/) [g](${site}/docs/gone/)`,
      })
    ).toEqual([`${site}/docs/gone/`]);
  });

  it("resolves a site page's link against the URL the page is served at", () => {
    expect(
      dead({
        'site/src/content/docs/docs/navigation.md':
          '[f](../flow/) [e](../../errors/nav-blocked/) [g](../gone/)',
      })
    ).toEqual(['../gone/']);
  });

  it('finds a link on a site page that leaves the base path', () => {
    const files = scratch({ 'site/src/content/docs/docs/navigation.md': '[f](/docs/flow/)' });
    expect(deadLinks(tree, files)).toMatchObject([
      { target: '/docs/flow/', why: 'is outside the site' },
    ]);
  });

  it('takes a link into the generated API reference on trust until the site is built', () => {
    expect(
      dead({ 'README.md': '[a](https://zizzx.github.io/wizzard-packages/docs/api/)' })
    ).toEqual([]);
  });

  it('skips anchors, other hosts and code', () => {
    const text = [
      '[a](#install) [n](https://www.npmjs.com/package/x) [m](mailto:a@b.c)',
      '`[c](docs/GONE.md)`',
      '```md',
      '[f](docs/GONE.md)',
      '```',
    ].join('\n');
    expect(dead({ 'README.md': text })).toEqual([]);
  });

  it('names the line a dead link is on', () => {
    scratch({ 'README.md': 'one\n\n[g](GONE.md)' });
    expect(deadLinks(tree, ['README.md'])).toEqual([
      { file: 'README.md', line: 3, target: 'GONE.md', why: 'is not a file in the repository' },
    ]);
  });
});
