[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / createWizardFactory

# Function: createWizardFactory()

> **createWizardFactory**\<`TSchema`, `StepId`\>(): `object`

Defined in: [factory.tsx:23](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/factory.tsx#L23)

createWizardFactory

Creates a strongly-typed set of Wizard components and hooks for a specific data schema.
This ensures full type safety across your entire wizard implementation without manual casting.

## Type Parameters

### TSchema

`TSchema` _extends_ `Record`\<`string`, `any`\>

The shape of your wizard's global data state

### StepId

`StepId` _extends_ `string` = `string`

## Returns

### createStep()

> **createStep**: \<`TSchema`, `TStepId`\>(`config`) => [`IStepConfig`](../interfaces/IStepConfig.md)\<`TSchema`, `TStepId`\>

Helper to create a typed step configuration.
Useful when defining steps outside of the main factory call.

Helper to create a typed step configuration.
By using this helper, TypeScript can infer TStepData from the validationAdapter or other properties.

#### Type Parameters

##### TSchema

`TSchema` _extends_ `Record`\<`string`, `any`\>

##### TStepId

`TStepId` _extends_ `string` = `string`

#### Parameters

##### config

[`IStepConfig`](../interfaces/IStepConfig.md)\<`TSchema`, `TStepId`\>

#### Returns

[`IStepConfig`](../interfaces/IStepConfig.md)\<`TSchema`, `TStepId`\>

### useBreadcrumbs()

> **useBreadcrumbs**: () => [`IBreadcrumb`](../interfaces/IBreadcrumb.md)\<`StepId`\>[]

Returns the current list of breadcrumbs for navigation.

Typed useBreadcrumbs

#### Returns

[`IBreadcrumb`](../interfaces/IBreadcrumb.md)\<`StepId`\>[]

### useWizard()

> **useWizard**: () => [`IWizardContext`](../interfaces/IWizardContext.md)\<`TSchema`, `StepId`\>

Primary hook to access both state and actions.
Note: Accessing data through this hook will trigger re-renders on ANY data change.
For better performance, use `useWizardValue` or `useWizardSelector`.

Typed useWizard
Returns the full context with TSchema typed data and methods

#### Returns

[`IWizardContext`](../interfaces/IWizardContext.md)\<`TSchema`, `StepId`\>

### useWizardActions()

> **useWizardActions**: () => [`IWizardActions`](../interfaces/IWizardActions.md)\<`StepId`\>

Actions hook returns stable functions to control the wizard (navigating, updating data).
This hook NEVER causes re-renders.

Typed useWizardActions
No generic needed for actions usually, but we wrap it for consistency

#### Returns

[`IWizardActions`](../interfaces/IWizardActions.md)\<`StepId`\>

### useWizardContext()

> **useWizardContext**: () => [`IWizardContext`](../interfaces/IWizardContext.md)\<`TSchema`, `StepId`\>

Alias for `useWizard` that emphasizes context usage.

Typed useWizardContext
similar to useWizard but explicit about strict context usage

#### Returns

[`IWizardContext`](../interfaces/IWizardContext.md)\<`TSchema`, `StepId`\>

### useWizardError()

> **useWizardError**: \<`P`\>(`path`) => `string` \| `undefined`

Atomic hook to subscribe to validation errors for a specific field.

Typed useWizardError

#### Type Parameters

##### P

`P` _extends_ `string`

#### Parameters

##### path

`P`

Dot-notation path to check for errors

#### Returns

`string` \| `undefined`

#### Param

Dot-notation path to the field

### useWizardSelector()

> **useWizardSelector**: \<`TSelected`\>(`selector`, `options?`) => `TSelected`

Powerful hook to select exactly what you need from the wizard context.
Accepts a selector function and an optional equality checker.

Typed useWizardSelector

#### Type Parameters

##### TSelected

`TSelected`

#### Parameters

##### selector

(`state`) => `TSelected`

Function to select a slice of state

##### options?

###### isEqual?

(`a`, `b`) => `boolean`

#### Returns

`TSelected`

#### Param

Function to select data

#### Example

```ts
const isCompleted = useWizardSelector((s) => s.completedSteps.size === 5);
```

### useWizardState()

> **useWizardState**: () => [`IWizardState`](../interfaces/IWizardState.md)\<`TSchema`, `StepId`\>

Provides access to the full internal state object.
Use with caution as it will trigger re-renders on any state update.

Typed useWizardState
Access to raw internal state if needed (advanced)

#### Returns

[`IWizardState`](../interfaces/IWizardState.md)\<`TSchema`, `StepId`\>

### useWizardValue()

> **useWizardValue**: \<`P`\>(`path`, `options?`) => [`PathValue`](../type-aliases/PathValue.md)\<`TSchema`, `P`\>

Atomic hook to subscribe to a single field value by its path.
Component will ONLY re-render when the specific path value changes.

Typed useWizardValue

#### Type Parameters

##### P

`P` _extends_ `string`

#### Parameters

##### path

`P`

Dot-notation path to the value

##### options?

###### isEqual?

(`a`, `b`) => `boolean`

#### Returns

[`PathValue`](../type-aliases/PathValue.md)\<`TSchema`, `P`\>

#### Param

Dot-notation path to the value

#### Example

```ts
const email = useWizardValue('user.email');
```

### WizardProvider()

> **WizardProvider**: (`__namedParameters`) => `Element`

Context provider that must wrap any component using wizard hooks.

Typed Provider

#### Parameters

##### \_\_namedParameters

###### children

`ReactNode`

###### config

[`IWizardConfig`](../interfaces/IWizardConfig.md)\<`TSchema`, `StepId`\>

###### initialData?

`Partial`\<`TSchema`\>

#### Returns

`Element`

#### Example

```tsx
<WizardProvider config={myConfig}>
  <MyWizardContent />
</WizardProvider>
```
