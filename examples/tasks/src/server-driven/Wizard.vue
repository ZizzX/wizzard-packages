<script setup lang="ts">
import type { Wizard } from '@wizzard-packages/core/v1';
import { useField, useNavigation, useStep, useWizard } from '@wizzard-packages/vue/v1';
import { computed, ref, useId } from 'vue';

import { PATCH_FROM_SERVER } from './contract';

const wizard = useWizard() as Wizard;
const { current } = useStep();
const { next, isBusy } = useNavigation();
const email = useField<string>('account.email');

const note = ref('Loaded from the server.');
const emailId = useId();

const step = computed(() => current.value ?? 'account');
const starting = computed(() => current.value === null);

const applyPatch = (): void => {
  const patch = JSON.parse(PATCH_FROM_SERVER) as Parameters<typeof wizard.patchFlow>[0];
  note.value = `Patch: ${wizard.patchFlow(patch) ? 'applied' : 'refused'}`;
};

/**
 * Built here rather than parsed: JSON has no `undefined`, so deleting a step is
 * the one change a payload cannot express.
 */
const applyRemoval = (): void => {
  const removal = { steps: { account: undefined } } as unknown as Parameters<
    typeof wizard.patchFlow
  >[0];
  note.value = `Removal: ${wizard.patchFlow(removal) ? 'applied' : 'refused'}`;
};
</script>

<template>
  <form @submit.prevent>
    <p v-if="step === 'account'">
      <label :for="emailId">Your email</label>
      <input :id="emailId" v-model="email" :disabled="starting" />
    </p>
    <p v-else>Step: {{ step }}</p>

    <button type="button" :disabled="starting || isBusy" @click="next()">Next</button>
    <button type="button" :disabled="starting" @click="applyPatch">Apply the patch</button>
    <button type="button" :disabled="starting" @click="applyRemoval">
      Apply a patch that deletes this step
    </button>

    <p role="status">{{ note }}</p>
  </form>
</template>
