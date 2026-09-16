---
title: order-unknown-step
description: An entry of the flow's order names a step the flow does not define.
---

```
{ code: 'order-unknown-step', path: 'order', message: 'unknown step: <id>' }
```

Returned by `validateFlow`, once per entry, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

`order` is the default path through the flow, written as step ids. Every id in it has to be a key
of `steps`, spelled the same way, including case. The usual causes are a typo, a step that was
renamed or removed while `order` kept the old id, or an `order` and a `steps` object assembled from
two versions of the flow.

```json
{
  "id": "signup",
  "order": ["account", "profile"],
  "steps": { "account": {}, "profile": {} }
}
```

Correct the id in `order`, or add the step it names.
