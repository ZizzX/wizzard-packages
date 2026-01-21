# @wizzard-packages/vue

## 0.2.0

### Minor Changes

- 8bf314f: Add comprehensive unit test coverage for Vue adapter
  - Added WizardProFeatures.test.ts covering progress calculation, async conditions, guards, validation, errors, nested paths, and selectors
  - Added SelectorFlexibility.test.ts for performance and selector behavior testing
  - Added getData and updateData methods to useWizardActions for React parity
  - Improved CI stability with better Playwright timeouts and configuration
  - All Vue hooks now have full test coverage matching React adapter functionality

### Patch Changes

- b798578: Fix conditional steps resolution on initial data load and align reset behavior with React adapter
  - **Fix**: Conditional steps (isVisible) are now properly resolved on initialData load via immediate watcher with debounced subsequent updates
  - **Fix**: reset() now correctly clears visited, completed, and error sets, and resets history/currentStepId consistently with React
  - **Docs**: Expanded README from 129 to 835 lines with comprehensive API docs, 12 advanced examples, best practices, and testing guides
  - **Tests**: Added comprehensive unit test coverage (WizardProFeatures, SelectorFlexibility, useWizard) - all 54 tests passing
  - **CI**: Added timeout guards and Playwright stability improvements to prevent hanging E2E runs
