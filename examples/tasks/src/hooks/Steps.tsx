import {
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizardSelector,
} from '@wizzard-packages/react';

/** Every hook the page describes, in one component rendered inside the provider. */
export function Steps() {
  // The stepper: where the wizard is and how far along.
  const { current, progress, breadcrumbs } = useStep();
  // The moves, and the flags a set of buttons needs.
  const { next, back, canBack, isBusy } = useNavigation();
  // One field, by the dot path the flow uses: `data.details.name`.
  const [name, setName] = useField<string>('details.name');
  // The messages validation produced for the current step.
  const errors = useErrors();
  // One derived value; the component re-renders only when it changes.
  const length = useWizardSelector(
    (s) => (s.data['details'] as { name?: string } | undefined)?.name?.length ?? 0
  );

  // Nothing is current until the provider has started the engine.
  if (current === null) return null;

  return (
    <section>
      <ol>
        {breadcrumbs.map((b) => (
          <li key={b.id} aria-current={b.status === 'current' ? 'step' : undefined}>
            {b.label}
          </li>
        ))}
      </ol>
      <p>{Math.round(progress)}% done</p>

      {current === 'details' && (
        <label>
          Trip name
          <input value={name ?? ''} onChange={(e) => setName(e.target.value)} />
          <small>{length} characters</small>
        </label>
      )}
      {errors['name'] !== undefined && <p role="alert">{errors['name']}</p>}
      {current === 'review' && <p>Ready to book {name}.</p>}

      <button onClick={() => void back()} disabled={!canBack || isBusy}>
        Back
      </button>
      {/* A refusal is the value `next()` resolves to; the errors above show it. */}
      <button onClick={() => void next()} disabled={isBusy || current === 'review'}>
        Next
      </button>
    </section>
  );
}
