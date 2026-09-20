# @wizzard-packages/core

## 1.0.0

### Major Changes

- c54e0e6: The root export is the v1 engine. `.` and `./v1` name the same built module and the same
  declarations, so an import written against either resolves to one copy, and `./v1` stays through
  1.x. The 0.x surface these packages used to serve from `.` is gone, along with
  `@wizzard-packages/middleware`, `@wizzard-packages/persistence`, `@wizzard-packages/adapter-zod`
  and `@wizzard-packages/adapter-yup`; `docs/MIGRATION.md` is the way across.

## 0.5.0

## 0.4.1

### Patch Changes

- fb9b325: Fix type resolution for CommonJS consumers and declare packages side-effect free.

  Every package declared a single `types` condition, which TypeScript resolves as ESM even
  under `require` — CJS consumers got types that only worked with a dynamic import. The
  condition is now split per format and points at the `.d.cts` output the build already
  produced. `@wizzard-packages/react` had no `exports` map at all and now has one.

  All packages also declare `sideEffects: false` and `engines.node`, so bundlers can tree-shake
  them and installs warn on unsupported Node versions.

## 0.4.0

### Minor Changes

- 5696c5c: feat(react): improve DX with store-first hooks, field setters, SSR-safe subscriptions, and docs

### Patch Changes

- 47e81e7: Fix root build scripts to correctly support monorepo structure (switched to `pnpm -r build`).

## 0.3.0

### Minor Changes

- 7e554ae: feat(react): improve DX with store-first hooks, field setters, SSR-safe subscriptions, and docs

## 0.2.0

### Minor Changes

- feat(react): improve DX with store-first hooks, field setters, SSR-safe subscriptions, and docs

## 0.1.1

### Patch Changes

- docs/metadata refresh across packages, examples, and docs UI.
