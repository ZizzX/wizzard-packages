[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / IWizardStore

# Interface: IWizardStore\<T, StepId\>

Defined in: [types.ts:63](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L63)

## Type Parameters

### T

`T`

### StepId

`StepId` _extends_ `string` = `string`

## Properties

### errorsMap

> **errorsMap**: `Map`\<`string`, `Map`\<`string`, `string`\>\>

Defined in: [types.ts:82](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L82)

## Methods

### deleteError()

> **deleteError**(`stepId`, `path`): `boolean`

Defined in: [types.ts:74](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L74)

#### Parameters

##### stepId

`string`

##### path

`string`

#### Returns

`boolean`

---

### dispatch()

> **dispatch**(`action`): `void`

Defined in: [types.ts:65](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L65)

#### Parameters

##### action

[`WizardAction`](../type-aliases/WizardAction.md)\<`T`, `StepId`\>

#### Returns

`void`

---

### getSnapshot()

> **getSnapshot**(): [`IWizardState`](IWizardState.md)\<`T`, `StepId`\>

Defined in: [types.ts:64](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L64)

#### Returns

[`IWizardState`](IWizardState.md)\<`T`, `StepId`\>

---

### hydrate()

> **hydrate**(): `void`

Defined in: [types.ts:81](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L81)

#### Returns

`void`

---

### injectPersistence()

> **injectPersistence**(`adapter`): `void`

Defined in: [types.ts:79](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L79)

#### Parameters

##### adapter

[`IPersistenceAdapter`](IPersistenceAdapter.md)

#### Returns

`void`

---

### save()

> **save**(`stepId?`): `void`

Defined in: [types.ts:80](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L80)

#### Parameters

##### stepId?

`StepId`

#### Returns

`void`

---

### setInitialData()

> **setInitialData**(`data`): `void`

Defined in: [types.ts:68](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L68)

#### Parameters

##### data

`T`

#### Returns

`void`

---

### setStepErrors()

> **setStepErrors**(`stepId`, `errors`): `boolean`

Defined in: [types.ts:70](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L70)

#### Parameters

##### stepId

`string`

##### errors

`Record`\<`string`, `string`\> | `null` | `undefined`

#### Returns

`boolean`

---

### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in: [types.ts:75](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L75)

#### Parameters

##### listener

() => `void`

#### Returns

> (): `void`

##### Returns

`void`

---

### subscribeToActions()

> **subscribeToActions**(`listener`): () => `void`

Defined in: [types.ts:76](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L76)

#### Parameters

##### listener

(`action`) => `void`

#### Returns

> (): `void`

##### Returns

`void`

---

### update()

> **update**(`newData`, `changedPath?`): `void`

Defined in: [types.ts:66](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L66)

#### Parameters

##### newData

`T`

##### changedPath?

`string` | `string`[]

#### Returns

`void`

---

### updateErrors()

> **updateErrors**(`newErrors`): `void`

Defined in: [types.ts:69](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L69)

#### Parameters

##### newErrors

`Record`\<`string`, `Record`\<`string`, `string`\>\>

#### Returns

`void`

---

### updateMeta()

> **updateMeta**(`newMeta`): `void`

Defined in: [types.ts:67](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L67)

#### Parameters

##### newMeta

`Partial`\<[`IWizardState`](IWizardState.md)\<`T`, `StepId`\>\>

#### Returns

`void`
