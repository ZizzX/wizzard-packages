import { defineFlow, group, step } from '@wizzard-packages/core';

/** The flow under test: a trip that must be named before payment. */
export const booking = defineFlow({
  id: 'booking',
  order: ['trip', 'payment'],
  steps: {
    trip: step<{ name: string }>({ label: 'Trip', validate: { $ref: 'tripRules' } }),
    payment: step({ label: 'Payment' }),
  },
});

/** A flow with a group step, which needs the traversal from `core/groups` to run. */
export const withGroups = defineFlow({
  id: 'with-groups',
  order: ['travellers'],
  steps: {
    travellers: group({ label: 'Travellers', flow: 'traveller' }),
  },
});
