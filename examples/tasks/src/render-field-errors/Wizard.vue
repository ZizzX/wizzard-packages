<script setup lang="ts">
import { useErrors, useField, useNavigation, useStep, useWizard } from '@wizzard-packages/vue/v1';
import { computed, useId } from 'vue';

const wizard = useWizard();
const { current } = useStep();
const { next, isBusy } = useNavigation();
const email = useField<string>('details.email');
const card = useField<string>('details.card');
const errors = useErrors();

const step = computed(() => current.value ?? 'details');
const starting = computed(() => current.value === null);

// Generated, not written. Both renderings of this example are in the page at
// once - the tab that is not showing is hidden, not removed - so a fixed `id`
// would be in the document twice, and `for` and `aria-describedby` would both
// resolve to whichever came first rather than to the field beside them.
const emailId = useId();
const cardId = useId();
</script>

<template>
  <form @submit.prevent="next()">
    <template v-if="step === 'details'">
      <!-- Each input points at its own message with `aria-describedby` and says
           it is wrong with `aria-invalid`, which is what a screen reader reads. -->
      <p>
        <label :for="emailId">Your email</label>
        <input
          :id="emailId"
          v-model="email"
          :disabled="starting"
          :aria-invalid="errors['email'] !== undefined"
          :aria-describedby="errors['email'] === undefined ? undefined : `${emailId}-error`"
        />
        <span v-if="errors['email'] !== undefined" :id="`${emailId}-error`" role="alert">
          {{ errors['email'] }}
        </span>
      </p>

      <p>
        <label :for="cardId">Card number</label>
        <input
          :id="cardId"
          v-model="card"
          :disabled="starting"
          :aria-invalid="errors['card'] !== undefined"
          :aria-describedby="errors['card'] === undefined ? undefined : `${cardId}-error`"
        />
        <span v-if="errors['card'] !== undefined" :id="`${cardId}-error`" role="alert">
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
