import { mount, flushPromises } from '@vue/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';

import AppVue from './App.vue';
import { App } from './App';
import expectedOutput from './headless.out.txt?raw';

/**
 * The page's claim, checked: a move that the validator refuses does not happen,
 * says which field is wrong, and the same move succeeds once the field is.
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

const submit = async (form: HTMLFormElement): Promise<void> => {
  await act(async () => {
    fireEvent.submit(form);
  });
};

/** Line endings differ between a Windows checkout and CI; the content does not. */
const lf = (s: string): string => s.replace(/\r\n/g, '\n');

describe('block next until valid', () => {
  it('refuses the move and names the field, on React', async () => {
    const { container } = render(<App />);
    const form = await waitFor(() => {
      const found = container.querySelector('form');
      if (found === null) throw new Error('no form yet');
      return found;
    });
    await waitFor(() => {
      expect((screen.getByLabelText('Your email') as HTMLInputElement).disabled).toBe(false);
    });

    await submit(form);

    expect(screen.getByRole('alert').textContent).toContain('Enter your email address');
    expect(screen.getByLabelText('Your email')).toHaveProperty('ariaInvalid', 'true');
    expect(screen.queryByText('That address will do.')).toBeNull();

    await type(screen.getByLabelText('Your email') as HTMLInputElement, 'ada@example.com');
    await submit(form);

    await waitFor(() => {
      expect(screen.getByText('That address will do.')).toBeDefined();
    });
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('refuses the move and names the field, on Vue', async () => {
    const app = mount(AppVue);
    await flushPromises();

    // In jsdom a click on a submit button does not run the form submission
    // algorithm, so the event is dispatched on the form itself.
    await app.get('form').trigger('submit');
    await flushPromises();

    expect(app.get('[role="alert"]').text()).toContain('Enter your email address');
    expect(app.get('input').attributes('aria-invalid')).toBe('true');

    await app.get('input').setValue('ada@example.com');
    await app.get('form').trigger('submit');
    await flushPromises();

    expect(app.text()).toContain('That address will do.');
    expect(app.find('[role="alert"]').exists()).toBe(false);
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
