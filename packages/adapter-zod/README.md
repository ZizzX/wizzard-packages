# @wizzard-packages/adapter-zod

![npm](https://img.shields.io/npm/v/@wizzard-packages/adapter-zod)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/adapter-zod)
![license](https://img.shields.io/npm/l/@wizzard-packages/adapter-zod)

Zod validation adapter for Wizzard Stepper. Pair it with @wizzard-packages/react or your own core-driven UI.

## Install

```bash
pnpm add @wizzard-packages/adapter-zod zod
```

## Usage with React

```tsx
import { createWizardFactory } from '@wizzard-packages/react';
import { ZodAdapter } from '@wizzard-packages/adapter-zod';
import { z } from 'zod';

type Data = { name: string };

type StepId = 'name' | 'review';

const schema = z.object({ name: z.string().min(1) });

const { WizardProvider, createStep } = createWizardFactory<Data, StepId>();

const steps = [
  createStep({
    id: 'name',
    label: 'Name',
    component: NameStep,
    validationAdapter: new ZodAdapter(schema),
  }),
];

export function App() {
  return <WizardProvider config={{ steps }} initialData={{ name: '' }} />;
}
```

## Fits in the stack

- Core engine: @wizzard-packages/core
- React bindings: @wizzard-packages/react
- Alternative validation: @wizzard-packages/adapter-yup

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs UI: https://zizzx.github.io/wizzard-packages/
