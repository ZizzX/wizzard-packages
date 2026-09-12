import {
  WizardProvider,
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
} from '@wizzard-packages/react/v1';

import { checkout } from './flow';
import { registry } from './registry';

export function App() {
  return (
    <WizardProvider flow={checkout} registry={registry}>
      <Wizard />
    </WizardProvider>
  );
}

/**
 * One field and its message, kept together so the two cannot drift apart: the
 * input points at the message with `aria-describedby`, and says it is wrong
 * with `aria-invalid`, which is what a screen reader reads out.
 */
function Field(props: {
  id: string;
  label: string;
  value: string | undefined;
  error: string | undefined;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  const describedBy = props.error === undefined ? undefined : `${props.id}-error`;

  return (
    <p>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        value={props.value ?? ''}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled}
        aria-invalid={props.error !== undefined}
        aria-describedby={describedBy}
      />
      {props.error !== undefined && (
        <span id={describedBy} role="alert">
          {props.error}
        </span>
      )}
    </p>
  );
}

export function Wizard() {
  const wizard = useWizard();
  const { current } = useStep();
  const { next, isBusy } = useNavigation();
  const [email, setEmail] = useField<string>('details.email');
  const [card, setCard] = useField<string>('details.card');
  const errors = useErrors();

  const step = current ?? 'details';
  const starting = current === null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void next();
      }}
    >
      {step === 'details' && (
        <>
          <Field
            id="email"
            label="Your email"
            value={email}
            error={errors['email']}
            disabled={starting}
            onChange={setEmail}
          />
          <Field
            id="card"
            label="Card number"
            value={card}
            error={errors['card']}
            disabled={starting}
            onChange={setCard}
          />
          {/* A message the engine could not have produced: the card was well
              formed and the payment service still said no. It goes in the same
              place, so the rendering needs no second path for it. */}
          <button
            type="button"
            onClick={() => wizard.setErrors('details', { card: 'That card was declined.' })}
            disabled={starting}
          >
            Pretend the server refused
          </button>
        </>
      )}
      {step === 'done' && <p>Both fields were fine.</p>}

      <button type="submit" disabled={starting || isBusy || step === 'done'}>
        Next
      </button>
    </form>
  );
}
