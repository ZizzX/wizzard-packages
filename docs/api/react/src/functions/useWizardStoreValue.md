[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreValue

# Function: useWizardStoreValue()

> **useWizardStoreValue**\<`T`, `P`\>(`store`, `path`, `options?`): `PathValue`\<`T`, `P`\>

Defined in: [react/src/store.ts:418](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/react/src/store.ts#L418)

Hook: subscribe to a value path without React Context.

## Type Parameters

### T

`T`

### P

`P` *extends* `string`

## Parameters

### store

`IWizardStore`\<`T`, `any`\>

### path

`P`

### options?

#### isEqual?

(`a`, `b`) => `boolean`

## Returns

`PathValue`\<`T`, `P`\>
