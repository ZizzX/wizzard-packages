/**
 * The painter has two lives. On the homepage it is a picture: no focus stop, no
 * handlers, no JavaScript shipped for it. On the inspector it is something a
 * reader walks with the keyboard. Both are asserted here, because the first is
 * what a page pays for a graph it only wants to look at.
 */
import { createWizard } from '@wizzard-packages/core';
import { buildGraph } from '@wizzard-packages/core/graph';
import { groups } from '@wizzard-packages/core/groups';
import { layoutGraph } from '@wizzard-packages/devtools/headless';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { flowA, registryA } from '../../../contract/fixtures';
import { recordWalk, scoutBeats, walkBeats } from '../lib/walk';
import { registry, subFlows, trip } from '../theater/trip.flow';
import { tripView } from '../theater/view';

import { FlowGraph, restingView } from './FlowGraph';

const graph = buildGraph(flowA);
const active = ['details', 'company', 'payment'];

function Picture(): React.ReactNode {
  return <FlowGraph graph={graph} active={active} view={restingView(active, [])} label="signup" />;
}

function Walkable(): React.ReactNode {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <FlowGraph
      graph={graph}
      active={active}
      view={restingView(active, [])}
      label="signup"
      selected={selected}
      onSelect={setSelected}
    />
  );
}

describe('the graph as a picture', () => {
  it('is not a focus stop and claims to be an image', () => {
    const { container } = render(<Picture />);
    const svg = container.querySelector('svg') as SVGSVGElement;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('tabindex')).toBeNull();
  });

  it('still carries the whole flow in the mirror table', () => {
    render(<Picture />);
    expect(screen.getByRole('rowheader', { name: 'Company' })).toBeDefined();
  });

  // The circle was placed for a row only, so laid down, the edge into it stopped
  // at the top of an empty box and the circle sat below it, off to the left.
  it.each(['row', 'column'] as const)(
    'ends the edge into the end on its circle, %s',
    (direction) => {
      const { container } = render(
        <FlowGraph
          graph={graph}
          active={active}
          view={restingView(active, [])}
          direction={direction}
          label="signup"
        />
      );
      const circle = container.querySelector('.node.end > circle') as SVGCircleElement;
      const into = layoutGraph(graph, { direction }).edges.find(
        (edge) => edge.to === '@end' && edge.kind !== 'back'
      );
      const [x, y] = into?.points.at(-1) ?? [NaN, NaN];
      const cx = Number(circle.getAttribute('cx'));
      const cy = Number(circle.getAttribute('cy'));

      expect(Math.hypot(x - cx, y - cy)).toBe(Number(circle.getAttribute('r')));
    }
  );
});

