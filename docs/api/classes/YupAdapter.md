[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / YupAdapter

# Class: YupAdapter\<T\>

Defined in: [adapters/validation/YupAdapter.ts:4](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/validation/YupAdapter.ts#L4)

Validator Adapter Interface
TData: The type of data this validator expects

## Type Parameters

### T

`T`

## Implements

- [`IValidatorAdapter`](../interfaces/IValidatorAdapter.md)\<`T`\>

## Constructors

### Constructor

> **new YupAdapter**\<`T`\>(`schema`): `YupAdapter`\<`T`\>

Defined in: [adapters/validation/YupAdapter.ts:7](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/validation/YupAdapter.ts#L7)

#### Parameters

##### schema

[`YupLikeSchema`](../interfaces/YupLikeSchema.md)\<`T`\>

#### Returns

`YupAdapter`\<`T`\>

## Methods

### validate()

> **validate**(`data`): `Promise`\<[`ValidationResult`](../type-aliases/ValidationResult.md)\>

Defined in: [adapters/validation/YupAdapter.ts:11](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/validation/YupAdapter.ts#L11)

#### Parameters

##### data

`unknown`

#### Returns

`Promise`\<[`ValidationResult`](../type-aliases/ValidationResult.md)\>

#### Implementation of

[`IValidatorAdapter`](../interfaces/IValidatorAdapter.md).[`validate`](../interfaces/IValidatorAdapter.md#validate)
