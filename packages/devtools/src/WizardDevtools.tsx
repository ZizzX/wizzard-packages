'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { buildGraph } from '@wizzard-packages/core/graph';
import type { FlowGraph, GraphNode } from '@wizzard-packages/core/graph';
import { knownFlows } from '@wizzard-packages/core/session';
import type { FlowDefinition, SubFlows, WizardState } from '@wizzard-packages/core/v1';
import { useOptionalWizard } from '@wizzard-packages/react/v1';
import { ActivityView, intentText, outcomeText } from './ActivityView';
import type { ActivityRow } from './ActivityView';
import { GraphBoundary } from './boundary';
import { ExportPreview } from './ExportPreview';
import { FlowGraphView } from './FlowGraphView';
import type { GraphView, LayoutInfo, TakenEdge } from './FlowGraphView';
import { recordSession } from './headless';
import type {
  DevtoolsPlugin,
  PositionedGraph,
  Recorder,
  SessionBundle,
  WizardLike,
} from './headless';
import { Inspector } from './Inspector';
import { noWizard } from './messages';
import { StatePanel } from './StatePanel';
import { CSS } from './styles';
import { useObserved } from './useObserved';

/**
 * The panel. It watches one wizard and answers one question - why is the
 * wizard where it is - with three views over one snapshot: the flow it is
 * standing in, the state it committed, and what it did to get there.
 *
 * It never navigates, never writes and never throws into the host. The three
 * things a person can point at are independent by design (§12.3): the time
 * being observed, the flow being inspected, and the node being examined. A
 * commit moves the first and touches neither of the others, so reading a
 * refusal does not lose the page you were reading it on.
 */

export type Tab = 'graph' | 'state' | 'activity';

export interface WizardDevtoolsProps {
  /** Default: the wizard from `WizardProvider`. */
  wizard?: WizardLike;
  /** The same object passed to `createWizard({ plugins: [dt] })`. Without it, no refusal rows. */
  plugin?: DevtoolsPlugin;
  subFlows?: SubFlows;
  layout?: (graph: FlowGraph) => PositionedGraph;
  /** Runs once, at export, on a copy of the whole bundle. */
  redact?: (bundle: SessionBundle) => SessionBundle;
  onRecord?: (bundle: SessionBundle) => void;
  defaultTab?: Tab;
  limits?: { activity?: number; frames?: number; diffRows?: number };
}

const NARROW = 720;
const LEGEND_KEY = 'wz-devtools-legend';

/**
 * The stack as a line: `root › passengers[p2] › details` (§3.1). Every frame
 * but the last names the group step that contains the next one; the last names
 * the step the wizard is standing on.
 */
const crumbText = (state: WizardState | null, rootId: string): string => {
  if (!state || state.stack.length === 0) return rootId;
  const enclosing = state.stack
    .slice(0, -1)
    .map((frame) => `${frame.step}${frame.key ? `[${frame.key}]` : ''}`);
  const top = state.stack[state.stack.length - 1];
  return [rootId, ...enclosing, top?.step ?? ''].filter(Boolean).join(' › ');
};

/**
 * The flow that owns the top frame, resolved through the stack rather than by
 * name: two sub-flows can share a step id, and `session.ts` documents why a
 * name alone can pick the wrong definition (§14.7).
 */
function resolveFlow(
  root: FlowDefinition,
  state: WizardState | null,
  subFlows: SubFlows | undefined
): FlowDefinition {
  if (!state || state.stack.length < 2) return root;
  const known = knownFlows(root, subFlows);
  const top = state.stack[state.stack.length - 1];
  return (top && known.get(top.flow)) ?? root;
}

/** The edge the wizard is inferred to have taken: only when exactly one joins the two steps. */
function inferTaken(graph: FlowGraph, from: string | null, to: string | null): TakenEdge | null {
  if (!from || !to || from === to) return null;
  const candidates = graph.edges.filter((edge) => edge.from === from && edge.to === to);
  return candidates.length === 1 ? { from, to } : null;
}

