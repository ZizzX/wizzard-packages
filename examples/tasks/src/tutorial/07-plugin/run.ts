import type { SyncStorage } from '@wizzard-packages/plugins/persist';

import { openWizard } from './wizard';

const kept = new Map<string, string>();
const storage: SyncStorage = {
  getItem: (key) => kept.get(key) ?? null,
  setItem: (key, value) => {
    kept.set(key, value);
  },
  removeItem: (key) => {
    kept.delete(key);
  },
};

const landed: string[] = [];
const wizard = openWizard({ storage, onStep: (step) => landed.push(step) });

await wizard.start();
wizard.set('attendee', { name: 'Ada', email: '' });
// Refused by the validator: nothing committed, so nothing to report.
await wizard.next();
wizard.set('attendee.email', 'ada@example.com');
await wizard.next();
wizard.set('ticket', { kind: 'standard', guests: [{ id: 'g1', name: 'Grace' }] });
await wizard.next();
await wizard.next();
await wizard.next();

console.log(`landed on: ${landed.join(' -> ')}`);
