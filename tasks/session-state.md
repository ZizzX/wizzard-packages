## Session Update

- Date: 2026-01-20 00:00
- Scope: Monorepo build fix & Release prep
- Key changes:
  - Fixed root `package.json` scripts to use `pnpm -r build` (recursive) instead of incorrect local tsup config.
  - Removed incorrect root `tsup.config.ts`, `.npmignore`, and `dist` folder.
  - Added changeset `fix-root-build-scripts.md` (patch) for build script fixes.
  - Added changeset `selector-stability-and-features.md` (minor) for `useWizardShallowSelector` and stability fixes.
  - Verified full build and test suite (unit + E2E) pass.
  - Closed task `wizzard-stepper-react-887` (Fix root build script).
- Tests run: All tests passed. `pnpm -r build` passed.
- Open questions: none.
- Next action: Merge release PRs when CI completes.

## Session Update

- Date: 2026-01-19 02:15
- Scope: useWizardSelector stability, DX improvements & Build fixes
- Key changes:
  - Fixed infinite loops in `useSyncExternalStore` by stabilizing `getSnapshot` via `useRef`.
  - Added `useWizardShallowSelector` and support for direct `isEqual` passing.
  - Fixed `toHaveTextContent` type errors in Vitest by switching to `.textContent` / `.toBe`.
  - Fixed `demo` build error (TS1484) by applying `type-only` imports in `factory.tsx`.
- Tests run: `SelectorFlexibility.test.tsx` PASS, `WizardProFeatures.test.tsx` PASS, `pnpm -r build` PASS.
- Open questions: none.
- Next action: final push and session close.

## Session Update

- Date: 2026-01-14 01:43
- Scope: bd task
- Key changes: Added wizzard-stepper-react-886 to analyze bundle sizes and optimize packages.
- Tests run: none
- Open questions: none
- Next action: prioritize or start wizzard-stepper-react-886.

## Session Update

- Date: 2026-01-14 01:41
- Scope: bd task
- Key changes: Added wizzard-stepper-react-885 to add tests for store-first API in packages/react/src/store.ts.
- Tests run: none
- Open questions: none
- Next action: prioritize or start wizzard-stepper-react-885.
  ... (rest of the file)
