import { createWizard } from '@wizzard-packages/core';

import { trip } from './flow';
import { registry } from './registry';

/**
 * An engine built outside the component tree. It exists before anything
 * renders and outlives the components that show it: unmounting them leaves it
 * where it was, so the user comes back to the same step. The binding starts it
 * on mount and never destroys it - `destroy()` is yours, when the wizard is no
 * longer needed, and a plugin's teardown runs there.
 */
export const wizard = createWizard({ flow: trip, registry });
