[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardSelector

# Function: useWizardSelector()

> **useWizardSelector**\<`TSelected`\>(`selector`, `options?`): `TSelected`

Defined in: [react/src/context/WizardContext.tsx:640](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/react/src/context/WizardContext.tsx#L640)

Selects a derived value from the wizard state with optional equality check.

## Type Parameters

### TSelected

`TSelected` = `any`

## Parameters

### selector

(`state`) => `TSelected`

### options?

\{ `isEqual?`: (`a`, `b`) => `boolean`; \} | (`a`, `b`) => `boolean`

## Returns

`TSelected`
