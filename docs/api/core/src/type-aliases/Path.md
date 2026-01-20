[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / Path

# Type Alias: Path\<T\>

> **Path**\<`T`\> = `T` *extends* `ReadonlyArray`\<infer V\> ? `IsTuple`\<`T`\> *extends* `true` ? `{ [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]> }`\[`TupleKeys`\<`T`\>\] : `PathImpl`\<`number`, `V`\> : `{ [K in keyof T]-?: PathImpl<K & string, T[K]> }`\[keyof `T`\]

Defined in: [core/src/utils/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/core/src/utils/types.ts#L18)

Dot-notation path for a nested data type.

## Type Parameters

### T

`T`
