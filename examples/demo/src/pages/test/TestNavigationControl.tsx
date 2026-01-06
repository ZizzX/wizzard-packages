import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  WizardProvider,
  useWizard,
  useWizardActions,
  useWizardState,
} from "wizzard-stepper-react";
import type { IWizardConfig } from "wizzard-stepper-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";

// --- TYPES ---

interface NavigationData {
  step1Data?: string;
  step2Data?: string;
  step3Data?: string;
  userRole?: "user" | "admin";
}

type NavigationSteps = "step-1" | "step-2" | "step-3" | "step-4";

// --- WIZARD COMPONENTS ---

const Step1 = () => {
  const { data } = useWizard<NavigationData>();
  const { updateData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Step 1: Personal Info</h3>
      <Input
        data-testid="step1-input"
        label="Your Name"
        value={data.step1Data || ""}
        onChange={(e) => updateData({ step1Data: e.target.value })}
      />
    </div>
  );
};

const Step2 = () => {
  const { data } = useWizard<NavigationData>();
  const { updateData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Step 2: Contact Info</h3>
      <Input
        data-testid="step2-input"
        label="Email"
        value={data.step2Data || ""}
        onChange={(e) => updateData({ step2Data: e.target.value })}
      />
    </div>
  );
};

const Step3 = () => {
  const { data } = useWizard<NavigationData>();
  const { updateData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Step 3: Preferences</h3>
      <Input
        data-testid="step3-input"
        label="Preferences"
        value={data.step3Data || ""}
        onChange={(e) => updateData({ step3Data: e.target.value })}
      />
    </div>
  );
};

const Step4 = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Step 4: Review</h3>
      <p className="text-sm text-gray-500">Review your information</p>
    </div>
  );
};

// --- BREADCRUMBS COMPONENT ---

const Breadcrumbs = () => {
  const { breadcrumbs } = useWizardState();
  const { goToStep } = useWizardActions();

  return (
    <div className="flex gap-2 mb-6">
      {breadcrumbs.map((crumb, index) => (
        <button
          key={crumb.id}
          data-testid={`breadcrumb-${crumb.id}`}
          data-status={crumb.status}
          onClick={() => goToStep(crumb.id)}
          className={`px-3 py-1 rounded text-sm ${
            crumb.status === "current"
              ? "bg-indigo-600 text-white"
              : crumb.status === "completed"
                ? "bg-green-100 text-green-800"
                : crumb.status === "visited"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-500"
          }`}
        >
          {index + 1}. {crumb.label}
        </button>
      ))}
    </div>
  );
};

// --- NAVIGATION CONTROLS ---

const NavigationControls = () => {
  const { isFirstStep, isLastStep, currentStepIndex, activeStepsCount } =
    useWizardState();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  return (
    <div className="flex items-center justify-between">
      <Button
        data-testid="prev-button"
        variant="secondary"
        onClick={goToPrevStep}
        disabled={isFirstStep}
      >
        Previous
      </Button>

      <div data-testid="current-step" className="text-sm text-gray-500">
        Step {currentStepIndex + 1} of {activeStepsCount}
      </div>

      <Button
        data-testid="next-button"
        variant="primary"
        onClick={goToNextStep}
        disabled={isLastStep}
      >
        Next
      </Button>
    </div>
  );
};

// --- MAIN PAGE ---

export default function TestNavigationControl() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const userRole = (search.get("role") || "user") as "user" | "admin";
  const mode = (search.get("mode") ||
    (userRole === "admin" ? "free" : "visited")) as
    | "sequential"
    | "visited"
    | "free";

  const config: IWizardConfig<NavigationData, NavigationSteps> = {
    // No persistence - we want initialData to be used directly
    navigationMode: mode,
    steps: [
      {
        id: "step-1",
        label: "Personal",
        // Example: Admin can always navigate to this step
        ...(userRole === "admin" && {
          canNavigateTo: () => true,
        }),
      },
      {
        id: "step-2",
        label: "Contact",
      },
      {
        id: "step-3",
        label: "Preferences",
      },
      {
        id: "step-4",
        label: "Review",
        canNavigateTo: (data, metadata) => {
          if (data.userRole === "admin") return true;
          if (!data.step1Data) return false;
          return !!metadata.visitedSteps?.has("step-3");
        },
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-gray-900">
          Navigation Control Test
        </h1>
        <p className="text-gray-600">
          Mode: <strong>{mode}</strong> | Role: <strong>{userRole}</strong>
        </p>
      </div>

      <WizardProvider config={config} initialData={{ userRole }}>
        <Card data-testid="wizard-container">
          <CardHeader>
            <CardTitle>Navigation Control Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Breadcrumbs />
            <WizardContent />
          </CardContent>
          <CardFooter>
            <NavigationControls />
          </CardFooter>
        </Card>
      </WizardProvider>
    </div>
  );
}

function WizardContent() {
  const { currentStepId } = useWizardState();
  const { data } = useWizard<NavigationData>();
  const { updateData } = useWizardActions();

  // Sync role to store for E2E tests consistency
  useEffect(() => {
    const search = new URLSearchParams(
      window.location.hash.split("?")[1] || window.location.search
    );
    const role = search.get("role");
    if (role && data.userRole !== role) {
      console.log("[WizardContent] Syncing role to store:", role);
      updateData({ userRole: role });
    }
  }, [data.userRole, updateData]);

  return (
    <>
      {currentStepId === "step-1" && <Step1 />}
      {currentStepId === "step-2" && <Step2 />}
      {currentStepId === "step-3" && <Step3 />}
      {currentStepId === "step-4" && <Step4 />}
    </>
  );
}
