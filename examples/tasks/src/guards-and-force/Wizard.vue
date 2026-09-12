<script setup lang="ts">
import { useField, useNavigation, useStep, useWizard } from '@wizzard-packages/vue/v1';
import { computed, ref, useId } from 'vue';

const wizard = useWizard();
const { current } = useStep();
const { isBusy } = useNavigation();
const choice = useField<string>('plan.choice');

/** The last answer navigation gave, kept in the words it gave it. */
type Outcome = { ok: true } | { ok: false; reason: string; by?: string } | null;

const outcome = ref<Outcome>(null);

// Generated, because both renderings of this example sit in the page at once.
const choiceId = useId();

const step = computed(() => current.value ?? 'plan');
const starting = computed(() => current.value === null);

const described = computed(() => {
  const o = outcome.value;
  if (o === null) return 'Nothing tried yet.';
  if (o.ok) return 'Moved to Done.';
  return o.by === undefined ? `Refused: ${o.reason}.` : `Refused: ${o.reason}, by ${o.by}.`;
});

const jump = async (force: boolean): Promise<void> => {
  const result = await wizard.go('done', { force });
  outcome.value = result.ok ? { ok: true } : { ok: false, reason: result.reason, by: result.by };
};
</script>

<template>
  <form @submit.prevent>
    <p>
      <label :for="choiceId">Your plan</label>
      <input
        :id="choiceId"
        v-model="choice"
        :disabled="starting"
        placeholder="leave it empty to see the guard refuse"
      />
    </p>

    <!-- Two buttons, one difference: the second passes `force`. Neither of them
         can get past the guard on `done`. -->
    <button type="button" :disabled="starting || isBusy" @click="jump(false)">Jump to Done</button>
    <button type="button" :disabled="starting || isBusy" @click="jump(true)">
      Jump with force
    </button>

    <p role="status">{{ described }}</p>
    <p>Current step: {{ step }}</p>
  </form>
</template>
