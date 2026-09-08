---
title: Expressions
description: The thirteen operators that decide whether a step exists, and the typed builder that writes them.
---

A condition in a flow is JSON. It has to be: a flow that arrives over the network cannot carry
a function, and a flow stored in a database cannot carry a closure. So `when`, `guards` and
every other predicate are written in a small expression language with thirteen operators and
no escape hatch except a named resolver you register yourself.

```ts
// The company step is part of the flow only while the payer is a business.
const company = { when: { $eq: [{ $get: 'data.payer' }, 'business'] } };
```

Anything that is not an object with a `$`-prefixed key is a literal - `null`, booleans,
numbers, strings and arrays evaluate to themselves.

## The operators

| Operator | Form                            | Result                                                               |
| -------- | ------------------------------- | -------------------------------------------------------------------- |
| `$get`   | `{ $get: 'data.email' }`        | Reads a dotted path out of the scope.                                |
| `$ref`   | `{ $ref: 'needsEmail', args? }` | Calls a resolver you registered under that name.                     |
| `$not`   | `{ $not: e }`                   | Negation.                                                            |
| `$and`   | `{ $and: [a, b, ...] }`         | Every operand holds.                                                 |
| `$or`    | `{ $or: [a, b, ...] }`          | Some operand holds.                                                  |
| `$eq`    | `{ $eq: [a, b] }`               | `===`.                                                               |
| `$ne`    | `{ $ne: [a, b] }`               | `!==`.                                                               |
| `$gt`    | `{ $gt: [a, b] }`               | `a > b`.                                                             |
| `$gte`   | `{ $gte: [a, b] }`              | `a >= b`.                                                            |
| `$lt`    | `{ $lt: [a, b] }`               | `a < b`.                                                             |
| `$lte`   | `{ $lte: [a, b] }`              | `a <= b`.                                                            |
| `$in`    | `{ $in: [needle, haystack] }`   | Membership. The needle comes **first**.                              |
| `$empty` | `{ $empty: e }`                 | True for `null`, `undefined`, `''`, `NaN`, an empty array or object. |

That is the entire language. There is no arithmetic, no string manipulation and no way to
define a new operator - anything else is a `$ref` into code you control, which keeps the
untrusted half of a definition small enough to reason about.

## The scope

Paths read from three roots and nothing else:

- `data` - what the user has entered.
- `ctx` - what the application supplied when the wizard was created.
- `loop` - inside a repeat group only: `{ index, item, key }`.

`{ $get: 'data.address.city' }` walks the dots. A path that does not resolve yields
`undefined` rather than throwing, which is why `$empty` exists.

## Resolvers

`$ref` names a function in the registry passed to `createWizard`. It is how a predicate reaches
code: a validator, a permission check, a price lookup.

```ts
const registry = {
  needsEmail: (_args, { data }) => Boolean(data.email),
};
```

A resolver takes the `args` from the `$ref` and the scope, in that order:
`(args: Json | undefined, scope: Scope) => unknown`. Most ignore the first.

Two evaluators exist because two situations exist. `evaluate` is synchronous and throws
`ExprError` if a resolver hands back a promise; `evaluateAsync` awaits it and short-circuits
`$and` and `$or` in order. `test` and `testAsync` wrap them and coerce to a boolean, treating
an absent expression as `true` - which is what makes `when` optional. `isSync(expr)` reports
whether an expression contains any `$ref` at all, and so whether it can be evaluated during
rendering.

## Writing them in TypeScript

Hand-written JSON has no type checking and a typo in `'data.payr'` is silent. The builder at
`@wizzard-packages/core/expr` produces exactly the same objects with the paths typed:

```ts
import { get, eq, and, isIn } from '@wizzard-packages/core/expr';

const businessPayer = eq(get('data.payer'), 'business');
const eligible = and(businessPayer, isIn(get('data.country'), ['DE', 'FR']));
```

`get`, `ref`, `not`, `and`, `or`, `empty`, `eq`, `ne`, `gt`, `gte`, `lt`, `lte` and `isIn` -
one per operator, named for it. Only `isIn` differs from its operator, because `in` is a
reserved word.

The builder is a separate entry point, so importing it never pulls the runtime into a bundle
that only needed to construct a flow, and constructing a flow never pulls in the builder.
