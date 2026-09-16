---
title: nav-invalid
description: A move forward was refused because the step being left did not pass its validator.
---

```
{ ok: false, reason: 'invalid', code: 'nav-invalid', by: '<step>', errors: { <field>: '<message>' }, url: '…/errors/nav-invalid' }
```

Returned, not thrown, by `next()` and `go()`. The wizard stays where it was, and the same `errors`
are committed to state under the step's id, so `useErrors()` renders them without reading the
result.

Before a forward move leaves a step, the engine runs that step's `validate`. A validator that
returns field messages refuses the move, and `by` names the step it ran on. `go()` validates too,
`force: true` included: `force` skips the navigation policy and nothing else. `back()` never
validates.

A repeat group refuses the same way when its items cannot be told apart. Then `by` is the group,
and the message sits under the `keyBy` field; [`repeat-keys`](../repeat-keys/) explains it.

This is usually the wizard working as intended: the user has not filled the field yet. Render
`errors` beside the fields they name, as [Render field errors](../../docs/render-field-errors/)
does. To move without validating on purpose - a "save and continue later" button - pass
`{ validate: false }` to that one call.
