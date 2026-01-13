[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / MemoryAdapter

# Class: MemoryAdapter

Defined in: [persistence/src/MemoryAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/persistence/src/MemoryAdapter.ts#L6)

In-memory persistence adapter for tests or ephemeral sessions.

## Implements

- `IPersistenceAdapter`

## Constructors

### Constructor

> **new MemoryAdapter**(): `MemoryAdapter`

#### Returns

`MemoryAdapter`

## Methods

### clear()

> **clear**(): `void`

Defined in: [persistence/src/MemoryAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/persistence/src/MemoryAdapter.ts#L27)

#### Returns

`void`

#### Implementation of

`IPersistenceAdapter.clear`

***

### clearStep()

> **clearStep**(`stepId`): `void`

Defined in: [persistence/src/MemoryAdapter.ts:23](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/persistence/src/MemoryAdapter.ts#L23)

#### Parameters

##### stepId

`string`

#### Returns

`void`

#### Implementation of

`IPersistenceAdapter.clearStep`

***

### getStep()

> **getStep**\<`T`\>(`stepId`): `T` \| `undefined`

Defined in: [persistence/src/MemoryAdapter.ts:13](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/persistence/src/MemoryAdapter.ts#L13)

#### Type Parameters

##### T

`T`

#### Parameters

##### stepId

`string`

#### Returns

`T` \| `undefined`

#### Implementation of

`IPersistenceAdapter.getStep`

***

### getStepWithMeta()

> **getStepWithMeta**\<`T`\>(`stepId`): \{ `data`: `T`; `timestamp`: `number`; \} \| `undefined`

Defined in: [persistence/src/MemoryAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/persistence/src/MemoryAdapter.ts#L17)

#### Type Parameters

##### T

`T`

#### Parameters

##### stepId

`string`

#### Returns

\{ `data`: `T`; `timestamp`: `number`; \} \| `undefined`

#### Implementation of

`IPersistenceAdapter.getStepWithMeta`

***

### saveStep()

> **saveStep**\<`T`\>(`stepId`, `data`): `void`

Defined in: [persistence/src/MemoryAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/persistence/src/MemoryAdapter.ts#L9)

#### Type Parameters

##### T

`T`

#### Parameters

##### stepId

`string`

##### data

`T`

#### Returns

`void`

#### Implementation of

`IPersistenceAdapter.saveStep`
