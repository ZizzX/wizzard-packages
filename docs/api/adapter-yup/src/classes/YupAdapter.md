[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupAdapter

# Class: YupAdapter\<T\>

Defined in: [adapter-yup/src/YupAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/adapter-yup/src/YupAdapter.ts#L7)

Validation adapter for Yup-like schemas.

## Type Parameters

### T

`T`

## Implements

- [`IValidatorAdapter`](../../../react/src/interfaces/IValidatorAdapter.md)\<`T`\>

## Constructors

### Constructor

> **new YupAdapter**\<`T`\>(`schema`): `YupAdapter`\<`T`\>

Defined in: [adapter-yup/src/YupAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/adapter-yup/src/YupAdapter.ts#L10)

#### Parameters

##### schema

[`YupLikeSchema`](../interfaces/YupLikeSchema.md)\<`T`\>

#### Returns

`YupAdapter`\<`T`\>

## Methods

### validate()

> **validate**(`data`): `Promise`\<[`ValidationResult`](../../../react/src/type-aliases/ValidationResult.md)\>

Defined in: [adapter-yup/src/YupAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/adapter-yup/src/YupAdapter.ts#L14)

#### Parameters

##### data

`unknown`

#### Returns

`Promise`\<[`ValidationResult`](../../../react/src/type-aliases/ValidationResult.md)\>

#### Implementation of

[`IValidatorAdapter`](../../../react/src/interfaces/IValidatorAdapter.md).[`validate`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
