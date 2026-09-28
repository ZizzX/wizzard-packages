<script setup lang="ts">
import { groups } from '@wizzard-packages/core/groups';
import { persist } from '@wizzard-packages/plugins/persist';
import { provideWizard } from '@wizzard-packages/vue';
import { ref } from 'vue';

import Wizard from './Wizard.vue';
import { guest, registration } from '../07-plugin/flow';
import { registry } from '../07-plugin/registry';
import { trail } from '../07-plugin/trail';
import { storageKey } from './guests';

/**
 * The tutorial's wizard, rendered. `provideWizard` takes the options
 * `openWizard` passed to `createWizard` and builds the engine itself. It has to
 * run in a parent: `inject` reads the parent chain, so the component that
 * provides cannot also use the composables.
 */
const landed = ref<string[]>([]);

// In the browser only: a server has no storage to restore from.
const plugins =
  typeof window === 'undefined'
    ? []
    : [
        persist({ key: storageKey('vue'), version: 1 }),
        trail((step) => {
          landed.value = [...landed.value, step];
        }),
      ];

provideWizard({ flow: registration, registry, groups, subFlows: { guest }, plugins });
</script>

<template>
  <Wizard />
  <p>Landed on: {{ landed.length === 0 ? 'nothing yet' : landed.join(' → ') }}</p>
</template>
