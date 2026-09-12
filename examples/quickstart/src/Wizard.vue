<script setup lang="ts">
import { useField, useNavigation, useStep } from '@wizzard-packages/vue/v1';
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
