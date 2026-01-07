import React from "react";
import {
  WizardProvider as BaseWizardProvider,
  useWizardContext as useBaseWizardContext,
  useWizardValue as useBaseWizardValue,
  useWizardSelector as useBaseWizardSelector,
  useWizardError as useBaseWizardError,
  useWizardActions as useBaseWizardActions,
  useWizardState as useBaseWizardState,
} from "./context/WizardContext";
import { useWizard as useBaseWizard } from "./hooks/useWizard";
import type { IWizardConfig, IWizardContext, IStepConfig } from "./types";
import type { Path, PathValue } from "./utils/types";

/**
 * createWizardFactory
 *
 * Creates a strongly-typed set of Wizard components and hooks for a specific data schema.
 * This ensures full type safety across your entire wizard implementation without manual casting.
 *
 * @template TSchema The shape of your wizard's global data state
 */
export function createWizardFactory<
  TSchema extends Record<string, any>,
  StepId extends string = string,
>() {
  /**
   * Typed Provider
   */
  const WizardProvider = ({
    config,
    initialData,
    children,
  }: {
    config: IWizardConfig<TSchema, StepId>;
    initialData?: Partial<TSchema>;
    children: React.ReactNode;
  }) => {
    return (
      <BaseWizardProvider<TSchema, StepId>
        config={config}
        initialData={initialData as TSchema}
      >
        {children}
      </BaseWizardProvider>
    );
  };

  /**
   * Typed useWizard
   * Returns the full context with TSchema typed data and methods
   */
  const useWizard = (): IWizardContext<TSchema, StepId> => {
    return useBaseWizard<TSchema, StepId>();
  };

  /**
   * Typed useWizardContext
   * similar to useWizard but explicit about strict context usage
   */
  const useWizardContext = () => {
    return useBaseWizardContext<TSchema, StepId>();
  };

  /**
   * Typed useWizardValue
   * @param path Dot-notation path to the value
   */
  const useWizardValue = <P extends Path<TSchema>>(
    path: P,
    options?: {
      isEqual?: (a: PathValue<TSchema, P>, b: PathValue<TSchema, P>) => boolean;
    }
  ): PathValue<TSchema, P> => {
    return useBaseWizardValue<PathValue<TSchema, P>>(path, options);
  };

  /**
   * Typed useWizardSelector
   * @param selector Function to select a slice of state
   */
  const useWizardSelector = <TSelected,>(
    selector: (state: IWizardContext<TSchema, StepId>) => TSelected,
    options?: { isEqual?: (a: TSelected, b: TSelected) => boolean }
  ): TSelected => {
    return useBaseWizardSelector<TSelected>(selector, options);
  };

  /**
   * Typed useWizardError
   * @param path Dot-notation path to check for errors
   */
  const useWizardError = <P extends Path<TSchema>>(
    path: P
  ): string | undefined => {
    return useBaseWizardError(path);
  };

  /**
   * Typed useWizardActions
   * No generic needed for actions usually, but we wrap it for consistency
   */
  const useWizardActions = () => {
    return useBaseWizardActions<StepId>();
  };

  /**
   * Typed useWizardState
   * Access to raw internal state if needed (advanced)
   */
  const useWizardState = () => {
    return useBaseWizardState<TSchema, StepId>();
  };

  /**
   * Typed useBreadcrumbs
   */
  const useBreadcrumbs = () => {
    return useBaseWizardState<TSchema, StepId>().breadcrumbs;
  };

  /**
   * Helper to create a typed step configuration.
   * By using this helper, TypeScript can infer TStepData from the validationAdapter or other properties.
   */
  const createStep = <
    TSchema extends Record<string, any>,
    TStepId extends string = string,
  >(
    config: IStepConfig<TSchema, TStepId>
  ) => config;

  return {
    /**
     * Context provider that must wrap any component using wizard hooks.
     * 
     * @example
     * ```tsx
     * <WizardProvider config={myConfig}>
     *   <MyWizardContent />
     * </WizardProvider>
     * ```
     */
    WizardProvider,

    /**
     * Primary hook to access both state and actions.
     * Note: Accessing data through this hook will trigger re-renders on ANY data change.
     * For better performance, use `useWizardValue` or `useWizardSelector`.
     */
    useWizard,

    /**
     * Alias for `useWizard` that emphasizes context usage.
     */
    useWizardContext,

    /**
     * Atomic hook to subscribe to a single field value by its path.
     * Component will ONLY re-render when the specific path value changes.
     * 
     * @param path Dot-notation path to the value
     * @example const email = useWizardValue('user.email');
     */
    useWizardValue,

    /**
     * Powerful hook to select exactly what you need from the wizard context.
     * Accepts a selector function and an optional equality checker.
     * 
     * @param selector Function to select data
     * @example const isCompleted = useWizardSelector(s => s.completedSteps.size === 5);
     */
    useWizardSelector,

    /**
     * Atomic hook to subscribe to validation errors for a specific field.
     * 
     * @param path Dot-notation path to the field
     */
    useWizardError,

    /**
     * Actions hook returns stable functions to control the wizard (navigating, updating data).
     * This hook NEVER causes re-renders.
     */
    useWizardActions,

    /**
     * Provides access to the full internal state object.
     * Use with caution as it will trigger re-renders on any state update.
     */
    useWizardState,

    /**
     * Returns the current list of breadcrumbs for navigation.
     */
    useBreadcrumbs,

    /**
     * Helper to create a typed step configuration.
     * Useful when defining steps outside of the main factory call.
     */
    createStep,
  };
}
