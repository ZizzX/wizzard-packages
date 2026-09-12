import { persist, type RestoreOutcome } from '@wizzard-packages/plugins/persist';
import { WizardProvider, useField, useNavigation, useStep } from '@wizzard-packages/react/v1';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { APP_VERSION, STORAGE_KEY, signup } from './flow';
import { describeRestore } from './outcome';

export function App(): ReactNode {
  // What the plugin decided, kept out of React's state until it is safe to
  // read: `onRestore` runs while the engine is being created, which is during a
  // render, and setting state there is not allowed.
  const restored = useRef<RestoreOutcome | null>(null);

  // In the browser only. On a server there is no storage to read, and a session
  // restored into the server's markup is a hydration mismatch waiting to happen.
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
    <WizardProvider flow={signup} plugins={plugins}>
      <Wizard restored={restored} />
    </WizardProvider>
  );
}

export function Wizard(props: { restored: { current: RestoreOutcome | null } }): ReactNode {
  const { current, isLast } = useStep();
  const { next, back, canBack } = useNavigation();
  const [full, setFull] = useField<string>('name.full');
  const [favourite, setFavourite] = useField<string>('colour.favourite');

  // Said after the first paint, for the same reason the plugin is installed in
  // the browser only: the server never saw this session.
  const [outcome, setOutcome] = useState<string>('Starting.');
  useEffect(() => {
    setOutcome(describeRestore(props.restored.current));
  }, [props.restored]);

  const step = current ?? 'name';
  const starting = current === null;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <p role="status">{outcome}</p>

      {step === 'name' && (
        <label>
          Your name
          <input value={full ?? ''} onChange={(e) => setFull(e.target.value)} disabled={starting} />
        </label>
      )}
      {step === 'colour' && (
        <label>
          A colour
          <input
            value={favourite ?? ''}
            onChange={(e) => setFavourite(e.target.value)}
            disabled={starting}
          />
        </label>
      )}
      {step === 'done' && <p>Saved as you went. Reload the page and see.</p>}

      <button type="button" onClick={() => back()} disabled={starting || !canBack}>
        Back
      </button>
      <button type="button" onClick={() => next()} disabled={starting || isLast}>
        Next
      </button>
    </form>
  );
}
