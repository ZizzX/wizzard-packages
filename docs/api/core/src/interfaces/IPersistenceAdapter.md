[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IPersistenceAdapter

# Interface: IPersistenceAdapter

Defined in: [core/src/types.ts:141](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L141)

Persistence Adapter Interface

## Properties

### clear()

> **clear**: () => `void`

Defined in: [core/src/types.ts:146](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L146)

#### Returns

`void`

***

### clearStep()

> **clearStep**: (`stepId`) => `void`

Defined in: [core/src/types.ts:145](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L145)

#### Parameters

##### stepId

`string`

#### Returns

`void`

***

### getStep()

> **getStep**: \<`T`\>(`stepId`) => `T` \| `undefined`

Defined in: [core/src/types.ts:143](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L143)

#### Type Parameters

##### T

`T`

#### Parameters

##### stepId

`string`

#### Returns

`T` \| `undefined`

***

### getStepWithMeta()?

> `optional` **getStepWithMeta**: \<`T`\>(`stepId`) => \{ `data`: `T`; `timestamp`: `number`; \} \| `undefined`

Defined in: [core/src/types.ts:144](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L144)

#### Type Parameters

##### T

`T`

#### Parameters

##### stepId

`string`

#### Returns

\{ `data`: `T`; `timestamp`: `number`; \} \| `undefined`

***

### saveStep()

> **saveStep**: \<`T`\>(`stepId`, `data`) => `void`

Defined in: [core/src/types.ts:142](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L142)

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
