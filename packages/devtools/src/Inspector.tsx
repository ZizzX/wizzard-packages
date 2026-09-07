import type { ReactNode } from 'react';
import type { FlowGraph, GraphNode } from '@wizzard-packages/core/graph';
import { isSync, test } from '@wizzard-packages/core/v1';
import type { WizardState } from '@wizzard-packages/core/v1';
import { formatExpr } from './headless';

/**
 * The node inspector. It reads the observed state - live, or the pinned row's
 * snapshot - and says which, because a `when` that reads `data.plan` answers
 * differently at two revisions and a person comparing them has to know which
 * one they are looking at (§12.16).
 */

export interface InspectorProps {
  node: GraphNode | null;
  graph: FlowGraph;
  /** The state the panel is observing; null before the first commit. */
  state: WizardState | null;
  /** How the observed state was reached, for the status line. */
  observing: string;
  crumb: string;
  /** True inside a repeat group: no loop scope exists to evaluate `when` against. */
  inGroup: boolean;
  onClose: () => void;
  /** Draws the group's sub-flow instead. Absent when the group is opaque. */
  onOpenSubFlow?: (flowId: string) => void;
}

/**
 * Whether a `when` holds, using the observed state and the engine's own
 * evaluator - devtools does not re-implement one, or the panel and the wizard
 * would disagree about the same expression.
 *
 * Three answers, and the third is not a hedge. Inside a repeat group there is
 * no loop scope to evaluate against, and a `$ref` needs a registry the panel
 * does not have; both print `Not evaluated` rather than `false`, which would
 * read as "this step is skipped" (§12.7).
 */
function whenValue(
  node: GraphNode,
  state: WizardState | null,
  inGroup: boolean
): 'true' | 'false' | 'Not evaluated' {
  if (!state || inGroup || !node.when || !isSync(node.when)) return 'Not evaluated';
  try {
    return test(node.when, { data: { ...state.data }, ctx: { ...state.ctx } }) ? 'true' : 'false';
  } catch {
    /* an expression the engine refuses here is one the panel does not claim to know */
    return 'Not evaluated';
  }
}

export function Inspector({
  node,
  graph,
  state,
  observing,
  crumb,
  inGroup,
  onClose,
  onOpenSubFlow,
}: InspectorProps): ReactNode {
  if (!node) return null;

  const incoming = graph.edges.filter((edge) => edge.to === node.id);
  const outgoing = graph.edges.filter((edge) => edge.from === node.id);
  const status =
    state && state.stack[state.stack.length - 1]?.step === node.id
      ? 'active'
      : state?.visited.includes(node.id)
        ? 'visited'
        : 'unvisited';

  const edgeLine = (
    edge: { from: string; to: string; kind: string; when?: unknown; dangling?: boolean },
    direction: 'in' | 'out'
  ): string => {
    const other = direction === 'in' ? edge.from : edge.to;
    const when = edge.when ? ` when ${formatExpr(edge.when as never, 200).full}` : '';
    return `${edge.kind} ${direction === 'in' ? '←' : '→'} ${other}${edge.dangling ? ' (dangling)' : ''}${when}`;
  };

  return (
    <aside className="wz-inspector" aria-label={`Inspector: ${node.id}`}>
      <header>
        <h3>{node.label ?? node.id}</h3>
        <button type="button" onClick={onClose} aria-label="Close inspector">
          Close
        </button>
      </header>
      <dl>
        <dt>kind</dt>
        <dd>{node.kind}</dd>
        <dt>flow</dt>
        <dd>{crumb || '—'}</dd>
        <dt>status</dt>
        <dd>
          {status} · {observing}
        </dd>
        {node.when && (
          <>
            <dt>when</dt>
            <dd>
              {formatExpr(node.when, 200).full} → {whenValue(node, state, inGroup)}
            </dd>
          </>
        )}
        {node.deferred && (
          <>
            <dt>deferred</dt>
            <dd>the body arrives from the host</dd>
          </>
        )}
        {node.group && (
          <>
            <dt>sub-flow</dt>
            <dd>
              {node.group.flowId}
              {node.group.graph ? ` · ${node.group.graph.nodes.length} steps` : ''}
              {node.group.opaque ? ` · ${node.group.opaque}` : ''}
            </dd>
            {node.group.repeat && (
              <>
                <dt>repeat over</dt>
                <dd>{formatExpr(node.group.repeat, 200).full}</dd>
              </>
            )}
          </>
        )}
        <dt>edges in</dt>
        <dd>{incoming.length === 0 ? '—' : incoming.map((e) => edgeLine(e, 'in')).join('; ')}</dd>
        <dt>edges out</dt>
        <dd>{outgoing.length === 0 ? '—' : outgoing.map((e) => edgeLine(e, 'out')).join('; ')}</dd>
      </dl>
      {node.group && !node.group.opaque && onOpenSubFlow && (
        <button type="button" onClick={() => onOpenSubFlow(node.group?.flowId ?? '')}>
          Open sub-flow
        </button>
      )}
    </aside>
  );
}
