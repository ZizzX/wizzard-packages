import {
  WizardProvider,
  useField,
  useNavigation,
  useStep,
  useWizardSelector,
} from '@wizzard-packages/react/v1';

import { checkout } from './flow';

export function App() {
  return (
    <WizardProvider flow={checkout}>
      <Wizard />
    </WizardProvider>
  );
}

export function Wizard() {
  const { current, isLast } = useStep();
  const { next, back, canBack } = useNavigation();
  const [payer, setPayer] = useField<string>('plan.payer');
  const [company, setCompany] = useField<string>('company.name');
  const [code, setCode] = useField<string>('coupon.code');

  // What would be submitted, read straight off the engine rather than tracked
  // here: this is the whole point of the page, so it should not be a copy.
  const data = useWizardSelector((s) => JSON.stringify(s.data, null, 2));

  const step = current ?? 'plan';
  const starting = current === null;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {step === 'plan' && (
        <fieldset disabled={starting}>
          <legend>Who is paying</legend>
          {(['personal', 'business'] as const).map((choice) => (
            <label key={choice}>
              <input
                type="radio"
                name="payer"
                value={choice}
                checked={payer === choice}
                onChange={() => setPayer(choice)}
              />
              {choice === 'personal' ? 'Personal' : 'Business'}
            </label>
          ))}
        </fieldset>
      )}

      {step === 'company' && (
        <label>
          Company name
          <input
            value={company ?? ''}
            onChange={(e) => setCompany(e.target.value)}
            disabled={starting}
          />
        </label>
      )}

      {step === 'coupon' && (
        <label>
          Coupon code
          <input value={code ?? ''} onChange={(e) => setCode(e.target.value)} disabled={starting} />
        </label>
      )}

      {step === 'review' && (
        <>
          <p>This is what would be submitted:</p>
          <pre>{data}</pre>
        </>
      )}

      <button type="button" onClick={() => back()} disabled={starting || !canBack}>
        Back
      </button>
      <button type="button" onClick={() => next()} disabled={starting || isLast}>
        Next
      </button>
    </form>
  );
}
