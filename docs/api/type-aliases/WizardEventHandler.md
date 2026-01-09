[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / WizardEventHandler

# Type Alias: WizardEventHandler()\<StepId\>

> **WizardEventHandler**\<`StepId`\> = \<`E`\>(`name`, `payload`) => `void`

Defined in: [types.ts:449](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L449)

Generic Event Handler Type

## Type Parameters

### StepId

`StepId` _extends_ `string` = `string`

## Type Parameters

### E

`E` _extends_ [`WizardEventName`](WizardEventName.md)

## Parameters

### name

`E`

### payload

[`WizardEventPayloads`](WizardEventPayloads.md)\<`StepId`\>\[`E`\]

## Returns

`void`
