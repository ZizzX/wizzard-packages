# E2E Testing Setup Checklist

This file tracks the setup requirements for E2E testing to work properly.

## ✅ Completed

- [x] Install @playwright/test
- [x] Install Chromium browser
- [x] Create playwright.config.ts
- [x] Create test directory structure (e2e/tests, e2e/fixtures)
- [x] Create base fixtures file
- [x] Write 8 test suites with 57 test cases
- [x] Add test scripts to package.json
- [x] Create E2E README documentation

## 🚧 TODO: Demo App Updates

To run these tests, the demo app at `examples/demo` needs to implement:

### High Priority (Required for basic tests)

- [ ] Add `data-testid="wizard-container"` to main wizard wrapper
- [ ] Add `data-testid="current-step"` to current step display
- [ ] Add `data-testid="next-button"` to next button
- [ ] Add `data-testid="prev-button"` to previous button
- [ ] Add `data-testid="breadcrumb-step-{id}"` to breadcrumb items
- [ ] Add `data-testid="{field-name}-input"` to form inputs
- [ ] Add `data-testid="{field-name}-error"` to error displays

### Medium Priority (For validation tests)

- [ ] Create `/validation-demo` route with Zod/Yup examples
- [ ] Implement query param `?adapter=zod|yup` for adapter switching
- [ ] Add validation error displays with testids

### Medium Priority (For persistence tests)

- [ ] Create `/persistence-demo` route
- [ ] Implement query param `?mode=onChange` for persistence mode
- [ ] Implement query param `?key=wizard1` for storage key isolation
- [ ] Add reset button with `data-testid="reset-button"`

### Medium Priority (For conditional steps)

- [ ] Create `/conditional-demo` route
- [ ] Implement conditional steps based on form data
- [ ] Add `data-testid="step-indicator"` for counting steps
- [ ] Implement query param `?debug=true` for debug info
- [ ] Implement query param `?async=true` for async conditions

### Low Priority (For advanced tests)

- [ ] Create `/dependency-demo` route
- [ ] Create `/guards-demo` route with beforeLeave hooks
- [ ] Create `/middleware-demo` route
- [ ] Create `/error-demo` route
- [ ] Implement WizardDevTools with appropriate testids
- [ ] Add progress bar with `aria-valuenow`

## 🧪 Verification Commands

After setting up demo app:

```bash
# 1. Start demo app manually
cd examples/demo
pnpm dev

# 2. In another terminal, run tests
pnpm test:e2e

# 3. Check which tests pass/fail
# Fix demo app based on failures
```

## 📝 Implementation Tips

### Adding Test IDs to Components

```tsx
// Example: Navigation buttons
<button data-testid="next-button" onClick={goToNextStep}>
  Next
</button>;

// Example: Dynamic breadcrumbs
{
  breadcrumbs.map((crumb) => (
    <div key={crumb.id} data-testid={`breadcrumb-step-${crumb.id}`} className={crumb.status}>
      {crumb.label}
    </div>
  ));
}

// Example: Error display
{
  error && <div data-testid={`${fieldName}-error`}>{error}</div>;
}
```

### Progressive Implementation

1. **Phase 1:** Add basic navigation testids → Run `basic-navigation.spec.ts`
2. **Phase 2:** Add validation demo → Run `validation.spec.ts`
3. **Phase 3:** Add persistence demo → Run `persistence.spec.ts`
4. **Phase 4:** Add conditional steps → Run `conditional-steps.spec.ts`
5. **Phase 5:** Complete all demos → Run all tests

---

**Status:** Tests written, awaiting demo app updates  
**Next Step:** Update examples/demo with required testids
