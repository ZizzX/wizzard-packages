# @wizzard-packages/react

![npm](https://img.shields.io/npm/v/@wizzard-packages/react)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/react)
![license](https://img.shields.io/npm/l/@wizzard-packages/react)

React bindings for Wizzard Stepper: provider, hooks, and typed factory built on top of @wizzard-packages/core.

## Install

```bash
pnpm add @wizzard-packages/react
```

Optional add-ons:

```bash
pnpm add @wizzard-packages/persistence @wizzard-packages/middleware
pnpm add @wizzard-packages/adapter-zod zod
pnpm add @wizzard-packages/adapter-yup yup
```

## Quickstart

```tsx
import { createWizardFactory } from '@wizzard-packages/react';

type Data = { name: string };

type StepId = 'name' | 'review';

const {
  WizardProvider,
  createStep,
  useWizardActions,
  useWizardState,
} = createWizardFactory<Data, StepId>();

const steps = [
  createStep({ id: 'name', label: 'Name', component: NameStep }),
  createStep({ id: 'review', label: 'Review', component: ReviewStep }),
];

export function App() {
  return (
    <WizardProvider config={{ steps }} initialData={{ name: '' }}>
      <WizardUI />
    </WizardProvider>
  );
}

function WizardUI() {
  const { goToNextStep } = useWizardActions();
  const { currentStepId } = useWizardState();

  return (
    <button onClick={goToNextStep}>Next ({currentStepId})</button>
  );
}
```

## How it fits

- Core engine: @wizzard-packages/core
- Optional persistence: @wizzard-packages/persistence
- Optional middleware: @wizzard-packages/middleware
- Optional validation: @wizzard-packages/adapter-zod or @wizzard-packages/adapter-yup

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs UI: https://zizzx.github.io/wizzard-packages/
