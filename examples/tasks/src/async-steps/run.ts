import { offerRequests } from './api';
import { seats } from './registry';
import { wizard } from './wizard';

await wizard.start();
wizard.set('passenger', { name: 'Ada' });

// Waits for `seatMap`, then lands.
await wizard.next();
console.log(`on ${wizard.getSnapshot().current}, seats: ${seats.join(', ')}`);

// The first offer request fails. The loader's exception is not a refusal:
// `next()` rejects with it, and the wizard is idle on the step it was on.
try {
  await wizard.next();
} catch (error) {
  console.log(`next() rejected: ${(error as Error).message}`);
}
console.log(`on ${wizard.getSnapshot().current}, busy: ${wizard.getSnapshot().isBusy}`);

// Retrying is calling `next()` again.
await wizard.next();
console.log(`on ${wizard.getSnapshot().current}: ${wizard.getFlow().steps['offer']?.label}`);

// Back and forward again: the installed body is no longer deferred.
await wizard.back();
await wizard.next();
console.log(`offer requested ${offerRequests()} times`);

wizard.destroy();
