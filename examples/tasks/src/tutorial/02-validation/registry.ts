import type { AsyncRegistry } from '@wizzard-packages/core';

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
};
