import { createWizardFactory } from '@wizzard-packages/react';
import type { IValidatorAdapter, ValidationResult } from '@wizzard-packages/core';

interface FormData {
  username: string;
}

class UsernameAdapter implements IValidatorAdapter<FormData> {
  validate(data: FormData): ValidationResult {
    const errors: Record<string, string> = {};
    if (!data.username || data.username.length < 3) {
      errors.username = 'Username must be at least 3 characters.';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  }
}

const {
  WizardProvider,
  useWizardActions,
  useWizardValue,
  useWizardError,
  useWizardState,
} = createWizardFactory<FormData>();

const StepProfile = () => {
  const username = useWizardValue('username');
  const error = useWizardError('username');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Custom adapter</h2>
      <p className="text-sm text-gray-500">
        Validation is powered by your own adapter class.
      </p>
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={username || ''}
          onChange={(e) => setData('username', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="wizzard"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

const StepDone = () => {
  const { data } = useWizardState();

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-semibold">Looks good!</h2>
      <p className="text-sm text-gray-600">Custom adapter validated:</p>
      <pre className="bg-gray-50 p-3 rounded-lg text-left text-xs text-gray-800">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

const config = {
  steps: [
    {
      id: 'profile',
      label: 'Profile',
      validationAdapter: new UsernameAdapter(),
      validationMode: 'onChange' as const,
    },
    { id: 'done', label: 'Done' },
  ],
};

const WizardCard = () => {
  const { currentStepId, isFirstStep, isLastStep } = useWizardState();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <div className="min-h-[160px]">
        {currentStepId === 'profile' && <StepProfile />}
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
