---
"@wizzard-packages/vue": minor
---

Add comprehensive unit test coverage for Vue adapter

- Added WizardProFeatures.test.ts covering progress calculation, async conditions, guards, validation, errors, nested paths, and selectors
- Added SelectorFlexibility.test.ts for performance and selector behavior testing
- Added getData and updateData methods to useWizardActions for React parity
- Improved CI stability with better Playwright timeouts and configuration
- All Vue hooks now have full test coverage matching React adapter functionality