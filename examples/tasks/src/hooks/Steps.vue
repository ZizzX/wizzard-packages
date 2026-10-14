<script setup lang="ts">
import {
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizardSelector,
} from '@wizzard-packages/vue';

// The five composables a form needs. Each field is a `ComputedRef`, so
// destructuring keeps it reactive.
const { current, progress, breadcrumbs } = useStep();
const { next, back, canBack, isBusy } = useNavigation();
// A `WritableComputedRef`, for `v-model`.
const name = useField<string>('details.name');
const errors = useErrors();
const length = useWizardSelector(
  (s) => (s.data['details'] as { name?: string } | undefined)?.name?.length ?? 0
);
</script>

<template>
  <!-- Nothing is current until `provideWizard` has started the engine. -->
  <section v-if="current !== null">
    <ol>
      <li
        v-for="b in breadcrumbs"
        :key="b.id"
        :aria-current="b.status === 'current' ? 'step' : undefined"
      >
        {{ b.label }}
      </li>
    </ol>
    <p>{{ progress }}% done</p>

    <label v-if="current === 'details'">
      Trip name
      <input v-model="name" />
      <small>{{ length }} characters</small>
    </label>
    <p v-if="errors['name'] !== undefined" role="alert">{{ errors['name'] }}</p>
    <p v-if="current === 'review'">Ready to book {{ name }}.</p>

    <button :disabled="!canBack || isBusy" @click="back()">Back</button>
    <!-- A refusal is the value `next()` resolves to; the errors above show it. -->
    <button :disabled="isBusy || current === 'review'" @click="next()">Next</button>
  </section>
</template>
