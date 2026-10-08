/**
 * Runtime state. Every field is JSON — no `Set`, no `Map`, no functions, no
 * step objects. That is what makes persistence, transport and time travel
 * work without a bespoke serializer for each.
 *
 * Nothing derived is stored. `activeSteps`, `progress`, `breadcrumbs` and
 * `canNext` are selectors memoized on `rev`. Storing them is how 0.x ended up
 * with values that disagreed with the data they were computed from.
 */

/** One level of the flow stack. */
export interface Frame {
  flow: string;
  step: string;
  /** The item's identity under `keyBy`. Stable across reorder and removal. */
  key?: string;
}

/**
 * Where a wizard is in its life: `init` until the first move starts and again
 * after `reset`, `busy` while a move runs, `idle` between moves, and `done`
 * once a move reached `END`.
 */
export type WizardStatus = 'init' | 'idle' | 'busy' | 'done';

/**
 * Everything a running wizard knows, as plain JSON. It is never mutated: each
 * change commits a new object with `rev` one higher, which `getState()`
 * returns. Derived values are not here; they are in {@link Derived}.
 */
export interface WizardState {
  status: WizardStatus;
  /** Last element is the current step; earlier elements are enclosing groups. */
  stack: readonly Frame[];
  /** A real back stack: whole stacks, pushed on a forward move and popped on a
   * backward one, so leaving a sub-flow returns correctly. */
  history: readonly (readonly Frame[])[];
  data: Readonly<Record<string, unknown>>;
  ctx: Readonly<Record<string, unknown>>;
  /** Field errors by step id, from validation or `setErrors`. */
  errors: Readonly<Record<string, Readonly<Record<string, string>>>>;
  /** Every step entered, once each. */
  visited: readonly string[];
  /** Steps left by `next()` or `go()`, the move that finished the flow included. */
  completed: readonly string[];
  /** The data paths written with `set`. */
  dirty: readonly string[];
  /** Steps whose `load`, or deferred body, is being loaded right now. */
  busy: readonly string[];
  /** Incremented on every commit. The memoization key for every selector. */
  rev: number;
  /** Incremented when a navigation starts. The epoch token that defeats races. */
  nav: number;
}

/**
 * The state a wizard starts in, before `start()` enters the first step.
 *
 * @internal
 */
export const initialState = (
  data: Record<string, unknown> = {},
  ctx: Record<string, unknown> = {}
): WizardState => ({
  status: 'init',
  stack: [],
  history: [],
  data,
  ctx,
  errors: {},
  visited: [],
  completed: [],
  dirty: [],
  busy: [],
  rev: 0,
  nav: 0,
});
