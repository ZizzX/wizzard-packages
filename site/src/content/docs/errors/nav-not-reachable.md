---
title: nav-not-reachable
description: A move was refused because its target is not part of the flow right now.
---

```
{ ok: false, reason: 'not-reachable', code: 'nav-not-reachable', by: '<step>', url: '…/errors/nav-not-reachable' }
```

Returned, not thrown, by `next()`, `back()` and `go()`. Nothing is written, and `by` names the
target.

The target exists, but the flow does not include it at the moment. Its `when` is false for the
current data - or it threw and was read as false, which the console line
[`when-threw`](../when-threw/) names - so progress, breadcrumbs and `next()` all leave it out, and a move that lands on it
anyway is refused. `force: true` does not change that: `force` skips the navigation policy, and a
step the flow says is not there is not a matter of policy. A group whose own `when` is false is
refused the same way.

A step that is not in `order` is refused with this reason too, whether the move is a `go()` or an
`on.next` that names it.

Change the data the `when` reads before moving, or correct the condition if it should be true
here. For a step outside `order`, add it to `order`; `validateFlow` lists such a step as
[`step-not-in-order`](../step-not-in-order/).
