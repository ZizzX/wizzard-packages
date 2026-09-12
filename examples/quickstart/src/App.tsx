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

  // Nothing is current until the engine starts, which happens in the browser:
  // on the server, and for the first paint, `current` is null. So the form
  // draws the step it is about to enter and keeps the buttons out of reach
  // until the engine can act on them.
  const step = current ?? 'name';
  const starting = current === null;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {step === 'name' && (
        <label>
          Your name
          <input value={full ?? ''} onChange={(e) => setFull(e.target.value)} />
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
