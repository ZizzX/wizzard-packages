import { createWizardFactory, devToolsMiddleware } from "wizzard-stepper-react";
import type { IWizardConfig } from "wizzard-stepper-react";

export interface IOptimizationWizardData {
    firstName: string;
    lastName: string;
    email: string;
    userType: "basic" | "pro";
}

export const optimizationWizardConfig: IWizardConfig<IOptimizationWizardData> = {
  middlewares: [devToolsMiddleware],
  persistence: {
      mode: 'manual',
      storageKey: 'opt_wizard'
  },
  steps: [
    {
      id: "loading",
      label: "Loading...",
      // This step is just a placeholder for the initial loading state if needed, 
      // but we will handle loading at the app level. 
      // Let's use it as a landing step.
      component: () => null, 
      condition: () => false, // Hidden
    },
    {
      id: "personal",
      label: "Personal Info (onChange)",
      validationMode: "onChange",
      validationAdapter: {
        validate: (data) => {
          const errors: Record<string, string> = {};
          if (!data.firstName || data.firstName.length < 3) {
            errors.firstName = "Name must be at least 3 chars";
          }
          return { isValid: Object.keys(errors).length === 0, errors };
        },
      },
    },
    {
      id: "details",
      label: "Details (onStepChange)",
      validationMode: "onStepChange",
      validationAdapter: {
        validate: (data) => {
          const errors: Record<string, string> = {};
          if (!data.email || !data.email.includes("@")) {
            errors.email = "Invalid email";
          }
          return { isValid: Object.keys(errors).length === 0, errors };
        },
      },
    },
    {
      id: "heavy-calc",
      label: "Heavy Calculation",
      // Only show this step if user is "pro"
      // Optimization: conditionDependsOn ensures this is only checked when 'userType' changes
      conditionDependsOn: ["userType"],
      condition: async (data) => {
        console.log("Checking heavy condition... (simulating API)");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return data.userType === "pro";
      },
      showWhilePending: true, // Show loader while checking
    },
    {
        id: "confirm-leave",
        label: "Confirm Leave",
        beforeLeave: async (data, dir, meta) => {     
          console.log(data, dir, meta);
            if (meta.isDirty) {
                // In a real app, you might show a modal. 
                // For demo, we use window.confirm (bad UX but works for proof)
                return window.confirm("You have unsaved changes. Leave?");
            }
            return true;
        }
    },
    {
        id: "final",
        label: "Completion",
    }
  ],
};

export const {
  WizardProvider,
  useWizard,
  useWizardState,
  useWizardActions,
  useWizardSelector
} = createWizardFactory<IOptimizationWizardData>();