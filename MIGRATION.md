# Migration Guide

## Migrating to scoped packages (@wizzard-packages/*)

The modern distribution is now split into scoped packages. The legacy `wizzard-stepper-react` package stays on v2.x and will be deprecated after the scoped packages ship.

### Install

```bash
pnpm add @wizzard-packages/react @wizzard-packages/core
pnpm add @wizzard-packages/adapter-zod @wizzard-packages/adapter-yup @wizzard-packages/persistence @wizzard-packages/middleware
```

### Import mapping (common cases)

```diff
- import { createWizardFactory } from 'wizzard-stepper-react';
+ import { createWizardFactory } from '@wizzard-packages/react';

- import { ZodAdapter } from 'wizzard-stepper-react';
+ import { ZodAdapter } from '@wizzard-packages/adapter-zod';

- import { YupAdapter } from 'wizzard-stepper-react';
+ import { YupAdapter } from '@wizzard-packages/adapter-yup';

- import { LocalStorageAdapter } from 'wizzard-stepper-react';
+ import { LocalStorageAdapter } from '@wizzard-packages/persistence';
```

### Middleware imports

```diff
- import { loggerMiddleware, devToolsMiddleware } from 'wizzard-stepper-react';
+ import { loggerMiddleware, devToolsMiddleware } from '@wizzard-packages/middleware';
```

### Core types

```diff
- import type { IWizardConfig, IWizardState } from 'wizzard-stepper-react';
+ import type { IWizardConfig, IWizardState } from '@wizzard-packages/core';
```

---

## Upgrading to v1.8.0 (Internal Refactoring & Analytics)

This version introduces internal refactoring to clarify the distinction between the Wizard Handle and the underlying Store, along with standardized analytics.

### 1. Renaming `IWizardStore` to `IWizardHandle` [BREAKING IF TYPED]

If you were explicitly importing and using the `IWizardStore` type from `wizzard-stepper-react` (usually when passing the whole wizard object as a prop), you must rename it to `IWizardHandle`.

```diff
- import { IWizardStore } from 'wizzard-stepper-react';
+ import { IWizardHandle } from 'wizzard-stepper-react';

- function MyComponent({ wizard }: { wizard: IWizardStore }) { ... }
+ function MyComponent({ wizard }: { wizard: IWizardHandle }) { ... }
```

> [!NOTE]
> The name `IWizardStore` is now used for the internal store class interface.

### 2. Signature changes for `condition` and `beforeLeave` [BREAKING]

The callback signatures have been updated to provide easier access to the wizard's global state and errors.

**Old signature:**
`condition?: (data: T) => boolean`
`beforeLeave?: (data: T, direction: StepDirection) => boolean`

**New signature:**
`condition?: (data: T, metadata: StepMetadata<T, StepId>) => boolean`
`beforeLeave?: (data: T, direction: StepDirection, metadata: StepMetadata<T, StepId>) => boolean`

**Migration example:**

```diff
- condition: (data) => data.age > 18,
+ condition: (data, { wizardData }) => wizardData.age > 18,
```

### 3. Analytics standardisation

The `analytics.onEvent` setting is now strictly typed. If you were using a generic `(name: string, payload: any)` handler, it will still work but you can now benefit from autocomplete.

---

## Upgrading to v2.0 (Strict Typing)

We have introduced a **Factory Pattern** to provide 100% type safety. While the classic usage still works, we strongly recommend migrating to the factory pattern for better developer experience.

### 1. Classic Usage (No Change Required)

Your existing code will continue to work. `useWizard` now defaults to `any` instead of `unknown`, ensuring no immediate breakages.

```tsx
// This still works!
const { wizardData } = useWizard(); // wizardData is any
```

### 2. Migrating to Factory Pattern (Recommended)

To get full type inference and autocomplete, move your wizard creation to a shared factory file.

#### Step 1: Create a Wizard Definition

Create a file (e.g., `src/wizards/my-wizard.ts`) and define your schema.

```typescript
import { createWizardFactory } from 'wizzard-stepper-react';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string(),
  age: z.number(),
});

export type MySchema = z.infer<typeof schema>;

// 🪄 Create the factory
export const { WizardProvider, useWizard, useWizardValue, createStep } =
  createWizardFactory<MySchema>();
```

#### Step 2: Update Your Components

Replace imports from `wizzard-stepper-react` with imports from your new file.

```diff
- import { useWizard } from 'wizzard-stepper-react';
+ import { useWizard } from '../wizards/my-wizard';

const Step1 = () => {
- const { wizardData } = useWizard<MySchema>(); // Manual generic
+ const { wizardData } = useWizard(); // 🪄 Automatically typed!

  // TypeScript knows this is a string
  console.log(wizardData.firstName);
}
```

### 3. Updating Validation Adapters

If you implemented custom validation adapters, update `validate(data: T)` to `validate(data: unknown)`.

```typescript
class MyValidator implements IValidatorAdapter<MySchema> {
- validate(data: MySchema) {
+ validate(data: unknown) {
+   const typedData = data as MySchema; // Cast internally
    // ... validate typedData
  }
}
```

