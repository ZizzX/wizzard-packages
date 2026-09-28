import type { Wizard } from '@wizzard-packages/core';

import type { Guest } from '../07-plugin/flow';
import { talks } from '../07-plugin/registry';

/**
 * Where the rendered tutorial keeps its session, one key per binding. The page
 * mounts the React and the Vue wizard at once; under one key the one left idle
 * in its tab would write its older session over the other's progress.
 */
export const storageKey = (binding: 'react' | 'vue'): string =>
  `wizzard-tutorial-registration-${binding}`;

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

/**
 * A session restored onto `sessions` comes back without the agenda: the step's
 * `load` ran in the page that saved it, and `start()` does not run it again for
 * a wizard that is already on a step. Entering the step once more does.
 */
export const reloadAgenda = (wizard: Wizard): void => {
  if (wizard.getSnapshot().current === 'sessions' && talks.length === 0) {
    void wizard.go('sessions');
  }
};
