[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardHooks

# Function: createWizardHooks()

> **createWizardHooks**\<`T`, `StepId`\>(`store`): `object`

Defined in: [react/src/store.ts:499](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/react/src/store.ts#L499)

Helper: build store-bound hooks for a single store instance.

## Type Parameters

### T

`T`

### StepId

`StepId` *extends* `string` = `string`

## Parameters

### store

`IWizardStore`\<`T`, `StepId`\>

## Returns

`object`

### useWizardError()

> **useWizardError**: (`path`) => `string` \| `undefined`

#### Parameters

##### path

`string`

#### Returns

`string` \| `undefined`

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
