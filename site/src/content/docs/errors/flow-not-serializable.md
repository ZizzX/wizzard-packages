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

The same code is returned for an object that contains itself, with the message
`<path> contains itself`. `JSON.stringify` throws on a cycle rather than dropping it, so such a flow
cannot be stored or sent at all; replace the reference with a copy of the value. An object used in
two places is not a cycle and is not reported.

Both are found at any depth anywhere in the flow - in `ui` and in a `$ref`'s `args` as much as in
an expression, and in `validate`, `policy` or any other field beside `steps` - because this check,
unlike the [`expr-too-deep`](../expr-too-deep/) one, has no nesting limit.

A condition that only compares values needs no resolver; write it with the operators in
[the expressions guide](../../docs/expressions/).
