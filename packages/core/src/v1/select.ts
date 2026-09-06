import { reachable, resolveBack } from './resolve';

import type { AsyncRegistry, Registry, Scope } from './expr';
import type { FlowDefinition } from './flow';
import type { WizardState } from './state';

/**
 * Derived values.
 *
 * None of this is stored. In 0.x `activeSteps`, `progress` and `breadcrumbs`
 * lived in the state, were written from the framework layer, and drifted out of
 * agreement with the data they were computed from — a step could be marked
 * completed while its own validation said otherwise.
 *
 * Recomputation is cheap and memoized on `rev`, which changes on every commit
 * and only on a commit. Identity is therefore stable between commits, which is
 * what `useSyncExternalStore` requires and what 0.x papered over with guards in
 * both bindings.
 */

export type StepStatus = 'completed' | 'current' | 'visited' | 'upcoming' | 'error';

export interface Breadcrumb {
  id: string;
  label?: string;
  status: StepStatus;
}

export interface Derived {
  /** Steps whose `when` passes right now, in order. */
  active: readonly string[];
  current: string | null;
  /** Position of the current step among the active ones, or -1. */
  index: number;
  isFirst: boolean;
  isLast: boolean;
  /** 0 to 100, over the active steps rather than all of them. */
  progress: number;
  breadcrumbs: readonly Breadcrumb[];
  canBack: boolean;
  isBusy: boolean;
  hasErrors: boolean;
}

const statusOf = (
  id: string,
  current: string | null,
  state: WizardState,
  index: number,
  at: number
): StepStatus => {
  if (id === current) return 'current';
  if (state.errors[id] && Object.keys(state.errors[id]).length > 0) return 'error';
  if (state.completed.includes(id)) return 'completed';
  if (state.visited.includes(id)) return 'visited';
  return at < index ? 'visited' : 'upcoming';
};

/**
 * Where the wizard is standing, when that is not simply the root flow.
 *
 * Supplied by the store, computed by whatever traversal is installed. Inside a
 * repeat group the breadcrumbs are the sub-flow's steps and `index` counts
 * within it — "step 2 of 3 for this passenger" — because a child step id is not
 * in the root's `order` at all and every derived value would otherwise read as
 * `-1` and `0%`.
 */
export interface ActiveAt {
  flow: FlowDefinition;
  scope: Scope;
  /** What `back()` would answer. Only a traversal can say, once inside a group. */
  canBack?: boolean;
}

function derive(
  flow: FlowDefinition,
  state: WizardState,
  registry?: Registry,
  at?: ActiveAt
): Derived {
  const scope: Scope = at?.scope ?? { data: state.data, ctx: state.ctx };
  const owner = at?.flow ?? flow;
  const active = reachable(owner, scope, registry);
  const current = state.stack[state.stack.length - 1]?.step ?? null;
  const index = current === null ? -1 : active.indexOf(current);

  return {
    active,
    current,
    index,
    isFirst: index === 0,
    isLast: index === active.length - 1 && active.length > 0,
    // Progress counts steps left behind, not the current one, so a wizard shows
    // 0% on the first step and 100% only once the last is finished.
    progress: active.length === 0 ? 0 : Math.round((Math.max(index, 0) / active.length) * 100),
    breadcrumbs: active.map((id, position) => {
      const label = owner.steps[id]?.label;
      const status = statusOf(id, current, state, index, position);
      return label === undefined ? { id, status } : { id, label, status };
    }),
    // The answer `back()` would give, not a guess at it. `index > 0 ||
    // history.length > 0` disagreed with the engine whenever a step behind the
    // current one stopped being reachable: the button was enabled and the move
    // then answered `no-target`. Before `start()` there is nothing to go back
    // from, so a fresh wizard says no rather than painting a button it flips.
    canBack:
      current !== null && (at?.canBack ?? resolveBack(owner, state, scope, registry) !== null),
    isBusy: state.status === 'busy' || state.busy.length > 0,
    hasErrors: Object.values(state.errors).some((e) => Object.keys(e).length > 0),
  };
}

/**
 * Builds a memoized selector for one wizard. Recomputes only when `rev` moves,
 * so repeated reads inside a render return the identical object.
 */
export function createSelector(
  flow: () => FlowDefinition,
  registry?: AsyncRegistry,
  at?: (state: WizardState) => ActiveAt
): (state: WizardState) => Derived {
  let cachedRev = -1;
  let cached: Derived | undefined;

  return (state) => {
    if (cached !== undefined && cachedRev === state.rev) return cached;
    cached = derive(flow(), state, registry as Registry, at?.(state));
    cachedRev = state.rev;
    return cached;
  };
}
