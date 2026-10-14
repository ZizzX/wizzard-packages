import { defineFlow, step } from '@wizzard-packages/core';

/**
 * A signup that remembers where the user was. `version` is the application's
 * own: bump it when stored answers stop meaning what they did, and every
 * session saved under the old value is refused instead of misread.
 */
export const signup = defineFlow({
  id: 'signup',
  version: 1,
  order: ['name', 'plan', 'confirm'],
  steps: {
    name: step<{ first: string }>({ label: 'Your name' }),
    plan: step<{ tier: 'free' | 'pro' }>({ label: 'Plan' }),
    confirm: step({ label: 'Confirm' }),
  },
});
