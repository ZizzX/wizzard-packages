# @wizzard-packages/plugins

![npm](https://img.shields.io/npm/v/@wizzard-packages/plugins)
![license](https://img.shields.io/npm/l/@wizzard-packages/plugins)

Plugins for [Wizzard](https://github.com/ZizzX/wizzard-packages) flows. One entry per concern,
so a flow that persists nothing carries none of the code that would.

## Install

<!-- example:install-plugins -->

<!-- prettier-ignore -->
```bash
pnpm add @wizzard-packages/core@canary @wizzard-packages/plugins@canary
```

<!-- /example -->

## `/persist`

Keeps a wizard across a reload.

<!-- example:persist -->

<!-- prettier-ignore -->
```ts
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
```

<!-- /example -->

What is read back is validated before it is installed: a snapshot from another flow, from an
older version of it, or naming a step that no longer exists is refused with a reason. The
plugin never throws; a storage failure warns once and the wizard carries on.

A wizard that reached the end is stored with `done: true` and comes back finished, with
`status: 'done'` on its last step: `start()` leaves it there and that step's `load` does not run
again. A session stored before `done` existed comes back unfinished, `idle` on its last step.

## Supported

Node 20.11+, TypeScript 5+. ESM and CJS, types for both. No peer dependencies.
`@wizzard-packages/core` is a dependency, installed beside it above so your own code can import
the engine.

## Documentation

[Persistence](https://zizzx.github.io/wizzard-packages/docs/persistence/) covers the options, the refusal reasons and `onRestore`;
[Restore after reload](https://zizzx.github.io/wizzard-packages/docs/restore-after-reload/) is a working page.

## License

MIT
