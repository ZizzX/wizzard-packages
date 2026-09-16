---
title: step-not-in-order
description: A flow has an order, and one of its steps is not in it.
---

```
{ code: 'step-not-in-order', path: 'steps.<id>', message: 'not in order, so it is reachable only via on.next' }
```

Returned by `validateFlow`, once per step, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

It is not reported for a flow without `order`.

`order` is the linear path `next()` and `back()` walk. A step outside it is never visited by that
walk; the only ways in are a transition on another step that names it and `go()`. That is sometimes
the intent - a branch one step leads to - and more often a step that was added to `steps` and
forgotten in `order`.

If the step belongs on the main path, add it to `order` where it goes:

```json
{ "order": ["account", "profile", "review"] }
```

If it is a branch, check that some step's `on.next` leads to it. A flow built that way on purpose
can leave the report as a note of how the step is reached.
