/**
 * `formatExpr` is written for an `Expr`, which a typed codebase cannot leave and
 * a paste box leaves trivially. Every case here reached the painter and threw
 * out of it, which on this page meant the whole island — graph, panel and the
 * paste box the reader would fix the flow in — was replaced by nothing.
 */
import { describe, expect, it } from 'vitest';

import { printExpr } from './print-expr';

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
