# @wizzard-packages/react

## 0.4.0

### Minor Changes

- b80d3ad: feat: add `useWizardShallowSelector` and support for custom `isEqual` functions in selectors.
  fix: resolve infinite loops in `useSyncExternalStore` by stabilizing `getSnapshot` references.
  fix: resolve type import issues in factory for better build compatibility.
- 5696c5c: feat(react): improve DX with store-first hooks, field setters, SSR-safe subscriptions, and docs

### Patch Changes

- 47e81e7: Fix root build scripts to correctly support monorepo structure (switched to `pnpm -r build`).
- Updated dependencies [47e81e7]
- Updated dependencies [5696c5c]
  - @wizzard-packages/core@0.4.0
  - @wizzard-packages/persistence@0.1.3
  - @wizzard-packages/middleware@0.1.3

## 0.3.0

### Minor Changes

- 7e554ae: feat(react): improve DX with store-first hooks, field setters, SSR-safe subscriptions, and docs

### Patch Changes

- Updated dependencies [7e554ae]
  - @wizzard-packages/core@0.3.0
  - @wizzard-packages/middleware@0.1.2
  - @wizzard-packages/persistence@0.1.2

## 0.2.0

### Minor Changes

- feat(react): improve DX with store-first hooks, field setters, SSR-safe subscriptions, and docs

### Patch Changes

- Updated dependencies
  - @wizzard-packages/core@0.2.0

## 0.1.1

### Patch Changes

- docs/metadata refresh across packages, examples, and docs UI.
- Updated dependencies
  - @wizzard-packages/core@0.1.1
  - @wizzard-packages/middleware@0.1.1
  - @wizzard-packages/persistence@0.1.1
