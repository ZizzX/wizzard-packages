import { add, beginNav, commit, isCurrent } from './commit';
import { testAsync, type AsyncRegistry, type Scope } from './expr';
import { END, type FlowDefinition, type StepDef } from './flow';
import { unsetPath } from './path';
import { allowedByPolicy, reachable, resolveBack, resolveNext } from './resolve';

import type { WizardState } from './state';

/**
 * The navigation pipeline.
 *
 * Every way of moving — next, back, jump — runs through this one function, so
 * there is one place where validation, guards, loading and policy are ordered,
 * and one place that can get the ordering wrong. The 0.x engine implemented
 * this three times, in the React context, the React store and the Vue binding,
 * and the three copies disagreed about the default for validation and about
 * whether middleware ran at all.
 *
 * Two writes happen, and only two. The first is the epoch bump in phase 0,
 * which is the lock: a concurrent call has to see it to know it superseded us.
 * The second is the single commit in phase 9. Nothing is written in between, so
 * a navigation that loses the race, throws, or is aborted leaves no trace.
 *
 * Sub-flows and repeat groups push frames onto the stack. This pass handles a
 * single level and carries the stack through unchanged; group traversal arrives
 * with the frame-stack work and slots into phases 4 and 9.
 */

export type NavReason =
  | 'invalid'
  | 'blocked'
  | 'no-target'
  | 'superseded'
  | 'aborted'
  | 'not-reachable';

export type NavResult =
  | { ok: true; from: string | null; to: string | typeof END }
  | {
      ok: false;
      reason: NavReason;
      /** Which plugin or guard refused. Replaces the goToStepResult probe of 0.x. */
      by?: string;
      errors?: Readonly<Record<string, string>>;
    };

export type NavIntent =
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'go'; to: string; force?: boolean };

/** What a plugin may answer from beforeNavigate. */
export type NavDecision = void | false | { block: string } | { redirect: string };

export interface Hooks {
  name: string;
  /**
   * Runs once, when the engine is built, before anything reads it. A plugin
   * that restores a saved session does it here. The returned function, if any,
   * runs on `destroy`.
   *
   * A commit made from inside `init` does not come back as `onCommit`: the
   * plugin already knows what it just wrote, and re-entering is how a restore
   * turns into a loop.
   */
  init?: (host: PluginHost) => void | (() => void);
  /**
   * Every committed state, from any path - navigation, `set`, `patch`,
   * `setCtx`, `reset`, `patchFlow`. A plugin that persists writes here.
   *
   * Not a veto and not a place to be slow: it runs inside the write, so
   * throwing disables the plugin rather than failing the write.
   */
  onCommit?: (state: WizardState, previous: WizardState) => void;
  beforeNavigate?: (e: {
    from: string | null;
    to: string | typeof END | null;
    state: WizardState;
  }) => NavDecision | Promise<NavDecision>;
  afterNavigate?: (e: { from: string | null; to: string | typeof END; state: WizardState }) => void;
  /** Supplies the body of a deferred step, typically over the network. */
  loadStep?: (stepId: string, signal: AbortSignal) => Promise<StepDef | undefined>;
}

/** What a plugin is handed at `init`. Deliberately small: read, and write once. */
export interface PluginHost {
  getState: () => WizardState;
  getFlow: () => FlowDefinition;
  /** Replaces state through the one commit path, exactly as the engine does. */
  commit: (patch: Partial<WizardState>) => void;
}

export interface NavHost {
  read: () => WizardState;
  /** The single setter owned by the store. Notifies listeners exactly once. */
  write: (next: WizardState) => void;
}

export interface NavContext {
  flow: FlowDefinition;
  registry?: AsyncRegistry;
  hooks?: readonly Hooks[];
  /** Returns field errors, or null when the step is valid. */
  validate?: (
    stepId: string,
    state: WizardState
  ) => Promise<Readonly<Record<string, string>> | null>;
  /** Runs the load of a step before entering it. */
  load?: (stepId: string, args: unknown, signal: AbortSignal) => Promise<void>;
  signal?: AbortSignal;
}

const scopeOf = (s: WizardState): Scope => ({ data: s.data, ctx: s.ctx });
const currentOf = (s: WizardState): string | null => s.stack[s.stack.length - 1]?.step ?? null;

/** Applies the left step's `clearOnLeave`. Pure: the commit below writes the result. */
function leave(flow: FlowDefinition, from: string, data: WizardState['data']): WizardState['data'] {
  const step = flow.steps[from];
  const clear = step?.clearOnLeave;
  if (clear === undefined) return data;
  const paths = clear === true ? [step.slice ?? from] : clear;
  return paths.reduce((acc, path) => unsetPath(acc, path), data);
}

const superseded: NavResult = { ok: false, reason: 'superseded' };
const aborted: NavResult = { ok: false, reason: 'aborted' };

