[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreSelector

# Function: useWizardStoreSelector()

> **useWizardStoreSelector**\<`TSelected`\>(`store`, `selector`, `options?`): `TSelected`

Defined in: [react/src/store.ts:497](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/react/src/store.ts#L497)

Hook: select derived state without React Context.

## Type Parameters

### TSelected

`TSelected`

## Parameters

### store

`IWizardStore`\<`any`, `any`\>

### selector

(`state`) => `TSelected`

### options?

\{ `isEqual?`: (`a`, `b`) => `boolean`; \} | (`a`, `b`) => `boolean`

## Returns

`TSelected`
