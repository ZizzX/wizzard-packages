---
title: listener-threw
description: A listener passed to subscribe, select or watch threw, inside the write it was told about.
---

```
[wizzard] a listener passed to subscribe, select or watch threw. The change stands, and every other
listener still hears it. Fix the listener, or catch inside it. …/errors/listener-threw
```

Printed with `console.error` by `createWizard` from `@wizzard-packages/core`, with what the listener
threw as the second argument, each time it throws.

A listener is called inside the write that changed the state, and a move writes more than once: it
takes the lock, may mark a step as loading, and then lands or releases. A throw that escaped there
would become the answer to the move - a `next()` that landed would reject, a `cancel()` the listener
made would be lost - and the listeners after it would never hear the change, the binding's own among
them, leaving the screen behind the state. So the write is kept, every other listener still runs,
and the one that threw stays subscribed: it runs again on the next change, and if the cause is still
there it throws and prints this again. A listener whose promise rejects is reported the same way,
when it rejects.

Read the error logged beside the message. Fix the listener, or wrap its body in a `try` if what it
calls is allowed to fail.
