<script setup lang="ts">
import App from '@examples/tasks/src/clear-branch-data/App.vue';

import RestartableStage from '../components/RestartableStage.vue';
</script>

<!-- "Clear abandoned branch data" on the Vue binding, mounted beside its source. -->
<template>
  <RestartableStage v-slot="{ attempt }">
    <App :key="attempt" />
  </RestartableStage>
</template>
