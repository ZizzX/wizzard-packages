import { defineFlow, group, step } from '@wizzard-packages/core';
import { empty, get, not } from '@wizzard-packages/core/expr';

export interface Traveller {
  id: string;
  type: 'adult' | 'child';
}

/**
 * The root flow. `party` collects the list, `people` runs `passenger` once per
 * item in it, and `review` comes after the last one.
 *
 * `flow: 'passenger'` is a name, not the definition, so this object stays JSON
 * on its own; `createWizard` is handed the definition under that name.
 */
export const trip = defineFlow({
  id: 'trip',
  // A flow holding a repeat needs a version: a restored snapshot names keys of
  // a list that may have changed shape since it was written.
  version: 1,
  order: ['party', 'people', 'review'],
  steps: {
    party: step<{ travellers: Traveller[] }>({ label: 'Who is travelling' }),
    people: group({
      label: 'Passengers',
      flow: 'passenger',
      // A repeat must be excluded while its list is empty.
      when: not(empty(get('data.party.travellers'))),
      repeat: { over: get('data.party.travellers'), keyBy: 'id' },
      input: { traveller: get('loop.item'), tier: get('ctx.user.tier') },
    }),
    review: step({ label: 'Review' }),
  },
  policy: 'free',
});
