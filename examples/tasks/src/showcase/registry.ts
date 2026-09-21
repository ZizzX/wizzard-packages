import type { Scope } from '@wizzard-packages/core';

/** Where the seat map lands: a store, a cache - the engine does not care. */
export const seatsByRow: number[] = [];

/**
 * The two kinds of named function a definition can hold, side by side.
 *
 * `seatMap` is a `load`: the engine awaits it as the step is entered and
 * discards what it returns, so the resolver puts the answer somewhere itself.
 * `cardAccepted` is a `validate`: it answers with a map of messages, or `null`
 * when the step may be left.
 */
export const registry = {
  seatMap: async (): Promise<void> => {
    await Promise.resolve();
    seatsByRow.splice(0, seatsByRow.length, 11, 12, 14);
  },

  cardAccepted: (_args: unknown, scope: Scope) => {
    const payment = scope.data.payment as { card?: string } | undefined;
    const card = payment?.card ?? '';
    return card.length >= 4 ? null : { card: 'Enter the last four digits' };
  },
};
