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

`@wizzard-packages/core/v1` exports a `Snapshot` that is the live view a component renders -
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

| `reason`                | What was wrong                                                  |
| ----------------------- | --------------------------------------------------------------- |
| `snapshot/unreadable`   | Not a snapshot: wrong shape, or not an object at all.           |
| `snapshot/version`      | The definition's `version` moved and no `migrate` was supplied. |
| `snapshot/other-flow`   | Taken against a different flow `id`.                            |
| `snapshot/unknown-step` | Names a step this definition no longer has.                     |
| `snapshot/unstorable`   | Holds something that cannot survive the round trip.             |
| `snapshot/too-large`    | Past the size or nesting limit.                                 |

Every one of these is a reason to start the user cleanly rather than to drop them into a step
that no longer exists. Refusing loudly at restore is the point of the format carrying `flow`
and `version` at all.

`DecodeOptions` covers the cases where a refusal is not what you want: `migrate` upgrades an
older payload before it is read, `epoch` sets the navigation epoch the restored session
continues from, and `subFlows` supplies the definitions a group step referenced by name.

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

The decoder enforces a ceiling on payload size and nesting depth, and a migration chain that
does not converge is stopped rather than followed. A snapshot is user-supplied input whenever
it comes back from storage - it has been in a place the application does not control, so it is
treated as untrusted on the way in.
