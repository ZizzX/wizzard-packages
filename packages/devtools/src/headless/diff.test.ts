import { initialState } from '@wizzard-packages/core/v1';
import { describe, expect, it } from 'vitest';

import { diffState } from './diff';

import type { WizardState } from '@wizzard-packages/core/v1';

const base = (data: Record<string, unknown> = {}): WizardState => ({
  ...initialState(data),
  status: 'idle',
  stack: [{ flow: 'f', step: 'a' }],
});

describe('diffState', () => {
  it('returns nothing for identical states', () => {
    const s = base({ a: 1 });
    expect(diffState(s, s)).toEqual([]);
    expect(diffState(s, { ...s, rev: s.rev + 1, nav: s.nav + 1 })).toEqual([]);
  });

  it('reports added, removed and changed paths in data and ctx', () => {
    const a = base({ name: 'Ann', address: { city: 'Oslo', zip: '0150' } });
    const b: WizardState = {
      ...base({ name: 'Bo', address: { city: 'Oslo' }, email: 'b@x' }),
      ctx: { role: 'admin' },
    };
    expect(diffState(a, b)).toEqual([
      { path: 'data.name', before: 'Ann', after: 'Bo' },
      { path: 'data.address.zip', before: '0150', after: undefined },
      { path: 'data.email', before: undefined, after: 'b@x' },
      { path: 'ctx.role', before: undefined, after: 'admin' },
    ]);
  });

  it('compares arrays by index with getPath syntax', () => {
    const a = base({ items: [{ name: 'x' }, { name: 'y' }] });
    const b = base({ items: [{ name: 'x' }, { name: 'z' }, { name: 'w' }] });
    expect(diffState(a, b).map((c) => c.path)).toEqual(['data.items[1].name', 'data.items[2]']);
  });

  it('treats non-plain values as leaves', () => {
    const then = new Date(0);
    const now = new Date(1);
    expect(diffState(base({ at: then }), base({ at: now }))).toEqual([
      { path: 'data.at', before: then, after: now },
    ]);
    expect(diffState(base({ at: then }), base({ at: then }))).toEqual([]);
  });

  it('reports stack, errors and the flag lists by value, one row each', () => {
    const a = base();
    const b: WizardState = {
      ...a,
      stack: [{ flow: 'f', step: 'b' }],
      errors: { a: { email: 'required' } },
      visited: ['a'],
    };
    expect(diffState(a, b).map((c) => c.path)).toEqual(['stack', 'errors', 'visited']);
    expect(diffState(a, { ...a, stack: [{ flow: 'f', step: 'a' }] })).toEqual([]);
  });

  it('caps the rows and says how many are hidden', () => {
    const many = Object.fromEntries(Array.from({ length: 250 }, (_, i) => [`k${i}`, i]));
    const rows = diffState(base(), base(many));
    expect(rows).toHaveLength(201);
    expect(rows[200]).toEqual({ path: '…', before: undefined, after: undefined, hidden: 50 });
    expect(diffState(base(), base(many), 300)).toHaveLength(250);
  });
});
