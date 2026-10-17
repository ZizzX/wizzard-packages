import { createWizard } from '@wizzard-packages/core';

import { signup } from './flow';
import { registry } from './registry';

/**
 * The definition and the registry meet here, and this file plays the part a
 * component plays in an app: it starts the wizard, writes what a user would
 * type, asks to move, and destroys the wizard when it is done with it.
 */
const wizard = createWizard({ flow: signup, registry });

await wizard.start();
console.log(`step: ${String(wizard.getSnapshot().current)}`);

// Nothing typed yet, so `needsEmail` answers with a message and the move is refused.
const refused = await wizard.next();
console.log(
  `next: ${refused.ok ? 'ok' : `${refused.reason} ${JSON.stringify(wizard.getState().errors)}`}`
);

// A business payer: `company` is part of the flow, so Next lands on it.
wizard.set('details.email', 'ada@example.com');
wizard.set('details.payer', 'business');
await wizard.next();
console.log(`step: ${String(wizard.getSnapshot().current)}`);

await wizard.next();
console.log(`step: ${String(wizard.getSnapshot().current)}`);

// `on.back` sends Back from `payment` to `details`, past `company`.
await wizard.back();
console.log(`step: ${String(wizard.getSnapshot().current)}`);

// A personal payer: `company` drops out of the flow, and Next skips it.
wizard.set('details.payer', 'personal');
await wizard.next();
console.log(`step: ${String(wizard.getSnapshot().current)}`);

wizard.destroy();
