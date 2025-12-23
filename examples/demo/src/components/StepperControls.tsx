import { useWizard } from 'wizzard-stepper-react';
import { Button } from './ui/Button';

export const StepperControls = () => {
  const {
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPrevStep,
    activeSteps,
    isLoading,
  } = useWizard();

  if (isLoading) return null;

  return (
    <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
      <Button
        type="button"
        variant="secondary"
        onClick={goToPrevStep}
        disabled={isFirstStep}
      >
        Previous
      </Button>
      
      <div className="text-sm font-medium text-gray-500">
          Step {currentStepIndex + 1} of {activeSteps.length}
      </div>

      <Button
        type="button"
        variant="primary"
        onClick={goToNextStep}
      >
        {isLastStep ? 'Complete' : 'Next'}
      </Button>
    </div>
  );
};
