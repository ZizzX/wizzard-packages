import { createWizardFactory } from '@wizzard-packages/react';
import type { Path, PathValue } from '@wizzard-packages/core';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { cn } from '../lib/utils';
import { Check, ChevronRight } from 'lucide-react';
import React from 'react';

/**
 * Creates a Shadcn-styled Wizard instance with typed hooks and components.
 */
export function createShadcnWizard<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TSchema extends Record<string, any>,
  StepId extends string = string,
>() {
  // 1. Create the core wizard factory
  const core = createWizardFactory<TSchema, StepId>();

  // 2. Create specialized UI components bound to this wizard instance

  const WizardContainer = ({
    children,
    title,
    description,
    className,
  }: {
    children: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
  }) => {
    return (
      <Card className={cn('w-full max-w-2xl mx-auto', className)}>
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    );
  };

  const WizardStepper = ({ className }: { className?: string }) => {
    const { activeSteps, currentStepId, history, completedSteps } = core.useWizardState();
    const { goToStep } = core.useWizardActions();

    return (
      <div className={cn('flex items-center space-x-2 mb-8', className)}>
        {activeSteps.map((step, index) => {
          const isActive = step.id === currentStepId;
          const isCompleted = completedSteps.has(step.id);
          const isVisited = history.includes(step.id);
          const canNavigate = isVisited || isCompleted;

          return (
            <React.Fragment key={step.id}>
              {index > 0 && (
                <div
                  className={cn(
                    'h-0.5 w-8 transition-colors',
                    isCompleted || isActive ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
              <div className="relative flex flex-col items-center group">
                <button
                  onClick={() => canNavigate && goToStep(step.id)}
                  disabled={!canNavigate}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors',
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isCompleted
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted bg-background text-muted-foreground',
                    canNavigate && 'hover:border-primary/80 cursor-pointer',
                    !canNavigate && 'cursor-default'
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
                </button>
                <span
                  className={cn(
                    'absolute top-10 w-32 text-center text-xs font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const WizardControls = ({
    className,
    nextLabel = 'Next',
    prevLabel = 'Back',
    submitLabel = 'Complete',
    onComplete,
  }: {
    className?: string;
    nextLabel?: string;
    prevLabel?: string;
    submitLabel?: string;
    onComplete?: (data: TSchema) => void;
  }) => {
    const { isFirstStep, isLastStep, isBusy, data, currentStepId } = core.useWizardState();
    const { goToNextStep, goToPrevStep, validateStep } = core.useWizardActions();

    const handleNext = async () => {
      if (isLastStep) {
        const isValid = await validateStep(currentStepId as StepId);
        if (isValid) {
          onComplete?.(data);
        }
      } else {
        await goToNextStep();
      }
    };

    return (
      <div className={cn('flex justify-between mt-8', className)}>
        <Button variant="outline" onClick={() => goToPrevStep()} disabled={isFirstStep || isBusy}>
          {prevLabel}
        </Button>
        <Button onClick={handleNext} disabled={isBusy}>
          {isLastStep ? submitLabel : nextLabel}
          {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    );
  };

  const WizardStep = ({ stepId, children }: { stepId: StepId; children: React.ReactNode }) => {
    const { currentStepId } = core.useWizardState();

    if (currentStepId !== stepId) {
      return null;
    }

    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
        {children}
      </div>
    );
  };

  const WizardField = <P extends Path<TSchema>>({
    path,
    label,
    children,
  }: {
    path: P;
    label?: string;
    children: (props: {
      value: PathValue<TSchema, P>;
      onChange: (val: PathValue<TSchema, P> | React.ChangeEvent<HTMLInputElement>) => void;
      error?: string;
    }) => React.ReactNode;
  }) => {
    const [value, setValue] = core.useWizardField(path);
    const error = core.useWizardError(path);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (val: any) => {
      if (val && typeof val === 'object' && 'target' in val) {
        setValue(val.target.value);
      } else {
        setValue(val);
      }
    };

    return (
      <div className="space-y-2">
        {label && <Label className={cn(error && 'text-destructive')}>{label}</Label>}
        {children({ value, onChange: handleChange, error })}
        {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
      </div>
    );
  };

  // 3. Return the extended bundle
  return {
    ...core,
    WizardContainer,
    WizardStepper,
    WizardControls,
    WizardStep,
    WizardField,
  };
}
