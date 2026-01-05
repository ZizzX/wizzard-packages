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
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

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

const TestStepGuards = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingResolver, setPendingResolver] = useState<
    ((allow: boolean) => void) | null
  >(null);
  const [guardLog, setGuardLog] = useState("");
  const [isGuardLoading, setIsGuardLoading] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isDebug = query.get("debug") === "true";
  const isAsync = query.get("async") === "true";

  const config = useMemo<IWizardConfig<GuardsData>>(
    () => ({
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
              setIsGuardLoading(true);
              // Simulate async delay
              await new Promise((r) => setTimeout(r, 5000));
              setIsGuardLoading(false);
            }

            if (direction === "next") {
              if (data.content && !data.saved) {
                setShowDialog(true);
                // Return a promise that resolves when user clicks confirm/cancel
                return new Promise<boolean>((resolve) => {
                  setPendingResolver(() => resolve);
                });
              }
            }
            return true; // Allow
          },
        },
        {
          id: "step-2",
          label: "Safe Step",
          beforeLeave: async (_, direction) => {
            if (isDebug) {
              setGuardLog(`direction: ${direction}`);
            }
            return true;
          },
        },
        {
          id: "step-3",
          label: "Final Step",
        },
      ],
    }),
    [isDebug, isAsync, setShowDialog]
  );

  return (
    <div className="p-4">
      {isDebug && (
        <div data-testid="guard-log" className="hidden">
          {guardLog}
        </div>
      )}

      <WizardProvider config={config}>
        <WizardContentInternal
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          pendingResolver={pendingResolver}
          isAsync={isAsync}
          isGuardLoading={isGuardLoading}
        />
      </WizardProvider>
    </div>
  );
};

// Internal content to access wizard hooks for rendering
const WizardContentInternal = ({
  showDialog,
  setShowDialog,
  pendingResolver,
  isAsync,
  isGuardLoading,
}: {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  pendingResolver: ((allow: boolean) => void) | null;
  isAsync: boolean;
  isGuardLoading: boolean;
}) => {
  const { currentStep, activeSteps, isLoading, isBusy } =
    useWizard<GuardsData>();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  return (
    <div data-testid="wizard-container" className="max-w-md mx-auto">
      {/* Loading Indicator for Async Guard */}
      <div data-testid="debug-async" className="hidden">
        {isAsync.toString()}
      </div>
      {(isGuardLoading || isBusy || isLoading || (isAsync && !currentStep)) && (
        <div data-testid="guard-loading" className="text-xs text-blue-500 mb-2">
          Guard Working...
        </div>
      )}

      <GuardDialog
        isOpen={showDialog}
        onConfirm={() => {
          setShowDialog(false);
          if (pendingResolver) pendingResolver(true);
        }}
        onCancel={() => {
          setShowDialog(false);
          if (pendingResolver) pendingResolver(false);
        }}
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
          {currentStep?.id === "step-3" && <div>Step 3: Final</div>}
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
