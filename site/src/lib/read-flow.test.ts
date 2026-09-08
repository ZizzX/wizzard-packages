/**
 * The paste box is the one place on the site where a stranger's text reaches
 * the engine's own validator, so every way it can be wrong has a row here.
 *
 * The `throws out of validateFlow` block is the important one. `validateFlow`
 * is typed for a `FlowDefinition` and reads `step.on`, `flow.order` and
 * `group.flow.steps` without guarding them, so each of those five pastes used
 * to take the island down with a TypeError — the one thing `readFlow` promises
 * cannot happen. They were found by probing, not by reading, which is why they
 * are enumerated rather than described.
 */
import { describe, expect, it } from 'vitest';

import { MAX_CHARS, MAX_STEPS, readFlow } from './read-flow';

const good = JSON.stringify({
  id: 'signup',
  order: ['details'],
  steps: { details: { label: 'Details' } },
});

const flowOf = (steps: number): string =>
  JSON.stringify({
    id: 'big',
    steps: Object.fromEntries(Array.from({ length: steps }, (_, i) => [`s${i}`, {}])),
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

  it('says where the JSON broke, in lines a reader can count', () => {
    const result = readFlow('{\n  "id": "a",\n  "steps": {,\n}');
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toMatch(/line \d+, column \d+/);
  });

  it('distinguishes valid JSON from a flow', () => {
    const result = readFlow('[1, 2, 3]');
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('not a flow definition');
  });

  it('reports the flow rules and keeps the graph unswapped', () => {
    const result = readFlow('{"id":"a","order":["ghost"],"steps":{"real":{}}}');
    expect(result.flow).toBeNull();
    expect(result.problems.length).toBeGreaterThan(0);
  });
});

describe('the gates on size', () => {
  it('refuses a paste past the character cap without parsing it', () => {
    const result = readFlow('"'.padEnd(MAX_CHARS + 1, 'x'));
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('reads up to');
  });

  it('draws a flow at the ceiling', () => {
    expect(readFlow(flowOf(MAX_STEPS)).flow).not.toBeNull();
  });

  it('refuses one past it, because the edges grow as the square of the count', () => {
    // A character cap does not bound this: 2 000 steps is 112 kB, well under a
    // megabyte, and 2 000 000 edges.
    const result = readFlow(flowOf(MAX_STEPS + 1));
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('draws up to');
  });
});

describe('shapes that throw out of validateFlow', () => {
  const hostile: readonly [string, string][] = [
    ['a null step', '{"id":"x","steps":{"one":null}}'],
    ['a numeric step', '{"id":"x","steps":{"one":5}}'],
    ['a string step', '{"id":"x","steps":{"one":"nope"}}'],
    ['an order that is not a list', '{"id":"x","order":5,"steps":{"one":{}}}'],
    ['a group whose flow is a number', '{"id":"x","steps":{"one":{"flow":5}}}'],
  ];

  for (const [what, text] of hostile) {
    it(`answers rather than throwing on ${what}`, () => {
      expect(() => readFlow(text)).not.toThrow();
      const result = readFlow(text);
      expect(result.flow).toBeNull();
      expect(result.problems.length).toBeGreaterThan(0);
    });
  }

  it('names the step that is not an object, not just the flow', () => {
    const result = readFlow('{"id":"x","steps":{"one":null}}');
    expect(result.problems[0]?.path).toBe('steps.one');
    expect(result.problems[0]?.message).toContain('"one"');
  });

  it('catches a shape it has not learned about yet', () => {
    // A group whose inline flow has no `steps` reaches `validateFlow`, which
    // calls `Object.entries` on undefined. The shape check does not name this
    // case; the net is what stops it being a crash.
    const result = readFlow('{"id":"x","steps":{"one":{"flow":{"id":"y"}}}}');
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('could not be checked');
  });
});

describe('the failure contract', () => {
  const failing = [
    '"'.padEnd(MAX_CHARS + 1, 'x'),
    '{ nope',
    '[1,2,3]',
    flowOf(MAX_STEPS + 1),
    '{"id":"x","steps":{"one":null}}',
    '{"id":"x","order":5,"steps":{"one":{}}}',
    '{"id":"x","steps":{"one":{"flow":{"id":"y"}}}}',
  ];

  it('gives every message this page writes the four clauses AGENTS.md asks for', () => {
    for (const text of failing) {
      const message = readFlow(text).problems[0]?.message ?? '';
      expect(message.startsWith('[wizzard] ')).toBe(true);
      expect(message).toContain('docs/errors.md#inspector-paste');
      // What went wrong, why, the fix, the url: four sentences.
      expect(message.split('. ').length).toBeGreaterThanOrEqual(4);
    }
  });

  it('leaves the engine to word its own problems', () => {
    // `validateFlow`'s messages are its own and are not rewritten here. They do
    // not carry the prefix today, which is L6's to fix in core rather than this
    // page's to paper over.
    const result = readFlow('{"id":"a","order":["ghost"],"steps":{"real":{}}}');
    expect(result.problems.some((p) => p.message.startsWith('[wizzard]'))).toBe(false);
  });
});
