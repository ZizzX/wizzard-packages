<script setup lang="ts">
import { groups } from '@wizzard-packages/core/groups';
import { provideWizard } from '@wizzard-packages/vue/v1';

import Trip from './Trip.vue';
import { initialData, subFlows, trip } from './flow';

// Traversal is installed rather than imported by the engine: a flat flow pays
// nothing for the machinery that walks sub-flows, so a flow that contains a
// group has to be handed it.
provideWizard({
  flow: trip,
  groups,
  subFlows,
  data: initialData(),
});
</script>

<template>
  <Trip />
</template>
