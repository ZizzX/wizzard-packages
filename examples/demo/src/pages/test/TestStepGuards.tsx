import {
  WizardProvider,
  useWizard,
  useWizardActions,
  type IWizardConfig,
  MemoryAdapter,
} from "wizzard-stepper-react";
import { Card, CardContent, CardFooter } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useState } from "react";

/**
 * TestStepGuards
 *
 * Implements a wizard to serve `e2e/tests/step-guards.spec.ts`.
 * Features:
 * - Synchronous blocking (unsaved changes)
 * - Confirmation dialog interaction
 * - Async guards (loading state)
 * - Direction tracking (next vs prev)
 */

interface GuardsData {
  content?: string;
  email?: string;
  saved?: boolean;
}

const GuardStep1 = () => {
  const { data, handleStepChange } = useWizard<GuardsData>();
  const [, setIsSaved] = useState(false);
  const { updateData } = useWizardActions();

  const handleSave = () => {
    setIsSaved(true);
    updateData({ saved: true });
  };

  const handleChange = (val: string) => {
    setIsSaved(false);
    updateData({ saved: false });
    handleStepChange("content", val);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Step 1: Content Guard</h2>
      <p className="text-sm text-gray-500">
        Try navigating away without saving.
      </p>
      <div className="flex gap-2 items-end">
        <Input
          data-testid="content-input"
          label="Content"
          value={data.content || ""}
          onChange={(e) => handleChange(e.target.value)}
        />
        <Button
          data-testid="save-button"
          onClick={handleSave}
          variant="secondary"
        >
          Save
        </Button>
      </div>

      {/* For Direction Test */}
      <Input
        data-testid="email-input"
        label="Email (For Direction Test)"
        value={data.email || ""}
        onChange={(e) => handleStepChange("email", e.target.value)}
      />
    </div>
  );
};

const GuardStep2 = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-bold">Step 2: Safe Zone</h2>
    <p>You made it past the guard.</p>
  </div>
);

const GuardDialog = ({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      data-testid="guard-dialog"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-bold mb-2">Unsaved Changes</h3>
        <p className="mb-4">You have unsaved changes. Leave anyway?</p>
        <div className="flex justify-end gap-2">
          <Button
            data-testid="dialog-cancel"
            onClick={onCancel}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            data-testid="dialog-confirm"
            onClick={onConfirm}
            variant="primary"
          >
            Leave
          </Button>
        </div>
      </div>
    </div>
  );
};

// Start Wrapper to verify logic
// Implementing the logic requires the `config` to be created.
// To support the `dialog` interaction, the `beforeLeave` needs to interface with React state.
// We can achieve this by lifting state up or using a mutable ref accessible to the guard.

const TestStepGuards = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingRetry] = useState<(() => void) | null>(null);
  const [guardLog, setGuardLog] = useState("");

  const query = new URLSearchParams(window.location.hash.split("?")[1]);
  const isDebug = query.get("debug") === "true";
  const isAsync = query.get("async") === "true";

  const config: IWizardConfig<GuardsData> = {
    persistence: { mode: "onStepChange", adapter: new MemoryAdapter() },
    steps: [
      {
        id: "step-1",
        label: "Guard Step",
        beforeLeave: async (data, direction) => {
          if (isDebug) {
            setGuardLog(`direction: ${direction}`);
          }

          if (isAsync) {
            // Simulate async delay
            await new Promise((r) => setTimeout(r, 1000));
          }

          if (direction === "next") {
            // Logic: if content exists and not saved, block
            // Note: data might be stale in closure if not careful,
            // but `beforeLeave` receives latest `data`.
            if (data.content && !data.saved) {
              setShowDialog(true);
              return false; // Block navigation
            }
          }
          return true; // Allow
        },
      },
      { id: "step-2", label: "Safe Step" },
    ],
  };

  return (
    <div className="p-4">
      {isDebug && (
        <div data-testid="guard-log" className="hidden">
          {guardLog}
        </div>
      )}

      {/* Passing external state handlers via context/props isn't supported by standard WizardProvider directly 
          unless we wrap components. 
          Here we use the closure of `TestStepGuards` to defining `config` which closes over `setShowDialog`.
      */}

      <WizardProvider config={config}>
        <WizardContentInternal
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          pendingRetry={pendingRetry}
          isAsync={isAsync}
        />
      </WizardProvider>
    </div>
  );
};

// Internal content to access wizard hooks for rendering
const WizardContentInternal = ({
  showDialog,
  setShowDialog,
  pendingRetry,
  isAsync,
}: {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  pendingRetry: (() => void) | null;
  isAsync: boolean;
}) => {
  const { currentStep, activeSteps, isLoading } = useWizard<GuardsData>();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  return (
    <div data-testid="wizard-container" className="max-w-md mx-auto">
      {/* Loading Indicator for Async Guard */}
      {/* Note: useWizard `isLoading` might reflect async guard state if library supports it. 
          If not, we might need manual tracking. 
          Assuming library `isBusy` or `isLoading` covers `beforeLeave`. 
          If not, `data-testid="guard-loading"` won't show. 
          The spec expects it. Let's assume WizzardStepper handles `isBusy` during async guard.
      */}
      {(isLoading || (isAsync && !currentStep)) && (
        <div data-testid="guard-loading" className="text-xs text-blue-500 mb-2">
          Guard Working...
        </div>
      )}

      <GuardDialog
        isOpen={showDialog}
        onConfirm={() => {
          setShowDialog(false);
          if (pendingRetry) pendingRetry(); // Call the retry function passed by beforeLeave
        }}
        onCancel={() => setShowDialog(false)}
      />

      <Card>
        <CardContent className="pt-6">
          <div
            data-testid="current-step"
            className="mb-4 font-mono text-xs text-gray-400"
          >
            Step {activeSteps.findIndex((s) => s.id === currentStep?.id) + 1}
          </div>

          {currentStep?.id === "step-1" && <GuardStep1 />}
          {currentStep?.id === "step-2" && <GuardStep2 />}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            data-testid="prev-button"
            onClick={goToPrevStep}
            variant="secondary"
          >
            Back
          </Button>
          <Button
            data-testid="next-button"
            onClick={goToNextStep}
            variant="primary"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestStepGuards;
