---
title: repeat-without-version
description: A flow has a repeat group but no version.
---

```
[wizzard] flow "<flow>" has a repeat group but no version. A snapshot taken inside the group stores
an item key, and cannot be refused when keyBy changes. Stamp a version on the flow, and bump it
whenever its shape changes. …/errors/repeat-without-version
```

Returned by `validateFlow` as a problem with `path: version`, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

A repeat inside an inline sub-flow counts too: a snapshot records the root's version and no other.

A snapshot taken inside a repeat group records which item it was on by the key `keyBy` produced.
That makes the stored state depend on a field of the definition: when `keyBy` changes, an old
snapshot restores cleanly onto an item that no longer means what it meant. A version is how a
snapshot of a different shape is refused instead.

Stamp a version on the root flow, and bump it whenever the shape changes:

```json
{ "id": "booking", "version": 1, "steps": {} }
```

Restoring and refusing snapshots is described in [persistence](../../docs/persistence/#restoring).
