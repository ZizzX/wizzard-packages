import {
  WizardProvider,
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
  useWizardSelector,
} from '@wizzard-packages/react/v1';
import { persist, type RestoreOutcome } from '@wizzard-packages/plugins/persist';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { APP_VERSION, LAST_STEP, STORAGE_KEY, reload } from './flow';
import { describeRestore, simulateUpgrade } from './outcome';
import { TAKEN, registry } from './registry';

/**
 * R-B on the React binding: a form that survives a reload, and a check that a
 * reload in the middle of must not corrupt.
 *
 * Two things here are not obvious and are the reason the file is worth reading.
 *
 * The plugin is installed in the browser only, and what it restored is not
 * shown until after mount. A restored session is by definition different from
 * the empty first step the server rendered, so a client that painted it
 * immediately would be correcting the server's markup - the mismatch React
 * warns about. The first client paint is therefore the server's frame, and the
 * session appears one tick later, which is also when the outcome can be told.
 *
 * `busy` is read off the engine, never tracked here. It is true from the moment
 * `next()` starts until the validator answers, which is what disables the
 * button and what "Checking" is spelled from.
 */
export default function ReloadApp(): ReactNode {
  // Whatever the plugin decided, kept out of React's state until it is safe to
  // read: `init` runs while the engine is being created, which is during a
  // render, and setting state there is not allowed.
  const restored = useRef<RestoreOutcome | null>(null);

  const plugins = useMemo(
    () =>
      typeof window === 'undefined'
        ? []
        : [
            persist({
              key: STORAGE_KEY,
              version: APP_VERSION,
              onRestore: (outcome) => {
                restored.current = outcome;
              },
            }),
          ],
    []
  );

  return (
    <WizardProvider flow={reload} registry={registry} plugins={plugins}>
      <Reload restored={restored} />
    </WizardProvider>
  );
}

const LABELS: Record<string, string> = {
  account: 'Your account',
  workspace: 'Name your workspace',
  confirm: 'Confirm',
};

function Reload(props: { restored: { current: RestoreOutcome | null } }): ReactNode {
  const wizard = useWizard();
  const { current, active, isLast } = useStep();
  const { back, canBack, isBusy } = useNavigation();
  const errors = useErrors();

  const [email, setEmail] = useField<string>('account.email');
  const [name, setName] = useField<string>('workspace.name');
  const status = useWizardSelector((s) => s.status);

  // Whether the run is finished is read off the engine, not remembered here:
  // `toSnapshot` does not carry `status`, so a wizard that reached the end and
  // was reloaded comes back `idle`, and a flag in this component would come
  // back `false` and send the visitor round the last step again. `completed`
  // is in the snapshot, and the last step is in it only once the flow ended.
  const ended = useWizardSelector((s) => s.completed.includes(LAST_STEP));

  const [mounted, setMounted] = useState(false);
  const [outcome, setOutcome] = useState<RestoreOutcome | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setMounted(true);
    setOutcome(props.restored.current);
  }, [props.restored]);

  const moved = useRef(false);
  useEffect(() => {
    if (current === null || !mounted) return;
    if (!moved.current) {
      moved.current = true;
      return;
    }
    heading.current?.focus();
    const { active: route } = wizard.getSnapshot();
    const at = route.indexOf(current) + 1;
    setAnnouncement(`${LABELS[current] ?? current}. Step ${at} of ${route.length}.`);
  }, [current, mounted, wizard]);

  // Until the first effect has run, this is the frame the server sent: the step
  // the flow is about to enter, with the controls saying they are not ready.
  const standing = mounted ? (current ?? active[0] ?? 'account') : 'account';
  const starting = !mounted || current === null;

  async function onNext(): Promise<void> {
    if (ended) {
      setAnnouncement('');
      wizard.reset();
      await wizard.start();
      return;
    }
    const result = await wizard.next();
    if (result.ok) {
      if (result.to === '@end') setAnnouncement('Finished.');
      return;
    }
    if (result.reason === 'superseded' || result.reason === 'aborted') return;
    const fields = Object.values(result.errors ?? {});
    setAnnouncement(
      fields.length === 0 ? `That move was refused: ${result.reason}.` : fields.join(' ')
    );
  }

  /**
   * Back while a check is in flight. `cancel()` aborts the navigation, so the
   * answer that arrives later belongs to an epoch that has passed and is
   * discarded; the move backwards is a new one and wins.
   */
  async function onBack(): Promise<void> {
    wizard.cancel();
    await back();
  }

  return (
    <div className="app">
      <p className="app-restore" role="status" aria-live="polite">
        {describeRestore(mounted ? outcome : null)}
      </p>

      {mounted && ended ? (
        <>
          <h2 ref={heading} tabIndex={-1}>
            Done
          </h2>
          <p>
            The session is still saved: reload and you come back to this. Start again replaces it
            with an empty one, because that is a commit like any other.
          </p>
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
        </>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void onNext();
          }}
        >
          <h2 ref={heading} tabIndex={-1}>
            {LABELS[standing] ?? standing}
          </h2>

          {standing === 'account' && (
            <Field
              id="reload-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={mounted ? email : ''}
              onChange={setEmail}
              error={errors['email']}
            />
          )}

          {standing === 'workspace' && (
            <Field
              id="reload-name"
              label="Workspace name"
              hint={`Checked against the service when you continue. ${TAKEN.join(', ')} are taken.`}
              value={mounted ? name : ''}
              onChange={setName}
              error={errors['name']}
            />
          )}

          {standing === 'confirm' && (
            <p>
              Reload the page now and you come back to this step, with both answers still in it.
              What was stored is the durable snapshot, so nothing that described a moment - a
              navigation in flight, a validator's errors - came back with it.
            </p>
          )}

          <div className="actions">
            <button className="button button-accent" type="submit" disabled={starting || isBusy}>
              {isBusy ? 'Checking…' : isLast ? 'Finish' : 'Next'}
            </button>
            <button
              className="button button-secondary"
              type="button"
              disabled={starting || !canBack}
              onClick={() => {
                void onBack();
              }}
            >
              Back
            </button>
          </div>
        </form>
      )}

      <dl className="app-state">
        <dt>status</dt>
        <dd>{starting ? 'init' : status}</dd>
        <dt>saved</dt>
        <dd>{STORAGE_KEY}</dd>
      </dl>

      <p className="app-note">
        <button
          className="button button-secondary"
          type="button"
          disabled={!mounted}
          onClick={simulateUpgrade}
        >
          Ship version 2 and reload
        </button>
        <span>
          Ages the saved session by one version and reloads, which is what everyone with a form open
          meets on the day an application changes what it collects.
        </span>
      </p>

      <p className="app-live" role="status" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}

function Field(props: {
  id: string;
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  type?: string;
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
