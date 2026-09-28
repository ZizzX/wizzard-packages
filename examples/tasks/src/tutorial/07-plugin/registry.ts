import type { AsyncRegistry } from '@wizzard-packages/core';

/**
 * Where the agenda lands. `load` gates the step and discards what it returns,
 * so the resolver puts the answer somewhere itself - here, a module; in an app,
 * a store or a query cache.
 */
export const talks: string[] = [];

/**
 * The functions the flow names. A validator reads the answers and returns a
 * message per field that is wrong, or `null` when the step may be left.
 */
export const registry: AsyncRegistry = {
  attendeeComplete: (_args, scope) => {
    const attendee = scope.data['attendee'] as { name?: string; email?: string } | undefined;
    const errors: Record<string, string> = {};
    if (!attendee?.name?.trim()) errors['name'] = 'Enter your name.';
    if (!attendee?.email?.includes('@')) errors['email'] = 'Enter an email address.';
    return Object.keys(errors).length === 0 ? null : errors;
  },

  // Stands in for a fetch. A timer rather than a resolved promise, so the
  // answer arrives a whole task later - long after anything that did not wait
  // would have moved on.
  agenda: async () => {
    await new Promise((settle) => setTimeout(settle, 10));
    talks.splice(0, talks.length, 'Keynote', 'Flows as data', 'Testing wizards');
  },
};
