---
title: target-unknown-step
description: An on.next or on.back transition leads to a step the flow does not define.
---

```
[wizzard] unknown target "<id>". A transition leads to a key of steps, or to @end from on.next.
Correct the id, or add the step it names. …/errors/target-unknown-step
```

Returned by `validateFlow`, once per transition, with `path` ending in `on.next` or `on.back`, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

A transition names the step it leads to, as a string or as the `to` of `{ to, when }`. That id has
to be a key of the `steps` beside it - in an inline sub-flow, a step of that sub-flow, not of the
root; `on.next` may also name `@end`, the exit. A navigation that took this
transition would have nowhere to go. The usual causes are a typo and a step renamed without its
transitions.

```json
{
  "steps": {
    "payment": { "on": { "next": "confirm" } },
    "confirm": {}
  }
}
```

Correct the id, add the step it names, or use `@end` if the transition was meant to finish the flow.
Transitions are described in [the flow guide](../../docs/flow/#where-a-step-leads).
