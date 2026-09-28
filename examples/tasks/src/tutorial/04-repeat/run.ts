import { openWizard } from './wizard';

const wizard = openWizard();

/** Where the wizard is: the group, the guest it is on, and the step inside. */
const where = (): string =>
  wizard
    .getSnapshot()
    .stack.map((f) => (f.key === undefined ? f.step : `${f.step}[${f.key}]`))
    .join(' / ');

await wizard.start();
wizard.set('attendee', { name: 'Ada', email: 'ada@example.com' });
await wizard.next();

wizard.set('ticket', { kind: 'standard', guests: [] });
console.log(`no guests: ${wizard.getSnapshot().active.join(', ')}`);

wizard.set('ticket.guests', [
  { id: 'g1', name: 'Grace' },
  { id: 'g2', name: 'Linus' },
]);
console.log(`two guests: ${wizard.getSnapshot().active.join(', ')}`);

await wizard.next();
console.log(`at: ${where()}`);

// The engine does not decide where a guest's answers go; a path with the
// guest's key in it keeps them apart.
wizard.set('guests.g1.diet', 'vegetarian');
await wizard.next();
console.log(`at: ${where()}`);
await wizard.next();
console.log(`at: ${where()}`);
await wizard.next();
await wizard.next();
console.log(`at: ${where()}`);
console.log(`Grace eats: ${String(wizard.get('guests.g1.diet'))}`);
