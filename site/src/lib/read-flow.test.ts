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

import { MAX_CHARS, MAX_NODES, MAX_TARGETS, MAX_TOTAL_STEPS, readFlow } from './read-flow';

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
    expect(result).toEqual({ flow: null, graph: null, problems: [], empty: true });
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

  it('draws a flow at the node ceiling', () => {
    // One step short, because the builder adds the end node.
    expect(readFlow(flowOf(MAX_NODES - 1)).flow).not.toBeNull();
  });

  it('refuses one past it, because the edges grow as the square of the count', () => {
    // A character cap does not bound this: 2 000 steps is 112 kB, well under a
    // megabyte, and 2 000 000 edges.
    const result = readFlow(flowOf(MAX_NODES + 1));
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('draws up to');
  });

  it('hands the graph back rather than making the caller build a second one', () => {
    const result = readFlow(good);
    expect(result.graph?.nodes.map((n) => n.id)).toEqual(['details', '@end']);
  });
});

describe('the gates the step count does not reach', () => {
  it('refuses a fan-out that a two-step flow can declare', () => {
    // 400 kB of legal JSON, two steps, and 100 001 edges out of `buildGraph`.
    // Both earlier gates pass it: this is the one that does not.
    const fan = JSON.stringify({
      id: 'fan',
      steps: { a: { on: { next: Array.from({ length: 100_000 }, () => 'b') } }, b: {} },
    });
    const result = readFlow(fan);
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('transitions');
  });

  it('draws a flow at the transition ceiling', () => {
    const at = JSON.stringify({
      id: 'fan',
      steps: { a: { on: { next: Array.from({ length: MAX_TARGETS }, () => 'b') } }, b: {} },
    });
    expect(readFlow(at).flow).not.toBeNull();
  });

  it('draws a flow whose sub-flow is larger than the drawing ceiling', () => {
    // `layoutGraph` draws the root's nodes and does not descend into a group's
    // nested graph, so this draws three. Counting the paste rejected it and
    // told the reader it had forty-two nodes to draw, which was false.
    const nested = JSON.stringify({
      id: 'root',
      steps: {
        group: {
          flow: {
            id: 'child',
            steps: Object.fromEntries(Array.from({ length: MAX_NODES }, (_, i) => [`s${i}`, {}])),
          },
        },
        after: {},
      },
    });
    const result = readFlow(nested);
    expect(result.flow).not.toBeNull();
    expect(result.graph?.nodes.length).toBeLessThanOrEqual(MAX_NODES);
  });

  it('still bounds the work a sub-flow makes the builder do', () => {
    const huge = JSON.stringify({
      id: 'root',
      steps: {
        group: {
          flow: {
            id: 'child',
            steps: Object.fromEntries(
              Array.from({ length: MAX_TOTAL_STEPS + 1 }, (_, i) => [`s${i}`, {}])
            ),
          },
        },
      },
    });
    const result = readFlow(huge);
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('counting its sub-flows');
  });

  it('does not follow a sub-flow named by string, which is not in the paste', () => {
    const byName = JSON.stringify({ id: 'root', steps: { group: { flow: 'elsewhere' } } });
    expect(readFlow(byName).flow).not.toBeNull();
  });
});

describe('fields the painter renders', () => {
  it('refuses a label that is not text', () => {
    // `validateFlow` has no opinion on a label — it is the host's business
    // everywhere except here. The painter renders it as a React child, so an
    // object takes the island down with "Objects are not valid as a React child".
    const result = readFlow('{"id":"x","steps":{"one":{"label":{"bad":1}}}}');
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.path).toBe('steps.one.label');
    expect(result.problems[0]?.message).toContain('not a string');
  });

  it('leaves a missing label alone, because the id is drawn instead', () => {
    expect(readFlow('{"id":"x","steps":{"one":{}}}').flow).not.toBeNull();
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

describe('shapes that throw out of the builder', () => {
  it('answers rather than throwing when repeat is null', () => {
    // `validateFlow` only asks whether `repeat` is present; `buildGraph` reads
    // `step.repeat.over`. Guarding fields one at a time missed this, which is
    // why the read now builds the graph itself.
    const text = '{"id":"x","version":1,"steps":{"g":{"flow":"other","repeat":null,"when":true}}}';
    expect(() => readFlow(text)).not.toThrow();
    const result = readFlow(text);
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('could not be drawn');
  });
});

describe('the failure contract', () => {
  const failing = [
    '"'.padEnd(MAX_CHARS + 1, 'x'),
    '{ nope',
    '[1,2,3]',
    flowOf(MAX_NODES + 1),
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

describe('names the builder reserves', () => {
  it('refuses a step called @end', () => {
    // `buildGraph` adds a terminal under that id to every graph, so the drawing
    // would hold two nodes with one name and React would keep one of them.
    const result = readFlow('{"id":"x","steps":{"@end":{"label":"my end"},"a":{}}}');
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('the end of a flow');
  });
});

describe('nodes the layout invents', () => {
  const ghostly = (targets: number): string =>
    JSON.stringify({
      id: 'x',
      steps: {
        a: { on: { next: Array.from({ length: targets }, (_, i) => ({ to: { n: i } })) } },
        // `to in flow.steps` stringifies its left operand, so every one of
        // those distinct objects matches this step and passes validation.
        '[object Object]': {},
      },
    });

  it('counts them against the drawing ceiling', () => {
    // The graph holds three nodes. The layout turns each distinct target into a
    // placeholder, so the drawing holds one per entry — born after every gate
    // that reads the paste, which is why the gate reads the layout instead.
    // The premise, on a paste small enough to be accepted: three real nodes.
    expect(readFlow(ghostly(3)).graph?.nodes.length).toBe(3);

    // The same shape, past the ceiling. Counting `graph.nodes` would have let
    // it through at three.
    const result = readFlow(ghostly(MAX_NODES + 5));
    expect(result.flow).toBeNull();
    expect(result.problems[0]?.message).toContain('draws up to');
  });

  it('draws a flow whose placeholders stay under it', () => {
    expect(readFlow(ghostly(3)).flow).not.toBeNull();
  });
});
