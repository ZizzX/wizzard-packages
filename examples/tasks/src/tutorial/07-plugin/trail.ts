import type { Hooks } from '@wizzard-packages/core';

/**
 * A plugin of your own: an object with a name and the hooks it needs. This one
 * reports every step the wizard lands on - the shape of an analytics event.
 *
 * `afterNavigate` runs once a move has committed, so it observes and cannot
 * undo; a plugin that must stop a move returns a refusal from
 * `beforeNavigate` instead.
 */
export const trail = (report: (step: string) => void): Hooks => ({
  name: 'trail',
  afterNavigate: ({ to }) => {
    report(String(to));
  },
});
