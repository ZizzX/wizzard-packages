[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / IStepConfig

# Interface: IStepConfig\<TStepData, StepId\>

Defined in: [types.ts:226](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L226)

Step Configuration
TStepData: Type of data for this step
TGlobalContext: Type of the global wizard data

## Type Parameters

### TStepData

`TStepData` = `unknown`

### StepId

`StepId` _extends_ `string` = `string`

## Properties

### ~~autoValidate?~~

> `optional` **autoValidate**: `boolean`

Defined in: [types.ts:257](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L257)

Override global auto-validation setting for this step

#### Deprecated

Use validationMode instead

---

### beforeLeave()?

> `optional` **beforeLeave**: (`data`, `direction`, `metadata`) => `boolean` \| `Promise`\<`boolean`\>

Defined in: [types.ts:248](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L248)

Guard function called before leaving the step.
Return false or throw to prevent navigation.

#### Parameters

##### data

`TStepData`

##### direction

[`StepDirection`](../type-aliases/StepDirection.md)

##### metadata

`Partial`\<[`IWizardState`](IWizardState.md)\<`TStepData`, `StepId`\>\> & `object`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

---

### canNavigateTo()?

> `optional` **canNavigateTo**: (`data`, `metadata`) => `boolean` \| `Promise`\<`boolean`\>

Defined in: [types.ts:305](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L305)

Determines if user can navigate to this step directly.
Useful for implementing role-based access control or conditional navigation.

#### Parameters

##### data

`TStepData`

Current wizard data

##### metadata

`Partial`\<[`IWizardState`](IWizardState.md)\<`TStepData`, `StepId`\>\> & `object`

Wizard state (visitedSteps, completedSteps, currentStepId, etc.)

#### Returns

`boolean` \| `Promise`\<`boolean`\>

true if navigation is allowed, false otherwise

---

### clearData?

> `optional` **clearData**: `string` \| `string`[] \| (`data`, `changedFields`) => `Partial`\<`TStepData`\>

Defined in: [types.ts:290](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L290)

Paths to clear when dependencies change.
Can be a single path string, an array of paths, or a function returning a data patch to merge.
Function receives current data and array of changed field paths that triggered the dependency.

---

### component?

> `optional` **component**: `ComponentType`\<`any`\>

Defined in: [types.ts:269](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L269)

Optional React Component to render for this step.
Used by the <WizardStepRenderer /> component.

---

### condition()?

> `optional` **condition**: (`data`, `metadata`) => `boolean` \| `Promise`\<`boolean`\>

Defined in: [types.ts:233](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L233)

Predicate to determine if step should be included/visible.
Supports both synchronous and asynchronous predicates.

#### Parameters

##### data

`TStepData`

##### metadata

`Partial`\<[`IWizardState`](IWizardState.md)\<`TStepData`, `StepId`\>\> & `object`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

---

### conditionDependsOn?

> `optional` **conditionDependsOn**: `string`[]

Defined in: [types.ts:243](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L243)

Optimization: Array of paths that this step's condition depends on.
If provided, the condition will only be re-evaluated when these paths change.

---

### dependsOn?

> `optional` **dependsOn**: `string`[]

Defined in: [types.ts:284](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L284)

Dependency Tracking: Reset this step's data/status when these paths change.

---

### id

> **id**: `StepId`

Defined in: [types.ts:227](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L227)

---

### label

> **label**: `string`

Defined in: [types.ts:228](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L228)

---

### persistenceAdapter?

> `optional` **persistenceAdapter**: [`IPersistenceAdapter`](IPersistenceAdapter.md)

Defined in: [types.ts:273](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L273)

Override global persistence adapter for this specific step.

---

### persistenceMode?

> `optional` **persistenceMode**: [`PersistenceMode`](../type-aliases/PersistenceMode.md)

Defined in: [types.ts:280](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L280)

Control when persistence occurs for this specific step.

- 'onStepChange': Save when moving between steps (default)
- 'onChange': Save on every data change (debounced)
- 'manual': Save only when manually triggered

---

### showWhilePending?

> `optional` **showWhilePending**: `boolean`

Defined in: [types.ts:238](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L238)

If true, the step will be visible while its condition is being resolved.
Default: false (step is hidden until condition is resolved)

---

### validationAdapter?

> `optional` **validationAdapter**: [`IValidatorAdapter`](IValidatorAdapter.md)\<`TStepData`\>

Defined in: [types.ts:252](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L252)

Adapter for validation logic

---

### validationMode?

> `optional` **validationMode**: [`ValidationMode`](../type-aliases/ValidationMode.md)

Defined in: [types.ts:264](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L264)

Control when validation occurs for this step.

- 'onChange': Validate on every keystroke (debounced)
- 'onStepChange': Validate only when attempting to leave the step
- 'manual': Only validate when explicitly triggered
