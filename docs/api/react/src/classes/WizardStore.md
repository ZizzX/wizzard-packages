[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStore

# Class: WizardStore\<T, StepId\>

Defined in: core/dist/index.d.ts:373

Core event-driven store for managing wizard state, data, and navigation.

## Type Parameters

### T

`T`

Type of the global wizard data object

### StepId

`StepId` *extends* `string` = `string`

String union of valid step IDs

## Implements

- `IWizardStore`\<`T`, `StepId`\>

## Constructors

### Constructor

> **new WizardStore**\<`T`, `StepId`\>(`initialData`, `middlewares?`): `WizardStore`\<`T`, `StepId`\>

Defined in: core/dist/index.d.ts:386

#### Parameters

##### initialData

`T`

##### middlewares?

[`WizardMiddleware`](../type-aliases/WizardMiddleware.md)\<`T`, `StepId`\>[]

#### Returns

`WizardStore`\<`T`, `StepId`\>

## Properties

### errorsMap

> **errorsMap**: `Map`\<`StepId`, `Map`\<`string`, `string`\>\>

Defined in: core/dist/index.d.ts:379

#### Implementation of

`IWizardStore.errorsMap`

***

### getSnapshot()

> **getSnapshot**: () => [`IWizardState`](../interfaces/IWizardState.md)\<`T`, `StepId`\>

Defined in: core/dist/index.d.ts:404

Returns the current immutable snapshot of the wizard state.

#### Returns

[`IWizardState`](../interfaces/IWizardState.md)\<`T`, `StepId`\>

#### Implementation of

`IWizardStore.getSnapshot`

***

### subscribe()

> **subscribe**: (`listener`) => () => `boolean`

Defined in: core/dist/index.d.ts:425

#### Parameters

##### listener

() => `void`

#### Returns

> (): `boolean`

##### Returns

`boolean`

#### Implementation of

`IWizardStore.subscribe`

## Methods

### clearStepStorage()

> **clearStepStorage**(`stepId`): `void`

Defined in: core/dist/index.d.ts:433

#### Parameters

##### stepId

`string`

#### Returns

`void`

***

### deleteError()

> **deleteError**(`stepId`, `path`): `boolean`

Defined in: core/dist/index.d.ts:423

#### Parameters

##### stepId

`StepId`

##### path

`string`

#### Returns

`boolean`

#### Implementation of

`IWizardStore.deleteError`

***

### dispatch()

> **dispatch**(`action`): `void`

Defined in: core/dist/index.d.ts:394

Processes an action through the middleware chain and updates the state.
This is the primary way to trigger any state change in the wizard.

#### Parameters

##### action

`WizardAction`\<`T`, `StepId`\>

The action to perform

#### Returns

`void`

#### Implementation of

`IWizardStore.dispatch`

***

### goToStep()

> **goToStep**(`stepId`, `options?`): `Promise`\<`boolean`\>

Defined in: core/dist/index.d.ts:456

#### Parameters

##### stepId

`StepId`

##### options?

###### providedActiveSteps?

[`IStepConfig`](../interfaces/IStepConfig.md)\<`T`, `StepId`\>[]

###### validate?

`boolean`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`IWizardStore.goToStep`

***

### hydrate()

> **hydrate**(): `void`

Defined in: core/dist/index.d.ts:431

Restores wizard state from persistence storage.
Implements "latest wins" conflict resolution based on step timestamps.

#### Returns

`void`

#### Implementation of

`IWizardStore.hydrate`

***

### injectPersistence()

> **injectPersistence**(`adapter`): `void`

Defined in: core/dist/index.d.ts:426

#### Parameters

##### adapter

`IPersistenceAdapter`

#### Returns

`void`

#### Implementation of

`IWizardStore.injectPersistence`

***

### resolveActiveSteps()

> **resolveActiveSteps**(`data?`): `Promise`\<[`IStepConfig`](../interfaces/IStepConfig.md)\<`T`, `StepId`\>[]\>

Defined in: core/dist/index.d.ts:450

Evaluates visibility conditions for all steps and returns only those that should be active.
Uses memoization to avoid redundant async calls if dependencies haven't changed.

#### Parameters

##### data?

`T`

Optional data override for evaluation

#### Returns

`Promise`\<[`IStepConfig`](../interfaces/IStepConfig.md)\<`T`, `StepId`\>[]\>

#### Implementation of

`IWizardStore.resolveActiveSteps`

***

### save()

> **save**(`stepId?`): `void`

Defined in: core/dist/index.d.ts:439

Manually triggers data persistence for specific steps or the current step.

#### Parameters

##### stepId?

`StepId`

Optional ID of step to save. If omitted, saves current step.

#### Returns

`void`

#### Implementation of

`IWizardStore.save`

***

### setInitialData()

> **setInitialData**(`data`): `void`

Defined in: core/dist/index.d.ts:419

Sets the initial data for the wizard.
Resets dirty tracking based on this new data.

#### Parameters

##### data

`T`

#### Returns

`void`

#### Implementation of

`IWizardStore.setInitialData`

***

### setStepErrors()

> **setStepErrors**(`stepId`, `errors`): `boolean`

Defined in: core/dist/index.d.ts:422

#### Parameters

##### stepId

`StepId`

##### errors

`Record`\<`string`, `string`\> | `null` | `undefined`

#### Returns

`boolean`

#### Implementation of

`IWizardStore.setStepErrors`

***

### subscribeToActions()

> **subscribeToActions**(`listener`): () => `boolean`

Defined in: core/dist/index.d.ts:384

#### Parameters

##### listener

(`action`) => `void`

#### Returns

> (): `boolean`

##### Returns

`boolean`

#### Implementation of

`IWizardStore.subscribeToActions`

***

### update()

> **update**(`newData`, `changedPath?`): `void`

Defined in: core/dist/index.d.ts:412

Performs a granular data update at a specific path.
Automatically calculates dirty fields and triggers auto-save if configured.

#### Parameters

##### newData

`T`

Full new data object

##### changedPath?

Path(s) that were modified

`string` | `string`[]

#### Returns

`void`

#### Implementation of

`IWizardStore.update`

***

### updateErrors()

> **updateErrors**(`newErrors`): `void`

Defined in: core/dist/index.d.ts:421

#### Parameters

##### newErrors

`Record`\<`StepId`, `Record`\<`string`, `string`\>\>

#### Returns

`void`

#### Implementation of

`IWizardStore.updateErrors`

***

### updateMeta()

> **updateMeta**(`newMeta`): `void`

Defined in: core/dist/index.d.ts:413

#### Parameters

##### newMeta

`Partial`\<[`IWizardState`](../interfaces/IWizardState.md)\<`T`, `StepId`\>\>

#### Returns

`void`

#### Implementation of

`IWizardStore.updateMeta`

***

### validateAll()

> **validateAll**(): `Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

Defined in: core/dist/index.d.ts:452

#### Returns

`Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

#### Implementation of

`IWizardStore.validateAll`

***

### validateStep()

> **validateStep**(`stepId`): `Promise`\<`boolean`\>

Defined in: core/dist/index.d.ts:451

#### Parameters

##### stepId

`StepId`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`IWizardStore.validateStep`
