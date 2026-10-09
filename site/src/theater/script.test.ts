/**
 * The hero theater's scenario, played on a bare engine the way the theater plays
 * it. If the engine or the flow changes what a call answers, these fail, rather
 * than the homepage quietly printing a console that no longer tells the truth.
 */
import { createWizard, type Wizard } from '@wizzard-packages/core';
import { buildGraph } from '@wizzard-packages/core/graph';
import { groups } from '@wizzard-packages/core/groups';
import { describe, expect, it } from 'vitest';

import {
  flowUpTo,
  initialData,
  lineOf,
  lines,
  perform,
  printCall,
  scenario,
  summarize,
  type Cue,
} from './script';
import { registry, subFlows, trip } from './trip.flow';

/** Plays `cues` on a fresh wizard and returns what the theater's console would show. */
async function play(cues: readonly Cue[]): Promise<{ wizard: Wizard; transcript: string[] }> {
  const wizard: Wizard = createWizard({
    flow: trip,
    groups,
    subFlows,
    registry,
    data: initialData(),
  });
  await wizard.start();
  const transcript: string[] = [];
  for (const { act } of cues) {
    const line = printCall(act, await perform(wizard, act));
    if (line !== null) transcript.push(line);
  }
  return { wizard, transcript };
}

const ms = (cues: readonly Cue[]): number => cues.reduce((sum, cue) => sum + cue.delay, 0);
const act1 = scenario.filter((cue) => cue.act.kind === 'write');
const act2 = scenario.filter((cue) => cue.act.kind !== 'write');
const writes = scenario.flatMap((cue) => (cue.act.kind === 'write' ? [cue.act] : []));

describe('Act 1', () => {
  it('writes the whole file a line at a time, in about six seconds', () => {
    expect(writes.map((write) => write.upTo)).toEqual(lines.map((_, index) => index + 1));
    expect(ms(act1)).toBeGreaterThanOrEqual(5500);
    expect(ms(act1)).toBeLessThanOrEqual(6500);
  });

  it('adds each trip step on the line its definition starts', () => {
    for (const id of trip.order) {
      expect(writes.find((write) => write.steps.includes(id))?.upTo).toBe(lineOf(`${id}: `) + 1);
    }
  });

  it('can draw a graph at every step it adds, and the last one is the trip itself', () => {
    const stages = writes
      .filter((write, index) => write.steps.length !== (writes[index - 1]?.steps.length ?? 0))
      .map((write) => write.steps);
    expect(stages).toEqual([
      ['route'],
      ['route', 'people'],
      ['route', 'people', 'company'],
      ['route', 'people', 'company', 'payment'],
    ]);
    for (const steps of stages) {
      const ids = buildGraph(flowUpTo(steps), subFlows).nodes.map((node) => node.id);
      expect(ids).toEqual([...steps, '@end']);
    }
    expect(buildGraph(flowUpTo(trip.order), subFlows)).toEqual(buildGraph(trip, subFlows));
  });
});

describe('Act 2, on a bare engine', () => {
  it('prints in the console what the engine answered, from the route to the end', async () => {
    const { wizard, transcript } = await play(scenario);
    expect(transcript).toEqual([
      "set('business', true)",
      "next() -> { ok: true, to: 'details' }",
      "next() -> { ok: true, to: 'details' }",
      "next() -> { ok: false, errors: { passport: 'required' } }",
      "next() -> { ok: true, to: 'company' }",
      "next() -> { ok: true, to: 'payment' }",
      "next() -> { ok: true, to: '@end' }",
    ]);
    expect(wizard.getState().status).toBe('done');
  });

  it('is refused on the second passenger, and the error waits under the passport', async () => {
    const refused = scenario.findIndex((cue) => cue.light === lineOf("validate: ref('passport')"));
    const { wizard, transcript } = await play(scenario.slice(0, refused + 1));
    expect(transcript.at(-1)).toBe("next() -> { ok: false, errors: { passport: 'required' } }");
    expect(wizard.getState().errors).toEqual({ details: { passport: 'required' } });
    expect(wizard.getState().stack[0]?.key).toBe('p2');
  });

  it('lights the condition, the repeat and the validator, in that order', () => {
    const lit = scenario.flatMap((cue) =>
      cue.light === undefined ? [] : [lines[cue.light]?.trim()]
    );
    expect(lit).toEqual([
      "company: step({ label: 'Company', when: eq(get('data.business'), true) }),",
      "repeat: { over: get('data.passengers'), keyBy: 'id' },",
      "steps: { details: step({ label: 'Passenger', validate: ref('passport') }) },",
    ]);
  });

  it('takes about fourteen seconds', () => {
    expect(ms(act2)).toBeGreaterThanOrEqual(12000);
    expect(ms(act2)).toBeLessThanOrEqual(16000);
  });
});

describe('lineOf', () => {
  it('refuses a text on more than one line, and a text on none', () => {
    expect(() => lineOf('when: ')).toThrow('has 2 lines containing "when: "');
    expect(() => lineOf('nowhere')).toThrow('has 0 lines containing "nowhere"');
  });
});

describe('the console', () => {
  it('prints a press before its answer, and a refusal without field errors by its reason', () => {
    expect(printCall({ kind: 'next' })).toBe('next()');
    expect(
      summarize({
        ok: false,
        reason: 'no-target',
        code: 'nav-no-target',
        url: 'https://zizzx.github.io/wizzard-packages/errors/nav-no-target',
      })
    ).toBe("{ ok: false, reason: 'no-target' }");
  });
});
