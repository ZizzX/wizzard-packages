import type { AsyncRegistry } from '@wizzard-packages/core';

/**
 * The registry the application ships. Annotated as `AsyncRegistry`, so each
 * resolver's `args` and `scope` are typed without writing them out.
 */
export const registry: AsyncRegistry = {
  tripRules: (_args, scope) => {
    const trip = scope.data['trip'] as { name?: string } | undefined;
    return trip?.name ? null : { name: 'required' };
  },
};
