import { createWizard } from '@wizzard-packages/core';
import { persist } from '@wizzard-packages/plugins/persist';

export const wizard = createWizard({
  flow: {
    id: 'signup',
    order: ['name', 'plan'],
    steps: { name: {}, plan: {} },
  },
  plugins: [
    persist({
      key: 'signup',
      // sessionStorage for anything that should not outlive the tab. This
      // stores whatever the flow collects, so that choice is yours to make.
      storage: globalThis.sessionStorage,
      onRestore: (outcome) => {
        if (!outcome.restored) console.info('starting fresh:', outcome.reason);
      },
    }),
  ],
});
