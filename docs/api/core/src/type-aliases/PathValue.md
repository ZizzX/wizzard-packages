[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / PathValue

# Type Alias: PathValue\<T, P\>

> **PathValue**\<`T`, `P`\> = `T` *extends* `any` ? `P` *extends* `` `${infer K}.${infer R}` `` ? `K` *extends* keyof `T` ? `R` *extends* [`Path`](Path.md)\<`T`\[`K`\]\> ? `PathValue`\<`T`\[`K`\], `R`\> : `never` : `K` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\<infer V\> ? `R` *extends* [`Path`](Path.md)\<`V`\> ? `PathValue`\<`V`, `R`\> : `never` : `never` : `never` : `P` *extends* keyof `T` ? `T`\[`P`\] : `P` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\<infer V\> ? `V` : `never` : `never` : `never`

Defined in: [core/src/utils/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/utils/types.ts#L32)

Value type resolved from a dot-notation path.

## Type Parameters

### T

`T`

### P

`P` *extends* [`Path`](Path.md)\<`T`\>