describe('the graph as an instrument', () => {
  it('is one focus stop, not one per node', async () => {
    const user = userEvent.setup();
    const { container } = render(<Walkable />);
    const svg = container.querySelector('svg') as SVGSVGElement;

    await user.tab();
    expect(document.activeElement).toBe(svg);
    await user.tab();
    expect(document.activeElement).not.toBe(svg);
  });

  it('walks the nodes with the arrows and says which one is current', async () => {
    const user = userEvent.setup();
    const { container } = render(<Walkable />);
    const svg = container.querySelector('svg') as SVGSVGElement;

    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(svg.getAttribute('aria-activedescendant')).toBe('node-details');

    await user.keyboard('{ArrowDown}');
    expect(svg.getAttribute('aria-activedescendant')).toBe('node-company');

    await user.keyboard('{ArrowUp}');
    expect(svg.getAttribute('aria-activedescendant')).toBe('node-details');
  });

  it('stops at both ends rather than wrapping', async () => {
    const user = userEvent.setup();
    const { container } = render(<Walkable />);
    const svg = container.querySelector('svg') as SVGSVGElement;

    await user.tab();
    await user.keyboard('{ArrowUp}{ArrowUp}{ArrowUp}');
    expect(svg.getAttribute('aria-activedescendant')).toBe('node-details');
  });

  it('never walks onto the end marker', async () => {
    const user = userEvent.setup();
    const { container } = render(<Walkable />);
    const svg = container.querySelector('svg') as SVGSVGElement;

    // The end is drawn and is not a step. Walking onto it would name a node the
    // end branch renders no id for, so `aria-activedescendant` would point at
    // nothing and the panel would offer a step that does not exist.
    await user.tab();
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');

    expect(svg.getAttribute('aria-activedescendant')).toBe('node-payment');
  });

  it('clears the selection on Escape', async () => {
    const user = userEvent.setup();
    const { container } = render(<Walkable />);
    const svg = container.querySelector('svg') as SVGSVGElement;

    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(container.querySelector('.node.selected')).not.toBeNull();

    await user.keyboard('{Escape}');
    expect(svg.getAttribute('aria-activedescendant')).toBeNull();
    expect(container.querySelector('.node.selected')).toBeNull();
  });

  it('selects on a click and lets a second click let go', async () => {
    const user = userEvent.setup();
    const { container } = render(<Walkable />);
    const node = container.querySelector('#node-payment') as SVGGElement;

    await user.click(node);
    expect(node.classList.contains('selected')).toBe(true);

    await user.click(node);
    expect(node.classList.contains('selected')).toBe(false);
  });

  it('offers nothing to select on the end marker', () => {
    const { container } = render(<Walkable />);
    // The end is drawn, and it is not a step: there is no slice to show for it.
    expect(container.querySelector('.node.end')).not.toBeNull();
    expect(container.querySelector('.node.end')?.getAttribute('id')).toBeNull();
  });
});

describe('a flow that repeats a target', () => {
  it('draws every edge, and React keeps them all', () => {
    // A repeated target in `on.next` is legal input the paste box accepts up to
    // its ceiling. `from`, `to` and `kind` are equal across all of them, so a
    // key built from those alone collides and React drops siblings, warning
    // once per clash — 199 warnings for 201 edges, measured.
    const errors: unknown[] = [];
    const spy = vi.spyOn(console, 'error').mockImplementation((...args) => {
      errors.push(args);
    });

    const repeated = buildGraph({
      id: 'fan',
      steps: { a: { on: { next: Array.from({ length: 40 }, () => 'b') } }, b: {} },
    } as never);

    const { container } = render(
      <FlowGraph graph={repeated} active={[]} view={restingView([], [])} label="fan" />
    );

    expect(container.querySelectorAll('.edge').length).toBe(repeated.edges.length);
    expect(errors).toEqual([]);
    spy.mockRestore();
  });
});

describe('the graph without a route walk', () => {
  // Everything the walk adds, attribute or element. Without a walk the markup is
  // what it was before there was one: the hero, rows B and C and the inspector
  // all draw through here.
  const walkMarkup =
    'defs, [style], .base, .walked, .dropped, .run, .probe, .halo, .hot, .comet, .walk-eval, .ring, .glows, .probed, .flip';

  it('carries none of it as a picture', () => {
    const { container } = render(<Picture />);
    expect(container.querySelector('svg')?.getAttribute('class')).toBeNull();
    expect(container.querySelector(walkMarkup)).toBeNull();
  });

  it('carries none of it as an instrument', () => {
    const { container } = render(<Walkable />);
    expect(container.querySelector('svg')?.getAttribute('class')).toBe('interactive');
    expect(container.querySelector(walkMarkup)).toBeNull();
  });
});

