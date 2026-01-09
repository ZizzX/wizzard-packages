import React, { useMemo, Suspense } from 'react';
import { useWizardContext } from '../context/WizardContext';

export interface WizardStepRendererProps {
  wrapper?: React.ComponentType<{ children: React.ReactNode; key: string }>;
  fallback?: React.ReactNode;
}

export const WizardStepRenderer: React.FC<WizardStepRendererProps> = ({
  wrapper: Wrapper,
  fallback = null,
}) => {
  const { currentStep } = useWizardContext();

  const StepComponent = useMemo(() => {
    if (!currentStep?.component) return null;
    return currentStep.component;
  }, [currentStep]);

  if (!currentStep || !StepComponent) {
    return null;
  }

  const content = (
    <Suspense fallback={fallback}>
      <StepComponent />
    </Suspense>
  );

  if (Wrapper) {
    return <Wrapper key={currentStep.id}>{content}</Wrapper>;
  }

  return content;
};
