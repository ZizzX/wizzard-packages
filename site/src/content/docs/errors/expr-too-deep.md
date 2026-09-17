---
title: expr-too-deep
description: An expression nests deeper than the 256 levels the evaluator walks.
---

```
[wizzard] an expression nests deeper than 256 levels. Each level is a call on the stack, and a
deeper one would overflow it. Flatten it: $and and $or take any number of operands.
…/errors/expr-too-deep
```

Thrown as a `WizardError` by `evaluate` or `evaluateAsync`, and `op` says which. `isSync` does not
throw: it answers `false` for such an expression, and the asynchronous evaluator it hands the
expression to then refuses it.

Depth counts every object and every list on the way down from the expression itself. `{ $not: e }`
is one level above `e`; `{ $and: [e] }` is two, the object and its list; a literal `[[1]]` is two.
An expression of 256 levels evaluates, and one of 257 is refused. The list of operands after
`$and`, `$or`, `$eq` and the other comparisons is the one list that is only a step on the way to
its items: it is never evaluated as a value, so it is not refused on its own, and
`{ $and: [true] }` whose object is at the 256th level still evaluates.

Where it surfaces is the same as for
[`expr-unknown-operator`](../expr-unknown-operator/): in a `when`, a guard or a transition's
`when` it stops the navigation, and in `repeat.over` or `input` the engine catches it and reads the
group as having no items, or the input as `undefined`.

`validateFlow` counts the same way and returns one problem with `code: 'expr-too-deep'` for each
expression past the limit, with the `path` of the first object or list it found there. The fix is
the same for every branch, so a document with ten thousand of them gets one problem, not ten
thousand. A path longer than 512 characters keeps its end and starts with `...`.

The evaluator refuses a branch only when it reaches it. `$and` stops at the first operand that is
false and `$or` at the first that is true, so a branch past the limit behind one of those is never
walked, and the same expression throws for some data and not for other. `validateFlow` reads the
structure rather than the data and reports the expression whichever branch the data would take,
which is the reason to run it on a flow that arrives from outside. `expr-unknown-operator` behaves the same way. The `ui` of a step is not an expression and is
never reported, however deep; a function inside it is still found at any depth, as
[`flow-not-serializable`](../flow-not-serializable/).

No condition written by hand or by a generator reaches this depth. A long chain of `$and` or `$or`
flattens into one operator with every operand in its list, and a chain of `$not` into one or none.
The case this error is for is a document that was pasted or sent by a backend that should not be
trusted: without the limit it would overflow the call stack and throw a bare `RangeError` with no
path and no reason.
