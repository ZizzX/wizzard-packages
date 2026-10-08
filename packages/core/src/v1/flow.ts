import type { Expr, Json } from './expr';

/**
 * The flow definition. Pure JSON — no functions, no class instances, nothing
 * that `JSON.stringify` would drop. The same object can be written by hand,
 * served by a backend, or generated; the engine cannot tell which.
 *
 * Everything that cannot be serialized is named instead: `view` names a
 * component, `$ref` names a function, both looked up in a registry the host
 * supplies.
 */
export interface FlowDefinition {
  id: string;
  /** Bumped by the producer when the shape changes; used to reject stale patches. */
  version?: number;
  /** Default linear order. A step missing from `order` is reachable only via `on.next`. */
  order?: readonly string[];
  /** Keyed by id, not an array, so a patch can address one step without index maths. */
  steps: Readonly<Record<string, StepDef>>;
  policy?: NavigationPolicy;
  validate?: { on?: 'change' | 'blur' | 'next' | 'manual'; debounceMs?: number };
}

/**
 * Which steps `go()` may jump to without `force`. `free` allows any step,
 * `visited`, the default, only a step already visited, and `sequential` only
 * the step just before or after the current one among the active steps.
 */
export type NavigationPolicy = 'sequential' | 'visited' | 'free';

/**
 * Where a transition leads: a step id, or `{ to, when }`. In `on.next` a target
 * whose `when` is false is passed over, and `to` may be `END`.
 */
export type Target = string | { to: string; when?: Expr };

interface StepBase {
  label?: string;
  /** Reachability. A step whose `when` is false is skipped, not shown disabled. */
  when?: Expr;
  guards?: { enter?: Expr; exit?: Expr };
  on?: { next?: Target | readonly Target[]; back?: Target | 'auto' };
  /** Key of this step's slice of `data`. Defaults to the step id. */
  slice?: string;
  /** Field schema for the host to render. The engine never reads it. */
  ui?: Json;
  /** Loaded on enter, with an abort signal. */
  load?: { $ref: string; args?: Json };
  /** The body of this step arrives later, from the host. */
  deferred?: boolean;
  /**
   * What to forget when this step is left, forwards or backwards. Data is
   * kept by default: a person who goes back and returns expects their answers
   * to still be there. `true` drops the step's whole slice (`slice`, or the
   * step id); a list drops those `data` paths, in the same path language as
   * `set()`. Nothing is cleared on completion — that data is the submission.
   */
  clearOnLeave?: readonly string[] | true;
}

/** A single step, as opposed to a {@link GroupStep}, which runs a sub-flow. */
export interface AtomStep extends StepBase {
  /** Names the component the host renders for this step. The engine never reads it. */
  view?: string;
  /**
   * Names the resolver that checks the step. It returns field errors as
   * `{ [field]: message }`, or `null` or `{}` when the step is valid. It runs
   * on `validate()`, and when `next()` or `go()` leaves the step unless they
   * are passed `validate: false`.
   */
  validate?: { $ref: string; args?: Json };
}

/**
 * A sub-flow. With `repeat` it is also the loop construct — the same machinery,
 * because a loop is a sub-flow entered once per item. Iteration state lives in
 * the runtime frame, never in the definition, so the flow stays static and
 * diffable.
 */
export interface GroupStep extends StepBase {
  flow: string | FlowDefinition;
  repeat?: { over: Expr; keyBy?: string };
  /** Parent expressions piped into the child's `ctx`. */
  input?: Readonly<Record<string, Expr>>;
}

/** Any step of a flow: an {@link AtomStep}, or a {@link GroupStep}. `isGroup` tells them apart. */
export type StepDef = AtomStep | GroupStep;

/** Whether a step is a {@link GroupStep}, which is whether it has a `flow`. */
export const isGroup = (s: StepDef): s is GroupStep => 'flow' in s;

/** Sentinel target meaning the flow is finished. */
export const END = '@end' as const;
