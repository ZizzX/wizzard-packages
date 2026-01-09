---
applyTo: '**'
---

---

## trigger: always_on

# Wizzard Stepper React - Library Usage Guide

## 🎯 Core Principles

This guide defines the **correct** way to use the `wizzard-stepper-react` library with full type safety and best practices.

---

## 📋 The Factory Pattern (Required)

**Always use `createWizardFactory` to create typed wizard instances.**

### Step 1: Define Your Schema

```typescript
// wizards/my-wizard.ts
export interface MyWizardSchema {
  name: string;
  email: string;
  age?: number;
}
```

### Step 2: Create Typed Hooks

```typescript
import { createWizardFactory } from 'wizzard-stepper-react';

export const {
  WizardProvider,
  useWizard,
  useWizardActions,
  useWizardSelector,
  useWizardValue,
  useWizardError,
  useWizardState,
  createStep,
} = createWizardFactory<MyWizardSchema>();
```

### Step 3: Import and Use

```tsx
import { useWizardSelector, useWizardActions } from '../wizards/my-wizard';
```

---

## 🔧 Hook Usage Rules

### ✅ DO: Use Specific Hooks for Specific Purposes

#### 1. **`useWizardSelector`** - For Reading State Data

Use when you need to access wizard data:

```tsx
// ✅ CORRECT - Full type safety
const products = useWizardSelector((state) => state.data.products);
const email = useWizardSelector((state) => state.data.email);

// ✅ CORRECT - Derived state
const totalPrice = useWizardSelector((state) =>
  state.data.items.reduce((sum, item) => sum + item.price, 0)
);
```

#### 2. **`useWizardActions`** - For Mutations

Use when you need to perform actions:

```tsx
// ✅ CORRECT
const { updateData, goToNextStep, goToPrevStep } = useWizardActions();

const handleSubmit = () => {
  updateData({ email: 'user@example.com' });
  goToNextStep();
};
```

#### 3. **`useWizardError`** - For Field Errors

Use when you need error for specific field:

```tsx
// ✅ CORRECT
const emailError = useWizardError('email');

return (
  <div>
    <input {...} />
    {emailError && <span>{emailError}</span>}
  </div>
);
```

#### 4. **`useWizardValue`** - For Single Field Values

Use when you only need one field value:

```tsx
// ✅ CORRECT - Optimized, doesn't re-render on other field changes
const name = useWizardValue('name');
```

#### 5. **`createStep`** - For Typed Step Definitions

Use factory-generated createStep for type-safe step configs:

```tsx
// ✅ CORRECT
const step1 = createStep({
  id: 'personal-info',
  label: 'Personal Info',
  // Full autocomplete and type checking!
});
```

---

## ❌ DON'T: Anti-Patterns to Avoid

### 1. Don't destructure wizardData from useWizard

```tsx
// ❌ WRONG - deprecated, will cause issues
const { wizardData } = useWizard();

// ✅ CORRECT
const { data } = useWizard();
// OR even better:
const products = useWizardSelector((state) => state.data.products);
```

### 2. Don't import from base library when using factory

```tsx
// ❌ WRONG - no type inference
import { useWizard, WizardProvider } from 'wizzard-stepper-react';

// ✅ CORRECT - typed hooks from factory
import { useWizard, WizardProvider } from '../wizards/my-wizard';
```

### 3. Don't access data.data or state.wizardData

```tsx
// ❌ WRONG - incorrect structure
const products = useWizardSelector((state) => state.wizardData?.products);

// ✅ CORRECT - state.data is the correct field
const products = useWizardSelector((state) => state.data.products);
```

### 4. Don't use Object.assign for nested updates

```tsx
// ❌ WRONG - causes selector staleness
const newData = { ...currentData };
Object.assign(newData, updates); // Shallow copy breaks reactivity!

// ✅ CORRECT - direct assignment
updateData({ products: [...products, newItem] });
```

---

## 📚 Complete Example

```tsx
// 1. Create wizard factory
// wizards/checkout-wizard.ts
export interface CheckoutSchema {
  items: Product[];
  shippingAddress: Address;
  paymentMethod: string;
}

export const {
  WizardProvider,
  useWizard,
  useWizardActions,
  useWizardSelector,
  useWizardError,
  createStep,
} = createWizardFactory<CheckoutSchema>();

// 2. Use in component
// components/CartStep.tsx
import { useWizardSelector, useWizardActions, useWizardError } from '../wizards/checkout-wizard';

const CartStep = () => {
  // ✅ Read data with selector
  const items = useWizardSelector((state) => state.data.items);

  // ✅ Get actions
  const { updateData } = useWizardActions();

  // ✅ Get field error
  const itemsError = useWizardError('items');

  // ✅ Update data
  const addItem = (item: Product) => {
    updateData({ items: [...items, item] });
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      {itemsError && <span className="error">{itemsError}</span>}
    </div>
  );
};
```

---

## 🎨 Type Safety Checklist

- ✅ Always define a schema interface
- ✅ Use `createWizardFactory<YourSchema>()` to generate typed hooks
- ✅ Import hooks from your wizard file, not from base library
- ✅ Use `state.data` (not `state.wizardData`) in selectors
- ✅ Use specific hooks for specific purposes
- ✅ Destructure `data` (not `wizardData`) from `useWizard()`

---

## 🐛 Common Issues & Solutions

