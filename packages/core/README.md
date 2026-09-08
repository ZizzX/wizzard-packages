# @wizzard-packages/core

![npm](https://img.shields.io/npm/v/@wizzard-packages/core)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/core)
![license](https://img.shields.io/npm/l/@wizzard-packages/core)

The engine. A flow is a plain JSON object — no functions, no classes, no `Set`s — and this
package is what walks it: expressions, guards, validation, navigation and the state that
comes out. It has no framework in it, so React and Vue are thin bindings over one engine
rather than two implementations of the same rules.

## Install

```bash
pnpm add @wizzard-packages/core@canary
```

## A flow

`defineFlow` and `step` are the typed way to write that JSON. They add no runtime behaviour —
`defineFlow` returns its argument — but they carry the shape of each step's data into
`wizard.get` and `wizard.set`.

<!-- example:quickstart-flow -->

<!-- prettier-ignore -->
```ts
import { defineFlow, step } from '@wizzard-packages/core/v1';

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

## Running it

```ts
import { createWizard } from '@wizzard-packages/core/v1';

import { signup } from './flow';

const wizard = createWizard({ flow: signup });

await wizard.start(); // enters the first reachable step
wizard.set('name.full', 'Ada');
const result = await wizard.next();
// { ok: true } — or { ok: false, reason: 'blocked', by: 'age-check' }
```

Navigation returns a result, never a bare boolean, because "it did not move" and "why it did
not move" are different questions and the second one is what you render. `subscribe`,
`select` and `watch` are the three ways to hear about a change: everything, one derived
value, or one data path.

Anything a flow cannot serialize — a validator, a predicate, an async guard — is a **named**
entry in `registry`, so `JSON.stringify(flow)` always round-trips.

## Entries

Separate entry points because they are separate budgets. A wizard that never draws itself
does not carry the code that would.

| Entry            | What it is                                                     |
| ---------------- | -------------------------------------------------------------- |
| `/v1`            | the engine: types, expressions, navigation, selectors          |
| `/graph`         | a flow as `{ nodes, edges }`, for drawing it                   |
| `/groups`        | traversal for repeated sub-flows                               |
| `/session`       | a recorded run, and the check that a replay matches it         |
| `/snapshot`      | serialize a run, and refuse stored JSON that cannot be trusted |
| `/expr`          | a builder for expressions, if you dislike writing JSON         |
| `/validate-flow` | checks a flow definition, for tooling and tests                |

`.size-limit.js` holds the budget for each, with the measurement that set it.

## Documentation

The guides live on the site: [Getting started](https://zizzx.github.io/wizzard-packages/docs/start/),
[The flow](https://zizzx.github.io/wizzard-packages/docs/flow/),
[Expressions](https://zizzx.github.io/wizzard-packages/docs/expressions/),
[Navigation](https://zizzx.github.io/wizzard-packages/docs/navigation/).

Bindings: [`@wizzard-packages/react`](https://www.npmjs.com/package/@wizzard-packages/react),
[`@wizzard-packages/vue`](https://www.npmjs.com/package/@wizzard-packages/vue). Validation:
[`@wizzard-packages/validate`](https://www.npmjs.com/package/@wizzard-packages/validate).

## Upgrading from 0.x

0.x was a different library with the same name: `new WizardStore(...)`, a config of steps, and
the branching in your components. v1 is on the `canary` tag while the launch lands. The
0.x line on `latest` is being retired.

## License

MIT
