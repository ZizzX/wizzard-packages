[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IStepConfig

# Interface: IStepConfig\<TStepData, StepId\>

Defined in: [core/src/types.ts:157](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L157)

Step Configuration

## Type Parameters

### TStepData

`TStepData` = `unknown`

### StepId

`StepId` *extends* `string` = `string`

## Properties

### ~~autoValidate?~~

> `optional` **autoValidate**: `boolean`

Defined in: [core/src/types.ts:179](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L179)

#### Deprecated

Use validationMode instead

***

### beforeLeave()?

> `optional` **beforeLeave**: (`data`, `direction`, `metadata`) => `boolean` \| `Promise`\<`boolean`\>

Defined in: [core/src/types.ts:169](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L169)

#### Parameters

##### data

`TStepData`

##### direction

[`StepDirection`](../type-aliases/StepDirection.md)

##### metadata

`Partial`\<[`IWizardState`](IWizardState.md)\<`TStepData`, `StepId`\>\> & `object`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

***

### canNavigateTo()?

> `optional` **canNavigateTo**: (`data`, `metadata`) => `boolean` \| `Promise`\<`boolean`\>

Defined in: [core/src/types.ts:189](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L189)

#### Parameters

##### data

`TStepData`

##### metadata

`Partial`\<[`IWizardState`](IWizardState.md)\<`TStepData`, `StepId`\>\> & `object`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

***

### clearData?

> `optional` **clearData**: `string` \| `string`[] \| (`data`, `changedFields`) => `Partial`\<`TStepData`\>

Defined in: [core/src/types.ts:185](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L185)

***

### component?

> `optional` **component**: `any`

Defined in: [core/src/types.ts:181](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L181)

***

### condition()?

> `optional` **condition**: (`data`, `metadata`) => `boolean` \| `Promise`\<`boolean`\>

Defined in: [core/src/types.ts:160](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L160)

#### Parameters

##### data

`TStepData`

##### metadata

`Partial`\<[`IWizardState`](IWizardState.md)\<`TStepData`, `StepId`\>\> & `object`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

***

### conditionDependsOn?

> `optional` **conditionDependsOn**: `string`[]

Defined in: [core/src/types.ts:168](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L168)

***

### dependsOn?

> `optional` **dependsOn**: `string`[]

Defined in: [core/src/types.ts:184](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L184)

***

### id

> **id**: `StepId`

Defined in: [core/src/types.ts:158](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L158)

***

### label

> **label**: `string`

Defined in: [core/src/types.ts:159](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L159)

***

### persistenceAdapter?

> `optional` **persistenceAdapter**: [`IPersistenceAdapter`](IPersistenceAdapter.md)

Defined in: [core/src/types.ts:182](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L182)

***

### persistenceMode?

> `optional` **persistenceMode**: [`PersistenceMode`](../type-aliases/PersistenceMode.md)

Defined in: [core/src/types.ts:183](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L183)

***

### showWhilePending?

> `optional` **showWhilePending**: `boolean`

Defined in: [core/src/types.ts:167](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L167)

***

### validationAdapter?

> `optional` **validationAdapter**: [`IValidatorAdapter`](IValidatorAdapter.md)\<`TStepData`\>

Defined in: [core/src/types.ts:177](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L177)

***

### validationMode?

> `optional` **validationMode**: [`ValidationMode`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:180](https://github.com/ZizzX/wizzard-packages/blob/334e590eefaffe9234192fb3f674c38674167b0c/packages/core/src/types.ts#L180)
