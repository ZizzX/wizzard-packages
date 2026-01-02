import { useEffect, useState } from "react";
import {
  optimizationWizardConfig,
  useWizard,
  useWizardState,
  WizardProvider,
  type IOptimizationWizardData,
} from "../wizards/optimization-wizard";

const DemoContent = () => {
  const {
    currentStep,
    wizardData,
    goToNextStep,
    goToPrevStep,
    isFirstStep,
    isLastStep,
    progress,
    reset,
  } = useWizard();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Optimization & DevTools Demo</h1>
      <div className="mb-4 bg-gray-100 p-2 rounded text-sm">
        <p>
          User Type: <strong>{wizardData.userType || "Loading..."}</strong>{" "}
          (Determines if "Heavy Calculation" step is shown)
        </p>
        <p>Progress: {progress}%</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 min-h-[300px]">
        {currentStep ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">{currentStep.label}</h2>

            {/* Custom rendering for fields based on step ID */}
            {currentStep.id === "personal" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Validation Mode: onChange (Type 'ab' to see error instantly)
                </p>
                <WizardField name="firstName" label="First Name" />
                <WizardField name="lastName" label="Last Name" />
              </div>
            )}

            {currentStep.id === "details" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Validation Mode: onStepChange (Type invalid email and click
                  Next)
                </p>
                <WizardField name="email" label="Email" />
                <WizardField name="phone" label="Phone" />
              </div>
            )}

            {currentStep.id === "heavy-calc" && (
              <div className="space-y-4">
                <p>This step involves a heavy calculation check simulation.</p>
                <p className="text-green-600">You are a PRO user!</p>
              </div>
            )}

            {currentStep.id === "confirm-leave" && (
              <div className="space-y-4">
                <p>
                  Try changing the value below and then clicking Back or Next.
                </p>
                <WizardField name="notes" label="Notes" />
              </div>
            )}

            {currentStep.id === "final" && (
              <div className="text-center text-green-600 font-bold text-xl">
                Wizard Completed!
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={goToPrevStep}
                disabled={isFirstStep}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={async () => {
                  if (isLastStep) {
                    const result = await reset();
                    console.log(result);
                    window.location.reload();
                    return;
                  }
                  const result = await goToNextStep();
                  console.log(result);
                }}
                disabled={isLastStep && currentStep.id !== "final"}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {isLastStep ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <div>Loading step...</div>
        )}
      </div>
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm">
        <h3 className="font-bold mb-2">DevTools Verification Checklist:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Open Redux DevTools (or console logs if configured).</li>
          <li>
            Verify <code>visitedSteps</code>, <code>completedSteps</code> are
            Arrays (not Sets).
          </li>
          <li>
            Type in "Personal" - See <code>onChange</code> validation errors
            update in real-time.
          </li>
          <li>Type in "Details" - See errors ONLY after clicking "Next".</li>
        </ul>
      </div>
    </div>
  );
};

const WizardField = ({ name, label }: { name: string; label: string }) => {
  const { setData, getData } = useWizard();
  const { errors } = useWizardState();
  const value = getData(name, "") as string;
  // We can find error for this field from the errors object
  // Structure is errors[stepId][fieldName]
  const error = Object.values(errors)
    .map((stepErrors) => (stepErrors as Record<string, string>)[name])
    .find(Boolean);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        value={value}
        onChange={(e) => setData(name, e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const OptimizationDemo = () => {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<
    IOptimizationWizardData | undefined
  >(undefined);

  useEffect(() => {
    // Clear storage for fresh demo experience
    localStorage.removeItem("opt_wizard");

    // Simulate Server Request
    setTimeout(() => {
      const isPro = Math.random() > 0.5;
      setInitialData({
        userType: isPro ? "pro" : "basic",
        firstName: "",
        lastName: "",
        email: "",
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold text-gray-500 animate-pulse">
          Loading Application Data...
        </div>
      </div>
    );
  }

  return (
    <WizardProvider config={optimizationWizardConfig} initialData={initialData}>
      <DemoContent />
    </WizardProvider>
  );
};

export default OptimizationDemo;
