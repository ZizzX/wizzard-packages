[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / PathValue

# Type Alias: PathValue\<T, P\>

> **PathValue**\<`T`, `P`\> = `T` *extends* `any` ? `P` *extends* `` `${infer K}.${infer R}` `` ? `K` *extends* keyof `T` ? `R` *extends* [`Path`](Path.md)\<`T`\[`K`\]\> ? `PathValue`\<`T`\[`K`\], `R`\> : `never` : `K` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\<infer V\> ? `R` *extends* [`Path`](Path.md)\<`V`\> ? `PathValue`\<`V`, `R`\> : `never` : `never` : `never` : `P` *extends* keyof `T` ? `T`\[`P`\] : `P` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\<infer V\> ? `V` : `never` : `never` : `never`

Defined in: [utils/types.ts:36](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/utils/types.ts#L36)

PathValue<T, P>: Infers the value type at a specific path P of type T

## Type Parameters

### T

`T`

### P

`P` *extends* [`Path`](Path.md)\<`T`\>
