[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / IWizardActions

# Interface: IWizardActions\<StepId\>

Defined in: [types.ts:88](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L88)

Public actions available to control the wizard.

## Type Parameters

### StepId

`StepId` *extends* `string` = `string`

## Properties

### clearStorage()

> **clearStorage**: () => `void`

Defined in: [types.ts:136](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L136)

Clears all saved data for this wizard from storage.

#### Returns

`void`

***

### getData()

> **getData**: (`path`, `defaultValue?`) => `unknown`

Defined in: [types.ts:163](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L163)

Retrieves data value at a specific path.

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

Defined in: [types.ts:93](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L93)

Attempts to move to the next step.
Triggers validation and guards if enabled.

#### Returns

`Promise`\<`void`\>

***

### goToPrevStep()

> **goToPrevStep**: () => `Promise`\<`void`\>

Defined in: [types.ts:97](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L97)

Moves to the previous step.

#### Returns

`Promise`\<`void`\>

***

### goToStep()

> **goToStep**: (`stepId`, `providedActiveSteps?`, `options?`) => `Promise`\<`boolean`\>

Defined in: [types.ts:104](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L104)

Navigates directly to a specific step.

#### Parameters

##### stepId

`StepId`

Target step ID

##### providedActiveSteps?

`any`[]

Optional override for active steps

##### options?

Navigation options (e.g. bypass validation)

###### validate?

`boolean`

#### Returns

`Promise`\<`boolean`\>

***

### handleStepChange()

> **handleStepChange**: (`field`, `value`) => `void`

Defined in: [types.ts:117](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L117)

Helper for simple field updates in basic forms.

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

Defined in: [types.ts:140](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L140)

Resets the entire wizard to its initial state.

#### Returns

`void`

***

### save()

> **save**: (`stepIds?`) => `void`

Defined in: [types.ts:132](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L132)

Persists specific steps to the configured storage.

#### Parameters

##### stepIds?

`boolean` | `StepId` | `StepId`[]

#### Returns

`void`

***

### setData()

> **setData**: (`path`, `value`, `options?`) => `void`

Defined in: [types.ts:146](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L146)

Primary method to update specific fields by path.
Supports dot notation and debounced validation.

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

#### Example

```ts
actions.setData('user.address.zip', '12345')
```

***

### setStepData()

> **setStepData**: (`stepId`, `data`) => `void`

Defined in: [types.ts:113](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L113)

**`Internal`**

Sets experimental bulk data for a step.

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

Defined in: [types.ts:168](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L168)

Dynamically updates wizard configuration.
Useful for changing steps or modes at runtime.

#### Parameters

##### config

`Partial`\<[`IWizardConfig`](IWizardConfig.md)\<`any`, `StepId`\>\>

#### Returns

`void`

***

### updateData()

> **updateData**: (`data`, `options?`) => `void`

Defined in: [types.ts:156](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L156)

Merges a partial data object into the wizard state.

#### Parameters

##### data

`Partial`\<`any`\>

Object to merge

##### options?

options.replace will overwrite the entire state

###### persist?

`boolean`

###### replace?

`boolean`

#### Returns

`void`

***

### validateAll()

> **validateAll**: () => `Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

Defined in: [types.ts:125](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L125)

Forces validation for all active steps.

#### Returns

`Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

***

### validateStep()

> **validateStep**: (`sid`) => `Promise`\<`boolean`\>

Defined in: [types.ts:121](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L121)

Forces validation for an individual step.

#### Parameters

##### sid

`StepId`

#### Returns

`Promise`\<`boolean`\>
