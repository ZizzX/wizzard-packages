import type { AsyncRegistry } from '@wizzard-packages/core';

import { fetchSeats } from './api';

/**
 * Where the seat map lands. `load` gates the step and discards what it
 * returns, so the resolver puts the answer somewhere itself - here, a module;
 * in an app, a store or a query cache.
 */
export const seats: string[] = [];

/** Handed to `createWizard` as `registry`; `load: { $ref: 'seatMap' }` names this. */
export const registry: AsyncRegistry = {
  // `args` is the definition's `args`, `scope` is where the target sits, and
  // `signal` aborts when the move is cancelled or the wizard destroyed.
  seatMap: async (args, _scope, signal) => {
    const { plane } = args as { plane: string };
    seats.splice(0, seats.length, ...(await fetchSeats(plane, signal)));
  },
};
