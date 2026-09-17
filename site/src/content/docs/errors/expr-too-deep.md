---
title: expr-too-deep
description: An expression nests deeper than the 256 levels the evaluator walks.
---

```
[wizzard] an expression nests deeper than 256 levels. Each level is evaluated by a call on the
stack, and past the limit it would overflow instead of failing with a reason. Flatten it: $and
and $or take any number of operands, so a long chain of them needs only one level.
…/errors/expr-too-deep
```

Thrown as a `WizardError` by `evaluate` or `evaluateAsync`, and `op` says which. `isSync` does not
throw: it answers `false` for such an expression, and the asynchronous evaluator it hands the
expression to then refuses it.

Depth counts every object and every list on the way down from the expression itself. `{ $not: e }`
is one level above `e`; `{ $and: [e] }` is two, the object and its list; a literal `[[1]]` is two.
An expression of 256 levels evaluates, and one of 257 is refused.

Where it surfaces is the same as for
[`expr-unknown-operator`](../expr-unknown-operator/): in a `when`, a guard or a transition's
`when` it stops the navigation, and in `repeat.over` or `input` the engine catches it and reads the
group as having no items, or the input as `undefined`.

`validateFlow` counts the same way and returns a problem with `code: 'expr-too-deep'` and the
`path` of the first object or list past the limit, for exactly the expressions the evaluator would
refuse. It does not look further down that branch. The `ui` of a step is not an expression and is
never reported, however deep.

No condition written by hand or by a generator reaches this depth. A long chain of `$and` or `$or`
flattens into one operator with every operand in its list, and a chain of `$not` into one or none.
The case this error is for is a document that was pasted or sent by a backend that should not be
trusted: without the limit it would overflow the call stack and throw a bare `RangeError` with no
path and no reason.
