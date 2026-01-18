[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardMeta

# Function: useWizardMeta()

> **useWizardMeta**\<`T`, `StepId`\>(): `object`

Defined in: [react/src/context/WizardContext.tsx:746](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/react/src/context/WizardContext.tsx#L746)

Returns frequently-used meta state with shallow equality.

## Type Parameters

### T

`T` = `any`

### StepId

`StepId` *extends* `string` = `string`

## Returns

`object`

### activeStepsCount

> **activeStepsCount**: `number` = `s.activeStepsCount`

### currentStepId

> **currentStepId**: `""` \| `StepId` = `s.currentStepId`

### currentStepIndex

> **currentStepIndex**: `number` = `s.currentStepIndex`

### goToStepResult

> **goToStepResult**: `boolean` \| `"init"` \| `null` \| `undefined` = `s.goToStepResult`

### isBusy

> **isBusy**: `boolean` = `s.isBusy`

### isDirty

> **isDirty**: `boolean` = `s.isDirty`

### isFirstStep

> **isFirstStep**: `boolean` = `s.isFirstStep`

### isLastStep

> **isLastStep**: `boolean` = `s.isLastStep`

### isLoading

> **isLoading**: `boolean` = `s.isLoading`

### progress

> **progress**: `number` = `s.progress`
