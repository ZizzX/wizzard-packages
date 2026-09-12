import { mount, flushPromises } from '@vue/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import AppVue from './App.vue';
import { App } from './App';
import { STORAGE_KEY } from './flow';
import expectedOutput from './headless.out.txt?raw';

/**
 * The page's claim, checked: what was typed comes back after the page is thrown
 * away, and the person is told which of the two happened.
 *
 * Mounting twice is this suite's stand-in for a reload - the second mount reads
 * the storage the first one wrote, which is all a reload does here.
 */
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

const click = async (button: HTMLElement): Promise<void> => {
  await act(async () => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
};

/** Line endings differ between a Windows checkout and CI; the content does not. */
const lf = (s: string): string => s.replace(/\r\n/g, '\n');

describe('restore after reload', () => {
  beforeEach(() => {
    // One storage key, one jsdom, several tests: without this the next test
    // restores the previous one's session and measures the wrong thing.
    localStorage.clear();
  });

  it('brings the session back on React, and says so', async () => {
    const first = render(<App />);
    await type((await screen.findByRole('textbox')) as HTMLInputElement, 'Ada');
    await click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByLabelText('A colour')).toBeDefined();
    first.unmount();

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('status').textContent).toContain('Restored');
    });
    expect(screen.getByLabelText('A colour')).toBeDefined();
  });

  it('brings the session back on Vue, and says so', async () => {
    const first = mount(AppVue);
    await flushPromises();
    await first.get('input').setValue('Ada');
    await first.get('button[type="button"]:last-of-type').trigger('click');
    await flushPromises();
    first.unmount();

    const second = mount(AppVue);
    await flushPromises();

    expect(second.get('[role="status"]').text()).toContain('Restored');
    expect(second.text()).toContain('A colour');
  });

  it('says nothing was stored on a first visit, and saves from then on', async () => {
    const first = render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('status').textContent).toContain('Nothing saved yet');
    });

    // Not "the key is still absent" here. The plugin writes on every commit and
    // `start()` is one, behind a coalescing timer - so that assertion is a race
    // with the timer, and it is the kind that passes alone and fails in a full
    // run. Tearing the wizard down flushes what is pending, which is where the
    // answer stops depending on timing.
    first.unmount();
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
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
