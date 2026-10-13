import { defineFlow, step } from '@wizzard-packages/core';

/**
 * The quickstart's next step up: a branch, a guarded step and a Back that
 * does not retrace the way it came.
 *
 * Still JSON. The validator is only a name here, `{ $ref: 'needsEmail' }`;
 * the function behind it lives in `registry.ts`, and the engine joins the two
 * when it runs.
 */
export const signup = defineFlow({
  id: 'signup',
  version: 1,
  order: ['details', 'company', 'payment'],
  steps: {
    details: step<{ email: string; payer: 'personal' | 'business' }>({
      label: 'Details',
      validate: { $ref: 'needsEmail' },
    }),
    company: step<{ name: string }>({
      label: 'Company',
      when: { $eq: [{ $get: 'data.details.payer' }, 'business'] },
    }),
    payment: step({ label: 'Payment', on: { back: 'details' } }),
  },
  policy: 'free',
});
