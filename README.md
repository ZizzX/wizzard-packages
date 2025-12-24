# wizzard-stepper-react 🧙‍♂️

A flexible, headless, and strictly typed multi-step wizard library for React. Built with adapter patterns in mind to support any form library (React Hook Form, Formik, etc.) and any validation schema (Zod, Yup).

## Features

- 🧠 **Headless Architecture**: Full control over UI. You bring the components, we provide the logic.
- 🔌 **Adapter Pattern**: Zero-dependency adapters for **Zod**, **Yup** validation. No hard dependencies on these libraries in the core.
- 🏗️ **Complex Data**: Built-in support for nested objects and arrays using dot notation (`users[0].name`).
- 🛡️ **Strictly Typed**: Built with TypeScript generics for type safety across steps.
- 🔀 **Conditional Steps**: Dynamic pipelines where steps can be skipped based on data.
- 💾 **Persistence**: Auto-save progress to LocalStorage or custom stores.
- ⚡ **Auto Validation**: Block navigation until the step is valid.

## Installation

```bash
npm install wizzard-stepper-react
# or
yarn add wizzard-stepper-react
# or
pnpm add wizzard-stepper-react
```

## Quick Start (Native Forms)

```tsx
import { WizardProvider, useWizard, IWizardConfig } from 'wizzard-stepper-react';

// 1. Define Config
const config: IWizardConfig = {
  steps: [
    { id: 'personal', label: 'Personal Info' },
    { id: 'contact', label: 'Contact Details' },
  ],
};

// 2. Create Steps
const Step1 = () => {
  const { handleStepChange, wizardData } = useWizard<{ name: string }>();
  return (
    <input 
      value={wizardData.name || ''} 
      onChange={e => handleStepChange('name', e.target.value)} 
    />
  );
};

// 3. Wrap in Provider
export default function App() {
  return (
    <WizardProvider config={config}>
       <WizardContent />
    </WizardProvider>
  );
}

const WizardContent = () => {
  const { currentStep, goToNextStep } = useWizard();
  if(!currentStep) return null;
  return (
    <div>
      {currentStep.id === 'personal' && <Step1 />}
      <button onClick={goToNextStep}>Next</button>
    </div>
  )
}
```

## Integration with React Hook Form + Zod

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ZodAdapter, useWizard } from 'wizzard-stepper-react';

const schema = z.object({ email: z.string().email() });

const MyStep = () => {
  const { handleStepChange, wizardData } = useWizard();
  const { register } = useForm({
    defaultValues: wizardData,
    resolver: zodResolver(schema),
    mode: 'onChange' // Important: validate real-time or bind changes
  });

  return (
     <input {...register('email', { 
       onChange: (e) => handleStepChange('email', e.target.value) 
     })} />
  );
}

// In Config:
const config = {
  steps: [
    { 
      id: 'step1', 
      label: 'Email', 
      // Zero-dependency: works with any Zod version
      validationAdapter: new ZodAdapter(schema) 
    }
  ]
}
```

## Complex Data (Arrays & Objects)

The library provides `setData` and `getData` helpers that support deep paths using dot notation and array brackets.

```tsx
const { setData, wizardData } = useWizard<MyData>();

// Set nested object property
setData('user.profile.name', 'John');

// Set array item property
setData('items[0].value', 'New Value');

// Get with default value
const name = getData('user.profile.name', 'Anonymous');
```

## Conditional Steps

Steps can be dynamically included based on the wizard's state.

```tsx
const config: IWizardConfig = {
  steps: [
    { id: 'start', label: 'Start' },
    { 
      id: 'bonus', 
      label: 'Bonus Step', 
      // Only show if 'wantBonus' is true
      condition: (data) => !!data.wantBonus 
    }
  ]
}
```

## Persistence

Save progress automatically to LocalStorage to survive page reloads.

```tsx
import { LocalStorageAdapter } from 'wizzard-stepper-react';

const config: IWizardConfig = {
  persistence: {
    mode: 'onChange', // Save on every keystroke
    adapter: new LocalStorageAdapter('my_wizard_prefix_')
  },
  steps: [...]
}
```

## API Reference

### `IWizardConfig<T>`

- `steps`: Array of step configurations.
- `persistence`: Configuration for state persistence.
- `autoValidate`: (obj) Global validation setting.

### `useWizard<T>()`

- `activeSteps`: Steps that match conditions.
- `currentStep`: The currently active step object.
- `wizardData`: The global state object.
- `setData(path, value)`: Update state using dot notation (e.g., `user.name`).
- `getData(path, defaultValue?)`: Retrieve nested data.
- `handleStepChange(key, value)`: simple helper to update top-level state.
- `goToNextStep()`: Validates and moves next.
- `goToStep(id)`: Jumps to specific step.
- `allErrors`: Map of validation errors (keyed by `stepId.path.to.field`).

## Demos

Check out the [Live Demo](https://ZizzX.github.io/wizzard-stepper-react/), [NPM](https://www.npmjs.com/package/wizzard-stepper-react) or the [source code](https://github.com/ZizzX/wizzard-stepper-react-demo) for a complete implementation featuring:

- **Tailwind CSS v4** UI overhaul.
- **React Hook Form + Zod** integration.
- **Formik + Yup** integration.
- **Conditional Routing** logic.

## License

MIT
