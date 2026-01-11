# API Reference - Advanced Types & Methods

Complete guide to advanced types and methods of the `@wizzard-packages/react` library.

---

## 📚 Table of Contents

1. [IWizardConfig Types](#iwizardconfig-types)
2. [IWizardActions Methods](#iwizardactions-methods)
3. [IWizardState Types](#iwizardstate-types)
4. [WizardAction Types](#wizardaction-types)
5. [IPersistenceAdapter Methods](#ipersistenceadapter-methods)
6. [WizardStepRenderer Component](#wizardsteprenderer-component)
7. [Specialized Hooks](#specialized-hooks)
8. [Custom Step Renderer](#custom-step-renderer)

---

## IWizardConfig Types

### navigationMode

**Type:** `'sequential' | 'visited' | 'free'`

**Description:** Defines the navigation mode between wizard steps.

**Modes:**

- **`sequential`** - Sequential navigation. User can only navigate to the next/previous step.
- **`visited`** (default) - Navigation to visited steps. User can navigate back to any previously visited step.
- **`free`** - Free navigation. User can navigate to any step at any time.

**Example:**

```typescript
const config: IWizardConfig<MyData> = {
  navigationMode: 'visited', // Can navigate to any visited step
  steps: [
    { id: 'step-1', label: 'Personal Info' },
    { id: 'step-2', label: 'Address' },
    { id: 'step-3', label: 'Review' },
  ],
};
```

**Use Cases:**

- `sequential`: Strict forms (e.g., onboarding)
- `visited`: Standard forms with the ability to correct
- `free`: Admin panels where full control is needed

---

### clearData

**Type:** `string | string[] | ((data: TStepData, changedFields: string[]) => Partial<TStepData>)`

**Description:** Automatically clears specified fields when dependencies (`dependsOn`) change.

**Usage:**

#### 1. Clear one field (string)

```typescript
const step: IStepConfig = {
  id: 'shipping',
  label: 'Shipping',
  dependsOn: ['country'],
  clearData: 'shippingMethod', // Clear when country changes
};
```

#### 2. Clear multiple fields (string[])

```typescript
const step: IStepConfig = {
  id: 'payment',
  label: 'Payment',
  dependsOn: ['currency'],
  clearData: ['cardNumber', 'cvv', 'expiryDate'], // Clear all when currency changes
};
```

#### 3. Custom clear logic (function)

```typescript
const step: IStepConfig = {
  id: 'preferences',
  label: 'Preferences',
  dependsOn: ['accountType'],
  clearData: (data, changedFields) => {
    // Clear only if accountType changed to 'basic'
    if (data.accountType === 'basic') {
      return {
        premiumFeatures: undefined,
        advancedSettings: undefined,
      };
    }
    return {};
  },
};
```

**Full example:**

```typescript
interface FormData {
  country: string;
  state: string;
  city: string;
  accountType: 'basic' | 'premium';
  premiumFeatures?: string[];
}

const config: IWizardConfig<FormData> = {
  steps: [
    {
      id: 'location',
      label: 'Location',
    },
    {
      id: 'details',
      label: 'Details',
      dependsOn: ['country'], // Depends on country
      clearData: ['state', 'city'], // Clear state and city when country changes
    },
    {
      id: 'account',
      label: 'Account',
      dependsOn: ['accountType'],
      clearData: (data) => {
        // smart clear
        if (data.accountType === 'basic') {
          return { premiumFeatures: [] };
        }
        return {};
      },
    },
  ],
};
```

---

### canNavigateTo

**Type:** `(data: TStepData, metadata: Partial<IWizardState<TStepData, StepId>>) => boolean | Promise<boolean>`

**Description:** Guard function for controlling access to a step. Allows dynamically determining whether the user can navigate to this step.

**Parameters:**

- `data` - Current wizard data
- `metadata` - Wizard metadata (currentStep, visitedSteps, errors, etc.)

**Returns:** `boolean` or `Promise<boolean>`

**Examples:**

#### 1. Role check

```typescript
const step: IStepConfig = {
  id: 'admin-panel',
  label: 'Admin Panel',
  canNavigateTo: (data, metadata) => {
    return data.userRole === 'admin';
  },
};
```

#### 2. Check previous steps filled

```typescript
const step: IStepConfig = {
  id: 'payment',
  label: 'Payment',
  canNavigateTo: (data, metadata) => {
    // Можно перейти только если нет ошибок на предыдущих шагах
    const hasErrors = metadata.errorSteps && metadata.errorSteps.size > 0;
    return !hasErrors;
  },
};
```

#### 3. Async check (API)

```typescript
const step: IStepConfig = {
  id: 'premium-features',
  label: 'Premium Features',
  canNavigateTo: async (data, metadata) => {
    // Проверить подписку на сервере
    const response = await fetch('/api/check-subscription', {
      method: 'POST',
      body: JSON.stringify({ userId: data.userId }),
    });
    const { hasActiveSubscription } = await response.json();
    return hasActiveSubscription;
  },
};
```

#### 4. Complex logic

```typescript
const step: IStepConfig = {
  id: 'review',
  label: 'Review',
  canNavigateTo: (data, metadata) => {
    // Множественные условия
    const isEmailVerified = data.emailVerified === true;
    const hasCompletedProfile = data.name && data.email && data.phone;
    const hasNoErrors = !metadata.errorSteps || metadata.errorSteps.size === 0;

    return isEmailVerified && hasCompletedProfile && hasNoErrors;
  },
};
```

---

## IWizardActions Methods

### updateConfig

**Signature:** `(config: Partial<IWizardConfig<T, StepId>>) => void`

**Description:** Dynamically updates the wizard configuration at runtime.

**Examples:**

#### 1. Change validation mode

```typescript
const { updateConfig } = useWizardActions();

// Switch to validation on each change
const enableLiveValidation = () => {
  updateConfig({
    validationMode: 'onChange',
    validationDebounceTime: 300,
  });
};

// Вернуть валидацию только при смене шага
const disableLiveValidation = () => {
  updateConfig({
    validationMode: 'onStepChange',
  });
};
```

#### 2. Dynamic step addition

```typescript
const { updateConfig } = useWizardActions();

// Add an additional step for premium users
const addPremiumStep = () => {
  updateConfig({
    steps: [
      ...currentSteps,
      {
        id: 'premium-features',
        label: 'Premium Features',
        condition: (data) => data.accountType === 'premium',
      },
    ],
  });
};
```

#### 3. Change navigation mode

```typescript
const { updateConfig } = useWizardActions();

// Allow free navigation for admins
const enableFreeNavigation = () => {
  updateConfig({
    navigationMode: 'free',
  });
};
```

---

### clearStorage

**Signature:** `() => void`

**Description:** Completely clears saved wizard data from storage (localStorage/sessionStorage/custom).

**Examples:**

#### 1. Clear on logout

````typescript
const { clearStorage } = useWizardActions();

const handleLogout = () => {
  clearStorage(); // Remove all wizard data
  // ... additional logout logic
};
``

#### 2. Reset form

```typescript
const { clearStorage, reset } = useWizardActions();

const handleResetForm = () => {
  clearStorage(); // Clear storage
  reset(); // Reset wizard state
};
````

#### 3. Clear on error

```typescript
const { clearStorage } = useWizardActions();

const handleCriticalError = () => {
  clearStorage(); // Remove corrupted data
  window.location.reload(); // Reload page
};
```

---

## IWizardState Types

### WizardAction Types

Types of actions for managing wizard state:

#### SET_VISITED_STEPS

```typescript
{
  type: 'SET_VISITED_STEPS';
  payload: {
    steps: Set<StepId>;
  }
}
```

**Description:** Sets the list of visited steps.

**Example:**

```typescript
// Mark steps as visited
dispatch({
  type: 'SET_VISITED_STEPS',
  payload: { steps: new Set(['step-1', 'step-2', 'step-3']) },
});
```

#### SET_COMPLETED_STEPS

```typescript
{
  type: 'SET_COMPLETED_STEPS';
  payload: {
    steps: Set<StepId>;
  }
}
```

**Description:** Sets the list of completed steps.

**Example:**

```typescript
// Mark steps as completed
dispatch({
  type: 'SET_COMPLETED_STEPS',
  payload: { steps: new Set(['step-1', 'step-2']) },
});
```

#### SET_ERROR_STEPS

```typescript
{
  type: 'SET_ERROR_STEPS';
  payload: {
    steps: Set<StepId>;
  }
}
```

**Description:** Sets the list of steps with errors.

**Example:**

```typescript
// Mark steps with errors
dispatch({
  type: 'SET_ERROR_STEPS',
  payload: { steps: new Set(['step-2', 'step-4']) },
});
```

#### UPDATE_META

```typescript
{
  type: 'UPDATE_META';
  payload: {
    meta: Partial<IWizardState<T, StepId>>;
  }
}
```

**Description:** Updates wizard metadata.

**Example:**

```typescript
// Update metadata
dispatch({
  type: 'UPDATE_META',
  payload: {
    meta: {
      isBusy: true,
      currentStepId: 'step-3',
    },
  },
});
```

#### RESTORE_SNAPSHOT

```typescript
{
  type: 'RESTORE_SNAPSHOT';
  payload: {
    snapshot: any;
  }
}
```

**Description:** Restores wizard state from a snapshot (for time-travel debugging).

**Example:**

```typescript
// Restore state
dispatch({
  type: 'RESTORE_SNAPSHOT',
  payload: { snapshot: previousState },
});
```

---

## IPersistenceAdapter Methods

### getStepWithMeta

**Signature:** `<T>(stepId: string) => { data: T; timestamp: number } | undefined`

**Description:** Gets step data along with metadata (timestamp).

**Example:**

```typescript
class CustomPersistenceAdapter implements IPersistenceAdapter {
  getStepWithMeta<T>(stepId: string): { data: T; timestamp: number } | undefined {
    const stored = localStorage.getItem(`wizard_${stepId}`);
    if (!stored) return undefined;

    const parsed = JSON.parse(stored);
    return {
      data: parsed.data,
      timestamp: parsed.timestamp,
    };
  }

  // ... other methods
}
```

**Use Case:**

```typescript
const adapter = new CustomPersistenceAdapter();

// Get data with timestamp
const stepData = adapter.getStepWithMeta('step-1');

if (stepData) {
  const age = Date.now() - stepData.timestamp;

  // Check if data is older than 24 hours
  if (age > 24 * 60 * 60 * 1000) {
    console.log('Data is older than 24 hours');
    // Clear stale data
  }
}
```

---

## 🎯 Practical Examples

### Example 1: Multi-step form with conditional logic

```typescript
interface RegistrationData {
  accountType: 'personal' | 'business';
  email: string;
  companyName?: string;
  taxId?: string;
}

const config: IWizardConfig<RegistrationData> = {
  navigationMode: 'visited',
  validationMode: 'onStepChange',

  steps: [
    {
      id: 'account-type',
      label: 'Account Type',
    },
    {
      id: 'personal-info',
      label: 'Personal Info',
      condition: (data) => data.accountType === 'personal',
    },
    {
      id: 'business-info',
      label: 'Business Info',
      condition: (data) => data.accountType === 'business',
      dependsOn: ['accountType'],
      clearData: ['companyName', 'taxId'], // Clear on type change
    },
    {
      id: 'review',
      label: 'Review',
      canNavigateTo: (data, meta) => {
        // Can navigate only if no errors
        return !meta.errorSteps || meta.errorSteps.size === 0;
      },
    },
  ],
};
```

### Example 2: Dynamic configuration change

```typescript
const WizardComponent = () => {
  const { updateConfig } = useWizardActions();
  const userRole = useWizardValue('userRole');

  useEffect(() => {
    if (userRole === 'admin') {
      // Allow free navigation for admins
      updateConfig({
        navigationMode: 'free',
      });
    } else {
      // Restrict navigation for regular users
      updateConfig({
        navigationMode: 'visited',
      });
    }
  }, [userRole, updateConfig]);

  return <WizardSteps />;
};
```

### Example 3: Clear data on logout

```typescript
const CheckoutWizard = () => {
  const { clearStorage, reset } = useWizardActions();

  const handleCancel = () => {
    // Clear all saved data
    clearStorage();

    // Reset wizard state
    reset();

    // Redirect to home
    navigate('/');
  };

  return (
    <div>
      <WizardSteps />
      <button onClick={handleCancel}>Cancel Order</button>
    </div>
  );
};
```

---

## WizardStepRenderer Component

### Overview

**`WizardStepRenderer`** is a declarative component that automatically renders the current step based on the `component` property in your step configuration.

### When to Use

Use `WizardStepRenderer` when you want:

- **Declarative step rendering** - Define components in config, not in JSX
- **Lazy loading** - Load step components only when needed
- **Animations** - Wrap steps with animation components (e.g., Framer Motion)
- **Consistent layout** - Apply the same wrapper to all steps

### Basic Usage

#### Step 1: Define components in config

```typescript
import { lazy } from 'react';

// Lazy load step components
const PersonalInfoStep = lazy(() => import('./steps/PersonalInfoStep'));
const AddressStep = lazy(() => import('./steps/AddressStep'));
const ReviewStep = lazy(() => import('./steps/ReviewStep'));

const config: IWizardConfig = {
  steps: [
    {
      id: 'personal',
      label: 'Personal Info',
      component: PersonalInfoStep, // ✅ Add component property
    },
    {
      id: 'address',
      label: 'Address',
      component: AddressStep,
    },
    {
      id: 'review',
      label: 'Review',
      component: ReviewStep,
    },
  ],
};
```

#### Step 2: Use WizardStepRenderer

```tsx
import { WizardStepRenderer } from '@wizzard-packages/react';

const MyWizard = () => {
  return (
    <WizardProvider config={config}>
      <div className="wizard-container">
        <WizardStepRenderer />
        <NavigationButtons />
      </div>
    </WizardProvider>
  );
};
```

### Advanced Features

#### 1. Loading Fallback

Show a loader while lazy-loading components:

```tsx
<WizardStepRenderer
  fallback={
    <div className="loading">
      <Spinner />
      <p>Loading step...</p>
    </div>
  }
/>
```

#### 2. Animation Wrapper

Wrap each step with animations:

```tsx
import { motion } from 'framer-motion';

const AnimatedWrapper = ({ children, key }) => (
  <motion.div
    key={key}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

<WizardStepRenderer wrapper={AnimatedWrapper} />;
```

#### 3. Complete Example with All Features

```tsx
import { WizardStepRenderer } from '@wizzard-packages/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';

const StepWrapper = ({ children, key }) => (
  <motion.div
    key={key}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
  </div>
);

const MyWizard = () => {
  return (
    <WizardProvider config={config}>
      <div className="max-w-2xl mx-auto p-6">
        <h1>Registration Wizard</h1>

        <AnimatePresence mode="wait">
          <WizardStepRenderer wrapper={StepWrapper} fallback={<LoadingFallback />} />
        </AnimatePresence>

        <NavigationButtons />
      </div>
    </WizardProvider>
  );
};
```

### Important Notes

⚠️ **Required:** If you use `component` property in step config, you **must** use `WizardStepRenderer` to render it.

⚠️ **Lazy Loading:** Use `React.lazy()` for better code splitting and performance.

⚠️ **Suspense:** `WizardStepRenderer` includes built-in `Suspense`, but you can provide a custom `fallback`.

---

## Custom Step Renderer

### When to Create Custom Renderer

Create a custom renderer when you need:

- **Custom layout logic** - Different layouts for different step types
- **Additional wrappers** - Add breadcrumbs, progress bars, etc.
- **Step-specific styling** - Apply different styles based on step metadata
- **Advanced animations** - Complex animation sequences

### Basic Custom Renderer

```tsx
import { useWizardContext } from '@wizzard-packages/react';

const CustomStepRenderer = () => {
  const { currentStep } = useWizardContext();

  if (!currentStep?.component) {
    return <div>No component defined for this step</div>;
  }

  const StepComponent = currentStep.component;

  return (
    <div className="custom-step-container">
      <StepComponent />
    </div>
  );
};
```

### Advanced Custom Renderer with Metadata

```tsx
import { useWizardContext } from '@wizzard-packages/react';
import { motion } from 'framer-motion';

const AdvancedStepRenderer = () => {
  const { currentStep, visitedSteps, completedSteps, errorSteps } = useWizardContext();

  if (!currentStep?.component) return null;

  const StepComponent = currentStep.component;

  // Determine step status
  const isVisited = visitedSteps.has(currentStep.id);
  const isCompleted = completedSteps.has(currentStep.id);
  const hasError = errorSteps.has(currentStep.id);

  // Apply different styles based on status
  const containerClass = `
    step-container
    ${isCompleted ? 'step-completed' : ''}
    ${hasError ? 'step-error' : ''}
    ${isVisited ? 'step-visited' : 'step-new'}
  `;

  return (
    <motion.div
      key={currentStep.id}
      className={containerClass}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Step header with status */}
      <div className="step-header">
        <h2>{currentStep.label}</h2>
        {hasError && <span className="error-badge">Has Errors</span>}
        {isCompleted && <span className="success-badge">Completed</span>}
      </div>

      {/* Render step component */}
      <div className="step-content">
        <StepComponent />
      </div>
    </motion.div>
  );
};
```

### Custom Renderer with Different Layouts

```tsx
const MultiLayoutRenderer = () => {
  const { currentStep } = useWizardContext();

  if (!currentStep?.component) return null;

  const StepComponent = currentStep.component;

  // Different layouts for different step types
  switch (currentStep.id) {
    case 'welcome':
      return (
        <div className="full-screen-layout">
          <StepComponent />
        </div>
      );

    case 'review':
      return (
        <div className="two-column-layout">
          <aside className="summary-sidebar">
            <SummaryPanel />
          </aside>
          <main className="review-content">
            <StepComponent />
          </main>
        </div>
      );

    default:
      return (
        <div className="standard-layout">
          <StepComponent />
        </div>
      );
  }
};
```

---

## Specialized Hooks

### useWizardSelector

**Purpose:** Select specific parts of wizard state with optimal re-rendering.

**Signature:** `<R>(selector: (state: IWizardState) => R) => R`

**When to Use:**

- When you need derived state
- When you want to avoid unnecessary re-renders
- When working with complex state transformations

**Examples:**

#### 1. Select Derived State

```typescript
const { useWizardSelector } = createWizardFactory<MyData>();

// ✅ GOOD: Only re-renders when total changes
const total = useWizardSelector((state) =>
  state.data.items.reduce((sum, item) => sum + item.price, 0)
);

// ❌ BAD: Re-renders on any data change
const { data } = useWizard();
const total = data.items.reduce((sum, item) => sum + item.price, 0);
```

#### 2. Select Multiple Fields Efficiently

```typescript
// ✅ GOOD: Single selector, single re-render
const formData = useWizardSelector((state) => ({
  name: state.data.name,
  email: state.data.email,
  isValid: !state.errorSteps.has('personal-info'),
}));

// ❌ BAD: Multiple hooks, multiple re-renders
const name = useWizardValue('name');
const email = useWizardValue('email');
const { errorSteps } = useWizard();
```

#### 3. Complex Transformations

```typescript
const validationSummary = useWizardSelector((state) => {
  const totalSteps = state.activeSteps.length;
  const completedSteps = state.completedSteps.size;
  const errorSteps = state.errorSteps.size;
  const progress = (completedSteps / totalSteps) * 100;

  return {
    totalSteps,
    completedSteps,
    errorSteps,
    progress,
    isComplete: completedSteps === totalSteps && errorSteps === 0,
  };
});
```

**⚠️ Important Nuances:**

1. **Selector Stability:** Use `useCallback` for dynamic selectors:

```typescript
const userId = '123';

// ❌ BAD: Creates new selector on every render
const userOrders = useWizardSelector((state) =>
  state.data.orders.filter((o) => o.userId === userId)
);

// ✅ GOOD: Stable selector
const userOrders = useWizardSelector(
  useCallback((state) => state.data.orders.filter((o) => o.userId === userId), [userId])
);
```

2. **Reference Equality:** Return primitive values or use memoization:

```typescript
// ❌ BAD: Returns new array every time
const items = useWizardSelector((state) => state.data.items.map((i) => i.name));

// ✅ GOOD: Use useMemo for derived arrays
const items = useWizardSelector((state) => state.data.items);
const itemNames = useMemo(() => items.map((i) => i.name), [items]);
```

---

### useWizardError

**Purpose:** Get error for a specific field.

**Signature:** `(field: keyof T) => string | undefined`

**When to Use:**

- Displaying field-specific error messages
- Conditional styling based on errors
- Form validation feedback

**Examples:**

#### 1. Basic Error Display

```tsx
const { useWizardError } = createWizardFactory<FormData>();

const EmailInput = () => {
  const emailError = useWizardError('email');

  return (
    <div>
      <input type="email" className={emailError ? 'input-error' : 'input-valid'} />
      {emailError && <span className="error-message">{emailError}</span>}
    </div>
  );
};
```

#### 2. Multiple Field Errors

```tsx
const PersonalInfoStep = () => {
  const nameError = useWizardError('name');
  const emailError = useWizardError('email');
  const phoneError = useWizardError('phone');

  const hasAnyError = nameError || emailError || phoneError;

  return (
    <div>
      {hasAnyError && <div className="alert alert-error">Please fix the errors below</div>}

      <Input name="name" error={nameError} />
      <Input name="email" error={emailError} />
      <Input name="phone" error={phoneError} />
    </div>
  );
};
```

**⚠️ Important Nuances:**

1. **Nested Fields:** Use dot notation for nested errors:

```typescript
// For nested data: { user: { profile: { email: '' } } }
const emailError = useWizardError('user.profile.email');
```

2. **Array Fields:** Access array item errors:

```typescript
// For array data: { items: [{ name: '' }, { name: '' }] }
const firstItemError = useWizardError('items[0].name');
```

---

### useWizardValue

**Purpose:** Get value of a specific field with atomic re-renders.

**Signature:** `(field: keyof T) => T[field]`

**When to Use:**

- Reading single field values
- Optimizing component re-renders
- Building controlled inputs

**Examples:**

#### 1. Controlled Input

```tsx
const { useWizardValue, useWizardActions } = createWizardFactory<FormData>();

const NameInput = () => {
  const name = useWizardValue('name');
  const { setData } = useWizardActions();

  return <input value={name || ''} onChange={(e) => setData('name', e.target.value)} />;
};
```

#### 2. Conditional Rendering

```tsx
const PremiumFeatures = () => {
  const accountType = useWizardValue('accountType');

  if (accountType !== 'premium') {
    return <UpgradePrompt />;
  }

  return <PremiumContent />;
};
```

**⚠️ Important Nuances:**

1. **Nested Values:** For nested data, use selector instead:

```typescript
// ❌ BAD: Can't access nested with useWizardValue
const email = useWizardValue('user.email'); // Type error!

// ✅ GOOD: Use selector for nested data
const email = useWizardSelector((state) => state.data.user?.email);
```

2. **Default Values:** Handle undefined values:

```typescript
const name = useWizardValue('name');

// ✅ GOOD: Provide default
const displayName = name || 'Guest';

// ✅ GOOD: Null coalescing
const displayName = name ?? 'Guest';
```

---

### useWizardState

**Purpose:** Get UI metadata (progress, current step, etc.) without data.

**Signature:** `() => Omit<IWizardState, 'data'>`

**When to Use:**

- Building progress indicators
- Displaying step information
- Conditional UI based on wizard state

**Examples:**

#### 1. Progress Bar

```tsx
const ProgressBar = () => {
  const { activeSteps, currentStepIndex } = useWizardState();

  const progress = ((currentStepIndex + 1) / activeSteps.length) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }} />
      <span>{Math.round(progress)}% Complete</span>
    </div>
  );
};
```

#### 2. Step Indicator

```tsx
const StepIndicator = () => {
  const { currentStep, visitedSteps, completedSteps } = useWizardState();

  return (
    <div className="step-indicator">
      <h2>{currentStep?.label}</h2>
      <p>
        Visited: {visitedSteps.size} | Completed: {completedSteps.size}
      </p>
    </div>
  );
};
```

**⚠️ Important Nuances:**

1. **No Data Access:** This hook doesn't include `data`. Use `useWizard()` if you need data.

```typescript
// ❌ BAD: data is undefined
const { data } = useWizardState(); // Type error!

// ✅ GOOD: Use useWizard for data
const { data } = useWizard();
```

2. **Sets are Immutable:** `visitedSteps`, `completedSteps`, `errorSteps` are Sets:

```typescript
const { visitedSteps } = useWizardState();

// ✅ GOOD: Check membership
const isVisited = visitedSteps.has('step-1');

// ✅ GOOD: Convert to array
const visitedArray = Array.from(visitedSteps);

// ❌ BAD: Don't mutate
visitedSteps.add('step-2'); // Won't work!
```

---

## 📚 See also

- [README.md](../README.md) - Main documentation
- [e2e/README.md](../e2e/README.md) - E2E testing
- [CHANGELOG.md](../CHANGELOG.md) - Change history

---

**Date updated:** 2026-01-06
