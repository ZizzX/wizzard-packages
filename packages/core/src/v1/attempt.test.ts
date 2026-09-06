import { describe, expect, it, vi } from 'vitest';

import type { FlowDefinition } from './flow';
import type { Attempt, NavResult } from './navigate';
import { createWizard } from './store';

/**
 * `onAttempt` exists so a devtools plugin can explain a move that never
 * committed. These tests pin the contract the panel is built on: one start and
 * one terminal event per attempt, paired by id; the engine's own first move
 * marked; a thrown error reported and re-thrown unchanged; and the dispatch
 * shared with `onCommit`, so a disabled plugin hears neither.
 */

const flow: FlowDefinition = {
  id: 'booking',
  order: ['trip', 'company', 'payment'],
  steps: {
    trip: { label: 'Trip', validate: { $ref: 'tripRules' } },
    company: { label: 'Company', when: { $eq: [{ $get: 'data.payer' }, 'business'] } },
    payment: { label: 'Payment' },
  },
  policy: 'free',
};

const registry = {
  tripRules: (_args: unknown, scope: { data: Record<string, unknown> }) =>
    scope.data.name ? null : { name: 'required' },
  boom: () => {
    throw new Error('resolver exploded');
  },
  slow: async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return null;
  },
};

const log = () => {
  const seen: Attempt[] = [];
  return { seen, plugin: { name: 'log', onAttempt: (a: Attempt) => void seen.push(a) } };
};

const phases = (seen: readonly Attempt[], id: number): string[] =>
  seen.filter((a) => a.id === id).map((a) => a.phase);

