<template>
  <div class="page">
    <div class="card">
      <header class="header">
        <h1>Vue + core engine</h1>
        <p>Drive the wizard with @wizzard-packages/core and Vue UI.</p>
      </header>

      <div class="progress">
        <div class="progress-bar" :style="{ width: `${snapshot.progress}%` }"></div>
      </div>

      <section class="content">
        <div v-if="snapshot.currentStepId === 'intro'">
          <h2>Start</h2>
          <p class="muted">Collect basic data and branch later.</p>
          <label class="label">Name</label>
          <input
            class="input"
            :value="snapshot.data.name"
            @input="updateName(($event.target as HTMLInputElement).value)"
            placeholder="Jane Doe"
          />
        </div>

        <div v-else-if="snapshot.currentStepId === 'plan'">
          <h2>Plan</h2>
          <p class="muted">Choose a plan to unlock the pro step.</p>
          <div class="choice">
            <button
              v-for="value in plans"
              :key="value"
              class="chip"
              :class="{ active: snapshot.data.plan === value }"
              @click="updatePlan(value)"
            >
              {{ value }}
            </button>
          </div>
        </div>

        <div v-else-if="snapshot.currentStepId === 'pro'">
          <h2>Pro step</h2>
          <p class="muted">Rendered only when plan is pro.</p>
        </div>

        <div v-else-if="snapshot.currentStepId === 'review'">
          <h2>Review</h2>
          <pre class="code">{{ JSON.stringify(snapshot.data, null, 2) }}</pre>
        </div>
      </section>

      <footer class="footer">
        <button class="button ghost" :disabled="!prevStep" @click="go(prevStep)">Back</button>
        <button class="button" :disabled="!nextStep" @click="go(nextStep)">Next</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { WizardStore, type IWizardConfig } from '@wizzard-packages/core';

type Data = {
  name: string;
  plan: 'basic' | 'pro';
};

type StepId = 'intro' | 'plan' | 'pro' | 'review';

const config: IWizardConfig<Data, StepId> = {
  steps: [
    { id: 'intro', label: 'Intro', component: null },
    { id: 'plan', label: 'Plan', component: null },
    {
      id: 'pro',
      label: 'Pro',
      conditionDependsOn: ['plan'],
      condition: (data) => data.plan === 'pro',
    },
    { id: 'review', label: 'Review', component: null },
  ],
};

const store = new WizardStore<Data, StepId>({ name: '', plan: 'basic' });
store.dispatch({
  type: 'INIT',
  payload: { data: { name: '', plan: 'basic' }, config },
});

const snapshot = ref(store.getSnapshot());
let unsubscribe: (() => void) | null = null;

onMounted(() => {
  unsubscribe = store.subscribe(() => {
    snapshot.value = store.getSnapshot();
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

const plans = ['basic', 'pro'] as const;

const activeSteps = computed(() => snapshot.value.activeSteps);
const currentIndex = computed(() => snapshot.value.currentStepIndex);
const prevStep = computed(() => activeSteps.value[currentIndex.value - 1]?.id ?? null);
const nextStep = computed(() => activeSteps.value[currentIndex.value + 1]?.id ?? null);

const updateName = (name: string) => {
  store.update({ ...snapshot.value.data, name }, 'name');
};

const updatePlan = (plan: Data['plan']) => {
  store.update({ ...snapshot.value.data, plan }, 'plan');
};

const go = (stepId: StepId | null) => {
  if (stepId) {
    store.goToStep(stepId);
  }
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  padding: 24px;
}

.card {
  width: min(520px, 100%);
  background: white;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header h1 {
  margin: 0 0 6px;
  font-size: 24px;
}

.header p {
  margin: 0;
  color: #6b7280;
}

.progress {
  height: 6px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #4f46e5;
  transition: width 0.2s ease;
}

.content h2 {
  margin: 0 0 8px;
}

.muted {
  color: #6b7280;
  margin-bottom: 12px;
}

.label {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #6b7280;
  margin-bottom: 6px;
}

.input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 10px 12px;
}

.choice {
  display: flex;
  gap: 12px;
}

.chip {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: transparent;
  cursor: pointer;
}

.chip.active {
  border-color: #4f46e5;
  color: #4f46e5;
}

.code {
  background: #f9fafb;
  padding: 12px;
  border-radius: 12px;
  font-size: 12px;
}

.footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.button {
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}

.button.ghost {
  background: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
