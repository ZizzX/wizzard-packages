---
title: when-with-next
description: A step sets both when and on.next, and its when is ignored.
---

```
[wizzard] step "<id>" has both when and on.next. On a step that branches, on.next is followed and
its when is never read. Move the condition into a transition's when, or onto the step it should
hide. …/errors/when-with-next
```

Returned by `validateFlow` as a problem with `path: steps.<id>`, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

`when` and `on.next` answer different questions. `when` decides whether a step is on the path at
all; `on.next` decides where a step goes once someone is on it. On a step that sets both, the
transition is followed and the step's own `when` is not read, so the condition written there has no
effect.

Decide which question the condition answers. If it is whether a step should be shown, it belongs in
that step's `when`. If it is where to go from here, move it into the transition:

```json
{
  "on": {
    "next": [
      { "to": "company", "when": { "$eq": [{ "$get": "data.payer" }, "business"] } },
      "review"
    ]
  }
}
```

Both are described in [the flow guide](../../docs/flow/#where-a-step-leads).
