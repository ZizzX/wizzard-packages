/**
 * The route walk is recorded by the engine, so these run the real R-A flow and
 * check what came out, not a fixture of what the walk was once believed to be.
 */
import { buildGraph } from '@wizzard-packages/core/graph';
import { describe, expect, it } from 'vitest';

import { flowA, registryA } from '../../../contract/fixtures';
import { nodeState } from '../components/FlowGraph';
import { subFlows, trip } from '../theater/trip.flow';

import {
  polylineLength,
  reason,
  recordWalk,
  scoutBeats,
  walkBeats,
  type Beat,
  type Scout,
} from './walk';

const graph = buildGraph(flowA);
const personal = { payer: 'personal', email: 'ada@example.com' };

describe('recordWalk', () => {
  it('walks R-A under personal from Details past Company to the end', async () => {
    const frames = await recordWalk(flowA, personal, registryA);
    expect(frames.map((frame) => frame.standing)).toEqual(['details', 'payment', 'payment']);
    expect(frames.map((frame) => frame.ended)).toEqual([false, false, true]);
  });

  it('ends on the frame the row draws at rest', async () => {
    const frames = await recordWalk(flowA, personal, registryA);
    const last = frames.at(-1);
    if (last === undefined) throw new Error('no frames');
    const states = graph.nodes.map((node) => [node.id, nodeState(node.id, node.kind, last)]);
    expect(Object.fromEntries(states)).toEqual({
      details: 'visited',
      company: 'skipped',
      payment: 'visited',
      '@end': 'done',
    });
  });

  it('fails the build, naming the step, when the data cannot pass a validator', async () => {
    await expect(recordWalk(flowA, { payer: 'personal' }, registryA)).rejects.toThrow(
      /signup was refused on details/
    );
  });
});

describe('walkBeats', () => {
  const beats = async (data: Record<string, unknown>) =>
    walkBeats(await recordWalk(flowA, data, registryA), graph, data);

  it('probes and breaks Company between Details lighting and Payment lighting', async () => {
    const walk = await beats(personal);
    const details = walk.steps.details;
    const payment = walk.steps.payment;
    const company = walk.dropped.company;
    if (details === undefined || payment === undefined || company === undefined) {
      throw new Error('missing beats');
    }
    expect(company.from).toBe('details');
    expect(details.on.to).toBeLessThanOrEqual(company.beat.from);
    expect(company.beat.to).toBeLessThanOrEqual(payment.on.from);
    expect(Object.keys(walk.runs)).toEqual(['details->payment', 'payment->@end']);
  });

  it('shows the condition with the data in it, turned round because it failed', async () => {
    const walk = await beats(personal);
    expect(walk.dropped.company?.reason).toBe('"personal" != "business"');
  });

  it('keeps every beat inside the walk, in walk order', async () => {
    const walk = await beats(personal);
    const all: Beat[] = [
      ...Object.values(walk.steps).flatMap((step) => [step.on, step.off]),
      ...Object.values(walk.dropped).map((step) => step.beat),
      ...Object.values(walk.runs),
      walk.finish,
      walk.ring,
    ];
    for (const beat of all) {
      expect(beat.from).toBeGreaterThanOrEqual(0);
      expect(beat.to).toBeLessThanOrEqual(1);
      expect(beat.from).toBeLessThan(beat.to);
    }
    expect(walk.ring.to).toBe(1);
  });

  it('has nothing to probe when Company is on the route', async () => {
    const walk = await beats({ payer: 'business', email: 'ada@example.com' });
    expect(walk.dropped).toEqual({});
    expect(Object.keys(walk.steps)).toEqual(['details', 'company', 'payment']);
  });
});

describe('reason', () => {
  it('prints a passing condition as substituted, without turning it round', () => {
    expect(reason({ $eq: [{ $get: 'data.payer' }, 'business'] }, { payer: 'business' })).toBe(
      '"business" == "business"'
    );
  });

  it('has nothing to say about a step with no condition', () => {
    expect(reason(undefined, {})).toBeNull();
  });

  it('prints a list by its length, since its items do not fit in a node', () => {
    const people = { $not: { $empty: { $get: 'data.passengers' } } };
    expect(reason(people, { passengers: [{ id: 'p1' }, { id: 'p2' }] })).toBe('!empty([2 items])');
    expect(reason(people, { passengers: [{ id: 'p1' }] })).toBe('!empty([1 item])');
    expect(reason(people, { passengers: [] })).toBe('!empty([])');
  });
});

