// @vitest-environment node
import { groups } from '@wizzard-packages/core/groups';
import { checkSession } from '@wizzard-packages/core/session';
import { createWizard } from '@wizzard-packages/core/v1';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import {
  dataA,
  dataB,
  dataC,
  flowA,
  flowB,
  flowC,
  registryA,
  registryB,
  subFlowsC,
} from '../../../../contract/fixtures';
import { devtools } from './plugin';
import { recordSession } from './record';

import type { FlowDefinition, SubFlows, Wizard } from '@wizzard-packages/core/v1';
import type { SessionBundle } from './record';

// No DOM anywhere in this file: this is the Node capture the headless entry promises.

const slowRegistry = {
  ...registryA,
  slow: async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return null;
  },
};

const fixtures: {
  flow: FlowDefinition;
  registry: object;
  data: Record<string, unknown>;
  subFlows?: SubFlows;
}[] = [
  { flow: flowA, registry: registryA, data: dataA },
  { flow: flowB, registry: registryB, data: dataB },
  { flow: flowC, registry: {}, data: dataC('p1', 'p2'), subFlows: subFlowsC },
];

const make = (f: (typeof fixtures)[number]): Wizard =>
  createWizard({
    flow: f.flow,
    registry: f.registry as never,
    data: f.data,
    ...(f.subFlows && { subFlows: f.subFlows, groups }),
  });

type Op =
  | { op: 'next' }
  | { op: 'back' }
  | { op: 'go'; to: string }
  | { op: 'set'; path: string; value: unknown };

const ops = (flow: FlowDefinition): fc.Arbitrary<Op[]> =>
  fc.array(
    fc.oneof(
      fc.constant<Op>({ op: 'next' }),
      fc.constant<Op>({ op: 'back' }),
      fc.record({
        op: fc.constant('go' as const),
        to: fc.constantFrom(...Object.keys(flow.steps)),
      }),
      fc.record({
        op: fc.constant('set' as const),
        path: fc.constantFrom('email', 'plan', 'payer', 'note'),
        value: fc.constantFrom('pro', 'business', 'x@y', 1, null),
      })
    ),
    { maxLength: 12 }
  );

