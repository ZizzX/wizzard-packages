import { useState } from "react";
import {
  type IWizardConfig,
  type IValidatorAdapter,
  type ValidationResult,
  MemoryAdapter,
  createWizardFactory,
  WizardDevTools,
  devToolsMiddleware,
  useWizardError,
} from "wizzard-stepper-react";
import { Card, CardContent, CardFooter } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { cn } from "../../lib/utils";
import { useSearchParams } from "react-router-dom";

// Advanced validation demo with 10 steps
interface AdvancedValidationData {
  // Step 1
  name?: string;
  email?: string;

  // Step 2
  username?: string;
  password?: string;

  // Step 3
  age?: number;
  country?: string;

  // Step 4
  phone?: string;
  company?: string;

  // Step 5
  address?: string;
  city?: string;

  // Step 6
  zipCode?: string;
  state?: string;

  // Step 7
  accountType?: string;
  subscription?: string;

  // Step 8
  paymentMethod?: string;
  cardNumber?: string;

  // Step 9
  terms?: boolean;
  newsletter?: boolean;

  // Step 10 - Review
}

const { WizardProvider, useWizard, useWizardActions } =
  createWizardFactory<AdvancedValidationData>();

// Simple validation adapter
class SimpleAdapter implements IValidatorAdapter<AdvancedValidationData> {
  private rules: Record<
    string,
    (
      val: AdvancedValidationData[keyof AdvancedValidationData],
      data: AdvancedValidationData
    ) => string | null | Promise<string | null>
  >;

  constructor(
    rules: Record<
      string,
      (
        val: AdvancedValidationData[keyof AdvancedValidationData],
        data: AdvancedValidationData
      ) => string | null | Promise<string | null>
    >
  ) {
    this.rules = rules;
  }

  async validate(data: AdvancedValidationData): Promise<ValidationResult> {
    const errors: Record<string, string> = {};

    // ⚡ Parallel validation - all validators run simultaneously
    const validationPromises = Object.entries(this.rules).map(
      async ([field, validator]) => {
        const val = data[field as keyof AdvancedValidationData];
        const error = await validator(val, data);
        return { field, error };
      }
    );

    // Wait for all validations to complete
    const results = await Promise.all(validationPromises);

    // Collect errors
    let isValid = true;
    for (const { field, error } of results) {
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    }

    return { isValid, errors };
  }
}

// Async validators
const checkEmailExists = async (email: string) => {
  // Reduced delay for better UX (was 1000ms)
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (email === "taken@example.com") return "Email already exists";
  return null;
};

const checkUsernameAvailable = async (username: string) => {
  // Reduced delay for better UX (was 800ms)
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (username === "admin") return "Username not available";
  return null;
};

const getFilledAllFields = (): Partial<AdvancedValidationData> => {
  return {
    name: "Auto Generated Name",
    email: "auto@example.com",
    username: "autouser123",
    password: "SecurePass123!",
    age: 30,
    country: "US",
    phone: "+1234567890",
    company: "Auto Corp",
    address: "123 Auto Street",
    city: "Auto City",
    zipCode: "12345",
    state: "CA",
    accountType: "premium",
    subscription: "yearly",
    paymentMethod: "credit_card",
    cardNumber: "4111111111111111",
    terms: true,
    newsletter: true,
  };
};

// Auto-fill function (async)
const autoFillAllFields = async (): Promise<
  Partial<AdvancedValidationData>
> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return getFilledAllFields();
};

