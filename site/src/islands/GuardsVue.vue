<script setup lang="ts">
import App from '@examples/tasks/src/guards-and-force/App.vue';

import RestartableStage from '../components/RestartableStage.vue';
</script>

<!-- "The three switches" on the Vue binding, mounted beside its source. -->
<template>
  <RestartableStage v-slot="{ attempt }">
    <App :key="attempt" />
  </RestartableStage>
</template>
