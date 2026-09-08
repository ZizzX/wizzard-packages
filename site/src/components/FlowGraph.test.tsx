/**
 * The painter has two lives. On the homepage it is a picture: no focus stop, no
 * handlers, no JavaScript shipped for it. On the inspector it is something a
 * reader walks with the keyboard. Both are asserted here, because the first is
 * what a page pays for a graph it only wants to look at.
 */
import { buildGraph } from '@wizzard-packages/core/graph';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { flowA } from '../../../contract/fixtures';

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
