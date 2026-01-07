[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / IWizardConfig

# Interface: IWizardConfig\<T, StepId\>

Defined in: [types.ts:313](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L313)

Global Wizard Configuration.

Defines steps, validation rules, persistence settings and overall behavior.

## Type Parameters

### T

`T` = `unknown`

### StepId

`StepId` *extends* `string` = `string`

## Properties

### analytics?

> `optional` **analytics**: `object`

Defined in: [types.ts:357](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L357)

Integration with analytics services.

#### onEvent

> **onEvent**: [`WizardEventHandler`](../type-aliases/WizardEventHandler.md)\<`StepId`\>

***

### ~~autoValidate?~~

> `optional` **autoValidate**: `boolean`

Defined in: [types.ts:320](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L320)

#### Deprecated

Use validationMode instead

***

### middlewares?

> `optional` **middlewares**: [`WizardMiddleware`](../type-aliases/WizardMiddleware.md)\<`T`, `StepId`\>[]

Defined in: [types.ts:364](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L364)

Function chain to intercept or enrich wizard actions.

***

### navigationMode?

> `optional` **navigationMode**: `"sequential"` \| `"visited"` \| `"free"`

Defined in: [types.ts:372](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L372)

Global navigation rules.
- 'sequential': Forward/Back only.
- 'visited': Can jump to any previously visited step.
- 'free': Full access to all steps at any time.

***

### onConflict?

> `optional` **onConflict**: `"merge"` \| `"replace"` \| `"keep-local"`

Defined in: [types.ts:352](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L352)

Conflict resolution strategy for persistence hydration.

***

### onStepChange()?

> `optional` **onStepChange**: (`fromStep`, `toStep`, `data`) => `void`

Defined in: [types.ts:377](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L377)

Callback triggered on every successful step transition.

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

Defined in: [types.ts:338](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L338)

Data persistence settings.

#### adapter?

> `optional` **adapter**: [`IPersistenceAdapter`](IPersistenceAdapter.md)

Store implementation (LocalStorageAdapter by default)

#### debounceTime?

> `optional` **debounceTime**: `number`

Throttle/Debounce time for storage operations

#### mode?

> `optional` **mode**: [`PersistenceMode`](../type-aliases/PersistenceMode.md)

When to save state to storage

#### storageKey?

> `optional` **storageKey**: `string`

Unique key for storage isolation

***

### steps

> **steps**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\>[]

Defined in: [types.ts:315](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L315)

List of steps in order. Conditions may dynamically skip some of them.

***

### validationDebounceTime?

> `optional` **validationDebounceTime**: `number`

Defined in: [types.ts:333](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L333)

Time (ms) to wait before triggering validation on field change. 
Only applies if validationMode is 'onChange'.

***

### validationMode?

> `optional` **validationMode**: [`ValidationMode`](../type-aliases/ValidationMode.md)

Defined in: [types.ts:327](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L327)

Default validation trigger for all steps.
Can be overridden per-step.
Default: 'onStepChange'
