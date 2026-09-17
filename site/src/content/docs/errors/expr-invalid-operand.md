---
title: expr-invalid-operand
description: An operator's operand is not the shape the evaluator reads, such as $and given null or $get given a number.
---

```
[wizzard] <operator> takes <shape>, not <what it was>. Any other shape fails inside the evaluator
with no reason given. Give <operator> <shape>. …/errors/expr-invalid-operand
```

Thrown as a `WizardError` by `evaluate` or `evaluateAsync`, and `op` says which. The operator is a
real one, so this is not [`expr-unknown-operator`](../expr-unknown-operator/); what it was given is
the problem:

| Operator                                          | Takes          |
| ------------------------------------------------- | -------------- |
| `$get`, `$ref`                                    | a string       |
| `$and`, `$or`                                     | a list         |
| `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in` | a list of two  |
| `$not`, `$empty`                                  | any expression |

So `{ $and: null }`, `{ $eq: [1] }` and `{ $get: 123 }` are each refused, and `{ $not: null }` is
not. Without the check the evaluator would call `.every` on `null` or split a number as a path, and
the failure would be a bare `TypeError` that names no expression and no fix.

Where it surfaces is the same as for `expr-unknown-operator`. In a `when` or a transition's `when` the engine catches it: the step is read as not reachable and
the line is logged as [`when-threw`](../when-threw/). In a guard it stops the navigation, since a
guard decides one move and its caller is waiting. In a repeat group's `repeat.over` and in `input`
it is caught too: the group is read as having no items, and the input as `undefined`.

`validateFlow` checks every operator in every place the engine evaluates an expression, and returns
each operand of the wrong shape as a problem with `code: 'expr-invalid-operand'`, the `path` of the
operand - `steps.a.when.$and` - and the message above. The `ui` of a step and the `args` of a `$ref`
are data rather than expressions, and are not read.

A flow written with `defineFlow` or the `expr` builder from `@wizzard-packages/core/expr` cannot
produce this, as the types already require each shape. It is for a flow that arrives as JSON, from a
server or a paste, where nothing has checked the shapes yet.
