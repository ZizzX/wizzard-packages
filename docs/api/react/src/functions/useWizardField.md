[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardField

# Function: useWizardField()

> **useWizardField**\<`T`, `P`\>(`path`, `options?`): \[`PathValue`\<`T`, `P`\>, (`value`) => `void`\]

Defined in: [react/src/context/WizardContext.tsx:604](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/react/src/context/WizardContext.tsx#L604)

Returns a value and setter for a path (useState-like API).

## Type Parameters

### T

`T`

### P

`P` *extends* `string`

## Parameters

### path

`P`

### options?

#### isEqual?

(`a`, `b`) => `boolean`

## Returns

\[`PathValue`\<`T`, `P`\>, (`value`) => `void`\]
