<script setup lang="ts">
import { useErrors, useField, useNavigation, useStep } from '@wizzard-packages/vue/v1';
import { computed, useId } from 'vue';

const { current } = useStep();
const { next, isBusy } = useNavigation();
const email = useField<string>('details.email');
const errors = useErrors();

// Nothing is current until the engine starts, which happens in the browser.
const step = computed(() => current.value ?? 'details');
const starting = computed(() => current.value === null);

// A generated id rather than a written one. On the page this example appears on,
// the React and Vue renderings are both in the document - the tab that is not
// showing is hidden, not removed - so a fixed `id` would be there twice and
// every `for` pointing at it would find the wrong field.
const emailId = useId();
</script>

<template>
  <!-- The refusal is the return value, not an exception: `next()` resolves to
       `{ ok: false, reason: 'invalid', errors }` and the flow stays put. -->
  <form @submit.prevent="next()">
    <template v-if="step === 'details'">
      <label :for="emailId">Your email</label>
      <input
        :id="emailId"
        v-model="email"
        :disabled="starting"
        :aria-invalid="errors['email'] !== undefined"
        :aria-describedby="errors['email'] === undefined ? undefined : `${emailId}-error`"
      />
      <p v-if="errors['email'] !== undefined" :id="`${emailId}-error`" role="alert">
        {{ errors['email'] }}
      </p>
    </template>
    <p v-else-if="step === 'done'">That address will do.</p>

    <button type="submit" :disabled="starting || isBusy || step === 'done'">Next</button>
  </form>
</template>
