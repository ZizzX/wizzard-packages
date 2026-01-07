[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / ZodLikeSchema

# Interface: ZodLikeSchema\<T\>

Defined in: [adapters/validation/internal-types.ts:4](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/validation/internal-types.ts#L4)

Minimal structural interface for Zod-like schemas.

## Type Parameters

### T

`T` = `any`

## Properties

### safeParseAsync()

> **safeParseAsync**: (`data`) => `Promise`\<\{ `data?`: `T`; `error?`: \{ `issues`: `object`[]; \}; `success`: `boolean`; \}\>

Defined in: [adapters/validation/internal-types.ts:5](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/validation/internal-types.ts#L5)

#### Parameters

##### data

`T`

#### Returns

`Promise`\<\{ `data?`: `T`; `error?`: \{ `issues`: `object`[]; \}; `success`: `boolean`; \}\>