describe('the graph with a route walk', () => {
  const data = { payer: 'personal', email: 'ada@example.com' };

  const Walked = async () => {
    const walk = walkBeats(await recordWalk(flowA, data, registryA), graph, data);
    return render(
      <FlowGraph
        graph={graph}
        active={['details', 'payment']}
        view={walk.view}
        walk={walk}
        label="signup"
      />
    );
  };

  it('adds every decoration, each hidden from assistive technology', async () => {
    const { container } = await Walked();
    expect(container.querySelector('svg')?.classList.contains('walk')).toBe(true);
    // Halos on Details and Payment, a hot copy of both runs, a comet on both runs
    // and on the probe into Company, Company's condition with the data in, one ring.
    expect(container.querySelectorAll('.halo')).toHaveLength(2);
    expect(container.querySelectorAll('.hot')).toHaveLength(2);
    expect(container.querySelectorAll('.comet')).toHaveLength(3);
    expect(container.querySelectorAll('.walk-eval')).toHaveLength(1);
    expect(container.querySelectorAll('.ring')).toHaveLength(1);
    for (const decoration of container.querySelectorAll('.halo, .hot, .comet, .walk-eval, .ring')) {
      expect(decoration.getAttribute('aria-hidden')).toBe('true');
    }
  });

  it('hands the beats to CSS on the elements that play them', async () => {
    const { container } = await Walked();
    const details = container.querySelector('.node.walked') as SVGGElement;
    expect(details.style.getPropertyValue('--on0')).toBe('0.0000');
    expect(container.querySelector('.edge.probe .comet')).not.toBeNull();
    expect(container.querySelector('.node.dropped .walk-eval')?.textContent).toBe(
      '"personal" != "business"'
    );
  });

  it('tells a screen reader where the walk ends', async () => {
    await Walked();
    expect(screen.getByRole('row', { name: /Payment/ }).textContent).toContain('visited');
    expect(screen.getByRole('row', { name: /Company/ }).textContent).toContain('skipped');
  });

  // A feature row draws the walk once per direction and displays one. With one
  // shared id, every glow on the page would point at the first, hidden filter.
  it('gives each direction its own glow, so a row can carry both', async () => {
    const walk = walkBeats(await recordWalk(flowA, data, registryA), graph, data);
    const { container } = render(
      <>
        {(['row', 'column'] as const).map((direction) => (
          <FlowGraph
            key={direction}
            graph={graph}
            active={['details', 'payment']}
            view={walk.view}
            walk={walk}
            direction={direction}
            label="signup"
          />
        ))}
      </>
    );
    const ids = [...container.querySelectorAll('[id]')].map((element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const svg of container.querySelectorAll('svg')) {
      const own = `url(#${svg.querySelector('filter')?.id})`;
      for (const glow of svg.querySelectorAll('[filter]')) {
        expect(glow.getAttribute('filter')).toBe(own);
      }
    }
  });
});

describe('the graph with a scout', () => {
  const tripGraph = buildGraph(trip, subFlows);
  const two = [{ id: 'p1' }, { id: 'p2' }];
  const plain = ['route', 'people', 'payment'];

  /** The trip on Route, read off a real engine, as the theater reads it. */
  async function engine(business: boolean) {
    const wizard = createWizard({
      flow: trip,
      groups,
      subFlows,
      registry,
      data: { passengers: two, business },
    });
    await wizard.start();
    return tripView(trip, wizard.getState());
  }

  async function Scouted(scoutKey = 0) {
    const { active, view } = await engine(true);
    const scout = scoutBeats(tripGraph, plain, active, 'route', {
      passengers: two,
      business: true,
    });
    if (scout === null) throw new Error('no scout');
    const graph = (key: number) => (
      <FlowGraph
        graph={tripGraph}
        active={active}
        view={view}
        direction="column"
        label="trip"
        scout={scout}
        scoutKey={key}
      />
    );
    const rendered = render(graph(scoutKey));
    return { ...rendered, again: (key: number) => rendered.rerender(graph(key)) };
  }

  it('adds the comet, the glows, the probe and the ring, each hidden from assistive technology', async () => {
    const { container } = await Scouted();
    const svg = container.querySelector('svg');
    expect(svg?.classList.contains('scout')).toBe(true);
    expect(svg?.style.getPropertyValue('--scout-ms')).toBe('2600ms');
    // Halos on the three steps the comet reaches, a comet on each of the four
    // runs and none on a probe that heals, Company's condition, one ring. The
    // edges are not drawn again: the engine already drew them.
    expect(container.querySelectorAll('.halo')).toHaveLength(3);
    expect(container.querySelectorAll('.comet')).toHaveLength(4);
    expect(container.querySelectorAll('.edge.probe')).toHaveLength(0);
    expect(container.querySelectorAll('.hot')).toHaveLength(0);
    expect(container.querySelector('.node.probed.heals .walk-eval')?.textContent).toBe(
      'true == true'
    );
    expect(container.querySelectorAll('.ring')).toHaveLength(1);
    for (const decoration of container.querySelectorAll('.halo, .comet, .walk-eval, .ring')) {
      expect(decoration.getAttribute('aria-hidden')).toBe('true');
    }
  });

  it("flips the edges Company's arrival moved, and only those", async () => {
    const { container } = await Scouted();
    const flipped = [...container.querySelectorAll('.edge.flip')].map(
      (edge) => edge.className.baseVal
    );
    expect(flipped).toHaveLength(3);
    expect(flipped.filter((name) => name.includes(' live'))).toHaveLength(2);
    expect(flipped.filter((name) => name.includes(' dim'))).toHaveLength(1);
  });

  it("ends on the engine's frame: every node and edge is in the state the engine put it in", async () => {
    const { container } = await Scouted();
    const { active, view } = await engine(true);
    const { container: bare } = render(
      <FlowGraph graph={tripGraph} active={active} view={view} direction="column" label="trip" />
    );
    const states = (root: Element) =>
      [...root.querySelectorAll('.node, .edge')].map((element) =>
        element.className.baseVal
          .split(' ')
          .filter((name) => !['glows', 'probed', 'heals', 'run', 'probe', 'flip'].includes(name))
          .join(' ')
      );
    expect(states(container)).toEqual(states(bare));
  });

  it('breaks Company with the comet probing it, when the box is unticked', async () => {
    const { active, view } = await engine(false);
    const scout = scoutBeats(
      tripGraph,
      ['route', 'people', 'company', 'payment'],
      active,
      'route',
      {
        passengers: two,
        business: false,
      }
    );
    if (scout === null) throw new Error('no scout');
    const { container } = render(
      <FlowGraph graph={tripGraph} active={active} view={view} label="trip" scout={scout} />
    );
    expect(container.querySelector('.node.probed:not(.heals) .walk-eval')?.textContent).toBe(
      'false != true'
    );
    expect(container.querySelector('.edge.probe .comet')).not.toBeNull();
  });

  it('leaves nothing behind once the scout is put back on the engine', async () => {
    const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container, rerender } = await Scouted(1);
    const { active, view } = await engine(true);
    rerender(
      <FlowGraph
        graph={tripGraph}
        active={active}
        view={view}
        direction="column"
        label="trip"
        scout={null}
        scoutKey={1}
      />
    );
    const left = [...container.querySelectorAll('.halo, .comet, .walk-eval, .ring, [style*="--"]')];
    expect(left.map((element) => element.getAttribute('class'))).toEqual([]);
    expect(errors.mock.calls.map(([message]) => String(message).slice(0, 60))).toEqual([]);
    errors.mockRestore();
  });

  // The hero's scout and row A's walk are on one page, both drawn down on a phone.
  it("does not take row A's glow, when both are drawn down on one page", async () => {
    const { active, view } = await engine(true);
    const scout = scoutBeats(tripGraph, plain, active, 'route', {
      passengers: two,
      business: true,
    });
    const data = { payer: 'personal', email: 'ada@example.com' };
    const walk = walkBeats(await recordWalk(flowA, data, registryA), graph, data);
    const { container } = render(
      <>
        <FlowGraph
          graph={tripGraph}
          active={active}
          view={view}
          direction="column"
          label="trip"
          scout={scout}
        />
        <FlowGraph
          graph={graph}
          active={['details', 'payment']}
          view={walk.view}
          walk={walk}
          direction="column"
          label="signup"
        />
      </>
    );
    const ids = [...container.querySelectorAll('[id]')].map((element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('starts the decorations over for a new scout, and keeps the graph', async () => {
    const { container, again } = await Scouted(1);
    const comet = container.querySelector('.comet');
    const edge = container.querySelector('.edge');
    again(2);
    expect(container.querySelector('.comet')).not.toBe(comet);
    expect(container.querySelector('.edge')).toBe(edge);
  });
});
