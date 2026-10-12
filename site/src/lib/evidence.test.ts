import { describe, expect, it } from 'vitest';

import {
  ENGINE,
  SHOWN,
  bars,
  excerpt,
  formatBytes,
  lowest,
  parseMeasurement,
  supported,
} from './evidence';

describe('formatBytes', () => {
  it('prints bytes under a thousand and decimal kilobytes from there', () => {
    expect(formatBytes(317)).toBe('317 B');
    expect(formatBytes(999)).toBe('999 B');
    expect(formatBytes(1000)).toBe('1.00 kB');
    expect(formatBytes(7165)).toBe('7.17 kB');
    // 1.815 is 1.81499... in binary, which toFixed alone rounds down.
    expect(formatBytes(1815)).toBe('1.82 kB');
  });
});

describe('bars', () => {
  // The engine at 7000 B, and each import adding 100, 200, ... on top of it.
  const measured = [
    { name: ENGINE, size: 7000 },
    ...Object.values(SHOWN).map((name, at) => ({ name, size: 7000 + 100 * (at + 1) })),
  ];

  it('draws core, then what each import adds to it, largest first, on one scale', () => {
    const drawn = bars([...measured, { name: 'devtools panel', size: 99_999 }]);
    expect(drawn.map((bar) => bar.name)).toEqual(['core', ...Object.keys(SHOWN).reverse()]);
    expect(drawn[0]).toMatchObject({ size: 7000, label: '7.00 kB', share: 1 });
    expect(drawn[1]).toMatchObject({ size: 600, label: '600 B' });
    expect(drawn.at(-1)?.share).toBeCloseTo(100 / 7000);
  });

  it('fails on an entry the measurement lacks or could not size, naming it', () => {
    expect(() => bars(measured.filter((entry) => entry.name !== 'homepage + vue'))).toThrow(
      /no size for "homepage \+ vue"/
    );
    expect(() => bars(measured.map((e) => (e.name === ENGINE ? { name: ENGINE } : e)))).toThrow(
      /no size for "homepage createWizard"/
    );
  });

  it('refuses an import that adds nothing, rather than drawing an empty bar', () => {
    const flat = measured.map((e) => (e.name === 'homepage + vue' ? { ...e, size: 7000 } : e));
    expect(() => bars(flat)).toThrow(/"homepage \+ vue" measured 7000 B, no more than/);
  });

  it("passes on size-limit's own error rather than a TypeError", () => {
    expect(() => bars({ error: 'Error: esbuild failed' })).toThrow(/esbuild failed/);
    expect(() => bars(null)).toThrow(/printed no list/);
  });
});

describe('parseMeasurement', () => {
  it('reads JSON and quotes what was printed when it is not', () => {
    expect(parseMeasurement('[]')).toEqual([]);
    expect(() => parseMeasurement('ERR_PNPM_NO_SCRIPT')).toThrow(/ERR_PNPM_NO_SCRIPT/);
  });
});

describe('lowest', () => {
  it('states the floor of a range the way a reader says it', () => {
    expect(lowest('>=18.0.0')).toBe('>= 18');
    expect(lowest('^3.5.0')).toBe('>= 3.5');
    expect(lowest('>=20.11')).toBe('>= 20.11');
    expect(lowest('>=20.0.1')).toBe('>= 20.0.1');
  });

  it('refuses a range that is not one lowest version', () => {
    expect(() => lowest('~3.5.0')).toThrow(/"~3.5.0"/);
    expect(() => lowest('>=18 <20')).toThrow(/">=18 <20"/);
  });

  it('reads React, Vue and Node from the packages', () => {
    expect(supported.map((entry) => entry.name)).toEqual(['React', 'Vue', 'Node']);
    for (const { value } of supported) expect(value).toMatch(/^>= \d/);
  });
});

describe('excerpt', () => {
  const source = ['function a() {', '  one();', '    two();', '  three();', '}', '  one();'].join(
    '\n'
  );

  it('takes the lines from the first match to the next match of the last, dedented', () => {
    expect(excerpt(source, 'one', 'three')).toBe('one();\n  two();\nthree();');
    expect(excerpt(source, 'two')).toBe('two();');
  });

  it('looks for the last line from the first one onwards', () => {
    expect(excerpt(source, 'three', 'one')).toBe('  three();\n}\n  one();');
  });

  it('fails when either line is gone', () => {
    expect(() => excerpt(source, 'four')).toThrow(/"four"/);
    expect(() => excerpt(source, 'two', 'four')).toThrow(/"four"/);
  });
});
