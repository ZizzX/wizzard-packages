---
title: get-unknown-root
description: A $get path starts with something the evaluator cannot read from.
---

```
[wizzard] $get "<path>" does not start with data, ctx, loop, step. The first segment names where a
path reads from, and any other start evaluates to undefined. Start the path with the root it belongs
to, such as data.<path>. …/errors/get-unknown-root
```

Returned by `validateFlow` as a problem with `path: steps.<id>.when`, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

A `$get` reads a value by a dotted path, and the first segment names where to read from: `data` for
the answers, `ctx` for what the application supplied, `loop` for the current item inside a repeat
group. A path that starts anywhere else evaluates to `undefined`, which a `when` reads as false, so
the step silently disappears.

The usual cause is a path written relative to the answers, without its root:

```json
{ "$get": "account.email" }
```

Prefix it with the root it belongs to:

```json
{ "$get": "data.account.email" }
```

The roots are described in [the expressions guide](../../docs/expressions/#the-scope).
