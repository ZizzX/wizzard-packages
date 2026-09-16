---
title: nav-superseded
description: A move was dropped because another move started before it finished.
---

```
{ ok: false, reason: 'superseded', code: 'nav-superseded', url: '…/errors/nav-superseded' }
```

Returned, not thrown, by `next()`, `back()` and `go()`, to the earlier of two moves. The later one
runs to its own result. Nothing the earlier move computed is written.

Every move takes a turn when it starts. When a second one begins while the first is still awaiting
a validator, a guard or a load, the first loses its turn, and when its await resolves it stops
instead of committing. A double-clicked Next is the everyday case: one move, one `superseded`. A
move into a repeat group is also superseded when `set()` changes the items under it while it waits.

It is not a failure to show anyone. Ignore it, or disable the control while `isBusy` is true so the
second call is never made. Do not retry the move: the one that superseded it is already running.
