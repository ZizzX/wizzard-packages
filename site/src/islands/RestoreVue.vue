<script setup lang="ts">
import App from '@examples/tasks/src/restore-after-reload/App.vue';

import RestartableStage from '../components/RestartableStage.vue';
</script>

<!-- "Restore after reload" on the Vue binding, mounted beside its source. -->
<template>
  <RestartableStage v-slot="{ attempt }">
    <App :key="attempt" />
  </RestartableStage>
</template>
