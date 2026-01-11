import { useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { IWizardConfig, WizardMiddleware } from '@wizzard-packages/react';
import { useWizard, WizardProvider } from '@wizzard-packages/react';
import { devToolsMiddleware, loggerMiddleware } from '@wizzard-packages/middleware';
import { WizardDevTools } from '@wizzard-packages/devtools';
import { MemoryAdapter } from '@wizzard-packages/persistence';
import { StepperControls } from '../../components/StepperControls';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

// --- TYPES ---

interface DemoData {
  name: string;
  email?: string;
}

type DemoSteps = 'start' | 'middle' | 'finish';

// --- CUSTOM MIDDLEWARE ---

/**
 * A custom middleware that mirrors the wizard data to a local state for debugging.
 * Real-world use case: Syncing with external analytics or a legacy storage.
 *
 * Following Redux best practices: middleware is created once with a logger callback.
 * The callback is stored in a ref to avoid recreating the middleware on every render.
 */
const customAnalyticsMiddleware =
  (getLogger: () => (msg: string) => void): WizardMiddleware<DemoData, DemoSteps> =>
  () =>
  (next) =>
  (action) => {
    const logger = getLogger();
    if (action.type === 'GO_TO_STEP') {
      logger(`🚀 Navigation: Moving to step ${action.payload.to}`);
    }
    if (action.type === 'SET_DATA') {
      logger(`✍️ Data Change: Field "${action.payload.path}" updated`);
    }
    if (action.type === 'UPDATE_DATA' && action.payload.options?.path) {
      logger(`✍️ Data Change: Field "${action.payload.options.path}" updated (Bulk)`);
    }
    return next(action);
  };

/**
 * Custom middleware 1 for testing middleware order
 */
const customMiddleware1 =
  (getLogger: () => (msg: string) => void): WizardMiddleware<DemoData, DemoSteps> =>
  () =>
  (next) =>
  (action) => {
    // Skip logging for INIT to prevent infinite loops
    if (
      action.type !== 'INIT' &&
      action.type !== 'SET_ACTIVE_STEPS' &&
      action.type !== 'UPDATE_META'
    ) {
      const logger = getLogger();
      logger(`[M1] Middleware 1 (Action: ${action.type})`);
    }
    return next(action);
  };

/**
 * Custom middleware 2 for testing middleware order
 */
const customMiddleware2 =
  (getLogger: () => (msg: string) => void): WizardMiddleware<DemoData, DemoSteps> =>
  () =>
  (next) =>
  (action) => {
    // Skip logging for INIT to prevent infinite loops
    if (
      action.type !== 'INIT' &&
      action.type !== 'SET_ACTIVE_STEPS' &&
      action.type !== 'UPDATE_META'
    ) {
      const logger = getLogger();
      logger(`[M2] Middleware 2 (Action: ${action.type})`);
    }
    return next(action);
  };

/**
 * Middleware that blocks navigation from start step.
 * Demonstrates proper blocking pattern: don't call next() to block.
 */
const customMiddlewareBlockNavigation =
  (setAlert: (msg: string) => void): WizardMiddleware<DemoData, DemoSteps> =>
  (api) =>
  (next) =>
  (action) => {
    if (action.type === 'GO_TO_STEP') {
      const currentStepId = api.getSnapshot().currentStepId;
      const targetStepId = action.payload.to;

      console.log('[BlockNav]', {
        from: currentStepId,
        to: targetStepId,
        result: action.payload.result,
      });

      // Block leaving start step (but allow init navigation)
      if (action.payload.result === 'init') {
        setAlert('Navigation blocked! Cannot leave start step.');
        // Don't call next() - this blocks the action
        return;
      }
    }

    // Allow the action through
    return next(action);
  };

// --- WIZARD COMPONENTS ---

const Step1 = () => {
  const { handleStepChange, data } = useWizard<DemoData>();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Step 1: Middleware Demo</h3>
      <p className="text-sm text-gray-500">
        Notice the logs below update as you type. This is handled by a custom middleware.
      </p>
      <Input
        label="Your Name"
        data-testid="name-input"
        value={data.name || ''}
        onChange={(e) => handleStepChange('name', e.target.value)}
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
        value={data.email || ''}
        onChange={(e) => handleStepChange('email', e.target.value)}
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
  const isBlocking = search.get('blocking') === 'true';
  const isDebug = search.get('debug') === 'true';
  const isCustom = search.get('custom') === 'true';

  // Use ref to ensure addLog never changes reference
  const addLogRef = useRef<(msg: string) => void>(() => {});
  addLogRef.current = (msg: string) => {
    setLogs((prev) => [msg, ...prev].slice(0, 5));
  };

  const config: IWizardConfig<DemoData, DemoSteps> = useMemo(() => {
    // Create a stable getter function that always returns the current addLog ref
    const getLogger = () => addLogRef.current!;

    const middlewares: WizardMiddleware<DemoData, DemoSteps>[] = [
      loggerMiddleware,
      devToolsMiddleware,
      customAnalyticsMiddleware(getLogger),
    ];

    if (isCustom) {
      middlewares.push(customMiddleware1(getLogger));
      middlewares.push(customMiddleware2(getLogger));
    }

    if (isBlocking) {
      middlewares.push(customMiddlewareBlockNavigation(setAlert));
    }

    return {
      persistence: {
        mode: 'onChange',
        adapter: new MemoryAdapter(),
      },
      middlewares,
      steps: [
        { id: 'start', label: 'Start' },
        { id: 'middle', label: 'Middle' },
        { id: 'finish', label: 'Finish' },
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
          This demo showcases the power of the {__APP_VERSION__} middleware system and the visual
          DevTools overlay.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WizardProvider key={search.toString()} config={config} initialData={{ name: '' }}>
            <Card className="border-2 border-indigo-100 shadow-2xl" data-testid="wizard-container">
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
            <CardContent className="pt-4 space-y-2" data-testid="middleware-log">
              {logs.length === 0 && (
                <p className="text-gray-600 text-xs italic">No events yet. Start interacting...</p>
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

          <div>
            Try opening the <b>Redux DevTools</b> extension! The same actions are being piped there
            via <code>devToolsMiddleware</code>.
          </div>
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
      {currentStepId === 'start' && <Step1 />}
      {currentStepId === 'middle' && <Step2 />}
      {currentStepId === 'finish' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Step 3: Complete</h3>
          <p className="text-sm text-gray-500">
            All middleware events have been logged. Check the DevTools!
          </p>
        </div>
      )}
    </>
  );
}
