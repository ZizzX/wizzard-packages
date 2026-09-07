import { groups } from '@wizzard-packages/core/groups';
import { createWizard } from '@wizzard-packages/core/v1';
import type { FlowDefinition, SubFlows } from '@wizzard-packages/core/v1';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { dataC, flowA, registryA } from '../../../contract/fixtures';
import { devtools } from './headless';
import { WizardDevtools } from './WizardDevtools';

/**
 * The four things the review of this PR found, each with the case that showed
 * it. They live in their own file because they are about the panel's edges
 * rather than its path, and a reader looking for either should not have to
 * read the other.
 */

afterEach(cleanup);

describe('<WizardDevtools/> edges', () => {
  it('resolves a nested flow through the stack, not by a colliding name', async () => {
    /**
     * The registry key `passenger` resolves to one definition; a *different*
     * definition carries the id `passenger` too. A flat lookup by the frame's
     * flow name picks whichever `knownFlows` stored last, and would draw the
     * decoy. Walking the stack through the group step cannot.
     */
    const decoy: FlowDefinition = {
      id: 'passenger',
      order: ['decoy'],
      steps: { decoy: { label: 'Decoy' } },
      policy: 'free',
    };
    const real: FlowDefinition = {
      id: 'passenger-real',
      order: ['seat', 'meal'],
      steps: { seat: { label: 'Seat' }, meal: { label: 'Meal' } },
      policy: 'free',
    };
    const trip: FlowDefinition = {
      id: 'trip',
      order: ['passengers', 'review'],
      steps: {
        passengers: {
          flow: 'ref',
          repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' },
        },
        review: { label: 'Review' },
        /** Present only so `knownFlows` also learns the decoy by its id. */
        other: { flow: decoy },
      },
      policy: 'free',
    };
    const subFlows: SubFlows = { ref: real, decoy };

    const plugin = devtools();
    const wizard = createWizard({
      flow: trip,
      subFlows,
      groups,
      data: dataC('p1'),
      plugins: [plugin],
    });
    render(<WizardDevtools wizard={wizard} plugin={plugin} subFlows={subFlows} />);
    await act(async () => {
      await wizard.start();
    });

    const svg = screen.getByRole('application');
    expect(within(svg).queryByLabelText(/Decoy/)).toBeNull();
    expect(within(svg).getByLabelText(/Seat/)).toBeTruthy();
  });

  it('stops the recorder when the panel unmounts', async () => {
    const plugin = devtools();
    const wizard = createWizard({
      flow: flowA,
      registry: registryA,
      data: {},
      plugins: [plugin],
    });
    const view = render(<WizardDevtools wizard={wizard} plugin={plugin} />);
    await act(async () => {
      await wizard.start();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Record' }));
    const before = wizard.getState().rev;
    view.unmount();

    /** A live recorder would take this commit; a stopped one holds no listener. */
    await act(async () => {
      await wizard.set('email', 'a@b.c');
    });
    expect(wizard.getState().rev).toBeGreaterThan(before);
    expect(() => wizard.destroy()).not.toThrow();
  });

  it('does not carry a lifted diff cap into the next commit', async () => {
    const plugin = devtools();
    const wide = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`f${i}`, i]));
    const wizard = createWizard({
      flow: flowA,
      registry: registryA,
      data: { wide },
      plugins: [plugin],
    });
    render(
      <WizardDevtools wizard={wizard} plugin={plugin} defaultTab="state" limits={{ diffRows: 3 }} />
    );
    await act(async () => {
      await wizard.start();
    });
    /** Twelve changed paths under one object, against a cap of three. */
    await act(async () => {
      await wizard.set(
        'wide',
        Object.fromEntries(Object.keys(wide).map((key) => [key, 'changed']))
      );
    });

    expect(screen.getByText(/paths not shown \(cap\)/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'show all' }));
    expect(screen.queryByText(/paths not shown \(cap\)/)).toBeNull();

    /** A new commit gets the cap back. */
    await act(async () => {
      await wizard.set(
        'wide',
        Object.fromEntries(Object.keys(wide).map((key) => [key, 'changed again']))
      );
    });
    expect(screen.getByText(/paths not shown \(cap\)/)).toBeTruthy();
  });

  it('says a previewed sub-flow’s condition was not evaluated', async () => {
    /**
     * The group is second in the order, so the wizard sits at the root with a
     * stack of one while the group node is on screen. Opening its sub-flow
     * from the inspector draws steps whose `when` reads the loop scope, and no
     * such scope exists outside the group: the honest answer is that it was
     * not evaluated, never a confident true or false.
     */
    const plugin = devtools();
    const passenger: FlowDefinition = {
      id: 'passenger',
      order: ['seat', 'meal'],
      steps: {
        seat: { label: 'Seat' },
        meal: { label: 'Meal', when: { $get: 'loop.item.wantsMeal' } },
      },
      policy: 'free',
    };
    const wizard = createWizard({
      flow: {
        id: 'trip',
        order: ['review', 'passengers'],
        steps: {
          review: { label: 'Review' },
          passengers: {
            flow: 'passenger',
            repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' },
          },
        },
        policy: 'free',
      },
      subFlows: { passenger },
      groups,
      data: dataC('p1'),
      plugins: [plugin],
    });
    render(<WizardDevtools wizard={wizard} plugin={plugin} subFlows={{ passenger }} />);
    await act(async () => {
      await wizard.start();
    });

    const svg = screen.getByRole('application');
    fireEvent.click(within(svg).getByLabelText(/passengers/i));
    fireEvent.keyDown(svg, { key: 'Enter' });
    fireEvent.click(screen.getByRole('button', { name: 'Open sub-flow' }));

    const preview = screen.getByRole('application');
    fireEvent.click(within(preview).getByLabelText(/Meal/));
    fireEvent.keyDown(preview, { key: 'Enter' });

    expect(screen.getByText(/Not evaluated/)).toBeTruthy();
  });
});
