import { useWizardState, useWizardActions } from '@wizzard-packages/react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

interface StepperControlsProps {
  onComplete?: () => void | Promise<void>;
}

export const StepperControls = ({ onComplete }: StepperControlsProps) => {
  const { currentStepIndex, isFirstStep, isLastStep, activeSteps, isLoading } = useWizardState();

  const { goToNextStep, goToPrevStep, clearStorage } = useWizardActions();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (isLastStep) {
      if (onComplete) {
        await onComplete();
      } else {
        clearStorage();
        navigate('/examples');
      }
    } else {
      await goToNextStep();
    }
  };

  return (
    <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
      <Button
        data-testid="prev-button"
        type="button"
        variant="secondary"
        onClick={goToPrevStep}
        disabled={isFirstStep || isLoading}
      >
        Previous
      </Button>

      <div data-testid="current-step" className="text-sm font-medium text-gray-500">
        Step {currentStepIndex + 1} of {activeSteps.length}
      </div>

      <Button
        data-testid={isLastStep ? 'submit-button' : 'next-button'}
        type="button"
        variant="primary"
        onClick={handleNext}
        disabled={isLoading}
      >
        {isLastStep ? 'Complete' : 'Next'}
      </Button>
    </div>
  );
};
