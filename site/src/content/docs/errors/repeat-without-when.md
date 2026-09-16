---
title: repeat-without-when
description: A repeat group has no when, so it stays on the path when its list is empty.
---

```
{ code: 'repeat-without-when', path: 'steps.<id>', message: 'is a repeat group with no when — …' }
```

Returned by `validateFlow`, for a repeat group at any depth of inline sub-flows, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

Whether a step is on the path is decided by its `when` and nothing else. A repeat group over an
empty list has no items to visit and navigation walks past it, but without a `when` it is still an
active step: it draws a breadcrumb for a section with nothing in it and counts towards progress.

Guard the group with the same expression it repeats over:

```json
{
  "flow": "passenger",
  "repeat": { "over": { "$get": "data.passengers" }, "keyBy": "id" },
  "when": { "$not": { "$empty": { "$get": "data.passengers" } } }
}
```

Repeat groups are described in [the flow guide](../../docs/flow/#steps).
