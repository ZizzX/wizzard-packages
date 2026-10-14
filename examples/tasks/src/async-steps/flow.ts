import { defineFlow, step } from '@wizzard-packages/core';

/**
 * A booking with two steps that cannot be shown the moment they are reached.
 *
 * `seats` has a `load`: the move waits on the named resolver before it lands.
 * `offer` is `deferred`: the definition holds no body for it, and the move
 * waits on every plugin's `loadStep` before it lands.
 */
export const booking = defineFlow({
  id: 'booking',
  order: ['passenger', 'seats', 'offer', 'review'],
  steps: {
    passenger: step<{ name: string }>({ label: 'Passenger' }),
    seats: step<{ seat: string }>({
      label: 'Pick a seat',
      // `args` is plain JSON and reaches the resolver as its first argument.
      load: { $ref: 'seatMap', args: { plane: 'a320' } },
    }),
    offer: step({ label: 'Your offer', deferred: true }),
    review: step({ label: 'Review' }),
  },
});
