import React, { useState, useCallback } from "react";
import { createWizardFactory, type IWizardConfig } from "wizzard-stepper-react";
import { cn } from "../lib/utils";

// --- Types & Data ---

interface CloudSetupData {
  project: {
    name: string;
    description?: string;
  };
  region: string;
  provider: "aws" | "gcp" | "azure";
  instance: {
    type: string;
    diskSize: number;
    image: string;
  };
  networking: {
    advancedMode: boolean;
    vpcId?: string;
    subnet?: string;
  };
}

type CloudStepId = "basics" | "provider" | "instance" | "networking" | "review";

const REGIONS = [
  { id: "us-east-1", name: "US East (N. Virginia)", type: "aws" },
  { id: "eu-west-1", name: "Europe (Ireland)", type: "aws" },
  { id: "us-central1", name: "Iowa", type: "gcp" },
  { id: "europe-west1", name: "Belgium", type: "gcp" },
  { id: "eastus", name: "East US", type: "azure" },
  { id: "westeurope", name: "West Europe", type: "azure" },
];

const INSTANCE_TYPES: Record<string, string[]> = {
  aws: ["t3.micro", "t3.small", "m5.large", "c5.xlarge"],
  gcp: ["e2-micro", "e2-small", "n2-standard-2", "c2-standard-4"],
  azure: ["Standard_B1s", "Standard_B2s", "Standard_D2s_v3"],
};

// --- Mock API ---

const api = {
  checkProjectName: async (name: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1200)); // Simulate net lag
    return !["demo", "test", "admin", "root"].includes(name.toLowerCase());
  },
  provisionResource: async (): Promise<void> => {
    await new Promise((r) => setTimeout(r, 3000));
  },
};

// --- Wizard Factory ---

const factory = createWizardFactory<CloudSetupData, CloudStepId>();
const {
  WizardProvider,
  useWizardState, // Only for monolithic access if needed
  useWizardValue, // Optimized: Selector for specific field
  useWizardActions, // Optimized: Stable actions
  useWizardSelector, // Optimized: Custom selectors
  useWizardError, // Optimized: Error selector
  useBreadcrumbs,
  createStep,
} = factory;

// --- Components ---

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

  const wizardConfig = {
    steps: [
      createStep({
        id: "basics",
        label: "Project Basics",
        validationMode: "onChange",
        validationAdapter: {
          validate: async (data) => {
            const errors: Record<string, string> = {};
            if (!data.project?.name) {
              errors["project.name"] = "Project name is required";
            } else if (data.project.name.length < 3) {
              errors["project.name"] = "Name must be at least 3 chars";
            } else {
              // Async check
              const isAvailable = await api.checkProjectName(data.project.name);
              if (!isAvailable) {
                errors["project.name"] =
                  "This project name is already taken (try another)";
              }
            }

            if (!data.region) {
              errors["region"] = "Please select a region";
            }

            return { isValid: Object.keys(errors).length === 0, errors };
          },
        },
      }),
      createStep({
        id: "provider",
        label: "Cloud Provider",
        validationMode: "onStepChange", // Validate only on Next
        validationAdapter: {
          validate: (data) => ({
            isValid: !!data.provider,
            errors: !data.provider ? { provider: "Required" } : undefined,
          }),
        },
      }),
      createStep({
        id: "instance",
        label: "Instance Config",
        // Auto-invalidate this step if provider changes
        dependsOn: ["provider", "region"],
        clearData: ["instance"],
        validationMode: "onChange",
        validationAdapter: {
          validate: (data) => {
            const errors: Record<string, string> = {};
            if (!data.instance?.type)
              errors["instance.type"] = "Select usage type";
            return { isValid: Object.keys(errors).length === 0, errors };
          },
        },
      }),
      createStep({
        id: "networking",
        label: "Networking",
        // Conditional step: only show if advanced mode is checked
        condition: (data) => !!data?.networking?.advancedMode,
        dependsOn: ["networking.advancedMode"],
        clearData: ["networking.vpcId", "networking.subnet"],
        validationAdapter: {
          validate: (data) => {
            const errors: Record<string, string> = {};
            if (!data.networking?.vpcId)
              errors["networking.vpcId"] = "Select VPC";
            if (!data.networking?.subnet)
              errors["networking.subnet"] = "Select Subnet";
            return { isValid: Object.keys(errors).length === 0, errors };
          },
        },
      }),
      createStep({
        id: "review",
        label: "Review & Provision",
      }),
    ],
    analytics: {
      onEvent: handleEvent,
    },
    // Keep local changes when hydrating to avoid losing work on refresh
    persistence: {
      mode: "onChange" as const,
      storageKey: "cloud-wizard-v1",
      adapter: {
        getStep: (id: string) => {
          try {
            const item = localStorage.getItem(`cloud-wizard-v1_${id}`);
            return item ? JSON.parse(item) : undefined;
          } catch {
            return undefined;
          }
        },
        saveStep: (id: string, data: unknown) => {
          localStorage.setItem(`cloud-wizard-v1_${id}`, JSON.stringify(data));
        },
        clear: () => {
          Object.keys(localStorage).forEach((k) => {
            if (k.startsWith("cloud-wizard-v1")) localStorage.removeItem(k);
          });
        },
      },
    },
    onConflict: "merge" as const,
  } as IWizardConfig<CloudSetupData, CloudStepId>;

  return (
    <div className="container mx-auto p-4 max-w-6xl min-h-screen flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Cloud Infrastructure Setup
        </h1>
        <p className="text-slate-500">
          Enterprise provisioning wizard with async validation and state
          management
        </p>
      </header>

      <WizardProvider config={wizardConfig}>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Main Wizard Area */}
          <div className="xl:col-span-8 space-y-6">
            <TopNavigation />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-100 flex flex-col relative overflow-hidden">
              <WizardContent />
              <WizardControls />
              <GlobalLoader />
            </div>

            <DirtyStateBanner />
          </div>

          {/* Sidebar / Debug Console */}
          <div className="xl:col-span-4 space-y-6">
            <DebugPanel events={events} />
          </div>
        </div>
      </WizardProvider>
    </div>
  );
}

