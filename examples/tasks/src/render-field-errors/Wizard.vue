<script setup lang="ts">
import { useErrors, useField, useNavigation, useStep, useWizard } from '@wizzard-packages/vue/v1';
import { computed } from 'vue';

const wizard = useWizard();
const { current } = useStep();
const { next, isBusy } = useNavigation();
const email = useField<string>('details.email');
const card = useField<string>('details.card');
const errors = useErrors();

const step = computed(() => current.value ?? 'details');
const starting = computed(() => current.value === null);
</script>

<template>
  <form @submit.prevent="next()">
    <template v-if="step === 'details'">
      <!-- Each input points at its own message with `aria-describedby` and says
           it is wrong with `aria-invalid`, which is what a screen reader reads. -->
      <p>
        <label for="email">Your email</label>
        <input
          id="email"
          v-model="email"
          :disabled="starting"
          :aria-invalid="errors['email'] !== undefined"
          :aria-describedby="errors['email'] === undefined ? undefined : 'email-error'"
        />
        <span v-if="errors['email'] !== undefined" id="email-error" role="alert">
          {{ errors['email'] }}
        </span>
      </p>

      <p>
        <label for="card">Card number</label>
        <input
          id="card"
          v-model="card"
          :disabled="starting"
          :aria-invalid="errors['card'] !== undefined"
          :aria-describedby="errors['card'] === undefined ? undefined : 'card-error'"
        />
        <span v-if="errors['card'] !== undefined" id="card-error" role="alert">
          {{ errors['card'] }}
        </span>
      </p>

      <!-- A message the engine could not have produced: the card was well formed
           and the payment service still said no. It goes in the same place. -->
      <button
        type="button"
        :disabled="starting"
        @click="wizard.setErrors('details', { card: 'That card was declined.' })"
      >
        Pretend the server refused
      </button>
    </template>
    <p v-else-if="step === 'done'">Both fields were fine.</p>

    <button type="submit" :disabled="starting || isBusy || step === 'done'">Next</button>
  </form>
</template>
