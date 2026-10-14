import { signup } from './flow';
import { keepSaved, openWizard, readSaved } from './session';

// A `Map` behind the two methods stands in for `localStorage`.
const kept = new Map<string, string>();
const store = {
  getItem: (key: string) => kept.get(key) ?? null,
  setItem: (key: string, value: string) => {
    kept.set(key, value);
  },
};

// The first visit: nothing stored, so the wizard starts at the first step.
const first = openWizard(signup, store, 'signup');
const stop = keepSaved(first, store, 'signup');
await first.start();
first.set('name', { first: 'Ada' });
await first.next();
first.set('plan', { tier: 'pro' });
stop();
first.destroy();
console.log(`saved on ${first.getSnapshot().current}`);

// A reload is a new wizard over the same bytes. It stands on the saved step
// with the saved answers before `start()` runs.
const second = openWizard(signup, store, 'signup');
console.log(
  `restored on ${second.getSnapshot().current}: ${String(second.get('name.first'))}, ${String(second.get('plan.tier'))}`
);
// Still started, as a fresh wizard is: a restored step that loads is entered again here.
await second.start();
second.destroy();

// The flow changed shape since, and its `version` says so: refused, not misread.
const changed = readSaved({ ...signup, version: 2 }, store, 'signup');
console.log(`after a version bump: ${changed?.restored === false ? changed.reason : 'restored'}`);

// A payload in an envelope format this build does not read is refused, unless
// `migrate` brings it forward one hop at a time. The format is `1` and has
// never been anything else, so `v: 0` here is a stand-in for an older one.
kept.set('old', JSON.stringify({ ...JSON.parse(kept.get('signup') ?? '{}'), v: 0 }));
const unread = readSaved(signup, store, 'old');
const migrated = readSaved(signup, store, 'old', {
  migrate: (snapshot) => (snapshot.v === 0 ? { ...snapshot, v: 1 } : snapshot),
});
console.log(
  `format 0: ${unread?.restored === false ? unread.reason : 'restored'}, with migrate: ${String(migrated?.restored)}`
);