// --- Sub-components ---

function TopNavigation() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm overflow-x-auto pb-2 no-scrollbar">
      {breadcrumbs.map((crumb, idx) => (
        <div key={crumb.id} className="flex items-center shrink-0">
          <div
            className={cn(
              "flx flex-col items-start px-3 py-1.5 rounded-lg transition-colors",
              crumb.status === "current"
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : crumb.status === "visited"
                  ? "text-slate-700 hover:bg-slate-50"
                  : "text-slate-400"
            )}
          >
            <div className="text-[10px] uppercase tracking-wider opacity-60">
              Step {idx + 1}
            </div>
            <div>{crumb.label}</div>
          </div>
          {idx < breadcrumbs.length - 1 && (
            <div className="w-8 h-px bg-slate-200 mx-2" />
          )}
        </div>
      ))}
    </nav>
  );
}

function WizardContent() {
  // Only subscribe to currentStep.id to decide which component to render
  const currentStepId = useWizardSelector((state) => state.currentStep?.id);
  const currentStepLabel = useWizardSelector(
    (state) => state.currentStep?.label
  );

  if (!currentStepId) return null;

  return (
    <div
      key={currentStepId}
      className="p-8 flex-1 animate-in zoom-in-95 duration-300"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {currentStepLabel}
      </h2>

      {currentStepId === "basics" && <StepBasics />}
      {currentStepId === "provider" && <StepProvider />}
      {currentStepId === "instance" && <StepInstance />}
      {currentStepId === "networking" && <StepNetworking />}
      {currentStepId === "review" && <StepReview />}
    </div>
  );
}

// Optimized Step Components: Only re-render on relevant data changes

const StepBasics = React.memo(function StepBasics() {
  const { setData } = useWizardActions();
  const projectName = useWizardValue("project.name");
  const projectDesc = useWizardValue("project.description");
  const region = useWizardValue("region");
  const nameError = useWizardError("project.name"); // Assuming error path matches data path for basics
  const regionError = useWizardError("region");
  // For 'isBusy', we might want to check if THIS step is busy or global isBusy
  // But keeping it simple for now, using global isBusy for spinner in input
  const isBusy = useWizardSelector((s) => s.isBusy);

  return (
    <div className="space-y-6 max-w-md">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Project Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={projectName || ""}
            onChange={(e) => setData("project.name", e.target.value)}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
              nameError ? "border-red-300 bg-red-50" : "border-slate-300"
            )}
            placeholder="e.g. my-awesome-app"
          />
          {isBusy && (
            <div className="absolute right-3 top-2.5">
              <Spinner className="w-5 h-5 text-indigo-600" />
            </div>
          )}
        </div>
        {nameError && (
          <p className="text-sm text-red-600 animate-in slide-in-from-top-1">
            {nameError}
          </p>
        )}
        <p className="text-xs text-slate-500">
          Checking availability on server...
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          value={projectDesc || ""}
          onChange={(e) => setData("project.description", e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500 h-24 resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Region <span className="text-red-500">*</span>
        </label>
        <select
          value={region || ""}
          onChange={(e) => setData("region", e.target.value)}
          className={cn(
            "w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white",
            regionError ? "border-red-300 bg-red-50" : "border-slate-300"
          )}
        >
          <option value="">Select a region...</option>
          {REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} ({r.type.toUpperCase()})
            </option>
          ))}
        </select>
        {regionError && (
          <p className="text-sm text-red-600 animate-in slide-in-from-top-1">
            {regionError}
          </p>
        )}
      </div>
    </div>
  );
});

