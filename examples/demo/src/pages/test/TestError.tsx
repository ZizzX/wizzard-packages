import {
  WizardProvider,
  useWizard,
  useWizardActions,
  type IWizardConfig,
  type IValidatorAdapter,
  type ValidationResult,
  MemoryAdapter,
  WizardDevTools,
} from 'wizzard-stepper-react';
import { Card, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useMemo, useState } from 'react';

interface ErrorData {
  name?: string;
  email?: string;
  age?: string;
  username?: string;
  agreement?: boolean;
}

// Simple Adapter for demo purposes
class SimpleAdapter implements IValidatorAdapter<ErrorData> {
  private rules: Record<string, (val: unknown) => string | null | Promise<string | null>>;
  constructor(rules: Record<string, (val: unknown) => string | null | Promise<string | null>>) {
    this.rules = rules;
  }

  async validate(data: ErrorData): Promise<ValidationResult> {
    const errors: Record<string, string> = {};
    let isValid = true;

    for (const [field, validator] of Object.entries(this.rules)) {
      const val = (data as Record<string, unknown>)?.[field];
      const error = await validator(val);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    }

    return { isValid, errors };
  }
}

// Custom async validator
const checkUsername = async (username: unknown) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (username === 'taken-username') return 'Username is already taken';
  return null;
};

// --- Steps ---

const BasicInfoStep = () => {
  // Destructure state from useWizard
  const { data, allErrors, handleStepChange, activeSteps, currentStep } = useWizard<ErrorData>();
  const { goToStep } = useWizardActions();

  // Get errors for this step
  const stepErrors = allErrors['step-1'] || {};

  const nextStepIndex = activeSteps.findIndex((s) => s.id === currentStep?.id) + 1;
  const nextStepId = activeSteps[nextStepIndex]?.id;

  const skipValidation = () => {
    if (nextStepId) {
      // Use the new options signature to skip validation physically
      goToStep(nextStepId, undefined, { validate: false }).catch(() => {});
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Basic Information</h2>

      <Input
        data-testid="name-input"
        label="Name"
        value={data.name || ''}
        onChange={(e) => handleStepChange('name', e.target.value)}
        error={stepErrors.name}
        data-testid-error="name-error"
      />

      <Input
        data-testid="email-input"
        label="Email"
        value={data.email || ''}
        onChange={(e) => handleStepChange('email', e.target.value)}
        error={stepErrors.email}
        data-testid-error="email-error"
      />

      <Input
        data-testid="age-input"
        label="Age"
        type="number"
        value={data.age || ''}
        onChange={(e) => handleStepChange('age', e.target.value)}
        error={stepErrors.age}
        data-testid-error="age-error"
      />

      <div className="pt-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={skipValidation}
          data-testid="skip-validation"
        >
          Skip Validation (Auto-Fill)
        </Button>
      </div>
    </div>
  );
};

const AsyncStep = () => {
  const { data, allErrors, handleStepChange, activeSteps, currentStep } = useWizard<ErrorData>();
  const { goToStep } = useWizardActions();

  // Errors for step-2
  const stepErrors = allErrors['step-2'] || {};

  const nextStepIndex = activeSteps.findIndex((s) => s.id === currentStep?.id) + 1;
  const nextStepId = activeSteps[nextStepIndex]?.id;

  const skipValidation = () => {
    if (nextStepId) {
      goToStep(nextStepId, undefined, { validate: false }).catch(() => {});
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Async Validation</h2>
      <p className="text-sm text-gray-500">Try 'taken-username' to trigger error.</p>

      <Input
        data-testid="username-input"
        label="Username"
        value={data.username || ''}
        onChange={(e) => handleStepChange('username', e.target.value)}
        error={stepErrors.username}
        data-testid-error="username-error"
      />

      <div className="pt-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={skipValidation}
          data-testid="skip-validation"
        >
          Skip Validation (Auto-Fill)
        </Button>
      </div>
    </div>
  );
};

const ReviewStep = () => {
  const { data, errors } = useWizard<ErrorData>();
  const { validateAll } = useWizardActions();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Flatten errors to list
  // The library provides `errors` keyed by path.
  const errorList = Object.entries(errors).map(([field, msg]) => `${field}: ${msg}`);

  console.log('errors', errors);

  const handleSubmit = async () => {
    setSubmitAttempted(true);
    await validateAll();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Review & Submit</h2>

      <pre className="bg-gray-100 p-2 rounded text-xs">{JSON.stringify(data, null, 2)}</pre>

      {submitAttempted && errorList.length > 0 && (
        <div className="bg-red-50 p-4 rounded border border-red-200" data-testid="error-summary">
          <h3 className="text-red-800 font-bold mb-2">Please fix errors:</h3>
          <ul className="list-disc pl-4 text-red-700">
            {errorList.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <Button
        data-testid="submit-button"
        onClick={handleSubmit}
        variant="primary"
        className="w-full"
      >
        Submit
      </Button>
    </div>
  );
};

const WizardContent = () => {
  const { currentStep, activeSteps, allErrors } = useWizard<ErrorData>();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  return (
    <div data-testid="wizard-container" className="max-w-md mx-auto py-8">
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {activeSteps.map((s, i) => {
          const stepErrors = allErrors[s.id];
          const hasError = stepErrors && Object.keys(stepErrors).length > 0;
          const isCompleted =
            i < activeSteps.findIndex((step) => step.id === currentStep?.id) && !hasError;

          return (
            <div
              key={s.id}
              data-testid={`breadcrumb-${s.id}`}
              className={`text-xs p-1 whitespace-nowrap 
                            ${s.id === currentStep?.id ? 'font-bold bg-gray-100 rounded' : ''}
                            ${hasError ? 'text-red-600 font-bold error invalid' : ''} 
                            ${isCompleted ? 'text-green-600 completed' : ''}
                        `}
            >
              {s.label}
            </div>
          );
        })}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div data-testid="current-step" className="text-xs text-gray-400 mb-2">
            Step {activeSteps.findIndex((s) => s.id === currentStep?.id) + 1}
          </div>

          {currentStep?.id === 'step-1' && <BasicInfoStep />}
          {currentStep?.id === 'step-2' && <AsyncStep />}
          {currentStep?.id === 'step-3' && <ReviewStep />}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button data-testid="prev-button" onClick={goToPrevStep} variant="secondary">
            Back
          </Button>
          <Button data-testid="next-button" onClick={goToNextStep} variant="primary">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default function TestError() {
  const config = useMemo<IWizardConfig<ErrorData>>(
    () => ({
      persistence: { mode: 'onStepChange', adapter: new MemoryAdapter() },
      steps: [
        {
          id: 'step-1',
          label: 'Basic Info',
          validationAdapter: new SimpleAdapter({
            name: (val) => (!val ? 'Name is required' : null),
            email: (val) =>
              !val || (typeof val === 'string' && !val.includes('@')) ? 'Invalid email' : null,
            age: (val) => {
              if (!val) return null;
              const num = parseInt(val as string);
              if (isNaN(num) || num < 0) return 'Invalid age';
              return null;
            },
          }),
        },
        {
          id: 'step-2',
          label: 'Username',
          validationAdapter: new SimpleAdapter({
            username: checkUsername,
          }),
        },
        {
          id: 'step-3',
          label: 'Review',
        },
      ],
    }),
    []
  );

  return (
    <WizardProvider config={config}>
      <WizardContent />
      <WizardDevTools />
    </WizardProvider>
  );
}
