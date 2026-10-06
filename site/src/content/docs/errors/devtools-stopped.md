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

The engine passes over a listener that throws and logs [`listener-threw`](../listener-threw/),
but that listener stays subscribed and throws again on every commit. The panel's two
subscriptions - to the store and to the plugin - each run under their own catch: when one throws,
the panel unsubscribes and says so here once, rather than leaving a broken listener behind to log
on every change. The diagnostic tool never becomes the fault. The plugin catches inside its hook
bodies for the same reason, so the engine's `fail()` never has to disable it for a devtools bug.
The panel's other callbacks are caught and passed over without stopping it: a host's `onRecord`
that throws still shows the export preview, and a browser that refuses `sessionStorage` keeps the
legend closed.

The wizard is unaffected in every case: it committed what it was going to commit before the
listener ran, and its next commit lands normally.
