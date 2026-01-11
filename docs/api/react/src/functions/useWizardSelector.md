[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardSelector

# Function: useWizardSelector()

> **useWizardSelector**\<`TSelected`\>(`selector`, `options?`): `TSelected`

Defined in: [react/src/context/WizardContext.tsx:649](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/react/src/context/WizardContext.tsx#L649)

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