// Error Modal Component
const ErrorModal = ({
  errors,
  onClose,
  onNavigate,
}: {
  errors: Record<string, Record<string, string>>;
  onClose: () => void;
  onNavigate: (stepId: string) => void;
}) => {
  const errorSteps = Object.keys(errors)
    .filter((stepId) => Object.keys(errors[stepId]).length > 0)
    .sort((a, b) => {
      const stepA = parseInt(a.replace("step-", ""));
      const stepB = parseInt(b.replace("step-", ""));
      return stepA - stepB;
    });

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-testid="error-modal"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto position-sticky top-0">
        <h2 className="text-xl font-bold mb-4 text-red-600">
          Validation Errors
        </h2>
        <p className="mb-4">
          Found <span data-testid="error-count">{errorSteps.length}</span>{" "}
          step(s) with errors:
        </p>

        <div className="space-y-2 mb-6">
          {errorSteps.map((stepId, index) => (
            <div
              key={stepId}
              data-testid={`error-${stepId}`}
              className={cn(
                "p-3 bg-red-50 border border-red-200 rounded cursor-pointer hover:bg-red-100",
                {
                  "opacity-50": index > 0,
                  "cursor-not-allowed": index > 0,
                }
              )}
              onClick={() => {
                if (index > 0) return;
                onNavigate(stepId);
                onClose();
              }}
            >
              <div className="font-semibold">{stepId}</div>
              <ul className="text-sm text-red-700 mt-1">
                {Object.entries(errors[stepId]).map(([field, msg]) => (
                  <li key={field}>
                    • {field}: {msg}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Button onClick={onClose} variant="secondary" className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
};

// Step Components
const Step1 = () => {
  const { data, allErrors } = useWizard();
  const { handleStepChange } = useWizard();
  const stepErrors = allErrors["step-1"] || {};

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 1: Personal Info</h2>

      <Input
        data-testid="name-input"
        label="Name"
        value={data.name || ""}
        onChange={(e) => handleStepChange("name", e.target.value)}
        error={stepErrors.name}
        className={stepErrors.name ? "error invalid border-red-500" : ""}
      />

      <Input
        data-testid="email-input"
        label="Email"
        type="email"
        value={data.email || ""}
        onChange={(e) => handleStepChange("email", e.target.value)}
        error={stepErrors.email}
        className={stepErrors.email ? "error invalid border-red-500" : ""}
      />
    </div>
  );
};

const Step2 = () => {
  const { data, allErrors, handleStepChange } = useWizard();
  const stepErrors = allErrors["step-2"] || {};

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 2: Account</h2>

      <Input
        data-testid="username-input"
        label="Username"
        value={data.username || ""}
        onChange={(e) => handleStepChange("username", e.target.value)}
        error={stepErrors.username}
        className={stepErrors.username ? "error invalid border-red-500" : ""}
      />

      <Input
        data-testid="password-input"
        label="Password"
        type="password"
        value={data.password || ""}
        onChange={(e) => handleStepChange("password", e.target.value)}
        error={stepErrors.password}
        className={stepErrors.password ? "error invalid border-red-500" : ""}
      />
    </div>
  );
};

const Step3 = () => {
  const { data, allErrors, handleStepChange } = useWizard();

  const stepErrors = allErrors["step-3"] || {};

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 3: Demographics</h2>

      <Input
        data-testid="age-input"
        label="Age"
        type="number"
        value={data.age?.toString() || ""}
        onChange={(e) => handleStepChange("age", parseInt(e.target.value))}
        error={stepErrors.age}
      />

      <select
        data-testid="country-select"
        value={data.country || ""}
        onChange={(e) => handleStepChange("country", e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Country</option>
        <option value="US">United States</option>
        <option value="UK">United Kingdom</option>
        <option value="CA">Canada</option>
      </select>
      {stepErrors.country && (
        <div data-testid="country-error" className="text-red-600 text-sm">
          {stepErrors.country}
        </div>
      )}
    </div>
  );
};

// Steps 4-10 (simplified for brevity)
const Step4 = () => {
  const { data, allErrors, handleStepChange } = useWizard();
  const stepErrors = allErrors["step-4"] || {};

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 4: Contact</h2>
      <Input
        data-testid="phone-input"
        label="Phone"
        value={data.phone || ""}
        onChange={(e) => handleStepChange("phone", e.target.value)}
        error={stepErrors.phone}
        className={stepErrors.phone ? "error invalid border-red-500" : ""}
      />
      <Input
        data-testid="company-input"
        label="Company"
        value={data.company || ""}
        onChange={(e) => handleStepChange("company", e.target.value)}
        error={stepErrors.company}
      />
    </div>
  );
};

const Step5 = () => {
  const { data, allErrors, handleStepChange } = useWizard();
  const stepErrors = allErrors["step-5"] || {};

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 5: Address</h2>
      <Input
        data-testid="address-input"
        label="Address"
        value={data.address || ""}
        onChange={(e) => handleStepChange("address", e.target.value)}
        error={stepErrors.address}
        className={stepErrors.address ? "error invalid border-red-500" : ""}
      />
      <Input
        data-testid="city-input"
        label="City"
        value={data.city || ""}
        onChange={(e) => handleStepChange("city", e.target.value)}
        error={stepErrors.city}
      />
    </div>
  );
};

const Step6 = () => {
  const { data, allErrors, handleStepChange } = useWizard();
  const stepErrors = allErrors["step-6"] || {};

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 6: Location Details</h2>
      <Input
        data-testid="zipcode-input"
        label="Zip Code"
        value={data.zipCode || ""}
        onChange={(e) => handleStepChange("zipCode", e.target.value)}
        error={stepErrors.zipCode}
      />
      <Input
        data-testid="state-input"
        label="State"
        value={data.state || ""}
        onChange={(e) => handleStepChange("state", e.target.value)}
        error={stepErrors.state}
      />
    </div>
  );
};

const Step7 = () => {
  const { data, allErrors, handleStepChange } = useWizard();
  const stepErrors = allErrors["step-7"] || {};

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 7: Account Type</h2>
      <select
        data-testid="account-type-select"
        value={data.accountType || ""}
        onChange={(e) => handleStepChange("accountType", e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Type</option>
        <option value="basic">Basic</option>
        <option value="premium">Premium</option>
      </select>
      <Input
        data-testid="subscription-input"
        label="Subscription"
        value={data.subscription || ""}
        onChange={(e) => handleStepChange("subscription", e.target.value)}
        error={stepErrors.subscription}
      />
    </div>
  );
};

const Step8 = () => {
  const { data, allErrors, handleStepChange } = useWizard();
  const stepErrors = allErrors["step-8"] || {};

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 8: Payment</h2>
      <Input
        data-testid="payment-method-input"
        label="Payment Method"
        value={data.paymentMethod || ""}
        onChange={(e) => handleStepChange("paymentMethod", e.target.value)}
        error={stepErrors.paymentMethod}
      />
      <Input
        data-testid="card-number-input"
        label="Card Number"
        value={data.cardNumber || ""}
        onChange={(e) => handleStepChange("cardNumber", e.target.value)}
        error={stepErrors.cardNumber}
      />
    </div>
  );
};

const Step9 = () => {
  const { data, handleStepChange } = useWizard();
  const termsError = useWizardError("terms");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 9: Preferences</h2>
      <label className="flex items-center gap-2">
        <input
          data-testid="terms-checkbox"
          type="checkbox"
          checked={data.terms || false}
          onChange={(e) => handleStepChange("terms", e.target.checked)}
        />
        Accept Terms
      </label>
      {termsError && (
        <div data-testid="terms-error" className="text-red-600 text-sm">
          {termsError}
        </div>
      )}
      <label className="flex items-center gap-2">
        <input
          data-testid="newsletter-checkbox"
          type="checkbox"
          checked={data.newsletter || false}
          onChange={(e) => handleStepChange("newsletter", e.target.checked)}
        />
        Subscribe to Newsletter
      </label>
    </div>
  );
};

const Step10 = () => {
  const { data } = useWizard();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 10: Review</h2>
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

// Main Wizard Content
const WizardContent = () => {
  const { currentStep, activeSteps, allErrors, isBusy } = useWizard();
  const { goToNextStep, goToPrevStep, updateData, reset, validateAll } =
    useWizardActions();
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [showNavigationError] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, Record<string, string>>
  >({});
  const { goToStep } = useWizardActions();

  const handleAutoFillAsync = async () => {
    setIsAutoFilling(true);
    const filledData = await autoFillAllFields();
    await updateData(filledData);
    await validateAll();
    setIsAutoFilling(false);
  };

  const handleAutoFillSync = () => {
    const filledData = getFilledAllFields();
    updateData(filledData);
    validateAll();
  };

  const handleValidateAll = async () => {
    const result = await validateAll();
    if (!result.isValid) {
      setValidationErrors(result.errors);
      setShowErrorModal(true);
    }
  };

  const handleClearCurrent = () => {
    // Clear only current step fields
    const currentStepId = currentStep?.id;
    if (currentStepId === "step-1") {
      updateData({ name: undefined, email: undefined });
    } else if (currentStepId === "step-2") {
      updateData({ username: undefined, password: undefined });
    } else if (currentStepId === "step-3") {
      updateData({ age: undefined, country: undefined });
    } else if (currentStepId === "step-4") {
      updateData({ phone: undefined, company: undefined });
    } else if (currentStepId === "step-5") {
      updateData({ address: undefined, city: undefined });
    } else if (currentStepId === "step-6") {
      updateData({ zipCode: undefined, state: undefined });
    } else if (currentStepId === "step-7") {
      updateData({ accountType: undefined, subscription: undefined });
    } else if (currentStepId === "step-8") {
      updateData({ paymentMethod: undefined, cardNumber: undefined });
    } else if (currentStepId === "step-9") {
      updateData({ terms: undefined, newsletter: undefined });
    }
  };

  const handleClearAll = () => {
    reset();
  };


  return (
    <div data-testid="wizard-container" className="max-w-2xl mx-auto py-8">
      {/* Auto-fill controls */}
      <div className="mb-4 flex gap-2">
        <Button
          data-testid="auto-fill-button"
          onClick={handleAutoFillSync}
          variant="secondary"
          size="sm"
        >
          Auto-Fill (Sync)
        </Button>
        <Button
          data-testid="async-auto-fill-button"
          onClick={handleAutoFillAsync}
          variant="secondary"
          size="sm"
          disabled={isAutoFilling}
        >
          {isAutoFilling ? "Filling..." : "Auto-Fill (Async)"}
        </Button>
        <Button
          data-testid="clear-current-step-button"
          onClick={handleClearCurrent}
          variant="secondary"
          size="sm"
        >
          Clear Current
        </Button>
        <Button
          data-testid="clear-all-button"
          onClick={handleClearAll}
          variant="secondary"
          size="sm"
        >
          Clear All
        </Button>
        <Button
          data-testid="validate-all-button"
          onClick={handleValidateAll}
          variant="secondary"
          size="sm"
        >
          Validate All
        </Button>
      </div>

      {/* Auto-fill loader */}
      {isAutoFilling && (
        <div
          data-testid="auto-fill-loader"
          className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded"
        >
          Loading data...
        </div>
      )}

      {/* Validation loader */}
      {isBusy && (
        <div
          data-testid="validation-loader"
          className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded"
        >
          Validating...
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {activeSteps.map((s) => {
          const stepErrors = allErrors[s.id];
          const hasError = stepErrors && Object.keys(stepErrors).length > 0;

          return (
            <div
              key={s.id}
              data-testid={`breadcrumb-${s.id}`}
              onClick={() => goToStep(s.id)}
              className={`text-xs p-2 whitespace-nowrap rounded cursor-pointer ${
                s.id === currentStep?.id
                  ? "font-bold bg-blue-100"
                  : "bg-gray-100"
              } ${hasError ? "bg-red-100 text-red-600 error invalid" : ""}`}
            >
              {s.label}
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div
          data-testid="progress-bar"
          className="h-2 bg-blue-500 rounded"
          style={{
            width: `${((activeSteps.findIndex((s) => s.id === currentStep?.id) + 1) / activeSteps.length) * 100}%`,
          }}
          aria-valuenow={
            ((activeSteps.findIndex((s) => s.id === currentStep?.id) + 1) /
              activeSteps.length) *
            100
          }
        />
      </div>

      {/* Navigation error message */}
      {showNavigationError && (
        <div
          data-testid="navigation-error-message"
          className="mb-4 p-4 bg-red-50 border border-red-200 rounded"
        >
          Please fix errors on previous steps before continuing.
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <div
            data-testid="current-step"
            className="text-sm text-gray-500 mb-4"
          >
            Step {activeSteps.findIndex((s) => s.id === currentStep?.id) + 1} of{" "}
            {activeSteps.length}
          </div>

          {currentStep?.id === "step-1" && <Step1 />}
          {currentStep?.id === "step-2" && <Step2 />}
          {currentStep?.id === "step-3" && <Step3 />}
          {currentStep?.id === "step-4" && <Step4 />}
          {currentStep?.id === "step-5" && <Step5 />}
          {currentStep?.id === "step-6" && <Step6 />}
          {currentStep?.id === "step-7" && <Step7 />}
          {currentStep?.id === "step-8" && <Step8 />}
          {currentStep?.id === "step-9" && <Step9 />}
          {currentStep?.id === "step-10" && <Step10 />}

          {showErrorModal && (
            <ErrorModal
              errors={validationErrors}
              onClose={() => setShowErrorModal(false)}
              onNavigate={(stepId) => goToStep(stepId)}
            />
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            data-testid="prev-button"
            onClick={goToPrevStep}
            variant="secondary"
          >
            Previous
          </Button>
          <Button
            data-testid="next-button"
            onClick={goToNextStep}
            variant="primary"
          >
            {currentStep?.id === "step-10" ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      </Card>

      {/* Step indicators for testing */}
      <div className="hidden">
        {activeSteps.map((s) => (
          <div key={s.id} data-testid="step-indicator">
            {s.id}
          </div>
        ))}
      </div>
    </div>
  );
};

const config: IWizardConfig<AdvancedValidationData> = {
  persistence: { mode: "onStepChange", adapter: new MemoryAdapter() },
  validationMode: "onChange",
  middlewares: [devToolsMiddleware],
  steps: [
    {
      id: "step-1",
      label: "Personal",
      validationAdapter: new SimpleAdapter({
        name: (val) =>
          !val
            ? "Name is required"
            : String(val).length < 3
              ? "Name must be at least 3 chars"
              : null,
        email: (val) => {
          return !val
            ? "Email is required"
            : !String(val).includes("@")
              ? "Invalid email"
              : checkEmailExists(val as string);
        },
      }),
    },
    {
      id: "step-2",
      label: "Account",
      validationAdapter: new SimpleAdapter({
        username: (val) =>
          !val
            ? "Username is required"
            : String(val).length < 3
              ? "Username too short"
              : checkUsernameAvailable(val as string),
        password: (val) =>
          !val
            ? "Password is required"
            : String(val).length < 8
              ? "Password must be at least 8 chars"
              : null,
      }),
    },
    {
      id: "step-3",
      label: "Demographics",
      validationAdapter: new SimpleAdapter({
        age: (val) => (!val || Number(val) < 18 ? "Must be 18 or older" : null),
        country: (val) => (!val ? "Country is required" : null),
      }),
    },
    {
      id: "step-4",
      label: "Contact",
      validationAdapter: new SimpleAdapter({
        phone: (val) => (!val ? "Phone is required" : null),
      }),
    },
    {
      id: "step-5",
      label: "Address",
      validationAdapter: new SimpleAdapter({
        address: (val) => (!val ? "Address is required" : null),
        city: (val) => (!val ? "City is required" : null),
      }),
    },
    {
      id: "step-6",
      label: "Location",
      validationAdapter: new SimpleAdapter({
        zipCode: (val) => (!val ? "Zip code is required" : null),
      }),
    },
    {
      id: "step-7",
      label: "Account Type",
      validationAdapter: new SimpleAdapter({
        accountType: (val) => (!val ? "Account type is required" : null),
      }),
    },
    {
      id: "step-8",
      label: "Payment",
      validationAdapter: new SimpleAdapter({
        paymentMethod: (val) => (!val ? "Payment method is required" : null),
      }),
    },
    {
      id: "step-9",
      label: "Preferences",
      validationAdapter: new SimpleAdapter({
        terms: (val) => (!val ? "You must accept terms" : null),
      }),
    },
    {
      id: "step-10",
      label: "Review",
    },
  ],
};

export default function TestAdvancedValidation() {
    const searchParams = useSearchParams();
    const navigationMode = searchParams[0].get("navigationMode") as IWizardConfig<AdvancedValidationData>["navigationMode"] || "onStepChange";
 
  return (
    <WizardProvider config={{...config, navigationMode: navigationMode as any}}>
      <WizardContent />
      <WizardDevTools />
    </WizardProvider>
  );
}
