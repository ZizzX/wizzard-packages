import { createWizardFactory } from '@wizzard-packages/react';
import { ZodAdapter } from '@wizzard-packages/adapter-zod';
import { z } from 'zod';
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. Define Schema with Zod
const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  age: z.number({ invalid_type_error: 'Age must be a number' }).min(18, 'Must be 18 or older'),
});

type UserSchema = z.infer<typeof userSchema>;

// 2. Factory
const {
  WizardProvider,
  useWizardActions,
  useWizardValue,
  useWizardError,
  useWizardState
} = createWizardFactory<UserSchema>();

// 3. Step Components
const Step1 = () => {
  const username = useWizardValue('username');
  const error = useWizardError('username');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">User Info</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={username || ''}
          onChange={(e) => setData('username', e.target.value)}
          className={cn(
            "mt-1 block w-full rounded-md border shadow-sm sm:text-sm p-2 outline-none",
            error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          )}
        />
        {error && (
          <p className="mt-1 text-xs text-red-600 flex items-center">
            <AlertCircle className="mr-1 h-3 w-3" /> {error}
          </p>
        )}
      </div>
    </div>
  );
};

const Step2 = () => {
  const age = useWizardValue('age');
  const error = useWizardError('age');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Age Verification</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Your Age</label>
        <input
          type="number"
          value={age || ''}
          onChange={(e) => setData('age', Number(e.target.value))}
          className={cn(
            "mt-1 block w-full rounded-md border shadow-sm sm:text-sm p-2 outline-none",
            error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          )}
        />
        {error && (
          <p className="mt-1 text-xs text-red-600 flex items-center">
            <AlertCircle className="mr-1 h-3 w-3" /> {error}
          </p>
        )}
      </div>
    </div>
  );
};

// 4. Wizard Config
const config = {
  steps: [
    {
      id: 'info',
      label: 'Info',
      validationAdapter: new ZodAdapter(userSchema.pick({ username: true }))
    },
    {
      id: 'age',
      label: 'Age',
      validationAdapter: new ZodAdapter(userSchema.pick({ age: true }))
    },
  ]
};

const MyWizard = () => {
  const { currentStepId, isLastStep, progress, isPending } = useWizardState();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600" style={{ width: `${progress}%` }} />
        </div>

        {currentStepId === 'info' && <Step1 />}
        {currentStepId === 'age' && <Step2 />}

        <div className="mt-8 flex justify-between">
          <button onClick={goToPrevStep} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800">
            Back
          </button>
          <button
            onClick={goToNextStep}
            disabled={isPending}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isPending ? 'Validating...' : isLastStep ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <WizardProvider config={config}>
      <MyWizard />
    </WizardProvider>
  );
}
