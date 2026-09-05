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
