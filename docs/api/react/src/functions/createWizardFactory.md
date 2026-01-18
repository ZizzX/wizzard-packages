[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardFactory

# Function: createWizardFactory()

> **createWizardFactory**\<`TSchema`, `StepId`\>(): `object`

Defined in: [react/src/factory.tsx:30](https://github.com/ZizzX/wizzard-packages/blob/bd9abc50162aedea92b5b7ad6612c24b655bcfe0/packages/react/src/factory.tsx#L30)

createWizardFactory

Creates a strongly-typed set of Wizard components and hooks for a specific data schema.

## Type Parameters

### TSchema

`TSchema` *extends* `Record`\<`string`, `any`\>

The shape of your wizard's global data state

### StepId

`StepId` *extends* `string` = `string`

## Returns

`object`

### createStep()

> **createStep**: (`config`) => [`IStepConfig`](../interfaces/IStepConfig.md)\<`TSchema`, `StepId`\>

#### Parameters

##### config

[`IStepConfig`](../interfaces/IStepConfig.md)\<`TSchema`, `StepId`\>

#### Returns

[`IStepConfig`](../interfaces/IStepConfig.md)\<`TSchema`, `StepId`\>

### useBreadcrumbs()

> **useBreadcrumbs**: () => `IBreadcrumb`\<`StepId`\>[]

#### Returns

`IBreadcrumb`\<`StepId`\>[]

### useWizard()

> **useWizard**: () => [`IWizardContext`](../interfaces/IWizardContext.md)\<`TSchema`, `StepId`\>

#### Returns

[`IWizardContext`](../interfaces/IWizardContext.md)\<`TSchema`, `StepId`\>

### useWizardActions()

> **useWizardActions**: () => [`IWizardActionsTyped`](../type-aliases/IWizardActionsTyped.md)\<`TSchema`, `StepId`\>

#### Returns

[`IWizardActionsTyped`](../type-aliases/IWizardActionsTyped.md)\<`TSchema`, `StepId`\>

### useWizardContext()

> **useWizardContext**: () => `any`

#### Returns

`any`

### useWizardError()

> **useWizardError**: \<`P`\>(`path`) => `string` \| `undefined`

#### Type Parameters

##### P

`P` *extends* `string`

#### Parameters

##### path

`P`

#### Returns

`string` \| `undefined`

### useWizardField()

> **useWizardField**: \<`P`\>(`path`, `options?`) => \[`PathValue`\<`TSchema`, `P`\>, (`value`) => `void`\]

#### Type Parameters

##### P

`P` *extends* `string`

#### Parameters

##### path

`P`

##### options?

\{ `isEqual?`: (`a`, `b`) => `boolean`; \} | (`a`, `b`) => `boolean`

#### Returns

\[`PathValue`\<`TSchema`, `P`\>, (`value`) => `void`\]

### useWizardSelector()

> **useWizardSelector**: \<`TSelected`\>(`selector`, `options?`) => `TSelected`

#### Type Parameters

##### TSelected

`TSelected`

#### Parameters

##### selector

(`state`) => `TSelected`

##### options?

\{ `isEqual?`: (`a`, `b`) => `boolean`; \} | (`a`, `b`) => `boolean`

#### Returns

`TSelected`

### useWizardShallowSelector()

> **useWizardShallowSelector**: \<`TSelected`\>(`selector`) => `TSelected`

#### Type Parameters

##### TSelected

`TSelected`

#### Parameters

##### selector

(`state`) => `TSelected`

#### Returns

`TSelected`

### useWizardState()

> **useWizardState**: () => [`IWizardState`](../interfaces/IWizardState.md)\<`TSchema`, `StepId`\>

#### Returns

[`IWizardState`](../interfaces/IWizardState.md)\<`TSchema`, `StepId`\>

### useWizardValue()

> **useWizardValue**: \<`P`\>(`path`, `options?`) => `PathValue`\<`TSchema`, `P`\>

#### Type Parameters

##### P

`P` *extends* `string`

#### Parameters

##### path

`P`

##### options?

\{ `isEqual?`: (`a`, `b`) => `boolean`; \} | (`a`, `b`) => `boolean`

#### Returns

`PathValue`\<`TSchema`, `P`\>

### WizardProvider()

> **WizardProvider**: (`__namedParameters`) => `Element`

#### Parameters

##### \_\_namedParameters

###### children

`ReactNode`

###### config

[`IWizardConfig`](../interfaces/IWizardConfig.md)\<`TSchema`, `StepId`\>

###### initialData?

`Partial`\<`TSchema`\>

###### initialStepId?

`StepId`

#### Returns

`Element`
