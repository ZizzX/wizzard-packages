import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { evaluate, type Expr, type Json, type Registry, type Scope } from './expr';
import * as b from './expr-builder';

/**
 * Every node is produced twice: once through the builder and once as the JSON
 * a person would write by hand. The two trees have to be the same value, and
 * therefore evaluate the same way — that is the whole contract of the builder.
 */
interface Twin {
  built: Expr;
  json: Expr;
}

/** A hand-written node, widened through `unknown`: the key is computed, so the compiler cannot see the operator. */
const node = (op: string, operand: unknown): Expr => ({ [`$${op}`]: operand }) as unknown as Expr;

const paths = ['data', 'data.a', 'data.b.c', 'ctx.x', 'loop.index', 'loop.item.k'] as const;
// Round-tripped once: `jsonValue` can yield `-0`, which JSON cannot represent.
const args = fc.option(
  fc.jsonValue({ maxDepth: 2 }).map((v) => JSON.parse(JSON.stringify(v)) as Json),
  { nil: undefined }
);

const twin = fc.letrec<{ expr: Twin }>((tie) => {
  const expr = tie('expr');
  const leaf = fc
    .oneof(fc.constant(null), fc.boolean(), fc.integer(), fc.string())
    .map((v): Twin => ({ built: v, json: v }));
  const get = fc.constantFrom(...paths).map((p): Twin => ({ built: b.get(p), json: { $get: p } }));
  const ref = fc.tuple(fc.constantFrom('len', 'sum'), args).map(
    ([name, a]): Twin => ({
      built: b.ref(name, a),
      json: a === undefined ? { $ref: name } : { $ref: name, args: a },
    })
  );
  const unary = fc
    .tuple(fc.constantFrom('not', 'empty'), expr)
    .map(([op, e]): Twin => ({ built: b[op](e.built), json: node(op, e.json) }));
  const nary = fc.tuple(fc.constantFrom('and', 'or'), fc.array(expr, { maxLength: 3 })).map(
    ([op, es]): Twin => ({
      built: b[op](...es.map((e) => e.built)),
      json: node(
        op,
        es.map((e) => e.json)
      ),
    })
  );
  const binary = fc.tuple(fc.constantFrom('eq', 'ne', 'gt', 'gte', 'lt', 'lte'), expr, expr).map(
    ([op, l, r]): Twin => ({
      built: b[op](l.built, r.built),
      json: node(op, [l.json, r.json]),
    })
  );
  const isIn = fc
    .tuple(expr, expr)
    .map(([l, r]): Twin => ({ built: b.isIn(l.built, r.built), json: { $in: [l.json, r.json] } }));
  return { expr: fc.oneof({ depthSize: 'small' }, leaf, get, ref, unary, nary, binary, isIn) };
}).expr;

const scope: Scope = {
  data: { a: 1, b: { c: 'pro' } },
  ctx: { x: [1, 2, 3] },
  loop: { index: 2, item: { k: 'v' } },
};
const registry: Registry = {
  len: (a) => (Array.isArray(a) ? a.length : String(a ?? '').length),
  sum: (_, s) => (s.ctx.x as number[]).reduce((t, n) => t + n, 0),
};

describe('expression builder', () => {
  it('produces the JSON a person would write by hand', () => {
    fc.assert(
      fc.property(twin, ({ built, json }) => {
        expect(built).toEqual(json);
      })
    );
  });

  it('evaluates identically to that JSON and survives serialization', () => {
    fc.assert(
      fc.property(twin, ({ built, json }) => {
        const roundTripped = JSON.parse(JSON.stringify(built)) as Expr;
        expect(roundTripped).toEqual(built);
        expect(evaluate(built, scope, registry)).toEqual(evaluate(json, scope, registry));
      })
    );
  });

  it('reads like the predicate it encodes', () => {
    const when = b.and(b.eq(b.get('data.b.c'), 'pro'), b.not(b.empty(b.get('ctx.x'))));
    expect(when).toEqual({
      $and: [{ $eq: [{ $get: 'data.b.c' }, 'pro'] }, { $not: { $empty: { $get: 'ctx.x' } } }],
    });
    expect(evaluate(when, scope)).toBe(true);
    // @ts-expect-error a path needs a root: `plan` is not `data.plan`
    b.get('plan');
  });
});
