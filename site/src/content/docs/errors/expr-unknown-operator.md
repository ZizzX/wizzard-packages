---
title: expr-unknown-operator
description: An expression object's key is not one of the operators the expression language defines.
---

```
[wizzard] "<key>" is not an operator. An expression object names its operation with a key, and
none of its keys is an operator. Replace <key> with an operator from the expressions guide, or
check it for a typo. …/errors/expr-unknown-operator
```

Thrown as a `WizardError` by `evaluate` or `evaluateAsync`, and `op` says which. `<key>` is the
object's first key, or `{}` for an empty object.

Not every expression lets it out. In a `when` or a transition's `when` the engine catches it: the step is read as not reachable and
the line is logged as [`when-threw`](../when-threw/). In a guard it stops the navigation, since a
guard decides one move and its caller is waiting. In a repeat group's `repeat.over` and in `input`
it is caught too: the group is read as having no items, and the input as `undefined`.
Only a guard throws to a caller; elsewhere the typo shows as a console line, and `validateFlow`
finds it before anything runs at all.

`validateFlow` finds the same objects before anything is evaluated, in every place the engine reads
an expression - `when`, `guards`, a transition's `when`, `repeat.over` and `input` - and returns
each as a problem with `code: 'expr-unknown-operator'`, the `path` of the object, and the message
above. The `ui` of a
step and the `args` of a `$ref` are data rather than expressions, and are not read.

An expression is JSON: a literal, a list, or an object whose key names the operation - `$get`,
`$eq`, `$and`, `$ref` and the rest in the [expressions guide](../../docs/expressions/). The
evaluator looks for one of those keys, and when the object has none it throws rather than
guessing, because an expression that evaluates to `undefined` would quietly read as false in a
`when`.

The usual causes are a typo (`$equals` for `$eq`), a key without its `$`, an operator from
another expression language, or a flow written for a newer version of the library than the one
installed. An object meant as a literal value cannot be written inline, since its keys would be
read as an operator; put it in `data` or `ctx` and read it with `$get`.

`defineFlow` and the `expr` builder from `@wizzard-packages/core/expr` produce only operators that
exist, which is the easiest way never to see this for a flow written in code. A flow that arrives
from a server is the case this error is for.
