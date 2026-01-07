import React, { useMemo, Suspense } from "react";
import { useWizardContext } from "../context/WizardContext";

export interface WizardStepRendererProps {
  /**
   * Optional wrapper component for each step.
   * Useful for adding animations (e.g., Framer Motion).
   */
  wrapper?: React.ComponentType<{ children: React.ReactNode; key: string }>;
  /**
   * Optional fallback to show while lazy-loading a step component.
   */
  fallback?: React.ReactNode;
}

/**
 * A declarative component that renders the current step based on the configuration.
 * It looks for the `component` property in your `steps` config.
 */
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
