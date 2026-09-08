# @wizzard-packages/react

![npm](https://img.shields.io/npm/v/@wizzard-packages/react)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/react)
![license](https://img.shields.io/npm/l/@wizzard-packages/react)

The React binding for [`@wizzard-packages/core`](https://www.npmjs.com/package/@wizzard-packages/core).
It bridges the engine into React and does nothing else: navigation, guards and validation are
the engine's, so this package is a provider and six hooks. That is why it is 1.04 kB gzipped
against 8.48 kB for its 0.x equivalent — nothing was optimised, the logic moved.

## Install

```bash
pnpm add @wizzard-packages/core@canary @wizzard-packages/react@canary
```

React 18 or newer. The provider subscribes through `useSyncExternalStore`, so concurrent
rendering and StrictMode's double mount are handled by the store rather than by an effect.

## Use

Wrap the wizard, then read it. `WizardProvider` takes either a `wizard` you built with
`createWizard` or the options to build one — passing `flow` alone is the common case, and the
provider owns and destroys that instance.

<!-- example:quickstart-react -->

<!-- prettier-ignore -->
```tsx
import { WizardProvider, useField, useNavigation, useStep } from '@wizzard-packages/react/v1';

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

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {current === 'name' && (
        <label>
          Your name
          <input value={full ?? ''} onChange={(e) => setFull(e.target.value)} />
        </label>
      )}
      {current === 'review' && <p>Hello, {full || 'stranger'}.</p>}

      <button type="button" onClick={() => back()} disabled={!canBack}>
        Back
      </button>
      <button type="button" onClick={() => next()} disabled={isLast}>
        Next
      </button>
    </form>
  );
}
```

<!-- /example -->

That file and the flow it imports are `examples/quickstart`, which CI runs — this block is
generated from them, so what you paste is what is tested.

## Hooks

| Hook                    | Returns                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `useStep()`             | `current`, `isFirst`, `isLast`, `progress` and the rest of the step's derived state |
| `useNavigation()`       | `next`, `back`, `go`, `canBack`, `canNext`, `isNavigating`                          |
| `useField<T>(path)`     | `[value, setValue]`, addressing the same paths the flow does                        |
| `useErrors(stepId?)`    | the error map for a step, or for the current one                                    |
| `useWizardSelector(fn)` | one derived value, re-rendering only when it changes                                |
| `useWizard()`           | the engine itself, for anything the hooks above do not cover                        |

`useOptionalWizard()` returns `null` outside a provider instead of throwing, which is what a
component rendered both inside and outside a wizard needs.

Navigation is async and returns a result, not a boolean: `await next()` gives
`{ ok: false, reason: 'blocked', by: 'age-check' }` when a guard refuses. Every `await` inside
the engine re-checks a navigation epoch, so a validator that resolves after the user pressed
Back cannot move them.

## Documentation

[Getting started](https://zizzx.github.io/wizzard-packages/docs/start/) ·
[The flow](https://zizzx.github.io/wizzard-packages/docs/flow/) ·
[Navigation](https://zizzx.github.io/wizzard-packages/docs/navigation/) ·
[Validation](https://zizzx.github.io/wizzard-packages/docs/validation/) ·
[Persistence](https://zizzx.github.io/wizzard-packages/docs/persistence/)

The same hooks, under the same names, are in
[`@wizzard-packages/vue`](https://www.npmjs.com/package/@wizzard-packages/vue). A shared
contract suite runs against both, which is what stops them drifting apart.

## Upgrading from 0.x

0.x was a different library with the same name: `createWizardFactory`, a store per wizard, and
the branching in your components. Both lines export a `WizardProvider` with different props,
so check the import path — v1 is `@wizzard-packages/react/v1`. v1 is on the `canary` tag while
the launch lands; the 0.x line on `latest` is being retired.

## License

MIT
