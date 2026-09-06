/**
 * The expression language.
 *
 * A flow has to survive `JSON.stringify`, so a predicate cannot be a function.
 * It is a small tagged object instead, evaluated by this module. There is no
 * `eval` and no `new Function`, so a flow served by a backend is data, not code.
 *
 * Ten operators cover the predicates wizards actually express. Anything else —
 * arithmetic, regular expressions, a remote lookup — goes through `$ref`, which
 * names a function in the registry. That keeps the grammar small and makes the
 * one dangerous thing explicit and greppable.
 */

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type Expr =
  | null
  | boolean
  | number
  | string
  | readonly Expr[]
  | { $get: string }
  | { $ref: string; args?: Json }
  | { $not: Expr }
  | { $and: readonly Expr[] }
  | { $or: readonly Expr[] }
  | { $eq: readonly [Expr, Expr] }
  | { $ne: readonly [Expr, Expr] }
  | { $gt: readonly [Expr, Expr] }
  | { $gte: readonly [Expr, Expr] }
  | { $lt: readonly [Expr, Expr] }
  | { $lte: readonly [Expr, Expr] }
  | { $in: readonly [Expr, Expr] }
  | { $empty: Expr };

/** The roots a `$get` path may address. */
export interface Scope {
  data: Record<string, unknown>;
  ctx: Record<string, unknown>;
  /**
   * Present inside a `repeat` group. `key` is the item's identity under
   * `keyBy` - the one part a flow can use to address its own item's data,
   * because `index` moves when the list is reordered.
   */
  loop?: { index: number; item: unknown; key: string };
}

export type Resolver = (args: Json | undefined, scope: Scope) => unknown;
export type Registry = Readonly<Record<string, Resolver>>;

/** Thrown when a synchronous evaluation meets a `$ref` it cannot resolve. */
export class ExprError extends Error {}

const isNode = (e: Expr): e is Exclude<Expr, null | boolean | number | string | readonly Expr[]> =>
  typeof e === 'object' && e !== null && !Array.isArray(e);

function read(path: string, scope: Scope): unknown {
  const dot = path.indexOf('.');
  const root = dot === -1 ? path : path.slice(0, dot);
  const rest = dot === -1 ? '' : path.slice(dot + 1);

  const base =
    root === 'data'
      ? scope.data
      : root === 'ctx'
        ? scope.ctx
        : root === 'loop'
          ? scope.loop
          : undefined;

  if (base === undefined) return undefined;
  if (!rest) return base;

  // Walked here rather than reusing a generic path helper: the helper memoizes
  // every path string it sees, and a `repeat` group produces an unbounded set
  // of indexed paths.
  let cur: unknown = base;
  for (const key of rest.split('.')) {
    if (cur === null || cur === undefined) return undefined;
    cur = (cur as Record<string, unknown>)[key];
  }
  return cur;
}

/** Truthiness for `$empty`: null, undefined, '', [], {} and NaN are empty. */
function empty(v: unknown): boolean {
  if (v === null || v === undefined || v === '') return true;
  if (typeof v === 'number') return Number.isNaN(v);
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === 'object') return Object.keys(v).length === 0;
  return false;
}

/**
 * Evaluates synchronously. Throws `ExprError` on a `$ref` that the registry
 * does not define, or whose resolver returns a promise.
 *
 * Most flows contain no `$ref` at all, so `isSync` lets the engine take this
 * path and know which steps are reachable before the first paint.
 */
export function evaluate(e: Expr, scope: Scope, registry?: Registry): unknown {
  if (!isNode(e)) return Array.isArray(e) ? e.map((x) => evaluate(x, scope, registry)) : e;

  const ev = (x: Expr): unknown => evaluate(x, scope, registry);

  if ('$get' in e) return read(e.$get, scope);
  if ('$not' in e) return !ev(e.$not);
  if ('$and' in e) return e.$and.every(ev);
  if ('$or' in e) return e.$or.some(ev);
  if ('$empty' in e) return empty(ev(e.$empty));
  if ('$eq' in e) return ev(e.$eq[0]) === ev(e.$eq[1]);
  if ('$ne' in e) return ev(e.$ne[0]) !== ev(e.$ne[1]);
  if ('$gt' in e) return (ev(e.$gt[0]) as number) > (ev(e.$gt[1]) as number);
  if ('$gte' in e) return (ev(e.$gte[0]) as number) >= (ev(e.$gte[1]) as number);
  if ('$lt' in e) return (ev(e.$lt[0]) as number) < (ev(e.$lt[1]) as number);
  if ('$lte' in e) return (ev(e.$lte[0]) as number) <= (ev(e.$lte[1]) as number);

  if ('$in' in e) {
    const needle = ev(e.$in[0]);
    const hay = ev(e.$in[1]);
    if (typeof hay === 'string') return hay.includes(String(needle));
    return Array.isArray(hay) && hay.includes(needle);
  }

  if ('$ref' in e) {
    const fn = registry?.[e.$ref];
    if (!fn) throw new ExprError(`unknown resolver: ${e.$ref}`);
    const out = fn(e.args, scope);
    if (out instanceof Promise) throw new ExprError(`resolver is async: ${e.$ref}`);
    return out;
  }

  throw new ExprError(`unknown operator: ${Object.keys(e)[0]}`);
}

