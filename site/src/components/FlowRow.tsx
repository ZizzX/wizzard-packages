/**
 * A feature row: a claim, and the flow that makes it true, drawn by the engine
 * from the reference definition the test suite uses.
 *
 * Rendered with no client directive, so a row costs no JavaScript. It is still
 * not an illustration: `createWizard` walks the fixture to the moment the claim
 * is about, and the picture is whatever that walk produced. If the engine's
 * behaviour changed, the row would change with it.
 */
import { buildGraph } from '@wizzard-packages/core/graph';
import { groups } from '@wizzard-packages/core/groups';
import {
  createWizard,
  type AsyncRegistry,
  type FlowDefinition,
  type SubFlows,
} from '@wizzard-packages/core/v1';

import { FlowGraph, type GraphView } from './FlowGraph';

import type { ReactNode } from 'react';

export interface FlowRowProps {
  heading: string;
  children: ReactNode;
  flow: FlowDefinition;
  data: Record<string, unknown>;
  registry?: AsyncRegistry;
  subFlows?: SubFlows;
  /** The line under the graph, naming what the picture is a picture of. */
  note: string;
}

/**
 * Walks the flow with the data given and reads the state off the engine.
 *
 * Synchronous on purpose: `start()` returns a promise, and a component that
 * renders at build time cannot await it, so this reads the derived snapshot the
 * store computes without navigating. That is enough for a resting picture -
 * which steps are reachable, and where the flow would begin.
 */
function walk(
  flow: FlowDefinition,
  data: Record<string, unknown>,
  registry?: AsyncRegistry,
  subFlows?: SubFlows
): { active: readonly string[]; view: GraphView } {
  // The traversal is always installed: a flow with no group step never asks it
  // anything, and one that has a group throws at construction without it.
  const wizard = createWizard({
    flow,
    data,
    groups,
    ...(registry !== undefined && { registry }),
    ...(subFlows !== undefined && { subFlows }),
  });
  const snapshot = wizard.getSnapshot();
  wizard.destroy();
  return {
    active: snapshot.active,
    view: {
      standing: snapshot.current ?? snapshot.active[0] ?? null,
      breadcrumbs: snapshot.breadcrumbs,
      refused: false,
      ended: false,
    },
  };
}

export function FlowRow({
  heading,
  children,
  flow,
  data,
  registry,
  subFlows,
  note,
}: FlowRowProps): ReactNode {
  const graph = buildGraph(flow, subFlows);
  const { active, view } = walk(flow, data, registry, subFlows);

  return (
    <article className="flow-row">
      <div className="flow-row-text">
        <h2>{heading}</h2>
        {children}
      </div>
      <figure className="flow-row-graph">
        <div className="frame">
          <FlowGraph graph={graph} active={active} view={view} direction="row" label={flow.id} />
        </div>
        <figcaption>{note}</figcaption>
      </figure>
    </article>
  );
}
