# @wizzard-packages/react

## 0.5.0

### Minor Changes

- 19b8c5b: devtools: the panel is rebuilt on the v1 engine

  The panel now draws the flow graph, the state a commit produced, and one ordered list of what
  the wizard did, including the moves it refused. A refusal changes no state, so it reaches no
  subscriber; it reaches the panel through the `devtools()` plugin, and the diagnostic strip
  shows it without a tab change.

  `WizardDevTools` is gone and `WizardDevtools` replaces it. Seven changes, one line each:

  | 0.x                                       | 3.0                                                                                          |
  | ----------------------------------------- | -------------------------------------------------------------------------------------------- |
  | `import { WizardDevTools }`               | `import { WizardDevtools }` — one identifier; TypeScript reports the missing export at build |
  | `?devtools=true` in the URL               | removed; render the panel where you want it and gate it yourself                             |
  | floating overlay, `position: fixed`       | docked; fills its container, so the container needs a height                                 |
  | Actions tab (`subscribeToActions`)        | Activity: commits and refusals; refusals need `devtools()` in `plugins`                      |
  | Jump (`RESTORE_SNAPSHOT`)                 | removed; rebuild a wizard from a state with `createWizard({ state })`                        |
  | `@wizzard-packages/react` as a dependency | peer `^1.0.0`; install it beside devtools                                                    |
  | no recording                              | `Record` → `Copy JSON`, or `recordSession()`; the file is a `SessionBundle` `version: 1`     |

  There is no codemod and no alias: the migration is one renamed import and two deletions, and
  the compile error names the fix.

  `react` gains `useOptionalWizard`, which returns the wizard above or null. `useWizard` throws
  outside a provider, which is right for a component that cannot work without one; the panel
  can, and a diagnostic tool that crashes the application it is diagnosing is worse than one
  that reports it has nothing to watch.

### Patch Changes

- @wizzard-packages/core@0.5.0
- @wizzard-packages/middleware@0.1.5
- @wizzard-packages/persistence@0.1.5

## 0.4.1

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
