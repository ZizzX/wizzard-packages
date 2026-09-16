---
title: flow-no-steps
description: validateFlow found a flow whose steps object is empty.
---

```
[wizzard] flow "<flow>" has no steps. A wizard is its steps, so there is nothing to start on or to
finish. Add at least one step, or check that the definition arrived whole. …/errors/flow-no-steps
```

Returned by `validateFlow` as a problem with `path: steps`, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

A wizard is its steps. With none there is nothing to start on, nothing to draw and nothing to
finish, so a flow like this is almost always a definition that did not arrive whole: a server
response that sent `"steps": {}`, a generator that filtered every step out, or a sub-flow written as
a placeholder.

Give the flow at least one step:

```json
{ "id": "signup", "steps": { "account": {} } }
```

If the empty flow came from a server, the fix is on the side that produced it.
