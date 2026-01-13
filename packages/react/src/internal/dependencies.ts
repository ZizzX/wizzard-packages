import {
  type IWizardConfig,
  type IWizardStore,
  type IStepConfig,
  getByPath,
  setByPath,
} from '@wizzard-packages/core';

export interface StepDependenciesResult<T extends Record<string, any>, StepId extends string> {
  newData: T;
  hasClearing: boolean;
  clearedPaths: string[];
  statusChanged: boolean;
  nextCompletedSteps: Set<StepId>;
  nextVisitedSteps: Set<StepId>;
}

export const applyStepDependencies = <T extends Record<string, any>, StepId extends string>(
  config: IWizardConfig<T, StepId>,
  store: IWizardStore<T, StepId>,
  baseData: T,
  changedPaths: string[]
): StepDependenciesResult<T, StepId> => {
  let currentData = { ...baseData } as T;
  const allClearedPaths = new Set<string>();
  const snapshot = store.getSnapshot();
  const nextCompletedSteps = new Set(snapshot.completedSteps);
  const nextVisitedSteps = new Set(snapshot.visitedSteps);
  let statusChanged = false;

  const processDependencies = (paths: string[]) => {
    const newlyClearedPaths: string[] = [];

    config.steps.forEach((step: IStepConfig<T, StepId>) => {
      const isDependent = step.dependsOn?.some((p: string) =>
        paths.some((path) => path === p || p.startsWith(path + '.') || path.startsWith(p + '.'))
      );

      if (!isDependent) return;

      if (nextCompletedSteps.delete(step.id as StepId)) {
        statusChanged = true;
      }
      if (nextVisitedSteps.delete(step.id as StepId)) {
        statusChanged = true;
      }

      if (!step.clearData) return;

      if (typeof step.clearData === 'function') {
        const patch = step.clearData(currentData, paths);
        Object.keys(patch).forEach((key) => {
          if ((currentData as any)[key] !== (patch as any)[key]) {
            (currentData as any)[key] = (patch as any)[key];
            newlyClearedPaths.push(key);
            allClearedPaths.add(key);
          }
        });
      } else {
        const pathsToClear = Array.isArray(step.clearData) ? step.clearData : [step.clearData];
        pathsToClear.forEach((p: string) => {
          const val = getByPath(currentData, p);
          if (val !== undefined) {
            currentData = setByPath(currentData, p, undefined);
            newlyClearedPaths.push(p);
            allClearedPaths.add(p);
          }
        });
      }
    });

    if (newlyClearedPaths.length > 0) {
      processDependencies(newlyClearedPaths);
    }
  };

  processDependencies(changedPaths);

  return {
    newData: currentData,
    hasClearing: allClearedPaths.size > 0,
    clearedPaths: Array.from(allClearedPaths),
    statusChanged,
    nextCompletedSteps,
    nextVisitedSteps,
  };
};
