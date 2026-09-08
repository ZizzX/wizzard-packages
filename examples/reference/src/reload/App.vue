<script setup lang="ts">
import { persist, type RestoreOutcome } from '@wizzard-packages/plugins/persist';
import { provideWizard } from '@wizzard-packages/vue/v1';

import Reload from './Reload.vue';
import { APP_VERSION, STORAGE_KEY, reload } from './flow';
import { registry } from './registry';

/**
 * The plugin is installed in the browser only, and what it restored is shown
 * one tick after mount by the child. A restored session differs from the empty
 * first step the server rendered, so painting it on the first client frame
 * would be correcting the server's markup.
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

provideWizard({ flow: reload, registry, plugins });
</script>

<template>
  <Reload :restored="restored" />
</template>
