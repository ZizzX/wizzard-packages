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
object's first key.

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
