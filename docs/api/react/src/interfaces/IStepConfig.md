[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IStepConfig

# Interface: IStepConfig\<TStepData, StepId\>

Defined in: core/dist/index.d.ts:154

Step Configuration

## Type Parameters

### TStepData

`TStepData` = `unknown`

### StepId

`StepId` *extends* `string` = `string`

## Properties

### ~~autoValidate?~~

> `optional` **autoValidate**: `boolean`

Defined in: core/dist/index.d.ts:169

#### Deprecated

Use validationMode instead

***

### beforeLeave()?

> `optional` **beforeLeave**: (`data`, `direction`, `metadata`) => `boolean` \| `Promise`\<`boolean`\>

Defined in: core/dist/index.d.ts:163

#### Parameters

##### data

`TStepData`

##### direction

`StepDirection`

##### metadata

`Partial`\<[`IWizardState`](IWizardState.md)\<`TStepData`, `StepId`\>\> & `object`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

***

### canNavigateTo()?

> `optional` **canNavigateTo**: (`data`, `metadata`) => `boolean` \| `Promise`\<`boolean`\>

Defined in: core/dist/index.d.ts:176

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

Defined in: core/dist/index.d.ts:175

***

### component?

> `optional` **component**: `any`

Defined in: core/dist/index.d.ts:171

***

### condition()?

> `optional` **condition**: (`data`, `metadata`) => `boolean` \| `Promise`\<`boolean`\>

Defined in: core/dist/index.d.ts:157

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

Defined in: core/dist/index.d.ts:162

***

### dependsOn?

> `optional` **dependsOn**: `string`[]

Defined in: core/dist/index.d.ts:174

***

### id

> **id**: `StepId`

Defined in: core/dist/index.d.ts:155

***

### label

> **label**: `string`

Defined in: core/dist/index.d.ts:156

***

### persistenceAdapter?

> `optional` **persistenceAdapter**: `IPersistenceAdapter`

Defined in: core/dist/index.d.ts:172

***

### persistenceMode?

> `optional` **persistenceMode**: [`PersistenceMode`](../type-aliases/PersistenceMode.md)

Defined in: core/dist/index.d.ts:173

***

### showWhilePending?

> `optional` **showWhilePending**: `boolean`

Defined in: core/dist/index.d.ts:161

***

### validationAdapter?

> `optional` **validationAdapter**: [`IValidatorAdapter`](IValidatorAdapter.md)\<`TStepData`\>

Defined in: core/dist/index.d.ts:167

***

### validationMode?

> `optional` **validationMode**: `ValidationMode`

Defined in: core/dist/index.d.ts:170