describe('scoutBeats', () => {
  const tripGraph = buildGraph(trip, subFlows);
  const plain = ['route', 'people', 'payment'];
  const business = ['route', 'people', 'company', 'payment'];
  const two = [{ id: 'p1' }, { id: 'p2' }];

  const scout = (
    before: readonly string[],
    after: readonly string[],
    data: Record<string, unknown>,
    standing = 'route'
  ): Scout => {
    const beats = scoutBeats(tripGraph, before, after, standing, data);
    if (beats === null) throw new Error('no scout');
    return beats;
  };

  it('heals Company when the trip becomes a business trip, and the comet runs into it', () => {
    const beats = scout(plain, business, { passengers: two, business: true });
    expect(beats.probes).toEqual({
      company: { beat: expect.anything(), from: 'people', reason: 'true == true', heals: true },
    });
    expect(Object.keys(beats.runs)).toEqual([
      'route->people',
      'people->company',
      'company->payment',
      'payment->@end',
    ]);
    const into = beats.runs['people->company'];
    expect(beats.probes.company?.beat.to).toBeLessThanOrEqual(into?.from ?? -1);
  });

  it('breaks Company when the box is unticked, and the comet takes the bypass', () => {
    const beats = scout(business, plain, { passengers: two, business: false });
    expect(beats.probes).toEqual({
      company: { beat: expect.anything(), from: 'people', reason: 'false != true', heals: false },
    });
    expect(Object.keys(beats.runs)).toEqual(['route->people', 'people->payment', 'payment->@end']);
    expect(beats.probes.company?.beat.to).toBeLessThanOrEqual(
      beats.runs['people->payment']?.from ?? -1
    );
  });

  it('breaks the passenger group when the travellers go to zero', () => {
    const beats = scout(plain, ['route', 'payment'], { passengers: [] });
    expect(beats.probes).toEqual({
      people: { beat: expect.anything(), from: 'route', reason: '!empty([])', heals: false },
    });
  });

  it('flips the edges at the probe, and glows every step it reaches without the one it left', () => {
    const beats = scout(plain, business, { passengers: two, business: true });
    expect(beats.before).toEqual(plain);
    expect(beats.flip).toEqual(beats.probes.company?.beat);
    expect(Object.keys(beats.glows)).toEqual(['people', 'company', 'payment']);
  });

  it('probes two steps that change sides at once in route order, and flips at the first', () => {
    const beats = scout(plain, ['route', 'company', 'payment'], { passengers: [], business: true });
    const people = beats.probes.people;
    const company = beats.probes.company;
    expect(people?.heals).toBe(false);
    expect(company?.heals).toBe(true);
    expect(people?.beat.to).toBeLessThanOrEqual(company?.beat.from ?? -1);
    expect(beats.flip).toEqual(people?.beat);
  });

  it('keeps every beat inside the scout, and ends on the ring', () => {
    const beats = scout(plain, business, { passengers: two, business: true });
    const all: Beat[] = [
      ...Object.values(beats.glows),
      ...Object.values(beats.probes).map((step) => step.beat),
      ...Object.values(beats.runs),
      beats.flip,
      beats.ring,
    ];
    for (const beat of all) {
      expect(beat.from).toBeGreaterThanOrEqual(0);
      expect(beat.to).toBeLessThanOrEqual(1);
      expect(beat.from).toBeLessThan(beat.to);
    }
    expect(beats.ring.to).toBe(1);
  });

  it('has nothing to scout when no step ahead of the form changed sides', () => {
    expect(scoutBeats(tripGraph, plain, business, 'payment', { business: true })).toBeNull();
  });

  it('has nothing to scout from when the form stands off the route', () => {
    expect(scoutBeats(tripGraph, business, plain, 'company', { business: false })).toBeNull();
  });
});

describe('polylineLength', () => {
  it('sums the segments of an axis-aligned route', () => {
    expect(
      polylineLength([
        [160, 20],
        [184, 20],
        [184, 64],
        [392, 64],
        [392, 20],
        [416, 20],
      ])
    ).toBe(344);
  });
});
