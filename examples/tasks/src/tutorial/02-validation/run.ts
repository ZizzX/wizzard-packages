import { openWizard } from './wizard';

const wizard = openWizard();
await wizard.start();

wizard.set('attendee', { name: 'Ada', email: '' });

// A refusal is a value, not an exception: read it, do not catch it.
const refused = await wizard.next();
if (!refused.ok) console.log(`refused: ${refused.reason} ${JSON.stringify(refused.errors)}`);
console.log(`at: ${String(wizard.getSnapshot().current)}`);

// The messages are also in the wizard's state, where a form reads them.
console.log(`errors on attendee: ${JSON.stringify(wizard.getState().errors['attendee'])}`);

wizard.set('attendee.email', 'ada@example.com');
const moved = await wizard.next();
console.log(`next: ${moved.ok ? 'ok' : moved.reason}`);
console.log(`at: ${String(wizard.getSnapshot().current)}`);
