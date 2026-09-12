<script setup lang="ts">
import { useField, useNavigation, useStep, useWizardSelector } from '@wizzard-packages/vue/v1';
import { computed } from 'vue';

const { current, isLast } = useStep();
const { next, back, canBack } = useNavigation();
const payer = useField<string>('plan.payer');
const company = useField<string>('company.name');
const code = useField<string>('coupon.code');

// What would be submitted, read straight off the engine rather than tracked
// here: this is the whole point of the page, so it should not be a copy.
const data = useWizardSelector((s) => JSON.stringify(s.data, null, 2));

const step = computed(() => current.value ?? 'plan');
const starting = computed(() => current.value === null);
</script>

<template>
  <form @submit.prevent>
    <fieldset v-if="step === 'plan'" :disabled="starting">
      <legend>Who is paying</legend>
      <label v-for="choice in ['personal', 'business']" :key="choice">
        <input v-model="payer" type="radio" name="payer" :value="choice" />
        {{ choice === 'personal' ? 'Personal' : 'Business' }}
      </label>
    </fieldset>

    <label v-else-if="step === 'company'">
      Company name
      <input v-model="company" :disabled="starting" />
    </label>

    <label v-else-if="step === 'coupon'">
      Coupon code
      <input v-model="code" :disabled="starting" />
    </label>

    <template v-else-if="step === 'review'">
      <p>This is what would be submitted:</p>
      <pre>{{ data }}</pre>
    </template>

    <button type="button" :disabled="starting || !canBack" @click="back()">Back</button>
    <button type="button" :disabled="starting || isLast" @click="next()">Next</button>
  </form>
</template>
