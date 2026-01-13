[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardMiddleware

# Type Alias: WizardMiddleware()\<T, StepId\>

> **WizardMiddleware**\<`T`, `StepId`\> = (`api`) => (`next`) => (`action`) => `void`

Defined in: [core/src/types.ts:267](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/types.ts#L267)

Middleware Type Definition

## Type Parameters

### T

`T` = `any`

### StepId

`StepId` *extends* `string` = `string`

## Parameters

### api

[`MiddlewareAPI`](../interfaces/MiddlewareAPI.md)\<`T`, `StepId`\>

## Returns

> (`next`): (`action`) => `void`

### Parameters

#### next

(`action`) => `void`

### Returns

> (`action`): `void`

#### Parameters

##### action

[`WizardAction`](WizardAction.md)\<`T`, `StepId`\>

#### Returns

`void`
