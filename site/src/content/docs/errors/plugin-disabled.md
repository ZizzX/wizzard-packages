---
title: plugin-disabled
description: A plugin threw in init, onCommit or onAttempt, and the engine switched it off.
---

```
[wizzard] plugin "<name>" threw in <hook> and was disabled. A plugin that throws is switched off,
so none of its later hooks run. Fix the plugin, or remove it from options.plugins.
…/errors/plugin-disabled
```

Printed with `console.error` by `createWizard` from `@wizzard-packages/core/v1`, once, with what
the plugin threw as the second argument. `<hook>` is `init`, `onCommit` or `onAttempt`.

The engine calls a plugin from inside its own work: `init` while the wizard is being built,
`onCommit` inside every write, `onAttempt` around every move. A plugin that throws there would take
that work down with it, and one broken analytics plugin must not lose a half-filled form. So the
write, the move or the build goes on, and the plugin is switched off for the rest of the wizard's
life: none of its hooks run again, `beforeNavigate` and `loadStep` included. A plugin that threw in
`init` never returned a teardown, so `destroy()` has nothing of it to run.

Read the error logged beside the message: it is what the plugin threw. Fix the plugin, or remove it
from `options.plugins`. A plugin that throws in `afterNavigate` is not switched off; that is
[`after-navigate-threw`](../after-navigate-threw/).
