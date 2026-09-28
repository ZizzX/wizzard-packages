import { defineFlow, step } from '@wizzard-packages/core';

/**
 * A conference registration, and the whole of it so far: who is coming, which
 * ticket, and a page to check both before sending.
 *
 * `step<T>` declares the shape of the answers a step collects, so `set` and
 * `get` know it. The object itself is still plain data.
 */
export const registration = defineFlow({
  id: 'registration',
  order: ['attendee', 'ticket', 'review'],
  steps: {
    attendee: step<{ name: string; email: string }>({ label: 'About you' }),
    ticket: step<{ kind: 'standard' | 'business' }>({ label: 'Your ticket' }),
    review: step({ label: 'Review' }),
  },
});
