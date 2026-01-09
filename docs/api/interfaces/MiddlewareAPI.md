[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / MiddlewareAPI

# Interface: MiddlewareAPI\<T, StepId\>

Defined in: [types.ts:404](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L404)

Middleware API

## Type Parameters

### T

`T` = `any`

### StepId

`StepId` _extends_ `string` = `string`

## Properties

### dispatch()

> **dispatch**: (`action`) => `void`

Defined in: [types.ts:405](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L405)

#### Parameters

##### action

[`WizardAction`](../type-aliases/WizardAction.md)\<`T`, `StepId`\>

#### Returns

`void`

---

### getSnapshot()

> **getSnapshot**: () => `any`

Defined in: [types.ts:407](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L407)

#### Returns

`any`

---

### getState()

> **getState**: () => `T`

Defined in: [types.ts:406](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L406)

#### Returns

`T`
