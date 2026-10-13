import { defineFlow, step } from '@wizzard-packages/core';
import { eq, get } from '@wizzard-packages/core/expr';

/**
 * The flow a group runs once per traveller. It is an ordinary definition and
 * does not know it is nested: whatever it needs from outside it reads from
 * `ctx`, which the group's `input` fills - `ctx.traveller`, `ctx.tier`.
 */
export const passenger = defineFlow({
  id: 'passenger',
  order: ['name', 'meal', 'lounge'],
  steps: {
    name: step({ label: 'Name' }),
    // Adults only. The branch is inside the repeat, so it is decided per item.
    meal: step({ label: 'Meal', when: eq(get('ctx.traveller.type'), 'adult') }),
    // A value from the root `ctx`, passed down by the group's `input`.
    lounge: step({ label: 'Lounge', when: eq(get('ctx.tier'), 'gold') }),
  },
});
