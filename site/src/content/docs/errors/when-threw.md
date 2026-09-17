---
title: when-threw
description: A step's when threw while the engine worked out which steps are reachable, so the step is read as not reachable.
---

```
[wizzard] the when of step "<id>" threw, so it is read as not reachable. A when says whether a
step is there, and one that throws would otherwise stop every move. Fix the expression, or run
validateFlow on the flow before the wizard is created. …/errors/when-threw
```

Logged to `console.error` with the error beside it, once for each step or transition, and nothing
is thrown. The step is left out of `activeSteps`, of `progress` and of the breadcrumbs, exactly as
a `when` that evaluated to `false` would be.

Reachability is not one step's business. The engine reads the `when` of every step in `order` on
every `start()`, `next()`, `back()` and `go()`, and again on every snapshot the host reads. One
expression that throws would stop each of those, so a single bad step would take the whole wizard
with it - and in React, where a snapshot is read on every render, the render would throw again each
time, with nothing to recover from. Reading the step as absent keeps the rest of the wizard
working.

This is how the engine already reads the other expressions it evaluates outside a guard: a
`repeat.over` that throws is a group with no items, and an `input` that throws is `undefined`.

A guard is the opposite case and is unchanged: `guards.enter` and `guards.exit` decide one move,
the caller is waiting for it, and an error there rejects that move rather than being read as
`false`.

The causes are the ones `validateFlow` reports before anything runs:
[`expr-invalid-operand`](../expr-invalid-operand/),
[`expr-unknown-operator`](../expr-unknown-operator/), [`expr-too-deep`](../expr-too-deep/) and
[`resolver-not-registered`](../resolver-not-registered/) - or a registered resolver of your own that
throws. Run `validateFlow` on a flow that arrives from a server, and this line names the step to
look at when one slipped through.
