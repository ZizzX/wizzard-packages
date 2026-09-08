/**
 * A recording, turned into the frames the inspector scrubs through.
 *
 * The engine is not involved and cannot be: a recording is a list of settled
 * states, and replaying it means reading each one the way a running wizard
 * would have been read. `createSelector` is exactly that reading — the same
 * function both bindings call — so the graph a scrubbed frame paints is the
 * graph the visitor saw when the frame was recorded, not a re-derivation that
 * could disagree with it.
 */
import { createSelector, type FlowDefinition, type WizardState } from '@wizzard-packages/core/v1';

import type { GraphView } from '../components/FlowGraph';
import type { RecordedSession } from '@wizzard-packages/core/session';

export interface ReplayFrame {
  state: WizardState;
  /** The steps whose `when` passed at this point in the run. */
  active: readonly string[];
  view: GraphView;
  /** `step 2 of 3`, or what the run was doing when there is no step yet. */
  caption: string;
}

/**
 * One selector per frame rather than one for the whole recording.
 *
 * `createSelector` memoizes on `rev`, which is the right key for a live wizard
 * whose `rev` only ever moves forward, and the wrong one for a list that is
 * read in any order and may hold two frames with the same `rev`. A selector per
 * frame is the same line of code and cannot return a neighbour's answer.
 */
export function replayFrames(
  session: RecordedSession,
  flow: FlowDefinition,
  registry?: Readonly<Record<string, unknown>>
): readonly ReplayFrame[] {
  return session.frames.map((state) => {
    const derived = createSelector(() => flow, registry as never)(state);

    const standing = derived.current ?? derived.active[0] ?? null;
    // The refusal that belongs to the step being drawn, not any refusal in the
    // state: a step left behind with errors on it is visited, not blocked.
    const refused =
      derived.current !== null && Object.keys(state.errors[derived.current] ?? {}).length > 0;
    const ended = state.status === 'done';

    // The first recorded frame is `init` with an empty stack, and it counts as
    // step one: `standing` is where the run is about to stand, which is the
    // same convention the hero's static frame uses. A caption saying "before
    // the first step" would describe a frame nobody scrubs to on purpose.
    const at = standing === null ? -1 : derived.active.indexOf(standing);
    const caption = ended
      ? 'end reached'
      : at === -1
        ? 'no steps on this route'
        : `step ${at + 1} of ${derived.active.length}`;

    return {
      state,
      active: derived.active,
      view: { standing, breadcrumbs: derived.breadcrumbs, refused, ended },
      caption,
    };
  });
}
