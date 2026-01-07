import { createWizardFactory } from 'wizzard-stepper-react';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for tailwind classes */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. Define your data schema
interface BasicSchema {
  name: string;
  email: string;
}

// 2. Create typed wizard factory
const { 
  WizardProvider, 
  useWizardActions, 
  useWizardValue, 
  useWizardState 
} = createWizardFactory<BasicSchema>();

// 3. Components for steps
const Step1 = () => {
  const name = useWizardValue('name');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 1: Introduction</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={name || ''}
          onChange={(e) => setData('name', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="Enter your name"
        />
      </div>
    </div>
  );
};

const Step2 = () => {
  const email = useWizardValue('email');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 2: Contact</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          value={email || ''}
          onChange={(e) => setData('email', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="email@example.com"
        />
      </div>
    </div>
  );
};

const Step3 = () => {
  const { data } = useWizardState();

  return (
    <div className="space-y-4 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
      <h2 className="text-xl font-semibold text-gray-900">Step 3: Success!</h2>
      <div className="bg-gray-50 p-4 rounded-lg text-left">
        <p className="text-sm text-gray-600">Collected Data:</p>
        <pre className="mt-2 text-xs text-gray-800">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

// 4. Main Wizard Component
const MyWizard = () => {
  const { currentStepId, isFirstStep, isLastStep, progress } = useWizardState();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8">
          {/* Step Content */}
          <div className="min-h-[160px]">
            {currentStepId === 'step1' && <Step1 />}
            {currentStepId === 'step2' && <Step2 />}
            {currentStepId === 'step3' && <Step3 />}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={goToPrevStep}
              disabled={isFirstStep}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                isFirstStep ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            <button
              onClick={goToNextStep}
              disabled={isLastStep}
              className={cn(
                "flex items-center px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors",
                isLastStep && "hidden"
              )}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-400">
        Demo of wizzard-stepper-react basic usage
      </p>
    </div>
  );
};

// 5. Config
const config = {
  steps: [
    { id: 'step1', label: 'Intro' },
    { id: 'step2', label: 'Contact' },
    { id: 'step3', label: 'Review' },
  ]
};

export default function App() {
  return (
    <WizardProvider config={config}>
      <MyWizard />
    </WizardProvider>
  );
}
