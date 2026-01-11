# @wizzard-packages/core

Headless wizard state store, types, and utilities. Use this package if you need
the core logic without React.

## Install

```bash
pnpm add @wizzard-packages/core
```

## Usage

```ts
import { WizardStore, type IWizardConfig } from '@wizzard-packages/core';

type Data = { name: string };
type StepId = 'name' | 'review';

const steps = [
  { id: 'name', label: 'Name', component: null },
  { id: 'review', label: 'Review', component: null },
];

const config: IWizardConfig<Data, StepId> = { steps };
const store = new WizardStore<Data, StepId>({ name: '' });

store.dispatch({
  type: 'INIT',
  payload: { data: { name: '' }, config },
});
```

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs: https://github.com/ZizzX/wizzard-packages#readme
