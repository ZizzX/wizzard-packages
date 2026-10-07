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
    'docs/with space.md': '',
    'docs/a(1).md': '',
    'docs/50%.md': '',
    'docs/a b%.md': '',
    'site/src/content/docs/docs/graph.png': '',
    'site/src/content/docs/docs/flow.md': '# The flow',
    'site/src/content/docs/errors/nav-blocked.md': '# nav-blocked',
    'site/src/pages/examples/index.astro': '',
    'site/src/pages/examples/[slug].astro': '',
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

  it('reads a reference link where it is used', () => {
    const text = '[r][rel] and [g][gone]\n\n[rel]: docs/RELEASE.md\n[gone]: docs/GONE.md';
    expect(dead({ 'README.md': text })).toEqual(['docs/GONE.md']);
  });

  it('reads a target with spaces in angle brackets, or with parentheses in it', () => {
    expect(
      dead({
        'README.md':
          '[s](<docs/with space.md>) [p](docs/a(1).md) [e](docs/with%20space.md) [g](<docs/gone one.md>)',
      })
    ).toEqual(['docs/gone one.md']);
  });

  it('follows a github.com link to this repository into the checkout', () => {
    const repo = 'https://github.com/ZizzX/wizzard-packages';
    expect(
      dead({
        'README.md': `[r](${repo}/blob/main/docs/RELEASE.md) [s](${repo}/blob/main/docs/with%20space.md) [d](${repo}/tree/main/docs) [g](${repo}/blob/main/docs/API_REFERENCE.md) [t](${repo}/tree/main/legacy)`,
      })
    ).toEqual([`${repo}/blob/main/docs/API_REFERENCE.md`, `${repo}/tree/main/legacy`]);
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

  it('reads an image on a site page as a file beside it, not as a page', () => {
    expect(
      dead({ 'site/src/content/docs/docs/navigation.md': '![g](graph.png) ![m](missing.png)' })
    ).toEqual(['missing.png']);
  });

  it('does not count a [slug] page as a route of its own', () => {
    const site = 'https://zizzx.github.io/wizzard-packages';
    expect(dead({ 'README.md': `[s](${site}/examples/[slug]/)` })).toEqual([
      `${site}/examples/[slug]/`,
    ]);
  });

  it('finds a link on a site page that leaves the base path', () => {
    const files = scratch({ 'site/src/content/docs/docs/navigation.md': '[f](/docs/flow/)' });
    expect(deadLinks(tree, files)).toMatchObject([
      { target: '/docs/flow/', why: 'is outside the site' },
    ]);
  });

  it('checks a link into the generated API reference once the site is built', () => {
    const site = 'https://zizzx.github.io/wizzard-packages';
    expect(
      dead({
        'site/src/content/docs/docs/api/index.md': '',
        'README.md': `[a](${site}/docs/api/) [g](${site}/docs/api/gone/)`,
      })
    ).toEqual([`${site}/docs/api/gone/`]);
  });

  it('reads a % that starts no escape as part of the name', () => {
    expect(dead({ 'README.md': '[p](docs/50%.md) [s](docs/a%20b%.md) [g](docs/60%.md)' })).toEqual([
      'docs/60%.md',
    ]);
  });

  it('reports a target that is not a URL instead of failing on it', () => {
    const files = scratch({ 'site/src/content/docs/docs/navigation.md': '[x](//[)' });
    expect(deadLinks(tree, files)).toMatchObject([{ target: '//[', why: 'is not a URL' }]);
  });

  it('takes a link into the generated API reference on trust until the site is built', () => {
    expect(
      dead({ 'README.md': '[a](https://zizzx.github.io/wizzard-packages/docs/api/)' })
    ).toEqual([]);
  });

  it('skips anchors, other hosts, code and comments', () => {
    const text = [
      '[a](#install) [n](https://www.npmjs.com/package/x) [m](mailto:a@b.c)',
      '`[c](docs/GONE.md)` and ``a `b` [d](docs/GONE.md)``',
      '<!-- [h](docs/GONE.md) -->',
      '<!-- a comment',
      '[h](docs/GONE.md)',
      '--> [after](docs/gone-3.md)',
      '``[l](docs/gone-4.md)`',
      '```md',
      '[f](docs/GONE.md)',
      '```',
    ].join('\n');
    // The rest of the line a comment closes on is part of it, as CommonMark reads it.
    expect(dead({ 'README.md': text })).toEqual(['docs/gone-4.md']);
  });

  it('opens a comment only where one starts a line, and reads on after it', () => {
    const text = [
      'Write `<!--` to open a comment.',
      '[a](docs/gone-1.md)',
      '[<!--](docs/gone-2.md)',
      '    <!-- indented, so code rather than a comment',
      '[b](docs/gone-3.md)',
      '<!--',
      '```',
      '-->',
      '[c](docs/gone-4.md)',
    ];
    expect(dead({ 'README.md': text.join('\n') })).toEqual([
      'docs/gone-1.md',
      'docs/gone-2.md',
      'docs/gone-3.md',
      'docs/gone-4.md',
    ]);
  });

  it('reads a line of backtick code as text, not as a fence', () => {
    expect(dead({ 'README.md': '```a``` and ```b`c\n[a](docs/GONE.md)' })).toEqual([
      'docs/GONE.md',
    ]);
  });

  it('closes a fence only at the quote depth it opened at', () => {
    expect(
      dead({ 'README.md': '```\n> ```\n[in](docs/GONE.md)\n```\n[out](docs/gone-1.md)' })
    ).toEqual(['docs/gone-1.md']);
  });

  it('skips a fence inside a list item or a quote', () => {
    const text = [
      '- item',
      '',
      '    ```',
      '    [l](docs/GONE.md)',
      '    ```',
      '> ```',
      '> [q](docs/GONE.md)',
      '> ```',
    ];
    expect(dead({ 'README.md': text.join('\n') })).toEqual([]);
  });

  it('closes a fence only on the marker that opened it', () => {
    const text = [
      '~~~',
      '```',
      '[in](docs/GONE.md)',
      '~~~',
      '[out](docs/gone-1.md)',
      '````md',
      '```ts',
      '[in](docs/GONE.md)',
      '```',
      '````',
      '[out](docs/gone-2.md)',
    ].join('\r\n');
    expect(dead({ 'README.md': text })).toEqual(['docs/gone-1.md', 'docs/gone-2.md']);
  });

  it('names the line a dead link is on, inside a paragraph too', () => {
    scratch({ 'README.md': 'one\n\ntwo\nthree [g](GONE.md)' });
    expect(deadLinks(tree, ['README.md'])).toEqual([
      { file: 'README.md', line: 4, target: 'GONE.md', why: 'is not a file in the repository' },
    ]);
  });
});
