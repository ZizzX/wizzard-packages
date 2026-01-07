[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / Path

# Type Alias: Path\<T\>

> **Path**\<`T`\> = `T` *extends* `ReadonlyArray`\<infer V\> ? `IsTuple`\<`T`\> *extends* `true` ? `{ [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]> }`\[`TupleKeys`\<`T`\>\] : `PathImpl`\<`number`, `V`\> : `{ [K in keyof T]-?: PathImpl<K & string, T[K]> }`\[keyof `T`\]

Defined in: [utils/types.ts:23](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/utils/types.ts#L23)

Path<T>: Generates all valid dot-notation paths for type T

## Type Parameters

### T

`T`
