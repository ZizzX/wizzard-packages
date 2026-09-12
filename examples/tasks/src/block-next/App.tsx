import {
  WizardProvider,
  useErrors,
  useField,
  useNavigation,
  useStep,
} from '@wizzard-packages/react/v1';

import { signup } from './flow';
import { registry } from './registry';

export function App() {
  return (
    <WizardProvider flow={signup} registry={registry}>
      <Wizard />
    </WizardProvider>
  );
}

export function Wizard() {
  const { current } = useStep();
  const { next, isBusy } = useNavigation();
  const [email, setEmail] = useField<string>('details.email');
  const errors = useErrors();

  // Nothing is current until the engine starts, which happens in the browser.
  const step = current ?? 'details';
  const starting = current === null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // The refusal is the return value, not an exception: `next()` resolves
        // to `{ ok: false, reason: 'invalid', errors }` and the flow stays put.
        void next();
      }}
    >
      {step === 'details' && (
        <>
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            value={email ?? ''}
            onChange={(e) => setEmail(e.target.value)}
            disabled={starting}
            aria-invalid={errors['email'] !== undefined}
            aria-describedby={errors['email'] === undefined ? undefined : 'email-error'}
          />
          {errors['email'] !== undefined && (
            <p id="email-error" role="alert">
              {errors['email']}
            </p>
          )}
        </>
      )}
      {step === 'done' && <p>That address will do.</p>}

      <button type="submit" disabled={starting || isBusy || step === 'done'}>
        Next
      </button>
    </form>
  );
}
