<script setup lang="ts">
import { persist, type RestoreOutcome } from '@wizzard-packages/plugins/persist';
import { provideWizard } from '@wizzard-packages/vue/v1';

import Wizard from './Wizard.vue';
import { APP_VERSION, STORAGE_KEY, signup } from './flow';

/**
 * The plugin is installed in the browser only: on a server there is no storage
 * to read, and a session restored into the server's markup is a hydration
 * mismatch waiting to happen. What it restored is shown by the child, one tick
 * after mount, for the same reason.
 */
const restored: { outcome: RestoreOutcome | null } = { outcome: null };

const plugins =
  typeof window === 'undefined'
    ? []
    : [
        persist({
          key: STORAGE_KEY,
          version: APP_VERSION,
          onRestore: (outcome) => {
            restored.outcome = outcome;
          },
        }),
      ];

provideWizard({ flow: signup, plugins });
</script>

<template>
  <Wizard :restored="restored" />
</template>
