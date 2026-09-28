import type { Wizard } from '@wizzard-packages/core';

import type { Guest } from '../07-plugin/flow';

/** Where the rendered tutorial keeps its session: one key for this page. */
export const STORAGE_KEY = 'wizzard-tutorial-registration';

/**
 * A key no guest has, and no guest's answers still sit under. The key is what
 * the group's frames and the answer paths name, so it is never reused.
 */
export const nextGuestId = (guests: readonly Guest[]): string => {
  let n = guests.length + 1;
  while (guests.some((g) => g.id === `g${n}`)) n += 1;
  return `g${n}`;
};

/**
 * A guest leaves with their answers, in one commit. Their key is part of a data
 * path, and answers left behind under it would belong to whoever is given that
 * key next.
 */
export const withoutGuest = (wizard: Wizard, id: string): void => {
  const data = wizard.getState().data;
  const guests = ((data['ticket'] as { guests?: Guest[] } | undefined)?.guests ?? []).filter(
    (g) => g.id !== id
  );
  const answers = { ...((data['guests'] as Record<string, unknown> | undefined) ?? {}) };
  delete answers[id];
  wizard.batch(() => {
    wizard.set('ticket.guests', guests);
    wizard.set('guests', answers);
  });
};
