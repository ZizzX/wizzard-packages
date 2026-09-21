import { createWizard } from '@wizzard-packages/core';
import type { NavResult, Wizard, WizardState } from '@wizzard-packages/core';
import { groups } from '@wizzard-packages/core/groups';
import { decodeSnapshot, toSnapshot } from '@wizzard-packages/core/snapshot';

import { booking, passenger } from './flow';
import { registry, seatsByRow } from './registry';

/**
 * The whole flow walked by hand, so every feature it holds is visible as a
 * line of output rather than as a claim in prose.
 *
 * A binding makes these same calls for you; nothing here is a test helper.
 */
const open = (state?: WizardState): Wizard<typeof booking> =>
  createWizard({
    flow: booking,
    groups,
    subFlows: { passenger },
    registry,
    ...(state === undefined ? {} : { state }),
  });

let wizard: Wizard<typeof booking> = open();

/** The stack, not the step: inside a group, where you are needs every frame. */
const where = (): string =>
  wizard
    .getSnapshot()
    .stack.map((f) => (f.key === undefined ? f.step : `${f.step}[${f.key}]`))
    .join(' / ');

/** What refused a move, by the rule's own name for itself. */
const why = (r: NavResult): string => {
  if (r.ok) return 'nothing';
  return `${r.reason} by ${String(r.by)}`;
};

await wizard.start();
console.log(`at: ${where()}`);

wizard.set('trip', {
  destination: 'JP',
  travellers: [
    { id: 'a1', name: 'Ada', type: 'adult' },
    { id: 'c1', name: 'Cy', type: 'child' },
  ],
});

// The policy is `free`, so jumping is allowed and nothing has been left, so
// nothing is validated. The guard on `review` refuses anyway: it is a rule
// about the step being entered, not about the move that reached it.
const early = await wizard.go('review');
console.log(`refused: ${why(early)}`);

// Into the group: one pass of the sub-flow per traveller, keyed by id.
await wizard.next();
console.log(`at: ${where()}`);

// A step inside a repeat runs once per item, so what it collects is written at
// a path carrying the item's key.
wizard.set('people.a1.passport', 'PA118');
await wizard.next();
console.log(`at: ${where()}`);

// The child skips `meal`, because the branch is inside the repeat.
await wizard.next();
console.log(`at: ${where()}`);

// Written out and read back while the wizard stands two frames deep, which is
// the case a flat snapshot cannot express: the group, its key and the step
// inside it all have to survive.
const written = JSON.stringify(toSnapshot(wizard.getState(), booking));
const saved: unknown = JSON.parse(written);
const restored = decodeSnapshot(booking, saved, { subFlows: { passenger } });
if (!restored.restored) throw new Error(restored.reason);
wizard = open(restored.state);
console.log(`restored at: ${where()}`);
console.log(`restored answer: ${String(wizard.get('people.a1.passport'))}`);

// Out of the group and into the step that loads before it is shown. Every
// commit is watched: if `seats` were ever current while its map was still
// missing, the engine would have shown the step before `load` finished.
let shownEarly = false;
const stop = wizard.subscribe(() => {
  const current = wizard.getSnapshot().current;
  if (current === 'seats' && seatsByRow.length === 0) shownEarly = true;
});
await wizard.next();
stop();
console.log(`at: ${where()}`);
console.log(`shown before its map loaded: ${shownEarly ? 'yes' : 'no'}`);

// The branch, both ways. `visa` is part of the flow only while the answer
// says Japan, and the steps ahead are computed from it on every read.
wizard.set('trip.destination', 'FR');
console.log(`ahead for FR: ${wizard.getSnapshot().active.join(', ')}`);
wizard.set('trip.destination', 'JP');
console.log(`ahead for JP: ${wizard.getSnapshot().active.join(', ')}`);

await wizard.next();
console.log(`at: ${where()}`);

await wizard.next();
console.log(`at: ${where()}`);

// The other refusal, from the other rule: the validator on the step being left.
const refused = await wizard.next();
console.log(`refused: ${why(refused)}`);

wizard.set('payment', { card: '4242' });
await wizard.next();
console.log(`at: ${where()}`);
