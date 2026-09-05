import type { WizardState } from './state';

/**
 * The only place state is written.
 *
 * Every navigation reads, computes, and then lands here exactly once. Nothing
 * is written while an `await` is outstanding, so an aborted navigation leaves
 * no partial state behind — the failure mode that made 0.x flicker and, under
 * a fast double-click, strand the wizard between two steps.
 *
 * A lint rule keeps it that way: assignment to a state field anywhere outside
 * this file is an error.
 */
export function commit(state: WizardState, patch: Partial<WizardState>): WizardState {
  return { ...state, ...patch, rev: state.rev + 1 };
}

/**
 * A reset: the data starts over, the counters do not.
 *
 * `rev` keeps climbing because it is every selector's memoization key, and a
 * reset that replayed an earlier revision would serve the snapshot cached
 * before it. `nav` moves forward rather than starting again, so a navigation
 * still in flight when the reset lands finds its token superseded instead of
 * looking current again.
 */
export function restart(state: WizardState, fresh: WizardState): WizardState {
  return { ...fresh, rev: state.rev + 1, nav: state.nav + 1 };
}

/** Starts a navigation epoch. The returned token is re-checked after every await. */
export function beginNav(state: WizardState): { state: WizardState; token: number } {
  const token = state.nav + 1;
  return { state: { ...state, nav: token, status: 'busy' }, token };
}

/** True when this navigation is still the current one. */
export const isCurrent = (state: WizardState, token: number): boolean => state.nav === token;

/** Appends without duplicating — these lists are sets that had to stay JSON. */
export function add(list: readonly string[], id: string): readonly string[] {
  return list.includes(id) ? list : [...list, id];
}

export function remove(list: readonly string[], id: string): readonly string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : list;
}
