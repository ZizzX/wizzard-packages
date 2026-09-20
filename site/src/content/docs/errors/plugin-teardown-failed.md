---
title: plugin-teardown-failed
description: The function a plugin returned from init threw when the wizard was destroyed.
---

```
[wizzard] plugin "<name>" threw while being torn down. The function its init returned threw, and
every other teardown still ran. Fix that function, or remove the plugin from options.plugins.
…/errors/plugin-teardown-failed
```

Printed with `console.error` by `destroy()` in `@wizzard-packages/core`, with what the teardown
threw as the second argument.

A plugin's `init` may return a function, and `destroy()` runs each of them once. A provider in
either binding calls `destroy()` when it unmounts, if it created the wizard. One teardown that
throws does not stop the others: every plugin after it is still torn down, and `destroy()` itself
returns normally. A teardown that returns a promise which rejects is reported the same way, after
`destroy()` has returned.

Read the error logged beside the message. The usual cause is a teardown that assumes something
`init` set up and that was never there - a listener on an object that does not exist on the server,
or a handle that was already released. Fix the function, or remove the plugin from
`options.plugins`.
