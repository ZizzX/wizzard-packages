[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardStore

# Function: createWizardStore()

> **createWizardStore**\<`T`, `StepId`\>(`options`): [`WizardStoreBundle`](../interfaces/WizardStoreBundle.md)\<`T`, `StepId`\>

Defined in: [react/src/store.ts:384](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/react/src/store.ts#L384)

Create a standalone store + actions bundle without React Context.

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `any`\>

### StepId

`StepId` *extends* `string` = `string`

## Parameters

### options

[`CreateWizardStoreOptions`](../interfaces/CreateWizardStoreOptions.md)\<`T`, `StepId`\>

## Returns

[`WizardStoreBundle`](../interfaces/WizardStoreBundle.md)\<`T`, `StepId`\>
