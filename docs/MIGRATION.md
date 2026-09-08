# Migrating from 0.x to 1.0

0.x and v1 are different libraries with the same name. 0.x gave you a store and a config of
steps, and left the branching in your components. v1 makes the flow itself a plain JSON object
and runs it in one engine. Almost nothing is a rename, so almost nothing can be automated.

**There is no codemod, and there is no compatibility package.** `@wizzard-packages/compat` was
planned and cut on 2026-09-03: it would have re-implemented the 0.x surface on the new engine,
which means a second public API to keep alive forever. The change is a model change rather than
a rename, so a codemod would have had to guess at the parts that are genuinely different —
where a `condition` function becomes a `when` expression, there is no mechanical translation of
the function body. This page is the whole migration story.

## How many people this is for

A GitHub code search on **2026-09-08** for `@wizzard-packages/` found **157 files**, and all 157
are in `ZizzX/wizzard-packages` itself. Restricted to `package.json`, the search returns **one
repository**: this one. No public repository declares a dependency on any
`@wizzard-packages/*` package.

npm reports 1 296 downloads of `@wizzard-packages/core` in the month to 2026-09-06 (react 926,
vue 830), which with zero visible dependents is what mirrors and registry crawlers look like
rather than applications. Both numbers are here because the decision to cut the compatibility
package rested on them, and a reader deserves to check the reasoning rather than take it.

If you are the exception — a private repository the search cannot see — the table below is
complete, and an issue naming what you are on gets a real answer.

## The seven moves

Everything else follows from these.

**1. A steps array becomes a keyed record and an order.** 0.x had `config.steps: IStepConfig[]`,
where a step's identity was its position and its `id`. v1 has `steps: Record<string, StepDef>`
plus `order: string[]`. A patch can name one step without counting indexes, and a flow can be
reordered without touching a step.

**2. Functions in the config become expressions in JSON.** `condition(data, meta)` becomes
`when: { $not: { $empty: { $get: 'data.plan' } } }`. This is the change everything else rests
on: a flow with a function in it cannot be sent from a server, stored, diffed or drawn. Anything
that genuinely needs to run code is a **named** entry in the registry you pass to
`createWizard`, so the flow holds the name and your application holds the function.

**3. Navigation returns a result instead of a boolean.** `goToStep` resolved to `true` or
`false`, and to find out why it refused you dispatched a sentinel action and re-read the store.
`next()`, `back()` and `go()` resolve to a `NavResult` —
`{ ok: false, reason: 'blocked', by: 'age-check' }` — and there is nothing to probe.

**4. There is one navigation implementation.** 0.x had three, in the store, the React context
and the Vue composable, and they disagreed. v1 has one pipeline in the engine, and a shared
contract suite runs against both bindings.

**5. Sets become arrays.** `visitedSteps`, `completedSteps`, `busySteps` and `dirtyFields` were
`Set`s, which do not survive `JSON.stringify`. They are `readonly string[]` now, which is what
makes a session serializable at all.

**6. Middleware becomes lifecycle hooks.** There is no `dispatch` and no action object left to
intercept. A plugin is `{ init, onCommit, beforeNavigate, afterNavigate, onAttempt, loadStep }`.

**7. Derived state stops being stored.** `activeSteps`, `progress` and `breadcrumbs` were written
into state by the framework layer. They are computed by a memoized selector now, so they cannot
go stale and are not part of what gets persisted.

## Every 0.x export

Every symbol the 0.x packages exported, and what replaces it.

### `@wizzard-packages/core`

| 0.x export                                                     | v1                                                                                  |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `WizardStore`                                                  | `createWizard(options)` in `core/v1`                                                |
| `IWizardStore`                                                 | `Wizard<F>`                                                                         |
| `IWizardState`                                                 | `WizardState`, with the derived values in `Snapshot`                                |
| `IWizardActions`                                               | methods on `Wizard`: `next`, `back`, `go`, `set`, `patch`, `reset`                  |
| `IWizardConfig`                                                | `FlowDefinition`                                                                    |
| `IStepConfig`                                                  | `StepDef` — an `AtomStep` or a `GroupStep`                                          |
| `IWizardContext`                                               | none — a binding exposes the `Snapshot` and the engine, not a merged context object |
| `IValidatorAdapter`                                            | none — a validator is a named resolver; see `@wizzard-packages/validate`            |
| `ValidationResult`                                             | a resolver returns `Record<path, message> \| null`; there is no `isValid` flag      |
| `ValidationMode`                                               | `FlowDefinition.validate.on`: `'change' \| 'blur' \| 'next' \| 'manual'`            |
| `IPersistenceAdapter`                                          | none — `persist()` from `plugins/persist` takes a `Storage`                         |
| `PersistenceMode`                                              | none — `persist()` writes on every commit, coalesced                                |
| `StepDirection`                                                | none — an exit guard is an expression and cannot see the direction                  |
| `WizardAction`, `WizardMiddleware`, `MiddlewareAPI`            | none — there are no actions; a plugin is a `Hooks` object                           |
| `WizardEventName`, `WizardEventPayloads`, `WizardEventHandler` | none — use `subscribe`, `select`, `watch`, or a plugin hook                         |
| `IBreadcrumb`, `BreadcrumbStatus`                              | `Breadcrumb`, on `Snapshot.breadcrumbs`                                             |
| `Path`, `PathValue`                                            | `SliceAt<F, P>` — types a bare step id only; a nested path reads `unknown`          |
| `getByPath`, `setByPath`                                       | `getPath`, `setPath` from `core/v1` — no default-value argument                     |
| `toPath`                                                       | none — paths are strings throughout                                                 |
| `shallowEqual`                                                 | none — `useWizardSelector` takes an equality function                               |

