import type { RestoreOutcome, SyncStorage } from '@wizzard-packages/plugins/persist';

import { openWizard } from './wizard';

// A reload without a browser: the plugin needs three methods of storage, and
// a Map behind them is enough to show the round trip.
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

const said = (outcome: RestoreOutcome | null): string =>
  outcome === null ? 'nothing' : outcome.restored ? 'restored' : outcome.reason;

let outcome: RestoreOutcome | null = null;
const first = openWizard({ storage, onRestore: (o) => (outcome = o) });
await first.start();
console.log(`first visit: ${said(outcome)}`);

first.set('attendee', { name: 'Ada', email: 'ada@example.com' });
await first.next();
console.log(`left on: ${String(first.getSnapshot().current)}`);

// The tab closes. Writes are coalesced, and `destroy` flushes the last one -
// in a browser, the plugin does the same on `pagehide`.
first.destroy();

outcome = null;
const second = openWizard({ storage, onRestore: (o) => (outcome = o) });
await second.start();
console.log(`after reload: ${said(outcome)}`);
console.log(`back on: ${String(second.getSnapshot().current)}`);
console.log(`name kept: ${String(second.get('attendee')?.name)}`);
