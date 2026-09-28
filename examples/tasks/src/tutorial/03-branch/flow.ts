import { defineFlow, step } from '@wizzard-packages/core';
import { eq, get } from '@wizzard-packages/core/expr';

/**
 * A conference registration, and the whole of it so far: who is coming, which
 * ticket, and a page to check both before sending.
 *
 * `step<T>` declares the shape of the answers a step collects, so `set` and
 * `get` know it. The object itself is still plain data.
 */
export const registration = defineFlow({
  id: 'registration',
  order: ['attendee', 'ticket', 'company', 'review'],
  steps: {
    attendee: step<{ name: string; email: string }>({
      label: 'About you',
      // A name, not a function: the flow stays JSON, and `registry.ts` says
      // what the name means.
      validate: { $ref: 'attendeeComplete' },
    }),
    ticket: step<{ kind: 'standard' | 'business' }>({ label: 'Your ticket' }),
    // On the route only while the ticket says business. `eq(get(...), ...)`
    // builds an expression - data, like the rest of the flow.
    company: step<{ name: string }>({
      label: 'Your company',
      when: eq(get('data.ticket.kind'), 'business'),
    }),
    review: step({ label: 'Review' }),
  },
});
