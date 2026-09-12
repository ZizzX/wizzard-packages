import { defineFlow, step } from '@wizzard-packages/core/v1';

/** One key per flow. Change it and every stored session is orphaned. */
export const STORAGE_KEY = 'restore-after-reload';

/**
 * The application's own version, which is not the flow's. Bump it when the
 * meaning of what you collected changes, and sessions written before the change
 * are refused rather than half-read.
 */
export const APP_VERSION = 1;

export const signup = defineFlow({
  id: 'restore-after-reload',
  version: 1,
  order: ['name', 'colour', 'done'],
  steps: {
    name: step<{ full: string }>({ label: 'Your name' }),
    colour: step<{ favourite: string }>({ label: 'A colour' }),
    done: step({ label: 'Done' }),
  },
});
