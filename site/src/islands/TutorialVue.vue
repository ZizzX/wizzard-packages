<script setup lang="ts">
import App from '@examples/tasks/src/tutorial/finish/App.vue';

import RestartableStage from '../components/RestartableStage.vue';
</script>

<!-- The tutorial's finished wizard on the Vue binding, mounted beside its source. -->
<template>
  <RestartableStage v-slot="{ attempt }">
    <App :key="attempt" />
  </RestartableStage>
</template>