describe('recordSession', () => {
  it('property: any sequence of moves on A, B or C records a session checkSession accepts', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...fixtures),
        fc.integer({ min: 0, max: 2 }),
        async (fixture, pick) => {
          const chosen = fixtures[pick] ?? fixture;
          const sequence = fc.sample(ops(chosen.flow), 1)[0] ?? [];
          const w = make(chosen);
          const dt = devtools();
          const rec = recordSession(w, { plugin: dt, subFlows: chosen.subFlows });
          await w.start();
          for (const step of sequence) {
            if (step.op === 'set') w.set(step.path, step.value);
            else if (step.op === 'go') await w.go(step.to);
            else await w[step.op]();
          }
          rec.stop();
          const bundle = rec.bundle();
          expect(bundle.session.frames.every((f) => f.status !== 'busy')).toBe(true);
          expect(checkSession(bundle.session, chosen.flow, chosen.subFlows)).toEqual([]);
          expect(bundle.version).toBe(1);
        }
      ),
      { numRuns: 40 }
    );
  });

  it('captures the planted refusal of flowA from Node, with the plugin, and passes checkSession', async () => {
    const dt = devtools();
    const w = createWizard({ flow: flowA, registry: registryA, data: dataA, plugins: [dt] });
    const rec = recordSession(w, { plugin: dt });
    await w.start();
    await w.next();
    rec.stop();
    const bundle = rec.bundle();

    expect(bundle.outcomes.map((o) => [o.source, o.result?.ok])).toEqual([
      ['start', true],
      ['call', false],
    ]);
    expect(bundle.outcomes[1]?.result).toMatchObject({
      reason: 'invalid',
      errors: { email: 'required' },
    });
    expect(bundle.meta).toMatchObject({
      frames: 3,
      outcomes: 2,
      redacted: false,
      capped: false,
      stopped: null,
    });
    expect(bundle.meta.bytes).toBeGreaterThan(100);
    expect(checkSession(bundle.session, flowA)).toEqual([]);
  });

  it('records settled frames only: one per landing, none for the busy write', async () => {
    const w = createWizard({ flow: flowA, registry: registryA, data: { ...dataA, email: 'a@b' } });
    const rec = recordSession(w);
    await w.start();
    await w.next();
    rec.stop();
    expect(rec.bundle().session.frames.map((f) => [f.status, f.stack[0]?.step])).toEqual([
      ['init', undefined],
      ['idle', 'details'],
      ['idle', 'company'],
    ]);
  });

  it('stops at the frame cap and at the outcome cap, and says which', async () => {
    const w = createWizard({ flow: flowA, registry: registryA, data: dataA });
    const byFrames = recordSession(w, { limits: { frames: 2 } });
    await w.start();
    w.set('note', 1);
    w.set('note', 2);
    expect(byFrames.stopped).toBe(true);
    expect(byFrames.capped).toBe('frames');
    expect(byFrames.bundle().session.frames).toHaveLength(2);

    const dt = devtools();
    const w2 = createWizard({ flow: flowA, registry: registryA, data: dataA, plugins: [dt] });
    const byOutcomes = recordSession(w2, { plugin: dt, limits: { outcomes: 2 } });
    await w2.start();
    await w2.next();
    await w2.next();
    expect(byOutcomes.capped).toBe('outcomes');
    expect(byOutcomes.bundle().outcomes).toHaveLength(2);
    expect(byOutcomes.bundle().meta.capped).toBe('outcomes');
  });

  it('ends the recording when the flow changes and says so', async () => {
    const w = createWizard({ flow: flowA, registry: registryA, data: dataA });
    const rec = recordSession(w);
    await w.start();
    w.patchFlow({ steps: { extra: { label: 'Extra' } } });
    w.set('note', 1);
    expect(rec.stopped).toBe(true);
    const bundle = rec.bundle();
    expect(bundle.meta.stopped).toBe('flow-changed');
    expect(bundle.flow).toEqual(flowA); // the flow as recorded, not the patched one
    expect(bundle.session.frames).toHaveLength(2);
  });

  it('gives the redactor a copy: a mutating hook changes neither the wizard nor the frames', async () => {
    const w = createWizard({ flow: flowA, registry: registryA, data: { ...dataA, card: '4111' } });
    const rec = recordSession(w, {
      redact: (b) => {
        for (const f of b.session.frames) delete (f.data as Record<string, unknown>).card;
        (b.flow as { id: string }).id = 'changed';
        return b;
      },
    });
    await w.start();
    rec.stop();
    const bundle = rec.bundle();

    expect(bundle.session.frames.every((f) => !('card' in f.data))).toBe(true);
    expect(bundle.meta.redacted).toBe(true);
    expect(w.getState().data.card).toBe('4111');
    expect(flowA.id).toBe('signup');
    expect(rec.bundle().session.frames[0]?.data.card).toBeUndefined(); // redact runs on a fresh copy each time
    expect(w.getState().data.card).toBe('4111');
  });

  it('refuses to export when redact throws or returns something else, with the fix in the message', async () => {
    const w = createWizard({ flow: flowA, registry: registryA, data: dataA });
    await w.start();
    const throwing = recordSession(w, {
      redact: () => {
        throw new Error('bad hook');
      },
    });
    expect(() => throwing.bundle()).toThrow(
      /redact threw bad hook.*docs\/errors\.md#devtools-export-failed/
    );
    const wrong = recordSession(w, { redact: () => null as unknown as SessionBundle });
    expect(() => wrong.bundle()).toThrow(/not a SessionBundle/);
  });

  it('keeps every attempt that ends after the recording starts, older pending ones included', async () => {
    const dt = devtools();
    const flow = {
      ...flowA,
      steps: { ...flowA.steps, details: { label: 'Details', validate: { $ref: 'slow' } } },
    };
    const w = createWizard({ flow, registry: slowRegistry, data: dataA, plugins: [dt] });
    await w.start();
    const older = w.next();
    const newer = w.next();
    const rec = recordSession(w, { plugin: dt });
    await Promise.all([older, newer]);
    rec.stop();
    expect(rec.bundle().outcomes.map((o) => o.id)).toEqual([2, 3]);
  });

  it('refuses a redactor result that is only partly a bundle, through the documented error', async () => {
    const w = createWizard({ flow: flowA, registry: registryA, data: dataA });
    await w.start();
    const partial = recordSession(w, {
      redact: (b) => ({ session: b.session }) as unknown as SessionBundle,
    });
    expect(() => partial.bundle()).toThrow(/not a SessionBundle/);
  });

  it('names a non-JSON value as such, not as a circular reference', async () => {
    const w = createWizard({ flow: flowA, registry: registryA, data: { ...dataA, big: 1n } });
    const rec = recordSession(w);
    await w.start();
    expect(() => rec.bundle()).toThrow(/cannot be serialised as JSON \(.*BigInt/);
    expect(() => rec.bundle()).not.toThrow(/circular/);
  });

  it('names a circular reference as the one copy failure', async () => {
    const loop: Record<string, unknown> = {};
    loop.self = loop;
    const w = createWizard({ flow: flowA, registry: registryA, data: { ...dataA, loop } });
    const rec = recordSession(w);
    await w.start();
    expect(() => rec.bundle()).toThrow(/circular reference[\s\S]*Fix the value/);
  });

  it('defers a stop requested before any settled frame exists', async () => {
    const flow = {
      ...flowA,
      steps: { ...flowA.steps, details: { label: 'Details', validate: { $ref: 'slow' } } },
    };
    const w = createWizard({ flow, registry: slowRegistry, data: dataA });
    await w.start();
    const moving = w.next(); // busy from here
    const rec = recordSession(w);
    expect(rec.frames).toBe(0);
    rec.stop();
    expect(rec.stopping).toBe(true);
    expect(rec.stopped).toBe(false);
    await moving;
    expect(rec.stopped).toBe(true);
    expect(rec.frames).toBe(1);
    expect(checkSession(rec.bundle().session, flow)).toEqual([]);
  });
});
