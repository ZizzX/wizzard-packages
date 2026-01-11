[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventPayloads

# Type Alias: WizardEventPayloads\<StepId\>

> **WizardEventPayloads**\<`StepId`\> = `object`

Defined in: [core/src/types.ts:279](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L279)

Event Payloads

## Type Parameters

### StepId

`StepId` *extends* `string` = `string`

## Properties

### step\_change

> **step\_change**: `object`

Defined in: [core/src/types.ts:280](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L280)

#### from

> **from**: `StepId` \| `null`

#### timestamp

> **timestamp**: `number`

#### to

> **to**: `StepId`

***

### validation\_error

> **validation\_error**: `object`

Defined in: [core/src/types.ts:281](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L281)

#### errors

> **errors**: `Record`\<`string`, `string`\> \| `undefined`

#### stepId

> **stepId**: `StepId`

#### timestamp

> **timestamp**: `number`

***

### wizard\_reset

> **wizard\_reset**: `object`

Defined in: [core/src/types.ts:286](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L286)

#### data

> **data**: `any`

#### timestamp?

> `optional` **timestamp**: `number`
