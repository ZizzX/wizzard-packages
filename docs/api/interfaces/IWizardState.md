[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / IWizardState

# Interface: IWizardState\<T, StepId\>

Defined in: [types.ts:16](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L16)

Full state of the wizard.

## Type Parameters

### T

`T` = `unknown`

### StepId

`StepId` _extends_ `string` = `string`

## Properties

### activeSteps

> **activeSteps**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\>[]

Defined in: [types.ts:34](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L34)

List of steps that currently meet their visibility conditions

---

### activeStepsCount

> **activeStepsCount**: `number`

Defined in: [types.ts:52](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L52)

Number of active steps

---

### breadcrumbs

> **breadcrumbs**: [`IBreadcrumb`](IBreadcrumb.md)\<`StepId`\>[]

Defined in: [types.ts:60](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L60)

Breadcrumb items for navigation UI

---

### busySteps

> **busySteps**: `Set`\<`StepId`\>

Defined in: [types.ts:40](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L40)

Set of step IDs that are currently performing async work

---

### completedSteps

> **completedSteps**: `Set`\<`StepId`\>

Defined in: [types.ts:44](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L44)

Set of step IDs that have passed validation

---

### config

> **config**: [`IWizardConfig`](IWizardConfig.md)\<`T`, `StepId`\>

Defined in: [types.ts:48](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L48)

Current wizard configuration

---

### currentStep

> **currentStep**: [`IStepConfig`](IStepConfig.md)\<`T`, `StepId`\> \| `null`

Defined in: [types.ts:22](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L22)

Active step configuration (if any)

---

### currentStepId

> **currentStepId**: `""` \| `StepId`

Defined in: [types.ts:36](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L36)

String ID of the current step

---

### currentStepIndex

> **currentStepIndex**: `number`

Defined in: [types.ts:24](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L24)

Numeric index of current step in active steps list

---

### data

> **data**: `T`

Defined in: [types.ts:18](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L18)

Global wizard data object

---

### dirtyFields

> **dirtyFields**: `Set`\<`string`\>

Defined in: [types.ts:58](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L58)

Set of paths to fields that have been modified

---

### errors

> **errors**: `Record`\<`StepId`, `Record`\<`string`, `string`\>\>

Defined in: [types.ts:20](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L20)

Current errors map by step and field

---

### errorSteps

> **errorSteps**: `Set`\<`StepId`\>

Defined in: [types.ts:46](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L46)

Set of step IDs that currently have active validation errors

---

### history

> **history**: `StepId`[]

Defined in: [types.ts:38](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L38)

History of visited steps (navigation path)

---

### isBusy

> **isBusy**: `boolean`

Defined in: [types.ts:54](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L54)

Alias for isPending

---

### isDirty

> **isDirty**: `boolean`

Defined in: [types.ts:56](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L56)

True if any field has been modified since initialization

---

### isFirstStep

> **isFirstStep**: `boolean`

Defined in: [types.ts:26](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L26)

True if currently on the first active step

---

### isLastStep

> **isLastStep**: `boolean`

Defined in: [types.ts:28](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L28)

True if currently on the last active step

---

### isLoading

> **isLoading**: `boolean`

Defined in: [types.ts:30](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L30)

True if the wizard is in an initial loading/hydrating state

---

### isPending

> **isPending**: `boolean`

Defined in: [types.ts:32](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L32)

True if an async action (like navigation or validation) is in progress

---

### progress

> **progress**: `number`

Defined in: [types.ts:50](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L50)

Percentage of completion (0-100)

---

### visitedSteps

> **visitedSteps**: `Set`\<`StepId`\>

Defined in: [types.ts:42](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L42)

Set of step IDs that have been visited by the user