| Issue           | Wrong                       | Correct                    |
| --------------- | --------------------------- | -------------------------- |
| Type errors     | `useWizard()` from base lib | Import from wizard factory |
| Stale selectors | `wizardData` in selector    | Use `data` field           |
| No autocomplete | Direct library import       | Use factory hooks          |
| Re-renders      | Full `useWizard()`          | Use `useWizardSelector`    |

---

## 📖 Further Reading

- [Factory Pattern Documentation](./FACTORY_PATTERN.md)
- [Performance Optimization](./OPTIMIZATION.md)
- [Migration Guide](./examples/demo/src/pages/docs/MigrationGuide.tsx)

---

**Remember:** The factory pattern exists to provide full TypeScript support and optimal performance. Always use it! 🚀

# wizzard-stepper-react 🧙‍♂️

[![npm version](https://img.shields.io/npm/v/wizzard-stepper-react.svg)](https://www.npmjs.com/package/wizzard-stepper-react)
[![license](https://img.shields.io/npm/l/wizzard-stepper-react.svg)](https://github.com/ZizzX/wizzard-stepper-react/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/wizzard-stepper-react)](https://bundlephobia.com/package/wizzard-stepper-react)

A flexible, headless, and strictly typed multi-step wizard library for React. Built with adapter patterns in mind to support any form library (React Hook Form, Formik, etc.) and any validation schema (Zod, Yup).

---

## 🚀 Quick Start (v2.0.0 Modern)

Version 2.0.0 introduces the **Factory Pattern**, providing 100% type safety and optimized performance out of the box.

### 1. Create your Wizard Kit

Define your data schema and generate typed hooks.

```typescript
// wizards/auth-wizard.ts
import { createWizardFactory } from 'wizzard-stepper-react';

interface AuthSchema {
  email: string;
  preferences: { theme: 'light' | 'dark' };
}

export const { WizardProvider, useWizard, useWizardValue, useWizardActions } =
  createWizardFactory<AuthSchema>();
```

### 2. Wrap your App

```tsx
import { WizardProvider } from './wizards/auth-wizard';

const App = () => (
  <WizardProvider>
    <MyWizardComponents />
  </WizardProvider>
);
```

### 3. Use Granular Hooks

```tsx
import { useWizardValue, useWizardActions } from './wizards/auth-wizard';

const EmailInput = () => {
  // ⚡ Atomic re-render: component only updates if 'email' changes
  const email = useWizardValue('email');
  const { setData } = useWizardActions();

  return <input value={email} onChange={(e) => setData('email', e.target.value)} />;
};
```

---

## ✨ Key Features

- 🧠 **Headless Architecture**: Full control over UI. You bring the components, we provide the logic.
- 💅 **Modern First**: Optimized for React 18 with selective rendering and external state store.
- 🔌 **Adapter Pattern**: Zero-dependency adapters for **Zod**, **Yup** validation.
- 🏗️ **Complex Data**: Built-in support for nested objects using dot notation (`user.address.zip`).
- 💾 **Advanced Persistence**: Auto-save to LocalStorage, SessionStorage, or Custom API adapters.
- 🛠️ **Developer Tools**: High-performance debugging overlay and **Redux DevTools** integration.

---

## 🏗️ Core Concepts

### Validation Adapters

We are library-agnostic. Use our pre-built adapters or write your own.

```tsx
import { ZodAdapter } from 'wizzard-stepper-react';
import { z } from 'zod';

const schema = z.object({ age: z.number().min(18) });
const adapter = new ZodAdapter(schema);

// In your config:
const step = { id: 'age', validationAdapter: adapter };
```

### Navigation Lifecycle

1. **Validation**: Current step is checked. Navigation stops if invalid.
2. **Resolution**: Next step conditions (dynamic branching) are evaluated.
3. **Guards**: `beforeLeave` hooks run (e.g., for "Unsaved Changes" modals).
4. **Commit**: State updates and navigation completes.

---

## 💾 State Persistence

Isolate your wizard data to prevent collisions when using multiple instances.

```typescript
import { LocalStorageAdapter } from 'wizzard-stepper-react';

const config = {
  persistence: {
    // 🛡️ Always use a unique prefix for isolation
    adapter: new LocalStorageAdapter('auth_wizard_v2'),
    mode: 'onStepChange',
  },
};
```

---

## 🛠️ Performance Tuning

| Hook               | Returns            | Re-renders  | Best For          |
| :----------------- | :----------------- | :---------- | :---------------- |
| `useWizardActions` | Navigation/Setters | **Zero**    | Buttons, Handlers |
| `useWizardValue`   | Specific Field     | **Atomic**  | Inputs, Labels    |
| `useWizardState`   | UI Meta (Progress) | **Minimal** | Progress Bars     |
| `useWizard`        | Everything         | **Full**    | Orchestration     |

---

## ⚠️ Legacy Support (v1.x)

If you are maintaining an older project, you can still use the classic Context-based provider. Note that this mode does not support the new performance-optimized hooks.

```tsx
import { WizardProvider, useWizard } from 'wizzard-stepper-react';

const OldApp = () => (
  <WizardProvider>
    <MyComponents />
  </WizardProvider>
);
```

For migration steps, see [MIGRATION.md](./MIGRATION.md).

---

## 📄 Documentation & Demos

- 🧪 **Enterprise Demo**: [Google-quality complex wizard implementation](https://ZizzX.github.io/wizzard-stepper-react/docs/introduction)
- 🚀 **NPMS**: [View on npm](https://www.npmjs.com/package/wizzard-stepper-react)

---

## License

MIT © [ZizzX](https://github.com/ZizzX)
