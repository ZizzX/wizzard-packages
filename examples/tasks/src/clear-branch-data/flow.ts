import { defineFlow, step } from '@wizzard-packages/core/v1';
import { eq, get } from '@wizzard-packages/core/expr';

/**
 * A branch, and one step whose answers must not travel with it.
 *
 * Two different rules are at work, and the page beside this file is about
 * telling them apart:
 *
 * - `when` decides whether a step is on the route. A visitor who picks
 *   `personal` never sees `company`, and anything they typed there before
 *   changing their mind is *kept* - the engine does not throw data away
 *   because a step stopped being reachable.
 * - `clearOnLeave` is the opposite instruction, and it is per step: drop this
 *   slice when the step is left, whichever way it is left. `coupon` is a code
 *   that was either applied or was not; carrying it into the submission would
 *   be keeping a receipt nobody asked for.
 */
export const checkout = defineFlow({
  id: 'clear-branch-data',
  version: 1,
  order: ['plan', 'company', 'coupon', 'review'],
  steps: {
    plan: step<{ payer: 'personal' | 'business' }>({ label: 'Who is paying' }),

    company: step<{ name: string }>({
      label: 'Company',
      when: eq(get('data.plan.payer'), 'business'),
    }),

    coupon: step<{ code: string }>({
      label: 'Coupon',
      clearOnLeave: true,
    }),

    review: step({ label: 'Review' }),
  },
  policy: 'free',
});
