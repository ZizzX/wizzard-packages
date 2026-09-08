import {
  WizardProvider,
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
  useWizardSelector,
} from '@wizzard-packages/react/v1';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { onboarding } from './flow';
import { registry } from './registry';

/**
 * R-A on the React binding.
 *
 * The rendering knows the fields and nothing else. It never asks "is this a
 * business payer" to decide what comes next - it asks the engine which step is
 * current and draws that one. Adding a branch is an edit to `flow.ts`.
 *
 * Accessibility is by hand here, deliberately: the bindings supply no ARIA in
 * 1.0, so this file is what that contract will be written from. Visible labels,
 * one polite live region for validation and step changes, and focus moved to
 * the heading of the step the visitor just arrived at.
 */
export default function OnboardingApp(): ReactNode {
  return (
    <WizardProvider flow={onboarding} registry={registry} ctx={{ returning: false }}>
      <Onboarding />
    </WizardProvider>
  );
}

const LABELS: Record<string, string> = {
  details: 'Your details',
  verify: 'Verify your email',
  company: 'Company details',
  payment: 'Payment',
  review: 'Review',
};

function Onboarding(): ReactNode {
  const wizard = useWizard();
  const { current, active, isLast } = useStep();
  const { back, canBack, isBusy } = useNavigation();
  const errors = useErrors();

  const [email, setEmail] = useField<string>('details.email');
  const [payer, setPayer] = useField<string>('details.payer');
  const [code, setCode] = useField<string>('verify.code');
  const [company, setCompany] = useField<string>('company.name');
  const [vat, setVat] = useField<string>('company.vat');
  const [card, setCard] = useField<string>('payment.card');

  const returning = useWizardSelector((s) => s.ctx['returning'] === true);
  const completed = useWizardSelector((s) => s.completed);
  const dirty = useWizardSelector((s) => s.dirty);
  const data = useWizardSelector((s) => s.data);

  const [announcement, setAnnouncement] = useState('');
  const [ended, setEnded] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  // Before `start` has run - on the server, and for the first paint - there is
  // no current step, so the form draws the step the flow is about to enter and
  // says so, instead of a spinner over an empty box.
  const standing = current ?? active[0] ?? 'details';
  const starting = current === null;

  // Focus follows the flow, but only once the visitor has moved: taking focus on
  // the first paint would drag a reader who was still reading the page above.
  //
  // The step id is the only dependency, and the count is read off the engine
  // inside: `active` is rebuilt on every commit, so depending on it would make
  // a keystroke look like a step change and pull focus out of the field being
  // typed into.
  const moved = useRef(false);
  useEffect(() => {
    if (current === null) return;
    if (!moved.current) {
      moved.current = true;
      return;
    }
    heading.current?.focus();
    const { active: route } = wizard.getSnapshot();
    const at = route.indexOf(current) + 1;
    setAnnouncement(`${LABELS[current] ?? current}. Step ${at} of ${route.length}.`);
  }, [current, wizard]);

  async function onNext(): Promise<void> {
    if (ended) {
      setEnded(false);
      setAnnouncement('');
      // `reset` keeps `ctx` - it is the host's, not the run's - so the fast
      // path has to be put back by hand, or starting again silently takes it.
      wizard.setCtx({ returning: false });
      wizard.reset();
      await wizard.start();
      return;
    }
    const result = await wizard.next();
    if (result.ok) {
      if (result.to === '@end') {
        setEnded(true);
        setAnnouncement('Onboarding complete.');
      }
      return;
    }
    // A refusal is the one thing the live region must carry: the fields below
    // show it too, but a screen reader is not looking at them.
    const fields = Object.values(result.errors ?? {});
    setAnnouncement(
      fields.length === 0 ? `That move was refused: ${result.reason}.` : fields.join(' ')
    );
  }

  if (ended) {
    return (
      <div className="app">
        <h2 ref={heading} tabIndex={-1}>
          Done
        </h2>
        <p>The submission is what the flow collected, and nothing else.</p>
        <pre className="app-data">{JSON.stringify(submission(data, active), null, 2)}</pre>
        <div className="actions">
          <button
            className="button button-accent"
            type="button"
            onClick={() => {
              void onNext();
            }}
          >
            Start again
          </button>
        </div>
        <Live text={announcement} />
      </div>
    );
  }

  return (
    <form
      className="app"
      onSubmit={(event) => {
        event.preventDefault();
        void onNext();
      }}
    >
      <h2 ref={heading} tabIndex={-1}>
        {LABELS[standing] ?? standing}
      </h2>

      {standing === 'details' && (
        <>
          <Field
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            error={errors['email']}
          />
          <fieldset className="field">
            <legend className="field-label">Who is paying</legend>
            <div className="segmented">
              {(['personal', 'business'] as const).map((choice) => (
                <button
                  key={choice}
                  type="button"
                  aria-pressed={payer === choice}
                  onClick={() => {
                    setPayer(choice);
                  }}
                >
                  {choice === 'personal' ? 'Personal' : 'Business'}
                </button>
              ))}
            </div>
            {errors['payer'] !== undefined && <p className="field-error">{errors['payer']}</p>}
          </fieldset>
        </>
      )}

      {standing === 'verify' && (
        <>
          <Field
            id="code"
            label="Six-digit code"
            inputMode="numeric"
            autoComplete="one-time-code"
            hint="Any six digits will do here."
            value={code}
            onChange={setCode}
            error={errors['code']}
          />
          <label className="check">
            <input
              type="checkbox"
              checked={returning}
              onChange={(e) => {
                wizard.setCtx({ returning: e.target.checked });
              }}
            />
            I already have an account
          </label>
        </>
      )}

      {standing === 'company' && (
        <>
          <Field
            id="company-name"
            label="Company name"
            value={company}
            onChange={setCompany}
            error={errors['name']}
          />
          <Field id="vat" label="VAT number" value={vat} onChange={setVat} error={errors['vat']} />
        </>
      )}

      {standing === 'payment' && (
        <Field
          id="card"
          label="Card number"
          inputMode="numeric"
          autoComplete="cc-number"
          hint="Sixteen digits, spaces allowed."
          value={card}
          onChange={setCard}
          error={errors['card']}
        />
      )}

      {standing === 'review' && (
        <>
          <p>This is what the flow will submit.</p>
          <pre className="app-data">{JSON.stringify(submission(data, active), null, 2)}</pre>
        </>
      )}

      <div className="actions">
        <button className="button button-accent" type="submit" disabled={starting || isBusy}>
          {isLast ? 'Submit' : 'Next'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          disabled={starting || !canBack || isBusy}
          onClick={() => {
            void back();
          }}
        >
          Back
        </button>
      </div>

      <dl className="app-state">
        <dt>route</dt>
        <dd>{active.join(' → ')}</dd>
        <dt>completed</dt>
        <dd>{completed.length === 0 ? 'none' : completed.join(', ')}</dd>
        <dt>edited</dt>
        <dd>{dirty.length === 0 ? 'none' : dirty.join(', ')}</dd>
      </dl>

      <Live text={starting ? 'Starting.' : announcement} />
    </form>
  );
}

/**
 * What the flow submits: the slices of the steps that are on the route.
 *
 * A branch the visitor walked away from keeps its answers - the engine clears
 * nothing when a `when` goes false, so going back to it finds them still there -
 * and it is the application that decides those answers are not part of this
 * submission. `verify` is missing for the other reason: `clearOnLeave` dropped
 * it the moment the step was left.
 */
function submission(
  data: Readonly<Record<string, unknown>>,
  active: readonly string[]
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const id of active) {
    if (data[id] !== undefined) out[id] = data[id];
  }
  return out;
}

