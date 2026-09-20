import { defineFlow, group, step } from '@wizzard-packages/core';
import { and, empty, eq, get, not } from '@wizzard-packages/core/expr';

/** One traveller on the booking, as the trip step collects them. */
export interface Traveller {
  id: string;
  name: string;
  type: 'adult' | 'child';
}

/**
 * The sub-flow a group runs once per traveller.
 *
 * It is an ordinary definition: it has no idea it is nested, and it reads the
 * traveller through `ctx`, which the group's `input` fills. `meal` exists only
 * for adults, so the branch is inside the repeat rather than around it.
 */
export const passenger = defineFlow({
  id: 'passenger',
  version: 1,
  order: ['who', 'meal'],
  steps: {
    // No slice type on either: a step inside a repeat runs once per item, so
    // the data it collects is keyed by the item, at a path the app chooses.
    who: step({ label: 'Who is travelling' }),
    meal: step({ label: 'Meal', when: eq(get('ctx.traveller.type'), 'adult') }),
  },
});

/**
 * The booking, and the point of the page: branching, a repeat over a list,
 * a sub-flow, a step that loads before it is shown and a step guarded against
 * being entered early are five fields of one JSON object.
 *
 * `version` is not decoration. A flow containing a repeat must carry one,
 * because a restored snapshot names keys of a list that may have changed shape
 * since it was written.
 */
export const booking = defineFlow({
  id: 'booking',
  version: 1,
  order: ['trip', 'people', 'seats', 'visa', 'payment', 'review'],
  steps: {
    trip: step<{ destination: string; travellers: Traveller[] }>({
      label: 'The trip',
    }),

    // Once per traveller, and not at all while the list is empty - the `when`
    // a repeat is required to carry.
    people: group({
      label: 'Travellers',
      flow: 'passenger',
      when: not(empty(get('data.trip.travellers'))),
      repeat: { over: get('data.trip.travellers'), keyBy: 'id' },
      input: { traveller: get('loop.item') },
    }),

    // The seat map is not in the bundle. The engine waits on entry; where the
    // answer lands is the resolver's business.
    seats: step<{ row: number }>({
      label: 'Seats',
      load: { $ref: 'seatMap' },
    }),

    // A branch on an answer three steps back.
    visa: step<{ number: string }>({
      label: 'Visa',
      when: and(eq(get('data.trip.destination'), 'JP'), not(empty(get('data.trip.travellers')))),
    }),

    payment: step<{ card: string }>({
      label: 'Payment',
      validate: { $ref: 'cardAccepted' },
    }),

    // A guard is not a policy: it refuses entry on its own terms, however the
    // move that reached it was made.
    review: step({
      label: 'Review',
      guards: { enter: not(empty(get('data.payment.card'))) },
    }),
  },
  policy: 'free',
});
