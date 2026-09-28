import { talks } from './registry';
import { openWizard } from './wizard';

const wizard = openWizard();
await wizard.start();
wizard.set('attendee', { name: 'Ada', email: 'ada@example.com' });
await wizard.next();
wizard.set('ticket', { kind: 'standard', guests: [] });

// Every commit of the move is watched: the wizard reports itself busy while
// the agenda loads, and `sessions` never becomes current before it arrives.
let waited = false;
let shownEmpty = false;
const stop = wizard.subscribe(() => {
  const now = wizard.getSnapshot();
  if (now.isBusy) waited = true;
  if (now.current === 'sessions' && talks.length === 0) shownEmpty = true;
});
await wizard.next();
stop();

console.log(`busy while loading: ${waited ? 'yes' : 'no'}`);
console.log(`shown before the agenda arrived: ${shownEmpty ? 'yes' : 'no'}`);
console.log(`at: ${String(wizard.getSnapshot().current)}`);
console.log(`talks: ${talks.join(', ')}`);
