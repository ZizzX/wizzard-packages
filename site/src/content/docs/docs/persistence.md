---
title: Persistence
description: Turning a session into JSON, and refusing to restore one that no longer fits.
---

A wizard that loses everything on a refresh is a wizard nobody finishes. Persistence here is
two functions and a format: `toSnapshot` writes the session out, `decodeSnapshot` reads it back
and tells you why it could not.

```ts
import { toSnapshot, decodeSnapshot } from '@wizzard-packages/core/snapshot';
```

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
changed since. `decodeSnapshot` never throws and never guesses:

```ts
const result = decodeSnapshot(signup, JSON.parse(stored));
if (result.restored) {
  createWizard({ flow: signup, state: result.state });
}
```

| `reason`                | What was wrong                                                            |
| ----------------------- | ------------------------------------------------------------------------- |
| `snapshot/unreadable`   | Not a snapshot: wrong shape, or not an object at all.                     |
| `snapshot/version`      | Written in an older snapshot format that `migrate` did not bring forward. |
| `snapshot/other-flow`   | Taken against a different flow `id`, or a different flow `version`.       |
| `snapshot/unknown-step` | Names a step this definition no longer has.                               |
| `snapshot/unstorable`   | Holds something that cannot survive the round trip.                       |
| `snapshot/too-large`    | Past the size or nesting limit.                                           |

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
definition's is refused with `snapshot/other-flow`, and no migration is consulted: a stored
session of a flow that has since changed shape is a session for a different flow. Migrating that
is a decision about your data, taken before the payload ever reaches `decodeSnapshot`.

`migrate` is for the envelope. It runs while `v` is behind the current format, once per hop, so
a payload two formats old is two ordinary steps rather than one function that knows every past
shape:

```ts
const result = decodeSnapshot(signup, JSON.parse(stored), {
  migrate: (snapshot) => (snapshot.v === 0 ? { ...snapshot, v: 1 } : snapshot),
});
```

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
applications want instead: it reads on start, writes on every commit, coalesces those writes to
one per frame, and flushes what is pending when the page hides or the wizard is destroyed.

```ts
import { persist } from '@wizzard-packages/plugins/persist';

createWizard({
  flow: signup,
  plugins: [persist({ key: 'signup', version: APP_VERSION, onRestore })],
});
```

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
