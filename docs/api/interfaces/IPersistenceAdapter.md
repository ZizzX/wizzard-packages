[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / IPersistenceAdapter

# Interface: IPersistenceAdapter

Defined in: [types.ts:208](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L208)

Persistence Adapter Interface

## Properties

### clear()

> **clear**: () => `void`

Defined in: [types.ts:213](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L213)

#### Returns

`void`

---

### clearStep()

> **clearStep**: (`stepId`) => `void`

Defined in: [types.ts:212](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L212)

#### Parameters

##### stepId

`string`

#### Returns

`void`

---

### getStep()

> **getStep**: \<`T`\>(`stepId`) => `T` \| `undefined`

Defined in: [types.ts:210](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L210)

#### Type Parameters

##### T

`T`

#### Parameters

##### stepId

`string`

#### Returns

`T` \| `undefined`

---

### getStepWithMeta()?

> `optional` **getStepWithMeta**: \<`T`\>(`stepId`) => \{ `data`: `T`; `timestamp`: `number`; \} \| `undefined`

Defined in: [types.ts:211](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L211)

#### Type Parameters

##### T

`T`

#### Parameters

##### stepId

`string`

#### Returns

\{ `data`: `T`; `timestamp`: `number`; \} \| `undefined`

---

### saveStep()

> **saveStep**: \<`T`\>(`stepId`, `data`) => `void`

Defined in: [types.ts:209](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L209)

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
