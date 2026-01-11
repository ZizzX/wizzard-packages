[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardContext

# Interface: IWizardContext\<T, StepId\>

Defined in: core/dist/index.d.ts:352

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

Defined in: core/dist/index.d.ts:25

List of steps that currently meet their visibility conditions

#### Inherited from

`Omit.activeSteps`

***

### activeStepsCount

> **activeStepsCount**: `number`

Defined in: core/dist/index.d.ts:43

Number of active steps

#### Inherited from

[`IWizardState`](IWizardState.md).[`activeStepsCount`](IWizardState.md#activestepscount)

***

### allErrors

> **allErrors**: `Record`\<`StepId`, `Record`\<`string`, `string`\>\>

Defined in: core/dist/index.d.ts:364

All errors by step and field.

***

### breadcrumbs

> **breadcrumbs**: `IBreadcrumb`\<`StepId`\>[]

Defined in: core/dist/index.d.ts:51

Breadcrumb items for navigation UI

#### Inherited from

`Omit.breadcrumbs`

***

### busySteps

> **busySteps**: `Set`\<`StepId`\>

Defined in: core/dist/index.d.ts:31

Set of step IDs that are currently performing async work

#### Inherited from

`Omit.busySteps`

***

### clearStorage()

> **clearStorage**: () => `void`

Defined in: core/dist/index.d.ts:101

#### Returns

`void`

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`clearStorage`](IWizardActions.md#clearstorage)

***

### completedSteps

> **completedSteps**: `Set`\<`StepId`\>

Defined in: core/dist/index.d.ts:35

Set of step IDs that have passed validation

#### Inherited from

`Omit.completedSteps`

***

### config

> **config**: [`IWizardConfig`](IWizardConfig.md)\<`T`, `StepId`\>

Defined in: core/dist/index.d.ts:39

Current wizard configuration

#### Inherited from

`Omit.config`

***

### currentStep

> **currentStep**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\> \| `null`

Defined in: core/dist/index.d.ts:13

Active step configuration (if any)

#### Inherited from

`Omit.currentStep`

***

### currentStepId

> **currentStepId**: `""` \| `StepId`

Defined in: core/dist/index.d.ts:27

String ID of the current step

#### Inherited from

`Omit.currentStepId`

***

### currentStepIndex

> **currentStepIndex**: `number`

Defined in: core/dist/index.d.ts:15

Numeric index of current step in active steps list

#### Inherited from

[`IWizardState`](IWizardState.md).[`currentStepIndex`](IWizardState.md#currentstepindex)

***

### data

> **data**: `T`

Defined in: core/dist/index.d.ts:9

Global wizard data object

#### Inherited from

`Omit.data`

***

### dirtyFields

> **dirtyFields**: `Set`\<`string`\>

Defined in: core/dist/index.d.ts:49

Set of paths to fields that have been modified

#### Inherited from

[`IWizardState`](IWizardState.md).[`dirtyFields`](IWizardState.md#dirtyfields)

***

### errors

> **errors**: `Record`\<`string`, `string`\>

Defined in: core/dist/index.d.ts:360

Combined error map (flat)

***

### errorSteps

> **errorSteps**: `Set`\<`StepId`\>

Defined in: core/dist/index.d.ts:37

Set of step IDs that currently have active validation errors

#### Inherited from

`Omit.errorSteps`

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

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`getData`](IWizardActions.md#getdata)

***

### goToNextStep()

> **goToNextStep**: () => `Promise`\<`void`\>

Defined in: core/dist/index.d.ts:88

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`goToNextStep`](IWizardActions.md#gotonextstep)

***

### goToPrevStep()

> **goToPrevStep**: () => `Promise`\<`void`\>

Defined in: core/dist/index.d.ts:89

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`goToPrevStep`](IWizardActions.md#gotoprevstep)

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

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`goToStep`](IWizardActions.md#gotostep)

***

### goToStepResult?

> `optional` **goToStepResult**: `boolean` \| `"init"` \| `null`

Defined in: core/dist/index.d.ts:53

Result of the last goToStep action

#### Inherited from

[`IWizardState`](IWizardState.md).[`goToStepResult`](IWizardState.md#gotostepresult)

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

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`handleStepChange`](IWizardActions.md#handlestepchange)

***

### history

> **history**: `StepId`[]

Defined in: core/dist/index.d.ts:29

History of visited steps (navigation path)

#### Inherited from

`Omit.history`

***

### isBusy

> **isBusy**: `boolean`

Defined in: core/dist/index.d.ts:45

Alias for isPending

#### Inherited from

[`IWizardState`](IWizardState.md).[`isBusy`](IWizardState.md#isbusy)

***

### isDirty

> **isDirty**: `boolean`

Defined in: core/dist/index.d.ts:47

True if any field has been modified since initialization

#### Inherited from

[`IWizardState`](IWizardState.md).[`isDirty`](IWizardState.md#isdirty)

***

### isFirstStep

> **isFirstStep**: `boolean`

Defined in: core/dist/index.d.ts:17

True if currently on the first active step

#### Inherited from

[`IWizardState`](IWizardState.md).[`isFirstStep`](IWizardState.md#isfirststep)

***

### isLastStep

> **isLastStep**: `boolean`

Defined in: core/dist/index.d.ts:19

True if currently on the last active step

#### Inherited from

[`IWizardState`](IWizardState.md).[`isLastStep`](IWizardState.md#islaststep)

***

### isLoading

> **isLoading**: `boolean`

Defined in: core/dist/index.d.ts:21

True if the wizard is in an initial loading/hydrating state

#### Inherited from

[`IWizardState`](IWizardState.md).[`isLoading`](IWizardState.md#isloading)

***

### isPending

> **isPending**: `boolean`

Defined in: core/dist/index.d.ts:23

True if an async action (like navigation or validation) is in progress

#### Inherited from

[`IWizardState`](IWizardState.md).[`isPending`](IWizardState.md#ispending)

***

### progress

> **progress**: `number`

Defined in: core/dist/index.d.ts:41

Percentage of completion (0-100)

#### Inherited from

[`IWizardState`](IWizardState.md).[`progress`](IWizardState.md#progress)

***

### reset()

> **reset**: () => `void`

Defined in: core/dist/index.d.ts:102

#### Returns

`void`

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`reset`](IWizardActions.md#reset)

***

### save()

> **save**: (`stepIds?`) => `void`

Defined in: core/dist/index.d.ts:100

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

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`setData`](IWizardActions.md#setdata)

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

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`setStepData`](IWizardActions.md#setstepdata)

***

### store

> **store**: `IWizardStore`\<`T`, `StepId`\>

Defined in: core/dist/index.d.ts:356

The internal store instance.

***

### updateConfig()

> **updateConfig**: (`config`) => `void`

Defined in: core/dist/index.d.ts:111

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

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`updateData`](IWizardActions.md#updatedata)

***

### validateAll()

> **validateAll**: () => `Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

Defined in: core/dist/index.d.ts:96

#### Returns

`Promise`\<\{ `errors`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `isValid`: `boolean`; \}\>

#### Inherited from

[`IWizardActions`](IWizardActions.md).[`validateAll`](IWizardActions.md#validateall)

***

### validateStep()

> **validateStep**: (`sid`) => `Promise`\<`boolean`\>

Defined in: core/dist/index.d.ts:95

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

Defined in: core/dist/index.d.ts:33

Set of step IDs that have been visited by the user

#### Inherited from

`Omit.visitedSteps`
