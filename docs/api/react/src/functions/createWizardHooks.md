[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardHooks

# Function: createWizardHooks()

> **createWizardHooks**\<`T`, `StepId`\>(`store`, `actions?`): `object`

Defined in: [react/src/store.ts:540](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/react/src/store.ts#L540)

Helper: build store-bound hooks for a single store instance.

## Type Parameters

### T

`T`

### StepId

`StepId` *extends* `string` = `string`

## Parameters

### store

`IWizardStore`\<`T`, `StepId`\>

### actions?

[`IWizardActionsTyped`](../type-aliases/IWizardActionsTyped.md)\<`T`, `StepId`\>

## Returns

`object`

### useWizardError()

> **useWizardError**: (`path`) => `string` \| `undefined`

#### Parameters

##### path

`string`

#### Returns

`string` \| `undefined`

### useWizardField()

> **useWizardField**: \<`P`\>(`path`, `options?`) => \[`PathValue`\<`T`, `P`\>, (`value`) => `void`\]

#### Type Parameters

##### P

`P` *extends* `string`

#### Parameters

##### path

`P`

##### options?

###### isEqual?

(`a`, `b`) => `boolean`

#### Returns

\[`PathValue`\<`T`, `P`\>, (`value`) => `void`\]

### useWizardSelector()

> **useWizardSelector**: \<`TSelected`\>(`selector`, `options?`) => `TSelected`

#### Type Parameters

##### TSelected

`TSelected`

#### Parameters

##### selector

(`state`) => `TSelected`

##### options?

###### isEqual?

(`a`, `b`) => `boolean`

#### Returns

`TSelected`

### useWizardState()

> **useWizardState**: () => [`IWizardState`](../interfaces/IWizardState.md)\<`T`, `StepId`\>

#### Returns

[`IWizardState`](../interfaces/IWizardState.md)\<`T`, `StepId`\>

### useWizardValue()

> **useWizardValue**: \<`P`\>(`path`, `options?`) => `PathValue`\<`T`, `P`\>

#### Type Parameters

##### P

`P` *extends* `string`

#### Parameters

##### path

`P`

##### options?

###### isEqual?

(`a`, `b`) => `boolean`

#### Returns

`PathValue`\<`T`, `P`\>
