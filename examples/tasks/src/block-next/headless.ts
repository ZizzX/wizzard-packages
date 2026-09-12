import { createWizard } from '@wizzard-packages/core/v1';

import { signup } from './flow';
import { registry } from './registry';

/**
 * The same guard without a framework. `next()` answers with a value either way,
 * so the refusal is read, not caught.
 */
const wizard = createWizard({ flow: signup, registry });

await wizard.start();
console.log(`step: ${String(wizard.getSnapshot().current)}`);

const refused = await wizard.next();
if (!refused.ok) {
  console.log(`next: ${refused.reason} (${JSON.stringify(refused.errors)})`);
  console.log(`step: ${String(wizard.getSnapshot().current)}`);
}

wizard.set('details.email', 'ada@example.com');
const moved = await wizard.next();
console.log(`next: ${moved.ok ? 'ok' : moved.reason}`);
console.log(`step: ${String(wizard.getSnapshot().current)}`);