### `@wizzard-packages/react`

| 0.x export                                                                                                           | v1                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `WizardProvider`                                                                                                     | `WizardProvider` from `react/v1` — **same name, different props**, see below                                           |
| `WizardProviderProps`                                                                                                | `WizardProviderProps` — `{ wizard }`, or the options to build one                                                      |
| `createWizardFactory`                                                                                                | none — there is no factory; `createWizard` takes the flow                                                              |
| `createWizardStore`, `createWizardHooks`, `WizardStoreBundle`, `CreateWizardStoreOptions`                            | none — the context-free store path is deleted                                                                          |
| `useWizard`                                                                                                          | `useWizard()` — returns the engine                                                                                     |
| `useWizardContext`                                                                                                   | `useWizard()`, or `useOptionalWizard()` outside a provider                                                             |
| `useWizardState`                                                                                                     | `useWizardSnapshot()`                                                                                                  |
| `useWizardActions`, `IWizardActionsTyped`                                                                            | `useNavigation()`, plus `wizard.set` / `patch` / `reset`                                                               |
| `useWizardValue`, `useWizardField`                                                                                   | `useField(path)` — one hook, returns `[value, setValue]`                                                               |
| `useWizardError`                                                                                                     | `useErrors(stepId?)`                                                                                                   |
| `useWizardAllErrors`, `useWizardFlatErrors`                                                                          | none — errors are per step; merge them yourself if you need one map                                                    |
| `useWizardSelector`                                                                                                  | `useWizardSelector(fn, isEqual?)` — **the selector now reads a `Snapshot`**                                            |
| `useWizardCurrentStep`, `useWizardSteps`                                                                             | `useStep()` — one hook for both                                                                                        |
| `useWizardMeta`                                                                                                      | `useStep()` for the position and `useNavigation()` for `isBusy`; `isLoading`, `isDirty` and `goToStepResult` have none |
| `useWizardStoreState`, `useWizardStoreValue`, `useWizardStoreField`, `useWizardStoreError`, `useWizardStoreSelector` | none — the store-without-provider hooks are deleted                                                                    |
| `WizardStepRenderer`, `WizardStepRendererProps`                                                                      | none — render on `current`, or name a view with `AtomStep.view`                                                        |
| `IWizardHandle`                                                                                                      | none                                                                                                                   |
| re-exports of `WizardStore`, `loggerMiddleware` and the core types                                                   | gone with their packages; import from `core/v1`                                                                        |

### `@wizzard-packages/vue`

| 0.x export                         | v1                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------- |
| `useProvideWizard`                 | `provideWizard(source)` — renamed                                      |
| `WIZARD_STORE_KEY`                 | none — the injection key is private                                    |
| `useWizardStore`                   | `useWizard()`                                                          |
| `useWizardState`                   | `useWizardSnapshot()`                                                  |
| `useWizardValue`, `useWizardField` | `useField(path)` — a `WritableComputedRef`, for `v-model`              |
| `useWizardActions`                 | `useNavigation()`                                                      |
| `useWizardError`                   | `useErrors(stepId?)` — **scoped to one step**; 0.x searched every step |
| `useWizardSelector`                | `useWizardSelector(fn)` — returns a `ComputedRef`                      |
| `createWizardFactory`              | none                                                                   |

### The adapter packages

| 0.x export                                                    | v1                                                    |
| ------------------------------------------------------------- | ----------------------------------------------------- |
| `ZodAdapter`, `ZodLikeSchema` (`adapter-zod`)                 | `schema(zodSchema)` from `@wizzard-packages/validate` |
| `YupAdapter`, `YupLikeSchema`, `YupLikeError` (`adapter-yup`) | `schema(yupSchema)` — Yup 1.5+ speaks Standard Schema |

One adapter covers Zod, Valibot, ArkType, Effect and Yup, because they all expose the same
`~standard` property. Both 0.x packages are deleted.

### `@wizzard-packages/persistence` and `@wizzard-packages/middleware`

| 0.x export            | v1                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------- |
| `LocalStorageAdapter` | `persist({ key, storage: localStorage })` from `@wizzard-packages/plugins/persist` |
| `MemoryAdapter`       | none — pass any object implementing `Storage`, or leave `persist` out              |
| `loggerMiddleware`    | none in 1.0.0 — a dozen lines against `onCommit` and `onAttempt`                   |
| `devToolsMiddleware`  | `@wizzard-packages/devtools`, a panel rather than a Redux bridge                   |

