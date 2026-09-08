/**
 * `formatExpr` is written for an `Expr`, which a typed codebase cannot leave and
 * a paste box leaves trivially. Every case here reached the painter and threw
 * out of it, which on this page meant the whole island — graph, panel and the
 * paste box the reader would fix the flow in — was replaced by nothing.
 */
import { describe, expect, it } from 'vitest';

import { asText, printExpr } from './print-expr';

describe('printExpr', () => {
  it("prints a real expression the way the engine's printer does", () => {
    expect(printExpr({ $eq: [{ $get: 'data.payer' }, 'business'] }).full).toBe(
      'data.payer == "business"'
    );
  });

  const hostile: readonly [string, unknown][] = [
    ['$and holding a number', { $and: 1 }],
    ['$or holding a string', { $or: 'x' }],
    ['a nested one', { $not: { $and: 1 } }],
  ];

  for (const [what, expr] of hostile) {
    it(`falls back to the raw JSON on ${what}`, () => {
      expect(() => printExpr(expr)).not.toThrow();
      expect(printExpr(expr).full).toBe(JSON.stringify(expr));
    });
  }

  it('truncates the short form and keeps the full one', () => {
    const long = { $and: Array.from({ length: 20 }, () => ({ $get: 'data.a' })) };
    const printed = printExpr(long, 20);
    expect(printed.short.length).toBeLessThanOrEqual(20);
    expect(printed.full.length).toBeGreaterThan(printed.short.length);
  });
});

describe('asText', () => {
  it('passes a string through', () => {
    expect(asText('Details')).toBe('Details');
  });

  it('renders an object as its JSON rather than as a React crash', () => {
    // `{"to": {}}` inside `on.next` reaches `layoutGraph`, which makes a
    // placeholder node whose id is that object, and the painter draws the id.
    expect(asText({ to: {} })).toBe('{"to":{}}');
  });

  it('has something to say about every scalar', () => {
    expect(asText(5)).toBe('5');
    expect(asText(true)).toBe('true');
    expect(asText(null)).toBe('');
    expect(asText(undefined)).toBe('');
  });

  it('survives a value JSON cannot print', () => {
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(asText(cyclic)).toBe('[unprintable]');
  });
});

describe('the printer under a condition nobody can print', () => {
  const deep = (levels: number): unknown => {
    let expr: unknown = { $get: 'data.a' };
    for (let i = 0; i < levels; i++) expr = { $not: expr };
    return expr;
  };

  it('does not throw where both the printer and its fallback overflow', () => {
    // `formatExpr` recurses and so does `JSON.stringify`, so the obvious
    // fallback fails on exactly the input that needed one.
    expect(() => printExpr(deep(6000))).not.toThrow();
    expect(printExpr(deep(6000)).full).toBe('[unprintable]');
  });

  it('still prints a condition of ordinary depth', () => {
    expect(printExpr(deep(3)).full).toContain('data.a');
  });

  it('truncates the fallback too', () => {
    const printed = printExpr({ $and: 1, padding: 'x'.repeat(200) }, 20);
    expect(printed.short.length).toBeLessThanOrEqual(20);
    expect(printed.short.endsWith('…')).toBe(true);
  });
});
