import { empty, get, not } from '@wizzard-packages/core/expr';
import { defineFlow, group, step } from '@wizzard-packages/core/v1';

import type { SubFlows } from '@wizzard-packages/core/v1';

/**
 * R-C: one block of steps per passenger.
 *
 * A repeat group is a sub-flow entered once per item, so the two questions each
 * passenger answers are written once, here, and the engine runs them as many
 * times as there are passengers. Adding a fourth passenger is a write to
 * `data.passengers`; nothing in the definition and nothing in the rendering
 * knows how many there are.
 */
export const passenger = defineFlow({
  id: 'passenger',
  order: ['seat', 'meal'],
  steps: {
    seat: step({ label: 'Seat' }),
    meal: step({ label: 'Meal' }),
  },
  policy: 'free',
});

export const trip = defineFlow({
  id: 'trip',
  version: 1,
  order: ['party', 'people', 'review'],
  steps: {
    party: step({ label: 'Who is travelling' }),

    people: group({
      label: 'Passengers',
      flow: 'passenger',
      // A group is a step, so it answers to its own `when` first: an empty list
      // means the group is not on the route and the flow walks past it.
      when: not(empty(get('data.passengers'))),
      // `keyBy` is what makes a position durable. The index moves when the list
      // is reordered or one is removed; the key does not, so a frame that names
      // a key still names the same passenger afterwards.
      repeat: { over: get('data.passengers'), keyBy: 'id' },
    }),

    review: step({ label: 'Review' }),
  },
  policy: 'free',
});

/** A string `flow` is resolved here, the way a host resolves any other name. */
export const subFlows: SubFlows = { passenger };

/**
 * Where one passenger's answers live.
 *
 * The engine does not namespace an item's data: `set` writes the literal path
 * it is given, and a sub-flow step called `seat` would otherwise write the same
 * `data.seat` for every passenger. The host decides where the answers go and
 * builds the path from the item's key, which is what `loop.key` exists for on
 * the flow side.
 */
export const answerPath = (key: string, field: 'seat' | 'meal'): string =>
  `answers.${key}.${field}`;

/** One passenger to begin with, so the first thing on screen is a list of one. */
export const initialData = (): Record<string, unknown> => ({
  passengers: [{ id: 'p1', name: 'Ada' }],
});
