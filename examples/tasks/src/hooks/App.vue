<script setup lang="ts">
import { provideWizard } from '@wizzard-packages/vue';

import Steps from './Steps.vue';
import { trip } from './flow';
import { registry } from './registry';

// Builds the engine, starts it in `onMounted` and destroys it with this scope.
// Vue's inject reads the parent chain, so the component that provides cannot
// use the composables itself: they go in a child, `Steps.vue`.
provideWizard({ flow: trip, registry });
</script>

<template>
  <Steps />
</template>
