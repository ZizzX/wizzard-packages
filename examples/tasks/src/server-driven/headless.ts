import { createWizard } from '@wizzard-packages/core/v1';

import { FROM_SERVER, PATCH_FROM_SERVER, registry } from './contract';
import { loadFlow } from './load';

/**
 * The contract end to end, without a framework: accept a definition, run it,
 * then accept a change to it - including the change the engine refuses.
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

// Steps merge by id, so a patch names only what changes.
const patch = JSON.parse(PATCH_FROM_SERVER) as Parameters<typeof wizard.patchFlow>[0];
console.log(`patch applied: ${wizard.patchFlow(patch)}`);
console.log(`active: ${wizard.getSnapshot().active.join(', ')}`);

// The one patch the engine will not take: it deletes the step someone is
// standing on. Refused as a value, and the wizard does not move.
const removal = { steps: { account: undefined } } as unknown as Parameters<
  typeof wizard.patchFlow
>[0];
console.log(`removal applied: ${wizard.patchFlow(removal)}`);
console.log(`step: ${String(wizard.getSnapshot().current)}`);
