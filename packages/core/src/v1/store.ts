import { commit, restart } from './commit';
import { END, type FlowDefinition, type StepDef } from './flow';
import { runNav, type Hooks, type NavContext, type NavResult } from './navigate';
import { getPath, setPath } from './path';
import { createSelector, type Derived } from './select';
import { initialState, type WizardState } from './state';

import type { AsyncRegistry, Json, Scope } from './expr';

/**
 * The store.
 *
 * It owns exactly one thing the rest of the engine does not: the current state
 * and the listeners watching it. Everything else — resolution, guards, ordering
 * — lives in functions that take state and return a decision, which is why they
 * can be tested without any of this.
 *
 * `write` is the single setter. Every path into it runs through `commit`, so
 * `rev` moves exactly once per change and listeners are called exactly once.
 * The 0.x store notified twice on every validation action, and both bindings
 * carried guards to undo the second render.
 */

export type Snapshot = WizardState & Derived;

export interface WizardOptions {
  flow: FlowDefinition;
  /** Named resolvers for everything a flow cannot serialize. */
  registry?: AsyncRegistry;
  plugins?: readonly Hooks[];
  data?: Record<string, unknown>;
  ctx?: Record<string, unknown>;
  /** A previously serialized state, for resuming a session. */
  state?: WizardState;
}

export interface Wizard {
  getState: () => WizardState;
  /** State and derived values in one object, identical between commits. */
  getSnapshot: () => Snapshot;
  getFlow: () => FlowDefinition;

  subscribe: (listener: () => void) => () => void;
  /** Calls back only when the selected value changes. */
  select: <T>(
    selector: (s: Snapshot) => T,
    listener: (value: T) => void,
    equals?: (a: T, b: T) => boolean
  ) => () => void;
  /** Calls back only when the value at a data path changes. */
  watch: (path: string, listener: (value: unknown) => void) => () => void;

  /**
   * Enters the first reachable step. A fresh wizard has an empty stack, so
   * until this runs there is no current step and a UI has nothing to draw.
   * Idempotent: once a step is current, this reports it and navigates nowhere.
   */
  start: () => Promise<NavResult>;
  next: (opts?: { validate?: boolean }) => Promise<NavResult>;
  back: () => Promise<NavResult>;
  go: (to: string, opts?: { validate?: boolean; force?: boolean }) => Promise<NavResult>;
  /** Aborts the navigation in flight, if any. */
  cancel: () => void;

  get: (path: string) => unknown;
  set: (path: string, value: unknown) => void;
  patch: (partial: Record<string, unknown>) => void;
  /** Applies several writes and notifies once. */
  batch: (fn: () => void) => void;
  setCtx: (ctx: Record<string, unknown>) => void;
  reset: (data?: Record<string, unknown>) => void;

  validate: (stepId?: string) => Promise<boolean>;
  setErrors: (stepId: string, errors: Readonly<Record<string, string>> | null) => void;

  /** Replaces steps by id. Refuses a patch that would remove the current step. */
  patchFlow: (patch: Partial<FlowDefinition>) => boolean;

  /** True once `destroy` has run. Plugins receive nothing after that. */
  isDestroyed: () => boolean;

  destroy: () => void;
}

const strictEquals = <T>(a: T, b: T): boolean => a === b;

