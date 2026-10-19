---
title: before-navigate-invalid
description: A plugin's beforeNavigate answered with something that is not a decision.
---

```
[wizzard] plugin "<name>" answered beforeNavigate with <value>. Only false, { block: string },
{ redirect: string } or nothing are answers the engine understands. Return one of those, or
nothing to let the move through. …/errors/before-navigate-invalid
```

Thrown as a `WizardError` with `op: 'navigate'`, and the move it was asked about is rejected:
`next()`, `back()` or `go()` rejects with this error, the navigation lock is released, and nothing
else is written.

TypeScript keeps a plugin to `NavDecision`, so this is usually a plugin written in plain
JavaScript, or one cast past the type. The common slips are returning `true` to mean "allow"
(return nothing instead), returning a step id as a string (return `{ redirect: id }`), and
computing a `block` or `redirect` that turns out not to be a string.

[Plugins](../../docs/plugins/#blocking-and-redirecting) has the table of answers and what each one
does.
