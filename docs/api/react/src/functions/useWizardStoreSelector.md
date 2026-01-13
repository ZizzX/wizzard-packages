[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreSelector

# Function: useWizardStoreSelector()

> **useWizardStoreSelector**\<`TSelected`\>(`store`, `selector`, `options?`): `TSelected`

Defined in: [react/src/store.ts:471](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/react/src/store.ts#L471)

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

#### isEqual?

(`a`, `b`) => `boolean`

## Returns

`TSelected`
