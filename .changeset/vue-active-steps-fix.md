---
"@wizzard-packages/vue": patch
---

Fix conditional steps resolution on initial data load and align reset behavior with React adapter

- **Fix**: Conditional steps (isVisible) are now properly resolved on initialData load via immediate watcher with debounced subsequent updates
- **Fix**: reset() now correctly clears visited, completed, and error sets, and resets history/currentStepId consistently with React
- **Docs**: Expanded README from 129 to 835 lines with comprehensive API docs, 12 advanced examples, best practices, and testing guides
- **Tests**: Added comprehensive unit test coverage (WizardProFeatures, SelectorFlexibility, useWizard) - all 54 tests passing
- **CI**: Added timeout guards and Playwright stability improvements to prevent hanging E2E runs