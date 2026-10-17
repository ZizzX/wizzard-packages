import type { AsyncRegistry } from '@wizzard-packages/core';

/** A validator returns a message per field that is wrong, or `null` when the step may be left. */
export const registry: AsyncRegistry = {
  tripNamed: (_args, scope) => {
    const name = (scope.data['details'] as { name?: string } | undefined)?.name ?? '';
    return name.trim() === '' ? { name: 'Give the trip a name.' } : null;
  },
};
