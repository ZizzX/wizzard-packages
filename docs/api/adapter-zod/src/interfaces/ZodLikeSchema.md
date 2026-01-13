[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodLikeSchema

# Interface: ZodLikeSchema\<T\>

Defined in: [adapter-zod/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/adapter-zod/src/types.ts#L4)

Minimal structural interface for Zod-like schemas.

## Type Parameters

### T

`T` = `any`

## Properties

### safeParseAsync()

> **safeParseAsync**: (`data`) => `Promise`\<\{ `data?`: `T`; `error?`: \{ `issues`: `object`[]; \}; `success`: `boolean`; \}\>

Defined in: [adapter-zod/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/adapter-zod/src/types.ts#L5)

#### Parameters

##### data

`T`

#### Returns

`Promise`\<\{ `data?`: `T`; `error?`: \{ `issues`: `object`[]; \}; `success`: `boolean`; \}\>
