[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardActions

# Interface: IWizardActions\<StepId\>

Defined in: [core/src/types.ts:90](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L90)

Public actions available to control the wizard.

## Extended by

- [`IWizardContext`](IWizardContext.md)

## Type Parameters

### StepId

`StepId` *extends* `string` = `string`

## Properties

### clearStorage()

> **clearStorage**: () => `void`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L106)

#### Returns

`void`

***

### getData()

> **getData**: (`path`, `defaultValue?`) => `unknown`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L110)

#### Parameters

##### path

`string`

##### defaultValue?

`unknown`

#### Returns

`unknown`

***

### goToNextStep()

> **goToNextStep**: () => `Promise`\<`void`\>

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L91)

#### Returns

`Promise`\<`void`\>

***

### goToPrevStep()

> **goToPrevStep**: () => `Promise`\<`void`\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L92)

#### Returns

`Promise`\<`void`\>

***

### goToStep()

> **goToStep**: (`stepId`, `providedActiveSteps?`, `options?`) => `Promise`\<`boolean`\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L93)

#### Parameters

##### stepId

`StepId`

##### providedActiveSteps?

`any`[]

##### options?

###### validate?

`boolean`

#### Returns

`Promise`\<`boolean`\>

***

### handleStepChange()

> **handleStepChange**: (`field`, `value`) => `void`

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L99)

#### Parameters

##### field

`string`

##### value

`unknown`

#### Returns

`void`

***

### reset()

> **reset**: () => `void`

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L107)

#### Returns

`void`

***

### save()

> **save**: (`stepIds?`) => `void`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L105)

#### Parameters

##### stepIds?

`boolean` | `StepId` | `StepId`[]

#### Returns

`void`

***

### setData()

> **setData**: (`path`, `value`, `options?`) => `void`

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L108)

#### Parameters

##### path

`string`

##### value

`unknown`

##### options?

###### debounceValidation?

`number`

#### Returns

`void`

***

### setStepData()

> **setStepData**: (`stepId`, `data`) => `void`

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L98)

#### Parameters

##### stepId

`StepId`

##### data

`unknown`

#### Returns

`void`

***

### updateConfig()

> **updateConfig**: (`config`) => `void`

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L111)

#### Parameters

##### config

`Partial`\<[`IWizardConfig`](IWizardConfig.md)\<`any`, `StepId`\>\>

#### Returns

`void`

***

### updateData()

> **updateData**: (`data`, `options?`) => `void`

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L109)

#### Parameters

##### data

`Partial`\<`any`\>

##### options?

###### persist?

`boolean`

###### replace?

`boolean`

#### Returns

`void`

***

### validateAll()

> **validateAll**: () => `Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L101)

#### Returns

`Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

***

### validateStep()

> **validateStep**: (`sid`) => `Promise`\<`boolean`\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L100)

#### Parameters

##### sid

`StepId`

#### Returns

`Promise`\<`boolean`\>
