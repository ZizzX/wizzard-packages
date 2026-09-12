import {
  createWizard,
  type FlowDefinition,
  type Wizard as Engine,
} from '@wizzard-packages/core/v1';
import {
  WizardProvider,
  useField,
  useNavigation,
  useStep,
  useWizard,
} from '@wizzard-packages/react/v1';
import { useId, useMemo, useState, type ReactNode } from 'react';

import { FROM_SERVER, PATCH_FROM_SERVER, registry } from './contract';
import { checkPatch, loadFlow } from './load';

export function App(): ReactNode {
  // The definition is read once, and the engine is built from what came back.
  // A payload that does not load has no wizard to render, which is the honest
  // rendering of a backend that sent something wrong.
  const loaded = useMemo(() => loadFlow(FROM_SERVER, registry), []);
  const wizard = useMemo(
    () => (loaded.ok ? createWizard({ flow: loaded.flow, registry }) : null),
    [loaded]
  );

  if (!loaded.ok || wizard === null) {
    return (
      <ul>
        {loaded.ok
          ? null
          : loaded.problems.map((problem) => <li key={problem.path}>{problem.message}</li>)}
      </ul>
    );
  }

  return (
    <WizardProvider wizard={wizard}>
      <Wizard flow={loaded.flow} />
    </WizardProvider>
  );
}

export function Wizard(props: { flow: FlowDefinition }): ReactNode {
  const wizard = useWizard() as Engine;
  const { current } = useStep();
  const { next, isBusy } = useNavigation();
  const [email, setEmail] = useField<string>('account.email');
  const [note, setNote] = useState('Loaded from the server.');
  const emailId = useId();

  const step = current ?? 'account';
  const starting = current === null;

  /**
   * A patch is checked before it is applied. `patchFlow` merges and installs;
   * it does not validate, so an `order` of the wrong type would be accepted
   * here and fail later, in a selector, with the payload long out of sight.
   */
  const apply = (text: string, label: string) => {
    const checked = checkPatch(props.flow, text, registry);
    if (!checked.ok) {
      setNote(`${label}: refused before applying - ${checked.problems[0]?.message ?? ''}`);
      return;
    }
    setNote(`${label}: ${wizard.patchFlow(checked.patch) ? 'applied' : 'refused'}`);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {step === 'account' && (
        <p>
          <label htmlFor={emailId}>Your email</label>
          <input
            id={emailId}
            value={email ?? ''}
            onChange={(e) => setEmail(e.target.value)}
            disabled={starting}
          />
        </p>
      )}
      {step !== 'account' && <p>Step: {step}</p>}

      <button type="button" onClick={() => void next()} disabled={starting || isBusy}>
        Next
      </button>
      <button type="button" onClick={() => apply(PATCH_FROM_SERVER, 'Patch')} disabled={starting}>
        Apply the patch
      </button>
      {/* The patch a backend should not send: it deletes the step the person is
          standing on, and the engine answers false rather than relocating them.
          Built here rather than parsed, because JSON has no `undefined` and so
          cannot express a deletion at all. */}
      <button
        type="button"
        onClick={() => {
          const removal = { steps: { account: undefined } } as unknown as Parameters<
            typeof wizard.patchFlow
          >[0];
          setNote(`Removal: ${wizard.patchFlow(removal) ? 'applied' : 'refused'}`);
        }}
        disabled={starting}
      >
        Apply a patch that deletes this step
      </button>

      <p role="status">{note}</p>
    </form>
  );
}
