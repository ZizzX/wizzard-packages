# @wizzard-packages/vue

## 0.2.1

### Patch Changes

- fb9b325: Fix type resolution for CommonJS consumers and declare packages side-effect free.

  Every package declared a single `types` condition, which TypeScript resolves as ESM even
  under `require` — CJS consumers got types that only worked with a dynamic import. The
  condition is now split per format and points at the `.d.cts` output the build already
  produced. `@wizzard-packages/react` had no `exports` map at all and now has one.

  All packages also declare `sideEffects: false` and `engines.node`, so bundlers can tree-shake
  them and installs warn on unsupported Node versions.

- Updated dependencies [fb9b325]
  - @wizzard-packages/persistence@0.1.4
  - @wizzard-packages/middleware@0.1.4
  - @wizzard-packages/core@0.4.1

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