describe('onAttempt', () => {
  it('reports start and end once per call, paired by id, with the result', async () => {
    const { seen, plugin } = log();
    const w = createWizard({ flow, registry, data: { payer: 'private' }, plugins: [plugin] });
    await w.start();

    const result = await w.next();

    expect(result).toEqual({
      ok: false,
      reason: 'invalid',
      by: 'trip',
      errors: { name: 'required' },
    });
    const [start, end] = seen.filter((a) => a.source === 'call');
    expect(start).toMatchObject({ id: 2, intent: { type: 'next' }, phase: 'start' });
    expect(end).toMatchObject({ id: 2, intent: { type: 'next' }, phase: 'end', result });
    // The refusal committed once (the validation errors), so `rev` moved between the two.
    expect(end?.rev).toBeGreaterThan(start?.rev ?? Infinity);
    expect(phases(seen, 2)).toEqual(['start', 'end']);
  });

  it("marks the engine's own first move as source 'start'", async () => {
    const { seen, plugin } = log();
    const w = createWizard({ flow, registry, data: { payer: 'private' }, plugins: [plugin] });

    await w.start();
    await w.back();

    expect(seen.map((a) => [a.id, a.source, a.phase])).toEqual([
      [1, 'start', 'start'],
      [1, 'start', 'end'],
      [2, 'call', 'start'],
      [2, 'call', 'end'],
    ]);
  });

  it('reports a thrown error and re-throws it unchanged', async () => {
    const { seen, plugin } = log();
    const exploding: FlowDefinition = {
      ...flow,
      steps: { ...flow.steps, trip: { label: 'Trip', validate: { $ref: 'boom' } } },
    };
    const w = createWizard({ flow: exploding, registry, data: {}, plugins: [plugin] });
    await w.start();

    await expect(w.next()).rejects.toThrow('resolver exploded');

    const error = seen.find((a) => a.phase === 'error');
    expect(error).toMatchObject({ id: 2, intent: { type: 'next' } });
    expect((error as { error: Error }).error.message).toBe('resolver exploded');
    expect(phases(seen, 2)).toEqual(['start', 'error']);
  });

  it('ends a superseded attempt without touching the one that superseded it', async () => {
    const { seen, plugin } = log();
    const slowFlow: FlowDefinition = {
      ...flow,
      steps: { ...flow.steps, trip: { label: 'Trip', validate: { $ref: 'slow' } } },
    };
    const w = createWizard({
      flow: slowFlow,
      registry,
      data: { payer: 'private' },
      plugins: [plugin],
    });
    await w.start();

    const [first, second] = await Promise.all([w.next(), w.next()]);

    expect(first).toEqual({ ok: false, reason: 'superseded' });
    expect(second.ok).toBe(true);
    // Both attempts started before either ended; each still gets exactly one end.
    expect(seen.map((a) => `${a.id}:${a.phase}`)).toEqual([
      '1:start',
      '1:end',
      '2:start',
      '3:start',
      '2:end',
      '3:end',
    ]);
    expect((seen[4] as { result: NavResult }).result).toEqual(first);
    expect((seen[5] as { result: NavResult }).result).toEqual(second);
  });

  it('ends a cancelled attempt with its aborted result, and fires nothing for cancel() itself', async () => {
    const { seen, plugin } = log();
    const slowFlow: FlowDefinition = {
      ...flow,
      steps: { ...flow.steps, trip: { label: 'Trip', validate: { $ref: 'slow' } } },
    };
    const w = createWizard({
      flow: slowFlow,
      registry,
      data: { payer: 'private' },
      plugins: [plugin],
    });
    await w.start();

    const moving = w.next();
    w.cancel();
    const result = await moving;

    expect(result).toEqual({ ok: false, reason: 'aborted' });
    expect(phases(seen, 2)).toEqual(['start', 'end']);
    expect(seen).toHaveLength(4);
  });

  it('shares the dispatch with onCommit: a plugin disabled in either hook hears neither', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    let commits = 0;
    let attempts = 0;
    const throwsInCommit = {
      name: 'commit-thrower',
      onCommit: () => {
        throw new Error('nope');
      },
      onAttempt: () => {
        attempts += 1;
      },
    };
    const throwsInAttempt = {
      name: 'attempt-thrower',
      onCommit: () => {
        commits += 1;
      },
      onAttempt: () => {
        throw new Error('nope');
      },
    };
    const w = createWizard({
      flow,
      registry,
      data: { payer: 'private', name: 'Ann' },
      plugins: [throwsInCommit, throwsInAttempt],
    });

    // `start` fires onAttempt first (disabling the attempt-thrower), then the
    // pipeline writes (disabling the commit-thrower). From then on both are silent.
    const started = await w.start();
    expect(started.ok).toBe(true);
    const attemptsAfterStart = attempts;
    const commitsAfterStart = commits;

    const result = await w.next();
    w.set('name', 'Bo');

    expect(result.ok).toBe(true);
    expect(attempts).toBe(attemptsAfterStart);
    expect(commits).toBe(commitsAfterStart);
    expect(error).toHaveBeenCalledTimes(2);
    expect(error.mock.calls[0]?.[0]).toContain('"attempt-thrower" threw in onAttempt');
    expect(error.mock.calls[1]?.[0]).toContain('"commit-thrower" threw in onCommit');
    error.mockRestore();
  });

  it('is a regression guard: results and rejections are the same with a throwing plugin as without one', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const plain = createWizard({ flow, registry, data: { payer: 'private' } });
    const noisy = createWizard({
      flow,
      registry,
      data: { payer: 'private' },
      plugins: [
        {
          name: 'noisy',
          onAttempt: () => {
            throw new Error('nope');
          },
        },
      ],
    });

    for (const w of [plain, noisy]) await w.start();
    expect(await noisy.next()).toEqual(await plain.next());
    for (const w of [plain, noisy]) w.set('name', 'Ann');
    expect(await noisy.next()).toEqual(await plain.next());
    expect(await noisy.go('trip')).toEqual(await plain.go('trip'));
    expect(await noisy.back()).toEqual(await plain.back());
    expect(noisy.getState()).toEqual(plain.getState());
    vi.restoreAllMocks();
  });
});
