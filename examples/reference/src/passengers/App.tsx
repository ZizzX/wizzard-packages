import { groups } from '@wizzard-packages/core/groups';
import {
  WizardProvider,
  useNavigation,
  useStep,
  useWizard,
  useWizardSelector,
} from '@wizzard-packages/react/v1';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { answerPath, initialData, subFlows, trip } from './flow';
import {
  answersOf,
  goToPassenger,
  keyOf,
  listOf,
  nextId,
  withoutAnswers,
  type Passenger,
} from './party';

/**
 * R-C on the React binding: one block of steps per passenger.
 *
 * The rendering draws three things - the list, one passenger's question, and
 * the review - and the engine decides which. It never counts passengers to work
 * out where it is: the frame carries the key, and everything on screen is read
 * from that.
 *
 * Traversal is installed rather than imported by the engine. A flat flow pays
 * nothing for the machinery that walks sub-flows, so a flow that contains a
 * group has to be handed it.
 */
const SEATS = ['Window', 'Aisle'] as const;
const MEALS = ['Standard', 'Vegetarian', 'None'] as const;

export default function PassengersApp(): ReactNode {
  return (
    <WizardProvider flow={trip} groups={groups} subFlows={subFlows} data={initialData()}>
      <Trip />
    </WizardProvider>
  );
}

