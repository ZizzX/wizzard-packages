<script setup lang="ts">
import type { RestoreOutcome } from '@wizzard-packages/plugins/persist';
import { useField, useNavigation, useStep } from '@wizzard-packages/vue/v1';
import { computed, onMounted, ref } from 'vue';

import { describeRestore } from './outcome';

const props = defineProps<{ restored: { outcome: RestoreOutcome | null } }>();

const { current, isLast } = useStep();
const { next, back, canBack } = useNavigation();
const full = useField<string>('name.full');
const favourite = useField<string>('colour.favourite');

// Said after the first paint, for the same reason the plugin is installed in
// the browser only: the server never saw this session.
const outcome = ref('Starting.');
onMounted(() => {
  outcome.value = describeRestore(props.restored.outcome);
});

const step = computed(() => current.value ?? 'name');
const starting = computed(() => current.value === null);
</script>

<template>
  <form @submit.prevent>
    <p role="status">{{ outcome }}</p>

    <label v-if="step === 'name'">
      Your name
      <input v-model="full" :disabled="starting" />
    </label>
    <label v-else-if="step === 'colour'">
      A colour
      <input v-model="favourite" :disabled="starting" />
    </label>
    <p v-else-if="step === 'done'">Saved as you went. Reload the page and see.</p>

    <button type="button" :disabled="starting || !canBack" @click="back()">Back</button>
    <button type="button" :disabled="starting || isLast" @click="next()">Next</button>
  </form>
</template>
