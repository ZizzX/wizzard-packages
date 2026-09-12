import { defineFlow, step } from '@wizzard-packages/core/v1';

/**
 * One step with two fields, so there are two messages to place rather than one
 * sentence to print. That is the whole difficulty this page is about.
 */
export const checkout = defineFlow({
  id: 'render-field-errors',
  order: ['details', 'done'],
  steps: {
    details: step<{ email: string; card: string }>({
      label: 'Your details',
      validate: { $ref: 'details' },
    }),
    done: step({ label: 'Done' }),
  },
});