export function WizardDevtools({
  wizard: wizardProp,
  plugin,
  subFlows,
  layout,
  redact,
  onRecord,
  defaultTab = 'graph',
  limits,
}: WizardDevtoolsProps): ReactNode {
  const contextWizard = useOptionalWizard();
  const wizard = wizardProp ?? contextWizard;
  const activityCap = limits?.activity ?? 500;
  const observed = useObserved(wizard ?? null, plugin, activityCap);

  const [tab, setTab] = useState<Tab>(defaultTab);
  /** Observed time: a pinned Activity row, or live. */
  const [pinned, setPinned] = useState<ActivityRow | null>(null);
  /** Inspected flow: a crumb the person chose, or the top frame's. */
  const [inspectedFlow, setInspectedFlow] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [inspecting, setInspecting] = useState(false);
  const [view, setView] = useState<GraphView>({ scale: 1, cx: null, cy: null, table: false });
  const [drawing, setDrawing] = useState<LayoutInfo>({
    drawn: 0,
    total: 0,
    width: 0,
    height: 0,
    active: null,
  });
  const [narrow, setNarrow] = useState(false);
  const [recorder, setRecorder] = useState<Recorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);

  const root = useRef<HTMLDivElement>(null);

  /** Container width, not viewport: the panel is docked wherever the host put it (§12.8). */
  useEffect(() => {
    const element = root.current;
    if (!element || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setNarrow(width > 0 && width < NARROW);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try {
      setLegendOpen(sessionStorage.getItem(LEGEND_KEY) === 'open');
    } catch {
      /* a browser that refuses storage keeps the legend closed */
    }
  }, []);

  const onLegendToggle = (open: boolean): void => {
    setLegendOpen(open);
    try {
      sessionStorage.setItem(LEGEND_KEY, open ? 'open' : 'closed');
    } catch {
      /* the legend's state is a convenience, never a failure */
    }
  };

  /** The state being observed: the pinned row's snapshot, or the live one. */
  const observedState: WizardState | null =
    pinned?.kind === 'commit'
      ? pinned.row.state
      : pinned?.kind === 'outcome'
        ? (observed.commits.find((row) => row.rev === pinned.rev)?.state ?? observed.state)
        : observed.state;

  const observedFlowDefinition =
    pinned?.kind === 'commit' ? pinned.row.flow : (observed.flow ?? null);

  const currentFlow = useMemo(
    () =>
      observedFlowDefinition ? resolveFlow(observedFlowDefinition, observedState, subFlows) : null,
    [observedFlowDefinition, observedState, subFlows]
  );

  /** A chosen crumb wins over the top frame until "Follow current flow" clears it. */
  const drawnFlow = useMemo(() => {
    if (!observedFlowDefinition) return null;
    if (!inspectedFlow) return currentFlow;
    return knownFlows(observedFlowDefinition, subFlows).get(inspectedFlow) ?? currentFlow;
  }, [observedFlowDefinition, inspectedFlow, currentFlow, subFlows]);

  const graph = useMemo(
    () => (drawnFlow ? buildGraph(drawnFlow, subFlows) : null),
    [drawnFlow, subFlows]
  );

  const previousState = useMemo(() => {
    if (!observedState) return null;
    const at = observed.commits.findIndex((row) => row.rev === observedState.rev);
    return at > 0 ? (observed.commits[at - 1]?.state ?? null) : null;
  }, [observed.commits, observedState]);

  const activeStep =
    observedState && observedState.stack.length > 0
      ? (observedState.stack[observedState.stack.length - 1]?.step ?? null)
      : null;

  const takenEdge = useMemo(() => {
    if (!graph || !observedState) return null;
    const at = observed.commits.findIndex((row) => row.rev === observedState.rev);
    const before = at > 0 ? observed.commits[at - 1] : undefined;
    return inferTaken(graph, before?.step ?? null, activeStep);
  }, [graph, observed.commits, observedState, activeStep]);

  const selectedNode: GraphNode | null = (graph?.nodes.find((node) => node.id === selected) ??
    null) as GraphNode | null;

  /** Fit is the default view; a graph changes size, so the box follows it. */
  useEffect(() => {
    setView((current) => ({ ...current, scale: 1, cx: null, cy: null }));
  }, [graph]);

  const positionedCentre = useCallback(
    (next: Partial<GraphView>) => setView((current) => ({ ...current, ...next })),
    []
  );

  const frameLimit = limits?.frames;
  const onRecordToggle = useCallback((): void => {
    if (recording) {
      recorder?.stop();
      setRecording(false);
      return;
    }
    if (!wizard) return;
    try {
      const next = recordSession(wizard, {
        ...(plugin ? { plugin } : {}),
        ...(subFlows ? { subFlows } : {}),
        ...(redact ? { redact } : {}),
        ...(frameLimit ? { limits: { frames: frameLimit } } : {}),
      });
      setRecorder(next);
      setRecording(true);
    } catch {
      /* a recorder that cannot start leaves the panel as it was */
    }
  }, [recording, recorder, wizard, plugin, subFlows, redact, frameLimit]);

  if (!wizard) {
    return (
      <div className="wz-panel" ref={root}>
        <style>{CSS}</style>
        <p className="wz-message">{noWizard()}</p>
      </div>
    );
  }

  const pluginProblem: 'absent' | 'not-installed' | null = !plugin
    ? 'absent'
    : !observed.attached ||
        (observed.state !== null && observed.state.rev > 0 && observed.lastRev < observed.state.rev)
      ? 'not-installed'
      : null;

  const latest = observed.outcomes[observed.outcomes.length - 1];
  const newer = observed.commits.filter((row) => row.rev > (observedState?.rev ?? -1)).length;
  const outcomeLine = observed.pending
    ? `… ${intentText(observed.pending.intent)} pending`
    : latest
      ? outcomeText(latest)
      : '— no navigation yet';

  const crumb = crumbText(observedState, observedFlowDefinition?.id ?? '');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'graph', label: 'Graph' },
    { id: 'state', label: 'State' },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <div className="wz-panel" ref={root} data-narrow={narrow ? 'true' : 'false'}>
      <style>{CSS}</style>

      <div className="wz-strip">
        <span>{crumb || '—'}</span>
        <span>·</span>
        <span>
          {pinned
            ? `pinned #${observedState?.rev ?? '?'}${newer > 0 ? ` (+${newer} new)` : ''}`
            : 'live'}
        </span>
        <span>·</span>
        <span className="wz-outcome" aria-live="polite">
          <button
            type="button"
            className={`wz-inline${latest && !latest.result?.ok ? ' wz-refused' : ''}`}
            onClick={() => setTab('activity')}
          >
            {outcomeLine}
          </button>
        </span>
        {observed.destroyed && <span>· destroyed</span>}
        {observed.failure && <span className="wz-message">{observed.failure}</span>}
      </div>

      <div className="wz-toolbar">
        <div role="tablist" aria-label="Devtools views">
          {tabs.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              id={`wz-tab-${entry.id}`}
              aria-selected={tab === entry.id}
              aria-controls={`wz-panel-${entry.id}`}
              tabIndex={tab === entry.id ? 0 : -1}
              onClick={() => setTab(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={onRecordToggle}>
          {recording ? `Stop (${recorder?.frames ?? 0})` : 'Record'}
        </button>
        <button type="button" disabled={!recorder} onClick={() => setExporting(true)}>
          Copy JSON
        </button>
        {pinned && (
          <button type="button" onClick={() => setPinned(null)}>
            Return to live
          </button>
        )}
        {inspectedFlow && (
          <button type="button" onClick={() => setInspectedFlow(null)}>
            Follow current flow
          </button>
        )}
        {tab === 'graph' && (
          <>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => positionedCentre({ scale: view.scale * 1.25 })}
            >
              +
            </button>
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => positionedCentre({ scale: Math.max(0.2, view.scale / 1.25) })}
            >
              −
            </button>
            <button
              type="button"
              onClick={() => positionedCentre({ scale: 1, cx: null, cy: null })}
            >
              Fit
            </button>
            <button
              type="button"
              disabled={!drawing.active}
              onClick={() =>
                positionedCentre({
                  scale: Math.max(1, view.scale),
                  cx: drawing.active?.[0] ?? null,
                  cy: drawing.active?.[1] ?? null,
                })
              }
            >
              Center
            </button>
            <button
              type="button"
              aria-pressed={view.table}
              onClick={() => positionedCentre({ table: !view.table })}
            >
              Table
            </button>
            {drawing.total > drawing.drawn && (
              <span className="wz-density">
                {drawing.drawn} of {drawing.total} edges drawn (dense graph)
              </span>
            )}
            <details
              className="wz-legend"
              open={legendOpen}
              onToggle={(event) => onLegendToggle((event.currentTarget as HTMLDetailsElement).open)}
            >
              <summary>Legend</summary>
              <ul>
                <li>rounded box: step</li>
                <li>double border: group</li>
                <li>stacked box: repeat group</li>
                <li>dashed box: unresolved group</li>
                <li>circle: end</li>
                <li>solid line: next</li>
                <li>grey line: order</li>
                <li>dashed line: back</li>
                <li>red line: dangling</li>
                <li>filled: active</li>
                <li>solid outline: visited</li>
                <li>ring: selected</li>
              </ul>
            </details>
          </>
        )}
      </div>

      <div className="wz-body">
        <div
          className="wz-content"
          role="tabpanel"
          id={`wz-panel-${tab}`}
          aria-labelledby={`wz-tab-${tab}`}
        >
          {exporting && recorder ? (
            <ExportPreview
              recorder={recorder}
              hasRedact={Boolean(redact)}
              hasPlugin={Boolean(plugin)}
              onClose={() => setExporting(false)}
              {...(onRecord ? { onRecord } : {})}
            />
          ) : tab === 'graph' ? (
            <GraphBoundary resetKey={graph}>
              {graph ? (
                <FlowGraphView
                  graph={graph}
                  {...(layout ? { layout } : {})}
                  view={view}
                  activeStep={inspectedFlow ? null : activeStep}
                  visited={observedState?.visited ?? []}
                  takenEdge={inspectedFlow ? null : takenEdge}
                  selected={selected}
                  onSelect={(id) => {
                    setSelected(id);
                    if (id === null) setInspecting(false);
                  }}
                  onInspect={(id) => {
                    setSelected(id);
                    setInspecting(true);
                  }}
                  onLayout={setDrawing}
                />
              ) : (
                <p className="wz-note">no flow to draw</p>
              )}
            </GraphBoundary>
          ) : tab === 'state' ? (
            <StatePanel
              state={observedState}
              previous={previousState}
              crumb={crumb}
              cap={limits?.diffRows ?? 200}
            />
          ) : (
            <ActivityView
              commits={observed.commits}
              dropped={observed.dropped}
              outcomes={observed.outcomes}
              pending={observed.pending}
              pluginProblem={pluginProblem}
              selected={pinned?.key ?? null}
              onSelect={setPinned}
              destroyed={observed.destroyed}
              cap={activityCap}
            />
          )}
        </div>
        {inspecting && graph && selectedNode && (
          <Inspector
            node={selectedNode}
            graph={graph}
            state={observedState}
            observing={pinned ? `pinned #${observedState?.rev ?? '?'}` : 'live'}
            crumb={crumb}
            inGroup={(observedState?.stack.length ?? 0) > 1}
            onClose={() => setInspecting(false)}
            onOpenSubFlow={(flowId) => {
              setInspectedFlow(flowId);
              setInspecting(false);
              setSelected(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
