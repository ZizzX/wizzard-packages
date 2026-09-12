---
title: Validation
description: Checking a definition before it runs, and checking a user's answers while it does.
---

Two different things are called validation here, and they run at different times against
different subjects. One checks the flow; the other checks the data.

## Checking the definition

A flow that arrives as JSON has been type-checked by nothing. `validateFlow` reads it and
returns every problem it can find without running it:

```ts
import { validateFlow, assertFlow } from '@wizzard-packages/core/validate-flow';

const problems = validateFlow(signup, registry);
// [{ path: 'steps.payment.on.next', message: 'unknown target: confrm' }]
```

Each problem is `{ path, message }` - where it is and what is wrong, in prose. There are no
error codes, because the audience is a developer reading a list, not a handler switching on a
value.

It catches what a type cannot: a target naming a step that does not exist, a `$ref` naming a
resolver the registry does not hold, an `order` entry with no matching step, a step carrying
both `when` and `on.next` where only one of them will be honoured.

`assertFlow` is the same check that throws instead of returning, with every problem in the
message. Use it where a definition crossing a boundary should stop the program - a backend
response in development, a fixture in a test - and use `validateFlow` where the problems are
something to render.

This entry point is deliberately separate from `@wizzard-packages/core/v1`. Checking a
definition is development work; shipping the checker to every user who runs the flow is not.

## Checking the answers

The runtime kind is a step's `validate`, a `{ $ref }` naming a resolver:

```ts
steps: {
  details: { label: 'Details', validate: { $ref: 'needsEmail' } },
}
```

The engine runs it before leaving the step. If it refuses, `next()` returns
`{ ok: false, reason: 'invalid', errors }` and the flow stays where it is.

You can also run it directly, and set messages yourself:

```ts
await wizard.validate(); // the current step
await wizard.validate('details'); // a named one
wizard.setErrors('details', { email: 'Enter a work address' });
wizard.setErrors('details', null); // clear
```

`validate` resolves to a boolean. The messages it produced live in the wizard's state and are
read through `useErrors()`, so a field component does not need the result of the call that
created them.

There is no `validateAll()`. The engine checks a step as it is left, so a whole-flow check is a
question about steps nobody has reached yet, and its answer goes stale as soon as anything is
typed. Checking several steps on purpose is a loop over `validate(step)`, which also says which
one failed. [API behaviour](../api-behaviour/) collects that rule beside the others.

## When it runs

`FlowDefinition.validate` schedules the whole thing:

```ts
{ validate: { on: 'change', debounceMs: 300 } }
```

`on` takes `'change'`, `'blur'`, `'next'` or `'manual'`. This is the field that shares a name
with a step's `validate` and means something else entirely: the flow-level one says **when**,
the step-level one says **what**. A flow may set either without the other.
