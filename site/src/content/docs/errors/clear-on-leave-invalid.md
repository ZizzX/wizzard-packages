---
title: clear-on-leave-invalid
description: A step's clearOnLeave is neither true nor a list of data paths.
---

```
{ code: 'clear-on-leave-invalid', path: 'steps.<id>.clearOnLeave', message: 'must be true or a list of data paths' }
```

Returned by `validateFlow`, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

`clearOnLeave` says what to forget when a step is left, in one of two forms: `true` drops the step's
whole slice, and a list of strings drops those paths of `data`. A single string, `false`, or a list
with anything but strings in it is neither, and a flow from a server can carry any of them because
no type checked it.

```json
{ "clearOnLeave": ["company.vat", "company.name"] }
```

For one path, wrap it in a list. To keep the data, which is the default, leave the field out rather
than setting it to `false`.
