[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / LocalStorageAdapter

# Class: LocalStorageAdapter

Defined in: [persistence/src/LocalStorageAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/persistence/src/LocalStorageAdapter.ts#L6)

Browser persistence adapter backed by localStorage.

## Implements

- `IPersistenceAdapter`

## Constructors

### Constructor

> **new LocalStorageAdapter**(`prefix`): `LocalStorageAdapter`

Defined in: [persistence/src/LocalStorageAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/persistence/src/LocalStorageAdapter.ts#L9)

#### Parameters

##### prefix

`string` = `'wizard_'`

#### Returns

`LocalStorageAdapter`

## Methods

### clear()

> **clear**(): `void`

Defined in: [persistence/src/LocalStorageAdapter.ts:69](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/persistence/src/LocalStorageAdapter.ts#L69)

#### Returns

`void`

#### Implementation of

`IPersistenceAdapter.clear`

***

### clearStep()

> **clearStep**(`stepId`): `void`

Defined in: [persistence/src/LocalStorageAdapter.ts:60](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/persistence/src/LocalStorageAdapter.ts#L60)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/persistence/src/LocalStorageAdapter.ts#L27)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:44](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/persistence/src/LocalStorageAdapter.ts#L44)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/persistence/src/LocalStorageAdapter.ts#L17)

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
