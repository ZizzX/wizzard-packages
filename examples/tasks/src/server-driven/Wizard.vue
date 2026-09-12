<script setup lang="ts">
import type { FlowDefinition, Wizard as Engine } from '@wizzard-packages/core/v1';
import { useField, useNavigation, useStep, useWizard } from '@wizzard-packages/vue/v1';
import { computed, ref, useId } from 'vue';

import { PATCH_FROM_SERVER, registry } from './contract';
import { checkPatch } from './load';

const props = defineProps<{ flow: FlowDefinition }>();

const wizard = useWizard() as Engine;
const { current } = useStep();
const { next, isBusy } = useNavigation();
const email = useField<string>('account.email');

const note = ref('Loaded from the server.');
const emailId = useId();

const step = computed(() => current.value ?? 'account');
const starting = computed(() => current.value === null);

/**
 * A patch is checked before it is applied. `patchFlow` merges and installs; it
 * does not validate, so an `order` of the wrong type would be accepted here and
 * fail later, in a selector, with the payload long out of sight.
 */
const applyPatch = (): void => {
  const checked = checkPatch(props.flow, PATCH_FROM_SERVER, registry);
  note.value = checked.ok
    ? `Patch: ${wizard.patchFlow(checked.patch) ? 'applied' : 'refused'}`
    : `Patch: refused before applying - ${checked.problems[0]?.message ?? ''}`;
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
