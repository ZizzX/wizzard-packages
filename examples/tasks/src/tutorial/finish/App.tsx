import { groups } from '@wizzard-packages/core/groups';
import { persist } from '@wizzard-packages/plugins/persist';
import {
  WizardProvider,
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
  useWizardSelector,
} from '@wizzard-packages/react';
import { useId, useMemo, useState, type ReactNode } from 'react';

import { guest, registration, type Guest } from '../07-plugin/flow';
import { registry, talks } from '../07-plugin/registry';
import { trail } from '../07-plugin/trail';
import { STORAGE_KEY, nextGuestId, withoutGuest } from './guests';

/**
 * The tutorial's wizard, rendered. The provider takes the options `openWizard`
 * passed to `createWizard` and builds the engine itself; everything below it
 * asks which step is current and draws that one.
 */
export function App(): ReactNode {
  const [landed, setLanded] = useState<string[]>([]);

  // Built once, and in the browser only: a server has no storage to restore
  // from. `trail` reports after a move commits, never during a render.
  const plugins = useMemo(
    () =>
      typeof window === 'undefined'
        ? []
        : [
            persist({ key: STORAGE_KEY, version: 1 }),
            trail((step) => setLanded((steps) => [...steps, step])),
          ],
    []
  );

  return (
    <WizardProvider
      flow={registration}
      registry={registry}
      groups={groups}
      subFlows={{ guest }}
      plugins={plugins}
    >
      <Registration />
      <p>Landed on: {landed.length === 0 ? 'nothing yet' : landed.join(' → ')}</p>
    </WizardProvider>
  );
}

export function Registration(): ReactNode {
  const wizard = useWizard();
  const { current, status } = useStep();
  const { next, back, canBack, isBusy, isLast } = useNavigation();
  const errors = useErrors();
  const id = useId();

  // Inside the group the stack carries the guest's key; outside it, nothing does.
  const key = useWizardSelector((s) => s.stack.find((f) => f.key !== undefined)?.key ?? null);

  const [name, setName] = useField<string | undefined>('attendee.name');
  const [email, setEmail] = useField<string | undefined>('attendee.email');
  const [kind, setKind] = useField<string | undefined>('ticket.kind');
  const [list, setList] = useField<Guest[] | undefined>('ticket.guests');
  const [company, setCompany] = useField<string | undefined>('company.name');
  const [badge, setBadge] = useField<string | undefined>(`guests.${key ?? '-'}.badge`);
  const [diet, setDiet] = useField<string | undefined>(`guests.${key ?? '-'}.diet`);
  const [picks, setPicks] = useField<string[] | undefined>('sessions.picks');

  const guests = list ?? [];
  const who = guests.find((g) => g.id === key)?.name ?? '';

  if (status === 'done') {
    return (
      <section>
        <h3>You are registered</h3>
        <button
          type="button"
          onClick={() => {
            wizard.reset();
            void wizard.start();
          }}
        >
          Start over
        </button>
      </section>
    );
  }

  // A generated id: the React and Vue renderings share the page, so a written
  // one would be in the document twice.
  const field = (
    slug: string,
    label: string,
    value: string | undefined,
    set: (v: string) => void,
    err?: string
  ): ReactNode => (
    <p>
      <label htmlFor={`${id}-${slug}`}>{label}</label>
      <input
        id={`${id}-${slug}`}
        value={value ?? ''}
        onChange={(e) => set(e.target.value)}
        aria-invalid={err !== undefined}
      />
      {err !== undefined && <span role="alert">{err}</span>}
    </p>
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void next();
      }}
    >
      {current === 'attendee' && (
        <>
          {field('name', 'Name', name, setName, errors['name'])}
          {field('email', 'Email', email, setEmail, errors['email'])}
        </>
      )}

      {current === 'ticket' && (
        <>
          <fieldset>
            <legend>Ticket</legend>
            {(['standard', 'business'] as const).map((k) => (
              <label key={k}>
                <input type="radio" checked={kind === k} onChange={() => setKind(k)} /> {k}
              </label>
            ))}
          </fieldset>
          {guests.map((g, at) => (
            <p key={g.id}>
              <input
                aria-label={`Guest ${at + 1}`}
                value={g.name}
                onChange={(e) =>
                  setList(guests.map((x) => (x.id === g.id ? { ...x, name: e.target.value } : x)))
                }
              />
              <button type="button" onClick={() => withoutGuest(wizard, g.id)}>
                Remove
              </button>
            </p>
          ))}
          <button
            type="button"
            onClick={() => setList([...guests, { id: nextGuestId(guests), name: '' }])}
          >
            Add a guest
          </button>
        </>
      )}

      {current === 'company' && field('company', 'Company', company, setCompany)}

      {current === 'badge' &&
        field('badge', `Name on ${who || 'the guest'}'s badge`, badge, setBadge)}

      {current === 'diet' && (
        <p>
          <label htmlFor={`${id}-diet`}>What does {who || 'the guest'} eat?</label>
          <select id={`${id}-diet`} value={diet ?? ''} onChange={(e) => setDiet(e.target.value)}>
            <option value="">Anything</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </p>
      )}

      {current === 'sessions' && (
        <fieldset>
          <legend>Sessions</legend>
          {talks.map((talk) => (
            <label key={talk}>
              <input
                type="checkbox"
                checked={(picks ?? []).includes(talk)}
                onChange={(e) =>
                  setPicks(
                    e.target.checked
                      ? [...(picks ?? []), talk]
                      : (picks ?? []).filter((p) => p !== talk)
                  )
                }
              />{' '}
              {talk}
            </label>
          ))}
        </fieldset>
      )}

      {current === 'review' && (
        <p>
          {name} ({email}), {kind ?? 'standard'} ticket
          {guests.length > 0 ? `, with ${guests.map((g) => g.name).join(', ')}` : ''}.
        </p>
      )}

      <button type="button" onClick={() => void back()} disabled={!canBack || isBusy}>
        Back
      </button>
      <button type="submit" disabled={current === null || isBusy}>
        {isLast ? 'Register' : 'Next'}
      </button>
    </form>
  );
}
