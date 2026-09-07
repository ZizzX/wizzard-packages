/**
 * The hero: a form on the real engine, and the flow graph of the definition it
 * is running, drawn from that same definition.
 *
 * Nothing here decides the route. `active` and `breadcrumbs` come out of the
 * engine, `buildGraph` and `layoutGraph` come out of the definition, and this
 * file only paints what the two agree on - which is the claim the page makes in
 * prose, made checkable.
 *
 * Rendered without a client directive it is the static first frame: no
 * navigation has happened, so the graph shows the route the data implies and
 * the form is inert markup. With `client:load` the same tree hydrates and the
 * engine takes over.
 */
import { buildGraph, type GraphNode } from '@wizzard-packages/core/graph';
import { END, type Breadcrumb } from '@wizzard-packages/core/v1';
import { layoutGraph, formatExpr } from '@wizzard-packages/devtools/headless';
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

/** The layout depends on the definition alone, so it is computed once. */
const graph = buildGraph(flowA);
const laid = layoutGraph(graph);
const nodeById = new Map<string, GraphNode>(graph.nodes.map((node) => [node.id, node]));
const endId = graph.nodes.find((node) => node.kind === 'end')?.id ?? END;

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

export type NodeState = 'active' | 'error' | 'visited' | 'skipped' | 'done' | 'rest';

export interface GraphView {
  /**
   * The step the flow is standing on. `current` once the engine has started,
   * and before that the first reachable step - which is where it is about to
   * stand, and what the frame rendered on the server should show.
   */
  standing: string | null;
  breadcrumbs: readonly Breadcrumb[];
  /** The current step was refused, so its node is drawn as blocked, not active. */
  refused: boolean;
  /**
   * The flow reached its end.
   *
   * Not a snapshot property: reaching `@end` leaves the engine standing on the
   * last step and says so in the `NavResult` instead, so whoever made the call
   * is the one who knows.
   */
  ended: boolean;
}

/**
 * What one node is doing right now.
 *
 * A step absent from the breadcrumbs is one whose `when` is false under the
 * data at hand: not upcoming, not skipped over, simply not on the route. That
 * is the distinction the hero exists to show, so it gets its own state.
 */
export function nodeState(id: string, kind: GraphNode['kind'], view: GraphView): NodeState {
  if (kind === 'end') return view.ended ? 'done' : 'rest';
  const crumb = view.breadcrumbs.find((entry) => entry.id === id);
  if (crumb === undefined) return 'skipped';
  if (id === view.standing) {
    if (view.ended) return 'visited';
    return view.refused ? 'error' : 'active';
  }
  switch (crumb.status) {
    case 'error':
      return 'error';
    case 'completed':
    case 'visited':
      return 'visited';
    default:
      return 'rest';
  }
}

/**
 * Whether an edge is the one the flow would take next from `from`.
 *
 * The builder emits a fall-through edge from every step to every later step it
 * could land on, because a `when` in between may be false. Exactly one of them
 * is live under the data at hand: the one reaching the next reachable step.
 */
export function edgeLive(
  edge: { from: string; to: string; kind: string },
  active: readonly string[],
  end: string
): boolean {
  if (edge.kind === 'back') return false;
  const at = active.indexOf(edge.from);
  if (at === -1) return false;
  return edge.to === (active[at + 1] ?? end);
}

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
      <Stage />
    </WizardProvider>
  );
}

function Stage(): ReactNode {
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
    <div className="hero-flow">
      <form
        className="flow-form"
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

        <label className="field">
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

        <p className={`flow-message ${message?.kind ?? 'idle'}`} aria-live="polite">
          {message?.text ?? idle}
        </p>
      </form>

      <figure className="graph">
        <figcaption className="graph-head">
          <span>{[...active, 'end'].join(' -> ')}</span>
          <button className="rebuild" type="button" onClick={rebuild}>
            Rebuild
          </button>
        </figcaption>

        <div className="frame">
          <svg
            // Two units of bleed on every side: `layoutGraph` routes the back
            // edge along x = width, and a 1.5-unit stroke centred on that line
            // loses its outer half to the viewBox and reads as orphaned dashes.
            viewBox={`-2 -2 ${laid.width + 4} ${laid.height + 4}`}
            role="img"
            aria-label={`Flow graph of ${flowA.id}. The same information is in the table below.`}
          >
            {laid.edges.map((edge) => (
              <g
                key={`${edge.from}-${edge.to}-${edge.kind}-${drawing}`}
                className={`edge ${edge.kind} ${edgeLive(edge, active, endId) ? 'live' : 'dim'}`}
              >
                <polyline
                  points={edge.points.map(([x, y]) => `${x},${y}`).join(' ')}
                  pathLength={100}
                />
              </g>
            ))}

            {laid.nodes.map((placed) => {
              const node = nodeById.get(placed.id);
              const kind = node?.kind ?? 'step';
              const state = nodeState(placed.id, kind, view);
              // The condition belongs to the step, not to the edge into it: an
              // `order` edge is a fall-through and carries no `when` of its own,
              // and a label hung on one would also run off the panel.
              // 26 characters at 9px mono is the widest line that stays inside a
              // 160-unit node, which is why this is not `formatExpr`'s default 32.
              const when = node?.when === undefined ? undefined : formatExpr(node.when, 26);
              if (kind === 'end') {
                return (
                  // Drawn at the top of its box, not centred in it: `layoutGraph`
                  // routes the incoming edge to the box's top edge, and a circle
                  // centred in a 40-unit box leaves a visible gap above itself.
                  <g key={placed.id} className={`node end ${state}`}>
                    <circle cx={placed.x + 11} cy={placed.y + 11} r="11" />
                  </g>
                );
              }
              return (
                <g key={placed.id} className={`node ${kind} ${state}`}>
                  {kind === 'group' && (
                    <rect
                      className="inner"
                      x={placed.x + 3}
                      y={placed.y + 3}
                      width={placed.w - 6}
                      height={placed.h - 6}
                      rx="4"
                    />
                  )}
                  <rect x={placed.x} y={placed.y} width={placed.w} height={placed.h} rx="4" />
                  <text
                    x={placed.x + 12}
                    y={placed.y + placed.h / 2 + (when === undefined ? 4 : -2)}
                  >
                    {node?.label ?? placed.id}
                  </text>
                  {when !== undefined && (
                    <text className="node-when" x={placed.x + 12} y={placed.y + placed.h / 2 + 12}>
                      {when.short}
                      <title>{when.full}</title>
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* The screen reader's path through the graph, and the visitor's if the
            island never hydrates. */}
        <table className="mirror">
          <caption>Steps of {flowA.id}</caption>
          <thead>
            <tr>
              <th scope="col">Step</th>
              <th scope="col">Kind</th>
              <th scope="col">State</th>
              <th scope="col">Condition</th>
            </tr>
          </thead>
          <tbody>
            {graph.nodes.map((node) => (
              <tr key={node.id}>
                <th scope="row">{node.label ?? node.id}</th>
                <td>{node.kind}</td>
                <td>{nodeState(node.id, node.kind, view)}</td>
                <td>{node.when === undefined ? 'always' : formatExpr(node.when).full}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </div>
  );
}
