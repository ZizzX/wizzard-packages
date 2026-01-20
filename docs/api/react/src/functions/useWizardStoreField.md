[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreField

# Function: useWizardStoreField()

> **useWizardStoreField**\<`T`, `P`\>(`store`, `setData`, `path`, `options?`): \[`PathValue`\<`T`, `P`\>, (`value`) => `void`\]

Defined in: [react/src/store.ts:458](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/react/src/store.ts#L458)

Hook: value + setter for a path without React Context.

## Type Parameters

### T

`T`

### P

`P` *extends* `string`

## Parameters

### store

`IWizardStore`\<`T`, `any`\>

### setData

(`path`, `value`) => `void`

### path

`P`

### options?

#### isEqual?

(`a`, `b`) => `boolean`

## Returns

\[`PathValue`\<`T`, `P`\>, (`value`) => `void`\]
