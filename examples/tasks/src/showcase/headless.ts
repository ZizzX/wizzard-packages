import { createWizard } from '@wizzard-packages/core';
import type { Wizard, WizardState } from '@wizzard-packages/core';
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

await wizard.start();
console.log(`at: ${where()}`);

wizard.set('trip', {
  destination: 'JP',
  travellers: [
    { id: 'a1', name: 'Ada', type: 'adult' },
    { id: 'c1', name: 'Cy', type: 'child' },
  ],
});

// Into the group: one pass of the sub-flow per traveller, keyed by id.
await wizard.next();
console.log(`at: ${where()}`);

// A step inside a repeat runs once per item, so what it collects is written at
// a path carrying the item's key.
wizard.set('people.a1.passport', 'PA-118');
await wizard.next();
console.log(`at: ${where()}`);

// The child skips `meal`, because the branch is inside the repeat.
await wizard.next();
console.log(`at: ${where()}`);

// Written out and read back while the wizard stands two frames deep, which is
// the case a flat snapshot cannot express: the group, its key and the step
// inside it all have to survive.
const saved = JSON.parse(JSON.stringify(toSnapshot(wizard.getState(), booking))) as unknown;
const restored = decodeSnapshot(booking, saved, { subFlows: { passenger } });
if (!restored.restored) throw new Error(restored.reason);
wizard = open(restored.state);
console.log(`restored at: ${where()}`);
console.log(`restored answer: ${String(wizard.get('people.a1.passport'))}`);

// Out of the group and into the step that loads before it is shown.
await wizard.next();
console.log(`at: ${where()}`);
console.log(`seat map loaded: ${seatsByRow.join(', ')}`);

// A branch on an answer given four steps earlier.
await wizard.next();
console.log(`at: ${where()}`);

await wizard.next();
console.log(`at: ${where()}`);

// The validator refuses, and says which field.
const refused = await wizard.next();
console.log(`refused: ${refused.ok ? 'no' : refused.reason}`);

wizard.set('payment', { card: '4242' });
await wizard.next();
console.log(`at: ${where()}`);
