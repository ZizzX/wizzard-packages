import type { Expr, Json } from './expr';

/**
 * A typed builder for the expression language.
 *
 * Every function returns exactly the JSON `evaluate` reads, so
 * `eq(get('data.plan'), 'pro')` and `{ $eq: [{ $get: 'data.plan' }, 'pro'] }`
 * are the same value and interchangeable in a flow. The builder exists so the
 * compiler sees the tree the evaluator will walk: an operand that is not an
 * expression, a wrong arity, a path with no root — all fail before the flow is
 * serialized rather than when a step is reached.
 *
 * Its own entry, deliberately. A flow that arrives as JSON was authored
 * elsewhere, and the wizard that runs it pays nothing for the functions that
 * would have written it.
 */

/** A `$get` path: one of the three roots, optionally followed by a dotted path. */
export type Path = 'data' | 'ctx' | 'loop' | `data.${string}` | `ctx.${string}` | `loop.${string}`;

type Pair = readonly [Expr, Expr];

export const get = (path: Path): { $get: string } => ({ $get: path });

/** Names a resolver in the registry. `args` is omitted, not `undefined`, so the JSON round-trips. */
export const ref = (name: string, args?: Json): { $ref: string; args?: Json } =>
  args === undefined ? { $ref: name } : { $ref: name, args };

export const not = (e: Expr): { $not: Expr } => ({ $not: e });
export const and = (...e: readonly Expr[]): { $and: readonly Expr[] } => ({ $and: e });
export const or = (...e: readonly Expr[]): { $or: readonly Expr[] } => ({ $or: e });
export const empty = (e: Expr): { $empty: Expr } => ({ $empty: e });

export const eq = (a: Expr, b: Expr): { $eq: Pair } => ({ $eq: [a, b] });
export const ne = (a: Expr, b: Expr): { $ne: Pair } => ({ $ne: [a, b] });
export const gt = (a: Expr, b: Expr): { $gt: Pair } => ({ $gt: [a, b] });
export const gte = (a: Expr, b: Expr): { $gte: Pair } => ({ $gte: [a, b] });
export const lt = (a: Expr, b: Expr): { $lt: Pair } => ({ $lt: [a, b] });
export const lte = (a: Expr, b: Expr): { $lte: Pair } => ({ $lte: [a, b] });

/** `$in`: the needle first, then the array or string to look in. Named for the reserved word. */
export const isIn = (needle: Expr, hay: Expr): { $in: Pair } => ({ $in: [needle, hay] });
