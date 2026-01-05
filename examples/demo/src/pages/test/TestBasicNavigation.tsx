import type { IStepConfig, IWizardConfig } from "wizzard-stepper-react";
import {
  WizardProvider,
  useWizardState,
  useWizardActions,
  type BasicNavigationSchema,
} from "../../wizards/basic-navigation-wizard";
import { Card, CardContent, CardFooter } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useEffect } from "react";

/**
 * TestBasicNavigation
 *
 * Test page for E2E tests: basic-navigation.spec.ts (8 tests)
 *
 * Tests:
 * - Next/prev navigation
 * - Direct step navigation via breadcrumbs
 * - First/last step boundaries
 * - Progress tracking
 * - Navigation history
 * - Scroll behavior
 */

// Step Components
const Step1 = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Step 1</h2>
      <p className="text-gray-600">This is the first step of the wizard.</p>
      <p className="text-sm text-gray-500">Use the navigation buttons below.</p>
    </div>
  );
};

const Step2 = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Step 2</h2>
      <p className="text-gray-600">This is the second step.</p>
    </div>
  );
};

const Step3 = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Step 3</h2>
      <p className="text-gray-600">Final step - you can complete the wizard.</p>
    </div>
  );
};

// Breadcrumb Navigation
const BreadcrumbNav = () => {
  const { goToStep } = useWizardActions();
  const { visitedSteps, currentStepIndex, breadcrumbs } = useWizardState();

  return (
    <div className="flex gap-2 mb-6" data-testid="breadcrumb-nav">
      {breadcrumbs.map((crumb: IStepConfig, index: number) => {
        const isVisited = visitedSteps.has(crumb.id as string);
        const isCurrent = index === currentStepIndex;
        const isClickable = isVisited || isCurrent;

        return (
          <button
            key={crumb.id}
            data-testid={`breadcrumb-step-${crumb.id}`}
            onClick={() => isClickable && goToStep(crumb.id as string)}
            disabled={!isClickable}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isCurrent
                ? "bg-indigo-600 text-white"
                : isVisited
                  ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {crumb.label}
          </button>
        );
      })}
    </div>
  );
};

// Progress Bar
const ProgressBar = () => {
  const { progress } = useWizardState();

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div
        data-testid="progress-bar"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
      >
        <div
          className="bg-indigo-600 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Navigation History (for testing)
const NavigationHistory = () => {
  const { history } = useWizardState();

  if (history.length === 0) return null;

  return (
    <div
      data-testid="wizard-history"
      className="mt-4 p-3 bg-gray-50 rounded-lg"
    >
      <div className="text-xs font-medium text-gray-500 mb-1">
        Navigation History:
      </div>
      <div className="text-xs text-gray-700">{history.join(" → ")}</div>
    </div>
  );
};

// Step Indicators
const StepIndicators = () => {
  const { activeSteps, currentStepIndex } = useWizardState();

  return (
    <div className="flex gap-1 justify-center mb-4">
      {activeSteps.map((_step, index: number) => (
        <div
          key={index}
          data-testid="step-indicator"
          className={`h-2 w-2 rounded-full ${
            index === currentStepIndex ? "bg-indigo-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Main Wizard Content
const WizardContent = () => {
  const {
    currentStep,
    isFirstStep,
    isLastStep,
    currentStepIndex,
    activeSteps,
  } = useWizardState();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStepIndex]);

  if (!currentStep) return null;

  return (
    <div data-testid="wizard-container" className="max-w-2xl mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardContent className="pt-8">
          <BreadcrumbNav />
          <ProgressBar />
          <StepIndicators />

          {/* Current Step Display */}
          <div
            data-testid="current-step"
            className="mb-4 text-sm font-medium text-gray-500 text-center"
          >
            Step {currentStepIndex + 1} of {activeSteps.length}
          </div>

          {/* Step Content */}
          <div className="min-h-[200px]">
            {currentStep.id === "step1" && <Step1 />}
            {currentStep.id === "step2" && <Step2 />}
            {currentStep.id === "step3" && <Step3 />}
          </div>

          <NavigationHistory />
        </CardContent>

        <CardFooter className="pb-8 flex justify-between border-t pt-4 mt-6">
          <Button
            data-testid="prev-button"
            variant="secondary"
            onClick={goToPrevStep}
            disabled={isFirstStep}
          >
            Previous
          </Button>

          <Button
            data-testid={isLastStep ? "submit-button" : "next-button"}
            variant="primary"
            onClick={
              isLastStep
                ? () =>
                    (document.body.innerHTML +=
                      '<div data-testid="complete-message">Wizard Completed!</div>')
                : goToNextStep
            }
          >
            {isLastStep ? "Complete" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Wizard Config
const wizardConfig: IWizardConfig<BasicNavigationSchema> = {
  steps: [
    { id: "step1", label: "Step 1" },
    { id: "step2", label: "Step 2" },
    { id: "step3", label: "Step 3" },
  ],
};

// Export
export default function TestBasicNavigation() {
  return (
    <WizardProvider config={wizardConfig}>
      <WizardContent />
    </WizardProvider>
  );
}
