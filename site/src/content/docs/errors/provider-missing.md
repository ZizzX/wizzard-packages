---
title: provider-missing
description: useWizard, or a hook built on it, was called in a component with no wizard provided above it.
---

```
[wizzard] useWizard was called outside a WizardProvider. It reads the wizard from context, and no
ancestor component provides one. Render this component inside <WizardProvider>.
…/errors/provider-missing
[wizzard] useWizard was called outside provideWizard. It injects the wizard, and no ancestor
component provided one. Call provideWizard in the setup of an ancestor component.
…/errors/provider-missing
```

Thrown as a `WizardError` with `op: 'useWizard'`, the first form by `@wizzard-packages/react/v1`
and the second by `@wizzard-packages/vue/v1`. Every hook that reads the wizard goes through
`useWizard` - `useStep`, `useNavigation`, `useField`, `useErrors`, `useWizardSelector`,
`useWizardSnapshot` - so any of them can be where it surfaces.

The wizard is handed down the component tree, so a component can only read it if an ancestor put
it there. In React that is `<WizardProvider>`:

```tsx
<WizardProvider flow={signup} registry={registry}>
  <SignupForm />
</WizardProvider>
```

In Vue it is `provideWizard`, called in the `setup` of a component above the one using the hooks:

```ts
const Signup = defineComponent({
  setup() {
    provideWizard({ flow: signup, registry });
    return () => h(SignupForm);
  },
});
```

The usual cause is placement rather than a missing provider: a component rendered beside the form
rather than inside it, in a layout, a portal or a modal mounted at the root, or a Vue
`provideWizard` called in the same component that calls `useWizard`, where `inject` cannot see
it. A component that should work with or without a wizard - a diagnostic panel, say - can use
`useOptionalWizard`, which returns `null` instead of throwing.
