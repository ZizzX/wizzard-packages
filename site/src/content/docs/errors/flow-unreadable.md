---
title: flow-unreadable
description: A property of the flow threw while validateFlow read it, so the rest of the flow was not checked.
---

```
[wizzard] the flow could not be read: <the error>. A property of a flow threw when it was read, so
the rest of it was not checked. A flow is JSON: replace the getter with the value it returns.
…/errors/flow-unreadable
```

Returned by `validateFlow` as the last problem in its list, with `code: 'flow-unreadable'` and an
empty `path`. Nothing is thrown: the caller asked what is wrong with the flow, and an error out of
the function that answers that is not an answer. Whatever was found before the read stays in the
list, so a run that got most of the way through still reports what it saw.

Reading data does not throw, so this means the flow was built in code rather than parsed: a getter,
a `Proxy`, or an object whose prototype does something on access. `JSON.parse` never produces one,
and neither does `defineFlow`.

The flow is not serializable either way. `JSON.stringify` calls the same getter, so storing or
sending the flow throws exactly where this did - which is what
[`flow-not-serializable`](../flow-not-serializable/) exists to catch for a function or a cycle.
Replace the getter with the value it returns, and compute that value before the flow is built.

`createWizard` does not catch this. It reads the steps as it starts, the getter throws there too,
and that error reaches your code with the stack that names the getter - which is what a mistake in
your own code should do. `validateFlow` is the one that answers in problems rather than throwing,
because reporting problems is what it is for.
