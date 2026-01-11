[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardActions

# Interface: IWizardActions\<StepId\>

Defined in: core/dist/index.d.ts:87

Public actions available to control the wizard.

## Extended by

- [`IWizardContext`](IWizardContext.md)

## Type Parameters

### StepId

`StepId` *extends* `string` = `string`

## Properties

### clearStorage()

> **clearStorage**: () => `void`

Defined in: core/dist/index.d.ts:101

#### Returns

`void`

***

### getData()

> **getData**: (`path`, `defaultValue?`) => `unknown`

Defined in: core/dist/index.d.ts:110

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

Defined in: core/dist/index.d.ts:88

#### Returns

`Promise`\<`void`\>

***

### goToPrevStep()

> **goToPrevStep**: () => `Promise`\<`void`\>

Defined in: core/dist/index.d.ts:89

#### Returns

`Promise`\<`void`\>

***

### goToStep()

> **goToStep**: (`stepId`, `providedActiveSteps?`, `options?`) => `Promise`\<`boolean`\>

Defined in: core/dist/index.d.ts:90

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

Defined in: core/dist/index.d.ts:94

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

Defined in: core/dist/index.d.ts:102

#### Returns

`void`

***

### save()

> **save**: (`stepIds?`) => `void`

Defined in: core/dist/index.d.ts:100

#### Parameters

##### stepIds?

`boolean` | `StepId` | `StepId`[]

#### Returns

`void`

***

### setData()

> **setData**: (`path`, `value`, `options?`) => `void`

Defined in: core/dist/index.d.ts:103

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

Defined in: core/dist/index.d.ts:93

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

Defined in: core/dist/index.d.ts:111

#### Parameters

##### config

`Partial`\<[`IWizardConfig`](IWizardConfig.md)\<`any`, `StepId`\>\>

#### Returns

`void`

***

### updateData()

> **updateData**: (`data`, `options?`) => `void`

Defined in: core/dist/index.d.ts:106

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

Defined in: core/dist/index.d.ts:96

#### Returns

`Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

***

### validateStep()

> **validateStep**: (`sid`) => `Promise`\<`boolean`\>

Defined in: core/dist/index.d.ts:95

#### Parameters

##### sid

`StepId`

#### Returns

`Promise`\<`boolean`\>
