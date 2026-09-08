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

## Size

The decoder enforces a ceiling on payload size and nesting depth, and a migration chain that
does not converge is stopped rather than followed. A snapshot is user-supplied input whenever
it comes back from storage - it has been in a place the application does not control, so it is
treated as untrusted on the way in.
