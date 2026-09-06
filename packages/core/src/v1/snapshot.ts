import { checkFrames, isStackEntry, knownFlows, type FrameProblem } from './session';

import type { FlowDefinition } from './flow';
import type { SubFlows } from './navigate';
import type { Frame, WizardState } from './state';

/**
 * The durable shape of a wizard.
 *
 * A running wizard has fields that describe a moment rather than a session:
 * whether a navigation is in flight, which steps are loading, the errors a
 * validator produced, and the revision counter the selectors memoize on. None
 * of them survive a reload, and storing them is how a restored wizard comes
 * back stuck in `busy` with errors nobody can clear.
 *
 * So a snapshot is the session and nothing else, plus the identity needed to
 * tell whether it still belongs to the flow being restored, plus `v`: the
 * format's own version, which is what lets a host migrate a snapshot written
 * by an older release instead of throwing it away.
 */
export interface Snapshot {
  /** Format version. Bumped when this shape changes, never for a flow change. */
  v: 1;
  /** `FlowDefinition.id` at the time it was written. */
  flow: string;
  /** `FlowDefinition.version`, when the flow carried one. */
  version?: number;
  stack: readonly Frame[];
  history: readonly (readonly Frame[])[];
  data: Readonly<Record<string, unknown>>;
  ctx: Readonly<Record<string, unknown>>;
  visited: readonly string[];
  completed: readonly string[];
  dirty: readonly string[];
  /** The navigation epoch, so a restored wizard cannot be raced by an older one. */
  nav: number;
}

export type RestoreReason =
  /** Not an object, or not this format. */
  | 'snapshot/unreadable'
  /** A `v` this build does not know and `migrate` did not handle. */
  | 'snapshot/version'
  /** The flow id or its version differs from the one being restored into. */
  | 'snapshot/other-flow'
  /** A frame names a step the flow no longer has. */
  | 'snapshot/unknown-step'
  /** Values JSON cannot round-trip, or a key that would poison a prototype. */
  | 'snapshot/unstorable'
  /** Larger or deeper than the bounds below. */
  | 'snapshot/too-large';

export type RestoreResult =
  | { restored: true; state: WizardState }
  | { restored: false; reason: RestoreReason };

export interface DecodeOptions {
  /**
   * The engine's current epoch, when restoring into a live wizard. The restored
   * state always lands above it, so a navigation begun before the restore
   * resolves as superseded instead of overwriting what was just put back.
   */
  epoch?: number;
  /**
   * Upgrades a snapshot written by an older format. Called until it returns
   * something at the current version or gives up by returning the input
   * unchanged, so a host can write one hop at a time rather than one function
   * that knows every past shape.
   */
  migrate?: (snapshot: { v: number } & Record<string, unknown>) => unknown;
  /**
   * Sub-flow definitions a string `GroupStep.flow` names — the same registry
   * `checkSession` takes, applied to the same walk.
   *
   * Without it a frame naming a flow nothing here can resolve is let through
   * and pruned by the traversal on the first navigation, which is why omitting
   * it is permissive rather than broken. With it, a snapshot taken inside a
   * group is checked to the same depth a recorded session is.
   */
  subFlows?: SubFlows;
}

/** Bounds, so a crafted or runaway snapshot cannot hang the tab that reads it. */
const MAX_BYTES = 1_000_000;
const MAX_DEPTH = 32;
const MAX_MIGRATIONS = 16;

/** Keys that would reach the prototype chain if they were ever assigned through. */
const POISON = new Set(['__proto__', 'constructor', 'prototype']);

const CURRENT: Snapshot['v'] = 1;

/**
 * A session, detached from the engine.
 *
 * The result is a fresh object with no reference into live state: handing out
 * something a host could mutate would put a second writer next to `commit.ts`,
 * which is the one thing the engine's design does not allow.
 */
