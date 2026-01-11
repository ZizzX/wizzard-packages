[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardContext

# Interface: IWizardContext\<T, StepId\>

Defined in: [core/src/types.ts:320](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L320)

High-level context for the wizard, combining state and actions.

## Extends

- `Omit`\<[`IWizardState`](IWizardState.md)\<`T`, `StepId`\>, `"errors"`\>.[`IWizardActions`](IWizardActions.md)\<`StepId`\>

## Type Parameters

### T

`T` = `unknown`

### StepId

`StepId` *extends* `string` = `string`

## Properties

### activeSteps

> **activeSteps**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\>[]

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

#### Inherited from

`Omit.activeSteps`

***

### activeStepsCount

> **activeStepsCount**: `number`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L44)

Number of active steps

#### Inherited from

`Omit.activeStepsCount`

***

### allErrors

> **allErrors**: `Record`\<`StepId`, `Record`\<`string`, `string`\>\>

Defined in: [core/src/types.ts:333](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L333)

All errors by step and field.

***

### breadcrumbs

> **breadcrumbs**: [`IBreadcrumb`](IBreadcrumb.md)\<`StepId`\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

#### Inherited from

`Omit.breadcrumbs`

***

### busySteps

> **busySteps**: `Set`\<`StepId`\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

#### Inherited from

`Omit.busySteps`

***

### clearStorage()

> **clearStorage**: () => `void`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L106)

#### Returns

`void`

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`clearStorage`](IWizardActions.md#clearstorage)

***

### completedSteps

> **completedSteps**: `Set`\<`StepId`\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

#### Inherited from

`Omit.completedSteps`

***

### config

> **config**: [`IWizardConfig`](IWizardConfig.md)\<`T`, `StepId`\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L40)

Current wizard configuration

#### Inherited from

`Omit.config`

***

### currentStep

> **currentStep**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\> \| `null`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L14)

Active step configuration (if any)

#### Inherited from

`Omit.currentStep`

***

### currentStepId

> **currentStepId**: `""` \| `StepId`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L28)

String ID of the current step

#### Inherited from

`Omit.currentStepId`

***

### currentStepIndex

> **currentStepIndex**: `number`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

#### Inherited from

`Omit.currentStepIndex`

***

### data

> **data**: `T`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L10)

Global wizard data object

#### Inherited from

`Omit.data`

***

### dirtyFields

> **dirtyFields**: `Set`\<`string`\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

#### Inherited from

`Omit.dirtyFields`

***

### errors

> **errors**: `Record`\<`string`, `string`\>

Defined in: [core/src/types.ts:329](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L329)

Combined error map (flat)

***

### errorSteps

> **errorSteps**: `Set`\<`StepId`\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

#### Inherited from

`Omit.errorSteps`

***

### getData()

> **getData**: (`path`, `defaultValue?`) => `unknown`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L110)

#### Parameters

##### path

`string`

##### defaultValue?

`unknown`

#### Returns

`unknown`

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`getData`](IWizardActions.md#getdata)

***

### goToNextStep()

> **goToNextStep**: () => `Promise`\<`void`\>

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L91)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`goToNextStep`](IWizardActions.md#gotonextstep)

***

### goToPrevStep()

> **goToPrevStep**: () => `Promise`\<`void`\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L92)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`goToPrevStep`](IWizardActions.md#gotoprevstep)

***

### goToStep()

> **goToStep**: (`stepId`, `providedActiveSteps?`, `options?`) => `Promise`\<`boolean`\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L93)

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

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`goToStep`](IWizardActions.md#gotostep)

***

### goToStepResult?

> `optional` **goToStepResult**: `boolean` \| `"init"` \| `null`

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L54)

Result of the last goToStep action

#### Inherited from

`Omit.goToStepResult`

***

### handleStepChange()

> **handleStepChange**: (`field`, `value`) => `void`

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L99)

#### Parameters

##### field

`string`

##### value

`unknown`

#### Returns

`void`

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`handleStepChange`](IWizardActions.md#handlestepchange)

***

### history

> **history**: `StepId`[]

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

#### Inherited from

`Omit.history`

***

### isBusy

> **isBusy**: `boolean`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L46)

Alias for isPending

#### Inherited from

`Omit.isBusy`

***

### isDirty

> **isDirty**: `boolean`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

#### Inherited from

`Omit.isDirty`

***

### isFirstStep

> **isFirstStep**: `boolean`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L18)

True if currently on the first active step

#### Inherited from

`Omit.isFirstStep`

***

### isLastStep

> **isLastStep**: `boolean`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L20)

True if currently on the last active step

#### Inherited from

`Omit.isLastStep`

***

### isLoading

> **isLoading**: `boolean`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

#### Inherited from

`Omit.isLoading`

***

### isPending

> **isPending**: `boolean`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

#### Inherited from

`Omit.isPending`

***

### progress

> **progress**: `number`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

#### Inherited from

`Omit.progress`

***

### reset()

> **reset**: () => `void`

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L107)

#### Returns

`void`

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`reset`](IWizardActions.md#reset)

***

### save()

> **save**: (`stepIds?`) => `void`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L105)

#### Parameters

##### stepIds?

`boolean` | `StepId` | `StepId`[]

#### Returns

`void`

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`save`](IWizardActions.md#save)

***

### setData()

> **setData**: (`path`, `value`, `options?`) => `void`

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L108)

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

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`setData`](IWizardActions.md#setdata)

***

### setStepData()

> **setStepData**: (`stepId`, `data`) => `void`

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L98)

#### Parameters

##### stepId

`StepId`

##### data

`unknown`

#### Returns

`void`

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`setStepData`](IWizardActions.md#setstepdata)

***

### store

> **store**: [`IWizardStore`](IWizardStore.md)\<`T`, `StepId`\>

Defined in: [core/src/types.ts:325](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L325)

The internal store instance.

***

### updateConfig()

> **updateConfig**: (`config`) => `void`

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L111)

#### Parameters

##### config

`Partial`\<[`IWizardConfig`](IWizardConfig.md)\<`any`, `StepId`\>\>

#### Returns

`void`

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`updateConfig`](IWizardActions.md#updateconfig)

***

### updateData()

> **updateData**: (`data`, `options?`) => `void`

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L109)

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

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`updateData`](IWizardActions.md#updatedata)

***

### validateAll()

> **validateAll**: () => `Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L101)

#### Returns

`Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`validateAll`](IWizardActions.md#validateall)

***

### validateStep()

> **validateStep**: (`sid`) => `Promise`\<`boolean`\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L100)

#### Parameters

##### sid

`StepId`

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`validateStep`](IWizardActions.md#validatestep)

***

### visitedSteps

> **visitedSteps**: `Set`\<`StepId`\>

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user

#### Inherited from

`Omit.visitedSteps`
