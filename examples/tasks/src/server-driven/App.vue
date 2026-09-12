<script setup lang="ts">
import { createWizard } from '@wizzard-packages/core/v1';
import { provideWizard } from '@wizzard-packages/vue/v1';

import Wizard from './Wizard.vue';
import { FROM_SERVER, registry } from './contract';
import { loadFlow } from './load';

/**
 * The definition is read once, and the engine is built from what came back. A
 * payload that does not load has no wizard to provide, which is the honest
 * rendering of a backend that sent something wrong.
 */
const loaded = loadFlow(FROM_SERVER, registry);
const flow = loaded.ok ? loaded.flow : null;
const problems = loaded.ok ? [] : loaded.problems;

if (flow !== null) provideWizard(createWizard({ flow, registry }));
</script>

<template>
  <Wizard v-if="flow !== null" :flow="flow" />
  <ul v-else>
    <li v-for="problem in problems" :key="problem.path">{{ problem.message }}</li>
  </ul>
</template>