/** Evaluates to a boolean. An absent expression is `true`. */
export function test(e: Expr | undefined, scope: Scope, registry?: Registry): boolean {
  return e === undefined ? true : Boolean(evaluate(e, scope, registry));
}

/**
 * True when the expression contains no `$ref`, and can therefore be evaluated
 * before the first paint. Computed once per flow, not per navigation.
 */
export function isSync(e: Expr | undefined): boolean {
  if (e === undefined || !isNode(e)) {
    return !Array.isArray(e) || e.every(isSync);
  }
  if ('$ref' in e) return false;
  if ('$get' in e) return true;
  if ('$not' in e) return isSync(e.$not);
  if ('$and' in e) return e.$and.every(isSync);
  if ('$or' in e) return e.$or.every(isSync);
  if ('$empty' in e) return isSync(e.$empty);
  const operands = Object.values(e as Record<string, readonly Expr[]>)[0];
  return operands === undefined || operands.every(isSync);
}

/**
 * Evaluates with `$ref` allowed to be asynchronous.
 *
 * Used only where the engine is already awaiting — a guard, a load. Reachability
 * takes the synchronous path when `isSync` allows it, which is the common case
 * and the reason a flow renders correctly on the first frame.
 */
export async function evaluateAsync(
  e: Expr,
  scope: Scope,
  registry?: AsyncRegistry
): Promise<unknown> {
  if (!isNode(e)) {
    return Array.isArray(e) ? Promise.all(e.map((x) => evaluateAsync(x, scope, registry))) : e;
  }

  const ev = (x: Expr): Promise<unknown> => evaluateAsync(x, scope, registry);

  if ('$ref' in e) {
    const fn = registry?.[e.$ref];
    if (!fn) throw new ExprError(`unknown resolver: ${e.$ref}`);
    return await fn(e.args, scope);
  }

  // Short-circuiting matters more here than anywhere else: a `$ref` behind a
  // false `$and` branch is a request that must not be made.
  if ('$and' in e) {
    for (const x of e.$and) if (!(await ev(x))) return false;
    return true;
  }
  if ('$or' in e) {
    for (const x of e.$or) if (await ev(x)) return true;
    return false;
  }
  if ('$not' in e) return !(await ev(e.$not));

  if (isSync(e)) return evaluate(e, scope, registry as Registry);
  if ('$get' in e) return read(e.$get, scope);
  if ('$empty' in e) return empty(await ev(e.$empty));

  const pair = async (p: readonly [Expr, Expr]): Promise<[unknown, unknown]> =>
    (await Promise.all([ev(p[0]), ev(p[1])])) as [unknown, unknown];

  if ('$eq' in e) {
    const [a, b] = await pair(e.$eq);
    return a === b;
  }
  if ('$ne' in e) {
    const [a, b] = await pair(e.$ne);
    return a !== b;
  }
  if ('$gt' in e) {
    const [a, b] = await pair(e.$gt);
    return (a as number) > (b as number);
  }
  if ('$gte' in e) {
    const [a, b] = await pair(e.$gte);
    return (a as number) >= (b as number);
  }
  if ('$lt' in e) {
    const [a, b] = await pair(e.$lt);
    return (a as number) < (b as number);
  }
  if ('$lte' in e) {
    const [a, b] = await pair(e.$lte);
    return (a as number) <= (b as number);
  }
  if ('$in' in e) {
    const [needle, hay] = await pair(e.$in);
    if (typeof hay === 'string') return hay.includes(String(needle));
    return Array.isArray(hay) && hay.includes(needle);
  }

  throw new ExprError(`unknown operator: ${Object.keys(e)[0]}`);
}

export type AsyncResolver = (args: Json | undefined, scope: Scope) => unknown | Promise<unknown>;
export type AsyncRegistry = Readonly<Record<string, AsyncResolver>>;

/** Evaluates to a boolean, awaiting `$ref`. An absent expression is `true`. */
export async function testAsync(
  e: Expr | undefined,
  scope: Scope,
  registry?: AsyncRegistry
): Promise<boolean> {
  if (e === undefined) return true;
  if (isSync(e)) return Boolean(evaluate(e, scope, registry as Registry));
  return Boolean(await evaluateAsync(e, scope, registry));
}
