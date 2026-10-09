/**
 * What the theater's graph draws: the trip, read off the running wizard.
 *
 * The snapshot answers for the level the wizard stands on, and inside the
 * passenger group that is the sub-flow - `active` is `['details']`, a step the
 * trip's graph does not have. The graph is of the trip, so it is read the way a
 * binding would read the wizard if it stood on the group's own frame: the same
 * `createSelector` both bindings call, over the state with the stack cut to its
 * first frame. A refusal is the innermost step's, because that is the step the
 * validator ran on.
 */
import { createSelector, type FlowDefinition, type WizardState } from '@wizzard-packages/core';

import type { GraphView } from '../components/FlowGraph';

export function tripView(
  flow: FlowDefinition,
  state: WizardState
): { active: readonly string[]; view: GraphView } {
  const derived = createSelector(() => flow)({ ...state, stack: state.stack.slice(0, 1) });
  const here = state.stack.at(-1)?.step;
  return {
    active: derived.active,
    view: {
      standing: derived.current ?? derived.active[0] ?? null,
      breadcrumbs: derived.breadcrumbs,
      refused: here !== undefined && Object.keys(state.errors[here] ?? {}).length > 0,
      ended: state.status === 'done',
    },
  };
}
