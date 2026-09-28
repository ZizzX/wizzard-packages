/**
 * The tutorial shows each step as the change from the one before, computed
 * from the two files a test runs. A diff that dropped or duplicated a line
 * would teach the reader code that does not exist, so the property that
 * matters is that both files can be read back out of it.
 */
import { describe, expect, it } from 'vitest';

import { GAP, lineDiff } from './line-diff';

const before = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].join('\n');

/** The version a diff with no collapsed context describes, on either side. */
const side = (diff: string, keep: '+' | '-'): string =>
  diff
    .split('\n')
    .filter((line) => line[0] === ' ' || line[0] === keep)
    .map((line) => line.slice(1))
    .join('\n');

describe('lineDiff', () => {
  it('marks an added line and keeps the lines around it as context', () => {
    const after = before.replace('e', 'e\nnew');
    expect(lineDiff(before, after, 1).split('\n')).toEqual([GAP, ' e', '+new', ' f', GAP]);
  });

  it('puts a removal before the line that replaces it', () => {
    const after = before.replace('e', 'E');
    expect(lineDiff(before, after, 0).split('\n')).toEqual([GAP, '-e', '+E', GAP]);
  });

  it('collapses unchanged runs longer than the context, and only those', () => {
    const after = before.replace('b', 'B').replace('i', 'I');
    const lines = lineDiff(before, after, 1).split('\n');
    expect(lines.filter((l) => l === GAP)).toHaveLength(1);
    expect(lines[0]).toBe(' a');
    expect(lines.at(-1)).toBe(' j');
  });

  it('shows a new file as nothing but additions', () => {
    expect(lineDiff('', 'x\ny\n')).toBe('+x\n+y');
  });

  it('reads line endings the same whichever the checkout uses', () => {
    expect(lineDiff('a\r\nb\r\n', 'a\nb\n')).toBe('');
  });

  const cases: readonly [string, string][] = [
    ['an insertion at the top', `top\n${before}`],
    ['a removal at the end', before.replace('\nj', '')],
    ['a block moved', before.replace('b\nc\n', '').replace('h', 'h\nb\nc')],
    ['everything replaced', 'x\ny\nz'],
    ['blank lines added', before.replace('e', 'e\n\n')],
  ];

  for (const [what, after] of cases) {
    it(`loses no line of either file: ${what}`, () => {
      const whole = lineDiff(before, after, Number.MAX_SAFE_INTEGER);
      expect(whole).not.toContain(GAP);
      expect(side(whole, '-')).toBe(before);
      expect(side(whole, '+')).toBe(after);
    });
  }
});
