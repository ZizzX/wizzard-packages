[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / IWizardContext

# Interface: IWizardContext\<T, StepId\>

Defined in: [types.ts:457](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L457)

Core Wizard Context State

## Type Parameters

### T

`T` = `unknown`

### StepId

`StepId` _extends_ `string` = `string`

## Properties

### activeSteps

> **activeSteps**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\>[]

Defined in: [types.ts:483](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L483)

Active steps (those meeting conditions)

---

### activeStepsCount

> **activeStepsCount**: `number`

Defined in: [types.ts:478](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L478)

---

### allErrors

> **allErrors**: `Record`\<`StepId`, `Record`\<`string`, `string`\>\>

Defined in: [types.ts:503](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L503)

Errors keyed by stepId -> field -> message

---

### breadcrumbs

> **breadcrumbs**: [`IBreadcrumb`](IBreadcrumb.md)\<`StepId`\>[]

Defined in: [types.ts:521](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L521)

Breadcrumbs

---

### busySteps

> **busySteps**: `Set`\<`StepId`\>

Defined in: [types.ts:493](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L493)

Steps that are currently performing async actions (conditions, validation, guards)

---

### clearStorage()

> **clearStorage**: () => `void`

Defined in: [types.ts:559](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L559)

#### Returns

`void`

---

### completedSteps

> **completedSteps**: `Set`\<`StepId`\>

Defined in: [types.ts:515](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L515)

---

### config

> **config**: [`IWizardConfig`](IWizardConfig.md)\<`T`, `StepId`\>

Defined in: [types.ts:458](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L458)

---

### currentStep

> **currentStep**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\> \| `null`

Defined in: [types.ts:459](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L459)

---

### currentStepId

> **currentStepId**: `""` \| `StepId`

Defined in: [types.ts:460](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L460)

---

### currentStepIndex

> **currentStepIndex**: `number`

Defined in: [types.ts:461](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L461)

---

### data

> **data**: `T`

Defined in: [types.ts:498](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L498)

Wizard form data

---

### dirtyFields

> **dirtyFields**: `Set`\<`string`\>

Defined in: [types.ts:472](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L472)

---

### errors

> **errors**: `Record`\<`string`, `string`\>

Defined in: [types.ts:509](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L509)

Flattened errors map (field -> message) for convenience.
Contains errors from all steps unless shadowed.

---

### errorSteps

> **errorSteps**: `Set`\<`StepId`\>

Defined in: [types.ts:516](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L516)

---

### getData()

> **getData**: (`path`, `defaultValue?`) => `unknown`

Defined in: [types.ts:551](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L551)

Get data by path

#### Parameters

##### path

`string`

##### defaultValue?

`unknown`

#### Returns

`unknown`

---

### goToNextStep()

> **goToNextStep**: () => `Promise`\<`void`\>

Defined in: [types.ts:526](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L526)

Navigation Actions

#### Returns

`Promise`\<`void`\>

---

### goToPrevStep()

> **goToPrevStep**: () => `void`

Defined in: [types.ts:527](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L527)

#### Returns

`void`

---

### goToStep()

> **goToStep**: (`stepId`) => `Promise`\<`boolean`\>

Defined in: [types.ts:528](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L528)

#### Parameters

##### stepId

`StepId`

#### Returns

`Promise`\<`boolean`\>

---

### handleStepChange()

> **handleStepChange**: (`field`, `value`) => `void`

Defined in: [types.ts:534](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L534)

#### Parameters

##### field

keyof `T`

##### value

`unknown`

#### Returns

`void`

---

### history

> **history**: `StepId`[]

Defined in: [types.ts:488](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L488)

Navigation History

---

### isBusy

> **isBusy**: `boolean`

Defined in: [types.ts:466](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L466)

---

### isDirty

> **isDirty**: `boolean`

Defined in: [types.ts:471](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L471)

Dirty State Tracking

---

### isFirstStep

> **isFirstStep**: `boolean`

Defined in: [types.ts:462](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L462)

---

### isLastStep

> **isLastStep**: `boolean`

Defined in: [types.ts:463](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L463)

---

### isLoading

> **isLoading**: `boolean`

Defined in: [types.ts:464](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L464)

---

### isPending?

> `optional` **isPending**: `boolean`

Defined in: [types.ts:465](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L465)

---

### progress

> **progress**: `number`

Defined in: [types.ts:477](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L477)

Progress and Stats

---

### reset()

> **reset**: () => `void`

Defined in: [types.ts:560](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L560)

#### Returns

`void`

---

### save()

> **save**: (`stepIds?`) => `void`

Defined in: [types.ts:558](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L558)

#### Parameters

##### stepIds?

`boolean` | `StepId` | `StepId`[]

#### Returns

`void`

---

### setData()

> **setData**: (`path`, `value`, `options?`) => `void`

Defined in: [types.ts:539](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L539)

Set data by path (supports dot notation and arrays, e.g., 'user.name' or 'items[0].value')

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

---

### setStepData()

> **setStepData**: (`stepId`, `data`) => `void`

Defined in: [types.ts:533](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L533)

Data Actions

#### Parameters

##### stepId

`StepId`

##### data

`unknown`

#### Returns

`void`

---

### store

> **store**: [`IWizardStore`](IWizardStore.md)\<`T`, `StepId`\>

Defined in: [types.ts:570](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L570)

Internal Store Access

---

### updateConfig()

> **updateConfig**: (`config`) => `void`

Defined in: [types.ts:565](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L565)

Dynamic Configuration

#### Parameters

##### config

`Partial`\<[`IWizardConfig`](IWizardConfig.md)\<`T`, `StepId`\>\>

#### Returns

`void`

---

### updateData()

> **updateData**: (`data`, `options?`) => `void`

Defined in: [types.ts:546](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L546)

Bulk update wizard data.

#### Parameters

##### data

`Partial`\<`T`\>

Partial data to merge.

##### options?

###### replace?

`boolean`

If true, replaces entire state instead of merging.

#### Returns

`void`

---

### validateAll()

> **validateAll**: () => `Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

Defined in: [types.ts:557](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L557)

#### Returns

`Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

---

### validateStep()

> **validateStep**: (`sid`) => `Promise`\<`boolean`\>

Defined in: [types.ts:556](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L556)

Validation & Persistence

#### Parameters

##### sid

`StepId`

#### Returns

`Promise`\<`boolean`\>

---

### visitedSteps

> **visitedSteps**: `Set`\<`StepId`\>

Defined in: [types.ts:514](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L514)

Steps Status