Both packages are deleted. `store.hydrate()` and `store.save()` go with them: `persist` restores
before the first render and writes on every commit.

## What does not carry over

Each of these was a bug or a leak rather than a feature.

- **`dependsOn` and `clearData`.** React-only in 0.x, never implemented in Vue. Clearing a field
  in one step when a field in another changes is yours now: `wizard.watch(path, fn)` and a `set`
  in the listener. `clearOnLeave` is close but not the same thing: it fires when a step is left,
  not when a value changes. `clearOnLeave: true` drops that step's own slice, and a list of paths
  drops exactly those, which may live in another slice — but the trigger is still leaving.
- **`errorsMap`.** A public `Map` mirroring `errors`. `Snapshot.errors` is a plain object.
- **`goToStepResult: 'init'`.** A sentinel written into state so a caller could re-read it and
  discover that a middleware had intercepted the move. `NavResult` answers directly.
- **The two-phase render of conditional steps.** 0.x seeded `activeSteps` with the unconditional
  steps and corrected itself a tick later, so a conditional step flashed. In v1 `active` is right
  on the first read whenever no condition needs an async resolver.
- **Per-step navigation veto.** `canNavigateTo` was an arbitrary function on a step that could
  override the navigation mode entirely. `policy` is flow-level, and anything beyond an
  expression belongs in a plugin's `beforeNavigate`, which is wizard-wide.
- **Direction-aware exit guards.** `beforeLeave(data, direction)` could allow leaving forward and
  refuse leaving backward. `guards.exit` is an expression and does not see the direction.

## Same name, different behaviour

Three things survive by name and will not tell you they changed.

**`WizardProvider`** exists in both. 0.x took `config`, `initialData` and `initialStepId` and
dispatched an `INIT` synchronously; v1 takes a `flow` (or a `wizard`) and starts in a layout
effect that never runs on the server. TypeScript catches the props — a copied JSX block will look
right and be wrong.

**`useWizardSelector`** exists in both, and this one the compiler will not always catch. The
selector argument changed from `IWizardState` to `Snapshot`, and two names changed meaning with
it: `activeSteps` was an array of step **objects**, `active` is an array of step **id strings**.
A selector reading `.length` keeps compiling and starts answering a different question.

**`errors`** is the one place where the name and the shape both hold:
`Record<stepId, Record<path, message>>` in 0.x and in v1.

## Your stored data

The values need no migration. Both versions address data by dot path, and a 0.x step id is a v1
slice key, so `name.full` means the same thing in both.

The envelope around them does not carry. 0.x wrote one storage key per step —
`wizard_<stepId>`, each holding a timestamped copy of the whole data object — plus a
`wizard___wizzard_meta__` key with the position. `persist()` writes one key holding a whole
`Snapshot`. **A v1 wizard pointed at 0.x storage finds no key it recognises and starts empty,
without an error.** If your users have wizards in progress, read the old keys once before the new
build takes over.

[`examples/migration/from-0x-storage.ts`](../examples/migration/from-0x-storage.ts) is that read,
and [its test](../examples/migration/from-0x-storage.test.ts) runs a real 0.x storage dump
through it and into a v1 wizard. Copy the file; it is not shipped as a package.

```ts
import { createWizard } from '@wizzard-packages/core/v1';

import { readLegacyWizard } from './from-0x-storage';

// The step ids of your 0.x config, in its order. `hydrate()` read exactly
// these, in exactly this order, and reproducing that is what keeps a stale key
// from a deleted step out of the restored data.
const legacy = readLegacyWizard(localStorage, ['name', 'review']);
const wizard = createWizard({ flow: signup, data: legacy?.data });

await wizard.start();
if (legacy?.currentStepId) {
  const moved = await wizard.go(legacy.currentStepId, { force: true });
  if (!moved.ok) {
    // They stay on the first step, with their answers. Show that rather than
    // letting it pass: a wizard that silently restarts looks like data loss.
  }
}
```

`force` waives the navigation policy — `'sequential'` would otherwise refuse a jump to a step
the restored run has not walked to in this session. It does **not** waive the step's guards or
its `when`: a step the restored data no longer reaches is still refused, and `go` says so in its
result. That is the right way round, and it is why the result is worth reading.

## The root import changes at 1.0.0

Today `@wizzard-packages/core` resolves `.` to 0.x and `/v1` to the new engine, which is why
every example here imports `/v1`. At 1.0.0 the root export becomes v1. **This is a breaking
change to code that never named a version**: an untouched 0.x application that upgrades across
it gets the new engine from an import it did not edit.

Pin `0.x` on the `latest` tag until you have worked through this page, then move to `/v1`
imports, then upgrade. The `/v1` path keeps working after the flip.

## Where to go next

The [documentation site](https://zizzx.github.io/wizzard-packages/docs/start/) teaches v1 from
nothing, which for most 0.x applications is faster than translating a config field by field.
[The flow](https://zizzx.github.io/wizzard-packages/docs/flow/) and
[Expressions](https://zizzx.github.io/wizzard-packages/docs/expressions/) cover what used to be
functions in your config.
