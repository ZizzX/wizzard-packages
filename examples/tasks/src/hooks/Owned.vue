<script setup lang="ts">
import { provideWizard } from '@wizzard-packages/vue';

import Steps from './Steps.vue';
import { wizard } from './wizard';

// Given an engine, `provideWizard` provides that one and leaves its lifetime to you.
provideWizard(wizard);
</script>

<template>
  <Steps />
</template>
