[**wizzard-stepper-react**](../README.md)

---

[wizzard-stepper-react](../README.md) / useWizardValue

# Function: useWizardValue()

> **useWizardValue**\<`TValue`\>(`path`, `options?`): `TValue`

Defined in: [context/WizardContext.tsx:678](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/context/WizardContext.tsx#L678)

Subscribes to a specific data value by its path.
Uses `useSyncExternalStore` for atomic updates and high performance.

## Type Parameters

### TValue

`TValue` = `any`

## Parameters

### path

`string`

Dot-notation path to the value

### options?

optional equality checker for selection

#### isEqual?

(`a`, `b`) => `boolean`

## Returns

`TValue`
