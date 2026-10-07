# @wizzard-packages/core

![npm](https://img.shields.io/npm/v/@wizzard-packages/core)
![license](https://img.shields.io/npm/l/@wizzard-packages/core)

The engine. A flow is a plain JSON object — no functions, no classes, no `Set`s — and this
package is what walks it: expressions, guards, validation, navigation and the state that
comes out. It has no framework in it, so React and Vue are thin bindings over one engine
rather than two implementations of the same rules.

## Install

<!-- example:install-core -->

<!-- prettier-ignore -->
```bash
pnpm add @wizzard-packages/core@canary
```

<!-- /example -->

## A flow

`defineFlow` and `step` are the typed way to write that JSON. They add no runtime behaviour —
`defineFlow` returns its argument — but they carry the shape of each step's data into
`wizard.get` and `wizard.set`.

<!-- example:quickstart-flow -->

<!-- prettier-ignore -->
```ts
import { defineFlow, step } from '@wizzard-packages/core';

/**
 * The smallest flow that is still a wizard: two steps, one field, and a value
 * that has to survive going back.
 *
 * A flow is data. This object is JSON — no functions, no classes — so the same
 * definition can come from a file, from a backend, or from a generator, and one
 * engine runs all three.
 */
export const signup = defineFlow({
  id: 'signup',
  order: ['name', 'review'],
  steps: {
    name: step<{ full: string }>({ label: 'Your name' }),
    review: step({ label: 'Review' }),
  },
});
```

<!-- /example -->

```ts
import { createWizard } from '@wizzard-packages/core';

import { signup } from './flow';

const wizard = createWizard({ flow: signup });

await wizard.start(); // enters the first reachable step
wizard.set('name.full', 'Ada');
await wizard.next(); // { ok: true }, or { ok: false, reason: 'blocked', by: 'age-check' }
```

Anything a flow cannot serialize — a validator, a predicate, an async guard — is a named entry
in `registry`, so `JSON.stringify(flow)` always round-trips. What throws is a mistake in the
program, never an outcome of the wizard: a `WizardError` whose `url` is the page for its code.

`/graph`, `/groups`, `/session`, `/snapshot`, `/expr` and `/validate-flow` are separate entry
points, because they are separate budgets: a wizard that never draws itself does not carry the
code that would.
[Packages and entry points](https://zizzx.github.io/wizzard-packages/docs/concepts/#packages-and-entry-points) says what
each one is.

## Supported

Node 20.11+, TypeScript 5+. ESM and CJS, types for both. No dependencies and no peers.

## Documentation

[Getting started](https://zizzx.github.io/wizzard-packages/docs/start/) · [The flow](https://zizzx.github.io/wizzard-packages/docs/flow/) ·
[Expressions](https://zizzx.github.io/wizzard-packages/docs/expressions/) · [Navigation](https://zizzx.github.io/wizzard-packages/docs/navigation/) ·
[API behaviour](https://zizzx.github.io/wizzard-packages/docs/api-behaviour/) · [API reference](https://zizzx.github.io/wizzard-packages/docs/api/)

Coming from 0.x: [the migration guide](https://github.com/ZizzX/wizzard-packages/blob/main/docs/MIGRATION.md).

## License

MIT
