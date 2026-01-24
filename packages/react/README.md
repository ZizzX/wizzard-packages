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
    <WizardProvider
      config={{ steps }}
      initialData={{ name: '' }}
      initialStepId="name"
    >
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

## 🎨 UI Integrations (Shadcn, Mantine, MUI)

Since `@wizzard-packages/react` is headless, you are expected to bring your own UI components. We provide "Connector" examples that demonstrate how to bind popular design systems to the wizard engine using the Factory Pattern.

- **[Shadcn/UI Connector Example](../../examples/shadcn-ui-connector)**: Demonstrates how to create a `createShadcnWizard` factory that generates strongly-typed `WizardField`, `WizardStep`, and `WizardStepper` components pre-styled with Tailwind and Shadcn.

## Best practices (DX)

- Memoize `steps` and `config` (`useMemo`) to avoid unnecessary recalculations.
- Prefer granular hooks (`useWizardValue`, `useWizardSelector`, `useWizardMeta`) over `useWizardContext` for performance.
- For form fields, use `useWizardField(path)` to get `[value, setValue]` without extra boilerplate.
- SSR is supported via `useSyncExternalStore`. Avoid persistence adapters that touch `window` during module init.

## Context-free store (without Provider)

If you need store access without React Context (common in large codebases), the API surface is the same.
You get the same `actions` as `useWizardActions`, and the hooks mirror `useWizardState`,
`useWizardValue`, and `useWizardSelector`.

```tsx
import { createWizardStore, createWizardHooks } from '@wizzard-packages/react';

type Data = { name: string };
type StepId = 'name' | 'review';

const steps = [
  { id: 'name', label: 'Name', component: NameStep },
  { id: 'review', label: 'Review', component: ReviewStep },
];

const { store, actions } = createWizardStore<Data, StepId>({
  config: { steps },
  initialData: { name: '' },
  initialStepId: 'name',
});

const { useWizardState, useWizardValue, useWizardField } = createWizardHooks(store, actions);

function WizardUI() {
  const state = useWizardState();
  const name = useWizardValue('name');
  const [nameField, setNameField] = useWizardField('name');

  return (
    <button onClick={actions.goToNextStep}>
      Next ({state.currentStepId}) {name} {nameField}
    </button>
  );
}
```

### Example: selector + derived UI

```tsx
const { useWizardSelector } = createWizardHooks(store, actions);

function Progress() {
  const { progress, isBusy } = useWizardSelector((s) => ({
    progress: s.progress,
    isBusy: s.isBusy,
  }));

  return <div>Progress: {progress}% {isBusy ? '...' : ''}</div>;
}
```

### Example: actions outside React (service layer)

```ts
// services/wizardActions.ts
export const wizard = createWizardStore<Data, StepId>({
  config: { steps },
  initialData: { name: '' },
  initialStepId: 'name',
});

export const wizardActions = wizard.actions;
```

```tsx
import { wizardActions } from './services/wizardActions';

function Footer() {
  return (
    <>
      <button onClick={wizardActions.goToPrevStep}>Back</button>
      <button onClick={wizardActions.goToNextStep}>Next</button>
    </>
  );
}
```

### Example: multiple stores (independent wizards)

```tsx
const wizardA = createWizardStore<DataA, StepIdA>({ config: { steps: stepsA } });
const wizardB = createWizardStore<DataB, StepIdB>({ config: { steps: stepsB } });

const hooksA = createWizardHooks(wizardA.store);
const hooksB = createWizardHooks(wizardB.store);

function DualWizard() {
  const stepA = hooksA.useWizardState().currentStepId;
  const stepB = hooksB.useWizardState().currentStepId;

  return (
    <div>
      <div>Wizard A: {stepA}</div>
      <div>Wizard B: {stepB}</div>
    </div>
  );
}
```

### Example: SSR-friendly initialization

```tsx
// create store outside render to keep it stable across SSR/CSR.
const wizard = createWizardStore<Data, StepId>({
  config: { steps },
  initialData: { name: '' },
  initialStepId: 'name',
});

const hooks = createWizardHooks(wizard.store);

function WizardApp() {
  const { currentStepId } = hooks.useWizardState();
  return <div>Current step: {currentStepId}</div>;
}
```

### Example: integration with external state manager

```ts
// Example using a simple external event bus pattern.
type Listener = () => void;
const listeners = new Set<Listener>();

wizard.store.subscribe(() => {
  listeners.forEach((listener) => listener());
});

export const wizardStateStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return wizard.store.getSnapshot();
  },
};
```

```tsx
import { useSyncExternalStore } from 'react';

function WizardBadge() {
  const snapshot = useSyncExternalStore(
    wizardStateStore.subscribe,
    wizardStateStore.getSnapshot,
    wizardStateStore.getSnapshot
  );

  return <span>{snapshot.currentStepId}</span>;
}
```

### Example: Zustand integration

```ts
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

type WizardSnapshot = ReturnType<typeof wizard.store.getSnapshot>;

export const useWizardSnapshot = create<{ snapshot: WizardSnapshot }>(() => ({
  snapshot: wizard.store.getSnapshot(),
}));

wizard.store.subscribe(() => {
  useWizardSnapshot.setState({ snapshot: wizard.store.getSnapshot() });
});
```

```tsx
function WizardStatus() {
  const { currentStepId, progress } = useWizardSnapshot(
    (s) => ({
      currentStepId: s.snapshot.currentStepId,
      progress: s.snapshot.progress,
    }),
    shallow
  );

  return (
    <div>
      Step: {currentStepId} ({progress}%)
    </div>
  );
}
```

### Example: Redux integration

```ts
// Store current snapshot in Redux when the wizard updates.
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

const wizardSlice = createSlice({
  name: 'wizard',
  initialState: { snapshot: wizard.store.getSnapshot() },
  reducers: {
    setSnapshot(state, action) {
      state.snapshot = action.payload;
    },
  },
});

export const { setSnapshot } = wizardSlice.actions;
export const store = configureStore({ reducer: { wizard: wizardSlice.reducer } });

wizard.store.subscribe(() => {
  store.dispatch(setSnapshot(wizard.store.getSnapshot()));
});

export const selectWizardSnapshot = (state) => state.wizard.snapshot;
export const selectWizardProgress = createSelector(
  [selectWizardSnapshot],
  (snapshot) => ({
    currentStepId: snapshot.currentStepId,
    progress: snapshot.progress,
    isBusy: snapshot.isBusy,
  })
);
```

```tsx
import { useSelector } from 'react-redux';

function WizardReduxStatus() {
  const { currentStepId, progress, isBusy } = useSelector(selectWizardProgress);
  return (
    <div>
      Step: {currentStepId} ({progress}%) {isBusy ? '...' : ''}
    </div>
  );
}
```

### Example: memoized config + middleware pipeline

```tsx
import { useMemo } from 'react';
import { loggerMiddleware } from '@wizzard-packages/middleware';

function WizardRoot() {
  const steps = useMemo(
    () => [
      { id: 'name', label: 'Name', component: NameStep },
      { id: 'review', label: 'Review', component: ReviewStep },
    ],
    []
  );

  const config = useMemo(
    () => ({
      steps,
      middlewares: [loggerMiddleware],
      validationMode: 'onChange',
      validationDebounceTime: 250,
    }),
    [steps]
  );

  return (
    <WizardProvider config={config} initialData={{ name: '' }} initialStepId="name">
      <WizardUI />
    </WizardProvider>
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
