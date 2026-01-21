# @wizzard-packages/vue 🧙‍♂️

![npm](https://img.shields.io/npm/v/@wizzard-packages/vue)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/vue)
![license](https://img.shields.io/npm/l/@wizzard-packages/vue)

Vue 3 Composition API bindings for **Wizzard Stepper**.  
Build flexible, headless, and strictly typed multi-step wizards with Vue 3.

## ✨ Features

- 🟢 **Vue 3 Native**: Built with Composition API and fine-grained reactivity.
- 🏗 **Headless**: Total control over your UI/components.
- 🧪 **Strictly Typed**: Full TypeScript support with the Factory Pattern.
- ⚡ **Atomic Updates**: Components re-render only when the specific data they use changes.
- 🔌 **Core Powered**: Uses the same battle-tested engine as `@wizzard-packages/react`.
- 🔄 **Feature Parity**: All React adapter features available in Vue (validation, guards, persistence, middleware).

## 📦 Installation

```bash
pnpm add @wizzard-packages/vue @wizzard-packages/core
# or
npm install @wizzard-packages/vue @wizzard-packages/core
```

Optional add-ons:

```bash
pnpm add @wizzard-packages/persistence @wizzard-packages/middleware
pnpm add @wizzard-packages/adapter-zod zod
pnpm add @wizzard-packages/adapter-yup yup
```

## 🚀 Quick Start

### 1. Define your Schema and Factory

Create a typed wizard instance for your data schema.

```typescript
// wizard.ts
import { createWizardFactory } from '@wizzard-packages/vue';

export interface MySchema {
  user: {
    name: string;
    email: string;
  };
  plan: 'basic' | 'pro';
}

export type StepId = 'info' | 'plan' | 'review';

export const {
  useProvideWizard,
  useWizardActions,
  useWizardValue,
  useWizardState,
  useWizardField,
  useWizardSelector,
  useWizardError
} = createWizardFactory<MySchema>();
```

### 2. Provide the Wizard in a Parent Component

```vue
<script setup lang="ts">
import { useProvideWizard } from './wizard';
import type { IWizardConfig } from '@wizzard-packages/core';

const config: IWizardConfig<'info' | 'plan' | 'review', any> = {
  steps: [
    { id: 'info', label: 'Personal Info' },
    { id: 'plan', label: 'Select Plan' },
    { id: 'review', label: 'Review' }
  ]
};

useProvideWizard({
  config,
  initialData: { 
    user: { name: '', email: '' }, 
    plan: 'basic' 
  }
});
</script>

<template>
  <div class="wizard-container">
    <StepRenderer />
    <NavigationControls />
  </div>
</template>
```

### 3. Consume State in Child Components

#### Reading and Writing Values (`useWizardField`)

```vue
<script setup lang="ts">
import { useWizardField } from './wizard';

// Reactive [ref, setter]
const [name, setName] = useWizardField('user.name');
const [email, setEmail] = useWizardField('user.email');
</script>

<template>
  <div>
    <input 
      :value="name" 
      @input="e => setName((e.target as HTMLInputElement).value)" 
      placeholder="Enter name" 
    />
    <input 
      :value="email" 
      @input="e => setEmail((e.target as HTMLInputElement).value)" 
      placeholder="Enter email"
      type="email"
    />
  </div>
</template>
```

#### Navigation Actions (`useWizardActions`)

```vue
<script setup lang="ts">
import { useWizardActions, useWizardState } from './wizard';

const state = useWizardState();
const { nextStep, prevStep, goToStep } = useWizardActions();
</script>

<template>
  <div class="navigation">
    <button @click="prevStep" :disabled="state.isFirstStep">
      Back
    </button>
    <span>Step {{ state.currentStepIndex + 1 }} of {{ state.totalSteps }}</span>
    <button @click="nextStep" :disabled="state.isLastStep">
      Next
    </button>
  </div>
</template>
```

## 🛠 API Reference

### `createWizardFactory<TSchema>()`

Returns a set of typed hooks for your schema:

#### `useProvideWizard(options)`

Initializes and provides the wizard store to the component tree.

```typescript
interface IWizardProviderOptions<StepId, TSchema> {
  config: IWizardConfig<StepId, TSchema>;
  initialData?: TSchema;
  initialStepId?: StepId;
}

useProvideWizard({
  config: {
    steps: [
      { id: 'step1', label: 'Step 1' },
      { id: 'step2', label: 'Step 2' }
    ],
    validationMode: 'onChange', // 'onChange' | 'onBlur' | 'onSubmit'
    validationDebounceTime: 300,
  },
  initialData: { name: '' },
  initialStepId: 'step1'
});
```

#### `useWizardState()`

Returns a reactive computed ref with the complete wizard state:

```typescript
const state = useWizardState();

// Available properties:
state.currentStepId      // Current step ID
state.currentStepIndex   // Current step index (0-based)
state.totalSteps         // Total number of active steps
state.isFirstStep        // Boolean: is first step
state.isLastStep         // Boolean: is last step
state.canGoNext          // Boolean: can navigate forward
state.canGoPrev          // Boolean: can navigate backward
state.visitedSteps       // Set of visited step IDs
state.completedSteps     // Set of completed step IDs
state.errorSteps         // Set of steps with errors
state.progress           // Progress percentage (0-100)
state.isBusy             // Boolean: async operation in progress
state.data               // Current wizard data
state.activeSteps        // Array of currently active steps
```

#### `useWizardValue(path, defaultValue?)`

Returns a reactive ref for a specific path in the wizard data:

```typescript
const name = useWizardValue('user.name');
const email = useWizardValue('user.email', 'default@example.com');

// Automatically updates when the value changes
console.log(name.value); // 'John'
```

#### `useWizardField(path, defaultValue?)`

Returns `[ref, setter]` tuple for a specific field:

```typescript
const [name, setName] = useWizardField('user.name');
const [age, setAge] = useWizardField('user.age', 18);

// Use in template
<input :value="name" @input="e => setName(e.target.value)" />

// Or with v-model workaround
const nameModel = computed({
  get: () => name.value,
  set: (val) => setName(val)
});

<input v-model="nameModel" />
```

#### `useWizardActions()`

Returns navigation and data manipulation methods:

```typescript
const actions = useWizardActions();

// Navigation
actions.nextStep()                    // Go to next step
actions.prevStep()                    // Go to previous step
actions.goToStep('stepId')           // Go to specific step
actions.goToStepIndex(2)             // Go to step by index

// Data manipulation
actions.setData('user.name', 'John') // Set single value
actions.updateData({                 // Update multiple values
  user: { name: 'John', email: 'john@example.com' }
})
actions.getData('user.name')         // Get value by path
actions.getData('user.name', 'Default') // With default value

// Validation
actions.validateStep('stepId')       // Validate specific step
actions.validateAll()                // Validate all steps

// Error management
actions.setErrors({                  // Set errors for a step
  stepId: { 
    fieldName: 'Error message' 
  }
})

// Reset
actions.reset()                      // Reset to initial state
actions.reset({ name: 'New' })      // Reset with new data
```

#### `useWizardSelector(selector)`

Returns a reactive computed value derived from wizard state:

```typescript
const progress = useWizardSelector(state => state.progress);
const isValid = useWizardSelector(state => 
  state.errorSteps.size === 0
);

// Complex derived state
const wizardStatus = useWizardSelector(state => ({
  step: state.currentStepId,
  progress: state.progress,
  canProceed: state.canGoNext && !state.isBusy,
  hasErrors: state.errorSteps.size > 0
}));
```

#### `useWizardError(path)`

Returns a reactive ref with the error message for a specific field:

```typescript
const nameError = useWizardError('user.name');
const emailError = useWizardError('user.email');

// Use in template
<div v-if="nameError" class="error">{{ nameError }}</div>
```

## 📚 Advanced Examples

### Example 1: Step Guards (beforeLeave)

Prevent navigation until validation passes:

```typescript
const config: IWizardConfig<StepId, MySchema> = {
  steps: [
    {
      id: 'info',
      label: 'Personal Info',
      beforeLeave: async (data) => {
        if (!data.user.name) {
          return { canLeave: false, error: 'Name is required' };
        }
        if (!data.user.email.includes('@')) {
          return { canLeave: false, error: 'Valid email required' };
        }
        return { canLeave: true };
      }
    },
    { id: 'review', label: 'Review' }
  ]
};
```

### Example 2: Conditional Steps (isVisible)

Show/hide steps based on data:

```typescript
const config: IWizardConfig<StepId, MySchema> = {
  steps: [
    { id: 'plan', label: 'Select Plan' },
    {
      id: 'payment',
      label: 'Payment',
      isVisible: (data) => data.plan === 'pro' // Only show for pro plan
    },
    { id: 'review', label: 'Review' }
  ]
};
```

### Example 3: Async Step Conditions

Dynamic step visibility with async checks:

```typescript
const config: IWizardConfig<StepId, MySchema> = {
  steps: [
    { id: 'account', label: 'Account' },
    {
      id: 'premium',
      label: 'Premium Features',
      isVisible: async (data) => {
        const hasAccess = await checkPremiumAccess(data.user.id);
        return hasAccess;
      }
    }
  ]
};
```

### Example 4: Zod Validation

Integrate with Zod for schema validation:

```vue
<script setup lang="ts">
import { z } from 'zod';
import { ZodAdapter } from '@wizzard-packages/adapter-zod';
import { useProvideWizard } from './wizard';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be 18 or older')
});

const config = {
  steps: [
    { 
      id: 'info', 
      label: 'Info',
      validate: ZodAdapter(userSchema)
    }
  ]
};

useProvideWizard({ config, initialData: { name: '', email: '', age: 0 } });
</script>
```

### Example 5: LocalStorage Persistence

Persist wizard state across sessions:

```typescript
import { LocalStorageAdapter } from '@wizzard-packages/persistence';

const config = {
  steps: [
    { id: 'step1', label: 'Step 1' },
    { id: 'step2', label: 'Step 2' }
  ],
  persistence: LocalStorageAdapter('my-wizard-state')
};

useProvideWizard({ config, initialData: {} });
```

### Example 6: Middleware (Logger)

Add logging middleware for debugging:

```typescript
import { loggerMiddleware } from '@wizzard-packages/middleware';

const config = {
  steps: [
    { id: 'step1', label: 'Step 1' }
  ],
  middlewares: [loggerMiddleware]
};

useProvideWizard({ config, initialData: {} });
```

### Example 7: Progress Indicator Component

```vue
<script setup lang="ts">
import { useWizardState } from './wizard';

const state = useWizardState();
</script>

<template>
  <div class="progress-bar">
    <div 
      class="progress-fill" 
      :style="{ width: `${state.progress}%` }"
    />
  </div>
  <div class="progress-text">
    {{ state.progress }}% Complete
    ({{ state.currentStepIndex + 1 }} / {{ state.totalSteps }})
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  transition: width 0.3s ease;
}
</style>
```

### Example 8: Step Breadcrumbs

```vue
<script setup lang="ts">
import { useWizardState, useWizardActions } from './wizard';

const state = useWizardState();
const { goToStep } = useWizardActions();

const canNavigateToStep = (stepId: string) => {
  return state.visitedSteps.has(stepId) || 
         state.completedSteps.has(stepId);
};
</script>

<template>
  <div class="breadcrumbs">
    <div
      v-for="(step, index) in state.activeSteps"
      :key="step.id"
      class="breadcrumb"
      :class="{
        active: step.id === state.currentStepId,
        completed: state.completedSteps.has(step.id),
        error: state.errorSteps.has(step.id)
      }"
      @click="canNavigateToStep(step.id) && goToStep(step.id)"
    >
      <span class="number">{{ index + 1 }}</span>
      <span class="label">{{ step.label }}</span>
    </div>
  </div>
</template>
```

### Example 9: Form with Validation Errors

```vue
<script setup lang="ts">
import { useWizardField, useWizardError, useWizardActions } from './wizard';

const [name, setName] = useWizardField('user.name');
const [email, setEmail] = useWizardField('user.email');

const nameError = useWizardError('user.name');
const emailError = useWizardError('user.email');

const { validateStep, nextStep } = useWizardActions();

const handleSubmit = async () => {
  const result = await validateStep('info');
  if (result.isValid) {
    await nextStep();
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="field">
      <label>Name</label>
      <input
        :value="name"
        @input="e => setName((e.target as HTMLInputElement).value)"
        :class="{ error: nameError }"
      />
      <span v-if="nameError" class="error-message">{{ nameError }}</span>
    </div>

    <div class="field">
      <label>Email</label>
      <input
        type="email"
        :value="email"
        @input="e => setEmail((e.target as HTMLInputElement).value)"
        :class="{ error: emailError }"
      />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>
    </div>

    <button type="submit">Continue</button>
  </form>
</template>
```

### Example 10: Computed v-model Wrapper

For easier v-model integration:

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useWizardField } from './wizard';

const [nameRef, setName] = useWizardField('user.name');
const [emailRef, setEmail] = useWizardField('user.email');

// Create computed properties for v-model
const name = computed({
  get: () => nameRef.value,
  set: (val) => setName(val)
});

const email = computed({
  get: () => emailRef.value,
  set: (val) => setEmail(val)
});
</script>

<template>
  <div>
    <input v-model="name" placeholder="Name" />
    <input v-model="email" type="email" placeholder="Email" />
  </div>
</template>
```

### Example 11: Complex Selector with Performance

```vue
<script setup lang="ts">
import { useWizardSelector } from './wizard';

// Only re-renders when these specific values change
const wizardMeta = useWizardSelector(state => ({
  currentStep: state.activeSteps.find(s => s.id === state.currentStepId),
  isLastAndValid: state.isLastStep && state.errorSteps.size === 0,
  completionRate: (state.completedSteps.size / state.totalSteps) * 100
}));
</script>

<template>
  <div class="wizard-meta">
    <h2>{{ wizardMeta.currentStep?.label }}</h2>
    <p v-if="wizardMeta.isLastAndValid">Ready to submit!</p>
    <p>{{ wizardMeta.completionRate.toFixed(0) }}% of steps completed</p>
  </div>
</template>
```

### Example 12: Dynamic Step Configuration

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProvideWizard } from './wizard';
import type { IStepConfig } from '@wizzard-packages/core';

const userType = ref<'personal' | 'business'>('personal');

const steps = computed(() => {
  const baseSteps: IStepConfig<string, any>[] = [
    { id: 'type', label: 'Account Type' }
  ];

  if (userType.value === 'business') {
    baseSteps.push(
      { id: 'company', label: 'Company Info' },
      { id: 'tax', label: 'Tax Details' }
    );
  } else {
    baseSteps.push(
      { id: 'personal', label: 'Personal Info' }
    );
  }

  baseSteps.push({ id: 'review', label: 'Review' });

  return baseSteps;
});

const config = computed(() => ({
  steps: steps.value
}));

useProvideWizard({ 
  config: config.value, 
  initialData: { type: userType.value } 
});
</script>
```

## 🎯 Best Practices

### 1. Memoize Configuration

Use `computed` for step configuration to avoid unnecessary recalculations:

```typescript
const config = computed(() => ({
  steps: [
    { id: 'step1', label: 'Step 1' }
  ],
  middlewares: [loggerMiddleware],
  validationMode: 'onChange'
}));
```

### 2. Granular Subscriptions

Prefer specific hooks over full state for better performance:

```typescript
// ✅ Good: Only re-renders when 'user.name' changes
const name = useWizardValue('user.name');

// ❌ Avoid: Re-renders on any state change
const state = useWizardState();
const name = state.data.user.name;
```

### 3. Use Selectors for Derived State

Create computed values with `useWizardSelector`:

```typescript
// Only re-computes when progress or isBusy changes
const status = useWizardSelector(state => ({
  progress: state.progress,
  loading: state.isBusy
}));
```

### 4. Validation Timing

Choose appropriate validation mode:

- `onChange`: Real-time validation (best UX, more API calls)
- `onBlur`: Validate on field blur (balanced)
- `onSubmit`: Validate on step navigation (least intrusive)

### 5. Error Handling

Always handle async errors in guards and validation:

```typescript
{
  id: 'step1',
  beforeLeave: async (data) => {
    try {
      await validateAPI(data);
      return { canLeave: true };
    } catch (error) {
      return { 
        canLeave: false, 
        error: error.message || 'Validation failed' 
      };
    }
  }
}
```

## 🔌 Integration with Vue Router

```vue
<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWizardActions, useWizardState } from './wizard';

const route = useRoute();
const router = useRouter();
const { goToStep } = useWizardActions();
const state = useWizardState();

// Sync wizard step with route
watch(() => route.params.step, (stepId) => {
  if (stepId && stepId !== state.currentStepId) {
    goToStep(stepId as string);
  }
});

// Sync route with wizard step
watch(() => state.currentStepId, (stepId) => {
  if (route.params.step !== stepId) {
    router.push({ params: { step: stepId } });
  }
});
</script>
```

## 🧪 Testing

```typescript
import { mount } from '@vue/test-utils';
import { useProvideWizard, useWizardState } from './wizard';

describe('Wizard', () => {
  it('navigates between steps', async () => {
    const wrapper = mount({
      setup() {
        useProvideWizard({
          config: {
            steps: [
              { id: 'step1', label: 'Step 1' },
              { id: 'step2', label: 'Step 2' }
            ]
          },
          initialData: {}
        });

        const state = useWizardState();
        const { nextStep } = useWizardActions();

        return { state, nextStep };
      },
      template: '<div>{{ state.currentStepId }}</div>'
    });

    expect(wrapper.text()).toBe('step1');

    await wrapper.vm.nextStep();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toBe('step2');
  });
});
```

## 🌐 SSR Support

The Vue adapter is SSR-friendly and works with Nuxt 3:

```typescript
// Avoid persistence adapters that access `window` during module initialization
// Use lazy initialization instead:

const config = computed(() => ({
  steps: [...],
  persistence: typeof window !== 'undefined' 
    ? LocalStorageAdapter('key') 
    : undefined
}));
```

## 📦 Package Structure

- **ESM**: `dist/index.js` (tree-shakeable)
- **CJS**: `dist/index.cjs` (Node.js compatibility)
- **Types**: `dist/index.d.ts` (TypeScript definitions)

## 🔗 How It Fits

- **Core engine**: `@wizzard-packages/core` (shared with React)
- **Optional persistence**: `@wizzard-packages/persistence`
- **Optional middleware**: `@wizzard-packages/middleware`
- **Optional validation**: `@wizzard-packages/adapter-zod` or `@wizzard-packages/adapter-yup`

## 📖 Links

- **Repository**: https://github.com/ZizzX/wizzard-packages
- **Documentation**: https://zizzx.github.io/wizzard-packages/
- **Issues**: https://github.com/ZizzX/wizzard-packages/issues
- **Changelog**: [CHANGELOG.md](./CHANGELOG.md)

## 📄 License

MIT © [ZizzX](https://github.com/ZizzX)

---

**Made with ❤️ for the Vue community**