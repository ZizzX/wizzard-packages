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
