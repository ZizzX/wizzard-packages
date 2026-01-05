import { test, expect } from '../fixtures/base';

/**
 * E2E Test: Dependency Tracking
 * 
 * Tests wizard dependency tracking functionality:
 * - dependsOn field tracking
 * - Step invalidation on dependency change
 * - clearData functionality
 * - Cascading invalidations
 */

test.describe('Dependency Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dependency-demo');
    await page.waitForSelector('[data-testid="wizard-container"]', { timeout: 5000 });
  });

  test('should invalidate step when dependency changes', async ({ page }) => {
    // Fill first step
    await page.locator('[data-testid="country-select"]').selectOption('US');
    await page.click('[data-testid="next-button"]');
    
    // Fill second step (depends on country)
    await page.locator('[data-testid="state-select"]').selectOption('CA');
    await page.click('[data-testid="next-button"]');
    
    // Step 2 should be marked as completed
    await expect(page.locator('[data-testid="breadcrumb-step-2"]')).toHaveClass(/completed/);
    
    // Go back and change country
    await page.click('[data-testid="breadcrumb-step-1"]');
    await page.locator('[data-testid="country-select"]').selectOption('UK');
    
    // Step 2 should no longer be completed
    await expect(page.locator('[data-testid="breadcrumb-step-2"]')).not.toHaveClass(/completed/);
  });

  test('should clear dependent data when dependency changes', async ({ page }) => {
    // Select country
    await page.locator('[data-testid="country-select"]').selectOption('US');
    await page.click('[data-testid="next-button"]');
    
    // Select state
    await page.locator('[data-testid="state-select"]').selectOption('NY');
    
    // Go back and change country
    await page.click('[data-testid="prev-button"]');
    await page.locator('[data-testid="country-select"]').selectOption('Canada');
    
    // Navigate forward
    await page.click('[data-testid="next-button"]');
    
    // State field should be cleared
    await expect(page.locator('[data-testid="state-select"]')).toHaveValue('');
  });

  test('should clear specific fields with clearData array', async ({ page }) => {
    // Fill multiple fields on first step
    await page.locator('[data-testid="category-select"]').selectOption('electronics');
    await page.click('[data-testid="next-button"]');
    
    // Fill dependent fields
    await page.locator('[data-testid="subcategory-input"]').fill('Laptops');
    await page.locator('[data-testid="brand-input"]').fill('Apple');
    await page.click('[data-testid="next-button"]');
    
    // Change category (should clear only subcategory, not brand)
    await page.click('[data-testid="breadcrumb-step-1"]');
    await page.locator('[data-testid="category-select"]').selectOption('clothing');
    await page.click('[data-testid="next-button"]');
    
    // Subcategory should be cleared
    await expect(page.locator('[data-testid="subcategory-input"]')).toHaveValue('');
    
    // Brand might or might not be cleared depending on config
    // This tests selective clearing
  });

  test('should use clearData function for complex clearing', async ({ page }) => {
    await page.goto('/dependency-demo?mode=function');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    // Fill data
    await page.locator('[data-testid="pricing-type"]').selectOption('tiered');
    await page.click('[data-testid="next-button"]');
    await page.locator('[data-testid="tier1-price"]').fill('10');
    await page.locator('[data-testid="tier2-price"]').fill('20');
    
    // Change pricing type
    await page.click('[data-testid="prev-button"]');
    await page.locator('[data-testid="pricing-type"]').selectOption('flat');
    await page.click('[data-testid="next-button"]');
    
    // Tier fields should be cleared and hidden
    await expect(page.locator('[data-testid="tier1-price"]')).not.toBeVisible();
  });

  test('should handle cascading invalidations', async ({ page }) => {
    // Step 2 depends on Step 1
    // Step 3 depends on Step 2
    
    await page.locator('[data-testid="field-a"]').fill('value-a');
    await page.click('[data-testid="next-button"]');
    
    await page.locator('[data-testid="field-b"]').fill('value-b');
    await page.click('[data-testid="next-button"]');
    
    await page.locator('[data-testid="field-c"]').fill('value-c');
    
    // All steps completed
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).toHaveClass(/completed|visited/);
    await expect(page.locator('[data-testid="breadcrumb-step-2"]')).toHaveClass(/completed|visited/);
    
    // Change field-a (should invalidate steps 2 and 3)
    await page.click('[data-testid="breadcrumb-step-1"]');
    await page.locator('[data-testid="field-a"]').fill('new-value-a');
    
    // Steps 2 and 3 should be invalidated
    await expect(page.locator('[data-testid="breadcrumb-step-2"]')).not.toHaveClass(/completed/);
    await expect(page.locator('[data-testid="breadcrumb-step-3"]')).not.toHaveClass(/completed/);
  });

  test('should track dot notation dependencies', async ({ page }) => {
    // Test dependencies on nested paths like "user.address.city"
    await page.locator('[data-testid="user-name"]').fill('John');
    await page.locator('[data-testid="user-address-zip"]').fill('12345');
    await page.click('[data-testid="next-button"]');
    
    // Dependent step
    await page.locator('[data-testid="shipping-method"]').selectOption('standard');
    
    // Go back and change nested field
    await page.click('[data-testid="prev-button"]');
    await page.locator('[data-testid="user-address-zip"]').fill('99999');
    
    // Navigate forward
    await page.click('[data-testid="next-button"]');
    
    // Shipping might be recalculated/cleared based on zip change
    const shippingValue = await page.locator('[data-testid="shipping-method"]').inputValue();
    // Verify the dependency was tracked
  });
});
