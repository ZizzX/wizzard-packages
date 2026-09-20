---
title: Testing a wizard
description: Driving a flow without a browser, and what to assert once it has moved.
---

A flow is data and the engine is a plain object, so a wizard is testable without a renderer,
without a DOM and without a helper library. There is no test build of the engine and no mock
factory - the thing under test is the thing that ships.

## Driving the engine

Build the wizard the way the application does, then move it:

```ts
import { createWizard, type FlowDefinition } from '@wizzard-packages/core';
import { expect, it } from 'vitest';

const flow = {
  id: 'booking',
  order: ['trip', 'payment'],
  steps: {
    trip: { label: 'Trip', validate: { $ref: 'tripRules' } },
    payment: { label: 'Payment' },
  },
  policy: 'free',
} satisfies FlowDefinition;

const registry = {
  tripRules: (_args, scope) => (scope.data.name ? null : { name: 'required' }),
};

it('will not leave an incomplete step', async () => {
  const wizard = createWizard({ flow, registry, data: {} });
  await wizard.start();

  expect(await wizard.next()).toMatchObject({ ok: false, reason: 'invalid', by: 'trip' });
  expect(wizard.getSnapshot().current).toBe('trip');

  wizard.set('name', 'Ann');
  expect(await wizard.next()).toMatchObject({ ok: true, to: 'payment' });
});
```

`start()` is what a binding does on mount, and a headless test has to do it too: without it the
stack is empty and the first `next()` is the move that enters the flow rather than one that
leaves a step.

A resolver is an ordinary function, so a registry in a test is an object of ordinary functions.
Nothing about it is a stub: the same shape goes to production.

## What to assert

Two kinds of outcome, and they are not the same assertion.

A refusal is a value. `next()`, `back()` and `go()` resolve to a `NavResult`, so an expected
refusal is compared, not caught:

```ts
expect(await wizard.go('payment')).toMatchObject({ ok: false, reason: 'not-reachable' });
```

A mistake in the flow throws. A `$ref` the registry does not hold, a group step with no
traversal - those reject the promise, and the test says so:

```ts
await expect(wizard.next()).rejects.toMatchObject({ code: 'resolver-not-registered' });
```

[API behaviour](../api-behaviour/) is the division in full: refusals are values, failures are
exceptions.

For state, read `getSnapshot()`. It carries `current`, `index`, `isLast`, `progress`,
`breadcrumbs`, `errors` and `data` together, so one read answers most assertions, and it is a
new object only when something committed.

## Checking the definition itself

A flow that is never walked can still be wrong, and the check for that is not a test run:

```ts
import { validateFlow } from '@wizzard-packages/core/validate-flow';

it('is a valid flow', () => {
  expect(validateFlow(booking, registry)).toEqual([]);
});
```

That catches a transition to a step that does not exist, a `$ref` no registry holds, a `when`
that is not an expression - the class of mistake a type cannot see and a test only finds when it
happens to walk that branch. [Validation](../validation/) covers what it reports.

## Testing components

A component test needs no special treatment either: render it inside the provider with a flow
and a registry of your own, and assert on what it renders. The engine does not know it is being
tested, and the binding does not care where its wizard came from. Where the two bindings have to
behave identically, that is the repository's own contract suite - one set of flows driven
through React and Vue - rather than something to reproduce in an application.
