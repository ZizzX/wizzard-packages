import { createWizard } from '@wizzard-packages/core/v1';

import { checkout } from './flow';

/**
 * The two rules side by side, with nothing rendering them.
 *
 * `coupon` declares `clearOnLeave`, so its slice is gone the moment the step is
 * left - forwards included. `company` declares nothing, so what it collected
 * stays in the data even after the visitor changes their mind and the step
 * drops off the route.
 */
const wizard = createWizard({ flow: checkout });

await wizard.start();
wizard.set('plan.payer', 'business');
await wizard.next();

wizard.set('company.name', 'Acme');
await wizard.next();

wizard.set('coupon.code', 'SPRING');
await wizard.next();

console.log(`step: ${String(wizard.getSnapshot().current)}`);
console.log(`submitted: ${JSON.stringify(wizard.getSnapshot().data)}`);

// The visitor changes their mind: back to the first step, and pay personally.
await wizard.go('plan');
wizard.set('plan.payer', 'personal');

// `company` is off the route now, so this lands on `coupon` and then `review`.
await wizard.next();
console.log(`skipped to: ${String(wizard.getSnapshot().current)}`);
await wizard.next();

console.log(`step: ${String(wizard.getSnapshot().current)}`);
console.log(`submitted: ${JSON.stringify(wizard.getSnapshot().data)}`);
