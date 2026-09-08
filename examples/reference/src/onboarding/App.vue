<script setup lang="ts">
import { provideWizard } from '@wizzard-packages/vue/v1';

import Onboarding from './Onboarding.vue';
import { onboarding } from './flow';
import { registry } from './registry';

// The wizard is provided here and consumed by the child. Vue's `inject` reads
// the parent chain, so the component that provides cannot also use the
// composables - which is the whole reason this file is two lines and a child.
provideWizard({ flow: onboarding, registry, ctx: { returning: false } });
</script>

<template>
  <Onboarding />
</template>