const StepProvider = React.memo(function StepProvider() {
  const { setData } = useWizardActions();
  const activeProvider = useWizardValue("provider");
  const providerError = useWizardError("provider");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {["aws", "gcp", "azure"].map((p) => (
        <button
          key={p}
          onClick={() => setData("provider", p)}
          className={cn(
            "h-40 rounded-xl border-2 flex flex-col items-center justify-center gap-4 transition-all hover:scale-105",
            activeProvider === p
              ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md"
              : "border-slate-200 hover:border-indigo-300"
          )}
        >
          <div className="text-4xl">
            {p === "aws" ? "☁️" : p === "gcp" ? "🌈" : "🔷"}
          </div>
          <div className="font-bold uppercase tracking-wider">{p}</div>
        </button>
      ))}
      {providerError && (
        <p className="text-sm text-red-600 animate-in slide-in-from-top-1">
          {providerError}
        </p>
      )}
    </div>
  );
});

const StepInstance = React.memo(function StepInstance() {
  const { setData } = useWizardActions();
  const provider = useWizardValue("provider");
  const instanceType = useWizardValue("instance.type");
  const advancedMode = useWizardValue("networking.advancedMode");

  const instanceTypeError = useWizardError("instance.type");

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex items-center gap-2 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-200">
        <span className="text-lg">💡</span>
        <span>
          Available instances are filtered by your selected provider:
          <strong> {provider?.toUpperCase()}</strong>
        </span>
      </div>

      <div className="space-y-4">
        <label className="font-medium text-slate-700">Instance Type</label>
        <div className="grid grid-cols-2 gap-3">
          {(INSTANCE_TYPES[provider] || []).map((type) => (
            <label
              key={type}
              className={cn(
                "flex items-center p-3 border rounded-lg cursor-pointer transition-colors",
                instanceType === type
                  ? "bg-indigo-50 border-indigo-500"
                  : "hover:bg-slate-50"
              )}
            >
              <input
                type="radio"
                name="instanceType"
                value={type}
                checked={instanceType === type}
                onChange={() => setData("instance.type", type)}
                className="mr-3 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-mono text-sm">{type}</span>
            </label>
          ))}
        </div>
        {instanceTypeError && (
          <p className="text-red-500 text-sm mt-1">{instanceTypeError}</p>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={!!advancedMode}
            onChange={(e) =>
              setData("networking.advancedMode", e.target.checked)
            }
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <div>
            <div className="font-medium text-slate-700 group-hover:text-indigo-700">
              Enable Advanced Networking
            </div>
            <div className="text-xs text-slate-500">
              Adds an extra step for VPC configuration
            </div>
          </div>
        </label>
      </div>
    </div>
  );
});

const StepNetworking = React.memo(function StepNetworking() {
  const { setData } = useWizardActions();
  const vpcId = useWizardValue("networking.vpcId");
  const subnet = useWizardValue("networking.subnet");

  const errorVpcId = useWizardError("networking.vpcId");
  const errorSubnet = useWizardError("networking.subnet");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">VPC ID</label>
        <input
          className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
          placeholder="vpc-xxxxxxxx"
          value={vpcId || ""}
          onChange={(e) => setData("networking.vpcId", e.target.value)}
        />
        {errorVpcId && <div className="text-red-500">{errorVpcId}</div>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Subnet CIDR</label>
        <input
          className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
          placeholder="10.0.0.0/24"
          value={subnet || ""}
          onChange={(e) => setData("networking.subnet", e.target.value)}
        />
        {errorSubnet && <div className="text-red-500">{errorSubnet}</div>}
      </div>
    </div>
  );
});

const StepReview = React.memo(function StepReview() {
  // Here we might want full data to display summary
  const wizardData = useWizardSelector((state) => state.data);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-slate-200 p-6 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
        <pre>{JSON.stringify(wizardData, null, 2)}</pre>
      </div>
      <p className="text-center text-slate-500">
        Click "Provision" to simulate deployment process.
      </p>
    </div>
  );
});

