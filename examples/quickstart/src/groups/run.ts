import { createWizard } from '@wizzard-packages/core';
import { groups } from '@wizzard-packages/core/groups';

import { passenger } from './passenger';
import { trip } from './trip';

/**
 * Where the pieces meet. `groups` is the traversal for group steps, a separate
 * entry so a flow without groups never carries it. `subFlows` hands over the
 * definition `flow: 'passenger'` names. `ctx` is what the application knows
 * before the user types anything; the group's `input` reads `ctx.user.tier`
 * from it.
 *
 * This file plays the part a component plays in an app: it starts the wizard,
 * writes the answers, moves, and destroys the wizard when it is done.
 */
const wizard = createWizard({
  flow: trip,
  groups,
  subFlows: { passenger },
  ctx: { user: { tier: 'gold' } },
});

/** Every frame of the stack, the group's with the item's key. */
const where = (): string =>
  wizard
    .getSnapshot()
    .stack.map((f) => (f.key === undefined ? f.step : `${f.step}[${f.key}]`))
    .join(' / ');

await wizard.start();
console.log(`at: ${where()}`);

// The list the group repeats over is ordinary data, written by the first step.
wizard.set('party.travellers', [
  { id: 'ada', type: 'adult' },
  { id: 'cy', type: 'child' },
]);

// Into the group, and through each item: Ada gets every step, Cy skips `meal`.
for (let i = 0; i < 6; i++) {
  await wizard.next();
  const { index, active } = wizard.getSnapshot();
  console.log(`at: ${where()} (${index + 1} of ${active.length})`);
}

// Back from the step after the group goes in where the last item stopped.
await wizard.back();
console.log(`back: ${where()}`);

wizard.destroy();
