[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardStore

# Function: createWizardStore()

> **createWizardStore**\<`T`, `StepId`\>(`options`): [`WizardStoreBundle`](../interfaces/WizardStoreBundle.md)\<`T`, `StepId`\>

Defined in: [react/src/store.ts:384](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/react/src/store.ts#L384)

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
