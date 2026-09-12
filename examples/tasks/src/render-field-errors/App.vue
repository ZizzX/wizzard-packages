<script setup lang="ts">
import { provideWizard } from '@wizzard-packages/vue/v1';

import Wizard from './Wizard.vue';
import { checkout } from './flow';
import { registry } from './registry';

// The wizard is provided here and consumed by the child. Vue's inject reads the
// parent chain, so the component that provides cannot also use the composables.
provideWizard({ flow: checkout, registry });
</script>

<template>
  <Wizard />
</template>
