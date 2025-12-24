import React, { useEffect, useCallback } from "react";
import {
  WizardProvider,
  useWizard,
  useWizardValue,
  useWizardSelector,
  useWizardError,
  useWizardActions,
  type IWizardConfig,
  ZodAdapter,
} from "wizzard-stepper-react";
import { z } from "zod";
import { StepperControls } from "../components/StepperControls";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardFooter } from "../components/ui/Card";

// 1. Define Schema with nested arrays
const schema = z.object({
  parentName: z.string().min(1, "Parent name is required"),
  children: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Child name is required"),
        age: z.coerce.number().min(0, "Age must be positive"),
      })
    )
    .min(1, "At least one child is required"),
});

type FormData = z.infer<typeof schema>;
type Child = FormData["children"][0];

// 2. Define Steps
const Step1 = React.memo(() => {
  const { setData } = useWizardActions();
  const parentName = useWizardValue<string>("parentName");
  const { allErrors } = useWizard<FormData>();
  const errors = allErrors["parent"] || {};

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Parent Info</h2>
        <p className="text-gray-500 text-sm">
          Start with the head of the family.
        </p>
      </div>
      <Input
        label="Your Name"
        placeholder="Jane Doe"
        value={parentName || ""}
        onChange={(e) => setData("parentName", e.target.value)}
        error={errors["parentName"]}
      />
    </div>
  );
});

const ChildRow = React.memo(
  ({
    childId,
    index,
    onRemove,
  }: {
    childId: string;
    index: number;
    onRemove: (id: string) => void;
  }) => {
    const { setData } = useWizardActions();
    const name = useWizardValue<string>(`children[${index}].name`);
    const age = useWizardValue<number>(`children[${index}].age`);
    const nameError = useWizardError(`children.${index}.name`);
    const ageError = useWizardError(`children.${index}.age`);

    return (
      <div className="p-4 border border-gray-100 rounded-lg bg-gray-50 space-y-4 relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          onClick={() => onRemove(childId)}
        >
          Remove
        </Button>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={`Child #${index + 1} Name`}
            value={name || ""}
            onChange={(e) =>
              setData(`children[${index}].name`, e.target.value, {
                debounceValidation: 300,
              })
            }
            error={nameError}
          />
          <Input
            label="Age"
            type="number"
            value={age || 0}
            onChange={(e) =>
              setData(`children[${index}].age`, e.target.value, {
                debounceValidation: 300,
              })
            }
            error={ageError}
          />
        </div>
      </div>
    );
  }
);

const Step2 = React.memo(() => {
  const { setData, getData } = useWizardActions();
  const childIds = useWizardSelector((state: FormData) =>
    (state.children || []).map((c) => c.id)
  );
  const childrenError = useWizardError("children");

  const addChild = useCallback(() => {
    const currentChildren = getData("children") || [];
    const newChildren = [
      ...currentChildren,
      { id: crypto.randomUUID(), name: "", age: 0 },
    ];
    setData("children", newChildren);
  }, [setData, getData]);

  const removeChild = useCallback(
    (id: string) => {
      const currentChildren = getData("children") || [];
      const newChildren = currentChildren.filter((c: Child) => c.id !== id);
      setData("children", newChildren);
    },
    [setData, getData]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Children</h2>
        <p className="text-gray-500 text-sm">Add your children's details.</p>
      </div>

      <div className="space-y-4">
        {childIds.map((id: string, index: number) => (
          <ChildRow
            key={id}
            childId={id}
            index={index}
            onRemove={removeChild}
          />
        ))}

        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={addChild}
        >
          + Add Child
        </Button>
        {childrenError && (
          <p className="text-red-500 text-xs mt-1">{childrenError}</p>
        )}
      </div>
    </div>
  );
});

const Step3 = React.memo(() => {
  const { wizardData } = useWizard<FormData>();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Summary</h2>
        <p className="text-gray-500 text-sm">JSON state of your wizard.</p>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <pre className="text-xs text-gray-700 leading-relaxed overflow-auto">
          {JSON.stringify(wizardData, null, 2)}
        </pre>
      </div>
    </div>
  );
});

// 3. Define Config
const wizardConfig: IWizardConfig<FormData> = {
  steps: [
    {
      id: "parent",
      label: "Parent",
      validationAdapter: new ZodAdapter(schema.pick({ parentName: true })),
    },
    {
      id: "children",
      label: "Children",
      validationAdapter: new ZodAdapter(schema.pick({ children: true })),
    },
    { id: "summary", label: "Summary" },
  ],
};

// 4. Wizard Wrapper with Global Form
const WizardInner = () => {
  const { currentStep, goToNextStep, isLastStep, clearStorage } =
    useWizard<FormData>();

  useEffect(() => {
    return () => {
      // Clear storage when leaving the demo page
      clearStorage();
    };
  }, [clearStorage]);

  if (!currentStep) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      clearStorage();
    } else {
      await goToNextStep();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <form onSubmit={handleSubmit}>
        <Card className="shadow-xl shadow-indigo-50/50">
          <CardContent className="pt-8">
            {currentStep.id === "parent" && <Step1 />}
            {currentStep.id === "children" && <Step2 />}
            {currentStep.id === "summary" && <Step3 />}
          </CardContent>
          <CardFooter className="pb-8 block">
            <StepperControls />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default function ComplexDataWizard() {
  return (
    <WizardProvider config={wizardConfig}>
      <WizardInner />
    </WizardProvider>
  );
}
