---
title: Persistence
description: Turning a session into JSON, and refusing to restore one that no longer fits.
---

A wizard that loses everything on a refresh is a wizard nobody finishes. Persistence here is
two functions and a format: `toSnapshot` writes the session out, `decodeSnapshot` reads it back
and tells you why it could not. Both come from their own entry, so a flow that persists nothing
carries neither.

## A session, saved and read back

The example below does the whole round by hand: it saves a signup as the user answers, reads it
back in a second wizard as a reload would, and shows two sessions being refused. Every block is a
file from `examples/tasks/src/persistence` in the repository, and a test runs the script and
compares what it prints. The files sit side by side in one folder; `run.ts` awaits at the top
level, so it runs as an ES module - `"type": "module"` in the folder's `package.json` - under a
TypeScript runner such as `npx tsx run.ts`. Most applications let the [plugin](#letting-the-plugin-do-it)
do this wiring; the functions underneath are what it calls.

<!-- example:persistence-flow -->

<!-- prettier-ignore -->
```ts
import { defineFlow, step } from '@wizzard-packages/core';

/**
 * A signup that remembers where the user was. `version` is the application's
 * own: bump it when stored answers stop meaning what they did, and every
 * session saved under the old value is refused instead of misread.
 */
export const signup = defineFlow({
  id: 'signup',
  version: 1,
  order: ['name', 'plan', 'confirm'],
  steps: {
    name: step<{ first: string }>({ label: 'Your name' }),
    plan: step<{ tier: 'free' | 'pro' }>({ label: 'Plan' }),
    confirm: step({ label: 'Confirm' }),
  },
});
```

<!-- /example -->

`session.ts` is the part you would keep. `keepSaved` is the writing half and `readSaved` the
reading half; `openWizard` is the moment they meet, because a restored session is handed to
`createWizard` as its `state` and is read once, there.

<!-- example:persistence-session -->

<!-- prettier-ignore -->
```ts
import { createWizard, type FlowDefinition, type Wizard } from '@wizzard-packages/core';
import {
  decodeSnapshot,
  toSnapshot,
  type DecodeOptions,
  type RestoreResult,
} from '@wizzard-packages/core/snapshot';

/** Anything with the two methods; `localStorage` and `sessionStorage` qualify. */
export interface Store {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/**
 * The writing half. Every commit replaces the state, and `subscribe` hears
 * each one, so the stored session is never older than the last answer.
 * `toSnapshot` keeps what survives a reload - where the user is, how they got
 * there, what they answered - and drops what describes a moment, such as a
 * move in flight. The returned function stops the saving.
 */
export const keepSaved = (wizard: Wizard, store: Store, key: string): (() => void) =>
  wizard.subscribe(() => {
    store.setItem(key, JSON.stringify(toSnapshot(wizard.getState(), wizard.getFlow())));
  });

/**
 * The reading half. Nothing stored is the first visit; anything else goes
 * through `decodeSnapshot`, which never throws: it answers `restored: false`
 * with a reason when the payload no longer fits `flow`.
 */
export const readSaved = (
  flow: FlowDefinition,
  store: Store,
  key: string,
  options?: DecodeOptions
): RestoreResult | null => {
  const stored = store.getItem(key);
  if (stored === null) return null;
  let payload: unknown;
  try {
    payload = JSON.parse(stored);
  } catch {
    // Corrupted in place. `decodeSnapshot` refuses it as `snapshot/unreadable`.
    payload = undefined;
  }
  return decodeSnapshot(flow, payload, options);
};

/** A wizard over `flow`, restored from `store` when it holds a session that still fits. */
export const openWizard = (flow: FlowDefinition, store: Store, key: string): Wizard => {
  const result = readSaved(flow, store, key);
  // `state` is read once, here; a refused session starts fresh rather than half-restored.
  return createWizard({ flow, ...(result?.restored === true && { state: result.state }) });
};
```

<!-- /example -->

<!-- example:persistence-run -->

<!-- prettier-ignore -->
```ts
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
// `migrate` brings it forward one hop at a time.
kept.set('old', JSON.stringify({ ...JSON.parse(kept.get('signup') ?? '{}'), v: 0 }));
const unread = readSaved(signup, store, 'old');
const migrated = readSaved(signup, store, 'old', {
  migrate: (snapshot) => (snapshot.v === 0 ? { ...snapshot, v: 1 } : snapshot),
});
console.log(
  `format 0: ${unread?.restored === false ? unread.reason : 'restored'}, with migrate: ${String(migrated?.restored)}`
);
```

<!-- /example -->

<!-- example:persistence-output -->

<!-- prettier-ignore -->
```txt
saved on plan
restored on plan: Ada, pro
after a version bump: snapshot/other-flow
format 0: snapshot/version, with migrate: true
```

<!-- /example -->

## Two things named Snapshot

`@wizzard-packages/core` exports a `Snapshot` that is the live view a component renders -
the current step, the derived status of every other one. `@wizzard-packages/core/snapshot`
exports a different `Snapshot`: the storage format. They share a name and nothing else. Import
from the path that matches the job.

## The format

```ts
interface Snapshot {
  v: 1;
  flow: string;
  version?: number;
  stack: readonly Frame[];
  history: readonly (readonly Frame[])[];
  data: Record<string, unknown>;
  ctx: Record<string, unknown>;
  visited: readonly string[];
  completed: readonly string[];
  dirty: readonly string[];
  nav: number;
}
```

`v` is the format's own version and `flow`/`version` identify the definition it was taken
against. `stack` is where the user is, including their position inside nested groups;
`history` is how they got there, which is what makes `back()` land where they actually came
from rather than where `order` says.

## Restoring

Restoring is the interesting half, because a stored session meets a definition that has
changed since. `decodeSnapshot` never throws and never guesses: `openWizard` in `session.ts`
above passes `result.state` to `createWizard` only when `result.restored` is true, and starts the
user fresh otherwise.

A restored wizard stands on its step without having entered it in this page. `start()` enters a
step that loads - one with a `load`, or a `deferred` one - again, in place: the loader runs while
`isBusy` is true, and nothing is added to the history, so `back()` still goes where it went before.
The step is not being left, so nothing else runs: no plugin's `beforeNavigate` or `afterNavigate`,
no exit guard, no `when`. If the load throws or the enter guard refuses, the step stays current and
the next `start()` tries again. A step that loads nothing is simply current. A wizard passed in
through `state` with `status: 'done'` is not entered again: it stays finished. A snapshot does not
carry `status`, so a persisted wizard that finished comes back `idle` on its last step, and that
step, if it loads, loads again like any other restored step.

| `reason`                | What was wrong                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| `snapshot/unreadable`   | Not a snapshot: wrong shape, or not an object at all.                                          |
| `snapshot/version`      | Written by a snapshot format this build does not know, and `migrate` did not bring it forward. |
| `snapshot/other-flow`   | Taken against a different flow `id`, or a different flow `version` when both carry one.        |
| `snapshot/unknown-step` | Names a step this definition no longer has.                                                    |
| `snapshot/unstorable`   | Holds something that cannot survive the round trip.                                            |
| `snapshot/too-large`    | Past the size or nesting limit.                                                                |

`persist` reports `snapshot/other-flow` for one more case, before `decodeSnapshot` runs: its own
`version` option is set, and the stored session was written under another value or none.

Every one of these is a reason to start the user cleanly rather than to drop them into a step
that no longer exists. Refusing loudly at restore is the point of the format carrying `flow`
and `version` at all.

`DecodeOptions` covers the cases where a refusal is not what you want: `migrate` upgrades an
older payload before it is read, `epoch` sets the navigation epoch the restored session
continues from, and `subFlows` supplies the definitions a group step referenced by name.

## Migrating an older snapshot

Two different versions live in a stored session, and only one of them `migrate` is about.

`v` is the version of the snapshot format itself, which this library owns; it is `1` today.
`version` is the flow's own, which you own. A snapshot whose `version` does not match the
definition's, when both carry one, is refused with `snapshot/other-flow`, and no migration is consulted: a stored
session of a flow that has since changed shape is a session for a different flow. Migrating that
is a decision about your data, taken before the payload ever reaches `decodeSnapshot`.

`migrate` is for the envelope. It runs while `v` is behind the current format, once per hop, so
a payload two formats old is two ordinary steps rather than one function that knows every past
shape. The last lines of `run.ts` above pass one as `readSaved`'s options, which go to
`decodeSnapshot` unchanged: the same payload is refused without it and restored with it.

It stops when the version is current, after sixteen hops, or as soon as a call makes no
progress - returning the same object, or something that is not an object - and refuses with
`snapshot/version`. A migration that returns an object whose `v` is not a number is refused as
`snapshot/unreadable`, like any other payload that is not shaped like a snapshot.

Migration runs before validation, not after. Whatever it produced is then read like any other
stored payload: shape, flow id and version, frames, size, and what a JSON round trip survives.
A migration that writes a step name the flow no longer has is refused the same way a stale
snapshot would be, which is what makes a hand-written upgrade safe to run on input from storage.

## Letting the plugin do it

The two functions are the contract. `@wizzard-packages/plugins/persist` is the wiring most
applications want instead: it reads storage when the wizard is created, writes on every commit,
coalesces those writes to one per frame, and flushes what is pending when the page hides or the
wizard is destroyed. It ships in its own package:

<!-- example:install-plugins -->

<!-- prettier-ignore -->
```bash
pnpm add @wizzard-packages/core@canary @wizzard-packages/plugins@canary
```

<!-- /example -->

<!-- example:persist -->

<!-- prettier-ignore -->
```ts
import { createWizard } from '@wizzard-packages/core';
import { persist } from '@wizzard-packages/plugins/persist';

export const wizard = createWizard({
  flow: {
    id: 'signup',
    order: ['name', 'plan'],
    steps: { name: {}, plan: {} },
  },
  plugins: [
    persist({
      key: 'signup',
      // sessionStorage for anything that should not outlive the tab. This
      // stores whatever the flow collects, so that choice is yours to make.
      storage: globalThis.sessionStorage,
      onRestore: (outcome) => {
        if (!outcome.restored) console.info('starting fresh:', outcome.reason);
      },
    }),
  ],
});
```

<!-- /example -->

The restore happens inside `createWizard`, in the plugin's `init`, so the exported `wizard` already
stands on the saved step when the module has loaded. It still needs `start()`, which enters the
first step on a first visit and re-enters a restored step that loads. In a component tree, pass it
to the binding - `<WizardProvider wizard={wizard}>` in React, `provideWizard(wizard)` in Vue - and
the binding calls `start()` when it mounts. Without one, call `await wizard.start()` yourself.
A wizard passed in this way is the application's to `destroy()`; the binding leaves it alone.

| Option      | What it does                                                                                                                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`       | The storage key. One per flow, or one per flow per user.                                                                                                                                     |
| `storage`   | Where to put it. `localStorage` by default; any synchronous store works.                                                                                                                     |
| `version`   | Your application's version. Bump it when the meaning of the data changes: a session stored under another value, or none, is refused as `snapshot/other-flow`, and `migrate` does not see it. |
| `migrate`   | Upgrades a snapshot written in an older format, one hop at a time.                                                                                                                           |
| `onRestore` | Hears what happened at startup: `{ restored: true }` or the reason it was not.                                                                                                               |

What it stores is the durable snapshot above, never the running state: a navigation in flight, a
step that was loading and a validator's errors all describe a moment, and restoring them is how a
wizard comes back stuck.

The plugin never throws. A browser that refuses storage, a quota that fills up, a value that was
corrupted in place: each means this session is not coming back, and none of them is a reason to
break the wizard someone is filling in now. Each failure warns once per code, names its cause,
and the ones met at startup reach `onRestore` as its reason.

`onRestore` is how the outcome reaches your interface. It receives a `RestoreOutcome`, which is
`{ restored: true }` or `{ restored: false, reason }` - the reasons above, plus
`persist/nothing-stored` for a first visit and `persist/unavailable` for a browser that refuses
storage at all. Saying which happened is not optional politeness: a form that was half filled in
and is now empty looks like a bug to the person who filled it, and silence is why they would
think so. [Restore after reload](../restore-after-reload/) is that turned into a working page.
A callback that throws is caught: the plugin warns once and stays enabled, as
[`persist-on-restore-threw`](../../errors/persist-on-restore-threw/) describes.

**Storage is synchronous.** `storage` takes anything with `getItem`, `setItem` and `removeItem`
returning values rather than promises - `localStorage` and `sessionStorage` both qualify, and so
does an object of your own over a `Map`. An asynchronous store such as IndexedDB does not, and
1.0 does not wrap one: a write that resolves later cannot be flushed inside `pagehide`, which is
the moment the last answer is most likely to be lost.

## Sensitive data

A persisted session is a file on someone's device that outlives the tab. Decide what belongs in
it before you turn persistence on.

For a flow carrying card numbers, health answers or anything else you would not put in a log,
point `storage` at `sessionStorage`, which is cleared when the tab closes, or do not persist the
flow at all. `clearOnLeave` is not the tool for this: it drops a value when the step is left, by
which time every edit has already been committed and written. Keep such a field out of the
persisted state instead of clearing it afterwards.

## Size

The decoder enforces a ceiling on nesting depth - 32 levels - and a budget of a million
characters, counted over the strings and keys it walks, which is a guard against a runaway
payload rather than a measurement of its encoded size. It also stops a migration chain after
sixteen hops rather than following one that does not converge. A snapshot is user-supplied input whenever
it comes back from storage - it has been in a place the application does not control, so it is
treated as untrusted on the way in.
