import { createWizard } from '@wizzard-packages/core/v1';

import { checkout } from './flow';
import { registry } from './registry';

/**
 * Where the messages live, with nothing rendering them: in the wizard's state,
 * keyed by field, put there either by the validator or by the host.
 */
const wizard = createWizard({ flow: checkout, registry });

await wizard.start();

const refused = await wizard.next();
if (!refused.ok) console.log(`both fields: ${JSON.stringify(refused.errors)}`);

wizard.set('details.email', 'ada@example.com');
const stillRefused = await wizard.next();
if (!stillRefused.ok) console.log(`email fixed: ${JSON.stringify(stillRefused.errors)}`);

// A message the engine could not have produced, put in the same place.
wizard.setErrors('details', { card: 'That card was declined.' });
console.log(`from the host: ${JSON.stringify(wizard.getSnapshot().errors['details'])}`);

wizard.set('details.card', '4242424242424242');
const moved = await wizard.next();
console.log(`next: ${moved.ok ? 'ok' : moved.reason}`);
console.log(`step: ${String(wizard.getSnapshot().current)}`);
console.log(`errors now: ${JSON.stringify(wizard.getSnapshot().errors['details'])}`);
