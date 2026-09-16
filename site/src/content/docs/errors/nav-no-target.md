---
title: nav-no-target
description: A move had nowhere to go - the step it named does not exist, or there is nothing before this one.
---

```
{ ok: false, reason: 'no-target', code: 'nav-no-target', url: '…/errors/nav-no-target' }
```

Returned, not thrown, by `next()`, `back()` and `go()`. Nothing is written, and there is no `by`.

The engine could not name a step to move to. The causes are:

- `back()` on the first reachable step. There is nothing before it; `canBack` is false here, and a
  Back button disabled by it never produces this.
- `go(id)` with an id that is not a key of `steps`, most often a typo.
- `back()` from a step whose `on.back` names a step that does not exist.

`next()` on the last step is not one of them: it finishes the wizard, answers `{ ok: true, to:
'@end' }` and sets `status` to `done`.

Disable Back with `canBack` rather than handling this result. For an id, correct it or add the
step; `validateFlow` reports an `on.back` to a missing step as
[`target-unknown-step`](../target-unknown-step/) before the wizard ever runs.
