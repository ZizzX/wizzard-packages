# Copilot Instructions for wizzard-stepper-react

This library is a flexible, headless, and strictly typed multi-step wizard for React.

## 🏗 Architecture Overview

- **State Management**: Uses a custom event-driven `WizardStore` (located in [src/store/WizardStore.ts](src/store/WizardStore.ts)) with a Redux-like middleware chain.
- **Component Sync**: Uses `useSyncExternalStore` for high-performance React synchronization (see [src/context/WizardContext.tsx](src/context/WizardContext.tsx)).
- **Type Safety**: Users should primarily use `createWizardFactory` from [src/factory.tsx](src/factory.tsx) to generate typed hooks and components for their schema.
- **Adapters**: PLuggable logic for validation (Zod/Yup) and persistence (LocalStorage/Memory).

## 🛠 Critical Workflows

- **Development**: Run `pnpm dev` to build with watch mode via `tsup`.
- **Unit Testing**: Run `pnpm test` via `vitest`. Tests are colocated (e.g., [src/store/WizardStore.test.ts](src/store/WizardStore.test.ts)).
- **E2E Testing**: Run `pnpm test:e2e` via `playwright`. Specs are in [e2e/tests/](e2e/tests/). Use `pnpm test:e2e:ui` for visual debugging.
- **Linting**: Run `pnpm lint`.
- **Documentation**: Generate API docs via `pnpm docs:api`.

## 📎 Project Conventions

- **Factory Pattern**: Always prefer recommending `createWizardFactory` for new wizard implementations.
  ```typescript
  const { WizardProvider, useWizardValue } = createWizardFactory<MySchema>();
  ```
- **Path-Based State**: Access data using dot-notation paths (e.g., `user.address.city`).
- **Naming**:
  - Interfaces: Prefix with `I` (e.g., `IWizardConfig`, `IStepConfig`).
  - Adapters: Suffix with `Adapter` (e.g., `ZodAdapter`).
  - Middlewares: Suffix with `Middleware` (e.g., `loggerMiddleware`).
- **Immutability**: All state updates must be immutable, using `setByPath` from [src/utils/data.ts](src/utils/data.ts).

## 🧩 Integration Patterns

- **Validation**: Use `ZodAdapter` or `YupAdapter` for step-level or field-level validation.
- **Persistence**: Use `LocalStorageAdapter` for state hydration across sessions.
- **Conditional Steps**: Use `isVisible` property in `IStepConfig` to control step flow.
- **Dependencies**: Use `dependsOn` and `clearData` in step configs to manage related fields.
- **Navigation Lifecycle**: Navigation follows: Validation -> Resolution -> Guards (`beforeLeave`) -> State Commit.

## ⚠️ Important Implementation Details

- **Store Subscriptions**: Component re-renders are triggered only when the specific path subscribed via `useWizardValue` or the selector in `useWizardSelector` changes.
- **Middleware Chain**: Middlewares are composed in `WizardStore`. Adding custom logic like analytics should be done via a custom middleware.
- **Fast Pathing**: `getByPath` and `setByPath` have optimizations for simple property access (no dots/brackets).
