import { createWizard, type Wizard } from '@wizzard-packages/core';

import { booking } from './flow';
import { offers } from './offers';
import { registry } from './registry';

// The annotation is what lets the plugin's arrow refer to `wizard` before the
// call that creates it has returned; the arrow runs only during a move.
export const wizard: Wizard = createWizard({
  flow: booking,
  registry,
  plugins: [offers(() => wizard)],
});
