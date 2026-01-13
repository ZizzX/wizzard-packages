# @wizzard-packages/core

![npm](https://img.shields.io/npm/v/@wizzard-packages/core)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/core)
![license](https://img.shields.io/npm/l/@wizzard-packages/core)

Framework-agnostic wizard engine: state, actions, and types. Use this package to build your own UI layer or plug it into another framework.

## Why core

- Headless state store and typed actions
- Works in any UI (React, Vue, custom, CLI)
- Small surface area with predictable behavior

## Install

```bash
pnpm add @wizzard-packages/core
```

## Quickstart

```ts
import { WizardStore, type IWizardConfig } from '@wizzard-packages/core';

type Data = { name: string };

type StepId = 'name' | 'review';

const config: IWizardConfig<Data, StepId> = {
  steps: [
    { id: 'name', label: 'Name', component: null },
    { id: 'review', label: 'Review', component: null },
  ],
};

const store = new WizardStore<Data, StepId>({ name: '' });

store.dispatch({
  type: 'INIT',
  payload: { data: { name: '' }, config },
});
```

## Utilities

```ts
import { getByPath, setByPath } from '@wizzard-packages/core';

const data = { user: { name: 'Ada' } };
const name = getByPath(data, 'user.name');
const next = setByPath(data, 'user.name', 'Grace');
```

## Related packages

- @wizzard-packages/react - React provider + hooks on top of core
- @wizzard-packages/persistence - save/load wizard state
- @wizzard-packages/middleware - logger and devtools middleware
- @wizzard-packages/adapter-zod - validation with Zod
- @wizzard-packages/adapter-yup - validation with Yup
- @wizzard-packages/devtools - DevTools UI (React)

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs UI: https://zizzx.github.io/wizzard-packages/
