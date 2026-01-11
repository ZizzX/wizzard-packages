# E2E Testing Guide

This directory contains end-to-end tests for the scoped `@wizzard-packages/*` packages using Playwright.

## 📁 Structure

```
e2e/
├── tests/                    # Test suites
│   ├── basic-navigation.spec.ts
│   ├── validation.spec.ts
│   ├── persistence.spec.ts
│   ├── conditional-steps.spec.ts
│   ├── dependency-tracking.spec.ts
│   ├── step-guards.spec.ts
│   ├── middleware.spec.ts
│   └── error-handling.spec.ts
└── fixtures/                 # Test fixtures and helpers
    └── base.ts
```

## 🧪 Test Suites

### 1. **basic-navigation.spec.ts** (8 tests)

Tests core wizard navigation functionality:

- Next/previous navigation
- Direct step navigation
- First/last step boundaries
- Progress tracking
- Navigation history
- Scroll behavior

### 2. **validation.spec.ts** (9 tests)

Tests form validation with Zod and Yup:

- Preventing navigation with invalid data
- onChange and onStepChange validation modes
- Error display and clearing
- Multiple field errors
- Async validation

### 3. **persistence.spec.ts** (7 tests)

Tests state persistence with LocalStorage:

- Data persistence on step change
- Data restoration on page reload
- Current step restoration
- onChange persistence mode
- Storage clearing on reset
- Storage key isolation

### 4. **conditional-steps.spec.ts** (8 tests)

Tests dynamic step visibility:

- Step condition evaluation
- showWhilePending behavior
- conditionDependsOn optimization
- Async condition handling
- Dynamic step count changes

### 5. **dependency-tracking.spec.ts** (6 tests)

Tests wizard dependency tracking:

- Step invalidation on dependency change
- clearData functionality (arrays and functions)
- Cascading invalidations
- Dot notation dependencies

### 6. **step-guards.spec.ts** (6 tests)

Tests step guard (beforeLeave) functionality:

- Blocking navigation when guard returns false
- Confirmation dialogs
- Async guards
- Guard direction (next/prev)

### 7. **middleware.spec.ts** (7 tests)

Tests middleware integration:

- Logger middleware
- DevTools middleware
- Custom middleware execution order
- Action interception
- Time-travel debugging

### 8. **error-handling.spec.ts** (6 tests)

Tests error handling:

- Inline validation error display
- Error state in breadcrumbs
- Error recovery
- Error summary on submit
- Async validation errors

### 9. **array-data.spec.ts** (10 tests)

Tests array data manipulation:

- Add item to array
- Remove item from array
- Update item in array
- Array min/max validation
- Initial array data
- Array persistence
- Nested objects in arrays
- Reset functionality

### 9. **error-handling.spec.ts** (6 tests)

Tests error handling:

- Inline validation error display
- Error state in breadcrumbs
- Error recovery
- Error summary on submit
- Async validation errors

### 10. **advanced-validation.spec.ts** (19 tests) ✨ NEW

Tests advanced validation scenarios:

- Auto-fill all fields (sync and async)
- Validate all steps with error modal
- Error modal navigation (only first error clickable)
- Auto-redirect to first error step
- Block forward navigation with errors
- Loading states during async operations
- Clear current step vs clear all steps
- Error highlighting in breadcrumbs
- Progress bar updates
- Full 10-step navigation
- **Breadcrumb navigation (visited mode)**
- **Navigate to visited steps via breadcrumbs**
- **Cursor pointer on breadcrumbs**

**Total: 86 test cases**

## 🚀 Running Tests

### Run all E2E tests

```bash
pnpm test:e2e
```

### Run with UI mode (interactive)

```bash
pnpm test:e2e:ui
```

### Run in headed mode (see browser)

```bash
pnpm test:e2e:headed
```

### Run specific test file

```bash
pnpm test:e2e validation.spec.ts
```

### Debug mode

```bash
pnpm test:e2e:debug
```

### Run all tests (unit + E2E)

```bash
pnpm test:all
```

## ⚙️ Configuration

E2E tests are configured in `playwright.config.ts`:

- **Test directory:** `./e2e/tests`
- **Base URL:** `http://localhost:5173` (demo app)
- **Browser:** Chromium (can be extended to Firefox/Safari)
- **Reporter:** HTML reporter in `playwright-report/`
- **Automatic dev server:** Starts `examples/demo` before tests

## 📋 Prerequisites

The E2E tests assume that the demo application in `examples/demo` has the following features implemented:

### Required Data Test IDs

```tsx
// Navigation
<div data-testid="wizard-container">
<div data-testid="current-step">Step 1</div>
<button data-testid="next-button">Next</button>
<button data-testid="prev-button">Previous</button>
<button data-testid="submit-button">Submit</button>

// Breadcrumbs
<div data-testid="breadcrumb-step-1">
<div data-testid="breadcrumb-step-2">
<div data-testid="step-indicator">

// Progress
<div data-testid="progress-bar" aria-valuenow="50">

// Form fields (example)
<input data-testid="name-input">
<input data-testid="email-input">
<div data-testid="email-error">Invalid email</div>

// DevTools
<div data-testid="wizard-devtools">
<div data-testid="devtools-action-list">
```

## 🔧 Adding New Tests

1. Create a new spec file in `e2e/tests/`
2. Import base fixtures:

```typescript
import { test, expect } from '../fixtures/base';
```

3. Write test suite:

```typescript
test.describe('My Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/my-demo');
  });

  test('should do something', async ({ page }) => {
    // Your test
  });
});
```

4. Update this README with test count

## 📊 Test Coverage Goals

- ✅ **Navigation:** 100% covered
- ✅ **Validation:** Zod and Yup adapters covered
- ✅ **Persistence:** LocalStorage adapter covered
- ✅ **Conditional Steps:** Core functionality covered
- ✅ **Dependencies:** dependsOn and clearData covered
- ✅ **Guards:** beforeLeave hooks covered
- ✅ **Middleware:** Logger and DevTools covered
- ✅ **Errors:** All error scenarios covered

## 🐛 Debugging

### View test report

After test failure, open the HTML report:

```bash
npx playwright show-report
```

### Debug specific test

```bash
npx playwright test --debug validation.spec.ts
```

### Run with trace viewer

```bash
npx playwright show-trace path/to/trace.zip
```

## 📝 Notes

- Tests assume demo app routes: `/`, `/validation-demo`, `/persistence-demo`, etc.
- Some tests use query parameters for variant testing: `?adapter=zod`, `?mode=onChange`
- Async tests use `page.waitForTimeout()` for debouncing - adjust timing as needed
- All tests are designed to run in parallel

---

**Last Updated:** 2026-01-06  
**Test Count:** 86 tests across 10 suites
