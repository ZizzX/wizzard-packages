import { render, screen, waitFor } from '@testing-library/react';
import { flushPromises, mount } from '@vue/test-utils';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';

import AppVue from './App.vue';
import { App } from './App';
import expectedOutput from './headless.out.txt?raw';

/**
 * The claim this example exists to make: `force` answers the policy and nothing
 * else. Both refusals read `blocked`, so the test does what the page asks a
 * reader to do - change one thing at a time and watch which refusal stops.
 */
const click = async (button: HTMLElement): Promise<void> => {
  await act(async () => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
};

const type = async (input: HTMLInputElement, value: string): Promise<void> => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set as (
    this: HTMLInputElement,
    v: string
  ) => void;
  await act(async () => {
    setter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
};

/** Line endings differ between a Windows checkout and CI; the content does not. */
const lf = (s: string): string => s.replace(/\r\n/g, '\n');

describe('guards and force', () => {
  it('answers the policy with force and the guard with data, on React', async () => {
    render(<App />);
    // No jest-dom here, so the pre-start frame is read off the element itself.
    await waitFor(() => {
      const button = screen.getByRole('button', { name: 'Jump to Done' }) as HTMLButtonElement;
      expect(button.disabled).toBe(false);
    });

    await click(screen.getByRole('button', { name: 'Jump to Done' }));
    expect(screen.getByRole('status').textContent).toContain('blocked');

    // Forcing skips the policy and arrives at the guard, which has no switch.
    await click(screen.getByRole('button', { name: 'Jump with force' }));
    expect(screen.getByRole('status').textContent).toContain('blocked');

    await type(screen.getByLabelText('Your plan') as HTMLInputElement, 'pro');

    // The guard is satisfied and the policy is not, so this is still refused.
    await click(screen.getByRole('button', { name: 'Jump to Done' }));
    expect(screen.getByRole('status').textContent).toContain('blocked');

    await click(screen.getByRole('button', { name: 'Jump with force' }));
    await waitFor(() => {
      expect(screen.getByRole('status').textContent).toContain('Moved to Done');
    });
  });

  it('does the same on Vue', async () => {
    const app = mount(AppVue);
    await flushPromises();

    const buttons = app.findAll('button');
    const jump = buttons[0];
    const forced = buttons[1];
    if (jump === undefined || forced === undefined) throw new Error('the buttons are missing');

    await jump.trigger('click');
    await flushPromises();
    expect(app.get('[role="status"]').text()).toContain('blocked');

    await forced.trigger('click');
    await flushPromises();
    expect(app.get('[role="status"]').text()).toContain('blocked');

    await app.get('input').setValue('pro');

    await jump.trigger('click');
    await flushPromises();
    expect(app.get('[role="status"]').text()).toContain('blocked');

    await forced.trigger('click');
    await flushPromises();
    expect(app.get('[role="status"]').text()).toContain('Moved to Done');
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
