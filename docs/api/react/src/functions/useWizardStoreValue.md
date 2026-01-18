[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreValue

# Function: useWizardStoreValue()

> **useWizardStoreValue**\<`T`, `P`\>(`store`, `path`, `options?`): `PathValue`\<`T`, `P`\>

Defined in: [react/src/store.ts:418](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/react/src/store.ts#L418)

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

\{ `isEqual?`: (`a`, `b`) => `boolean`; \} | (`a`, `b`) => `boolean`

## Returns

`PathValue`\<`T`, `P`\>
