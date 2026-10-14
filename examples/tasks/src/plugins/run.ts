import { createWizard } from '@wizzard-packages/core';

import { audit } from './audit';
import { requireSignIn } from './auth';
import { checkout } from './flow';

let user: string | null = null;

// Plugins run in the order given; the first `beforeNavigate` to refuse ends a move.
const wizard = createWizard({
  flow: checkout,
  plugins: [audit(console.log), requireSignIn(() => user !== null)],
});

console.log(`coupon: ${String(wizard.get('cart.coupon'))}`);

await wizard.start();
await wizard.next();
// Refused by the `auth` plugin: a value, not an exception.
const refused = await wizard.next();
console.log(`refused: ${JSON.stringify(refused)}`);

user = 'ada';
await wizard.next();

// The application created the wizard, so it destroys it, and that runs every
// teardown `init` returned. A binding that created the wizard from options
// does this on unmount.
wizard.destroy();
