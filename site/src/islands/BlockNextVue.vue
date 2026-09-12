<script setup lang="ts">
import App from '@examples/tasks/src/block-next/App.vue';

import RestartableStage from '../components/RestartableStage.vue';
</script>

<!-- "Block Next until valid" on the Vue binding, mounted beside its source. -->
<template>
  <RestartableStage v-slot="{ attempt }">
    <App :key="attempt" />
  </RestartableStage>
</template>
