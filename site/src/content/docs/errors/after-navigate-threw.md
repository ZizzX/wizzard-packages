---
title: after-navigate-threw
description: A plugin threw in afterNavigate, after the move it was told about had already happened.
---

```
[wizzard] plugin "<name>" threw in afterNavigate. The move stands, and the plugin runs again on the
next one. Fix the plugin, or catch inside its afterNavigate. …/errors/after-navigate-threw
```

Printed with `console.error` by the navigation pipeline in `@wizzard-packages/core/v1`, with what
the plugin threw as the second argument, each time it throws.

`afterNavigate` runs once a move has been committed. There is nothing left to refuse or undo, so the
move stands and `next()`, `back()` or `go()` still resolves `{ ok: true }`. Unlike a throw in
`onCommit` or `onAttempt`, which [switches the plugin off](../plugin-disabled/), this one leaves the
plugin enabled: it runs on the next move, and if the cause is still there it throws and prints this
again.

Read the error logged beside the message. Fix the plugin, or wrap the body of its `afterNavigate` in
a `try` if what it calls is allowed to fail - a request to an analytics service, for one.
