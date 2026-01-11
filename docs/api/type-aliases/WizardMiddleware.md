[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / WizardMiddleware

# Type Alias: WizardMiddleware()\<T, StepId\>

> **WizardMiddleware**\<`T`, `StepId`\> = (`api`) => (`next`) => (`action`) => `void`

Defined in: [types.ts:413](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L413)

Middleware Type Definition

## Type Parameters

### T

`T` = `any`

### StepId

`StepId` _extends_ `string` = `string`

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
