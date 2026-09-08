import { defineFlow, step } from '@wizzard-packages/core/v1';
import { eq, get } from '@wizzard-packages/core/expr';

/**
 * R-A: onboarding with a conditional branch and backtracking.
 *
 * The whole route lives in this object. Nothing below it decides where the
 * visitor goes next, which is the point: the rendering is a switch over
 * `current`, and it stays a switch when a fourth step is added here.
 */
export const onboarding = defineFlow({
  id: 'onboarding',
  version: 1,
  order: ['details', 'verify', 'company', 'payment', 'review'],
  steps: {
    details: step<{ email: string; payer: 'personal' | 'business' }>({
      label: 'Details',
      validate: { $ref: 'details' },
    }),

    verify: step<{ code: string }>({
      label: 'Verify',
      validate: { $ref: 'verify' },
      // The code is a credential, not an answer. `true` drops the whole slice
      // whichever way the step is left, so it is never in the object the last
      // step submits and never sits in storage waiting to be restored.
      clearOnLeave: true,
      // A visitor who already has an account skips ahead. `company` and
      // `payment` stay reachable — they are jumped over, not excluded — so the
      // jump has to be an explicit target rather than a `when`.
      //
      // The list is exhaustive on purpose: a target list where nothing matches
      // ends the flow, so the ordinary route is spelled out after the fast
      // path. `company` is tried first and skipped when its own `when` is
      // false, which lands a personal payer on `payment`.
      on: { next: [{ to: 'review', when: get('ctx.returning') }, 'company', 'payment'] },
    }),

    company: step<{ name: string; vat: string }>({
      label: 'Company',
      // Reachability, not navigation: a step whose `when` is false is off the
      // route, so it is skipped forwards and backwards and drawn as a step this
      // visitor will not see.
      when: eq(get('data.details.payer'), 'business'),
      validate: { $ref: 'company' },
    }),

    payment: step<{ card: string }>({
      label: 'Payment',
      validate: { $ref: 'payment' },
    }),

    review: step({ label: 'Review' }),
  },
  policy: 'free',
});
