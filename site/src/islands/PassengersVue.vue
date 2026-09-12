<script setup lang="ts">
import App from '@examples/reference/src/passengers/App.vue';

import RestartableStage from '../components/RestartableStage.vue';
</script>

<!-- R-C on the Vue binding. The site owns the net; the example owns the application. -->
<template>
  <RestartableStage v-slot="{ attempt }">
    <App :key="attempt" />
  </RestartableStage>
</template>