export function createWizard(options: WizardOptions): Wizard {
  let flow = options.flow;
  const registry = options.registry;

  let state: WizardState = options.state ?? initialState(options.data ?? {}, options.ctx ?? {});
  const listeners = new Set<() => void>();
  const select = createSelector(() => flow, registry);

  let batching = false;
  let dirtyWhileBatching = false;
  let controller: AbortController | undefined;
  let starting: Promise<NavResult> | undefined;
  const plugins: readonly Hooks[] = options.plugins ?? [];
  const disabled = new Set<string>();
  const teardowns: (() => void)[] = [];
  // Set while `init` runs, so a plugin's own restoring commit does not come
  // back to it as `onCommit`.
  let initializing = false;
  let destroyed = false;
  let snapshotRev = -1;
  let snapshot: Snapshot | undefined;

  const notify = (): void => {
    if (batching) {
      dirtyWhileBatching = true;
      return;
    }
    for (const l of listeners) l();
  };

  /**
   * The one funnel. Navigation writes here through its host, and so does every
   * direct edit, which is what makes `onCommit` a complete record rather than
   * a record of navigation only.
   */
  const write = (next: WizardState): void => {
    const previous = state;
    state = next;
    for (const h of plugins) {
      if (initializing || destroyed || h.onCommit === undefined || disabled.has(h.name)) continue;
      try {
        h.onCommit(state, previous);
      } catch (error) {
        fail(h.name, 'onCommit', error);
      }
    }
    notify();
  };

  /**
   * A plugin that throws is switched off and named, rather than taking the
   * write down with it: one broken analytics plugin must not lose a
   * half-filled form.
   */
  const fail = (name: string, at: string, error: unknown): void => {
    disabled.add(name);
    console.error(
      `[wizzard] plugin "${name}" threw in ${at} and was disabled. ` +
        `Its later hooks will not run. Fix the plugin or remove it from options.plugins.`,
      error
    );
  };

  const getSnapshot = (): Snapshot => {
    if (snapshot !== undefined && snapshotRev === state.rev) return snapshot;
    snapshot = { ...state, ...select(state) };
    snapshotRev = state.rev;
    return snapshot;
  };

  const scopeOf = (): Scope => ({ data: state.data, ctx: state.ctx });

  const resolverFor = async (
    ref: { $ref: string; args?: Json } | undefined,
    fallback: unknown
  ): Promise<unknown> => {
    if (!ref) return fallback;
    const fn = registry?.[ref.$ref];
    if (!fn) throw new Error(`[wizzard] unknown resolver: ${ref.$ref}`);
    return await fn(ref.args, scopeOf());
  };

  const validateStep = async (stepId: string): Promise<Readonly<Record<string, string>> | null> => {
    const step: StepDef | undefined = flow.steps[stepId];
    const rule = step && 'validate' in step ? step.validate : undefined;
    const result = await resolverFor(rule, null);
    return (result as Readonly<Record<string, string>> | null) ?? null;
  };

  const navContext = (): NavContext => ({
    flow,
    registry,
    // Disabled and post-destroy plugins are filtered here too: `fail` must mean
    // the same thing to a navigation hook as it does to `onCommit`, or a plugin
    // that threw once keeps running half its contract.
    hooks: destroyed ? [] : plugins.filter((h) => !disabled.has(h.name)),
    validate: (stepId) => validateStep(stepId),
    load: async (stepId) => {
      const step = flow.steps[stepId];
      await resolverFor(step?.load, undefined);
    },
    signal: controller?.signal,
  });

  const navigate = async (
    intent: Parameters<typeof runNav>[2],
    opts?: { validate?: boolean }
  ): Promise<NavResult> => {
    controller = new AbortController();
    return runNav(navContext(), { read: () => state, write }, intent, opts ?? {});
  };

  // Plugins are initialised before the engine is handed out, so a restored
  // session is already in place the first time anything reads it.
  initializing = true;
  for (const h of plugins) {
    if (h.init === undefined) continue;
    try {
      const teardown = h.init({
        getState: () => state,
        getFlow: () => flow,
        commit: (patch) => {
          write(commit(state, patch));
        },
      });
      if (teardown !== undefined) teardowns.push(teardown);
    } catch (error) {
      fail(h.name, 'init', error);
    }
  }
  initializing = false;

  return {
    getState: () => state,
    getSnapshot,
    getFlow: () => flow,

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    select(selector, listener, equals = strictEquals) {
      let previous = selector(getSnapshot());
      const wrapped = (): void => {
        const nextValue = selector(getSnapshot());
        if (equals(previous, nextValue)) return;
        previous = nextValue;
        listener(nextValue);
      };
      listeners.add(wrapped);
      return () => listeners.delete(wrapped);
    },

    watch(path, listener) {
      let previous = getPath(state.data, path);
      const wrapped = (): void => {
        const nextValue = getPath(state.data, path);
        if (previous === nextValue) return;
        previous = nextValue;
        listener(nextValue);
      };
      listeners.add(wrapped);
      return () => listeners.delete(wrapped);
    },

    start() {
      // `next` from an empty stack resolves to the first reachable step, which
      // is exactly what starting means; the guard is only here so that calling
      // it twice - two mounts of the same wizard, say - is not a step forward.
      //
      // The guard reads `status`, not the stack: a flow whose every step is
      // unreachable finishes on the first start and leaves the stack empty
      // again, and a second call must not walk it a second time.
      // The in-flight check comes first. Phase 0 of the pipeline bumps the
      // epoch synchronously, so by the time a second mount calls in, `status`
      // already says busy while the first attempt has committed nothing yet -
      // answering from `status` there would report a finished flow. Two mounts
      // of one engine share one attempt, so an enter guard or a deferred step's
      // loader runs once, not twice.
      if (starting !== undefined) return starting;

      // Read `status`, not the stack: a flow whose every step is unreachable
      // finishes on the first start and leaves the stack empty again, and a
      // second call must not walk it a second time.
      const current = state.stack[state.stack.length - 1]?.step ?? null;
      if (state.status !== 'init') {
        return Promise.resolve({ ok: true, from: current, to: current ?? END });
      }

      starting = navigate({ type: 'next' }, { validate: false }).finally(() => {
        starting = undefined;
      });
      return starting;
    },
    next: (opts) => navigate({ type: 'next' }, opts),
    back: () => navigate({ type: 'back' }),
    go: (to, opts) => navigate({ type: 'go', to, force: opts?.force }, opts),
    cancel: () => controller?.abort(),

    get: (path) => getPath(state.data, path),

    set(path, value) {
      const data = setPath(state.data as Record<string, unknown>, path, value);
      // A write that changes nothing must not invalidate every memoized
      // selector downstream.
      if (data === state.data) return;
      write(commit(state, { data, dirty: [...new Set([...state.dirty, path])] }));
    },

    patch(partial) {
      write(commit(state, { data: { ...state.data, ...partial } }));
    },

    batch(fn) {
      batching = true;
      try {
        fn();
      } finally {
        batching = false;
        if (dirtyWhileBatching) {
          dirtyWhileBatching = false;
          notify();
        }
      }
    },

    setCtx(ctx) {
      write(commit(state, { ctx: { ...state.ctx, ...ctx } }));
    },

    reset(data) {
      write(restart(state, initialState(data ?? {}, state.ctx)));
    },

    async validate(stepId) {
      const target = stepId ?? state.stack[state.stack.length - 1]?.step;
      if (target === undefined) return true;
      const errors = await validateStep(target);
      const failed = errors !== null && Object.keys(errors).length > 0;
      write(
        commit(state, {
          errors: failed
            ? { ...state.errors, [target]: errors }
            : Object.fromEntries(Object.entries(state.errors).filter(([k]) => k !== target)),
        })
      );
      return !failed;
    },

    setErrors(stepId, errors) {
      write(
        commit(state, {
          errors:
            errors === null
              ? Object.fromEntries(Object.entries(state.errors).filter(([k]) => k !== stepId))
              : { ...state.errors, [stepId]: errors },
        })
      );
    },

    patchFlow(patch) {
      const merged: FlowDefinition = {
        ...flow,
        ...patch,
        steps: { ...flow.steps, ...patch.steps },
      };
      const current = state.stack[state.stack.length - 1]?.step;
      // A patch that deletes the step the user is standing on is rejected rather
      // than repaired. Silently relocating them loses a half-filled form, and a
      // backend that sends such a patch has a bug worth surfacing.
      if (current !== undefined && merged.steps[current] === undefined) return false;
      flow = merged;
      write(commit(state, {}));
      return true;
    },

    isDestroyed: () => destroyed,

    destroy() {
      destroyed = true;
      controller?.abort();
      listeners.clear();
      // One teardown that throws must not strand the rest: the list is already
      // spliced, so an early exit would leak every plugin after the failure.
      for (const t of teardowns.splice(0)) {
        try {
          t();
        } catch (error) {
          console.error('[wizzard] a plugin threw while being torn down.', error);
        }
      }
    },
  };
}
