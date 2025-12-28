import { useState, useCallback } from "react";
import { createWizardFactory } from "wizzard-stepper-react";

interface EnterpriseData {
  branching: {
    primaryPath: "A" | "B";
    stepA_Value?: string;
    stepB_Value?: string;
  };
  details: {
    comment?: string;
  };
}

const factory = createWizardFactory<EnterpriseData>();
const { WizardProvider, useWizard, useBreadcrumbs, createStep } = factory;

export default function EnterpriseWizardDemo() {
  const [events, setEvents] = useState<
    { name: string; payload: unknown; timestamp: string }[]
  >([]);

  const handleEvent = useCallback((name: string, payload: unknown) => {
    setEvents((prev) => [
      { name, payload, timestamp: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  }, []);

  const config = {
    steps: [
      createStep({
        id: "branching",
        label: "Step 1: Branching",
        validationMode: "onChange",
      }),
      createStep({
        id: "stepA",
        label: "Step A (Branch A)",
        condition: (data) => data.branching?.primaryPath === "A",
        dependsOn: ["branching.primaryPath"],
      }),
      createStep({
        id: "stepB",
        label: "Step B (Branch B)",
        condition: (data) => data.branching?.primaryPath === "B",
        dependsOn: ["branching.primaryPath"],
      }),
      createStep({
        id: "summary",
        label: "Summary",
      }),
    ],
    analytics: {
      onEvent: handleEvent,
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Enterprise Features Demo
        </h1>
        <p className="text-gray-600">
          Live demonstration of advanced capabilities: Branching, Dirty
          Tracking, Breadcrumbs, and Analytics.
        </p>
      </div>

      <WizardProvider
        config={config}
        initialData={
          { branching: { primaryPath: "A" } } as Partial<EnterpriseData>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <BreadcrumbsDisplay />
            <WizardStage />
            <DirtyStateIndicator />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🛰️ Analytics Log</span>
              </h3>
              <div className="space-y-2 max-h-100 overflow-y-auto text-xs font-mono">
                {events.length === 0 && (
                  <div className="text-gray-400 italic">
                    No events tracked yet...
                  </div>
                )}
                {events.map((e, i) => (
                  <div
                    key={i}
                    className="p-2 bg-white rounded border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-1"
                  >
                    <div className="text-indigo-600 font-bold">{e.name}</div>
                    <div className="text-gray-400 mb-1">{e.timestamp}</div>
                    <pre className="overflow-x-auto">
                      {JSON.stringify(e.payload, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WizardProvider>
    </div>
  );
}

function BreadcrumbsDisplay() {
  const breadcrumbs = useBreadcrumbs();
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center space-x-4">
        {breadcrumbs.map((step, idx) => (
          <li key={step.id} className="flex items-center">
            {idx !== 0 && (
              <svg
                className="h-5 w-5 text-gray-300 mr-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
            )}
            <div
              className={`flex flex-col ${
                step.status === "current"
                  ? "text-indigo-600 font-bold"
                  : step.status === "visited"
                    ? "text-gray-900"
                    : "text-gray-400"
              }`}
            >
              <span className="text-xs uppercase tracking-wide">
                Step {idx + 1}
              </span>
              <span className="text-sm">{step.label}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function WizardStage() {
  const {
    currentStep,
    goToNextStep,
    goToPrevStep,
    isFirstStep,
    isLastStep,
    setData,
    wizardData,
  } = useWizard();

  if (!currentStep) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {currentStep.label}
        </h2>

        <div className="min-h-50">
          {currentStep.id === "branching" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Choose Path
              </label>
              <div className="flex gap-4">
                {["A", "B"].map((path) => (
                  <button
                    key={path}
                    onClick={() => setData("branching.primaryPath", path)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      wizardData.branching?.primaryPath === path
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    Path {path}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 italic mt-4">
                💡 Changing path here will trigger{" "}
                <strong>Auto-Invalidation</strong> of Step A/B data.
              </p>
            </div>
          )}

          {currentStep.id === "stepA" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Value for Step A
              </label>
              <input
                type="text"
                value={wizardData.branching?.stepA_Value || ""}
                onChange={(e) =>
                  setData("branching.stepA_Value", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter something..."
              />
            </div>
          )}

          {currentStep.id === "stepB" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Value for Step B
              </label>
              <input
                type="text"
                value={wizardData.branching?.stepB_Value || ""}
                onChange={(e) =>
                  setData("branching.stepB_Value", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter something..."
              />
            </div>
          )}

          {currentStep.id === "summary" && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm">
                  {JSON.stringify(wizardData, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-8 py-4 bg-gray-50 flex justify-between">
        <button
          onClick={goToPrevStep}
          disabled={isFirstStep}
          className="px-4 py-2 text-gray-600 disabled:opacity-30 hover:text-gray-900"
        >
          Back
        </button>
        <button
          onClick={goToNextStep}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
        >
          {isLastStep ? "Finish" : "Continue"}
        </button>
      </div>
    </div>
  );
}

function DirtyStateIndicator() {
  const { isDirty, dirtyFields } = useWizard();

  if (!isDirty) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3 animate-in slide-in-from-bottom-2">
      <span className="text-amber-600 text-xl text-center">⚠️</span>
      <div>
        <div className="text-amber-800 font-bold text-sm">
          Unsaved Changes Detected
        </div>
        <div className="text-amber-700 text-xs">
          Changed fields: {[...dirtyFields].join(", ")}
        </div>
      </div>
    </div>
  );
}
