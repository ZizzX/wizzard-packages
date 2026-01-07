[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / WizardProvider

# Function: WizardProvider()

> **WizardProvider**\<`T`, `StepId`\>(`__namedParameters`): `Element`

Defined in: [context/WizardContext.tsx:59](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/context/WizardContext.tsx#L59)

Component that provides the wizard context to its children.
Manages the core lifecycle, persistence, and state synchronization.

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `any`\>

### StepId

`StepId` *extends* `string` = `string`

## Parameters

### \_\_namedParameters

[`WizardProviderProps`](../interfaces/WizardProviderProps.md)\<`T`, `StepId`\>

## Returns

`Element`

## Example

```tsx
const config = { steps: [...] };

function App() {
  return (
    <WizardProvider config={config}>
      <MyWizard />
    </WizardProvider>
  );
}
```
