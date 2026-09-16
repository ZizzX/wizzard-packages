---
title: flow-not-serializable
description: A function was found inside a flow definition.
---

```
{ code: 'flow-not-serializable', path: 'steps.<id>.<field>', message: 'contains a function, so the flow cannot be serialized' }
```

Returned by `validateFlow`, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

A flow is JSON, so it can be stored, diffed, sent by a server and drawn by the inspector.
`JSON.stringify` drops a function without a word, so a flow with one in it stops round-tripping:
what arrives on the other side is a different flow, missing a predicate or a validator.

Everything a flow cannot carry is named instead. Move the function into the registry and refer to it
with a `$ref`:

```ts
const flow = defineFlow({
  id: 'signup',
  steps: { company: { when: { $ref: 'isBusiness' } } },
});

const wizard = createWizard({
  flow,
  registry: { isBusiness: (_args, { data }) => data.account?.type === 'business' },
});
```

A condition that only compares values needs no resolver; write it with the operators in
[the expressions guide](../../docs/expressions/).