function Trip(): ReactNode {
  const wizard = useWizard();
  const { current, active, index } = useStep();
  const { back, canBack, isBusy } = useNavigation();

  const data = useWizardSelector((s) => s.data);
  const stack = useWizardSelector((s) => s.stack);

  const [announcement, setAnnouncement] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);

  const list = listOf(data);
  const key = keyOf(stack);
  const at = key === null ? -1 : list.findIndex((p) => p.id === key);
  const standing = current ?? active[0] ?? 'party';

  const moved = useRef(false);
  useEffect(() => {
    if (current === null) return;
    if (!moved.current) {
      moved.current = true;
      return;
    }
    heading.current?.focus();
  }, [current]);

  // Reaching the end does not move the wizard: it stays on the last step and
  // says `to: '@end'`. What changed is `status`.
  // `status` and not `completed`: a forward `go` marks the step it left as
  // completed, and Edit jumps away from Review, so `completed` would call the
  // trip booked the moment somebody went back to change a seat. Nothing here is
  // persisted, so `status` - which `toSnapshot` does not carry - is exactly
  // right for this application and wrong for the one that reloads.
  const finished = useWizardSelector((s) => s.status === 'done');

  const answers = (id: string): { seat?: string; meal?: string } => answersOf(data)[id] ?? {};

  const choose = (field: 'seat' | 'meal', value: string): void => {
    if (key === null) return;
    wizard.set(answerPath(key, field), value);
  };

  const addPassenger = (): void => {
    wizard.set('passengers', [...list, { id: nextId(list, answersOf(data)), name: '' }]);
    setAnnouncement(`Passenger ${list.length + 1} added.`);
  };

  const removePassenger = (id: string): void => {
    // Their answers go with them, in one commit: a key is a data path, and
    // leaving `answers.p3` behind is how the next passenger to be given that
    // key would inherit somebody else's seat.
    wizard.batch(() => {
      wizard.set(
        'passengers',
        list.filter((p) => p.id !== id)
      );
      wizard.set('answers', withoutAnswers(data, id));
    });
    setAnnouncement(`Passenger removed. ${list.length - 1} left.`);
  };

  const rename = (id: string, name: string): void => {
    wizard.set(
      'passengers',
      list.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  async function onNext(): Promise<void> {
    const result = await wizard.next();
    if (result.ok) {
      if (result.to === '@end') setAnnouncement('Booked.');
      return;
    }
    setAnnouncement(`That move was refused: ${result.reason}.`);
  }

  async function startAgain(): Promise<void> {
    setAnnouncement('');
    wizard.reset(initialData());
    await wizard.start();
  }

  async function edit(id: string): Promise<void> {
    const reached = await goToPassenger(wizard, id);
    setAnnouncement(
      reached ? `Editing ${nameOf(list, id)}.` : `Could not reach ${nameOf(list, id)}.`
    );
  }

  return (
    <div className="app">
      {standing === 'party' && (
        <>
          <h2 ref={heading} tabIndex={-1}>
            Who is travelling
          </h2>
          <p>
            Each passenger answers the same two questions. The definition says so once; the engine
            runs the block as many times as there are people in this list.
          </p>

          <ul className="party">
            {list.map((person, position) => (
              <li key={person.id}>
                <label className="field">
                  <span className="field-label">Passenger {position + 1}</span>
                  <input
                    value={person.name}
                    placeholder="Name"
                    onChange={(e) => {
                      rename(person.id, e.target.value);
                    }}
                  />
                </label>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => {
                    removePassenger(person.id);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="actions">
            <button className="button button-secondary" type="button" onClick={addPassenger}>
              Add a passenger
            </button>
          </div>
        </>
      )}

      {(standing === 'seat' || standing === 'meal') && key !== null && (
        <>
          <p className="app-where">
            Passenger {at + 1} of {list.length}
            {nameOf(list, key) === '' ? '' : `, ${nameOf(list, key)}`} &mdash; step {index + 1} of{' '}
            {active.length}
          </p>
          <h2 ref={heading} tabIndex={-1}>
            {standing === 'seat' ? 'Seat' : 'Meal'}
          </h2>

          <Choice
            label={standing === 'seat' ? 'Where would they sit' : 'What would they eat'}
            options={standing === 'seat' ? SEATS : MEALS}
            value={standing === 'seat' ? answers(key).seat : answers(key).meal}
            onChoose={(value) => {
              choose(standing, value);
            }}
          />
        </>
      )}

      {standing === 'review' && (
        <>
          <h2 ref={heading} tabIndex={-1}>
            Review
          </h2>
          <table className="party-review">
            <thead>
              <tr>
                <th scope="col">Passenger</th>
                <th scope="col">Seat</th>
                <th scope="col">Meal</th>
                <th scope="col">
                  <span className="visually-hidden">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((person, position) => (
                <tr key={person.id}>
                  <th scope="row">
                    {person.name === '' ? `Passenger ${position + 1}` : person.name}
                  </th>
                  <td>{answers(person.id).seat ?? 'not chosen'}</td>
                  <td>{answers(person.id).meal ?? 'not chosen'}</td>
                  <td>
                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={() => {
                        void edit(person.id);
                      }}
                    >
                      Edit {person.name === '' ? `passenger ${position + 1}` : person.name}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {finished && <p>Booked. Nothing below moves until this one starts again.</p>}

          {!finished && (
            <div className="actions">
              <button
                className="button button-secondary"
                type="button"
                onClick={() => {
                  void wizard.go('party');
                }}
              >
                Change who is travelling
              </button>
            </div>
          )}
        </>
      )}

      <div className="actions">
        {finished ? (
          <button
            className="button button-accent"
            type="button"
            onClick={() => {
              void startAgain();
            }}
          >
            Start again
          </button>
        ) : (
          <>
            <button
              className="button button-accent"
              type="button"
              disabled={current === null || isBusy}
              onClick={() => {
                void onNext();
              }}
            >
              {standing === 'review' ? 'Book the trip' : 'Next'}
            </button>
            <button
              className="button button-secondary"
              type="button"
              disabled={current === null || !canBack || isBusy}
              onClick={() => {
                void back();
              }}
            >
              Back
            </button>
          </>
        )}
      </div>

      <dl className="app-state">
        <dt>stack</dt>
        <dd>{stack.map((frame) => printFrame(frame)).join(' / ') || 'not started'}</dd>
        <dt>passengers</dt>
        <dd>{list.length === 0 ? 'none' : list.map((p) => p.id).join(', ')}</dd>
      </dl>

      <p className="app-live" role="status" aria-live="polite">
        {current === null ? 'Starting.' : announcement}
      </p>
    </div>
  );
}

const nameOf = (list: readonly Passenger[], id: string): string =>
  list.find((p) => p.id === id)?.name ?? '';

/** The stack, printed the way the engine holds it: enclosing frames, then the step. */
const printFrame = (frame: { flow: string; step: string; key?: string }): string =>
  frame.key === undefined
    ? `${frame.flow}.${frame.step}`
    : `${frame.flow}.${frame.step}[${frame.key}]`;

function Choice(props: {
  label: string;
  options: readonly string[];
  value: string | undefined;
  onChoose: (value: string) => void;
}): ReactNode {
  return (
    <fieldset className="field">
      <legend className="field-label">{props.label}</legend>
      <div className="segmented">
        {props.options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={props.value === option}
            onClick={() => {
              props.onChoose(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
