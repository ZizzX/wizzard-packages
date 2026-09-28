import { defineFlow, group, step } from '@wizzard-packages/core';
import { empty, eq, get, not } from '@wizzard-packages/core/expr';

/** Someone the attendee brings along. `id` is what keeps their answers theirs. */
export interface Guest {
  id: string;
  name: string;
}

/**
 * What each guest is asked. An ordinary flow: it does not know it runs once
 * per guest.
 */
export const guest = defineFlow({
  id: 'guest',
  order: ['badge', 'diet'],
  steps: {
    badge: step({ label: 'Name on the badge' }),
    diet: step({ label: 'Dietary needs' }),
  },
});

/**
 * A conference registration, and the whole of it so far: who is coming, which
 * ticket, and a page to check both before sending.
 *
 * `step<T>` declares the shape of the answers a step collects, so `set` and
 * `get` know it. The object itself is still plain data.
 */
export const registration = defineFlow({
  id: 'registration',
  // A flow with a repeat carries a version: a saved session names guests of a
  // list that may have changed shape since.
  version: 1,
  order: ['attendee', 'ticket', 'company', 'guests', 'review'],
  steps: {
    attendee: step<{ name: string; email: string }>({
      label: 'About you',
      // A name, not a function: the flow stays JSON, and `registry.ts` says
      // what the name means.
      validate: { $ref: 'attendeeComplete' },
    }),
    ticket: step<{ kind: 'standard' | 'business'; guests: Guest[] }>({ label: 'Your ticket' }),
    // On the route only while the ticket says business. `eq(get(...), ...)`
    // builds an expression - data, like the rest of the flow.
    company: step<{ name: string }>({
      label: 'Your company',
      when: eq(get('data.ticket.kind'), 'business'),
    }),
    // The `guest` flow, once per guest, keyed by id - and skipped entirely
    // while there are none, which a repeat is required to say.
    guests: group({
      label: 'Guests',
      flow: 'guest',
      when: not(empty(get('data.ticket.guests'))),
      repeat: { over: get('data.ticket.guests'), keyBy: 'id' },
    }),
    review: step({ label: 'Review' }),
  },
});
