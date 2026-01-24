# Wizzard Stepper (scoped packages) 🧙‍♂️

[![npm version](https://img.shields.io/npm/v/@wizzard-packages/react.svg)](https://www.npmjs.com/package/@wizzard-packages/react)
[![license](https://img.shields.io/npm/l/@wizzard-packages/react.svg)](https://github.com/ZizzX/wizzard-packages/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@wizzard-packages/react)](https://bundlephobia.com/package/@wizzard-packages/react)

Headless, typed wizard engine for building multi-step flows with React, Vue, or any UI. The repo ships a core engine plus framework bindings, adapters, middleware, persistence, and devtools.

> Scoped packages are the primary distribution (`@wizzard-packages/*`) in the new repo (`wizzard-packages`). The legacy `wizzard-stepper-react` package is deprecated and stays on v2.x for critical fixes only.

---

## 📦 Packages at a glance

| Package | Purpose |
| --- | --- |
| `@wizzard-packages/core` | Framework-agnostic engine (state, actions, types) |
| `@wizzard-packages/react` | React provider + hooks built on core |
| `@wizzard-packages/vue` | Vue 3 composition API bindings |
| `@wizzard-packages/adapter-zod` | Zod validation adapter |
| `@wizzard-packages/adapter-yup` | Yup validation adapter |
| `@wizzard-packages/persistence` | LocalStorage and memory persistence |
| `@wizzard-packages/middleware` | Logger + Redux DevTools middleware |
| `@wizzard-packages/devtools` | DevTools UI for inspection |

For detailed docs and usage, see each package README in `packages/*`.

---

## 🎮 Interactive Playground

Try the library in the browser with these standalone templates on StackBlitz:

| Example | Template |
| :-- | :-- |
| **Basic** | [![Open](https://img.shields.io/badge/Open_in_StackBlitz-blue?logo=stackblitz)](https://stackblitz.com/github/ZizzX/wizzard-packages/tree/main/.stackblitz/basic) |
| **Validation** | [![Open](https://img.shields.io/badge/Open_in_StackBlitz-red?logo=stackblitz)](https://stackblitz.com/github/ZizzX/wizzard-packages/tree/main/.stackblitz/validation) |
| **Persistence** | [![Open](https://img.shields.io/badge/Open_in_StackBlitz-green?logo=stackblitz)](https://stackblitz.com/github/ZizzX/wizzard-packages/tree/main/.stackblitz/persistence) |

---

## 🎨 UI Integrations

Wizzard is headless, which means you can use it with **any** UI library. We provide detailed examples and "connector factories" for popular design systems:

- **[Shadcn/UI Connector](./examples/shadcn-ui-connector)**: Full example of integrating with shadcn/ui using the Factory Pattern to generate typed `WizardField` and `WizardStep` components that look and feel native to your app.

---

## 🚀 Quick Start

### Option A: React bindings

```tsx
import { createWizardFactory } from '@wizzard-packages/react';

type Data = { name: string };
type StepId = 'name' | 'review';

const { WizardProvider, createStep, useWizardActions } =
  createWizardFactory<Data, StepId>();

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
  return <button onClick={goToNextStep}>Next</button>;
}
```

Context-free (no React Context) usage:

```tsx
import { createWizardStore, createWizardHooks } from '@wizzard-packages/react';

type Data = { name: string };
type StepId = 'name' | 'review';

const { store, actions } = createWizardStore<Data, StepId>({
  config: { steps },
  initialData: { name: '' },
  initialStepId: 'name',
});

const { useWizardState } = createWizardHooks(store);

function WizardUI() {
  const { currentStepId } = useWizardState();
  return <button onClick={actions.goToNextStep}>Next ({currentStepId})</button>;
}
```

Optional add-ons:

```bash
pnpm add @wizzard-packages/persistence @wizzard-packages/middleware
pnpm add @wizzard-packages/adapter-zod zod
pnpm add @wizzard-packages/adapter-yup yup
```

### Option B: Vue 3 bindings (Script Setup)

```ts
// 1. Create factory (wizard.ts)
import { createWizardFactory } from '@wizzard-packages/vue';

type Data = { name: string };
type StepId = 'name' | 'review';

export const { useProvideWizard, useWizardActions } = createWizardFactory<Data, StepId>();
```

```vue
<!-- 2. Usage (App.vue) -->
<script setup lang="ts">
import { useProvideWizard, useWizardActions } from './wizard';

useProvideWizard({
  config: {
    steps: [
      { id: 'name', label: 'Name' },
      { id: 'review', label: 'Review' },
    ]
  },
  initialData: { name: '' },
  initialStepId: 'name',
});

const { goToNextStep } = useWizardActions();
</script>

<template>
  <button @click="goToNextStep">Next</button>
</template>
```

### Option C: Headless core only

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

---

## ✨ Key Features

- 🧠 Headless architecture: bring your own UI
- ⚡ Typed factory and granular hooks for performance
- 🔌 Validation adapters for Zod/Yup
- 💾 Persistence adapters for localStorage/memory
- 🛠️ Middleware + Redux DevTools integration

---

## 🧭 How the stack fits together

Typical React setup:

```
@wizzard-packages/react
  ├─ @wizzard-packages/core
  ├─ @wizzard-packages/persistence (optional)
  ├─ @wizzard-packages/middleware (optional)
  ├─ @wizzard-packages/adapter-zod or adapter-yup (optional)
  └─ @wizzard-packages/devtools (optional)
```

Core-only setup:

```
@wizzard-packages/core
  └─ Your UI layer (React/Vue/custom)
```

---

## 📄 Documentation & Demos

- Docs UI: https://zizzx.github.io/wizzard-packages/
- API Reference: `docs/API_REFERENCE.md`
- E2E Testing: `e2e/README.md`
- Local StackBlitz templates: `.stackblitz/README.md`
- Context-free React usage: `packages/react/README.md`

---

## 📦 Release Strategy

- Scoped packages (`@wizzard-packages/*`) are versioned in lockstep starting at `0.1.0`.
- Releases are cut from `main` with git tags `vX.Y.Z` and GitHub releases.
- Pre-releases use `-next.N` and publish with npm dist-tag `next`.
- Versioning is managed via Changesets with a fixed group for all `@wizzard-packages/*` packages.
- Legacy `wizzard-stepper-react` stays on v2.x for critical fixes only.
- CI publishes the same versions to GitHub Packages for repo sidebar visibility.
- Full release steps: `docs/RELEASE.md`.

## 🌿 Development Workflow

- Work lands in `dev` first; CI validates `dev` and `main`.
- Promote `dev` to `main` when ready to release.
- Publishing runs from `main` only.

See `docs/DEV_WORKFLOW.md` for the full flow.

---

## License

MIT © [ZizzX](https://github.com/ZizzX)
