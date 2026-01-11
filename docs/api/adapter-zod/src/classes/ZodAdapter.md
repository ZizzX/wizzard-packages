[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodAdapter

# Class: ZodAdapter\<T\>

Defined in: [adapter-zod/src/ZodAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/adapter-zod/src/ZodAdapter.ts#L7)

Validation adapter for Zod-like schemas.

## Type Parameters

### T

`T`

## Implements

- [`IValidatorAdapter`](../../../react/src/interfaces/IValidatorAdapter.md)\<`T`\>

## Constructors

### Constructor

> **new ZodAdapter**\<`T`\>(`schema`): `ZodAdapter`\<`T`\>

Defined in: [adapter-zod/src/ZodAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/adapter-zod/src/ZodAdapter.ts#L10)

#### Parameters

##### schema

[`ZodLikeSchema`](../interfaces/ZodLikeSchema.md)\<`T`\>

#### Returns

`ZodAdapter`\<`T`\>

## Methods

### validate()

> **validate**(`data`): `Promise`\<[`ValidationResult`](../../../react/src/type-aliases/ValidationResult.md)\>

Defined in: [adapter-zod/src/ZodAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/adapter-zod/src/ZodAdapter.ts#L14)

#### Parameters

##### data

`unknown`

#### Returns

`Promise`\<[`ValidationResult`](../../../react/src/type-aliases/ValidationResult.md)\>

#### Implementation of

[`IValidatorAdapter`](../../../react/src/interfaces/IValidatorAdapter.md).[`validate`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
