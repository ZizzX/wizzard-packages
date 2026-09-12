<script setup lang="ts">
import App from '@examples/tasks/src/render-field-errors/App.vue';

import RestartableStage from '../components/RestartableStage.vue';
</script>

<!-- "Render field errors" on the Vue binding, mounted beside its source. -->
<template>
  <RestartableStage v-slot="{ attempt }">
    <App :key="attempt" />
  </RestartableStage>
</template>
