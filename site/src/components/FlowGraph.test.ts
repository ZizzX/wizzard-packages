/**
 * The painter's two derivations, against the engine rather than against a fixture
 * of what the engine was once believed to do: `createWizard` on the real R-A
 * flow, and the node and edge states read off its snapshot.
 */
import { describe, expect, it } from 'vitest';
import { createWizard, END } from '@wizzard-packages/core/v1';
import { buildGraph } from '@wizzard-packages/core/graph';
import { flowA, registryA } from '../../../contract/fixtures';
import { edgeLive, nodeState } from './FlowGraph';

const graph = buildGraph(flowA);
const endId = graph.nodes.find((node) => node.kind === 'end')?.id ?? END;

const start = async (payer: string) => {
  const wizard = createWizard({ flow: flowA, registry: registryA, data: { payer } });
  await wizard.start();
  return wizard;
};

const view = (wizard: Awaited<ReturnType<typeof start>>, refused = false, ended = false) => {
  const snapshot = wizard.getSnapshot();
  return {
    standing: snapshot.current ?? snapshot.active[0] ?? null,
    breadcrumbs: snapshot.breadcrumbs,
    refused,
    ended,
  };
};

describe('nodeState', () => {
  it('shows the first reachable step before the engine has started', () => {
    // The frame rendered on the server: `start` runs in a layout effect, which
    // never fires there, so nothing is current and the graph would otherwise
    // paint every node as upcoming.
    const wizard = createWizard({ flow: flowA, registry: registryA, data: { payer: 'personal' } });
    const snapshot = wizard.getSnapshot();
    expect(snapshot.current).toBe(null);
    const at = {
      standing: snapshot.active[0] ?? null,
      breadcrumbs: snapshot.breadcrumbs,
      refused: false,
      ended: false,
    };
    expect(nodeState('details', 'step', at)).toBe('active');
    expect(nodeState('company', 'step', at)).toBe('skipped');
  });

  it('marks a step whose `when` is false as skipped, not upcoming', async () => {
    const wizard = await start('personal');
    const at = view(wizard);
    expect(nodeState('details', 'step', at)).toBe('active');
    expect(nodeState('company', 'step', at)).toBe('skipped');
    expect(nodeState('payment', 'step', at)).toBe('rest');
  });

  it('keeps the step on the route when the payer is a business', async () => {
    const wizard = await start('business');
    expect(nodeState('company', 'step', view(wizard))).toBe('rest');
  });

  it('draws the refused step as blocked rather than active', async () => {
    const wizard = await start('business');
    const result = await wizard.next();
    expect(result).toMatchObject({ ok: false, reason: 'invalid' });
    expect(nodeState('details', 'step', view(wizard, true))).toBe('error');
  });

  it('lights the end node only once the flow has ended', async () => {
    const wizard = await start('personal');
    expect(nodeState(endId, 'end', view(wizard))).toBe('rest');

    wizard.set('email', 'a@b.c');
    await wizard.next();
    // Reaching the end leaves the engine on the last step, so the end is what
    // the result says and not what the snapshot shows. The component tracks it
    // from here, which is what the third argument stands in for.
    const last = await wizard.next();
    expect(last).toMatchObject({ ok: true, to: END });
    expect(wizard.getSnapshot().current).toBe('payment');

    const at = view(wizard, false, true);
    expect(nodeState(endId, 'end', at)).toBe('done');
    expect(nodeState('payment', 'step', at)).toBe('visited');
  });
});

describe('edgeLive', () => {
  it('follows the data: exactly one fall-through edge out of a step is live', async () => {
    for (const payer of ['personal', 'business']) {
      const wizard = await start(payer);
      const { active } = wizard.getSnapshot();
      const live = graph.edges.filter(
        (edge) => edge.from === 'details' && edgeLive(edge, active, endId)
      );
      expect(live).toHaveLength(1);
      expect(live[0]?.to).toBe(payer === 'business' ? 'company' : 'payment');
    }
  });

  it('never lights a back edge', async () => {
    const wizard = await start('business');
    const { active } = wizard.getSnapshot();
    const back = graph.edges.filter((edge) => edge.kind === 'back');
    expect(back.length).toBeGreaterThan(0);
    expect(back.every((edge) => !edgeLive(edge, active, endId))).toBe(true);
  });
});
