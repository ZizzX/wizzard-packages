import { useState } from "react";
import type {
  IWizardConfig,
  IValidatorAdapter,
  ValidationResult,
} from "wizzard-stepper-react";
import { LocalStorageAdapter } from "wizzard-stepper-react";
import {
  WizardProvider,
  useWizard,
  useWizardActions,
  useWizardError,
  useWizardSelector,
  type ArrayDataSchema,
  type Product,
} from "../../wizards/array-data-wizard";
import { Card, CardContent, CardFooter } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

/**
 * TestArrayData
 *
 * Test page for E2E tests: array-data.spec.ts (10 tests)
 *
 * Tests:
 * - Add item to array
 * - Remove item from array
 * - Update item in array
 * - Array min/max validation
 * - Initial array data
 * - Array persistence
 * - Nested objects in arrays
 */

// Simple validator for arrays
class ArrayValidator implements IValidatorAdapter<ArrayDataSchema> {
  async validate(data: ArrayDataSchema): Promise<ValidationResult> {
    const errors: Record<string, string> = {};

    if (!data.products || data.products.length === 0) {
      errors.products = "At least one product is required";
    }

    if (data.products && data.products.length > 3) {
      errors.products = "Maximum 3 products allowed";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

// Step 1: Product List Management
const ProductListStep = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "electronics",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  const { updateData } = useWizardActions();
  const products =
    useWizardSelector((state) => {
      console.log("SELECTOR CALLED, full state:", state);
      console.log("data:", state.data);
      console.log("products from state:", state.data?.products);
      return state.data?.products;
    }) || [];
  const errors = useWizardError("products");

  console.log("RENDER: products=", products);
  console.log("RENDER: errors=", errors);

  const addProduct = () => {
    if (!newProduct.name) return;

    // Check max length BEFORE adding
    if (products.length >= 3) {
      return; // Silently prevent adding more than 3 products
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price) || 0,
      category: newProduct.category,
    };

    updateData({ products: [...products, product] });
    setNewProduct({ name: "", price: "", category: "electronics" });
  };

  const removeProduct = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    updateData({ products: updated });
  };

  const startEdit = (index: number) => {
    const product = products[index];
    setEditForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category || "",
    });
    setEditingIndex(index);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;

    const updated = [...products];
    updated[editingIndex] = {
      ...updated[editingIndex],
      name: editForm.name,
      price: parseFloat(editForm.price) || 0,
      category: editForm.category,
    };

    updateData({ products: updated });
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Products</h2>

      {/* Add Product Form */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-medium mb-3">Add New Product</h3>
        <div className="grid grid-cols-2 gap-3">
          <Input
            data-testid="item-name-input"
            label="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Product name"
          />
          <Input
            data-testid="item-price-input"
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="0.00"
          />
        </div>
        <div className="mt-3">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            data-testid="item-category-select"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
          </select>
        </div>
        <Button
          data-testid="add-item-button"
          onClick={addProduct}
          className="mt-3 w-full"
          variant="primary"
        >
          Add Product
        </Button>
      </div>

      {/* Product List */}
      <div>
        <h3 className="font-medium mb-3">Products ({products.length}/3)</h3>
        {products.length === 0 ? (
          <p className="text-gray-500 text-sm">No products added yet</p>
        ) : (
          <div className="space-y-2">
            {products.map((product, index) => (
              <div
                key={product.id}
                data-testid="array-item"
                className="border rounded-lg p-3 bg-white"
              >
                {editingIndex === index ? (
                  /* Edit Mode */
                  <div data-testid="update-form" className="space-y-2">
                    <Input
                      data-testid="update-name-input"
                      label="Name"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                    <Input
                      data-testid="update-price-input"
                      label="Price"
                      type="number"
                      value={editForm.price}
                      onChange={(e) =>
                        setEditForm({ ...editForm, price: e.target.value })
                      }
                    />
                    <div className="flex gap-2">
                      <Button
                        data-testid="save-update-button"
                        onClick={saveEdit}
                        variant="primary"
                        className="flex-1"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={cancelEdit}
                        variant="secondary"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">
                        ${product.price.toFixed(2)} • {product.category}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        data-testid={`edit-item-${index}`}
                        onClick={() => startEdit(index)}
                        variant="secondary"
                        className="text-sm px-3 py-1"
                      >
                        Edit
                      </Button>
                      <Button
                        data-testid={`remove-item-${index}`}
                        onClick={() => removeProduct(index)}
                        variant="secondary"
                        className="text-sm px-3 py-1 text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Display */}
      {errors && (
        <div
          data-testid="array-error"
          className="text-sm text-red-600 font-medium"
        >
          {errors}
        </div>
      )}
    </div>
  );
};

// Step 2: Review
const ReviewStep = () => {
  const { data } = useWizard();
  const products = data.products || [];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Review Products</h2>
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium mb-2">Total Products: {products.length}</h3>
        <div className="space-y-2">
          {products.map((product) => (
            <div key={product.id} className="text-sm">
              <span className="font-medium">{product.name}</span> - $
              {product.price.toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Wizard Content
const WizardContent = () => {
  const { currentStep, isFirstStep, isLastStep, activeSteps } = useWizard();
  const { goToNextStep, goToPrevStep, clearStorage } = useWizardActions();

  if (!currentStep) return null;

  const handleReset = () => {
    clearStorage();
    window.location.reload();
  };

  return (
    <div data-testid="wizard-container" className="max-w-3xl mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardContent className="pt-8">
          {/* Current Step Indicator for E2E tests */}
          <div
            data-testid="current-step"
            className="mb-4 text-sm font-medium text-gray-700"
          >
            Step {activeSteps.findIndex((s) => s.id === currentStep.id) + 1}
          </div>

          {currentStep.id === "products-step" && <ProductListStep />}
          {currentStep.id === "review" && <ReviewStep />}
        </CardContent>

        <CardFooter className="pb-8 flex justify-between border-t pt-4 mt-6">
          <div className="flex gap-2">
            <Button
              data-testid="prev-button"
              variant="secondary"
              onClick={goToPrevStep}
              disabled={isFirstStep}
            >
              Previous
            </Button>
            <Button
              data-testid="reset-button"
              variant="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>

          <Button
            data-testid={isLastStep ? "submit-button" : "next-button"}
            variant="primary"
            onClick={isLastStep ? () => alert("Products saved!") : goToNextStep}
          >
            {isLastStep ? "Complete" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Wizard Config
function getWizardConfig(): IWizardConfig<ArrayDataSchema> {
  return {
    steps: [
      {
        id: "products-step",
        label: "Products",
        validationAdapter: new ArrayValidator(),
      },
      { id: "review", label: "Review" },
    ],
    persistence: {
      mode: "onStepChange",
      adapter: new LocalStorageAdapter("array_wizard_"),
    },
  };
}

// Export
export default function TestArrayData() {
  // Handle both standard search and HashRouter search (after ?)
  const searchString =
    window.location.search || window.location.hash.split("?")[1] || "";
  const searchParams = new URLSearchParams(searchString);
  const initial = searchParams.get("initial") === "true";

  const config = getWizardConfig();

  const initialData: ArrayDataSchema = initial
    ? {
        products: [
          {
            id: "1",
            name: "Initial Product 1",
            price: 10.99,
            category: "electronics",
          },
          {
            id: "2",
            name: "Initial Product 2",
            price: 20.99,
            category: "clothing",
          },
        ],
      }
    : { products: [] };

  return (
    <WizardProvider config={config} initialData={initialData}>
      <WizardContent />
    </WizardProvider>
  );
}
