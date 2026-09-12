import { defineFlow, step } from '@wizzard-packages/core/v1';

/**
 * The smallest flow with a guard on it: one step that will not be left until
 * its validator is happy, and somewhere to go once it is.
 *
 * `validate` names a resolver rather than holding a function, because the flow
 * has to stay JSON. `registry.ts` is where that name is answered.
 */
export const signup = defineFlow({
  id: 'block-next',
  order: ['details', 'done'],
  steps: {
    details: step<{ email: string }>({
      label: 'Your details',
      validate: { $ref: 'details' },
    }),
    done: step({ label: 'Done' }),
  },
});
