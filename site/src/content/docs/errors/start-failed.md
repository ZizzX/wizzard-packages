---
title: start-failed
description: A provider started the wizard, and its first move threw, so no step is shown.
---

```
[wizzard] the wizard could not start. Its first move threw, so no step is shown. Fix what threw,
logged below, and call start() again or mount the wizard again. …/errors/start-failed
```

Printed with `console.error` by `WizardProvider` from `@wizzard-packages/react` and by
`provideWizard` from `@wizzard-packages/vue`, with what was thrown as the second argument.

A provider calls `start()` when it mounts, and `start()` moves onto the first reachable step. That
move runs the step's `load` and `guards.enter` and every plugin's `beforeNavigate`, and any of them
can throw - a loader whose request failed is the common case. The provider catches the rejection
rather than leaving it unhandled and prints this, and the wizard stays with no current step, so a
component that renders the current step renders nothing.

The wizard does not try again on its own. Read the error logged beside the message and fix what
threw; for a loader that can fail in normal use, catch inside it and let the step show the failure.
Then start it again. The wizard has not started, so `start()` on the same engine runs the first
move again rather than answering that it already did - from a retry button through
`useWizard().start()`, or by mounting the provider again, which calls it on mount.
