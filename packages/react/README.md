# @wizzard-packages/react

React bindings for Wizzard Stepper: provider, hooks, and typed factory.

## Install

```bash
pnpm add @wizzard-packages/react
```

## Usage

```tsx
import React from 'react';
import { createWizardFactory } from '@wizzard-packages/react';

type Data = { name: string };
type StepId = 'name' | 'review';

const { WizardProvider, createStep, useWizardActions } =
  createWizardFactory<Data, StepId>();

const steps = [
  createStep({ id: 'name', label: 'Name', component: NameStep }),
  createStep({ id: 'review', label: 'Review', component: ReviewStep }),
];

const config = { steps, navigationMode: 'visited' };

export function App() {
  return (
    <WizardProvider config={config} initialData={{ name: '' }}>
      <WizardUI />
    </WizardProvider>
  );
}

function WizardUI() {
  const { goToNextStep } = useWizardActions();
  return <button onClick={goToNextStep}>Next</button>;
}
```

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs: https://github.com/ZizzX/wizzard-packages#readme
