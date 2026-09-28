import { createWizard } from '@wizzard-packages/core';

import { registration } from './flow';

/**
 * Where the engine is built. Every later step adds to this one call - a
 * registry, group traversal, plugins - so it lives in a file of its own.
 */
export const openWizard = () => createWizard({ flow: registration });
