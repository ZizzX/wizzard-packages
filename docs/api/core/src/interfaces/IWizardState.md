[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardState

# Interface: IWizardState\<T, StepId\>

Defined in: [core/src/types.ts:8](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L8)

Full state of the wizard.

## Type Parameters

### T

`T` = `unknown`

### StepId

`StepId` *extends* `string` = `string`

## Properties

### activeSteps

> **activeSteps**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\>[]

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

***

### activeStepsCount

> **activeStepsCount**: `number`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L44)

Number of active steps

***

### breadcrumbs

> **breadcrumbs**: [`IBreadcrumb`](IBreadcrumb.md)\<`StepId`\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

***

### busySteps

> **busySteps**: `Set`\<`StepId`\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

***

### completedSteps

> **completedSteps**: `Set`\<`StepId`\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

***

### config

> **config**: [`IWizardConfig`](IWizardConfig.md)\<`T`, `StepId`\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L40)

Current wizard configuration

***

### currentStep

> **currentStep**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\> \| `null`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L14)

Active step configuration (if any)

***

### currentStepId

> **currentStepId**: `""` \| `StepId`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L28)

String ID of the current step

***

### currentStepIndex

> **currentStepIndex**: `number`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

***

### data

> **data**: `T`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L10)

Global wizard data object

***

### dirtyFields

> **dirtyFields**: `Set`\<`string`\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

***

### errors

> **errors**: `Record`\<`StepId`, `Record`\<`string`, `string`\>\>

Defined in: [core/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L12)

Current errors map by step and field

***

### errorSteps

> **errorSteps**: `Set`\<`StepId`\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

***

### goToStepResult?

> `optional` **goToStepResult**: `boolean` \| `"init"` \| `null`

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L54)

Result of the last goToStep action

***

### history

> **history**: `StepId`[]

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

***

### isBusy

> **isBusy**: `boolean`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L46)

Alias for isPending

***

### isDirty

> **isDirty**: `boolean`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

***

### isFirstStep

> **isFirstStep**: `boolean`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L18)

True if currently on the first active step

***

### isLastStep

> **isLastStep**: `boolean`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L20)

True if currently on the last active step

***

### isLoading

> **isLoading**: `boolean`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

***

### isPending

> **isPending**: `boolean`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

***

### progress

> **progress**: `number`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

***

### visitedSteps

> **visitedSteps**: `Set`\<`StepId`\>

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user
