/**
 * The homepage hero (docs/designs/hero-theater.md): the definition a developer
 * writes, the form a visitor would see, and the graph of the flow under it.
 *
 * A scenario plays once - the file is written, then the form is walked through
 * a condition, a repeat group and a refused validation to the end - and every
 * move in it is a call to the wizard this island provides. Stopping it is
 * taking over: nothing is rebuilt, the form carries on from wherever the
 * scenario left the engine.
 *
 * Rendered on the server it is the final frame: the whole file, the whole
 * graph, the form on Route. The page's inline script puts `theater-pending` on
 * the root before the first paint when there is time to play; the island takes
 * the class away when it hydrates and draws the empty editor itself, so a tab
 * opened in the background waits on an empty editor rather than on a frame the
 * scenario would then wipe. No class means reduced motion, or a hydration too
 * slow for the page's fallback: the final frame stays, live, and nothing plays.
 *
 * The code arrives highlighted, as the page's slot: `index.astro` runs the
 * file through the highlighter Astro ships, at build time. Writing reveals its
 * lines; it never highlights.
 */
import { getPath, type NavResult } from '@wizzard-packages/core';
import { buildGraph } from '@wizzard-packages/core/graph';
import { groups } from '@wizzard-packages/core/groups';
import { WizardProvider, useWizard, useWizardSnapshot } from '@wizzard-packages/react';
import {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { scoutBeats, type Scout } from '../lib/walk';
import {
  answer,
  flowUpTo,
  initialData,
  lines,
  perform,
  printCall,
  scenario,
  summarize,
  travellers,
  type Cue,
} from '../theater/script';
import { registry, subFlows, trip } from '../theater/trip.flow';
import { usePlayer } from '../theater/usePlayer';
import { tripView } from '../theater/view';

import { FlowGraph } from './FlowGraph';

/** The console keeps its last lines and drops the rest, so it never scrolls. */
const CONSOLE_LINES = 6;
/** The travellers a visitor can set. Zero takes the passenger group off the route. */
const MAX_TRAVELLERS = 4;

export default function Theater({ children }: { children?: ReactNode }): ReactNode {
  return (
    <WizardProvider
      flow={trip}
      groups={groups}
      subFlows={subFlows}
      registry={registry}
      data={initialData()}
    >
      <Stage code={children} />
    </WizardProvider>
  );
}

function Stage({ code }: { code: ReactNode }): ReactNode {
  const wizard = useWizard();
  const snapshot = useWizardSnapshot();

  // The final frame, until hydration says there is time to play.
  const [written, setWritten] = useState(lines.length);
  const [steps, setSteps] = useState<readonly string[]>(trip.order);
  const [light, setLight] = useState<number | null>(null);
  const [calls, setCalls] = useState<readonly string[]>([]);
  const [autoplay, setAutoplay] = useState(false);

  const source = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const stop = useRef<HTMLButtonElement>(null);

  const log = useCallback((line: string) => {
    setCalls((before) => [...before, line].slice(-CONSOLE_LINES));
  }, []);

  const run = useCallback(
    async (cue: Cue) => {
      setLight(cue.light ?? null);
      const { act } = cue;
      if (act.kind === 'write') {
        setWritten(act.upTo);
        setSteps(act.steps);
        return;
      }
      const line = printCall(act, await perform(wizard, act));
      if (line !== null) log(line);
    },
    [wizard, log]
  );

  const player = usePlayer(scenario, run, autoplay);
  const writing = written < lines.length;

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('theater-pending')) return;
    root.classList.remove('theater-pending');
    setWritten(0);
    setSteps([]);
    setAutoplay(true);
  }, []);

  // The highlighted lines are the page's markup, not this component's, so
  // writing marks them rather than rendering them.
  useLayoutEffect(() => {
    source.current?.querySelectorAll('.line').forEach((line, index) => {
      line.classList.toggle('unwritten', index >= written);
      line.classList.toggle('caret', writing && index === written - 1);
      line.classList.toggle('lit', index === light);
    });
  }, [written, writing, light]);

  /** Moves focus after React has drawn what the click changed. */
  const focusSoon = (find: () => HTMLElement | null | undefined): void => {
    requestAnimationFrame(() => find()?.focus());
  };
  const firstControl = (): HTMLElement | null | undefined =>
    form.current?.querySelector<HTMLElement>('input, button');

  /** Stops the scenario where it is, and finishes the file if it was still being written. */
  const takeOver = (): void => {
    if (!player.playing) return;
    player.stop();
    setWritten(lines.length);
    setSteps(trip.order);
    setLight(null);
  };

  /** Back to Route with the data the scenario starts from, played or live. */
  const again = async (play: boolean): Promise<void> => {
    wizard.reset(initialData());
    setCalls([]);
    setLight(null);
    if (play) {
      setWritten(0);
      setSteps([]);
    }
    await wizard.start();
    if (play) {
      player.replay();
      focusSoon(() => stop.current);
    } else {
      focusSoon(firstControl);
    }
  };

  const move = async (call: string, result: Promise<NavResult>): Promise<void> => {
    log(`${call} -> ${summarize(await result)}`);
  };

  const flow = useMemo(() => flowUpTo(steps), [steps]);
  const graph = useMemo(() => buildGraph(flow, subFlows), [flow]);
  const { active, view } = tripView(flow, snapshot);
  const live = !player.playing;

  // The scout (docs/designs/hero-theater.md, The scout): when the data moves a
  // step across the route and the form stays where it is, the graph shows why.
  // Anything else that changes what it draws - a move, a restart, a line of
  // Act 1 - puts it back on the engine at once.
  const [seen, setSeen] = useState({ flow, active, standing: view.standing });
  const [scout, setScout] = useState<{ beats: Scout; take: number } | null>(null);
  if (
    seen.flow !== flow ||
    seen.standing !== view.standing ||
    seen.active.join() !== active.join()
  ) {
    setSeen({ flow, active, standing: view.standing });
    const beats =
      seen.flow === flow && seen.standing === view.standing && view.standing !== null
        ? scoutBeats(graph, seen.active, active, view.standing, snapshot.data)
        : null;
    setScout(beats === null ? null : { beats, take: (scout?.take ?? 0) + 1 });
  }

  return (
    <div className="theater">
      <section className="theater-code" aria-label="trip.flow.ts">
        <div className="theater-head">
          <span className="tag">trip.flow.ts</span>
          {player.playing && (
            <button
              ref={stop}
              className="button button-secondary"
              type="button"
              onClick={() => {
                takeOver();
                focusSoon(firstControl);
              }}
            >
              Stop
            </button>
          )}
        </div>
        <div ref={source} className="theater-source" aria-hidden="true">
          {code}
        </div>
        <pre className="visually-hidden">{lines.join('\n')}</pre>
      </section>

      <div className="theater-side">
        {/* A press or a key anywhere in the form is the visitor taking over. The
            listeners sit outside the form because an inert form receives
            neither, and this one is inert while the file is being written. */}
        <div
          className={`theater-form${writing ? ' writing' : ''}`}
          onPointerDown={takeOver}
          onKeyDown={takeOver}
        >
          <form
            ref={form}
            inert={writing}
            onSubmit={(event) => {
              event.preventDefault();
              void move('next()', wizard.next());
            }}
          >
            <Form
              log={log}
              onBack={() => {
                // A refusal is about the step being left, and the engine keys it
                // by step, not by passenger: kept, it would follow Back onto the
                // passenger before, under a passport that is filled in.
                if (snapshot.current !== null) wizard.setErrors(snapshot.current, null);
                void move('back()', wizard.back());
              }}
              onAgain={(play) => void again(play)}
            />
          </form>
        </div>

        {/* Beside the form rather than under the file: the file is forty lines
            tall, and a console below it is off the screen while the form it
            answers for is on it. */}
        <div
          className="theater-console"
          // Silent while the scenario plays: ten announcements in sixteen
          // seconds would drown the page. The visitor's own calls are news.
          {...(live && { role: 'log', 'aria-label': 'Console' })}
        >
          {calls.length === 0 ? (
            <p className="theater-console-empty">Calls made on the form, and what they return.</p>
          ) : (
            calls.map((call, index) => <p key={index}>{call}</p>)
          )}
        </div>

        <figure className="theater-graph">
          {/* Down, at every width: across, the trip is 996 units wide, and the
              column beside the code would draw it at half size. */}
          <div className="frame">
            <FlowGraph
              graph={graph}
              active={active}
              view={view}
              direction="column"
              label="trip"
              scout={scout?.beats ?? null}
              scoutKey={scout?.take ?? 0}
            />
          </div>
        </figure>
      </div>
    </div>
  );
}

