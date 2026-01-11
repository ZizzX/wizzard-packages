[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardStore

# Class: WizardStore\<T, StepId\>

Defined in: [core/src/store/WizardStore.ts:17](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L17)

Core event-driven store for managing wizard state, data, and navigation.

## Type Parameters

### T

`T`

Type of the global wizard data object

### StepId

`StepId` *extends* `string` = `string`

String union of valid step IDs

## Implements

- [`IWizardStore`](../interfaces/IWizardStore.md)\<`T`, `StepId`\>

## Constructors

### Constructor

> **new WizardStore**\<`T`, `StepId`\>(`initialData`, `middlewares`): `WizardStore`\<`T`, `StepId`\>

Defined in: [core/src/store/WizardStore.ts:38](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L38)

#### Parameters

##### initialData

`T`

##### middlewares

[`WizardMiddleware`](../type-aliases/WizardMiddleware.md)\<`T`, `StepId`\>[] = `[]`

#### Returns

`WizardStore`\<`T`, `StepId`\>

## Properties

### errorsMap

> **errorsMap**: `Map`\<`StepId`, `Map`\<`string`, `string`\>\>

Defined in: [core/src/store/WizardStore.ts:23](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L23)

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`errorsMap`](../interfaces/IWizardStore.md#errorsmap)

## Methods

### clearStepStorage()

> **clearStepStorage**(`stepId`): `void`

Defined in: [core/src/store/WizardStore.ts:534](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L534)

#### Parameters

##### stepId

`string`

#### Returns

`void`

***

### deleteError()

> **deleteError**(`stepId`, `path`): `boolean`

Defined in: [core/src/store/WizardStore.ts:439](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L439)

#### Parameters

##### stepId

`StepId`

##### path

`string`

#### Returns

`boolean`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`deleteError`](../interfaces/IWizardStore.md#deleteerror)

***

### dispatch()

> **dispatch**(`action`): `void`

Defined in: [core/src/store/WizardStore.ts:97](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L97)

Processes an action through the middleware chain and updates the state.
This is the primary way to trigger any state change in the wizard.

#### Parameters

##### action

[`WizardAction`](../type-aliases/WizardAction.md)\<`T`, `StepId`\>

The action to perform

#### Returns

`void`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`dispatch`](../interfaces/IWizardStore.md#dispatch)

***

### getSnapshot()

> **getSnapshot**(): [`IWizardState`](../interfaces/IWizardState.md)\<`T`, `StepId`\>

Defined in: [core/src/store/WizardStore.ts:285](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L285)

Returns the current immutable snapshot of the wizard state.

#### Returns

[`IWizardState`](../interfaces/IWizardState.md)\<`T`, `StepId`\>

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`getSnapshot`](../interfaces/IWizardStore.md#getsnapshot)

***

### goToStep()

> **goToStep**(`stepId`, `options`): `Promise`\<`boolean`\>

Defined in: [core/src/store/WizardStore.ts:775](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L775)

#### Parameters

##### stepId

`StepId`

##### options

###### providedActiveSteps?

[`IStepConfig`](../interfaces/IStepConfig.md)\<`T`, `StepId`\>[]

###### validate?

`boolean`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`goToStep`](../interfaces/IWizardStore.md#gotostep)

***

### hydrate()

> **hydrate**(): `void`

Defined in: [core/src/store/WizardStore.ts:471](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L471)

Restores wizard state from persistence storage.
Implements "latest wins" conflict resolution based on step timestamps.

#### Returns

`void`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`hydrate`](../interfaces/IWizardStore.md#hydrate)

***

### injectPersistence()

> **injectPersistence**(`adapter`): `void`

Defined in: [core/src/store/WizardStore.ts:463](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L463)

#### Parameters

##### adapter

[`IPersistenceAdapter`](../interfaces/IPersistenceAdapter.md)

#### Returns

`void`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`injectPersistence`](../interfaces/IWizardStore.md#injectpersistence)

***

### resolveActiveSteps()

> **resolveActiveSteps**(`data?`): `Promise`\<[`IStepConfig`](../interfaces/IStepConfig.md)\<`T`, `StepId`\>[]\>

Defined in: [core/src/store/WizardStore.ts:616](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L616)

Evaluates visibility conditions for all steps and returns only those that should be active.
Uses memoization to avoid redundant async calls if dependencies haven't changed.

#### Parameters

##### data?

`T`

Optional data override for evaluation

#### Returns

`Promise`\<[`IStepConfig`](../interfaces/IStepConfig.md)\<`T`, `StepId`\>[]\>

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`resolveActiveSteps`](../interfaces/IWizardStore.md#resolveactivesteps)

***

### save()

> **save**(`stepId?`): `void`

Defined in: [core/src/store/WizardStore.ts:547](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L547)

Manually triggers data persistence for specific steps or the current step.

#### Parameters

##### stepId?

`StepId`

Optional ID of step to save. If omitted, saves current step.

#### Returns

`void`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`save`](../interfaces/IWizardStore.md#save)

***

### setInitialData()

> **setInitialData**(`data`): `void`

Defined in: [core/src/store/WizardStore.ts:377](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L377)

Sets the initial data for the wizard.
Resets dirty tracking based on this new data.

#### Parameters

##### data

`T`

#### Returns

`void`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`setInitialData`](../interfaces/IWizardStore.md#setinitialdata)

***

### setStepErrors()

> **setStepErrors**(`stepId`, `errors`): `boolean`

Defined in: [core/src/store/WizardStore.ts:419](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L419)

#### Parameters

##### stepId

`StepId`

##### errors

`Record`\<`string`, `string`\> | `null` | `undefined`

#### Returns

`boolean`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`setStepErrors`](../interfaces/IWizardStore.md#setsteperrors)

***

### subscribe()

> **subscribe**(`listener`): () => `boolean`

Defined in: [core/src/store/WizardStore.ts:458](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L458)

#### Parameters

##### listener

() => `void`

#### Returns

> (): `boolean`

##### Returns

`boolean`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`subscribe`](../interfaces/IWizardStore.md#subscribe)

***

### subscribeToActions()

> **subscribeToActions**(`listener`): () => `boolean`

Defined in: [core/src/store/WizardStore.ts:29](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L29)

#### Parameters

##### listener

(`action`) => `void`

#### Returns

> (): `boolean`

##### Returns

`boolean`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`subscribeToActions`](../interfaces/IWizardStore.md#subscribetoactions)

***

### update()

> **update**(`newData`, `changedPath?`): `void`

Defined in: [core/src/store/WizardStore.ts:296](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L296)

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

[`IWizardStore`](../interfaces/IWizardStore.md).[`update`](../interfaces/IWizardStore.md#update)

***

### updateErrors()

> **updateErrors**(`newErrors`): `void`

Defined in: [core/src/store/WizardStore.ts:406](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L406)

#### Parameters

##### newErrors

`Record`\<`StepId`, `Record`\<`string`, `string`\>\>

#### Returns

`void`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`updateErrors`](../interfaces/IWizardStore.md#updateerrors)

***

### updateMeta()

> **updateMeta**(`newMeta`): `void`

Defined in: [core/src/store/WizardStore.ts:330](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L330)

#### Parameters

##### newMeta

`Partial`\<[`IWizardState`](../interfaces/IWizardState.md)\<`T`, `StepId`\>\>

#### Returns

`void`

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`updateMeta`](../interfaces/IWizardStore.md#updatemeta)

***

### validateAll()

> **validateAll**(): `Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

Defined in: [core/src/store/WizardStore.ts:751](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L751)

#### Returns

`Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`validateAll`](../interfaces/IWizardStore.md#validateall)

***

### validateStep()

> **validateStep**(`stepId`): `Promise`\<`boolean`\>

Defined in: [core/src/store/WizardStore.ts:692](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/store/WizardStore.ts#L692)

#### Parameters

##### stepId

`StepId`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`IWizardStore`](../interfaces/IWizardStore.md).[`validateStep`](../interfaces/IWizardStore.md#validatestep)
