/**
 * The sidebar is written by hand in `astro.config.mjs` and the pages are files
 * on disk, so the two drift in both directions: a renamed page leaves a link
 * that 404s, and a new page nobody adds to the sidebar is unreachable except by
 * search. Astro builds happily in both cases - a missing target is only a
 * warning, and an orphan page is not even that.
 *
 * The config is read as text rather than imported, because importing it pulls
 * in every integration and a test does not need a build.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * The path goes through a parameter rather than a literal on purpose: Vite
 * rewrites `new URL('./literal', import.meta.url)` into an asset URL, which is
 * not a file URL any more and cannot be read from disk.
 */
const near = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

const config = readFileSync(near('../../astro.config.mjs'), 'utf8');

/**
 * Starlight reads from `src/content/docs/`, so `/docs/flow/` is `docs/flow.md`.
 * A page that mounts a component is `.mdx` instead, and both extensions resolve
 * to the same route - so a check that knows only one of them reports a page
 * that exists as missing.
 */
const pagesDir = near('./docs/docs');

const linked = Array.from(config.matchAll(/link:\s*'\/docs\/([\w-]+)\/'/g), (m) => m[1]).filter(
  (slug): slug is string => slug !== undefined
);

const onDisk = readdirSync(pagesDir)
  .filter((name) => /\.mdx?$/.test(name))
  .map((name) => name.replace(/\.mdx?$/, ''));

describe('the documentation sidebar', () => {
  it('links only to pages that exist', () => {
    expect(linked.filter((slug) => !onDisk.includes(slug))).toEqual([]);
  });

  it('leaves no page unreachable', () => {
    expect(onDisk.filter((slug) => !linked.includes(slug))).toEqual([]);
  });

  it('found the entries at all, rather than a pattern that stopped matching', () => {
    expect(linked.length).toBeGreaterThan(1);
  });
});
