---
title: persist-on-restore-threw
description: The onRestore callback passed to persist() threw, and the plugin carried on without it.
---

```
[wizzard] onRestore threw. the outcome was <outcome>, and the session is still saved. fix the
callback passed to persist(). …/errors/persist-on-restore-threw
```

A warning from `persist()` in `@wizzard-packages/plugins/persist`, printed with `console.warn` once
for the life of the plugin, followed by what the callback threw.

`onRestore` is your code, called while the wizard is being built. `persist()` catches what it
throws, so the outcome it was reporting still holds: a restored session stays restored, and every
later change is still saved. `<outcome>` is `restored`, or the `reason` of `{ restored: false }`.

Your interface did not hear about the outcome, though, and that is the part to fix. Read the error
printed after the warning. A common cause is a callback that updates something that does not exist
yet: `onRestore` runs when the wizard is created, before anything has rendered.
