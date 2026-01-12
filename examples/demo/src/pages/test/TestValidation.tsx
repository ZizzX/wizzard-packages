import {
  WizardProvider,
  useWizardState,
  useWizardActions,
  useWizardValue,
  useWizardError,
  type ValidationWizardSchema,
  wizardConfig,
} from '../../wizards/validation-wizard';
import { Button } from '../../components/ui/Button';
import { CardContent } from '../../components/ui/Card';

const PersonalStep = () => {
  const fullName = useWizardValue('personal.fullName');
  const email = useWizardValue('personal.email');
  const nameError = useWizardError('personal.fullName');
  const emailError = useWizardError('personal.email');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          data-testid="name-input"
          value={fullName || ''}
          onChange={(e) => setData('personal.fullName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {nameError && (
          <div data-testid="name-error" className="text-red-600 text-sm mt-1">
            {nameError}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          data-testid="email-input"
          value={email || ''}
          onChange={(e) => setData('personal.email', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {emailError && (
          <div data-testid="email-error" className="text-red-600 text-sm mt-1">
            {emailError}
          </div>
        )}
      </div>
    </div>
  );
};

const AccountStep = () => {
  const username = useWizardValue('account.username');
  const password = useWizardValue('account.password');
  const usernameError = useWizardError('account.username');
  const passwordError = useWizardError('account.password');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          data-testid="username-input"
          value={username || ''}
          onChange={(e) => setData('account.username', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {usernameError && (
          <div data-testid="username-error" className="text-red-600 text-sm mt-1">
            {usernameError}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          data-testid="password-input"
          type="password"
          value={password || ''}
          onChange={(e) => setData('account.password', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {passwordError && (
          <div data-testid="password-error" className="text-red-600 text-sm mt-1">
            {passwordError}
          </div>
        )}
      </div>
    </div>
  );
};

const ReviewStep = () => <div>Review Step</div>;

const WizardContent = () => {
  const { currentStep, errorSteps } = useWizardState();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  if (!currentStep) return null;

  const isStepValid = !errorSteps.has(currentStep.id);

  return (
    <div data-testid="wizard-container" className="max-w-md mx-auto py-10">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <span className="font-bold">Current Step: </span>
          <span data-testid="current-step-id">{currentStep.id}</span>
        </div>

        <div className="mb-6">
          <span className="font-bold">Step Valid: </span>
          <span data-testid="step-validity">{isStepValid ? 'Yes' : 'No'}</span>
        </div>

        <CardContent className="pt-6 min-h-50">
          {currentStep.id === 'personal' && <PersonalStep />}
          {currentStep.id === 'account' && <AccountStep />}
          {currentStep.id === 'review' && <ReviewStep />}
        </CardContent>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button data-testid="prev-button" onClick={goToPrevStep} variant="secondary">
            Previous
          </Button>
          <Button data-testid="next-button" onClick={goToNextStep}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function TestValidation() {
  return (
    <WizardProvider
      key="validation-test"
      config={wizardConfig}
      initialData={
        {
          personal: { fullName: '', email: '' },
          account: { username: '', password: '' },
          review: {},
        } satisfies ValidationWizardSchema
      }
    >
      <WizardContent />
    </WizardProvider>
  );
}
