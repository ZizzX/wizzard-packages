import { describe, expect, it } from 'vitest';

import { SHOWN, bars, excerpt, formatBytes, lowest, supported } from './evidence';

describe('formatBytes', () => {
  it('prints bytes under a thousand and decimal kilobytes from there', () => {
    expect(formatBytes(317)).toBe('317 B');
    expect(formatBytes(999)).toBe('999 B');
    expect(formatBytes(1000)).toBe('1.00 kB');
    expect(formatBytes(7165)).toBe('7.17 kB');
  });
});

describe('bars', () => {
  const measured = Object.keys(SHOWN).map((name, at) => ({ name, size: 100 * (at + 1) }));

  it('draws every shown entry, largest first, on one scale', () => {
    const drawn = bars([...measured, { name: 'devtools panel', size: 99_999 }]);
    expect(drawn.map((bar) => bar.name)).toEqual(Object.values(SHOWN).reverse());
    expect(drawn[0]).toMatchObject({ size: 900, label: '900 B', share: 1 });
    expect(drawn.at(-1)?.share).toBeCloseTo(100 / 900);
  });

  it('fails on a shown entry the measurement lacks, naming it', () => {
    expect(() => bars(measured.filter((entry) => entry.name !== 'vue-v1'))).toThrow(
      /no entry named "vue-v1"/
    );
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
