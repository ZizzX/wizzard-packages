import type { Hooks, Wizard } from '@wizzard-packages/core';

import { fetchOffer } from './api';

/**
 * The plugin that fills the `deferred` step. `loadStep` returns nothing the
 * engine reads: the body is installed with `patchFlow`, the one way a flow
 * changes shape while it runs.
 *
 * `patchFlow` is a method of the wizard, not of the host `init` receives, and
 * the plugin is built before the wizard exists. So it is handed a function
 * that returns the wizard, and calls it only once a move is under way.
 */
export const offers = (wizard: () => Wizard): Hooks => ({
  name: 'offers',
  loadStep: async (stepId, signal) => {
    if (stepId !== 'offer') return;
    const body = await fetchOffer(signal);
    // Replaces the step by id. The new body no longer says `deferred`, so
    // coming back to the step later does not fetch it again.
    wizard().patchFlow({ steps: { offer: body } });
  },
});
