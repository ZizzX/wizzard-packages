import { render, screen, waitFor } from '@testing-library/react';
import { flushPromises, mount } from '@vue/test-utils';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';

import AppVue from './App.vue';
import { App } from './App';
import { FROM_SERVER, registry } from './contract';
import expectedOutput from './headless.out.txt?raw';
import { loadFlow } from './load';

/**
 * The contract, checked from both ends: a definition that arrives as text runs,
 * and the one change a payload must not be able to make is refused.
 */
const click = async (button: HTMLElement): Promise<void> => {
  await act(async () => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
};

/** Line endings differ between a Windows checkout and CI; the content does not. */
const lf = (s: string): string => s.replace(/\r\n/g, '\n');

describe('server-driven', () => {
  it('refuses a payload that is not a flow, as a value', () => {
    for (const bad of ['', 'null', '{}', '{"id":"x"}', '[1,2]', 'not json']) {
      const result = loadFlow(bad, registry);
      expect(result.ok, `"${bad}" should not load`).toBe(false);
      if (!result.ok) expect(result.problems.length).toBeGreaterThan(0);
    }
  });

  it('loads the definition it was sent', () => {
    const result = loadFlow(FROM_SERVER, registry);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.flow.id).toBe('signup');
  });

  it('applies a patch and refuses the one that deletes the current step, on React', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('status').textContent).toContain('Loaded from the server');
    });

    await click(screen.getByRole('button', { name: 'Apply the patch' }));
    expect(screen.getByRole('status').textContent).toContain('applied');

    await click(screen.getByRole('button', { name: 'Apply a patch that deletes this step' }));
    expect(screen.getByRole('status').textContent).toContain('refused');
  });

  it('does the same on Vue', async () => {
    const app = mount(AppVue);
    await flushPromises();

    const buttons = app.findAll('button');
    const patch = buttons[1];
    const removal = buttons[2];
    if (patch === undefined || removal === undefined) throw new Error('the buttons are missing');

    await patch.trigger('click');
    await flushPromises();
    expect(app.get('[role="status"]').text()).toContain('applied');

    await removal.trigger('click');
    await flushPromises();
    expect(app.get('[role="status"]').text()).toContain('refused');
  });

  it('prints what the headless page shows', async () => {
    const lines: unknown[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: unknown) => {
      lines.push(line);
    });

    await import('./headless');

    expect(`${lines.join('\n')}\n`).toBe(lf(expectedOutput));
    vi.restoreAllMocks();
  });
});
