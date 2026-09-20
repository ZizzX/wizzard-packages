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
// [{ code: 'target-unknown-step', path: 'steps.payment.on.next', message, fix, url }]
```

Each problem is `{ code, path, message, fix, url }`: a stable code to switch on, where the problem
is, and the same message a thrown error carries - what went wrong, why, the fix, and the page for
the code. `fix` is the third sentence on its own, for a list that shows it apart.

```ts
// {
//   code: 'target-unknown-step',
//   path: 'steps.payment.on.next',
//   message: '[wizzard] unknown target "confrm". A transition leads to a key of steps, or to @end
//     from on.next. Correct the id, or add the step it names. https://zizzx.github.io/wizzard-packages/errors/target-unknown-step',
//   fix: 'Correct the id, or add the step it names',
//   url: 'https://zizzx.github.io/wizzard-packages/errors/target-unknown-step',
// }
```

It catches what a type cannot: a target naming a step that does not exist, a `$ref` naming a
resolver the registry does not hold, an expression object whose key is not an operator, an
`order` entry with no matching step, a step carrying both `when` and `on.next` where only one of
them will be honoured.

A group whose `flow` is an inline definition is checked like the root - its `order` and each of
its steps - and its transitions are read against its own `steps`: inside a sub-flow, `on.next` names a step of that
sub-flow. A sub-flow named by a string is a definition `validateFlow` was not handed, so it is
checked where it is defined.

`validateFlow` answers in problems, never by throwing. A flow built in code can carry a getter
that throws when it is read, and that arrives as a last problem,
[`flow-unreadable`](../../errors/flow-unreadable/), with whatever was found before it.

`assertFlow` is the same check that throws instead of returning, with every problem in the
message of one [`flow-invalid`](../../errors/flow-invalid/) error. Use it where a definition crossing a boundary should stop the program - a backend
response in development, a fixture in a test - and use `validateFlow` where the problems are
something to render.

This entry point is deliberately separate from `@wizzard-packages/core`. Checking a
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

## Validating with a schema library

A validator is a resolver, so a schema library is one adapter away.
`@wizzard-packages/validate` is that adapter - one for every library, not one per library,
because Zod 3.24+, Zod 4, Valibot, ArkType, Effect and Yup 1.5+ all speak
[Standard Schema](https://standardschema.dev):

```ts
import { createWizard } from '@wizzard-packages/core/v1';
import { schema } from '@wizzard-packages/validate';
import { z } from 'zod';

const wizard = createWizard({
  flow: booking,
  registry: {
    tripRules: schema(z.object({ name: z.string().min(1), age: z.number().min(18) })),
  },
});

await wizard.start(); // the first move, which validates nothing: no step has been left yet
await wizard.next(); // { ok: false, reason: 'invalid', errors: { name: '...', age: '...' } }
```

Swapping the Zod schema for a Valibot, ArkType, Effect or Yup one changes nothing else. The
package never bundles a schema library; the one you use is yours.

`schema(s, opts?)` returns an async resolver:
`(args, scope) => Promise<Record<string, string> | null>`. Keys are dot-paths, values the first message reported for that path, and `null` means the value is good.
An issue path of `['guests', 1, 'name']` becomes the key `guests.1.name`; an issue with no path -
a cross-field refinement - lands on the empty key, which is an error about the value as a whole.
Where two issues share a path the first wins, because schemas report in declaration order and
letting a later refinement overwrite the first hides the obvious failure behind the subtle one.

`opts.at` says which value to validate, as a path into the same scope the flow's expressions
address - `data`, `data.trip`, `ctx.user`. It defaults to `data`, the whole form, because most
schemas describe the fields of the step being left and object schemas ignore keys they do not
mention. A path that is absent hands the schema `undefined` rather than throwing, so a schema
that allows a missing value stays in charge of that decision.

```ts
createWizard({ flow: booking, registry: { tripRules: schema(tripSchema, { at: 'data.trip' }) } });
```

`issuesToErrors` is the same flattening on its own, for a validator that runs a schema itself and
wants the engine's error shape.

## When it runs

`FlowDefinition.validate` schedules the whole thing:

```ts
{ validate: { on: 'change', debounceMs: 300 } }
```

`on` takes `'change'`, `'blur'`, `'next'` or `'manual'`. This is the field that shares a name
with a step's `validate` and means something else entirely: the flow-level one says **when**,
the step-level one says **what**. A flow may set either without the other.
