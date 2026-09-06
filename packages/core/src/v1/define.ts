import type { AtomStep, FlowDefinition, GroupStep } from './flow';

/**
 * Authoring helpers.
 *
 * All three compile to nothing — they hand back what they were given. They
 * exist so the compiler can carry information a plain object literal loses:
 * which step ids exist, and what shape each step writes into `data`.
 *
 * The slice type rides on a phantom property rather than being inferred from
 * the definition. Inference depth stays at one, which is the difference between
 * a forty-step flow that type-checks instantly and one that hangs tsserver.
 */

declare const SLICE: unique symbol;

/** Carries a step data type through the type system without existing at runtime. */
export interface Slice<T> {
  readonly [SLICE]?: T;
}

export function defineFlow<const F extends FlowDefinition>(flow: F): F {
  return flow;
}

export function step<T = unknown>(def: AtomStep = {}): AtomStep & Slice<T> {
  return def;
}

export function group<T = unknown>(def: GroupStep): GroupStep & Slice<T> {
  return def;
}

/**
 * What `get` and `set` see at a path: the slice a step declared when the path
 * is that step's id, `unknown` for anything else - a nested field, a key no
 * step owns. An index into an intersection rather than a conditional type,
 * because a conditional on `F` makes the compiler treat `Wizard<F>` as
 * invariant, and a typed wizard could no longer be stored as a plain `Wizard`.
 */
export type SliceAt<F extends FlowDefinition, P extends string> = (DataOf<F> &
  Record<string, unknown>)[P];

/** The union of step ids in a flow. `go` accepts nothing else. */
export type StepIdOf<F extends FlowDefinition> = Extract<keyof F['steps'], string>;

/**
 * The data shape a flow writes, one key per step. Keyed by step id: a `slice`
 * override moves the data at runtime but not in the type, because `step<T>()`
 * has no way to see the literal it was handed once `T` is supplied by hand.
 */
export type DataOf<F extends FlowDefinition> = {
  [K in keyof F['steps']]: F['steps'][K] extends Slice<infer T> ? T : unknown;
};
