<script setup lang="ts">
import { initialData, wizardConfig, wizardFactory } from '../wizardSetup';
import WizardDemo from '../WizardDemo.vue';

const { useProvideWizard } = wizardFactory;

useProvideWizard({
  config: wizardConfig,
  initialData,
});
</script>

<template>
  <WizardDemo />
</template>
