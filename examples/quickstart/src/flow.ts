import { defineFlow, step } from '@wizzard-packages/core/v1';

/**
 * The smallest flow that is still a wizard: two steps, one field, and a value
 * that has to survive going back.
 *
 * A flow is data. This object is JSON — no functions, no classes — so the same
 * definition can come from a file, from a backend, or from a generator, and one
 * engine runs all three.
 */
export const signup = defineFlow({
  id: 'signup',
  order: ['name', 'review'],
  steps: {
    name: step<{ full: string }>({ label: 'Your name' }),
    review: step({ label: 'Review' }),
  },
});
