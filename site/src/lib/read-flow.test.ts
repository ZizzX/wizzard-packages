/**
 * The paste box is the one place on the site where a stranger's text reaches
 * the engine's own validator, so every way it can be wrong has a row here.
 */
import { describe, expect, it } from 'vitest';

import { MAX_CHARS, readFlow } from './read-flow';

const good = JSON.stringify({
  id: 'signup',
  order: ['details'],
  steps: { details: { label: 'Details' } },
});

describe('readFlow', () => {
  it('reads a flow', () => {
    const result = readFlow(good);
    expect(result.problems).toEqual([]);
    expect(result.flow?.id).toBe('signup');
  });

  it('calls an empty box empty rather than wrong', () => {
    const result = readFlow('   \n  ');
    expect(result).toEqual({ flow: null, problems: [], empty: true });
  });

  it('refuses a flow past the cap without parsing it', () => {
    const result = readFlow('"'.padEnd(MAX_CHARS + 1, 'x'));
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('reads up to');
  });

  it('says where the JSON broke, in lines a reader can count', () => {
    const result = readFlow('{\n  "id": "a",\n  "steps": {,\n}');
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toMatch(/line \d+, column \d+/);
  });

  it('distinguishes valid JSON from a flow', () => {
    const result = readFlow('[1, 2, 3]');
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('not a flow');
  });

  it('does not hand a shapeless object to validateFlow', () => {
    // `validateFlow` reads `flow.steps` unguarded, so this is the case that
    // would throw out of a function whose whole promise is that it does not.
    expect(() => readFlow('{"id": "a"}')).not.toThrow();
    expect(readFlow('{"id": "a"}').problems[0]?.message).toContain('not a flow');
  });

  it('reports the flow rules and keeps the graph unswapped', () => {
    // Shaped like a flow, so it reaches `validateFlow`, which minds that
    // `order` names a step that does not exist.
    const result = readFlow('{"id":"a","order":["ghost"],"steps":{"real":{}}}');
    expect(result.flow).toBeNull();
    expect(result.problems.length).toBeGreaterThan(0);
  });
});
