import { openWizard } from './wizard';

const wizard = openWizard();
await wizard.start();
wizard.set('attendee', { name: 'Ada', email: 'ada@example.com' });
await wizard.next();

// The steps ahead are worked out from the answers on every read.
wizard.set('ticket', { kind: 'standard' });
console.log(`standard: ${wizard.getSnapshot().active.join(', ')}`);
await wizard.next();
console.log(`at: ${String(wizard.getSnapshot().current)}`);

await wizard.back();
wizard.set('ticket', { kind: 'business' });
console.log(`business: ${wizard.getSnapshot().active.join(', ')}`);
await wizard.next();
console.log(`at: ${String(wizard.getSnapshot().current)}`);
