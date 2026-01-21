import { test, expect } from '../../fixtures/base';

/**
 * E2E Test: Array Data Manipulation
 *
 * Tests wizard functionality for working with array data:
 * - Adding items to arrays
 * - Removing items from arrays
 * - Updating items in arrays
 * - Array validation (min/max length)
 * - Setting initial array data
 * - Persisting array data
 */

test.describe('Array Data Manipulation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('#/test/array-data-demo');
    await page.waitForSelector('[data-testid="wizard-container"]', { timeout: 5000 });
  });

  test('should add item to array', async ({ page }) => {
    // Initially empty list
    const initialCount = await page.locator('[data-testid="array-item"]').count();
    expect(initialCount).toBe(0);

    // Fill form
    await page.locator('[data-testid="item-name-input"]').fill('Product 1');
    await page.locator('[data-testid="item-price-input"]').fill('99.99');

    // Click add button
    await page.click('[data-testid="add-item-button"]');

    // Verify item added
    const newCount = await page.locator('[data-testid="array-item"]').count();
    expect(newCount).toBe(1);

    // Verify item content
    await expect(page.locator('[data-testid="array-item"]:first-child')).toContainText('Product 1');
    await expect(page.locator('[data-testid="array-item"]:first-child')).toContainText('99.99');
  });

  test('should remove item from array', async ({ page }) => {
    // Add two items first
    await page.locator('[data-testid="item-name-input"]').fill('Item 1');
    await page.click('[data-testid="add-item-button"]');

    await page.locator('[data-testid="item-name-input"]').fill('Item 2');
    await page.click('[data-testid="add-item-button"]');

    // Should have 2 items
    let count = await page.locator('[data-testid="array-item"]').count();
    expect(count).toBe(2);

    // Remove first item
    await page.click('[data-testid="remove-item-0"]');

    // Should have 1 item
    count = await page.locator('[data-testid="array-item"]').count();
    expect(count).toBe(1);

    // Remaining item should be "Item 2"
    await expect(page.locator('[data-testid="array-item"]:first-child')).toContainText('Item 2');
  });

  test('should update item in array', async ({ page }) => {
    // Add item
    await page.locator('[data-testid="item-name-input"]').fill('Original Item');
    await page.click('[data-testid="add-item-button"]');

    // Click edit button
    await page.click('[data-testid="edit-item-0"]');

    // Update form should be visible
    await expect(page.locator('[data-testid="update-form"]')).toBeVisible();

    // Change name
    await page.locator('[data-testid="update-name-input"]').fill('Updated Item');
    await page.click('[data-testid="save-update-button"]');

    // Verify update
    await expect(page.locator('[data-testid="array-item"]:first-child')).toContainText(
      'Updated Item'
    );
    await expect(page.locator('[data-testid="array-item"]:first-child')).not.toContainText(
      'Original Item'
    );
  });

  test('should validate array min length', async ({ page }) => {
    // Try to navigate with empty array (min: 1)
    await page.click('[data-testid="next-button"]');

    // Error should appear
    await expect(page.locator('[data-testid="array-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="array-error"]')).toContainText(/at least|minimum/i);

    // Still on same step
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');
  });

  test('should validate array max length', async ({ page }) => {
    // Add max items (e.g., max: 3)
    for (let i = 1; i <= 3; i++) {
      await page.locator('[data-testid="item-name-input"]').fill(`Item ${i}`);
      await page.click('[data-testid="add-item-button"]');
    }

    // Try to add one more
    await page.locator('[data-testid="item-name-input"]').fill('Item 4');
    await page.click('[data-testid="add-item-button"]');

    // Error or disabled button
    const count = await page.locator('[data-testid="array-item"]').count();
    expect(count).toBe(3);

    // Or check for error message
    const error = page.locator('[data-testid="array-error"]');
    if (await error.isVisible()) {
      await expect(error).toContainText(/maximum|limit/i);
    }
  });

  test('should set initial array data', async ({ page }) => {
    // Navigate to demo with initial data query param
    await page.goto('#/test/array-data-demo?initial=true');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Should have pre-populated items
    const count = await page.locator('[data-testid="array-item"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('should persist array data on page reload', async ({ page }) => {
    // Clear any existing data first
    await page.evaluate(() => {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('array_wizard_')) {
          localStorage.removeItem(key);
        }
      });
    });

    // Reload to start fresh
    await page.reload();
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Add items
    await page.locator('[data-testid="item-name-input"]').fill('Persisted Item');
    await page.click('[data-testid="add-item-button"]');

    // Navigate to next step (triggers persistence)
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(500); // Wait for persistence to complete

    // Go back to first step
    await page.click('[data-testid="prev-button"]');

    // Reload page
    await page.reload();
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Array should be restored (wizard should restore to saved state)
    // Wait a bit for hydration
    await page.waitForTimeout(500);
    const count = await page.locator('[data-testid="array-item"]').count();
    expect(count).toBe(1);
    await expect(page.locator('[data-testid="array-item"]:first-child')).toContainText(
      'Persisted Item'
    );
  });

  test('should navigate with valid array', async ({ page }) => {
    // Add required items
    await page.locator('[data-testid="item-name-input"]').fill('Valid Item');
    await page.click('[data-testid="add-item-button"]');

    // Navigate should succeed
    await page.click('[data-testid="next-button"]');

    // Should be on next step
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
  });

  test('should handle array of objects with nested fields', async ({ page }) => {
    // Add item with nested object
    await page.locator('[data-testid="item-name-input"]').fill('Product');
    await page.locator('[data-testid="item-category-select"]').selectOption('electronics');
    await page.locator('[data-testid="item-price-input"]').fill('199.99');
    await page.click('[data-testid="add-item-button"]');

    // Verify all fields display
    const item = page.locator('[data-testid="array-item"]:first-child');
    await expect(item).toContainText('Product');
    await expect(item).toContainText('electronics');
    await expect(item).toContainText('199.99');
  });

  test('should clear array on reset', async ({ page }) => {
    // Add items
    await page.locator('[data-testid="item-name-input"]').fill('Item 1');
    await page.click('[data-testid="add-item-button"]');

    let count = await page.locator('[data-testid="array-item"]').count();
    expect(count).toBe(1);

    // Reset wizard
    await page.click('[data-testid="reset-button"]');

    // Array should be empty
    count = await page.locator('[data-testid="array-item"]').count();
    expect(count).toBe(0);
  });
});
