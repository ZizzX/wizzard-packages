# @wizzard-packages/adapter-yup

![npm](https://img.shields.io/npm/v/@wizzard-packages/adapter-yup)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/adapter-yup)
![license](https://img.shields.io/npm/l/@wizzard-packages/adapter-yup)

Yup validation adapter for Wizzard Stepper. Use it with @wizzard-packages/react or a custom UI on top of core.

## Install

```bash
pnpm add @wizzard-packages/adapter-yup yup
```

## Usage with React

```tsx
import { createWizardFactory } from '@wizzard-packages/react';
import { YupAdapter } from '@wizzard-packages/adapter-yup';
import * as yup from 'yup';

type Data = { name: string };

type StepId = 'name' | 'review';

const schema = yup.object({ name: yup.string().required() });

const { WizardProvider, createStep } = createWizardFactory<Data, StepId>();

const steps = [
  createStep({
    id: 'name',
    label: 'Name',
    component: NameStep,
    validationAdapter: new YupAdapter(schema),
  }),
];

export function App() {
  return <WizardProvider config={{ steps }} initialData={{ name: '' }} />;
}
```

## Fits in the stack

- Core engine: @wizzard-packages/core
- React bindings: @wizzard-packages/react
- Alternative validation: @wizzard-packages/adapter-zod

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs UI: https://zizzx.github.io/wizzard-packages/
