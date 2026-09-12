import { createWizard } from '@wizzard-packages/core/v1';
import { persist, type RestoreOutcome, type SyncStorage } from '@wizzard-packages/plugins/persist';

import { APP_VERSION, STORAGE_KEY, signup } from './flow';
import { describeRestore } from './outcome';

/**
 * A reload, without a browser to reload.
 *
 * The plugin writes to `localStorage` unless it is handed something else, and
 * what it needs is three methods. A `Map` behind them is enough to show the
 * whole round trip: fill a session in, throw the wizard away, build another
 * one over the same storage, and read what came back.
 */
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

const open = async (): Promise<{ wizard: ReturnType<typeof createWizard>; said: string }> => {
  let outcome: RestoreOutcome | null = null;
  const wizard = createWizard({
    flow: signup,
    plugins: [
      persist({
        key: STORAGE_KEY,
        version: APP_VERSION,
        storage,
        onRestore: (o) => {
          outcome = o;
        },
      }),
    ],
  });
  await wizard.start();
  return { wizard, said: describeRestore(outcome) };
};

const first = await open();
console.log(`first visit: ${first.said}`);
first.wizard.set('name.full', 'Ada');
await first.wizard.next();
console.log(`left on: ${String(first.wizard.getSnapshot().current)}`);

// The tab closes here. Writes are coalesced - one per frame, not one per
// keystroke - so the plugin flushes what is pending when it is torn down, which
// is what `destroy()` does and what a browser's `pagehide` does for it. Without
// this, the last answer would still be waiting on a timer nobody will see.
first.wizard.destroy();

// Nothing of the wizard above survives except the bytes.
const second = await open();
console.log(`after reload: ${second.said}`);
console.log(`back on: ${String(second.wizard.getSnapshot().current)}`);
console.log(`name kept: ${String(second.wizard.get('name.full'))}`);
