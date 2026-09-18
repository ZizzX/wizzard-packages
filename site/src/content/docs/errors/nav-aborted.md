---
title: nav-aborted
description: A move was stopped by cancel() while it was still running.
---

```
{ ok: false, reason: 'aborted', code: 'nav-aborted', url: '…/errors/nav-aborted' }
```

Returned, not thrown, by the `next()`, `back()` or `go()` that was in flight when `cancel()` or
`destroy()` was called. Nothing is written, and neither call returns anything. A `start()` waiting
for another move to finish answers it too when the wizard is destroyed meanwhile, rather than
starting a wizard nothing is listening to any more.

`cancel()` aborts the signal a step's `load` and a plugin's `loadStep` receive, so a request that
honours it stops too. The move checks the signal before it commits, and the wizard stays on the
step it was leaving.

The application asked for this, so there is usually nothing to fix. If you see it without calling
`cancel()`, the wizard was destroyed mid-move - by code that owns it, or by the component that
created it unmounting.
