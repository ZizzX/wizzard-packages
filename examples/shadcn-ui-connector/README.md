# Shadcn/UI Connector Example

This project demonstrates how to integrate **@wizzard-packages/react** with **[shadcn/ui](https://ui.shadcn.com/)** to create a reusable, strictly-typed Wizard Factory.

Instead of manually wiring up state and UI for every wizard, we use the **Factory Pattern** to generate a set of components (`WizardField`, `WizardStep`, `WizardStepper`) that are already bound to your specific data schema and UI library.

## 🚀 Features

- **Schema-First**: Define your data with Zod, and everything else (hooks, props, validation) is inferred.
- **Headless Logic**: Uses `@wizzard-packages/react` for state management, navigation, and validation.
- **Beautiful UI**: Uses `shadcn/ui` (Tailwind CSS) for accessibility and styling.
- **Type-Safe**: `WizardField` only accepts valid paths (e.g., `personal.firstName`) and inferred value types.

## 📦 Architecture

The core of this example is in `src/connector/factory.tsx`.

```tsx
// 1. Define your schema
type MySchema = { ... };

// 2. Create your custom factory
const {
  WizardProvider,
  WizardStep,
  WizardField,
  useWizardValue
} = createShadcnWizard<MySchema>();

// 3. Build your wizard with auto-complete and type checks
<WizardProvider ...>
  <WizardStep stepId="step1">
    <WizardField path="firstName" label="First Name">
      {({ value, onChange }) => <Input value={value} onChange={onChange} />}
    </WizardField>
  </WizardStep>
</WizardProvider>
```

### Alternative: Headless Core Only

If you need to manage state outside of React (e.g., in a vanilla JS context or service layer), you can use the core engine directly:

```ts
import { WizardStore, type IWizardConfig } from '@wizzard-packages/core';

type Data = { name: string };
type StepId = 'name' | 'review';

const config: IWizardConfig<Data, StepId> = {
  steps: [
    { id: 'name', label: 'Name' },
    { id: 'review', label: 'Review' },
  ],
};

const store = new WizardStore<Data, StepId>({ name: '' });

store.dispatch({
  type: 'INIT',
  payload: { data: { name: '' }, config },
});
```

## 🛠️ Setup & Run

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   pnpm dev
   ```

3. **Build for production**:
   ```bash
   pnpm build
   ```

## 📂 Project Structure

- `src/connector/factory.tsx`: The "Bridge" between Wizzard and Shadcn. This is the reusable piece you would copy to your own project.
- `src/components/ui/`: Standard Shadcn components (Button, Input, Card, etc.).
- `src/App.tsx`: Implementation of a specific multi-step form using the factory.