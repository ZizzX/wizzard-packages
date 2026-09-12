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
if (loaded.ok) provideWizard(createWizard({ flow: loaded.flow, registry }));
</script>

<template>
  <Wizard v-if="loaded.ok" />
  <ul v-else>
    <li v-for="problem in loaded.problems" :key="problem.path">{{ problem.message }}</li>
  </ul>
</template>
