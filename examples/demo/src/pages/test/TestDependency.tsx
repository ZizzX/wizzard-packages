import {
  WizardProvider,
  useWizard,
  useWizardActions,
  useWizardSelector,
  type IWizardConfig,
  MemoryAdapter,
} from "wizzard-stepper-react";
import { Card, CardContent, CardFooter } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

interface DependencyData {
  country?: string;
  state?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  pricingType?: "simple" | "tiered";
  tier1Price?: string;
  tier2Price?: string;
  fieldA?: string;
  fieldB?: string;
  fieldC?: string;
  user?: {
    name?: string;
    address?: {
      zip?: string;
    };
  };
  shippingMethod?: string;
}

// --- Steps ---

const LocationStep = () => {
  const { data } = useWizard<DependencyData>();
  const { updateData } = useWizardActions();

  const states =
    data.country === "US"
      ? ["CA", "NY", "TX"]
      : data.country === "CA"
        ? ["ON", "BC", "QC"]
        : [];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Location Dependencies</h2>

      <div>
        <label className="block text-sm font-medium">Country</label>
        <select
          data-testid="country-select"
          className="w-full border p-2 rounded"
          value={data.country || ""}
          onChange={(e) =>
            updateData({ country: e.target.value, state: undefined })
          }
        >
          <option value="">Select Country</option>
          <option value="US">USA</option>
          <option value="CA">Canada</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">State</label>
        <select
          data-testid="state-select"
          className="w-full border p-2 rounded"
          value={data.state || ""}
          onChange={(e) => updateData({ state: e.target.value })}
          disabled={!data.country}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ProductStep = () => {
  const { data } = useWizard<DependencyData>();
  const { updateData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Product Dependencies</h2>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          data-testid="category-select"
          className="w-full border p-2 rounded"
          value={data.category || ""}
          onChange={(e) =>
            updateData({
              category: e.target.value,
              subcategory: undefined,
              brand: undefined,
            })
          }
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      <Input
        data-testid="subcategory-input"
        label="Subcategory"
        value={data.subcategory || ""}
        onChange={(e) =>
          updateData({ subcategory: e.target.value, brand: undefined })
        }
        disabled={!data.category}
      />

      <Input
        data-testid="brand-input"
        label="Brand"
        value={data.brand || ""}
        onChange={(e) => updateData({ brand: e.target.value })}
        disabled={!data.subcategory}
      />
    </div>
  );
};

const PricingStep = () => {
  const { data } = useWizard<DependencyData>();
  const { updateData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Pricing Dependencies</h2>

      <div>
        <label className="block text-sm font-medium">Pricing Type</label>
        <select
          data-testid="pricing-type"
          className="w-full border p-2 rounded"
          value={data.pricingType || ""}
          onChange={(e) =>
            updateData({
              pricingType: e.target.value,
              tier1Price: undefined,
              tier2Price: undefined,
            })
          }
        >
          <option value="">Select Type</option>
          <option value="simple">Simple</option>
          <option value="tiered">Tiered</option>
        </select>
      </div>

      {data.pricingType === "tiered" && (
        <div className="space-y-2 border-l-2 border-blue-200 pl-4">
          <Input
            data-testid="tier1-price"
            label="Tier 1 Price"
            value={data.tier1Price || ""}
            onChange={(e) => updateData({ tier1Price: e.target.value })}
          />
          <Input
            data-testid="tier2-price"
            label="Tier 2 Price"
            value={data.tier2Price || ""}
            onChange={(e) => updateData({ tier2Price: e.target.value })}
          />
        </div>
      )}
    </div>
  );
};

const CascadeStep = () => {
  const { data } = useWizard<DependencyData>();
  const { updateData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Cascade Dependencies</h2>

      <Input
        data-testid="field-a"
        label="Field A (Root)"
        value={data.fieldA || ""}
        onChange={(e) =>
          updateData({
            fieldA: e.target.value,
            fieldB: undefined,
            fieldC: undefined,
          })
        }
      />

      <Input
        data-testid="field-b"
        label="Field B (Depends on A)"
        value={data.fieldB || ""}
        onChange={(e) =>
          updateData({ fieldB: e.target.value, fieldC: undefined })
        }
        disabled={!data.fieldA}
      />

      <Input
        data-testid="field-c"
        label="Field C (Depends on B)"
        value={data.fieldC || ""}
        onChange={(e) => updateData({ fieldC: e.target.value })}
        disabled={!data.fieldB}
      />
    </div>
  );
};

const UserStep = () => {
  const { updateData } = useWizardActions();
  const userName = useWizardSelector((s) => s.data?.user?.name);
  const userZip = useWizardSelector((s) => s.data?.user?.address?.zip);
  const shipping = useWizardSelector((s) => s.data?.shippingMethod);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Nested Dependencies</h2>

      <Input
        data-testid="user-name"
        label="User Name"
        value={userName || ""}
        onChange={(e) => updateData({ user: { name: e.target.value } })}
      />

      <Input
        data-testid="user-address-zip"
        label="Zip Code"
        value={userZip || ""}
        onChange={(e) =>
          updateData({
            user: { address: { zip: e.target.value } },
            shippingMethod: undefined,
          })
        }
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium">Shipping Method</label>
        <select
          data-testid="shipping-method"
          className="w-full border p-2 rounded"
          value={shipping || ""}
          onChange={(e) => updateData({ shippingMethod: e.target.value })}
          disabled={!userZip}
        >
          <option value="">Select Shipping</option>
          <option value="standard">Standard</option>
          <option value="express">Express</option>
        </select>
      </div>
    </div>
  );
};

const WizardContent = () => {
  const { currentStep, activeSteps } = useWizard<DependencyData>();
  const { goToNextStep, goToPrevStep } = useWizardActions();

  return (
    <div data-testid="wizard-container" className="max-w-md mx-auto py-8">
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {activeSteps.map((s) => (
          <div
            key={s.id}
            data-testid={`breadcrumb-${s.id}`}
            className={`text-xs p-1 whitespace-nowrap ${s.id === currentStep?.id ? "font-bold bg-gray-100 rounded" : ""}`}
          >
            {s.label}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          {currentStep?.id === "step-1" && <LocationStep />}
          {currentStep?.id === "step-2" && <ProductStep />}
          {currentStep?.id === "step-3" && <PricingStep />}
          {currentStep?.id === "step-4" && <CascadeStep />}
          {currentStep?.id === "step-5" && <UserStep />}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            data-testid="prev-button"
            onClick={goToPrevStep}
            variant="secondary"
          >
            Back
          </Button>
          <Button
            data-testid="next-button"
            onClick={goToNextStep}
            variant="primary"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const config: IWizardConfig<DependencyData> = {
  persistence: { mode: "onStepChange", adapter: new MemoryAdapter() },
  steps: [
    { id: "step-1", label: "Location" },
    { id: "step-2", label: "Product" },
    { id: "step-3", label: "Pricing" },
    { id: "step-4", label: "Cascade" },
    { id: "step-5", label: "User" },
  ],
};

export default function TestDependency() {
  return (
    <WizardProvider config={config}>
      <WizardContent />
    </WizardProvider>
  );
}
