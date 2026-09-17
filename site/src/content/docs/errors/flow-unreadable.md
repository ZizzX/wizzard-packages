---
title: flow-unreadable
description: A read inside the flow threw while validateFlow checked it, so the rest of the flow was not checked.
---

```
[wizzard] the flow could not be read: <the error>. A read inside it threw, so the rest of it was
not checked: a field is not the shape a flow has, or a getter threw. Check the field the error
names against the shape of a flow, and replace a getter with the value it returns.
…/errors/flow-unreadable
```

Returned by `validateFlow` as the last problem in its list, with `code: 'flow-unreadable'` and an
empty `path`. Nothing is thrown: the caller asked what is wrong with the flow, and an error out of
the function that answers that is not an answer. Whatever was found before the read stays in the
list, so a run that got most of the way through still reports what it saw.

There are two ways to get here. The common one is a payload that is not a flow: `validateFlow` is
typed for a `FlowDefinition` and reads its fields without guarding each one, so `steps` holding a
string, a step of `null`, or an inline sub-flow with no `steps` makes one of those reads throw. The
error names the read - `Cannot read properties of null` - rather than the field a service got
wrong, so read it beside the payload.

The other is a flow built in code rather than parsed: a getter, a `Proxy`, or an object whose
prototype acts on access. `JSON.parse` never produces one, and neither does `defineFlow`. Such a
flow is not serializable either: `JSON.stringify` calls the same getter and throws exactly where
this did, which is what [`flow-not-serializable`](../flow-not-serializable/) catches for a function
or a cycle. Replace the getter with the value it returns, computed before the flow is built.

`createWizard` does not catch either case. A getter on a field the engine reads - `order`, `when`,
`on` - throws inside it, with the stack that names the getter, which is what a mistake in your own
code should do. One on host data, `ui` for instance, throws wherever the host reads it, since the
engine never does. `validateFlow` is the one that answers in problems rather than throwing, because
reporting problems is what it is for.
