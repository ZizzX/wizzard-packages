import { createWizardFactory } from '@wizzard-packages/react';
import { ZodAdapter } from '@wizzard-packages/adapter-zod';
import { LocalStorageAdapter } from '@wizzard-packages/persistence';
import { z } from 'zod';

interface FlowData {
  email: string;
  plan: 'basic' | 'pro';
  notes: string;
}

const schema = z.object({
  email: z.string().email('Enter a valid email'),
});

const {
  WizardProvider,
  useWizardActions,
  useWizardValue,
  useWizardState,
  useWizardError,
} = createWizardFactory<FlowData>();

const StepEmail = () => {
  const email = useWizardValue('email');
  const error = useWizardError('email');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Start</h2>
      <p className="text-sm text-gray-500">Async validation + branching later.</p>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email || ''}
          onChange={(e) => setData('email', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="you@company.com"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

const StepPlan = () => {
  const plan = useWizardValue('plan');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Choose a plan</h2>
      <p className="text-sm text-gray-500">Pro unlocks an extra step.</p>
      <div className="flex gap-3">
        {(['basic', 'pro'] as const).map((value) => (
          <button
            key={value}
            onClick={() => setData('plan', value)}
            className={`px-4 py-2 rounded-lg border text-sm ${
              plan === value ? 'border-indigo-600 text-indigo-600' : 'text-gray-600'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

const StepPro = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Pro step</h2>
    <p className="text-sm text-gray-500">
      This step is conditionally rendered for Pro users.
    </p>
  </div>
);

const StepNotes = () => {
  const notes = useWizardValue('notes');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Final notes</h2>
      <textarea
        value={notes || ''}
        onChange={(e) => setData('notes', e.target.value)}
        className="w-full h-24 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Optional notes..."
      />
    </div>
  );
};

const StepDone = () => {
  const { data } = useWizardState();
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-semibold">All set</h2>
      <pre className="bg-gray-50 p-3 rounded-lg text-left text-xs text-gray-800">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

const config = {
  persistence: {
    adapter: new LocalStorageAdapter('adv_flow_'),
    mode: 'onChange' as const,
  },
  steps: [
    {
      id: 'email',
      label: 'Email',
      validationAdapter: new ZodAdapter(schema),
    },
    { id: 'plan', label: 'Plan' },
    {
      id: 'pro',
      label: 'Pro',
      conditionDependsOn: ['plan'],
      showWhilePending: true,
      condition: async (data: FlowData) => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return data.plan === 'pro';
      },
    },
    {
      id: 'notes',
      label: 'Notes',
      beforeLeave: async (data: FlowData) => {
        if (data.notes) {
          return window.confirm('You added notes. Leave this step?');
        }
        return true;
      },
    },
    { id: 'done', label: 'Done' },
  ],
};

const WizardCard = () => {
  const { currentStepId, isFirstStep, isLastStep, progress } = useWizardState();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="h-2 bg-gray-100">
        <div
          className="h-full bg-indigo-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="p-8">
        <div className="min-h-[160px]">
          {currentStepId === 'email' && <StepEmail />}
          {currentStepId === 'plan' && <StepPlan />}
          {currentStepId === 'pro' && <StepPro />}
          {currentStepId === 'notes' && <StepNotes />}
          {currentStepId === 'done' && <StepDone />}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={goToPrevStep}
            disabled={isFirstStep}
            className="px-4 py-2 text-sm rounded-lg border text-gray-600 disabled:opacity-40"
          >
            Back
          </button>
          <button
            onClick={goToNextStep}
            disabled={isLastStep}
            className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <WizardProvider config={config} initialData={{ plan: 'basic' }}>
        <WizardCard />
      </WizardProvider>
    </div>
  );
}
