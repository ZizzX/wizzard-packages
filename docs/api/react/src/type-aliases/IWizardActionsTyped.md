[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardActionsTyped

# Type Alias: IWizardActionsTyped\<T, StepId\>

> **IWizardActionsTyped**\<`T`, `StepId`\> = `Omit`\<[`IWizardActions`](../interfaces/IWizardActions.md)\<`StepId`\>, `"setData"` \| `"updateData"` \| `"getData"`\> & `object`

Defined in: [react/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/3faafc350c2fba09f986bc003f64611593ef97f2/packages/react/src/types.ts#L32)

Typed actions for strongly-typed paths.

## Type Declaration

### getData()

> **getData**: \<`P`\>(`path`, `defaultValue?`) => `PathValue`\<`T`, `P`\>

#### Type Parameters

##### P

`P` *extends* `Path`\<`T`\>

#### Parameters

##### path

`P`

##### defaultValue?

`PathValue`\<`T`, `P`\>

#### Returns

`PathValue`\<`T`, `P`\>

### setData()

> **setData**: \<`P`\>(`path`, `value`, `options?`) => `void`

#### Type Parameters

##### P

`P` *extends* `Path`\<`T`\>

#### Parameters

##### path

`P`

##### value

`PathValue`\<`T`, `P`\>

##### options?

###### debounceValidation?

`number`

#### Returns

`void`

### updateData()

> **updateData**: (`data`, `options?`) => `void`

#### Parameters

##### data

`Partial`\<`T`\>

##### options?

###### persist?

`boolean`

###### replace?

`boolean`

#### Returns

`void`

## Type Parameters

### T

`T`

### StepId

`StepId` *extends* `string` = `string`
