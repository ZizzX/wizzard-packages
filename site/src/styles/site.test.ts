/**
 * The route walk's promise to a browser without scroll-driven animations, and to
 * a reader who asked for less motion, is that they see the end frame. That
 * holds only while every scroll-driven declaration sits inside both guards, and
 * CI runs one browser, which supports them - so a rule added outside the guards
 * would pass every other test. This reads the stylesheet and checks where they sit.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// A path through a variable, as tokens.test.ts does: Vite rewrites a literal
// `new URL('./site.css', import.meta.url)` into an asset URL, which is not a file.
const read = (path: string): string =>
  readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8');

const css = read('./site.css');

/** Where the block opened by `prelude` starts and ends, by counting braces. */
function block(source: string, prelude: string, from = 0): { start: number; end: number } {
  const start = source.indexOf(prelude, from);
  if (start === -1) throw new Error(`no \`${prelude}\` in site.css`);
  let depth = 0;
  for (let at = source.indexOf('{', start); at < source.length; at += 1) {
    if (source[at] === '{') depth += 1;
    if (source[at] === '}') depth -= 1;
    if (depth === 0) return { start, end: at };
  }
  throw new Error(`\`${prelude}\` in site.css never closes`);
}

/**
 * The scroll-driven declarations in `source` that sit outside the guards, by
 * name. Declarations only: the guard's own prelude, `(animation-timeline:
 * view())`, follows a parenthesis.
 */
function outside(source: string): string[] {
  const supports = block(source, '@supports (animation-timeline: view())');
  const motion = block(source, '@media (prefers-reduced-motion: no-preference)', supports.start);
  if (motion.end > supports.end) return ['the reduced-motion guard'];
  return Array.from(
    source.matchAll(
      /(?<![(\w-])(animation-timeline|animation-range(?:-start|-end)?|view-timeline(?:-name|-axis|-inset)?|scroll-timeline(?:-name|-axis)?)\s*:/g
    ),
    (match) => ({ name: match[1] ?? '', at: match.index })
  )
    .filter(({ at }) => at < motion.start || at > motion.end)
    .map(({ name }) => name);
}

describe('the route walk in site.css', () => {
  it('declares every scroll-driven property inside both of its guards', () => {
    expect(css).toMatch(/view-timeline\s*:/);
    expect(outside(css)).toEqual([]);
  });

  it('would see a stray rule, longhands and scroll timelines included', () => {
    const stray = (rule: string) => outside(`${css}\n.stray { ${rule} }\n`);
    expect(stray('view-timeline: --stray block;')).toEqual(['view-timeline']);
    expect(stray('view-timeline-name: --stray;')).toEqual(['view-timeline-name']);
    expect(stray('animation-range-start: cover 10%;')).toEqual(['animation-range-start']);
    expect(stray('scroll-timeline: --stray block;')).toEqual(['scroll-timeline']);
  });
});
