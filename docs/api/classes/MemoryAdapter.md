[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / MemoryAdapter

# Class: MemoryAdapter

Defined in: [adapters/persistence/MemoryAdapter.ts:3](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/MemoryAdapter.ts#L3)

Persistence Adapter Interface

## Implements

- [`IPersistenceAdapter`](../interfaces/IPersistenceAdapter.md)

## Constructors

### Constructor

> **new MemoryAdapter**(): `MemoryAdapter`

#### Returns

`MemoryAdapter`

## Methods

### clear()

> **clear**(): `void`

Defined in: [adapters/persistence/MemoryAdapter.ts:25](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/MemoryAdapter.ts#L25)

#### Returns

`void`

#### Implementation of

[`IPersistenceAdapter`](../interfaces/IPersistenceAdapter.md).[`clear`](../interfaces/IPersistenceAdapter.md#clear)

***

### clearStep()

> **clearStep**(`stepId`): `void`

Defined in: [adapters/persistence/MemoryAdapter.ts:21](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/MemoryAdapter.ts#L21)

#### Parameters

##### stepId

`string`

#### Returns

`void`

#### Implementation of

[`IPersistenceAdapter`](../interfaces/IPersistenceAdapter.md).[`clearStep`](../interfaces/IPersistenceAdapter.md#clearstep)

***

### getStep()

> **getStep**\<`T`\>(`stepId`): `T` \| `undefined`

Defined in: [adapters/persistence/MemoryAdapter.ts:10](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/MemoryAdapter.ts#L10)

#### Type Parameters

##### T

`T`

#### Parameters

##### stepId

`string`

#### Returns

`T` \| `undefined`

#### Implementation of

[`IPersistenceAdapter`](../interfaces/IPersistenceAdapter.md).[`getStep`](../interfaces/IPersistenceAdapter.md#getstep)

***

### getStepWithMeta()

> **getStepWithMeta**\<`T`\>(`stepId`): \{ `data`: `T`; `timestamp`: `number`; \} \| `undefined`

Defined in: [adapters/persistence/MemoryAdapter.ts:14](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/MemoryAdapter.ts#L14)

#### Type Parameters

##### T

`T`

#### Parameters

##### stepId

`string`

#### Returns

\{ `data`: `T`; `timestamp`: `number`; \} \| `undefined`

#### Implementation of

[`IPersistenceAdapter`](../interfaces/IPersistenceAdapter.md).[`getStepWithMeta`](../interfaces/IPersistenceAdapter.md#getstepwithmeta)

***

### saveStep()

> **saveStep**\<`T`\>(`stepId`, `data`): `void`

Defined in: [adapters/persistence/MemoryAdapter.ts:6](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/MemoryAdapter.ts#L6)

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

[`IPersistenceAdapter`](../interfaces/IPersistenceAdapter.md).[`saveStep`](../interfaces/IPersistenceAdapter.md#savestep)