interface FormProps {
  log: (line: string) => void;
  onBack: () => void;
  onAgain: (play: boolean) => void;
}

/** The step the wizard stands on, as a visitor would fill it in. */
function Form({ log, onBack, onAgain }: FormProps): ReactNode {
  const wizard = useWizard();
  const { current, stack, data, errors, status, canBack, isBusy } = useWizardSnapshot();

  const text = (path: string): string => {
    const value = getPath(data, path);
    return typeof value === 'string' ? value : '';
  };
  const list = Array.isArray(data.passengers) ? (data.passengers as { id: string }[]) : [];
  const route = `${text('route.from') || '?'} -> ${text('route.to') || '?'}`;
  const people = `${list.length} ${list.length === 1 ? 'passenger' : 'passengers'}`;

  if (status === 'done') {
    return (
      <div className="theater-step">
        <p className="theater-where">Booked</p>
        <p className="theater-booked">
          {route}, {people}
        </p>
        <div className="actions">
          <button className="button button-accent" type="button" onClick={() => onAgain(false)}>
            Try it yourself
          </button>
          <button className="button button-secondary" type="button" onClick={() => onAgain(true)}>
            Play again
          </button>
        </div>
      </div>
    );
  }

  // Before `start()` - on the server, and for the first frame - there is no
  // step yet, and Route is where the wizard is about to stand.
  const standing = current ?? 'route';
  // The item's key is on the group's frame, the trip's, under the passenger's.
  const key = stack[0]?.key;
  const set = (path: string) => (value: string) => {
    wizard.set(path, value);
  };

  return (
    <div className="theater-step">
      {standing === 'route' && (
        <>
          <p className="theater-where">Route</p>
          <div className="theater-fields">
            <Text label="From" value={text('route.from')} onChange={set('route.from')} />
            <Text label="To" value={text('route.to')} onChange={set('route.to')} />
            <label className="field">
              <span className="field-label">Travellers</span>
              {/* A choice, not a number field: typed into, a number field reads
                  "12" when a visitor after 2 types it after the 1 already there. */}
              <select
                value={list.length}
                onChange={(event) => {
                  wizard.set('passengers', travellers(Number(event.target.value)));
                }}
              >
                {Array.from({ length: MAX_TRAVELLERS + 1 }, (_, count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="theater-check">
            <input
              type="checkbox"
              checked={data.business === true}
              onChange={(event) => {
                wizard.set('business', event.target.checked);
                log(`set('business', ${event.target.checked})`);
              }}
            />
            Business trip
          </label>
        </>
      )}

      {standing === 'details' && key !== undefined && (
        <>
          <p className="theater-where">
            Passenger {list.findIndex((person) => person.id === key) + 1} of {list.length}
          </p>
          <div className="theater-fields">
            <Text
              label="Name"
              value={text(answer(key, 'name'))}
              onChange={set(answer(key, 'name'))}
            />
            <Text
              label="Passport"
              value={text(answer(key, 'passport'))}
              onChange={set(answer(key, 'passport'))}
              error={errors.details?.passport}
            />
          </div>
        </>
      )}

      {standing === 'company' && (
        <>
          <p className="theater-where">Company</p>
          <div className="theater-fields">
            <Text
              label="Company name"
              value={text('company.name')}
              onChange={set('company.name')}
            />
          </div>
        </>
      )}

      {standing === 'payment' && (
        <>
          <p className="theater-where">Payment</p>
          <p className="theater-booked">
            {route}, {people}
          </p>
        </>
      )}

      <div className="actions">
        <button className="button button-accent" type="submit" disabled={isBusy}>
          {standing === 'payment' ? 'Book' : 'Next'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          disabled={!canBack || isBusy}
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}

function Text(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
}): ReactNode {
  const id = useId();
  // The error sits beside the label, not in it: inside, it would become part of
  // the field's name, and the passport field would be called "Passport required".
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {props.label}
      </label>
      <input
        id={id}
        value={props.value}
        autoComplete="off"
        aria-invalid={props.error !== undefined}
        {...(props.error !== undefined && { 'aria-describedby': `${id}-error` })}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
      />
      {props.error !== undefined && (
        <span className="field-error" id={`${id}-error`}>
          {props.error}
        </span>
      )}
    </div>
  );
}
