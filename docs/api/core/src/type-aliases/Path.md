[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / Path

# Type Alias: Path\<T\>

> **Path**\<`T`\> = `T` *extends* `ReadonlyArray`\<infer V\> ? `IsTuple`\<`T`\> *extends* `true` ? `{ [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]> }`\[`TupleKeys`\<`T`\>\] : `PathImpl`\<`number`, `V`\> : `{ [K in keyof T]-?: PathImpl<K & string, T[K]> }`\[keyof `T`\]

Defined in: [core/src/utils/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/core/src/utils/types.ts#L18)

Dot-notation path for a nested data type.

## Type Parameters

### T

`T`
