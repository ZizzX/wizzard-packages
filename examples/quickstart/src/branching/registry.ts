import type { AsyncRegistry } from '@wizzard-packages/core';

/**
 * The code the flow names. A validator answers with the messages it found,
 * keyed by field, or `null` when the step may be left.
 *
 * Not a boolean: `false` carries no message to show and does not stop the
 * move. Only an object with at least one key refuses it.
 */
export const registry: AsyncRegistry = {
  needsEmail: (_args, { data }) => {
    const details = data['details'] as { email?: string } | undefined;
    return details?.email ? null : { email: 'Enter an email address.' };
  },
};