/**
 * A labelled text field.
 *
 * The label is a `for`/`id` pair rather than a wrapper, and the hint and the
 * error are named by `aria-describedby`: that keeps the accessible name of the
 * input to the label alone, while a screen reader still reads the refusal with
 * the field it belongs to. Wrapping all four in one `<label>` would fold the
 * error message into the name, and the field would announce itself differently
 * before and after a refusal.
 */
function Field(props: {
  id: string;
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  type?: string;
  inputMode?: 'numeric';
  autoComplete?: string;
  hint?: string;
  error?: string | undefined;
}): ReactNode {
  const described = [
    props.hint === undefined ? null : `${props.id}-hint`,
    props.error === undefined ? null : `${props.id}-error`,
  ].filter((id): id is string => id !== null);

  return (
    <div className="field">
      <label className="field-label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type ?? 'text'}
        inputMode={props.inputMode}
        autoComplete={props.autoComplete}
        value={props.value ?? ''}
        aria-invalid={props.error === undefined ? undefined : true}
        aria-describedby={described.length === 0 ? undefined : described.join(' ')}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
      {props.hint !== undefined && (
        <span className="field-hint" id={`${props.id}-hint`}>
          {props.hint}
        </span>
      )}
      {props.error !== undefined && (
        <span className="field-error" id={`${props.id}-error`}>
          {props.error}
        </span>
      )}
    </div>
  );
}

/** One polite region for the whole application, so two announcements queue. */
function Live(props: { text: string }): ReactNode {
  return (
    <p className="app-live" role="status" aria-live="polite">
      {props.text}
    </p>
  );
}
