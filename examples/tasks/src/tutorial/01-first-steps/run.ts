import { openWizard } from './wizard';

const wizard = openWizard();

// Nothing is current until `start` enters the first step.
await wizard.start();
console.log(`at: ${String(wizard.getSnapshot().current)}`);

wizard.set('attendee', { name: 'Ada', email: 'ada@example.com' });
await wizard.next();
console.log(`at: ${String(wizard.getSnapshot().current)}`);

// Back does not throw away what was typed on the step it returns to.
await wizard.back();
console.log(`at: ${String(wizard.getSnapshot().current)}`);
console.log(`name: ${String(wizard.get('attendee')?.name)}`);
console.log(`steps: ${wizard.getSnapshot().active.join(', ')}`);
