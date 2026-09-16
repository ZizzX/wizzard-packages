---
title: order-duplicate
description: The flow's order names the same step more than once.
---

```
{ code: 'order-duplicate', path: 'order', message: 'contains a duplicate' }
```

Returned by `validateFlow`, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

A step is one place in the flow, and its position in `order` is how `next()` and `back()` find what
comes after and before it. An id that appears twice has two positions, so the walk from it is
ambiguous. The usual cause is a merge or a generator that appended a step already present.

Keep one occurrence of each id. To go through the same content once per item of a list, use a
repeat group, described in [the flow guide](../../docs/flow/#steps).
