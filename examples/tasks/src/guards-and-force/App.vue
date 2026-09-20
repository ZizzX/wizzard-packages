<script setup lang="ts">
import { provideWizard } from '@wizzard-packages/vue';

import Wizard from './Wizard.vue';
import { signup } from './flow';

provideWizard({ flow: signup });
</script>

<template>
  <Wizard />
</template>