function WizardControls() {
  // Optimized selector for controls
  const isFirstStep = useWizardSelector((s) => s.isFirstStep);
  const isLastStep = useWizardSelector((s) => s.isLastStep);
  const isBusy = useWizardSelector((s) => s.isBusy);

  const { goToNextStep, goToPrevStep, reset } = useWizardActions();

  // Use a separate state to handle the "Provisioning" simulation
  const [isProvisioning, setProvisioning] = useState(false);

  const handleNext = async () => {
    if (isLastStep) {
      setProvisioning(true);
      await api.provisionResource();
      alert("Provisioning Complete! 🚀");
      setProvisioning(false);
      reset();
    } else {
      await goToNextStep();
    }
  };

  return (
    <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
      <button
        onClick={goToPrevStep}
        disabled={isFirstStep || isProvisioning || isBusy}
        className="text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500 font-medium px-4 py-2 transition-colors"
      >
        Back
      </button>

      <button
        onClick={handleNext}
        disabled={isBusy || isProvisioning}
        className={cn(
          "px-8 py-2.5 rounded-lg font-bold text-white shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100",
          isLastStep
            ? "bg-emerald-600 hover:bg-emerald-700"
            : "bg-indigo-600 hover:bg-indigo-700"
        )}
      >
        {isProvisioning ? (
          <>
            <Spinner className="w-5 h-5 text-white mr-2" />
            Provisioning...
          </>
        ) : isBusy ? (
          <>
            <Spinner className="w-5 h-5 text-white/80 mr-2" />
            Validating...
          </>
        ) : isLastStep ? (
          "Provision Resource"
        ) : (
          "Next Step"
        )}
      </button>
    </div>
  );
}

function GlobalLoader() {
  const isBusy = useWizardSelector((s) => s.isBusy);
  // Show a top loader line when busy
  if (!isBusy) return null;
  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-100 overflow-hidden">
      <div
        className="h-full bg-indigo-500 animate-[loading_1s_ease-in-out_infinite]"
        style={{ width: "30%", transformOrigin: "0% 50%" }}
      />
    </div>
  );
}

function DirtyStateBanner() {
  const isDirty = useWizardSelector((s) => s.isDirty);
  const { save } = useWizardActions();

  if (!isDirty) return null;

  return (
    <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900 animate-in slide-in-from-bottom-2">
      <span className="flex items-center gap-2">
        <span>✍️</span> You have unsaved changes matching your local session.
      </span>
      <button
        onClick={() => save()}
        className="text-amber-700 font-bold hover:underline"
      >
        Force Save
      </button>
    </div>
  );
}

function DebugPanel({
  events,
}: {
  events: { name: string; timestamp: string }[];
}) {
  // Debug panel deliberately subscribes to everything to show state
  const { activeSteps, activeStepsCount, dirtyFields } = useWizardState();
  const wizardData = useWizardSelector((s) => s);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-slate-300 font-mono text-xs space-y-6 shadow-2xl h-fit sticky top-6">
      <div className="space-y-2">
        <div className="text-slate-500 uppercase tracking-widest font-bold text-[10px]">
          Active Steps ({activeStepsCount})
        </div>
        <div className="flex flex-wrap gap-1">
          {activeSteps.map((s) => (
            <span
              key={s.id}
              className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30"
            >
              {s.id}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-slate-500 uppercase tracking-widest font-bold text-[10px]">
          Dirty Fields ({dirtyFields.size})
        </div>
        <div className="text-emerald-400">
          {[...dirtyFields].join(", ") || "-"}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-slate-500 uppercase tracking-widest font-bold text-[10px]">
          Live Data Snapshot
        </div>
        <div className="max-h-60 overflow-y-auto">
          <pre className="text-slate-400">
            {JSON.stringify(
              wizardData,
              (_, value) => {
                if (value instanceof Set) return [...value];
                return value;
              },
              2
            )}
          </pre>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-800">
        <div className="text-slate-500 uppercase tracking-widest font-bold text-[10px]">
          Event Log
        </div>
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {events.map((e, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-slate-600">
                [{e.timestamp.split(" ")[0]}]
              </span>
              <span className="text-indigo-400">{e.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
