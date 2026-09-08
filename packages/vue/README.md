# @wizzard-packages/vue

![npm](https://img.shields.io/npm/v/@wizzard-packages/vue)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/vue)
![license](https://img.shields.io/npm/l/@wizzard-packages/vue)

The Vue binding for [`@wizzard-packages/core`](https://www.npmjs.com/package/@wizzard-packages/core).
It bridges the engine into Vue and does nothing else: navigation, guards and validation are the
engine's, so this package is one `provide` and eight composables. That is why it is 732 B gzipped
against 5.07 kB for its 0.x equivalent — nothing was optimised, the logic moved.

## Install

```bash
pnpm add @wizzard-packages/core@canary @wizzard-packages/vue@canary
```

Vue 3.3 or newer. Reactivity rides on snapshot identity: the engine returns the same object
until a commit, so a `shallowRef` holding it invalidates exactly once per commit and every
`computed` derived from it caches for free.

## Use

`provideWizard` goes in a parent, because `inject` reads the parent chain — the component that
provides the wizard is not the one that uses it. Pass a flow and the scope owns and destroys
the engine, or pass a `Wizard` you built yourself and it stays yours.

```vue
<script setup lang="ts">
import { provideWizard } from '@wizzard-packages/vue/v1';

import { signup } from './flow';
import Wizard from './Wizard.vue';

provideWizard({ flow: signup });
</script>

<template>
  <Wizard />
</template>
```

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

That file and the flow it imports are `examples/quickstart`, which CI runs — this block is
generated from them, so what you paste is what is tested.

## Composables

| Composable              | Returns                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `useStep()`             | `current`, `isFirst`, `isLast`, `progress`, `breadcrumbs` and the rest, each a `ComputedRef` |
| `useNavigation()`       | `next`, `back`, `go`, `cancel`, and `canBack`, `isBusy`, `isLast` as `ComputedRef`s          |
| `useField<T>(path)`     | a `WritableComputedRef`, usable directly with `v-model`                                      |
| `useErrors(stepId?)`    | a `ComputedRef` of the error map for a step, or for the current one                          |
| `useWizardSelector(fn)` | one derived value as a `ComputedRef`                                                         |
| `useWizard()`           | the engine itself, for anything the composables above do not cover                           |

`useOptionalWizard()` returns `null` outside a provider instead of throwing, which is what a
component rendered both inside and outside a wizard needs.

Navigation is async and returns a result, not a boolean: `await next()` gives
`{ ok: false, reason: 'blocked', by: 'age-check' }` when a guard refuses. Every `await` inside
the engine re-checks a navigation epoch, so a validator that resolves after the user pressed
Back cannot move them.

On the server `onMounted` never runs, so a wizard rendered by SSR navigates nowhere and hydrates
into its first step on the client.

## Documentation

[Getting started](https://zizzx.github.io/wizzard-packages/docs/start/) ·
[The flow](https://zizzx.github.io/wizzard-packages/docs/flow/) ·
[Navigation](https://zizzx.github.io/wizzard-packages/docs/navigation/) ·
[Validation](https://zizzx.github.io/wizzard-packages/docs/validation/) ·
[Persistence](https://zizzx.github.io/wizzard-packages/docs/persistence/)

The same names, as hooks, are in
[`@wizzard-packages/react`](https://www.npmjs.com/package/@wizzard-packages/react). A shared
contract suite runs against both, which is what stops them drifting apart.

## Upgrading from 0.x

0.x was a different library with the same name: `createWizardFactory<TSchema>()`,
`useProvideWizard`, `useWizardState`, `useWizardActions`. In v1 the names are shorter and the
import path carries the version — `@wizzard-packages/vue/v1`. v1 is on the `canary` tag while
the launch lands; the 0.x line on `latest` is being retired.

## License

MIT
