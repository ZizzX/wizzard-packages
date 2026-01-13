[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardSelector

# Function: useWizardSelector()

> **useWizardSelector**\<`TSelected`\>(`selector`, `options?`): `TSelected`

Defined in: [react/src/context/WizardContext.tsx:610](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/react/src/context/WizardContext.tsx#L610)

Selects a derived value from the wizard state with optional equality check.

## Type Parameters

### TSelected

`TSelected` = `any`

## Parameters

### selector

(`state`) => `TSelected`

### options?

#### isEqual?

(`a`, `b`) => `boolean`

## Returns

`TSelected`
