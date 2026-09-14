---
title: devtools-stopped
description: A devtools listener threw, so the panel stopped updating; the wizard is unaffected.
---

```
[wizzard] diagnostics stopped: <message>. A devtools listener threw; the wizard is unaffected
and this panel no longer updates. Reload the page, and record a session and attach it to an
issue if it happens again. …/errors/devtools-stopped
```

Shown in the diagnostic strip. The panel keeps what it had; it stops subscribing.

The engine calls its subscribers bare, so a listener that throws surfaces inside the host's
own `set()` or navigation. Devtools registers several - the store subscription, the plugin's
subscription, `onRecord`, the legend's `sessionStorage` read - and each runs under its own
catch. When one throws, the panel unsubscribes rather than throwing into the host: the
diagnostic tool never becomes the fault. The plugin catches inside its hook bodies for the
same reason, so the engine's `fail()` never has to disable it for a devtools bug.

The wizard is unaffected in every case: it committed what it was going to commit before the
listener ran, and its next commit lands normally.
