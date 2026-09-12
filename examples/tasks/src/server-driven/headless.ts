import { createWizard } from '@wizzard-packages/core/v1';

import { FROM_SERVER, PATCH_FROM_SERVER, registry } from './contract';
import { checkPatch, loadFlow } from './load';

/**
 * The contract end to end, without a framework: accept a definition, run it,
 * then accept a change to it - including the change the engine refuses, and the
 * one that never reaches the engine because it does not survive checking.
 */
const loaded = loadFlow(FROM_SERVER, registry);
if (!loaded.ok) {
  console.log(`refused: ${loaded.problems.length} problem(s)`);
  throw new Error('the fixture should load');
}

console.log(`loaded: ${loaded.flow.id}`);

const wizard = createWizard({ flow: loaded.flow, registry });
await wizard.start();
console.log(`step: ${String(wizard.getSnapshot().current)}`);

// Steps merge by id, so a patch names only what changes - after it is checked,
// because `patchFlow` installs whatever it is handed.
const patch = checkPatch(loaded.flow, PATCH_FROM_SERVER, registry);
console.log(`patch checked: ${patch.ok}`);
if (patch.ok) console.log(`patch applied: ${wizard.patchFlow(patch.patch)}`);
console.log(`active: ${wizard.getSnapshot().active.join(', ')}`);

// A patch that would break the flow, refused before the engine sees it.
const broken = checkPatch(loaded.flow, '{"order":1}', registry);
console.log(`broken patch checked: ${broken.ok}`);

// The one patch the engine itself refuses: it deletes the step someone is
// standing on. Built here, because JSON has no `undefined` to express it with.
const removal = { steps: { account: undefined } } as unknown as Parameters<
  typeof wizard.patchFlow
>[0];
console.log(`removal applied: ${wizard.patchFlow(removal)}`);
console.log(`step: ${String(wizard.getSnapshot().current)}`);
