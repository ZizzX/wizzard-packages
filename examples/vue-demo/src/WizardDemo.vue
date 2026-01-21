<script setup lang="ts">
import { wizardFactory } from './wizardSetup';

const {
  useWizardActions,
  useWizardState,
  useWizardValue,
  useWizardField,
  useWizardError,
  useWizardSelector,
} = wizardFactory;

const state = useWizardState();
const { nextStep, prevStep, goToStep, setData } = useWizardActions();

const progress = useWizardSelector((s) => s.progress);

const [userName, setUserName] = useWizardField('user.name');
const userEmail = useWizardValue('user.email');

const nameError = useWizardError('user.name');
const emailError = useWizardError('user.email');
const ageError = useWizardError('details.age');
const bioError = useWizardError('details.bio');

const handleEmailInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  setData('user.email', target.value);
};

const handleSubmit = () => {
  window.alert('Submitted!');
};
</script>

<template>
  <div class="wizard-app">
    <h1>Vue Wizard E2E Demo</h1>

    <!-- Progress & Metadata -->
    <div class="meta-section">
      <p>
        Current Step: <span data-testid="current-step">{{ state.currentStepId }}</span>
      </p>
      <p>
        Progress: <span data-testid="progress">{{ progress }}%</span>
      </p>
      <div class="completed-steps">
        Completed:
        <span
          v-for="stepId in state.completedSteps"
          :key="stepId"
          :data-testid="`completed-${stepId}`"
        >
          {{ stepId }}
        </span>
      </div>
    </div>

    <!-- Step Rendering -->
    <main class="step-content">
      <!-- Step 1: Personal -->
      <section v-if="state.currentStepId === 'personal'" data-testid="step-personal">
        <h2>Personal Info</h2>
        <div class="field">
          <label>Name:</label>
          <input
            data-testid="input-name"
            v-model="userName"
            @input="(e) => setUserName((e.target as HTMLInputElement).value)"
          />
          <span v-if="nameError" data-testid="error-name" class="error">{{ nameError }}</span>
        </div>
        <div class="field">
          <label>Email:</label>
          <input data-testid="input-email" :value="userEmail" @input="handleEmailInput" />
          <span v-if="emailError" data-testid="error-email" class="error">{{ emailError }}</span>
        </div>
      </section>

      <!-- Step 2: Details -->
      <section v-else-if="state.currentStepId === 'details'" data-testid="step-details">
        <h2>Details</h2>
        <div class="field">
          <label>Age:</label>
          <input
            type="number"
            data-testid="input-age"
            :value="state.data.details.age"
            @input="(e) => setData('details.age', Number((e.target as HTMLInputElement).value))"
          />
          <span v-if="ageError" data-testid="error-age" class="error">{{ ageError }}</span>
        </div>
        <div class="field">
          <label>Bio:</label>
          <textarea
            data-testid="input-bio"
            :value="state.data.details.bio"
            @input="(e) => setData('details.bio', (e.target as HTMLTextAreaElement).value)"
          ></textarea>
          <span v-if="bioError" data-testid="error-bio" class="error">{{ bioError }}</span>
        </div>
      </section>

      <!-- Step 3: Review -->
      <section v-else-if="state.currentStepId === 'review'" data-testid="step-review">
        <h2>Review</h2>
        <pre data-testid="data-summary">{{ JSON.stringify(state.data, null, 2) }}</pre>
      </section>
    </main>

    <!-- Navigation -->
    <nav class="navigation">
      <button data-testid="btn-prev" @click="prevStep" :disabled="state.isFirstStep">Back</button>

      <div class="breadcrumbs">
        <button
          v-for="crumb in state.breadcrumbs"
          :key="crumb.id"
          :data-testid="`crumb-${crumb.id}`"
          :class="['crumb', crumb.status]"
          @click="goToStep(crumb.id)"
        >
          {{ crumb.label }}
        </button>
      </div>

      <button data-testid="btn-next" @click="nextStep()" v-if="!state.isLastStep">Next</button>
      <button data-testid="btn-submit" v-else @click="handleSubmit">Submit</button>
    </nav>
  </div>
</template>

<style scoped>
.wizard-app {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: sans-serif;
}

.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.error {
  color: red;
  font-size: 0.8rem;
}

.navigation {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.breadcrumbs {
  display: flex;
  gap: 0.5rem;
}

.crumb {
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  border: 1px solid #ddd;
  background: none;
  cursor: pointer;
}

.crumb.current {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.crumb.completed {
  border-color: green;
  color: green;
}

.meta-section {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}
</style>
