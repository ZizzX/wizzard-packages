import { WizardProvider, useField, useNavigation, useStep } from '@wizzard-packages/react/v1';

import { signup } from './flow';

export function App() {
  return (
    <WizardProvider flow={signup}>
      <Wizard />
    </WizardProvider>
  );
}

function Wizard() {
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
