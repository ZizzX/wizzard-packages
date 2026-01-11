[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardStore

# Interface: IWizardStore\<T, StepId\>

Defined in: [core/src/types.ts:60](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L60)

Store interface for reading state and dispatching actions.

## Type Parameters

### T

`T`

### StepId

`StepId` *extends* `string` = `string`

## Properties

### errorsMap

> **errorsMap**: `Map`\<`string`, `Map`\<`string`, `string`\>\>

Defined in: [core/src/types.ts:74](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L74)

***

### validateAll()

> **validateAll**: () => `Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

Defined in: [core/src/types.ts:81](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L81)

#### Returns

`Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

***

### validateStep()

> **validateStep**: (`stepId`) => `Promise`\<`boolean`\>

Defined in: [core/src/types.ts:80](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L80)

#### Parameters

##### stepId

`StepId`

#### Returns

`Promise`\<`boolean`\>

## Methods

### deleteError()

> **deleteError**(`stepId`, `path`): `boolean`

Defined in: [core/src/types.ts:68](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L68)

#### Parameters

##### stepId

`string`

##### path

`string`

#### Returns

`boolean`

***

### dispatch()

> **dispatch**(`action`): `void`

Defined in: [core/src/types.ts:62](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L62)

#### Parameters

##### action

[`WizardAction`](../type-aliases/WizardAction.md)\<`T`, `StepId`\>

#### Returns

`void`

***

### getSnapshot()

> **getSnapshot**(): [`IWizardState`](IWizardState.md)\<`T`, `StepId`\>

Defined in: [core/src/types.ts:61](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L61)

#### Returns

[`IWizardState`](IWizardState.md)\<`T`, `StepId`\>

***

### goToStep()

> **goToStep**(`stepId`, `options?`): `Promise`\<`boolean`\>

Defined in: [core/src/types.ts:76](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L76)

#### Parameters

##### stepId

`StepId`

##### options?

###### providedActiveSteps?

[`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\>[]

###### validate?

`boolean`

#### Returns

`Promise`\<`boolean`\>

***

### hydrate()

> **hydrate**(): `void`

Defined in: [core/src/types.ts:73](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L73)

#### Returns

`void`

***

### injectPersistence()

> **injectPersistence**(`adapter`): `void`

Defined in: [core/src/types.ts:71](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L71)

#### Parameters

##### adapter

[`IPersistenceAdapter`](IPersistenceAdapter.md)

#### Returns

`void`

***

### resolveActiveSteps()

> **resolveActiveSteps**(`data?`): `Promise`\<[`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\>[]\>

Defined in: [core/src/types.ts:75](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L75)

#### Parameters

##### data?

`T`

#### Returns

`Promise`\<[`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\>[]\>

***

### save()

> **save**(`stepId?`): `void`

Defined in: [core/src/types.ts:72](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L72)

#### Parameters

##### stepId?

`StepId`

#### Returns

`void`

***

### setInitialData()

> **setInitialData**(`data`): `void`

Defined in: [core/src/types.ts:65](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L65)

#### Parameters

##### data

`T`

#### Returns

`void`

***

### setStepErrors()

> **setStepErrors**(`stepId`, `errors`): `boolean`

Defined in: [core/src/types.ts:67](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L67)

#### Parameters

##### stepId

`string`

##### errors

`Record`\<`string`, `string`\> | `null` | `undefined`

#### Returns

`boolean`

***

### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in: [core/src/types.ts:69](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L69)

#### Parameters

##### listener

() => `void`

#### Returns

> (): `void`

##### Returns

`void`

***

### subscribeToActions()

> **subscribeToActions**(`listener`): () => `void`

Defined in: [core/src/types.ts:70](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L70)

#### Parameters

##### listener

(`action`) => `void`

#### Returns

> (): `void`

##### Returns

`void`

***

### update()

> **update**(`newData`, `changedPath?`): `void`

Defined in: [core/src/types.ts:63](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L63)

#### Parameters

##### newData

`T`

##### changedPath?

`string` | `string`[]

#### Returns

`void`

***

### updateErrors()

> **updateErrors**(`newErrors`): `void`

Defined in: [core/src/types.ts:66](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L66)

#### Parameters

##### newErrors

`Record`\<`string`, `Record`\<`string`, `string`\>\>

#### Returns

`void`

***

### updateMeta()

> **updateMeta**(`newMeta`): `void`

Defined in: [core/src/types.ts:64](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L64)

#### Parameters

##### newMeta

`Partial`\<[`IWizardState`](IWizardState.md)\<`T`, `StepId`\>\>

#### Returns

`void`
