# wizzard

[![npm](https://img.shields.io/npm/v/@wizzard-packages/core.svg)](https://www.npmjs.com/package/@wizzard-packages/core)
[![license](https://img.shields.io/npm/l/@wizzard-packages/core.svg)](LICENSE)

A multi-step flow is a graph, but most libraries make you write it as a list and keep the
branches in your components. Here the flow is **data** — a plain JSON object — and one engine
runs it for React and Vue alike. Because it is data, you can draw it, send it from a server,
diff it, and replay a recorded run of it.

```bash
pnpm add @wizzard-packages/core@canary @wizzard-packages/react@canary
```

## A wizard in twenty lines

Two steps, one field, and a value that is still there after Back.

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

<!-- example:quickstart-react -->

<!-- prettier-ignore -->
```tsx
import { WizardProvider, useField, useNavigation, useStep } from '@wizzard-packages/react/v1';

import { signup } from './flow';

export function App() {
  return (
    <WizardProvider flow={signup}>
      <Wizard />
    </WizardProvider>
  );
}

function Wizard() {
  const { current, isLast } = useStep();
  const { next, back, canBack } = useNavigation();
  const [full, setFull] = useField<string>('name.full');

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {current === 'name' && (
        <label>
          Your name
          <input value={full ?? ''} onChange={(e) => setFull(e.target.value)} />
        </label>
      )}
      {current === 'review' && <p>Hello, {full || 'stranger'}.</p>}

      <button type="button" onClick={() => back()} disabled={!canBack}>
        Back
      </button>
      <button type="button" onClick={() => next()} disabled={isLast}>
        Next
      </button>
    </form>
  );
}
```

<!-- /example -->

Vue is the same engine and the same hook names. The component that provides the wizard is not
the one that uses it, because Vue's `inject` reads the parent chain:

<!-- example:quickstart-vue -->

<!-- prettier-ignore -->
```vue
<script setup lang="ts">
import { useField, useNavigation, useStep } from '@wizzard-packages/vue/v1';

const { current, isLast } = useStep();
const { next, back, canBack } = useNavigation();
const full = useField<string>('name.full');
</script>

<template>
  <form @submit.prevent>
    <label v-if="current === 'name'">
      Your name
      <input v-model="full" />
    </label>
    <p v-else-if="current === 'review'">Hello, {{ full || 'stranger' }}.</p>

    <button type="button" :disabled="!canBack" @click="back()">Back</button>
    <button type="button" :disabled="isLast" @click="next()">Next</button>
  </form>
</template>
```

<!-- /example -->

Those three files are `examples/quickstart`. CI runs them on both bindings and fails if this
README drifts from them, so what you paste is what is tested.

## Groups and repeat

A repeated section — one block of steps per passenger — is a sub-flow entered once per item.
The traversal that walks it is a separate entry, so a flat flow never carries it:

```ts
import { createWizard } from '@wizzard-packages/core/v1';
import { groups } from '@wizzard-packages/core/groups';

const passenger = {
  id: 'passenger',
  order: ['seat', 'meal'],
  steps: { seat: {}, meal: {} },
};

const trip = {
  id: 'trip',
  version: 1,
  order: ['passengers', 'review'],
  steps: {
    passengers: {
      flow: 'passenger',
      when: { $not: { $empty: { $get: 'data.passengers' } } },
      repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' },
    },
    review: {},
  },
};

const wizard = createWizard({ flow: trip, groups, subFlows: { passenger } });
```

`keyBy` names the field that identifies an item. The stack stores that key and nothing else, so
reordering the list moves the person with their item and removing one they are not on leaves
them where they are. Inside the sub-flow, `{ $get: 'loop.item' }`, `loop.index` and `loop.key`
are in scope for guards, conditions and validators. `docs/designs/group-traversal.md` is the
full set of rules.

## Why this and not something else

**No stale async transitions.** Validation, guards and loading are eleven phases of one
pipeline, and state is written exactly once at the end of it. Every `await` re-checks a
navigation epoch, so a slow validator that resolves after you pressed Back cannot move you.
Navigation returns a result — `{ ok: false, reason: 'blocked', by: 'age-check' }` — never a
bare boolean.

**One engine, two bindings.** `@wizzard-packages/react` is 906 B and `@wizzard-packages/vue`
is 646 B, against 8.43 kB and 5.07 kB for their 0.x equivalents. Nothing was optimised to get
there: the logic moved into the engine. A shared contract suite runs against both, which is
what stops them drifting apart.

**The flow is JSON.** No functions, no classes, no `Set`s — in the definition or in the state.
Predicates and validators are named entries in a registry, so `JSON.stringify(flow)` always
round-trips. That is what makes a graph view, a server-driven flow and a replayable session
possible at all.

## When it earns its dependency

Reach for [`@stepperize/react`](https://stepperize.vercel.app) if you need a stepper: one
hook, one list of steps, and your own branching in components. It is smaller and simpler, and
for a linear form it is the right answer.

Reach for [XState](https://stately.ai/docs) if your problem is a state machine that happens to
have a UI — parallel states, actors, invoked services. It is a bigger idea than a wizard, and
its visualiser is excellent.

Reach for this when the flow itself is the thing you need to hold: branches that depend on
answers, a back button that must not lose data, a reload that must not lose progress, or a
definition that comes from somewhere other than your bundle. When a `useReducer` and three
`useEffect`s have started disagreeing about which step you are on, that is the moment.

## Packages

| Package                        | What it is                                                 | gzip    |
| ------------------------------ | ---------------------------------------------------------- | ------- |
| `@wizzard-packages/core`       | the engine: flow types, expressions, navigation, selectors | 3.92 kB |
| `@wizzard-packages/react`      | provider and hooks                                         | 927 B   |
| `@wizzard-packages/vue`        | `provideWizard` and the same composables                   | 660 B   |
| `@wizzard-packages/validate`   | one adapter for Zod, Valibot, ArkType, Effect and Yup      | 317 B   |
| `@wizzard-packages/core/graph` | a flow as `{ nodes, edges }`, for drawing it               | 754 B   |

Separate entries because they are separate budgets: a wizard that never draws itself does not
carry the code that would.

## Supported

Node 20.11+, TypeScript 5+, React 18+, Vue 3.3+. ESM and CJS, types for both.

## Status

v1 is on the `canary` tag while the launch lands: the engine, both bindings and validation are
done; persistence, devtools and the documentation site are in progress. `docs/designs/v1-launch.md`
is the plan, and `ROADMAP.md` is where it came from. The 0.x line on `latest` is a different
library with the same name and is being retired.

## License

MIT © [ZizzX](https://github.com/ZizzX)
