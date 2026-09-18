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

From `next()` it means the current step's `on.next` names this step and no open one: every entry
it could take leads to a step whose `when` is false, and `by` is the first of them. The move is
refused rather than skipped past, because the transition names where to go. Open the condition,
or add an entry for the case it is closed - another step, or `'@end'` to finish the wizard.

Membership in `order` is not part of the question. A step outside `order` is a branch, and a
`go()` or an `on.next` that names it lands on it whenever its `when` holds; see
[`step-not-in-order`](../step-not-in-order/).

Change the data the `when` reads before moving, or correct the condition if it should be true
here.
