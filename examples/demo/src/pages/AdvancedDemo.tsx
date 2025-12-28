import React from "react";
import { WizardStepRenderer } from "wizzard-stepper-react";
import {
  WizardProvider,
  useWizard,
  useWizardActions,
  useWizardValue,
  useWizardError,
  advancedConfig,
  type DemoData,
} from "../wizards/advanced-wizard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { StepperControls } from "../components/StepperControls";
import { motion, AnimatePresence } from "framer-motion";

// --- Components ---

const DataToolbar = () => {
  const { updateData, validateAll, goToStep, reset } = useWizardActions();
  const { currentStep, allErrors, isBusy } = useWizard();

  const handleAutofill = async () => {
    updateData(
      {
        personal: {
          firstName: "Auto",
          lastName: "Bot",
          email: "autobot@example.com",
        },
        preferences: {
          theme: "dark",
          newsletter: true,
        },
        security: {
          password: "",
          confirmPassword: "",
        },
      },
      {
        replace: true,
      }
    );
    const { isValid, errors } = await validateAll();

    if (!isValid) {
      goToStep(Object.keys(errors)[0]);
    }
  };

  const hasErrors = Object.keys(allErrors).length > 0;

  return (
    <div className="space-y-4 mb-6">
      <div className="bg-gray-800 text-white p-4 rounded-lg flex justify-between items-center shadow-lg">
        <div className="text-sm">
          <span className="font-bold text-yellow-400">Current Step:</span>{" "}
          {currentStep?.id}
          {isBusy && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-2 inline-block animate-spin"
            >
              ⏳
            </motion.span>
          )}
        </div>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
            onClick={handleAutofill}
          >
            🪄 Autofill
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-300 hover:text-red-100"
            onClick={() => reset()}
          >
            🧹 Reset
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
        <motion.div
          className="bg-indigo-600 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${useWizard().progress}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase mb-6 px-1">
        <span>Progress</span>
        <span>{useWizard().progress}%</span>
      </div>

      {/* Validation Debug Widget */}
      {hasErrors && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-md p-3 text-xs text-red-700 font-mono"
        >
          <p className="font-bold mb-1">Validation Errors (Live):</p>
          <pre>{JSON.stringify(allErrors, null, 2)}</pre>
        </motion.div>
      )}
    </div>
  );
};

// Step 1: Personal (Standard)
const PersonalStep = () => {
  const { setData } = useWizardActions();
  const firstName = useWizardValue("personal.firstName");
  const lastName = useWizardValue("personal.lastName");
  const email = useWizardValue("personal.email");

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 text-blue-800 rounded mb-4 text-sm">
        ℹ️ This step persists to <b>LocalStorage</b>. Try reloading!
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={firstName || ""}
          onChange={(e) =>
            setData("personal.firstName", e.target.value, {
              debounceValidation: 400,
            })
          }
          error={useWizardError("personal.firstName")}
        />
        <Input
          label="Last Name"
          value={lastName || ""}
          onChange={(e) =>
            setData("personal.lastName", e.target.value, {
              debounceValidation: 400,
            })
          }
          error={useWizardError("personal.lastName")}
        />
      </div>
      <Input
        label="Email"
        value={email || ""}
        onChange={(e) =>
          setData("personal.email", e.target.value, { debounceValidation: 400 })
        }
        error={useWizardError("personal.email")}
      />
    </div>
  );
};

// Step 2: Security (RAM Only)
const SecurityStep = () => {
  const { setData } = useWizardActions();
  const password = useWizardValue("security.password");
  const confirm = useWizardValue("security.confirmPassword");

  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded mb-4 text-sm border border-yellow-200">
        🔒 This step uses <b>MemoryAdapter</b>. Data vanishes on reload!
      </div>
      <Input
        label="Password"
        type="password"
        value={password || ""}
        onChange={(e) =>
          setData("security.password", e.target.value, {
            debounceValidation: 400,
          })
        }
        error={useWizardError("security.password")}
      />
      <Input
        label="Confirm Password"
        type="password"
        value={confirm || ""}
        onChange={(e) =>
          setData("security.confirmPassword", e.target.value, {
            debounceValidation: 400,
          })
        }
        error={useWizardError("security.confirmPassword")}
      />
    </div>
  );
};

// Step 3: Preferences
const PreferencesStep = () => {
  const { setData, wizardData } = useWizard();

  return (
    <div className="space-y-4">
      <h3 className="font-bold">Preferences</h3>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={!!wizardData.preferences?.newsletter}
          onChange={(e) => setData("preferences.newsletter", e.target.checked)}
          className="rounded text-indigo-600 focus:ring-indigo-500"
        />
        <span>Subscribe to newsletter</span>
      </label>
      <div className="p-4 bg-gray-100 rounded">
        <p className="text-xs font-mono">
          {JSON.stringify(wizardData.preferences, null, 2)}
        </p>
      </div>
    </div>
  );
};

