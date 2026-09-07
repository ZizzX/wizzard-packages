import { StrictMode } from 'react';
import { createWizard } from '@wizzard-packages/core/v1';
import { WizardProvider } from '@wizzard-packages/react/v1';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { dataA, flowA, registryA } from '../../../contract/fixtures';
import { devtools } from './headless';
import { WizardDevtools } from './WizardDevtools';

/**
 * The panel's own tests. They drive it the way the README's first recipe tells
 * a person to: create a wizard with the plugin, click Next with the email
 * empty, and read why it refused - so a change that breaks the getting-started
 * path fails here rather than in a reader's editor.
 */

afterEach(cleanup);

const setup = (options: { plugin?: ReturnType<typeof devtools> } = {}) => {
  const plugin = options.plugin ?? devtools();
  const wizard = createWizard({
    flow: flowA,
    registry: registryA,
    data: dataA,
    plugins: [plugin],
  });
  return { plugin, wizard };
};

describe('<WizardDevtools/>', () => {
  it('says it has no wizard, rather than throwing, outside a provider', () => {
    render(<WizardDevtools />);
    expect(screen.getByText(/devtools has no wizard to watch/)).toBeTruthy();
  });

  it('shows the refusal in the strip without a tab change', async () => {
    const { plugin, wizard } = setup();
    render(<WizardDevtools wizard={wizard} plugin={plugin} />);

    await act(async () => {
      await wizard.start();
    });
    await act(async () => {
      await wizard.next();
    });

    expect(screen.getByText(/✗ next invalid · email: required/)).toBeTruthy();
    /** The Graph tab is still the one selected: tabs never switch on their own. */
    expect(screen.getByRole('tab', { name: 'Graph' }).getAttribute('aria-selected')).toBe('true');
  });

  it('opens the refusal in Activity when the strip outcome is clicked', async () => {
    const { plugin, wizard } = setup();
    render(<WizardDevtools wizard={wizard} plugin={plugin} />);
    await act(async () => {
      await wizard.start();
      await wizard.next();
    });

    fireEvent.click(screen.getByText(/✗ next invalid/));

    expect(screen.getByRole('tab', { name: 'Activity' }).getAttribute('aria-selected')).toBe(
      'true'
    );
    expect(within(screen.getByRole('listbox')).getByText(/✗ next invalid/)).toBeTruthy();
  });

  it('keeps the three concepts independent: a commit does not clear the pin', async () => {
    const { plugin, wizard } = setup();
    render(<WizardDevtools wizard={wizard} plugin={plugin} defaultTab="activity" />);
    await act(async () => {
      await wizard.start();
    });
    await act(async () => {
      await wizard.set('email', 'a@b.c');
    });

    const first = within(screen.getByRole('listbox')).getAllByRole('option')[0];
    expect(first).toBeTruthy();
    fireEvent.click(first!);
    const revOf = (): string | undefined =>
      /pinned #(\d+)/.exec(screen.getByText(/pinned #/).textContent ?? '')?.[1];
    const pinnedRev = revOf();

    await act(async () => {
      await wizard.set('company', 'Acme');
    });

    /** Still pinned to the same commit, and the strip counts what arrived since. */
    expect(revOf()).toBe(pinnedRev);
    expect(screen.getByText(/\(\+\d+ new\)/)).toBeTruthy();
  });

  it('tells the person when the plugin is not the one installed on this wizard', async () => {
    const { wizard } = setup();
    /** A second instance: the panel reads rings the engine never fills. */
    const other = devtools();
    render(<WizardDevtools wizard={wizard} plugin={other} defaultTab="activity" />);
    await act(async () => {
      await wizard.start();
    });

    expect(screen.getByText(/not the one installed on this wizard/)).toBeTruthy();
  });

  it('says refusals are not captured without a plugin, and still draws the rest', async () => {
    const wizard = createWizard({ flow: flowA, registry: registryA, data: dataA });
    render(<WizardDevtools wizard={wizard} defaultTab="activity" />);
    await act(async () => {
      await wizard.start();
    });

    expect(screen.getByText(/refusals are not captured/)).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Graph' })).toBeTruthy();
  });

  it('draws the graph with the active step and keeps labels as text', async () => {
    const { plugin, wizard } = setup();
    render(<WizardDevtools wizard={wizard} plugin={plugin} />);
    await act(async () => {
      await wizard.start();
    });

    const svg = screen.getByRole('application');
    expect(svg.getAttribute('aria-roledescription')).toBe('flow graph');
    expect(within(svg).getByLabelText(/Details, step, active/)).toBeTruthy();
    expect(svg.querySelector('img')).toBeNull();
  });

  it('moves the selection with the arrow keys and inspects on Enter', async () => {
    const { plugin, wizard } = setup();
    render(<WizardDevtools wizard={wizard} plugin={plugin} />);
    await act(async () => {
      await wizard.start();
    });

    const svg = screen.getByRole('application');
    fireEvent.keyDown(svg, { key: 'ArrowDown' });
    fireEvent.keyDown(svg, { key: 'Enter' });

    expect(screen.getByRole('complementary')).toBeTruthy();
    fireEvent.keyDown(svg, { key: 'Escape' });
    expect(svg.getAttribute('aria-activedescendant')).toBeNull();
  });

  it('survives a layout that throws: the graph reports it, the rest keeps working', async () => {
    const { plugin, wizard } = setup();
    const boom = (): never => {
      throw new Error('layout exploded');
    };
    render(<WizardDevtools wizard={wizard} plugin={plugin} layout={boom as never} />);
    await act(async () => {
      await wizard.start();
    });

    expect(screen.getByText(/the graph could not be drawn: layout exploded/)).toBeTruthy();
    fireEvent.click(screen.getByRole('tab', { name: 'State' }));
    expect(screen.getByText(/rev \d+/)).toBeTruthy();

    /** The wizard is unaffected: its next commit lands. */
    await act(async () => {
      await wizard.set('email', 'a@b.c');
    });
    expect(wizard.getState().data.email).toBe('a@b.c');
  });

  it('shows the diff of the observed commit on the State tab', async () => {
    const { plugin, wizard } = setup();
    render(<WizardDevtools wizard={wizard} plugin={plugin} defaultTab="state" />);
    await act(async () => {
      await wizard.start();
    });
    await act(async () => {
      await wizard.set('email', 'a@b.c');
    });

    expect(screen.getByRole('rowheader', { name: 'data.email' })).toBeTruthy();
  });

  it('mounts once under StrictMode: one row per commit, one attachment', async () => {
    const { plugin, wizard } = setup();
    render(
      <StrictMode>
        <WizardDevtools wizard={wizard} plugin={plugin} defaultTab="activity" />
      </StrictMode>
    );
    await act(async () => {
      await wizard.start();
    });

    const commits = within(screen.getByRole('listbox'))
      .getAllByRole('option')
      .map((row) => row.textContent ?? '')
      .filter((text) => text.startsWith('#'));
    expect(new Set(commits).size).toBe(commits.length);
    expect(plugin.attached).toBe(true);
  });

  it('reads the wizard from the provider when no prop is given', async () => {
    const plugin = devtools();
    const wizard = createWizard({
      flow: flowA,
      registry: registryA,
      data: dataA,
      plugins: [plugin],
    });
    render(
      <WizardProvider wizard={wizard}>
        <WizardDevtools plugin={plugin} />
      </WizardProvider>
    );
    await act(async () => {
      await wizard.start();
    });

    expect(screen.queryByText(/devtools has no wizard/)).toBeNull();
    expect(screen.getByRole('application')).toBeTruthy();
  });

  it('records a session and previews the bundle without copying it', async () => {
    const { plugin, wizard } = setup();
    const onRecord = vi.fn();
    render(<WizardDevtools wizard={wizard} plugin={plugin} onRecord={onRecord} />);
    await act(async () => {
      await wizard.start();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Record' }));
    await act(async () => {
      await wizard.set('email', 'a@b.c');
    });
    fireEvent.click(screen.getByRole('button', { name: /^Stop/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Copy JSON' }));

    const json = screen.getByLabelText('Bundle JSON') as HTMLTextAreaElement;
    expect(JSON.parse(json.value).version).toBe(1);
    expect(onRecord).toHaveBeenCalledTimes(1);
  });
});
