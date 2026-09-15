---
title: flow-invalid
description: assertFlow found one or more problems in a flow definition and stopped.
---

```
[wizzard] flow "<id>" failed validation:
  <path>: <problem>
  <path>: <problem>. assertFlow throws when validateFlow reports anything. Fix each problem listed,
or call validateFlow to render them instead. …/errors/flow-invalid
```

Thrown as a `WizardError` with `op: 'assertFlow'`, from `@wizzard-packages/core/validate-flow`.

`assertFlow(flow, registry)` runs `validateFlow` and throws if the list it returns is not empty,
with every problem in the message, one per line, each with the path it was found at. The
problems are the ones the [validation guide](../../docs/validation/) lists: an `order` entry with
no step, a step missing from `order`, a `$ref` the registry does not hold, a transition to a step
that does not exist, a step with both `when` and `on.next`, and the rest.

Use it where a definition crossing a boundary should stop the program: a flow from a backend in
development, a fixture in a test. Where the problems are something to show - an editor, an
inspector, a form that accepts a pasted flow - call `validateFlow` instead, which returns the same
problems as data and never throws:

```ts
import { validateFlow } from '@wizzard-packages/core/validate-flow';

const problems = validateFlow(flow, registry);
if (problems.length > 0) render(problems);
```

The fix is in the listed problems themselves; this error only collects them.
