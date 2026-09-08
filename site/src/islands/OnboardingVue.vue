<script setup lang="ts">
import App from '@examples/reference/src/onboarding/App.vue';
import { onErrorCaptured, ref } from 'vue';

/**
 * R-A on the Vue binding, mounted. The counterpart of `OnboardingReact.tsx`:
 * the site owns the net, the example owns the application.
 *
 * `onErrorCaptured` returning false stops the error propagating to the app
 * root, which is Vue's equivalent of React's error boundary. Bumping `attempt`
 * remounts the child, which is what starting the example again means.
 */
const failure = ref<string | null>(null);
const attempt = ref(0);

onErrorCaptured((error) => {
  failure.value = error instanceof Error ? error.message : String(error);
  console.error('[example] the application stopped', error);
  return false;
});

function restart(): void {
  failure.value = null;
  attempt.value += 1;
}
</script>

<template>
  <div v-if="failure !== null" class="stage-failed" role="alert">
    <p>This example stopped.</p>
    <p class="stage-failed-why">
      {{ failure }}
    </p>
    <p>
      The page around it is fine, and so is the flow definition below. Start the example again, or
      open an issue with what you had typed.
    </p>
    <button class="button button-secondary" type="button" @click="restart">Restart example</button>
  </div>

  <App v-else :key="attempt" />
</template>
