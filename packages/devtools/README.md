# @wizzard-packages/devtools

![npm](https://img.shields.io/npm/v/@wizzard-packages/devtools)
![license](https://img.shields.io/npm/l/@wizzard-packages/devtools)

A docked panel that answers one question: why is the wizard where it is. It draws the flow it
is standing in, the state it committed, and what it did to get there — including the moves it
refused, which change no state and are therefore invisible to everything else.

## Install

```bash
pnpm add -D @wizzard-packages/devtools@canary
```

The panel imports `@wizzard-packages/react`, an optional peer, so install the React binding
beside it.

## Use

<!-- example:quickstart-devtools -->

<!-- prettier-ignore -->
```tsx
import { createWizard } from '@wizzard-packages/core';
import { WizardProvider } from '@wizzard-packages/react';
import { WizardDevtools, devtools } from '@wizzard-packages/devtools';

import { signup } from './flow';
import { Wizard } from './App';

/**
 * The panel, wired the way the documentation's three steps describe it.
 *
 * Two things are easy to get wrong and both are here: the same `devtools()`
 * object goes to `createWizard` and to the panel - two instances leave the
 * refusal rows empty - and the container has a height, because the panel is
 * docked and fills what it is given rather than floating over the page.
 */
const dt = devtools();
const wizard = createWizard({ flow: signup, plugins: [dt] });

export function App(): React.ReactNode {
  return (
    <WizardProvider wizard={wizard}>
      <Wizard />
      <div style={{ height: 360 }}>
        <WizardDevtools plugin={dt} />
      </div>
    </WizardProvider>
  );
}
```

<!-- /example -->

Two things are easy to get wrong. The same `devtools()` object goes to `createWizard` and to
the panel — two instances leave the refusal rows empty, and the panel says so. And the
container needs a height: the panel is docked and fills what it is given. Gate the render
yourself to keep it out of production; there is no URL flag and no floating button.

Outside React, `@wizzard-packages/devtools/headless` records the same session bundle the
panel's Record button writes, with no DOM: a Node test, a Vue host or a CI run can attach one
to a bug report.

## Supported

Node 20.11+, TypeScript 5+. ESM and CJS, types for both. `@wizzard-packages/core` 1.x is a peer
dependency. `@wizzard-packages/react` 1.x and React 18+ are optional peers: the panel needs them,
the headless entry does not.

## Documentation

[Devtools](https://zizzx.github.io/wizzard-packages/docs/devtools/) covers the three views, the props, recording, redaction and
keeping it out of production. Coming from the 2.x panel: [the migration guide](https://github.com/ZizzX/wizzard-packages/blob/main/docs/MIGRATION.md).

## License

MIT
