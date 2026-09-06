import { defineFlow, step } from '@wizzard-packages/core/v1';

// The quickstart flow. A flow is JSON, so a server component can hand it to
// the provider as a prop without a serialisation boundary getting in the way.
export const signup = defineFlow({
  id: 'signup',
  order: ['name', 'review'],
  steps: {
    name: step<{ full: string }>({ label: 'Your name' }),
    review: step({ label: 'Review' }),
  },
});
