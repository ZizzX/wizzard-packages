[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / WizardEventPayloads

# Type Alias: WizardEventPayloads\<StepId\>

> **WizardEventPayloads**\<`StepId`\> = `object`

Defined in: [types.ts:429](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L429)

Event Payloads

## Type Parameters

### StepId

`StepId` *extends* `string` = `string`

## Properties

### step\_change

> **step\_change**: `object`

Defined in: [types.ts:430](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L430)

#### from

> **from**: `StepId` \| `null`

#### timestamp

> **timestamp**: `number`

#### to

> **to**: `StepId`

***

### validation\_error

> **validation\_error**: `object`

Defined in: [types.ts:435](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L435)

#### errors

> **errors**: `Record`\<`string`, `string`\> \| `undefined`

#### stepId

> **stepId**: `StepId`

#### timestamp

> **timestamp**: `number`

***

### wizard\_reset

> **wizard\_reset**: `object`

Defined in: [types.ts:440](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L440)

#### data

> **data**: `any`

#### timestamp?

> `optional` **timestamp**: `number`
