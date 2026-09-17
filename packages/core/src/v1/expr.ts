import {
  invalidOperandText,
  MAX_EXPR_DEPTH,
  notRegistered,
  tooDeepText,
  unknownOperatorText,
  WizardError,
} from './diagnostic';

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

/** An expression object whose first key is not an operator. Both evaluators end in it. */
const unknownOperator = (e: object, op: string): WizardError =>
  new WizardError('expr-unknown-operator', op, ...unknownOperatorText(Object.keys(e)[0]));

/** The operand of `op`, refused with `expr-invalid-operand` when it is not a shape the evaluator reads. */
const operand = <T>(e: object, op: string, where: string): T => {
  const v = (e as Record<string, unknown>)[op];
  const text = invalidOperandText(op, v);
  if (text) throw new WizardError('expr-invalid-operand', where, ...text);
  return v as T;
};

type Pair = readonly [Expr, Expr];

/** The operators that take a pair, in the order both evaluators test them. */
const PAIRS = ['$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$in'];

/** A pair operator applied to its evaluated operands, the same for both evaluators. */
function compare(op: string, a: unknown, b: unknown): boolean {
  if (op === '$eq') return a === b;
  if (op === '$ne') return a !== b;
  if (op === '$gt') return (a as number) > (b as number);
  if (op === '$gte') return (a as number) >= (b as number);
  if (op === '$lt') return (a as number) < (b as number);
  if (op === '$lte') return (a as number) <= (b as number);
  if (typeof b === 'string') return b.includes(String(a));
  return Array.isArray(b) && b.includes(a);
}

/** Past `MAX_EXPR_DEPTH`, counted in objects and lists as `validateFlow` counts them. */
const tooDeep = (op: string): WizardError => new WizardError('expr-too-deep', op, ...tooDeepText);

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
 * Evaluates synchronously. Throws a `WizardError` on a `$ref` that the
 * registry does not define, or whose resolver returns a promise.
 *
 * Most flows contain no `$ref` at all, so `isSync` lets the engine take this
 * path and know which steps are reachable before the first paint.
 */
export function evaluate(e: Expr, scope: Scope, registry?: Registry): unknown {
  return run(e, scope, registry, 0);
}

// `depth` counts objects and lists, so an operand inside an operator's list is
// two levels below the operator and the operand of `$not` or `$empty` one.
function run(e: Expr, scope: Scope, registry: Registry | undefined, depth: number): unknown {
  if (typeof e !== 'object' || e === null) return e;
  if (depth >= MAX_EXPR_DEPTH) throw tooDeep('evaluate');
  const ev = (x: Expr): unknown => run(x, scope, registry, depth + 1);
  if (!isNode(e)) return e.map(ev);
  const ev2 = (x: Expr): unknown => run(x, scope, registry, depth + 2);

  if ('$get' in e) return read(operand<string>(e, '$get', 'evaluate'), scope);
  if ('$not' in e) return !ev(e.$not);
  if ('$and' in e) return operand<readonly Expr[]>(e, '$and', 'evaluate').every(ev2);
  if ('$or' in e) return operand<readonly Expr[]>(e, '$or', 'evaluate').some(ev2);
  if ('$empty' in e) return empty(ev(e.$empty));

  const op = PAIRS.find((k) => k in e);
  if (op) {
    const [a, b] = operand<Pair>(e, op, 'evaluate');
    const left = ev2(a);
    return compare(op, left, ev2(b));
  }

  if ('$ref' in e) {
    const name = operand<string>(e, '$ref', 'evaluate');
    const fn = registry?.[name];
    if (!fn) throw notRegistered(name, 'evaluate');
    const out = fn(e.args, scope);
    if (out instanceof Promise) {
      throw new WizardError(
        'resolver-is-async',
        'evaluate',
        `resolver "${name}" returned a promise`,
        'This expression is evaluated synchronously - a when, a transition guard or a repeat source - and cannot wait for it',
        `Make ${name} synchronous, or move the asynchronous work into the step's validate or load`
      );
    }
    return out;
  }

  throw unknownOperator(e, 'evaluate');
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
  return e === undefined || sync(e, 0);
}

// False past the depth limit: the asynchronous path is the one that then
// refuses the expression, with the same error `evaluate` throws.
function sync(e: Expr, depth: number): boolean {
  if (typeof e !== 'object' || e === null) return true;
  if (depth >= MAX_EXPR_DEPTH) return false;
  if (!isNode(e)) return e.every((x) => sync(x, depth + 1));
  if ('$ref' in e) return false;
  if ('$get' in e) return true;
  if ('$not' in e) return sync(e.$not, depth + 1);
  // An operand the evaluator cannot read counts as synchronous: `evaluate` is
  // then the one that refuses it. An object with no operator is read through
  // all its values, so a `$ref` inside it still takes the asynchronous path.
  // The operators are tried in the evaluator's order, so an object carrying
  // two is read by the one `evaluate` would pick.
  const list = (v: unknown): boolean =>
    !Array.isArray(v) || v.every((x: Expr) => sync(x, depth + 2));
  if ('$and' in e) return list(e.$and);
  if ('$or' in e) return list(e.$or);
  if ('$empty' in e) return sync(e.$empty, depth + 1);
  const op = PAIRS.find((k) => k in e);
  return op ? list((e as Record<string, unknown>)[op]) : Object.values(e).every(list);
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
  return runAsync(e, scope, registry, 0);
}

async function runAsync(
  e: Expr,
  scope: Scope,
  registry: AsyncRegistry | undefined,
  depth: number
): Promise<unknown> {
  if (typeof e !== 'object' || e === null) return e;
  if (depth >= MAX_EXPR_DEPTH) throw tooDeep('evaluateAsync');
  const ev = (x: Expr): Promise<unknown> => runAsync(x, scope, registry, depth + 1);
  if (!isNode(e)) return Promise.all(e.map(ev));
  const ev2 = (x: Expr): Promise<unknown> => runAsync(x, scope, registry, depth + 2);

  if ('$ref' in e) {
    const name = operand<string>(e, '$ref', 'evaluateAsync');
    const fn = registry?.[name];
    if (!fn) throw notRegistered(name, 'evaluateAsync');
    return await fn(e.args, scope);
  }

  // Short-circuiting matters more here than anywhere else: a `$ref` behind a
  // false `$and` branch is a request that must not be made.
  if ('$and' in e) {
    for (const x of operand<readonly Expr[]>(e, '$and', 'evaluateAsync'))
      if (!(await ev2(x))) return false;
    return true;
  }
  if ('$or' in e) {
    for (const x of operand<readonly Expr[]>(e, '$or', 'evaluateAsync'))
      if (await ev2(x)) return true;
    return false;
  }
  if ('$not' in e) return !(await ev(e.$not));

  if (sync(e, depth)) return run(e, scope, registry as Registry, depth);
  if ('$get' in e) return read(e.$get, scope);
  if ('$empty' in e) return empty(await ev(e.$empty));

  // `sync` passes a list of any length that holds a `$ref`, so the pair is
  // checked here as `evaluate` checks it.
  const op = PAIRS.find((k) => k in e);
  if (op) {
    const [a, b] = operand<Pair>(e, op, 'evaluateAsync');
    const [left, right] = await Promise.all([ev2(a), ev2(b)]);
    return compare(op, left, right);
  }

  throw unknownOperator(e, 'evaluateAsync');
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
