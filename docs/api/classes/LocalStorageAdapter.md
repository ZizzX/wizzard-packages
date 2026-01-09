[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / LocalStorageAdapter

# Class: LocalStorageAdapter

Defined in: [adapters/persistence/LocalStorageAdapter.ts:3](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/LocalStorageAdapter.ts#L3)

Persistence Adapter Interface

## Implements

- [`IPersistenceAdapter`](../interfaces/IPersistenceAdapter.md)

## Constructors

### Constructor

> **new LocalStorageAdapter**(`prefix`): `LocalStorageAdapter`

Defined in: [adapters/persistence/LocalStorageAdapter.ts:6](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/LocalStorageAdapter.ts#L6)

#### Parameters

##### prefix

`string` = `'wizard_'`

#### Returns

`LocalStorageAdapter`

## Methods

### clear()

> **clear**(): `void`

Defined in: [adapters/persistence/LocalStorageAdapter.ts:68](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/LocalStorageAdapter.ts#L68)

#### Returns

`void`

#### Implementation of

[`IPersistenceAdapter`](../interfaces/IPersistenceAdapter.md).[`clear`](../interfaces/IPersistenceAdapter.md#clear)

---

### clearStep()

> **clearStep**(`stepId`): `void`

Defined in: [adapters/persistence/LocalStorageAdapter.ts:59](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/LocalStorageAdapter.ts#L59)

#### Parameters

##### stepId

`string`

#### Returns

`void`

#### Implementation of

[`IPersistenceAdapter`](../interfaces/IPersistenceAdapter.md).[`clearStep`](../interfaces/IPersistenceAdapter.md#clearstep)

---

### getStep()

> **getStep**\<`T`\>(`stepId`): `T` \| `undefined`

Defined in: [adapters/persistence/LocalStorageAdapter.ts:24](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/LocalStorageAdapter.ts#L24)

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

---

### getStepWithMeta()

> **getStepWithMeta**\<`T`\>(`stepId`): \{ `data`: `T`; `timestamp`: `number`; \} \| `undefined`

Defined in: [adapters/persistence/LocalStorageAdapter.ts:42](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/LocalStorageAdapter.ts#L42)

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

---

### saveStep()

> **saveStep**\<`T`\>(`stepId`, `data`): `void`

Defined in: [adapters/persistence/LocalStorageAdapter.ts:14](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/adapters/persistence/LocalStorageAdapter.ts#L14)

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