export async function runNav(
  ctx: NavContext,
  host: NavHost,
  intent: NavIntent,
  opts: { validate?: boolean } = {}
): Promise<NavResult> {
  const { flow } = ctx;

  // 0. Acquire.
  const { state: locked, token } = beginNav(host.read());
  host.write(locked);

  const from = currentOf(locked);
  const forward = intent.type !== 'back';
  const stale = (): boolean => !isCurrent(host.read(), token);

  /** Releases the lock without touching anything a newer navigation may own. */
  const fail = (result: NavResult): NavResult => {
    if (!stale()) host.write(commit(host.read(), { status: 'idle' }));
    return result;
  };

  try {
    // 1. beforeNavigate. Plugins run in registration order and may veto.
    let redirect: string | undefined;
    for (const h of ctx.hooks ?? []) {
      if (!h.beforeNavigate) continue;
      const decision = await h.beforeNavigate({
        from,
        to: intent.type === 'go' ? intent.to : null,
        state: host.read(),
      });
      if (stale()) return superseded;
      if (decision === false) return fail({ ok: false, reason: 'blocked', by: h.name });
      if (decision && 'block' in decision) {
        return fail({ ok: false, reason: 'blocked', by: decision.block });
      }
      if (decision && 'redirect' in decision) redirect = decision.redirect;
    }

    // 2. Validate the step being left.
    // Backwards is never validated: refusing to let someone go back because the
    // form is incomplete is exactly why they wanted to go back.
    if (forward && from !== null && opts.validate !== false && ctx.validate) {
      const errors = await ctx.validate(from, host.read());
      if (stale()) return superseded;
      if (errors && Object.keys(errors).length > 0) {
        // The one early commit: these errors are the result the caller asked for.
        const now = host.read();
        host.write(commit(now, { status: 'idle', errors: { ...now.errors, [from]: errors } }));
        return { ok: false, reason: 'invalid', by: from, errors };
      }
    }

    // 3. Exit guard.
    if (from !== null) {
      const exit = flow.steps[from]?.guards?.exit;
      const allowed = await testAsync(exit, scopeOf(host.read()), ctx.registry);
      if (stale()) return superseded;
      if (!allowed) return fail({ ok: false, reason: 'blocked', by: from });
    }

    // 4. Resolve the target. Pure, and therefore testable on its own.
    const state = host.read();
    const target =
      redirect ??
      (intent.type === 'go'
        ? intent.to
        : intent.type === 'back'
          ? resolveBack(flow, state, scopeOf(state), ctx.registry)
          : resolveNext(flow, state, scopeOf(state), ctx.registry));

    if (target === null) return fail({ ok: false, reason: 'no-target' });

    if (target === END) {
      host.write(
        commit(state, {
          status: 'done',
          completed: from ? add(state.completed, from) : state.completed,
        })
      );
      for (const h of ctx.hooks ?? []) h.afterNavigate?.({ from, to: END, state: host.read() });
      return { ok: true, from, to: END };
    }

    // 5. Reachability, then policy.
    const step = flow.steps[target];
    if (!step) return fail({ ok: false, reason: 'no-target' });

    const active = reachable(flow, scopeOf(state), ctx.registry);
    if (!active.includes(target)) return fail({ ok: false, reason: 'not-reachable', by: target });

    if (intent.type === 'go' && !intent.force && !allowedByPolicy(flow, state, target, active)) {
      return fail({ ok: false, reason: 'blocked', by: target });
    }

    // 6. Load. The only phase that may take real time.
    if (step.deferred === true || step.load !== undefined) {
      const busyAt = host.read();
      host.write(commit(busyAt, { busy: add(busyAt.busy, target) }));

      const controller = new AbortController();
      const onAbort = (): void => {
        controller.abort();
      };
      ctx.signal?.addEventListener('abort', onAbort, { once: true });
      try {
        if (step.deferred === true) {
          for (const h of ctx.hooks ?? []) {
            if (h.loadStep) await h.loadStep(target, controller.signal);
            if (stale()) return superseded;
          }
        }
        if (step.load !== undefined && ctx.load) {
          await ctx.load(target, step.load.args, controller.signal);
        }
      } finally {
        ctx.signal?.removeEventListener('abort', onAbort);
      }

      if (stale()) return superseded;
      if (ctx.signal?.aborted === true) return fail(aborted);
    }

    // 7. Enter guard.
    const canEnter = await testAsync(step.guards?.enter, scopeOf(host.read()), ctx.registry);
    if (stale()) return superseded;
    if (!canEnter) return fail({ ok: false, reason: 'blocked', by: target });

    // 8. Last check before anything is written.
    if (ctx.signal?.aborted === true) return fail(aborted);

    // 9. Commit. One write, one notification.
    const before = host.read();
    host.write(
      commit(before, {
        status: 'idle',
        stack: [...before.stack.slice(0, -1), { flow: flow.id, step: target }],
        // A back stack only grows going forward. Appending on a backward move
        // too left `canBack` true at the first step while `back()` answered
        // `no-target`, and would make a history-driven `back()` inside a repeat
        // oscillate between two items.
        history:
          from === null
            ? before.history
            : forward
              ? [...before.history, before.stack]
              : before.history.slice(0, -1),
        visited: add(before.visited, target),
        completed: forward && from !== null ? add(before.completed, from) : before.completed,
        busy: before.busy.filter((id) => id !== target),
        data: from === null ? before.data : leave(flow, from, before.data),
      })
    );

    // 10. afterNavigate. Cannot fail the navigation that already happened.
    for (const h of ctx.hooks ?? []) {
      try {
        h.afterNavigate?.({ from, to: target, state: host.read() });
      } catch (error) {
        // One broken analytics plugin must not break a checkout.
        console.error('[wizzard] afterNavigate threw in ' + h.name, error);
      }
    }

    return { ok: true, from, to: target };
  } catch (error) {
    if (!stale()) host.write(commit(host.read(), { status: 'idle' }));
    throw error;
  }
}
