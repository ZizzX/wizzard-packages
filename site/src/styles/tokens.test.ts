/**
 * DESIGN.md opens by claiming that `tokens.css` is its machine-readable half:
 * every value named there exists here as a custom property. That claim has
 * already drifted once - the document described edge labels the code stopped
 * drawing - so it is asserted rather than trusted.
 *
 * This checks the direction that actually rots: a token the document names and
 * nobody defined is a rule no stylesheet can follow. The reverse is allowed;
 * `tokens.css` carries plumbing, such as the Starlight mapping, that the design
 * system has no reason to name.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const read = (path: string): string =>
  readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8');

const design = read('../../DESIGN.md');
const tokens = read('./tokens.css');

/** `--fg-muted` in prose or a table, but not a row of table dashes. */
const NAMED = /--[a-z][a-z0-9]*(?:-[a-z0-9]+)*/g;
const DEFINED = /^\s*(--[a-z][a-z0-9-]*)\s*:/gm;

/** Group 1 of every match, with the `string | undefined` the strictest preset insists on. */
const group1 = (source: string, pattern: RegExp): string[] =>
  Array.from(source.matchAll(pattern), (match) => match[1]).filter(
    (value): value is string => value !== undefined
  );

const named = new Set(design.match(NAMED) ?? []);
const defined = new Set(group1(tokens, DEFINED));

describe('the design system and its tokens', () => {
  it('defines every custom property DESIGN.md names', () => {
    expect([...named].filter((token) => !defined.has(token))).toEqual([]);
  });

  it('names enough of them for the check to mean something', () => {
    // A guard on the guard: a regex that stopped matching would pass the test
    // above by finding nothing, which is the quiet way this kind of check dies.
    expect(named.size).toBeGreaterThan(30);
  });

  it('keeps a complete palette per theme rather than an inversion', () => {
    // Every colour the dark block defines is redefined for light, in both the
    // system-preference block and the explicit toggle, or a visitor who picks
    // light gets a half-translated page.
    const block = (start: RegExp): string => {
      const at = tokens.search(start);
      expect(at).toBeGreaterThan(-1);
      return tokens.slice(at, tokens.indexOf('\n}', at));
    };

    const colours = (source: string): Set<string> =>
      new Set(group1(source, /^\s*(--(?:bg|surface|line|fg|accent|on-accent|st)[a-z-]*)\s*:/gm));

    const dark = colours(block(/\/\* Dark palette \(default\)\. \*\//));
    const media = colours(block(/@media \(prefers-color-scheme: light\)/));
    const toggle = colours(block(/:root\[data-theme='light'\]/));

    expect(dark.size).toBeGreaterThan(15);
    expect([...dark].filter((token) => !media.has(token))).toEqual([]);
    expect([...dark].filter((token) => !toggle.has(token))).toEqual([]);
  });

  it('zeroes every duration under reduced motion', () => {
    const durations = [...defined].filter((token) => token.startsWith('--dur-'));
    const at = tokens.search(/@media \(prefers-reduced-motion: reduce\)/);
    expect(at).toBeGreaterThan(-1);
    const reduced = tokens.slice(at);

    expect(durations.length).toBeGreaterThan(3);
    expect(durations.filter((token) => !reduced.includes(`${token}: 0ms`))).toEqual([]);
  });
});
