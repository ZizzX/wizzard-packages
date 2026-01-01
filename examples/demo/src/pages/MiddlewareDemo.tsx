import { useState, useMemo } from "react";
import {
  WizardProvider,
  useWizard,
  loggerMiddleware,
  devToolsMiddleware,
  WizardDevTools,
  MemoryAdapter,
} from "wizzard-stepper-react";
import type { WizardMiddleware, IWizardConfig } from "wizzard-stepper-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { StepperControls } from "../components/StepperControls";
import { Input } from "../components/ui/Input";
import { ProTip } from "../components/ProTip";

// --- TYPES ---

interface DemoData {
  name: string;
}

type DemoSteps = "start" | "finish";

// --- CUSTOM MIDDLEWARE ---

/**
 * A custom middleware that mirrors the wizard data to a local state for debugging.
 * Real-world use case: Syncing with external analytics or a legacy storage.
 */
const customAnalyticsMiddleware =
  (setLogs: (msg: string) => void): WizardMiddleware<DemoData, DemoSteps> =>
  () =>
  // This is the API (getState, dispatch)
  (next) =>
  (action) => {
    if (action.type === "GO_TO_STEP") {
      setLogs(`🚀 Navigation: Moving to step ${action.payload.to}`);
    }
    if (action.type === "SET_DATA") {
      setLogs(`✍️ Data Change: Field "${action.payload.path}" updated`);
    }
    return next(action);
  };

// --- WIZARD COMPONENTS ---

const Step1 = () => {
  const { handleStepChange, wizardData } = useWizard<DemoData>();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Step 1: Middleware Demo</h3>
      <p className="text-sm text-gray-500">
        Notice the logs below update as you type. This is handled by a custom
        middleware.
      </p>
      <Input
        label="Your Name"
        value={wizardData.name || ""}
        onChange={(e) => handleStepChange("name", e.target.value)}
      />
    </div>
  );
};

const Step2 = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold">Step 2: Action Interception</h3>
    <p className="text-sm text-gray-500">
      Navigating back or forward also triggers middleware events.
    </p>
  </div>
);

// --- MAIN PAGE ---

export default function MiddlewareDemo() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev].slice(0, 5));
  };

  const config: IWizardConfig<DemoData, DemoSteps> = useMemo(
    () => ({
      persistence: {
        mode: "onChange",
        adapter: new MemoryAdapter(),
      },
      middlewares: [
        loggerMiddleware,
        devToolsMiddleware,
        customAnalyticsMiddleware(addLog),
      ],
      steps: [
        { id: "start", label: "Start" },
        { id: "finish", label: "Finish" },
      ],
    }),
    []
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Middleware & DevTools Demo
        </h1>
        <p className="text-gray-600">
          This demo showcases the power of the 2.0.0 middleware system and the
          visual DevTools overlay.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WizardProvider config={config}>
            <Card className="border-2 border-indigo-100 shadow-2xl">
              <CardHeader className="bg-indigo-50/50 border-b border-indigo-100">
                <CardTitle className="text-indigo-900 text-sm uppercase tracking-widest font-black">
                  Active Wizard
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 min-h-[200px]">
                <WizardContent />
              </CardContent>
              <CardFooter className="pb-8">
                <StepperControls />
              </CardFooter>
            </Card>

            {/* The Visual DevTools Overlay */}
            <WizardDevTools />
          </WizardProvider>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 text-gray-100 border-none shadow-xl">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                Middleware Event Log
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              {logs.length === 0 && (
                <p className="text-gray-600 text-xs italic">
                  No events yet. Start interacting...
                </p>
              )}
              {logs.map((log, i) => (
                <div
                  key={i}
                  className="text-[10px] font-mono p-2 bg-gray-800 rounded border border-gray-700 animate-in fade-in slide-in-from-left-2"
                >
                  {log}
                </div>
              ))}
            </CardContent>
          </Card>

          <ProTip>
            Try opening the <b>Redux DevTools</b> extension! The same actions
            are being piped there via <code>devToolsMiddleware</code>.
          </ProTip>
        </div>
      </div>
    </div>
  );
}

function WizardContent() {
  const { currentStepId } = useWizard();
  return (
    <>
      {currentStepId === "start" && <Step1 />}
      {currentStepId === "finish" && <Step2 />}
    </>
  );
}
