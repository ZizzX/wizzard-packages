---
title: provider-wizard-and-options
description: WizardProvider was given a built wizard and also options it would have ignored.
---

```
[wizzard] WizardProvider was given a wizard and also flow, data. The wizard was already built with
its own options, so these would be ignored. Pass the options to createWizard and only wizard to
the provider, or drop wizard and let the provider build one.
…/errors/provider-wizard-and-options
```

Thrown as a `WizardError` with `op: 'WizardProvider'` by `@wizzard-packages/react/v1`, on any
render where both are set, in development and production builds alike. The message lists every
option that was passed with a value; a prop set to `undefined` does not count.

`WizardProvider` gets its wizard one of two ways. Given `wizard`, it uses that engine as it is, and
that engine was configured when `createWizard` built it. Given options instead - `flow`,
`registry`, `data` and the rest - it builds and owns one. Both at once has no meaning: the options
could not reach an engine that already exists, and before this check they were dropped without a
word, so a `data` prop that seemed to seed the form did nothing.

Pick one. Either move the options into `createWizard`:

```tsx
const wizard = createWizard({ flow: signup, registry, data: { plan: 'pro' } });

<WizardProvider wizard={wizard}>
  <SignupForm />
</WizardProvider>;
```

or drop `wizard` and let the provider build the engine:

```tsx
<WizardProvider flow={signup} registry={registry} data={{ plan: 'pro' }}>
  <SignupForm />
</WizardProvider>
```

The Vue binding has no form of this mistake: `provideWizard` takes a single argument, a wizard or
the options, never both.
