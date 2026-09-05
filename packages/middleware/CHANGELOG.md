# @wizzard-packages/middleware

## 0.1.4

### Patch Changes

- fb9b325: Fix type resolution for CommonJS consumers and declare packages side-effect free.

  Every package declared a single `types` condition, which TypeScript resolves as ESM even
  under `require` — CJS consumers got types that only worked with a dynamic import. The
  condition is now split per format and points at the `.d.cts` output the build already
  produced. `@wizzard-packages/react` had no `exports` map at all and now has one.

  All packages also declare `sideEffects: false` and `engines.node`, so bundlers can tree-shake
  them and installs warn on unsupported Node versions.

- Updated dependencies [fb9b325]
  - @wizzard-packages/core@0.4.1

## 0.1.3

### Patch Changes

- 47e81e7: Fix root build scripts to correctly support monorepo structure (switched to `pnpm -r build`).
- Updated dependencies [47e81e7]
- Updated dependencies [5696c5c]
  - @wizzard-packages/core@0.4.0

## 0.1.2

### Patch Changes

- Updated dependencies [7e554ae]
  - @wizzard-packages/core@0.3.0

## 0.1.1

### Patch Changes

- docs/metadata refresh across packages, examples, and docs UI.
- Updated dependencies
  - @wizzard-packages/core@0.1.1
