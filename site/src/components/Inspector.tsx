/**
 * The inspector: one flow, three ways of looking at it.
 *
 * **Live** runs R-A on the real engine — the form drives it and the graph
 * follows. **Replay** scrubs a recording of that same flow, so a reader can
 * walk a run that already happened, refusal and all, without producing one.
 * **Preview** draws a flow the reader pasted: structure only, because a pasted
 * definition carries no registry and nothing here evaluates it.
 *
 * Selecting a node inspects it and never navigates. That is the whole reason
 * the three modes can share one graph: in every mode the drawing is a picture
 * of a definition, and only the state beside it changes.
 *
 * Everything that could be a pure function is one, in `../lib`: reading a paste
 * (`readFlow`), turning a recording into frames (`replayFrames`), the route a
 * data change implies (`rerouteTo`). What is left here is which of them to show.
 */
import { buildGraph, type GraphNode } from '@wizzard-packages/core/graph';
import { checkSession } from '@wizzard-packages/core/session';
import { END, type FlowDefinition } from '@wizzard-packages/core/v1';
import { diffState, formatExpr } from '@wizzard-packages/devtools/headless';
import {
  WizardProvider,
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
} from '@wizzard-packages/react/v1';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { flowA, registryA } from '../../../contract/fixtures';
import { recordingA } from '../../../contract/recording';
import { readFlow, type ReadResult } from '../lib/read-flow';
import { replayFrames } from '../lib/replay';
import { FALLBACK_FIELD, FIELDS, rerouteTo } from '../lib/signup-form';

import { FlowGraph, type GraphView } from './FlowGraph';

type Mode = 'live' | 'replay' | 'preview';

/** The structure depends on the definition alone, so both modes share one. */
const exampleGraph = buildGraph(flowA);
const exampleFrames = replayFrames(recordingA, flowA, registryA);

const nodeOf = (graph: { nodes: readonly GraphNode[] }, id: string | null): GraphNode | null =>
  id === null ? null : (graph.nodes.find((node) => node.id === id) ?? null);

/** `4242 4242…` — a value a reader can recognise without it breaking the row. */
function short(value: unknown): string {
  const text = JSON.stringify(value) ?? 'undefined';
  return text.length <= 48 ? text : `${text.slice(0, 47)}…`;
}

// ---------------------------------------------------------------------------

/**
 * What one node is, in the words of the definition rather than the drawing.
 *
 * The `when` is printed in full here and truncated inside the node, because
 * this is where a reader came to read it.
 */
function NodeCard({ node, children }: { node: GraphNode | null; children?: ReactNode }): ReactNode {
  if (node === null) {
    return (
      <p className="panel-empty">
        Select a step — click it, or focus the graph and use the arrow keys — to read its condition
        and its state.
      </p>
    );
  }

  const kind = node.kind === 'group' ? (node.group?.repeat ? 'repeat group' : 'group') : node.kind;

  return (
    <div className="node-card">
      <h3>{node.label ?? node.id}</h3>
      <dl>
        <dt>id</dt>
        <dd>
          <code>{node.id}</code>
        </dd>
        <dt>kind</dt>
        <dd>
          {kind}
          {node.deferred === true && ' (deferred)'}
        </dd>
        <dt>when</dt>
        <dd>
          {node.when === undefined ? (
            <span className="muted">always on the route</span>
          ) : (
            <code>{formatExpr(node.when, 200).full}</code>
          )}
        </dd>
        {node.offOrder === true && (
          <>
            <dt>order</dt>
            <dd className="muted">reachable, but not named in `order`</dd>
          </>
        )}
      </dl>
      {children}
    </div>
  );
}

