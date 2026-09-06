import { describe, expect, it } from 'vitest';

import { formatExpr } from './format';

import type { Expr } from '@wizzard-packages/core/v1';

describe('formatExpr', () => {
  it.each<[Expr, string]>([
    [{ $get: 'data.plan' }, 'data.plan'],
    [{ $eq: [{ $get: 'data.plan' }, 'pro'] }, 'data.plan == "pro"'],
    [{ $ne: [{ $get: 'data.n' }, 1] }, 'data.n != 1'],
    [{ $gt: [{ $get: 'data.n' }, 1] }, 'data.n > 1'],
    [{ $gte: [{ $get: 'data.n' }, 1] }, 'data.n >= 1'],
    [{ $lt: [{ $get: 'data.n' }, 1] }, 'data.n < 1'],
    [{ $lte: [{ $get: 'data.n' }, 1] }, 'data.n <= 1'],
    [{ $in: [{ $get: 'data.plan' }, ['pro', 'team']] }, 'data.plan in ["pro", "team"]'],
    [{ $and: [{ $get: 'data.a' }, { $get: 'data.b' }] }, 'data.a && data.b'],
    [{ $or: [{ $get: 'data.a' }, { $get: 'data.b' }] }, 'data.a || data.b'],
    [{ $not: { $get: 'data.a' } }, '!data.a'],
    [{ $not: { $eq: [{ $get: 'data.a' }, 1] } }, '!(data.a == 1)'],
    [{ $and: [{ $or: [true, false] }, { $get: 'data.c' }] }, '(true || false) && data.c'],
    [{ $empty: { $get: 'data.passengers' } }, 'empty(data.passengers)'],
    [{ $not: { $empty: { $get: 'data.passengers' } } }, '!empty(data.passengers)'],
    [{ $ref: 'isAdmin' }, 'isAdmin()'],
    [{ $ref: 'over', args: { limit: 3 } }, 'over({"limit":3})'],
    [null, 'null'],
    [true, 'true'],
    [42, '42'],
    ['text', '"text"'],
    [[1, 'a'], '[1, "a"]'],
  ])('prints %j as %s', (expr, text) => {
    expect(formatExpr(expr).full).toBe(text);
  });

  it('falls back to JSON for an operator it does not know', () => {
    expect(formatExpr({ $regex: 'x' } as unknown as Expr).full).toBe('{"$regex":"x"}');
    expect(formatExpr({ $eq: [1] } as unknown as Expr).full).toBe('{"$eq":[1]}');
  });

  it('cuts short at max with an ellipsis and leaves full untouched', () => {
    const long = { $eq: [{ $get: 'data.a.very.long.path.name' }, 'a long literal value'] } as const;
    const { short, full } = formatExpr(long, 12);
    expect(full).toBe('data.a.very.long.path.name == "a long literal value"');
    expect(short).toBe('data.a.very…');
    expect(short.length).toBe(12);
    expect(formatExpr(long, 200).short).toBe(full);
  });
});
