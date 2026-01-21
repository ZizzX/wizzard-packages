<script setup lang="ts" generic="TData extends Record<string, any>, TStepId extends string">
import { provide, defineProps } from 'vue';

interface Props {
  factory: any;
  config: any;
  initialData: TData;
}

const props = defineProps<Props>();

const { useProvideWizard } = props.factory;
useProvideWizard({
  config: props.config,
  initialData: props.initialData,
});
</script>

<template>
  <slot />
</template>
