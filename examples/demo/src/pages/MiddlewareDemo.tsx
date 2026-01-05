import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
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
  email?: string;
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
    if (action.type === "UPDATE_DATA" && action.payload.options?.path) {
      setLogs(
        `✍️ Data Change: Field "${action.payload.options.path}" updated (Bulk)`
      );
    }
    return next(action);
  };

// --- WIZARD COMPONENTS ---

const Step1 = () => {
  const { handleStepChange, data } = useWizard<DemoData>();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Step 1: Middleware Demo</h3>
      <p className="text-sm text-gray-500">
        Notice the logs below update as you type. This is handled by a custom
        middleware.
      </p>
      <Input
        label="Your Name"
        data-testid="name-input"
        value={data.name || ""}
        onChange={(e) => handleStepChange("name", e.target.value)}
      />
    </div>
  );
};

const Step2 = () => {
  const { handleStepChange, data } = useWizard<DemoData>();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Step 2: Action Interception</h3>
      <p className="text-sm text-gray-500">
        Navigating back or forward also triggers middleware events.
      </p>
      <Input
        label="Email Address"
        data-testid="email-input"
        value={data.email || ""}
        onChange={(e) => handleStepChange("email", e.target.value)}
      />
    </div>
  );
};

// --- MAIN PAGE ---

export default function MiddlewareDemo() {
  const [logs, setLogs] = useState<string[]>([]);
  const [alert, setAlert] = useState<string | null>(null);

  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const isBlocking = search.get("blocking") === "true";
  const isDebug = search.get("debug") === "true";
  const isCustom = search.get("custom") === "true";

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev].slice(0, 5));
  };

  const config: IWizardConfig<DemoData, DemoSteps> = useMemo(() => {
    const middlewares: WizardMiddleware<DemoData, DemoSteps>[] = [
      loggerMiddleware,
      devToolsMiddleware,
      customAnalyticsMiddleware(addLog),
    ];

    if (isCustom) {
      middlewares.push(() => (next) => (action) => {
        addLog(`[M1] Middleware 1 (Action: ${action.type})`);
        return next(action);
      });
      middlewares.push(() => (next) => (action) => {
        addLog(`[M2] Middleware 2 (Action: ${action.type})`);
        return next(action);
      });
    }

    if (isBlocking) {
      middlewares.push(() => (next) => (action) => {
        if (
          action.type === "GO_TO_STEP" ||
          action.type === "SET_CURRENT_STEP_ID"
        ) {
          setAlert("Navigation blocked by middleware!");
          return action; // Block by returning original action without next
        }
        return next(action);
      });
    }

    return {
      persistence: {
        mode: "onChange",
        adapter: new MemoryAdapter(),
      },
      middlewares,
      steps: [
        { id: "start", label: "Start" },
        { id: "finish", label: "Finish" },
      ],
    };
  }, [isBlocking, isCustom]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {alert && (
        <div
          data-testid="middleware-alert"
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
        >
          {alert}
        </div>
      )}

      <div className="space-y-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Middleware & DevTools Demo
        </h1>
        <p className="text-gray-600">
          This demo showcases the power of the {__APP_VERSION__} middleware
          system and the visual DevTools overlay.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WizardProvider key={search.toString()} config={config}>
            <Card
              className="border-2 border-indigo-100 shadow-2xl"
              data-testid="wizard-container"
            >
              <CardHeader className="bg-indigo-50/50 border-b border-indigo-100">
                <CardTitle className="text-indigo-900 text-sm uppercase tracking-widest font-black">
                  Active Wizard
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 min-h-[200px]">
                <WizardContent isDebug={isDebug} />
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
            <CardContent
              className="pt-4 space-y-2"
              data-testid="middleware-log"
            >
              {logs.length === 0 && (
                <p className="text-gray-600 text-xs italic">
                  No events yet. Start interacting...
                </p>
              )}
              {logs.map((log, i) => (
                <div
                  key={i}
                  data-testid="log-item"
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

function WizardContent({ isDebug }: { isDebug?: boolean }) {
  const { currentStepId, data } = useWizard<DemoData>();
  return (
    <>
      {isDebug && (
        <div data-testid="middleware-state" className="hidden">
          {JSON.stringify(data)}
        </div>
      )}
      {currentStepId === "start" && <Step1 />}
      {currentStepId === "finish" && <Step2 />}
    </>
  );
}
