<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';

/**
 * The net under a live example, on the Vue binding. The counterpart of
 * `restartable` in `StageBoundary.tsx`.
 *
 * The boundary and the remount key live here rather than in the example,
 * because a reader copying an application out of the examples is copying an
 * application, not a page that has to survive a stranger's browser.
 *
 * `onErrorCaptured` returning false stops the error propagating to the app
 * root, which is Vue's equivalent of React's error boundary. Bumping `attempt`
 * remounts the child, which is what starting the example again means; the slot
 * receives it so the caller can key its own component on it.
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

  <slot v-else :attempt="attempt" />
</template>
