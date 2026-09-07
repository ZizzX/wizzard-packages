/**
 * The hero instrument: a form on the real engine, and under it the graph of the
 * definition that form is running.
 *
 * Nothing here decides the route. `active` and `breadcrumbs` come out of the
 * engine and the picture comes out of the definition, so the claim the page
 * makes in prose is the same object the visitor is driving.
 *
 * The form is one horizontal strip and the graph one horizontal run beneath it,
 * because a flow read left to right is a flow, while a tall column beside a
 * short form was two widgets sharing a grid. `FlowGraph` does the painting;
 * this file owns the engine and the controls.
 *
 * Rendered without a client directive it is the static first frame: no
 * navigation has happened, so the graph shows the route the data implies and
 * the form is inert markup. With `client:load` the same tree hydrates and the
 * engine takes over.
 */
import { buildGraph } from '@wizzard-packages/core/graph';
import { END } from '@wizzard-packages/core/v1';
import {
  WizardProvider,
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
} from '@wizzard-packages/react/v1';
import { useCallback, useMemo, useState, type ReactNode } from 'react';

import { flowA, registryA } from '../../../contract/fixtures';

import { FlowGraph, type GraphView } from './FlowGraph';

/** The structure depends on the definition alone, so it is built once. */
const graph = buildGraph(flowA);

/**
 * One field per step, so a visitor changing the payer sees a different question
 * rather than a different label on the same one. The flow does not describe
 * fields - that is the host's job - so this map is the host.
 */
const FIELDS: Record<string, { path: string; label: string; type: string; placeholder: string }> = {
  details: { path: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
  company: { path: 'company', label: 'Company name', type: 'text', placeholder: 'Acme Ltd' },
  payment: { path: 'card', label: 'Card number', type: 'text', placeholder: '4242 4242 4242 4242' },
};

const FALLBACK_FIELD = FIELDS.details as (typeof FIELDS)[string];

/** `{ email: "required" }`, the shape a reader would see in a console. */
function printErrors(errors: Readonly<Record<string, string>>): string {
  const body = Object.entries(errors)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(', ');
  return `{ ${body} }`;
}

interface Message {
  kind: 'ok' | 'err';
  text: string;
}

export default function HeroFlow(): ReactNode {
  return (
    <WizardProvider flow={flowA} registry={registryA} data={{ payer: 'business' }}>
      <Instrument />
    </WizardProvider>
  );
}

function Instrument(): ReactNode {
  const wizard = useWizard();
  const { canBack, isBusy } = useNavigation();
  const { current, active, breadcrumbs } = useStep();
  const errors = useErrors();
  const [payer, setPayer] = useField<string>('payer');
  const [message, setMessage] = useState<Message | null>(null);
  // Bumped to replay the edge-draw animation. The key is the whole point: React
  // remounts the edges, and a remounted element restarts its CSS animation.
  const [drawing, setDrawing] = useState(0);
  const [ended, setEnded] = useState(false);

  const field = (current === null ? undefined : FIELDS[current]) ?? FALLBACK_FIELD;
  const [value, setValue] = useField<string>(field.path);
  const refused = message?.kind === 'err';

  // Before `start` runs - on the server, and for the frame of the first paint -
  // there is no current step, so the flow stands where it is about to.
  const standing = current ?? active[0] ?? null;

  const view = useMemo<GraphView>(
    () => ({ standing, breadcrumbs, refused, ended }),
    [standing, breadcrumbs, refused, ended]
  );

  const rebuild = useCallback(() => {
    setDrawing((n) => n + 1);
  }, []);

  const choosePayer = useCallback(
    (choice: string) => {
      setPayer(choice);
      setEnded(false);
      setMessage({
        kind: 'ok',
        text: `payer = ${JSON.stringify(choice)} - route rebuilt, no code changed`,
      });
      rebuild();
    },
    [setPayer, rebuild]
  );

  const onNext = useCallback(async () => {
    if (ended) {
      wizard.reset({ payer });
      setEnded(false);
      setMessage(null);
      await wizard.start();
      rebuild();
      return;
    }
    const step = current;
    const result = await wizard.next();
    if (result.ok) {
      const done = result.to === END;
      setEnded(done);
      setMessage(done ? { kind: 'ok', text: 'flow complete - end reached' } : null);
      return;
    }
    setMessage({
      kind: 'err',
      text:
        result.errors === undefined
          ? `next() refused - ${result.reason}`
          : `next() refused - ${step ?? 'flow'}: ${printErrors(result.errors)}`,
    });
  }, [ended, wizard, payer, current, rebuild]);

  const onBack = useCallback(async () => {
    setEnded(false);
    const result = await wizard.back();
    setMessage(
      result.ok && result.to === 'details'
        ? { kind: 'ok', text: 'back -> details (on.back override)' }
        : null
    );
  }, [wizard]);

  const position = ended ? active.length : active.indexOf(standing ?? '') + 1;
  const idle = ended
    ? 'end reached - Next restarts the flow'
    : `step ${Math.max(position, 1)} of ${active.length} - the graph follows the data`;

  return (
    <div className="instrument">
      <form
        className="instrument-controls"
        onSubmit={(event) => {
          event.preventDefault();
          void onNext();
        }}
      >
        <div className="field">
          <span className="field-label" id="payer-label">
            Payer type
          </span>
          <div className="segmented" role="group" aria-labelledby="payer-label">
            {['personal', 'business'].map((choice) => (
              <button
                key={choice}
                type="button"
                aria-pressed={payer === choice}
                onClick={() => {
                  choosePayer(choice);
                }}
              >
                {choice === 'personal' ? 'Personal' : 'Business'}
              </button>
            ))}
          </div>
        </div>

        <label className="field field-grow">
          <span className="field-label">{ended ? 'Flow complete' : field.label}</span>
          <input
            type={field.type}
            value={ended ? '' : (value ?? '')}
            disabled={ended}
            placeholder={ended ? 'end reached' : field.placeholder}
            autoComplete="off"
            aria-invalid={errors[field.path] !== undefined}
            onChange={(event) => {
              setValue(event.target.value);
              if (refused) setMessage(null);
            }}
          />
        </label>

        <div className="field">
          <span className="field-label" aria-hidden="true">
            &nbsp;
          </span>
          <div className="actions">
            <button className="button button-primary" type="submit" disabled={isBusy}>
              {ended ? 'Restart' : 'Next'}
            </button>
            <button
              className="button button-secondary"
              type="button"
              disabled={!canBack || isBusy}
              onClick={() => {
                void onBack();
              }}
            >
              Back
            </button>
          </div>
        </div>
      </form>

      <p className={`flow-message ${message?.kind ?? 'idle'}`} aria-live="polite">
        {message?.text ?? idle}
      </p>

      <figure className="instrument-graph">
        <figcaption className="graph-head">
          <span>{[...active, 'end'].join(' -> ')}</span>
          <button className="rebuild" type="button" onClick={rebuild}>
            Rebuild
          </button>
        </figcaption>
        <div className="frame">
          <FlowGraph
            graph={graph}
            active={active}
            view={view}
            direction="row"
            label={flowA.id}
            drawKey={drawing}
          />
        </div>
      </figure>
    </div>
  );
}
