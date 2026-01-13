[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / MiddlewareAPI

# Interface: MiddlewareAPI\<T, StepId\>

Defined in: [core/src/types.ts:258](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L258)

Middleware API

## Type Parameters

### T

`T` = `any`

### StepId

`StepId` *extends* `string` = `string`

## Properties

### dispatch()

> **dispatch**: (`action`) => `void`

Defined in: [core/src/types.ts:259](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L259)

#### Parameters

##### action

[`WizardAction`](../type-aliases/WizardAction.md)\<`T`, `StepId`\>

#### Returns

`void`

***

### getSnapshot()

> **getSnapshot**: () => [`IWizardState`](IWizardState.md)\<`T`, `StepId`\>

Defined in: [core/src/types.ts:261](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L261)

#### Returns

[`IWizardState`](IWizardState.md)\<`T`, `StepId`\>

***

### getState()

> **getState**: () => `T`

Defined in: [core/src/types.ts:260](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L260)

#### Returns

`T`
