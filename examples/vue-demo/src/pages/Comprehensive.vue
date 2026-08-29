<script setup lang="ts">
import WizardDemo from '../WizardDemo.vue';
import { initialData, wizardConfig, wizardFactory } from '../wizardSetup';

const { useProvideWizard } = wizardFactory;

useProvideWizard({
  config: wizardConfig,
  initialData,
});
</script>

<template>
  <WizardDemo />
</template>
