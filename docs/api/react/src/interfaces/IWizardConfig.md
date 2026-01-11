[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardConfig

# Interface: IWizardConfig\<T, StepId\>

Defined in: core/dist/index.d.ts:184

Global Wizard Configuration.

## Type Parameters

### T

`T` = `unknown`

### StepId

`StepId` *extends* `string` = `string`

## Properties

### analytics?

> `optional` **analytics**: `object`

Defined in: core/dist/index.d.ts:197

#### onEvent

> **onEvent**: `WizardEventHandler`\<`StepId`\>

***

### ~~autoValidate?~~

> `optional` **autoValidate**: `boolean`

Defined in: core/dist/index.d.ts:187

#### Deprecated

Use validationMode instead

***

### middlewares?

> `optional` **middlewares**: [`WizardMiddleware`](../type-aliases/WizardMiddleware.md)\<`T`, `StepId`\>[]

Defined in: core/dist/index.d.ts:200

***

### navigationMode?

> `optional` **navigationMode**: `"sequential"` \| `"visited"` \| `"free"`

Defined in: core/dist/index.d.ts:201

***

### onConflict?

> `optional` **onConflict**: `"merge"` \| `"replace"` \| `"keep-local"`

Defined in: core/dist/index.d.ts:196

***

### onStepChange()?

> `optional` **onStepChange**: (`fromStep`, `toStep`, `data`) => `void`

Defined in: core/dist/index.d.ts:202

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

Defined in: core/dist/index.d.ts:190

#### adapter?

> `optional` **adapter**: `IPersistenceAdapter`

#### debounceTime?

> `optional` **debounceTime**: `number`

#### mode?

> `optional` **mode**: [`PersistenceMode`](../type-aliases/PersistenceMode.md)

#### storageKey?

> `optional` **storageKey**: `string`

***

### steps

> **steps**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\>[]

Defined in: core/dist/index.d.ts:185

***

### validationDebounceTime?

> `optional` **validationDebounceTime**: `number`

Defined in: core/dist/index.d.ts:189

***

### validationMode?

> `optional` **validationMode**: `ValidationMode`

Defined in: core/dist/index.d.ts:188