/** What one commit changed, as rows. `diffState` decides what counts. */
function Diff({ rows }: { rows: ReturnType<typeof diffState> }): ReactNode {
  if (rows.length === 0) return <p className="panel-empty">Nothing changed in this step.</p>;
  return (
    <table className="diff">
      <caption>What this step changed</caption>
      <thead>
        <tr>
          <th scope="col">Path</th>
          <th scope="col">Before</th>
          <th scope="col">After</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.path}>
            <th scope="row">
              <code>{row.path}</code>
            </th>
            <td>
              <code>{short(row.before)}</code>
            </td>
            <td>
              <code>{short(row.after)}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ---------------------------------------------------------------------------

interface ModeProps {
  selected: string | null;
  onSelect: (id: string | null) => void;
  /** False until the island has hydrated, which is what disables the controls. */
  ready: boolean;
}

function LiveMode(props: ModeProps): ReactNode {
  return (
    <WizardProvider flow={flowA} registry={registryA} data={{ payer: 'business' }}>
      <LiveInstrument {...props} />
    </WizardProvider>
  );
}

function LiveInstrument({ selected, onSelect, ready }: ModeProps): ReactNode {
  const wizard = useWizard();
  const { canBack, isBusy } = useNavigation();
  const { current, active, breadcrumbs } = useStep();
  const errors = useErrors();
  const [payer, setPayer] = useField<string>('payer');
  const [ended, setEnded] = useState(false);

  const field = (current === null ? undefined : FIELDS[current]) ?? FALLBACK_FIELD;
  const [value, setValue] = useField<string>(field.path);
  const refused = Object.keys(errors).length > 0;
  const standing = current ?? active[0] ?? null;

  const view = useMemo<GraphView>(
    () => ({ standing, breadcrumbs, refused, ended }),
    [standing, breadcrumbs, refused, ended]
  );

  // A `when` can exclude the step the flow is standing on, and the engine does
  // not move itself. The hero decides the same way, through the same function.
  const reroute = rerouteTo(current, active);
  useEffect(() => {
    if (reroute === null || ended) return;
    void wizard.go(reroute);
  }, [reroute, ended, wizard]);

  const onNext = useCallback(async () => {
    if (ended) {
      wizard.reset({ payer });
      setEnded(false);
      await wizard.start();
      return;
    }
    const result = await wizard.next();
    if (result.ok) setEnded(result.to === END);
  }, [ended, wizard, payer]);

  const node = nodeOf(exampleGraph, selected);
  // `useErrors` is the current step's errors, so they belong to the selected
  // node only when the flow is standing on it.
  const stepErrors = selected !== null && selected === current ? errors : {};

  return (
    <>
      <Stage
        graph={exampleGraph}
        active={active}
        view={view}
        label={flowA.id}
        selected={selected}
        onSelect={onSelect}
        panel={
          <>
            <form
              className="live-form"
              onSubmit={(event) => {
                event.preventDefault();
                void onNext();
              }}
            >
              <div className="field">
                <span className="field-label" id="inspector-payer">
                  Payer type
                </span>
                <div className="segmented" role="group" aria-labelledby="inspector-payer">
                  {['personal', 'business'].map((choice) => (
                    <button
                      key={choice}
                      type="button"
                      disabled={!ready}
                      aria-pressed={payer === choice}
                      onClick={() => {
                        setPayer(choice);
                        setEnded(false);
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
                  disabled={!ready || ended}
                  placeholder={ended ? 'end reached' : field.placeholder}
                  autoComplete="off"
                  aria-invalid={errors[field.path] !== undefined}
                  onChange={(event) => {
                    setValue(event.target.value);
                    if (refused && current !== null) wizard.setErrors(current, null);
                  }}
                />
              </label>

              <div className="actions">
                <button className="button button-accent" type="submit" disabled={!ready || isBusy}>
                  {ended ? 'Restart' : 'Next'}
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  disabled={!ready || !canBack || isBusy}
                  onClick={() => void wizard.back()}
                >
                  Back
                </button>
              </div>
            </form>

            <NodeCard node={node}>
              {Object.keys(stepErrors).length > 0 && (
                <p className="node-refusal">
                  Refused: <code>{short(stepErrors)}</code>
                </p>
              )}
            </NodeCard>
          </>
        }
      />
      <p className="stage-status" aria-live="polite">
        {ready
          ? ended
            ? 'end reached — Next restarts the flow'
            : `route: ${[...active, 'end'].join(' → ')}`
          : 'starting'}
      </p>
    </>
  );
}

// ---------------------------------------------------------------------------

function ReplayMode({ selected, onSelect, ready }: ModeProps): ReactNode {
  const [at, setAt] = useState(exampleFrames.length - 1);
  const frame = exampleFrames[Math.min(at, exampleFrames.length - 1)];
  const previous = at > 0 ? exampleFrames[at - 1] : undefined;

  if (frame === undefined) return <p className="panel-empty">This recording has no frames.</p>;

  const rows = previous === undefined ? [] : diffState(previous.state, frame.state);

  return (
    <>
      <Stage
        graph={exampleGraph}
        active={frame.active}
        view={frame.view}
        label={flowA.id}
        selected={selected}
        onSelect={onSelect}
        panel={
          <>
            <NodeCard node={nodeOf(exampleGraph, selected)} />
            <Diff rows={rows} />
          </>
        }
      />

      <div className="scrubber">
        <button
          type="button"
          className="button button-secondary"
          disabled={!ready || at === 0}
          onClick={() => setAt((n) => Math.max(0, n - 1))}
        >
          <span aria-hidden="true">◀</span> Previous
        </button>
        <label className="scrubber-track">
          <span className="visually-hidden">Frame of the recorded run</span>
          <input
            type="range"
            min={0}
            max={exampleFrames.length - 1}
            step={1}
            value={at}
            disabled={!ready}
            onChange={(event) => setAt(Number(event.target.value))}
          />
        </label>
        <button
          type="button"
          className="button button-secondary"
          disabled={!ready || at === exampleFrames.length - 1}
          onClick={() => setAt((n) => Math.min(exampleFrames.length - 1, n + 1))}
        >
          Next <span aria-hidden="true">▶</span>
        </button>
      </div>
      <p className="stage-status" aria-live="polite">
        {ready ? `frame ${at + 1} of ${exampleFrames.length} — ${frame.caption}` : 'loading'}
      </p>
    </>
  );
}

// ---------------------------------------------------------------------------

function PreviewMode({
  selected,
  onSelect,
  result,
  flow,
}: ModeProps & { result: ReadResult; flow: FlowDefinition | null }): ReactNode {
  if (flow === null) {
    return (
      <p className="panel-empty">
        Nothing to draw yet. Paste a flow below, or <span className="muted">load the example</span>{' '}
        to put one in the box.
      </p>
    );
  }

  const graph = buildGraph(flow);
  // Upcoming, not absent: a node missing from the breadcrumbs is one whose
  // `when` is false, and without data nothing is false. `active` stays empty so
  // no edge is drawn as the one a run would take, because no run is happening.
  const breadcrumbs = graph.nodes
    .filter((node) => node.kind !== 'end')
    .map((node) => ({ id: node.id, status: 'upcoming' as const }));

  return (
    <>
      <Stage
        graph={graph}
        active={[]}
        view={{ standing: null, breadcrumbs, refused: false, ended: false }}
        label={flow.id}
        selected={selected}
        onSelect={onSelect}
        panel={<NodeCard node={nodeOf(graph, selected)} />}
      />
      <p className="stage-status">
        structure preview — no registry, nothing runs
        {result.problems.length > 0 && ' · showing the last valid flow'}
      </p>
    </>
  );
}

// ---------------------------------------------------------------------------

/**
 * The graph and the panel beside it.
 *
 * The panel is a `<details>` at every width and its summary is hidden on a wide
 * screen: below that the panel is a sheet a reader opens and closes, and a
 * native disclosure returns focus to its own summary on dismissal without a
 * line of focus management.
 */
function Stage({
  graph,
  active,
  view,
  label,
  selected,
  onSelect,
  panel,
}: {
  graph: ReturnType<typeof buildGraph>;
  active: readonly string[];
  view: GraphView;
  label: string;
  selected: string | null;
  onSelect: (id: string | null) => void;
  panel: ReactNode;
}): ReactNode {
  const [full, setFull] = useState(false);

  return (
    <div className={`stage${full ? ' stage-full' : ''}`}>
      <figure className="stage-graph">
        <figcaption className="stage-graph-head">
          <span>{label}</span>
          <button
            type="button"
            className="button button-quiet stage-expand"
            onClick={() => setFull((on) => !on)}
          >
            {full ? 'Close graph' : 'View graph'}
          </button>
        </figcaption>
        {/* ponytail: the frame scrolls rather than zooms. Dragging to pan and a
            zoom control would be a hundred lines of pointer maths for what a
            scroll container already does with a finger, a wheel and a keyboard —
            and scaling a graph up is what voided the design system once already
            (`site/DESIGN.md`). Revisit only if a real flow needs to be read at a
            width where scrolling genuinely fails. */}
        <div className="frame">
          <FlowGraph
            graph={graph}
            active={active}
            view={view}
            direction="row"
            label={label}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
      </figure>

      <details className="stage-panel" open>
        <summary>Step detail</summary>
        <div className="stage-panel-body">{panel}</div>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------------------

const EXAMPLE_JSON = JSON.stringify(flowA, null, 2);

export default function Inspector(): ReactNode {
  const [mode, setMode] = useState<Mode>('live');
  const [selected, setSelected] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [result, setResult] = useState<ReadResult>({ flow: null, problems: [], empty: true });
  // Kept across a failed paste on purpose: a reader who breaks the JSON keeps
  // the picture they had, and the problems are listed under the box.
  const [lastValid, setLastValid] = useState<FlowDefinition | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  // Why Replay is not offered for a pasted flow, in the checker's own words
  // rather than a sentence written here that could stop being true.
  const replayProblem = useMemo(() => {
    if (mode !== 'preview' || lastValid === null) return null;
    return checkSession(recordingA, lastValid)[0]?.message ?? null;
  }, [mode, lastValid]);

  const submit = useCallback(() => {
    const read = readFlow(text);
    setResult(read);
    if (read.flow !== null) {
      setLastValid(read.flow);
      setSelected(null);
      setMode('preview');
    }
  }, [text]);

  const choose = (next: Mode): void => {
    setMode(next);
    setSelected(null);
  };

  const modes: readonly { id: Mode; label: string; hint?: string }[] = [
    { id: 'live', label: 'Live' },
    {
      id: 'replay',
      label: 'Replay',
      ...(replayProblem === null ? {} : { hint: replayProblem }),
    },
    { id: 'preview', label: 'Preview' },
  ];

  return (
    <div className="inspector">
      <div className="inspector-modes">
        <span className="field-label" id="inspector-mode">
          How to look at this flow
        </span>
        {/* A group of pressed buttons, not a tablist. The site already toggles
            this way in the hero, and the ARIA tab pattern owes a reader arrow
            keys between the tabs — a contract worth signing only where the
            widget is genuinely a set of tabs. */}
        <div className="segmented" role="group" aria-labelledby="inspector-mode">
          {modes.map((entry) => {
            const disabled = entry.id === 'replay' && replayProblem !== null;
            return (
              <button
                key={entry.id}
                type="button"
                aria-pressed={mode === entry.id}
                disabled={disabled}
                {...(entry.hint === undefined ? {} : { title: entry.hint })}
                onClick={() => {
                  choose(entry.id);
                }}
              >
                {entry.label}
              </button>
            );
          })}
        </div>
        {replayProblem !== null && <p className="mode-reason">Replay is off: {replayProblem}</p>}
      </div>

      <div className="inspector-stage">
        {mode === 'live' && <LiveMode selected={selected} onSelect={setSelected} ready={ready} />}
        {mode === 'replay' && (
          <ReplayMode selected={selected} onSelect={setSelected} ready={ready} />
        )}
        {mode === 'preview' && (
          <PreviewMode
            selected={selected}
            onSelect={setSelected}
            ready={ready}
            result={result}
            flow={lastValid}
          />
        )}
      </div>

      <details className="paste-drawer">
        <summary>Paste your own flow</summary>
        <div className="paste-body">
          <label htmlFor="paste-box">
            A flow is JSON. Nothing here evaluates it — the preview draws its structure.
          </label>
          <textarea
            id="paste-box"
            spellCheck={false}
            rows={10}
            value={text}
            placeholder={EXAMPLE_JSON.slice(0, 220)}
            onChange={(event) => setText(event.target.value)}
          />
          <div className="paste-actions">
            <button type="button" className="button button-accent" onClick={submit}>
              Draw this flow
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setText(EXAMPLE_JSON)}
            >
              Load example
            </button>
          </div>

          {result.problems.length > 0 && (
            <div className="paste-problems" role="alert">
              <p>This flow was not drawn:</p>
              <ul>
                {result.problems.map((problem) => (
                  <li key={`${problem.path}:${problem.message}`}>
                    <code>{problem.path}</code> — {problem.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </details>
    </div>
  );
}
