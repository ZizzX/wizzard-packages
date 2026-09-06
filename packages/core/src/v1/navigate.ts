import { add, beginNav, commit, isCurrent } from './commit';
import { testAsync, type AsyncRegistry, type Registry, type Scope } from './expr';
import { END, type FlowDefinition, type StepDef } from './flow';
import { unsetPath } from './path';
import { allowedByPolicy, reachable, resolveBack, resolveNext } from './resolve';

import type { Frame, WizardState } from './state';

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
 * Sub-flows and repeat groups push frames onto the stack, and this pass walks a
 * single level on its own. The traversal that walks the rest lives behind
 * `@wizzard-packages/core/groups` and is installed as `ctx.groups`: phase 0.5
 * asks it which flow owns the current frame and what the scope there is, phase
 * 4 asks it for the whole move, phase 8 asks it again when the data moved under
 * an await, and phase 9 commits the stack it returned. With nothing installed
 * every one of those falls back to the flat expression it replaced.
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

/**
 * Sub-flow definitions by the key a `GroupStep.flow` string names them by. The
 * same registry `checkSession` and `buildGraph` take: the expression `Registry`
 * holds resolver functions, not definitions, so a group referenced by id has
 * nothing else that could resolve it.
 */
export type SubFlows = Readonly<Record<string, FlowDefinition>>;

/**
 * Group and repeat traversal, installed rather than imported.
 *
 * The implementation is `@wizzard-packages/core/groups`, its own entry with its
 * own budget, so a flat flow carries none of it. The type lives here because a
 * type costs a bundle nothing and this entry has to be able to accept one.
 */
export interface Traversal {
  /** Phase 0.5: the flow that owns the top frame, and the scope at that frame. */
  here: (
    root: FlowDefinition,
    state: WizardState,
    registry?: Registry,
    subFlows?: SubFlows
  ) => { flow: FlowDefinition; scope: Scope };
  /**
   * Phase 4: the whole move, pure. `null` means no target.
   *
   * `flow` is the flow that owns the *new* top frame, which is not always the
   * one `here` named: a move that enters or leaves a group changes which flow
   * phases 5-7 have to look the target up in.
   */
  step: (
    root: FlowDefinition,
    state: WizardState,
    intent: NavIntent,
    registry?: Registry,
    subFlows?: SubFlows
  ) =>
    | { stack: readonly Frame[]; to: string | typeof END; flow: FlowDefinition; scope: Scope }
    | {
        ok: false;
        reason: 'invalid' | 'not-reachable';
        by: string;
        errors?: Readonly<Record<string, string>>;
      }
    | null;
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
  /**
   * Runs the load of a step before entering it.
   *
   * Both the reference and the scope arrive from the pipeline rather than being
   * looked back up. A step inside a sub-flow has no id in the root flow, and
   * the scope the resolver needs is the one *after* the move: on entry to a
   * repeat, `loop` does not exist in the committed state at all, and on an
   * advance it still names the item being left.
   */
  load?: (stepId: string, load: unknown, scope: Scope, signal: AbortSignal) => Promise<void>;
  /** Group and repeat traversal. Absent means flat flows only. */
  groups?: Traversal;
  /** Sub-flow definitions a string `GroupStep.flow` names. */
  subFlows?: SubFlows;
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

/**
 * The back stack a backward move to `target` leaves behind.
 *
 * `resolveBack` walks `order`, so it skips records for steps that have since
 * become unreachable: returning to `a` from `c` with `b`'s `when` now false has
 * to drop `[b]`'s record as well, or `canBack` keeps offering a step `back()`
 * would refuse. A target no record names — an `on.back` to somewhere never
 * visited — pops one, which is all there is to go on.
 */
function rewind(history: WizardState['history'], target: string): WizardState['history'] {
  for (let i = history.length - 1; i >= 0; i--) {
    const stack = history[i];
    if (stack !== undefined && stack[stack.length - 1]?.step === target) return history.slice(0, i);
  }
  return history.slice(0, -1);
}

const superseded: NavResult = { ok: false, reason: 'superseded' };
const aborted: NavResult = { ok: false, reason: 'aborted' };

export async function runNav(
  ctx: NavContext,
  host: NavHost,
  intent: NavIntent,
  opts: { validate?: boolean } = {}
): Promise<NavResult> {
  const { flow, groups: traversal, registry, subFlows } = ctx;

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
    // A redirect replaces the intent rather than overriding the answer to it:
    // the traversal has to see a jump as a jump, or a redirect into or out of a
    // group resolves `next` and skips the frames the move should push or pop.
    let want: NavIntent = intent;
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
      if (decision && 'redirect' in decision) want = { type: 'go', to: decision.redirect };
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

    // 0.5. The flow that owns the current frame, and the scope at it. Without a
    // traversal that is the root flow and `{ data, ctx }`, which is what phases
    // 3 to 9 read directly before groups existed.
    const at0 = host.read();
    const at = traversal?.here(flow, at0, registry, subFlows) ?? {
      flow,
      scope: scopeOf(at0),
    };

    // 3. Exit guard.
    if (from !== null) {
      const exit = at.flow.steps[from]?.guards?.exit;
      const allowed = await testAsync(exit, at.scope, registry);
      if (stale()) return superseded;
      if (!allowed) return fail({ ok: false, reason: 'blocked', by: from });
    }

    // 4. Resolve the target. Pure, and therefore testable on its own.
    const state = host.read();
    const move = traversal?.step(flow, state, want, registry, subFlows);
    if (move && 'ok' in move) return fail(move);

    const target = move
      ? move.to
      : want.type === 'go'
        ? want.to
        : want.type === 'back'
          ? resolveBack(at.flow, state, at.scope, registry)
          : resolveNext(at.flow, state, at.scope, registry);

    if (target === null || move === null) return fail({ ok: false, reason: 'no-target' });

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

    // 5. Reachability, then policy. Inside a group both are the sub-flow's
    // question: `reachable` on the root would not contain a child step at all.
    const where = move ?? at;
    const step = where.flow.steps[target];
    if (!step) return fail({ ok: false, reason: 'no-target' });

    const active = reachable(where.flow, where.scope, registry);
    if (!active.includes(target)) return fail({ ok: false, reason: 'not-reachable', by: target });

    if (
      intent.type === 'go' &&
      !intent.force &&
      !allowedByPolicy(where.flow, state, target, active)
    ) {
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
          await ctx.load(target, step.load, where.scope, controller.signal);
        }
      } finally {
        ctx.signal?.removeEventListener('abort', onAbort);
      }

