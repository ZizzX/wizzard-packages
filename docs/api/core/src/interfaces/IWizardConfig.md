[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardConfig

# Interface: IWizardConfig\<T, StepId\>

Defined in: [core/src/types.ts:201](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L201)

Global Wizard Configuration.

## Type Parameters

### T

`T` = `unknown`

### StepId

`StepId` *extends* `string` = `string`

## Properties

### analytics?

> `optional` **analytics**: `object`

Defined in: [core/src/types.ts:214](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L214)

#### onEvent

> **onEvent**: [`WizardEventHandler`](../type-aliases/WizardEventHandler.md)\<`StepId`\>

***

### ~~autoValidate?~~

> `optional` **autoValidate**: `boolean`

Defined in: [core/src/types.ts:204](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L204)

#### Deprecated

Use validationMode instead

***

### middlewares?

> `optional` **middlewares**: [`WizardMiddleware`](../type-aliases/WizardMiddleware.md)\<`T`, `StepId`\>[]

Defined in: [core/src/types.ts:217](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L217)

***

### navigationMode?

> `optional` **navigationMode**: `"sequential"` \| `"visited"` \| `"free"`

Defined in: [core/src/types.ts:218](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L218)

***

### onConflict?

> `optional` **onConflict**: `"merge"` \| `"replace"` \| `"keep-local"`

Defined in: [core/src/types.ts:213](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L213)

***

### onStepChange()?

> `optional` **onStepChange**: (`fromStep`, `toStep`, `data`) => `void`

Defined in: [core/src/types.ts:219](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L219)

#### Parameters

##### fromStep

`StepId` | `null`

##### toStep

`StepId`

##### data

`T`

#### Returns

`void`

***

### persistence?

> `optional` **persistence**: `object`

Defined in: [core/src/types.ts:207](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L207)

#### adapter?

> `optional` **adapter**: [`IPersistenceAdapter`](IPersistenceAdapter.md)

#### debounceTime?

> `optional` **debounceTime**: `number`

#### mode?

> `optional` **mode**: [`PersistenceMode`](../type-aliases/PersistenceMode.md)

#### storageKey?

> `optional` **storageKey**: `string`

***

### steps

> **steps**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\>[]

Defined in: [core/src/types.ts:202](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L202)

***

### validationDebounceTime?

> `optional` **validationDebounceTime**: `number`

Defined in: [core/src/types.ts:206](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L206)

***

### validationMode?

> `optional` **validationMode**: [`ValidationMode`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:205](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L205)
