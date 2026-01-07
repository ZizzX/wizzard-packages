[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / WizardStepRendererProps

# Interface: WizardStepRendererProps

Defined in: [components/WizardStepRenderer.tsx:4](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/components/WizardStepRenderer.tsx#L4)

## Properties

### fallback?

> `optional` **fallback**: `ReactNode`

Defined in: [components/WizardStepRenderer.tsx:13](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/components/WizardStepRenderer.tsx#L13)

Optional fallback to show while lazy-loading a step component.

***

### wrapper?

> `optional` **wrapper**: `ComponentType`\<\{ `children`: `ReactNode`; `key`: `string`; \}\>

Defined in: [components/WizardStepRenderer.tsx:9](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/components/WizardStepRenderer.tsx#L9)

Optional wrapper component for each step.
Useful for adding animations (e.g., Framer Motion).