      if (stale()) return superseded;
      if (ctx.signal?.aborted === true) return fail(aborted);
    }

    // 7. Enter guard. A group move brings its own scope, because the target's
    // `loop` does not exist anywhere until the move that creates it.
    const canEnter = await testAsync(
      step.guards?.enter,
      move ? move.scope : scopeOf(host.read()),
      registry
    );
    if (stale()) return superseded;
    if (!canEnter) return fail({ ok: false, reason: 'blocked', by: target });

    // 8. Last check before anything is written.
    if (ctx.signal?.aborted === true) return fail(aborted);

    // The state phase 9 commits from, read here because phase 8 needs it too
    // and the recheck between them is pure.
    const before = host.read();

    // `store.set` during phases 6 and 7 bumps `rev` and not `nav`, so the stale
    // check above does not see it. A flat target is a step id and no write can
    // move it; a group move is a stack computed from a list that may no longer
    // exist, so it is recomputed and superseded when the answer changed.
    if (move && before.rev !== state.rev) {
      const again = traversal?.step(flow, before, want, registry, subFlows);
      // The stacks are serialized rather than walked frame by frame: both come
      // out of the same `step()`, which builds every frame from one of two
      // literals, so the key order is fixed. A false difference would only
      // supersede, which is the safe direction.
      if (!again || 'ok' in again || JSON.stringify(again.stack) !== JSON.stringify(move.stack)) {
        return fail(superseded);
      }
    }

    // 9. Commit. One write, one notification.
    host.write(
      commit(before, {
        status: 'idle',
        stack: move
          ? move.stack
          : [...before.stack.slice(0, -1), { flow: at.flow.id, step: target }],
        // A back stack only grows going forward. Appending on a backward move
        // too left `canBack` true at the first step while `back()` answered
        // `no-target`, and would make a history-driven `back()` inside a repeat
        // oscillate between two items.
        history:
          from === null
            ? before.history
            : forward
              ? [...before.history, before.stack]
              : rewind(before.history, target),
        visited: add(before.visited, target),
        completed: forward && from !== null ? add(before.completed, from) : before.completed,
        busy: before.busy.filter((id) => id !== target),
        data: from === null ? before.data : leave(at.flow, from, before.data),
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
