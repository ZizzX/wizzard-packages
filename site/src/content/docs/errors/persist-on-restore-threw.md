---
title: persist-on-restore-threw
description: The onRestore callback passed to persist() threw or rejected, and the plugin carried on without it.
---

```
[wizzard] onRestore threw. persist() caught it, and the outcome it was reporting, <outcome>, stands.
fix the callback passed to persist(). …/errors/persist-on-restore-threw
```

A warning from `persist()` in `@wizzard-packages/plugins/persist`, printed with `console.warn` once
for the life of the plugin, with what the callback threw as the second argument. An async callback whose promise
rejects is reported the same way, a moment later.

`onRestore` is your code, called while the wizard is being built. `persist()` catches what it
throws, so the outcome it was reporting still holds and the plugin stays enabled: a restored session
stays restored, and later changes are saved whenever storage is there to take them. With
`persist/unavailable` it is not, and nothing is saved, exactly as it would not be without the throw.
`<outcome>` is `restored`, or the `reason` of `{ restored: false }`.

Your interface did not hear about the outcome, though, and that is the part to fix. Read the error
printed after the warning. A common cause is a callback that updates something that does not exist
yet: `onRestore` runs when the wizard is created, before anything has rendered.
