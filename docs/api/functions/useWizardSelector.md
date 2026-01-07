[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / useWizardSelector

# Function: useWizardSelector()

> **useWizardSelector**\<`TSelected`\>(`selector`, `options?`): `TSelected`

Defined in: [context/WizardContext.tsx:735](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/context/WizardContext.tsx#L735)

Generic selector hook for custom state slices.
Component will only re-render if the selected value changes.

## Type Parameters

### TSelected

`TSelected` = `any`

## Parameters

### selector

(`state`) => `TSelected`

Pure function that transforms state

### options?

optional equality checker

#### isEqual?

(`a`, `b`) => `boolean`

## Returns

`TSelected`
