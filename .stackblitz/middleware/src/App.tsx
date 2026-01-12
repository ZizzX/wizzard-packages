import { createWizardFactory } from '@wizzard-packages/react';
import { devToolsMiddleware } from '@wizzard-packages/middleware';
import type { WizardMiddleware } from '@wizzard-packages/core';

interface FlowData {
  company: string;
  role: string;
}

const analyticsMiddleware: WizardMiddleware = (_api) => (next) => (action) => {
  const result = next(action);
  if (typeof window !== 'undefined') {
    const events = (window as any).__wizardEvents ?? [];
    (window as any).__wizardEvents = [...events, action.type];
  }
  console.log('[Wizard]', action.type, action.payload ?? '');
  return result;
};

const {
  WizardProvider,
  useWizardActions,
  useWizardValue,
  useWizardState,
} = createWizardFactory<FlowData>();

const StepCompany = () => {
  const company = useWizardValue('company');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Custom middleware</h2>
      <p className="text-sm text-gray-500">
        Actions are logged by your middleware (check the console).
      </p>
      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          value={company || ''}
          onChange={(e) => setData('company', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="Wizard Labs"
        />
      </div>
    </div>
  );
};

const StepRole = () => {
  const role = useWizardValue('role');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Role</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          value={role || ''}
          onChange={(e) => setData('role', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="Engineer"
        />
      </div>
    </div>
  );
};

const config = {
  middlewares: [analyticsMiddleware, devToolsMiddleware],
  steps: [
    { id: 'company', label: 'Company' },
    { id: 'role', label: 'Role' },
  ],
};

const WizardCard = () => {
  const { currentStepId, isFirstStep, isLastStep } = useWizardState();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <div className="min-h-[160px]">
        {currentStepId === 'company' && <StepCompany />}
        {currentStepId === 'role' && <StepRole />}
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
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <WizardProvider config={config}>
        <WizardCard />
      </WizardProvider>
    </div>
  );
}