export function toSnapshot(state: WizardState, flow: FlowDefinition): Snapshot {
  return {
    v: CURRENT,
    flow: flow.id,
    ...(flow.version === undefined ? {} : { version: flow.version }),
    stack: state.stack.map((f) => ({ ...f })),
    history: state.history.map((frames) => frames.map((f) => ({ ...f }))),
    data: detach(state.data),
    ctx: detach(state.ctx),
    visited: [...state.visited],
    completed: [...state.completed],
    dirty: [...state.dirty],
    nav: state.nav,
  };
}

/**
 * A deep copy of the plain parts.
 *
 * A shallow spread would leave every nested object shared with live state, so
 * `snapshot.data.name.full = 'x'` would reach into the engine - a second writer
 * beside `commit.ts`, which is the one thing the design does not allow.
 *
 * Anything that is not a plain object or an array is copied by reference and
 * left for `decodeSnapshot` to refuse: a `Date` is a bug to report at the
 * boundary, not something to quietly convert on the way out.
 */
function detach<T>(value: T): T {
  if (Array.isArray(value)) return value.map(detach) as unknown as T;
  if (value === null || typeof value !== 'object') return value;
  if (Object.getPrototypeOf(value) !== Object.prototype) return value;
  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) out[key] = detach(child);
  return out as T;
}

/**
 * Turns stored JSON back into state, or says why it will not.
 *
 * Pure: it decides, and hands the caller a state to install. Installing is the
 * plugin's job and goes through `commit`, so a restore is a commit like any
 * other write and the epoch moves with it - anything begun before the restore
 * resolves as superseded rather than overwriting what was just put back.
 *
 * The order matters. Read the envelope, migrate, then validate what migration
 * produced: a host's `migrate` is ordinary code that can return nonsense, and
 * trusting its output is how a corrupt snapshot becomes a corrupt session.
 */
export function decodeSnapshot(
  flow: FlowDefinition,
  input: unknown,
  options: DecodeOptions = {}
): RestoreResult {
  if (input === null || typeof input !== 'object') return fail('snapshot/unreadable');

  let candidate = input as { v?: unknown } & Record<string, unknown>;
  if (typeof candidate.v !== 'number') return fail('snapshot/unreadable');

  for (let hop = 0; candidate.v !== CURRENT; hop++) {
    if (options.migrate === undefined || hop >= MAX_MIGRATIONS) return fail('snapshot/version');
    // `unknown`, because a host's migration is ordinary code: it can return
    // null, a string, or the object it was handed, and the loop has to survive
    // all three rather than trust the signature.
    const next: unknown = options.migrate(candidate as { v: number } & Record<string, unknown>);
    if (next === null || typeof next !== 'object' || next === candidate) {
      return fail('snapshot/version');
    }
    candidate = next as { v?: unknown } & Record<string, unknown>;
    if (typeof candidate.v !== 'number') return fail('snapshot/unreadable');
  }

  if (!isSnapshotShaped(candidate)) return fail('snapshot/unreadable');
  const snapshot = candidate;

  if (snapshot.flow !== flow.id) return fail('snapshot/other-flow');
  // A version is only compared when both sides have one: an unstamped flow is a
  // producer that never versioned itself, not evidence of a mismatch.
  if (
    snapshot.version !== undefined &&
    flow.version !== undefined &&
    snapshot.version !== flow.version
  ) {
    return fail('snapshot/other-flow');
  }

  // Every frame, not only the root's. A snapshot taken inside a group carries
  // the group's frames too, and `checkFrames` is the walk `checkSession` runs,
  // so the decoder and the recording checker cannot disagree about what a legal
  // stack is. A frame naming a flow nothing resolves is the one kind let
  // through: 4.10 of the group-traversal note prunes it on the first
  // navigation, and refusing it would throw away every snapshot taken inside a
  // sub-flow the host did not hand us.
  const known = knownFlows(flow, options.subFlows);
  const found: FrameProblem[] = [];
  const note = (_depth: number, problem: FrameProblem): void => {
    found.push(problem);
  };
  for (const stack of [snapshot.stack, ...snapshot.history]) checkFrames(stack, known, note);
  if (found.some((problem) => problem !== 'unknown-flow')) return fail('snapshot/unknown-step');

  // The whole snapshot, not only what a host put in it: a stack or a history
  // can run away just as easily as a data blob can.
  const storable = checkStorable(snapshot);
  if (storable !== null) return fail(storable);

  return {
    restored: true,
    state: {
      status: 'idle',
      stack: snapshot.stack,
      history: snapshot.history,
      data: snapshot.data,
      ctx: snapshot.ctx,
      visited: snapshot.visited,
      completed: snapshot.completed,
      dirty: snapshot.dirty,
      // Transient, every one of them: a reload ends whatever was in flight, no
      // step is loading, and errors are recomputed by the next validation
      // rather than trusted from storage, where they may describe data that has
      // since been edited.
      errors: {},
      busy: [],
      rev: 0,
      // Always above both the stored epoch and the live one. Carrying the
      // stored number verbatim would leave a navigation already in flight
      // holding a token that still counts as current, and it would win.
      nav: Math.max(snapshot.nav, options.epoch ?? 0) + 1,
    },
  };
}

