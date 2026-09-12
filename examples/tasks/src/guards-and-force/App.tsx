import {
  WizardProvider,
  useField,
  useNavigation,
  useStep,
  useWizard,
} from '@wizzard-packages/react/v1';
import { useId, useState } from 'react';

import { signup } from './flow';

export function App() {
  return (
    <WizardProvider flow={signup}>
      <Wizard />
    </WizardProvider>
  );
}

/** The last answer navigation gave, kept in the words it gave it. */
type Outcome = { ok: true } | { ok: false; reason: string; by?: string } | null;

const describe = (outcome: Outcome): string => {
  if (outcome === null) return 'Nothing tried yet.';
  if (outcome.ok) return 'Moved to Done.';
  return outcome.by === undefined
    ? `Refused: ${outcome.reason}.`
    : `Refused: ${outcome.reason}, by ${outcome.by}.`;
};

export function Wizard() {
  const wizard = useWizard();
  const { current } = useStep();
  const { isBusy } = useNavigation();
  const [choice, setChoice] = useField<string>('plan.choice');
  const [outcome, setOutcome] = useState<Outcome>(null);

  // Generated, because both renderings of this example sit in the page at once.
  const choiceId = useId();

  const step = current ?? 'plan';
  const starting = current === null;

  const jump = (force: boolean) => {
    void wizard.go('done', { force }).then((result) => {
      setOutcome(result.ok ? { ok: true } : { ok: false, reason: result.reason, by: result.by });
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <p>
        <label htmlFor={choiceId}>Your plan</label>
        <input
          id={choiceId}
          value={choice ?? ''}
          onChange={(e) => setChoice(e.target.value)}
          disabled={starting}
          placeholder="leave it empty to see the guard refuse"
        />
      </p>

      {/* Two buttons, one difference: the second passes `force`. Neither of
          them can get past the guard on `done`. */}
      <button type="button" onClick={() => jump(false)} disabled={starting || isBusy}>
        Jump to Done
      </button>
      <button type="button" onClick={() => jump(true)} disabled={starting || isBusy}>
        Jump with force
      </button>

      <p role="status">{describe(outcome)}</p>
      <p>Current step: {step}</p>
    </form>
  );
}
