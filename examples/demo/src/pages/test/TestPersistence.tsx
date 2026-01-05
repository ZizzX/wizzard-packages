import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  WizardProvider,
  useWizard,
  useWizardActions,
  useWizardState,
  LocalStorageAdapter,
  type PersistenceMode,
} from "wizzard-stepper-react";

// --- Components ---

const Input = ({
  label,
  value,
  onChange,
  testId,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  testId: string;
}) => (
  <div className="mb-4">
    <label className="block text-sm font-bold mb-2">{label}</label>
    <input
      data-testid={testId}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Step1 = () => {
  const { data, handleStepChange } = useWizard();
  return (
    <div>
      <h2 className="text-xl mb-4">Step 1: Personal Info</h2>
      <Input
        label="Name"
        testId="name-input"
        value={data.name}
        onChange={(val) => handleStepChange("name", val)}
      />
      <Input
        label="Email"
        testId="email-input"
        value={data.email}
        onChange={(val) => handleStepChange("email", val)}
      />
    </div>
  );
};

const Step2 = () => {
  const { data, handleStepChange } = useWizard();
  return (
    <div>
      <h2 className="text-xl mb-4">Step 2: Address</h2>
      <Input
        label="Address"
        testId="address-input"
        value={data.address}
        onChange={(val) => handleStepChange("address", val)}
      />
    </div>
  );
};

const Step3 = () => {
  const { data } = useWizard();
  return (
    <div>
      <h2 className="text-xl mb-4">Step 3: Confirmation</h2>
      <p>Review your data:</p>
      <pre data-testid="review-data">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const WizardControls = () => {
  const { goToNextStep, goToPrevStep, reset } = useWizardActions();
  const { isFirstStep, isLastStep } = useWizardState();

  return (
    <div className="flex gap-4 mt-8 pt-4 border-t">
      <button
        data-testid="prev-button"
        onClick={goToPrevStep}
        disabled={isFirstStep}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <button
        data-testid="next-button"
        onClick={async () => {
          if (isLastStep) return;
          await goToNextStep();
        }}
        disabled={isLastStep}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
      <button
        data-testid="reset-button"
        onClick={reset}
        className="px-4 py-2 bg-red-500 text-white rounded ml-auto"
      >
        Reset
      </button>
    </div>
  );
};

const WizardInfo = () => {
  const { currentStepIndex, activeSteps, visitedSteps, completedSteps } =
    useWizardState();

  return (
    <div className="mb-6">
      <div data-testid="current-step" className="font-bold">
        Step {currentStepIndex + 1}
      </div>
      <div className="flex gap-2 mt-2">
        {activeSteps.map((step) => {
          let status = "";
          if (visitedSteps.has(step.id)) status += " visited";
          if (completedSteps.has(step.id)) status += " completed";

          return (
            <div
              key={step.id}
              data-testid={`breadcrumb-step-${activeSteps.indexOf(step) + 1}`}
              className={`px-2 py-1 border rounded ${status}`}
            >
              {step.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PersistenceContent = () => {
  const { currentStep } = useWizard();

  if (!currentStep) return <div>Loading...</div>;

  return (
    <div
      data-testid="wizard-container"
      className="p-8 max-w-2xl mx-auto border rounded shadow-lg bg-white mt-10"
    >
      <WizardInfo />

      {currentStep.id === "step1" && <Step1 />}
      {currentStep.id === "step2" && <Step2 />}
      {currentStep.id === "step3" && <Step3 />}

      <WizardControls />
    </div>
  );
};

export default function TestPersistence() {
  const [searchParams] = useSearchParams();

  // Dynamic configuration based on URL params
  const config = useMemo(() => {
    const modeParam = searchParams.get("mode") as PersistenceMode | null;
    const keyParam = searchParams.get("key");
    const storageKey = keyParam ? `${keyParam}_` : "wizard_persistence_test_";

    const persistenceConfig = {
      mode: modeParam || "onStepChange",
      debounceTime: 100, // Short debounce for tests
      storageKey: storageKey,
      adapter: new LocalStorageAdapter(storageKey),
    };

    return {
      persistence: persistenceConfig,
      steps: [
        { id: "step1", label: "Step 1" },
        { id: "step2", label: "Step 2" },
        { id: "step3", label: "Step 3" },
      ],
    };
  }, [searchParams]);

  return (
    <WizardProvider key={searchParams.toString()} config={config}>
      <PersistenceContent />
    </WizardProvider>
  );
}
