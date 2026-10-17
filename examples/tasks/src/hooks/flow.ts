import { defineFlow, step } from '@wizzard-packages/core';

/** Two steps: name the trip, then look it over. */
export const trip = defineFlow({
  id: 'trip',
  order: ['details', 'review'],
  steps: {
    details: step<{ name: string }>({
      label: 'Trip details',
      validate: { $ref: 'tripNamed' },
    }),
    review: step({ label: 'Review' }),
  },
});