// Step 4: Done
const DoneStep = () => (
  <div className="text-center py-12">
    <div className="text-5xl mb-4">🎉</div>
    <h2 className="text-2xl font-bold">All Set!</h2>
    <p className="text-gray-500">Check the console for `onStepChange` logs.</p>
  </div>
);

// Map components to IDs for the Renderer
// Note: In a real app, you might put `component: PersonalStep` directly in the IStepConfig.
// But we can also use a switch or object map here if we prefer separating config from UI.
// Let's use the Renderer's power by modifying the config on the fly or just following the "Renderer Manual" pattern
// if we didn't put components in config.
// Wait! The user WANTS to see the Renderer used with components in config?
// The library supports `component` in `IStepConfig`.
// Let's update `advanced-wizard.ts` to include them?
// Actually, `WizardStepRenderer` uses `currentStep.component`.
// Since I defined `advancedConfig` in a separate file without React imports, I can't easily put components there
// unless I change extensions or import React there.
// Solution: I will extend the config here in the component to attach components.

const stepsWithComponents = advancedConfig.steps.map((step) => {
  switch (step.id) {
    case "personal":
      return { ...step, component: PersonalStep };
    case "security":
      return { ...step, component: SecurityStep };
    case "preferences":
      return { ...step, component: PreferencesStep };
    case "complete":
      return { ...step, component: DoneStep };
    default:
      return step;
  }
});

const configWithComponents = {
  ...advancedConfig,
  steps: stepsWithComponents,
};

// Animation Wrapper
const StepWrapper = ({ children }: { children: React.ReactNode }) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="min-h-80"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

const StepProgressList = () => {
  const {
    config,
    activeSteps,
    visitedSteps,
    busySteps,
    currentStep,
    goToStep,
  } = useWizard();

  return (
    <div className="flex flex-col space-y-2 mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
        Wizard Steps Status
      </h3>
      <div className="flex flex-wrap gap-2">
        {config.steps.map((step) => {
          const isActive = activeSteps.find((s) => s.id === step.id);
          const isVisited = visitedSteps.has(step.id);
          const isCurrent = currentStep?.id === step.id;
          const isStepBusy = busySteps.has(step.id);

          return (
            <motion.button
              key={step.id}
              onClick={() => isActive && goToStep(step.id)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center space-x-2
                ${
                  isCurrent
                    ? "bg-indigo-600 text-white shadow-md ring-2 ring-indigo-100"
                    : isActive
                      ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      : "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50"
                }
              `}
              whileHover={isActive ? { scale: 1.02 } : {}}
              whileTap={isActive ? { scale: 0.98 } : {}}
            >
              <span className="flex items-center">
                {isVisited && !isCurrent && !isStepBusy && "✅ "}
                {isCurrent && !isStepBusy && "🎯 "}
                {isStepBusy && (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="inline-block mr-1"
                  >
                    ⏳
                  </motion.span>
                )}
                {step.label}
              </span>
              {!isActive && !isStepBusy && (
                <span className="text-[10px] opacity-70">(Hidden)</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

const AdvancedWizardInner = () => {
  return (
    <div className="max-w-xl mx-auto py-8">
      <DataToolbar />
      <StepProgressList />
      <Card>
        <CardContent className="pt-6 relative">
          {/* Transition Overlay for Async Loading */}
          <AnimatePresence>
            {useWizard().isPending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-t-xl"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                    Checking conditions...
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Declarative Rendering! */}
          <WizardStepRenderer wrapper={StepWrapper} />
        </CardContent>
        <div className="border-t p-6 bg-gray-50">
          <StepperControls />
        </div>
      </Card>

      {/* History Debug Feed */}
      <div className="mt-10 pt-10 border-t border-gray-100">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
          Navigation History (Live)
        </h4>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {useWizard().history.map((stepId, idx) => (
              <motion.div
                key={`${stepId}-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-1 bg-gray-50 border border-gray-100 rounded text-[11px] font-mono text-gray-500"
              >
                {stepId}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const initialData: DemoData = {
  personal: { firstName: "", lastName: "", email: "" },
  security: { password: "", confirmPassword: "" },
  preferences: { theme: "light", newsletter: false },
};

export default function AdvancedDemo() {
  return (
    <WizardProvider config={configWithComponents} initialData={initialData}>
      <AdvancedWizardInner />
    </WizardProvider>
  );
}
