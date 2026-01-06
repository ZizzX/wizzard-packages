# API Reference - Advanced Types & Methods

Complete guide to advanced types and methods of the `wizzard-stepper-react` library.

---

## 📚 Table of Contents

1. [IWizardConfig Types](#iwizardconfig-types)
2. [IWizardActions Methods](#iwizardactions-methods)
3. [IWizardState Types](#iwizardstate-types)
4. [WizardAction Types](#wizardaction-types)
5. [IPersistenceAdapter Methods](#ipersistenceadapter-methods)

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

```typescript
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
```

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
  payload: { steps: Set<StepId> };
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
  payload: { steps: Set<StepId> };
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
  payload: { steps: Set<StepId> };
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
  payload: { meta: Partial<IWizardState<T, StepId>> };
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
  payload: { snapshot: any };
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

## 📚 See also

- [README.md](../README.md) - Main documentation
- [e2e/README.md](../e2e/README.md) - E2E testing
- [CHANGELOG.md](../CHANGELOG.md) - Change history

---

**Date updated:** 2026-01-06