const fail = (reason: RestoreReason): RestoreResult => ({ restored: false, reason });

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((v) => typeof v === 'string');

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

function isSnapshotShaped(
  value: Record<string, unknown>
): value is Snapshot & Record<string, unknown> {
  return (
    typeof value.flow === 'string' &&
    (value.version === undefined || typeof value.version === 'number') &&
    Array.isArray(value.stack) &&
    value.stack.every(isStackEntry) &&
    Array.isArray(value.history) &&
    value.history.every((frames) => Array.isArray(frames) && frames.every(isStackEntry)) &&
    isPlainObject(value.data) &&
    isPlainObject(value.ctx) &&
    isStringArray(value.visited) &&
    isStringArray(value.completed) &&
    isStringArray(value.dirty) &&
    typeof value.nav === 'number'
  );
}

/**
 * Walks what will be stored, looking for the three ways JSON lies: values it
 * cannot round-trip, keys that reach a prototype, and a shape too big or too
 * deep to be worth the tab it would be read in.
 *
 * `undefined`, `NaN` and `Infinity` all survive `JSON.stringify` as something
 * other than themselves, and a `Date` comes back a string. A wizard that
 * restored one of those would be quietly wrong rather than loudly broken, and
 * quietly wrong is the failure this whole format exists to avoid.
 */
function checkStorable(value: unknown): RestoreReason | null {
  const seen = new Set<object>();
  let bytes = 0;

  const walk = (node: unknown, depth: number): RestoreReason | null => {
    if (depth > MAX_DEPTH) return 'snapshot/too-large';
    if (node === null || typeof node === 'boolean') return null;

    if (typeof node === 'number') {
      return Number.isFinite(node) ? null : 'snapshot/unstorable';
    }
    if (typeof node === 'string') {
      bytes += node.length;
      return bytes > MAX_BYTES ? 'snapshot/too-large' : null;
    }
    if (typeof node !== 'object') return 'snapshot/unstorable';
    if (seen.has(node)) return 'snapshot/unstorable';
    seen.add(node);

    if (Array.isArray(node)) {
      for (const item of node) {
        const problem = walk(item, depth + 1);
        if (problem !== null) return problem;
      }
      return null;
    }

    if (Object.getPrototypeOf(node) !== Object.prototype) return 'snapshot/unstorable';

    for (const [key, child] of Object.entries(node)) {
      if (POISON.has(key)) return 'snapshot/unstorable';
      bytes += key.length;
      if (bytes > MAX_BYTES) return 'snapshot/too-large';
      const problem = walk(child, depth + 1);
      if (problem !== null) return problem;
    }
    return null;
  };

  return walk(value, 0);
}
