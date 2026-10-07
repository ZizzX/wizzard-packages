# @wizzard-packages/vue

![npm](https://img.shields.io/npm/v/@wizzard-packages/vue)
![license](https://img.shields.io/npm/l/@wizzard-packages/vue)

The Vue binding for [`@wizzard-packages/core`](https://www.npmjs.com/package/@wizzard-packages/core).
It bridges the engine into Vue and does nothing else: navigation, guards and validation are the
engine's, so this package is `provideWizard` and eight composables.

## Install

<!-- example:install-vue -->

<!-- prettier-ignore -->
```bash
pnpm add @wizzard-packages/core@canary @wizzard-packages/vue@canary
```

<!-- /example -->

## Use

`provideWizard` goes in a parent component. Given a `flow` it builds a wizard and destroys it
with that component; given a `wizard` you built, it leaves it yours. Children read it with the
same names the React binding uses: `useStep`, `useNavigation`, `useField`, `useErrors`,
`useWizardSelector`, `useWizardSnapshot`, `useWizard` and `useOptionalWizard`.

<!-- example:quickstart-vue-app -->

<!-- prettier-ignore -->
```vue
<script setup lang="ts">
import { provideWizard } from '@wizzard-packages/vue';

import Wizard from './Wizard.vue';
import { signup } from './flow';

// The wizard is provided here and consumed by the child. Vue's inject reads the
// parent chain, so the component that provides cannot also use the composables.
provideWizard({ flow: signup });
</script>

<template>
  <Wizard />
</template>
```

<!-- /example -->

<!-- example:quickstart-vue -->

<!-- prettier-ignore -->
```vue
<script setup lang="ts">
import { useField, useNavigation, useStep } from '@wizzard-packages/vue';
import { computed } from 'vue';

const { current, isLast } = useStep();
const { next, back, canBack } = useNavigation();
const full = useField<string>('name.full');

// Nothing is current until the engine starts, which happens in the browser: on
// the server, and for the first paint, `current` is null. So the form draws the
// step it is about to enter and keeps every control out of reach until the
// engine can act on it - the field included, because anything typed before the
// engine exists is not in its state and the first commit would wipe it.
const step = computed(() => current.value ?? 'name');
const starting = computed(() => current.value === null);
</script>

<template>
  <form @submit.prevent>
    <label v-if="step === 'name'">
      Your name
      <input v-model="full" :disabled="starting" />
    </label>
    <p v-else-if="step === 'review'">Hello, {{ full || 'stranger' }}.</p>

    <button type="button" :disabled="starting || !canBack" @click="back()">Back</button>
    <button type="button" :disabled="starting || isLast" @click="next()">Next</button>
  </form>
</template>
```

<!-- /example -->

## Supported

Vue 3.3+, Node 20.11+, TypeScript 5+. ESM and CJS, types for both. `vue` is a peer dependency.
`@wizzard-packages/core` is a dependency, installed beside it above so your own code can import
the engine.

## Documentation

[Getting started](https://zizzx.github.io/wizzard-packages/docs/start/) ·
[Hooks](https://zizzx.github.io/wizzard-packages/docs/hooks/) ·
[Navigation](https://zizzx.github.io/wizzard-packages/docs/navigation/) ·
[Validation](https://zizzx.github.io/wizzard-packages/docs/validation/) ·
[Persistence](https://zizzx.github.io/wizzard-packages/docs/persistence/)

The same names for React are in [`@wizzard-packages/react`](https://www.npmjs.com/package/@wizzard-packages/react).
Coming from 0.x: [the migration guide](https://github.com/ZizzX/wizzard-packages/blob/main/docs/MIGRATION.md).

## License

MIT
