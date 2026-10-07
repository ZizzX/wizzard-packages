# @wizzard-packages/react

![npm](https://img.shields.io/npm/v/@wizzard-packages/react)
![license](https://img.shields.io/npm/l/@wizzard-packages/react)

The React binding for [`@wizzard-packages/core`](https://www.npmjs.com/package/@wizzard-packages/core).
It bridges the engine into React and does nothing else: navigation, guards and validation are
the engine's, so this package is a provider and eight hooks.

## Install

<!-- example:install-react -->

<!-- prettier-ignore -->
```bash
pnpm add @wizzard-packages/core@canary @wizzard-packages/react@canary
```

<!-- /example -->

## Use

`WizardProvider` takes a `flow` and owns the wizard it builds, or a `wizard` you built with
`createWizard`. The hooks read it: `useStep`, `useNavigation`, `useField`, `useErrors`,
`useWizardSelector`, `useWizardSnapshot`, `useWizard` and `useOptionalWizard`.

<!-- example:quickstart-react -->

<!-- prettier-ignore -->
```tsx
import { WizardProvider, useField, useNavigation, useStep } from '@wizzard-packages/react';

import { signup } from './flow';

export function App() {
  return (
    <WizardProvider flow={signup}>
      <Wizard />
    </WizardProvider>
  );
}

export function Wizard() {
  const { current, isLast } = useStep();
  const { next, back, canBack } = useNavigation();
  const [full, setFull] = useField<string>('name.full');

  // Nothing is current until the engine starts, which happens in the browser:
  // on the server, and for the first paint, `current` is null. So the form
  // draws the step it is about to enter and keeps every control out of reach
  // until the engine can act on it - the field included, because anything typed
  // before the engine exists is not in its state and the first commit would
  // wipe it.
  const step = current ?? 'name';
  const starting = current === null;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {step === 'name' && (
        <label>
          Your name
          <input value={full ?? ''} onChange={(e) => setFull(e.target.value)} disabled={starting} />
        </label>
      )}
      {step === 'review' && <p>Hello, {full || 'stranger'}.</p>}

      <button type="button" onClick={() => back()} disabled={starting || !canBack}>
        Back
      </button>
      <button type="button" onClick={() => next()} disabled={starting || isLast}>
        Next
      </button>
    </form>
  );
}
```

<!-- /example -->

The binding is a client module: its build opens with `'use client'`, which only a React Server
Components bundler reads. There a server component can render `WizardProvider` with a `flow`;
a `registry`, `plugins` or a built `wizard` carry functions, so build those in a client
component.

## Supported

React 18+, Node 20.11+, TypeScript 5+. ESM and CJS, types for both. `react` and `react-dom` are
peer dependencies. `@wizzard-packages/core` is a dependency, installed beside it above so your
own code can import the engine.

## Documentation

[Getting started](https://zizzx.github.io/wizzard-packages/docs/start/) ·
[Hooks](https://zizzx.github.io/wizzard-packages/docs/hooks/) ·
[Navigation](https://zizzx.github.io/wizzard-packages/docs/navigation/) ·
[Validation](https://zizzx.github.io/wizzard-packages/docs/validation/) ·
[Persistence](https://zizzx.github.io/wizzard-packages/docs/persistence/)

The same hooks for Vue are in [`@wizzard-packages/vue`](https://www.npmjs.com/package/@wizzard-packages/vue).
Coming from 0.x: [the migration guide](https://github.com/ZizzX/wizzard-packages/blob/main/docs/MIGRATION.md).

## License

MIT
