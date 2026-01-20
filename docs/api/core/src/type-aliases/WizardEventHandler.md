[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventHandler

# Type Alias: WizardEventHandler()\<StepId\>

> **WizardEventHandler**\<`StepId`\> = \<`E`\>(`name`, `payload`) => `void`

Defined in: [core/src/types.ts:292](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/types.ts#L292)

Generic Event Handler Type

## Type Parameters

### StepId

`StepId` *extends* `string` = `string`

## Type Parameters

### E

`E` *extends* [`WizardEventName`](WizardEventName.md)

## Parameters

### name

`E`

### payload

[`WizardEventPayloads`](WizardEventPayloads.md)\<`StepId`\>\[`E`\]

## Returns

`void`
