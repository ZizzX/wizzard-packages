[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardMiddleware

# Type Alias: WizardMiddleware()\<T, StepId\>

> **WizardMiddleware**\<`T`, `StepId`\> = (`api`) => (`next`) => (`action`) => `void`

Defined in: core/dist/index.d.ts:309

Middleware Type Definition

## Type Parameters

### T

`T` = `any`

### StepId

`StepId` *extends* `string` = `string`

## Parameters

### api

`MiddlewareAPI`\<`T`, `StepId`\>

## Returns

> (`next`): (`action`) => `void`

### Parameters

#### next

(`action`) => `void`

### Returns

> (`action`): `void`

#### Parameters

##### action

`WizardAction`\<`T`, `StepId`\>

#### Returns

`void`
