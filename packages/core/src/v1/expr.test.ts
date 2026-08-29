import { describe, expect, it } from 'vitest';

import { evaluate, ExprError, isSync, test as truthy, type Expr, type Scope } from './expr';

const scope: Scope = {
  data: {
    trip: { payer: 'business', seats: 3, tags: ['vip', 'late'] },
    empty: { list: [], str: '', obj: {} },
  },
  ctx: { role: 'admin' },
  loop: { index: 1, item: { name: 'Ann' } },
};

describe('evaluate', () => {
  it('returns literals untouched', () => {
    expect(evaluate('x', scope)).toBe('x');
    expect(evaluate(3, scope)).toBe(3);
    expect(evaluate(null, scope)).toBeNull();
    expect(evaluate(false, scope)).toBe(false);
  });

  it('reads each root', () => {
    expect(evaluate({ $get: 'data.trip.payer' }, scope)).toBe('business');
    expect(evaluate({ $get: 'ctx.role' }, scope)).toBe('admin');
    expect(evaluate({ $get: 'loop.index' }, scope)).toBe(1);
    expect(evaluate({ $get: 'loop.item.name' }, scope)).toBe('Ann');
  });

  it('returns undefined for a missing path instead of throwing', () => {
    expect(evaluate({ $get: 'data.nope.deep.deeper' }, scope)).toBeUndefined();
    expect(evaluate({ $get: 'nosuchroot.x' }, scope)).toBeUndefined();
  });

  it('evaluates the boolean operators', () => {
    expect(evaluate({ $not: true }, scope)).toBe(false);
    expect(evaluate({ $and: [true, { $eq: [{ $get: 'ctx.role' }, 'admin'] }] }, scope)).toBe(true);
    expect(evaluate({ $and: [true, false] }, scope)).toBe(false);
    expect(evaluate({ $or: [false, true] }, scope)).toBe(true);
    expect(evaluate({ $or: [false, false] }, scope)).toBe(false);
  });

  it('short-circuits $and and $or', () => {
    let calls = 0;
    const registry = {
      count: () => {
        calls++;
        return true;
      },
    };
    evaluate({ $and: [false, { $ref: 'count' }] }, scope, registry);
    expect(calls).toBe(0);
    evaluate({ $or: [true, { $ref: 'count' }] }, scope, registry);
    expect(calls).toBe(0);
  });

  it('evaluates the comparisons', () => {
    expect(evaluate({ $eq: [{ $get: 'data.trip.seats' }, 3] }, scope)).toBe(true);
    expect(evaluate({ $ne: [{ $get: 'data.trip.seats' }, 3] }, scope)).toBe(false);
    expect(evaluate({ $gt: [{ $get: 'data.trip.seats' }, 2] }, scope)).toBe(true);
    expect(evaluate({ $gte: [{ $get: 'data.trip.seats' }, 3] }, scope)).toBe(true);
    expect(evaluate({ $lt: [{ $get: 'data.trip.seats' }, 3] }, scope)).toBe(false);
    expect(evaluate({ $lte: [{ $get: 'data.trip.seats' }, 3] }, scope)).toBe(true);
  });

  it('handles $in over arrays and strings', () => {
    expect(evaluate({ $in: ['vip', { $get: 'data.trip.tags' }] }, scope)).toBe(true);
    expect(evaluate({ $in: ['nope', { $get: 'data.trip.tags' }] }, scope)).toBe(false);
    expect(evaluate({ $in: ['usi', 'business'] }, scope)).toBe(true);
    expect(evaluate({ $in: ['x', { $get: 'data.nope' }] }, scope)).toBe(false);
  });

  it('treats empty collections, empty strings, null and NaN as empty', () => {
    expect(evaluate({ $empty: { $get: 'data.empty.list' } }, scope)).toBe(true);
    expect(evaluate({ $empty: { $get: 'data.empty.str' } }, scope)).toBe(true);
    expect(evaluate({ $empty: { $get: 'data.empty.obj' } }, scope)).toBe(true);
    expect(evaluate({ $empty: { $get: 'data.missing' } }, scope)).toBe(true);
    expect(evaluate({ $empty: { $get: 'data.trip.tags' } }, scope)).toBe(false);
    expect(evaluate({ $empty: 0 }, scope)).toBe(false);
  });

  it('resolves $ref through the registry and passes args and scope', () => {
    const registry = {
      seatsOver: (args: unknown, s: Scope) =>
        ((s.data.trip as { seats: number }).seats ?? 0) > (args as { n: number }).n,
    };
    expect(evaluate({ $ref: 'seatsOver', args: { n: 2 } }, scope, registry)).toBe(true);
    expect(evaluate({ $ref: 'seatsOver', args: { n: 9 } }, scope, registry)).toBe(false);
  });

  it('refuses an unknown resolver rather than silently returning false', () => {
    expect(() => evaluate({ $ref: 'nope' }, scope, {})).toThrow(ExprError);
  });

  it('refuses an async resolver on the synchronous path', () => {
    const registry = { later: () => Promise.resolve(true) };
    expect(() => evaluate({ $ref: 'later' }, scope, registry)).toThrow(/async/);
  });

  it('refuses an unknown operator', () => {
    expect(() => evaluate({ $nope: 1 } as unknown as Expr, scope)).toThrow(/unknown operator/);
  });

  it('evaluates array literals element-wise', () => {
    expect(evaluate([1, { $get: 'ctx.role' }], scope)).toEqual([1, 'admin']);
  });
});

describe('test', () => {
  it('treats an absent expression as true, so `when` is optional', () => {
    expect(truthy(undefined, scope)).toBe(true);
  });

  it('coerces to boolean', () => {
    expect(truthy({ $get: 'data.trip.payer' }, scope)).toBe(true);
    expect(truthy({ $get: 'data.empty.str' }, scope)).toBe(false);
  });
});

describe('isSync', () => {
  it('accepts a flow with no $ref', () => {
    expect(isSync({ $and: [{ $eq: [{ $get: 'data.a' }, 1] }, { $not: { $empty: 'x' } }] })).toBe(
      true
    );
    expect(isSync(undefined)).toBe(true);
    expect(isSync([1, 2])).toBe(true);
  });

  it('rejects a $ref anywhere in the tree', () => {
    expect(isSync({ $ref: 'x' })).toBe(false);
    expect(isSync({ $and: [true, { $or: [{ $ref: 'x' }] }] })).toBe(false);
    expect(isSync({ $eq: [{ $get: 'a' }, { $ref: 'x' }] })).toBe(false);
    expect(isSync({ $not: { $ref: 'x' } })).toBe(false);
  });
});
