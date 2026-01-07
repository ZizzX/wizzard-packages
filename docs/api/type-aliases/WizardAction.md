[**wizzard-stepper-react**](../README.md)

***

[wizzard-stepper-react](../README.md) / WizardAction

# Type Alias: WizardAction\<T, StepId\>

> **WizardAction**\<`T`, `StepId`\> = \{ `payload`: \{ `config`: [`IWizardConfig`](../interfaces/IWizardConfig.md)\<`T`, `StepId`\>; `data`: `T`; \}; `type`: `"INIT"`; \} \| \{ `payload`: \{ `options?`: `any`; `path`: `string`; `value`: `any`; \}; `type`: `"SET_DATA"`; \} \| \{ `payload`: \{ `data`: `Partial`\<`T`\>; `options?`: `any`; \}; `type`: `"UPDATE_DATA"`; \} \| \{ `payload`: \{ `from`: `StepId` \| `null`; `to`: `StepId`; \}; `type`: `"GO_TO_STEP"`; \} \| \{ `payload`: \{ `stepId`: `StepId`; \}; `type`: `"VALIDATE_START"`; \} \| \{ `payload`: \{ `result`: [`ValidationResult`](ValidationResult.md); `stepId`: `StepId`; \}; `type`: `"VALIDATE_END"`; \} \| \{ `payload`: \{ `errors`: `Record`\<`string`, `string`\> \| `undefined` \| `null`; `stepId`: `StepId`; \}; `type`: `"SET_STEP_ERRORS"`; \} \| \{ `payload`: \{ `data`: `T`; \}; `type`: `"RESET"`; \} \| \{ `payload`: \{ `meta`: `Partial`\<[`IWizardState`](../interfaces/IWizardState.md)\<`T`, `StepId`\>\>; \}; `type`: `"UPDATE_META"`; \} \| \{ `payload`: \{ `stepId`: `StepId` \| `""`; \}; `type`: `"SET_CURRENT_STEP_ID"`; \} \| \{ `payload`: \{ `history`: `StepId`[]; \}; `type`: `"SET_HISTORY"`; \} \| \{ `payload`: \{ `steps`: [`IStepConfig`](../interfaces/IStepConfig.md)\<`T`, `StepId`\>[]; \}; `type`: `"SET_ACTIVE_STEPS"`; \} \| \{ `payload`: \{ `steps`: `Set`\<`StepId`\>; \}; `type`: `"SET_VISITED_STEPS"`; \} \| \{ `payload`: \{ `steps`: `Set`\<`StepId`\>; \}; `type`: `"SET_COMPLETED_STEPS"`; \} \| \{ `payload`: \{ `steps`: `Set`\<`StepId`\>; \}; `type`: `"SET_ERROR_STEPS"`; \} \| \{ `payload`: \{ `snapshot`: `any`; \}; `type`: `"RESTORE_SNAPSHOT"`; \}

Defined in: [types.ts:383](https://github.com/ZizzX/wizzard-stepper-react/blob/3737e6f397efcf35b1868087f7c6e769d30b689f/src/types.ts#L383)

Middleware Action Types

## Type Parameters

### T

`T` = `any`

### StepId

`StepId` *extends* `string` = `string`
