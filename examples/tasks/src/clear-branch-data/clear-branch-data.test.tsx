import { mount, flushPromises } from '@vue/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';

import AppVue from './App.vue';
import { App } from './App';
import expectedOutput from './headless.out.txt?raw';

/**
 * The page's claim, checked: the step that says `clearOnLeave` does not put its
 * answer in the submission, and the step that merely went off the route does.
 */
const click = async (element: HTMLElement): Promise<void> => {
  await act(async () => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
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

const next = async (): Promise<void> => {
  await click(screen.getByRole('button', { name: 'Next' }));
};

describe('clear abandoned branch data', () => {
  it('keeps the branch it left and drops the step that asked to be dropped', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('group')).toBeDefined();
    });

    await click(screen.getByLabelText('Business'));
    await next();

    await type(screen.getByLabelText('Company name') as HTMLInputElement, 'Acme');
    await next();

    await type(screen.getByLabelText('Coupon code') as HTMLInputElement, 'SPRING');
    await next();

    const submitted = screen.getByText(/"plan"/).textContent ?? '';
    expect(submitted).toContain('Acme');
    // Left the coupon step, so the code is not in what would be submitted.
    expect(submitted).not.toContain('SPRING');
    expect(submitted).not.toContain('coupon');
  });

  it('keeps what an abandoned branch collected, on Vue', async () => {
    const app = mount(AppVue);
    await flushPromises();

    await app.get('input[value="business"]').setValue('business');
    await app.get('button[type="button"]:last-of-type').trigger('click');
    await flushPromises();

    await app.get('input').setValue('Acme');
    await app.get('button[type="button"]:last-of-type').trigger('click');
    await flushPromises();

    // Straight past the coupon step, which leaves it and clears it.
    await app.get('button[type="button"]:last-of-type').trigger('click');
    await flushPromises();

    expect(app.get('pre').text()).toContain('Acme');
    expect(app.get('pre').text()).not.toContain('coupon');
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
