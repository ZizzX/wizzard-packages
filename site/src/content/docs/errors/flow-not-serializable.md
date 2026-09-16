---
title: flow-not-serializable
description: A function was found inside a flow definition.
---

```
[wizzard] steps.<id>.when is a function. JSON.stringify drops a function, so the flow would not
survive being stored or sent. Move the function into the registry and name it with a $ref.
…/errors/flow-not-serializable
```

Returned by `validateFlow` as a problem whose `path` is where the function is, such as `steps.<id>.when`, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

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
