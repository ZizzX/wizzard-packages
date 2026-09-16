---
title: resolver-not-registered
description: A $ref in the flow names a resolver that the registry it is evaluated against does not hold.
---

```
[wizzard] no resolver is registered as "<name>". The flow names it in a $ref, and the registry it
is evaluated against has no entry by that name. Add <name> to the registry, or correct the name in
the flow. …/errors/resolver-not-registered
```

Thrown as a `WizardError` from three places, and `op` says which:

| `op`            | When                                                              | `path`       |
| --------------- | ----------------------------------------------------------------- | ------------ |
| `evaluate`      | a synchronous expression - a `when`, a transition guard - is read | not set      |
| `evaluateAsync` | an expression is awaited                                          | not set      |
| `validate`      | a step's `validate` is run, by `next()` or by `validate()`        | `steps.<id>` |
| `load`          | a step's `load` is run as the wizard enters it                    | `steps.<id>` |

A flow is data, so the functions it needs are referred to by name and supplied separately. The
name in `{ "$ref": "checkEmail" }` has to match a key of the registry passed to `createWizard`
exactly, including case. The usual causes are a typo on one side, a resolver that was renamed in
code and not in a flow that came from a server, or a registry assembled conditionally that left
this entry out.

```ts
const wizard = createWizard({
  flow,
  registry: {
    checkEmail: async (_args, { data }) => (data.email ? null : { email: 'Required' }),
  },
});
```

Refusing is deliberate. Treating an unknown name as `false` would make a `when` silently hide a
step and a `validate` silently pass, which is the failure that is hardest to see. To catch the
mismatch before the wizard runs, pass the registry to `validateFlow` or `assertFlow`: both report a
`$ref` the registry does not hold, with its path, as a problem with the code
`resolver-not-registered`.
