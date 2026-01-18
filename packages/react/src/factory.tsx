import {
  type IStepConfig,
  type IWizardConfig,
  type IWizardContext,
  type IWizardState,
  type Path,
  type PathValue,
  shallowEqual,
} from '@wizzard-packages/core';
import React from 'react';
import {
  WizardProvider as BaseWizardProvider,
  useWizardActions as useBaseWizardActions,
  useWizardContext as useBaseWizardContext,
  useWizardError as useBaseWizardError,
  useWizardSelector as useBaseWizardSelector,
  useWizardState as useBaseWizardState,
  useWizardValue as useBaseWizardValue,
} from './context/WizardContext';
import { useWizard as useBaseWizard } from './hooks/useWizard';
import type { IWizardActionsTyped } from './types';

/**
 * createWizardFactory
 *
 * Creates a strongly-typed set of Wizard components and hooks for a specific data schema.
 *
 * @template TSchema The shape of your wizard's global data state
 */
export function createWizardFactory<
  TSchema extends Record<string, any>,
  StepId extends string = string,
>() {
  const WizardProvider = ({
    config,
    initialData,
    initialStepId,
    children,
  }: {
    config: IWizardConfig<TSchema, StepId>;
    initialData?: Partial<TSchema>;
    initialStepId?: StepId;
    children: React.ReactNode;
  }) => {
    return (
      <BaseWizardProvider<TSchema, StepId>
        config={config}
        initialData={initialData as TSchema}
        initialStepId={initialStepId}
      >
        {children}
      </BaseWizardProvider>
    );
  };

  const useWizard = (): IWizardContext<TSchema, StepId> => {
    return useBaseWizard<TSchema, StepId>() as any;
  };

  const useWizardContext = () => {
    return useBaseWizardContext<TSchema, StepId>() as any;
  };

  const useWizardValue = <P extends Path<TSchema>>(
    path: P,
    options?:
      | { isEqual?: (a: PathValue<TSchema, P>, b: PathValue<TSchema, P>) => boolean }
      | ((a: PathValue<TSchema, P>, b: PathValue<TSchema, P>) => boolean)
  ): PathValue<TSchema, P> => {
    return useBaseWizardValue<PathValue<TSchema, P>>(path as string, options as any);
  };

  const useWizardField = <P extends Path<TSchema>>(
    path: P,
    options?:
      | { isEqual?: (a: PathValue<TSchema, P>, b: PathValue<TSchema, P>) => boolean }
      | ((a: PathValue<TSchema, P>, b: PathValue<TSchema, P>) => boolean)
  ): [PathValue<TSchema, P>, (value: PathValue<TSchema, P>) => void] => {
    const value = useWizardValue(path, options);
    const { setData } = useWizardActions();
    return [value, (next) => setData(path, next)];
  };

  const useWizardSelector = <TSelected,>(
    selector: (state: IWizardState<TSchema, StepId>) => TSelected,
    options?:
      | { isEqual?: (a: TSelected, b: TSelected) => boolean }
      | ((a: TSelected, b: TSelected) => boolean)
  ): TSelected => {
    return useBaseWizardSelector<TSelected>(selector as any, options as any);
  };

  const useWizardShallowSelector = <TSelected,>(
    selector: (state: IWizardState<TSchema, StepId>) => TSelected
  ): TSelected => {
    return useWizardSelector(selector, shallowEqual);
  };

  const useWizardError = <P extends Path<TSchema>>(path: P): string | undefined => {
    return useBaseWizardError(path as string);
  };

  const useWizardActions = () => {
    return useBaseWizardActions<StepId>() as IWizardActionsTyped<TSchema, StepId>;
  };

  const useWizardState = () => {
    return useBaseWizardState<TSchema, StepId>();
  };

  const useBreadcrumbs = () => {
    return useBaseWizardState<TSchema, StepId>().breadcrumbs;
  };

  const createStep = (config: IStepConfig<TSchema, StepId>) => config;

  return {
    WizardProvider,
    useWizard,
    useWizardContext,
    useWizardValue,
    useWizardField,
    useWizardSelector,
    useWizardShallowSelector,
    useWizardError,
    useWizardActions,
    useWizardState,
    useBreadcrumbs,
    createStep,
  };
}
