# @wizzard-packages/devtools

## 3.0.0

### Major Changes

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

- Updated dependencies [19b8c5b]
  - @wizzard-packages/react@0.5.0
  - @wizzard-packages/core@0.5.0

## 2.0.1

### Patch Changes

- fb9b325: Fix type resolution for CommonJS consumers and declare packages side-effect free.

  Every package declared a single `types` condition, which TypeScript resolves as ESM even
  under `require` — CJS consumers got types that only worked with a dynamic import. The
  condition is now split per format and points at the `.d.cts` output the build already
  produced. `@wizzard-packages/react` had no `exports` map at all and now has one.

  All packages also declare `sideEffects: false` and `engines.node`, so bundlers can tree-shake
  them and installs warn on unsupported Node versions.

- Updated dependencies [fb9b325]
  - @wizzard-packages/react@0.4.1
  - @wizzard-packages/core@0.4.1

## 2.0.0

### Patch Changes

- 47e81e7: Fix root build scripts to correctly support monorepo structure (switched to `pnpm -r build`).
- Updated dependencies [47e81e7]
- Updated dependencies [b80d3ad]
- Updated dependencies [5696c5c]
  - @wizzard-packages/core@0.4.0
  - @wizzard-packages/react@0.4.0

## 1.0.0

### Patch Changes

- Updated dependencies [7e554ae]
  - @wizzard-packages/react@0.3.0
  - @wizzard-packages/core@0.3.0

## 0.1.1

### Patch Changes

- docs/metadata refresh across packages, examples, and docs UI.
- Updated dependencies
  - @wizzard-packages/core@0.1.1
  - @wizzard-packages/react@0.1.1
