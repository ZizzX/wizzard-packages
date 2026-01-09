[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / PathValue

# Type Alias: PathValue\<T, P\>

> **PathValue**\<`T`, `P`\> = `T` _extends_ `any` ? `P` _extends_ `` `${infer K}.${infer R}` `` ? `K` _extends_ keyof `T` ? `R` _extends_ [`Path`](Path.md)\<`T`\[`K`\]\> ? `PathValue`\<`T`\[`K`\], `R`\> : `never` : `K` _extends_ `` `${number}` `` ? `T` _extends_ `ReadonlyArray`\<infer V\> ? `R` _extends_ [`Path`](Path.md)\<`V`\> ? `PathValue`\<`V`, `R`\> : `never` : `never` : `never` : `P` _extends_ keyof `T` ? `T`\[`P`\] : `P` _extends_ `` `${number}` `` ? `T` _extends_ `ReadonlyArray`\<infer V\> ? `V` : `never` : `never` : `never`

Defined in: [utils/types.ts:36](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/utils/types.ts#L36)

PathValue<T, P>: Infers the value type at a specific path P of type T

## Type Parameters

### T

`T`

### P

`P` _extends_ [`Path`](Path.md)\<`T`\>
