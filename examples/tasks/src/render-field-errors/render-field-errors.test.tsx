import { mount, flushPromises } from '@vue/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';

import AppVue from './App.vue';
import { App } from './App';
import expectedOutput from './headless.out.txt?raw';

/**
 * The page's claim, checked: every field that is wrong says so next to itself,
 * fixing one leaves the other alone, and a message the host produced lands in
 * the same place as the validator's.
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

const click = async (element: HTMLElement): Promise<void> => {
  await act(async () => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
};

const submit = async (form: HTMLFormElement): Promise<void> => {
  await act(async () => {
    fireEvent.submit(form);
  });
};

/** Line endings differ between a Windows checkout and CI; the content does not. */
const lf = (s: string): string => s.replace(/\r\n/g, '\n');

describe('render field errors', () => {
  it('puts a message beside each field that is wrong, on React', async () => {
    const { container } = render(<App />);
    const form = container.querySelector('form') as HTMLFormElement;
    await waitFor(() => {
      expect((screen.getByLabelText('Your email') as HTMLInputElement).disabled).toBe(false);
    });

    await submit(form);

    expect(screen.getAllByRole('alert')).toHaveLength(2);
    expect(screen.getByLabelText('Your email')).toHaveProperty('ariaInvalid', 'true');
    expect(screen.getByLabelText('Card number')).toHaveProperty('ariaInvalid', 'true');

    // Fixing one field leaves the other one's message where it was.
    await type(screen.getByLabelText('Your email') as HTMLInputElement, 'ada@example.com');
    await submit(form);
    expect(screen.getAllByRole('alert')).toHaveLength(1);
    expect(screen.getByRole('alert').textContent).toContain('sixteen digits');

    // A message the engine could not have produced, in the same place.
    await click(screen.getByRole('button', { name: 'Pretend the server refused' }));
    expect(screen.getByRole('alert').textContent).toContain('declined');

    await type(screen.getByLabelText('Card number') as HTMLInputElement, '4242424242424242');
    await submit(form);

    await waitFor(() => {
      expect(screen.getByText('Both fields were fine.')).toBeDefined();
    });
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('puts a message beside each field that is wrong, on Vue', async () => {
    const app = mount(AppVue);
    await flushPromises();

    /**
     * The field a label points at, found the way a screen reader finds it. Not
     * `#email`: the ids are generated, and a test that writes one out is a test
     * that keeps passing while the association it exists to check is broken.
     */
    const field = (label: string) => {
      const id = app
        .findAll('label')
        .find((l) => l.text() === label)
        ?.attributes('for');
      if (id === undefined) throw new Error(`no label reads "${label}"`);
      return app.get(`#${id}`);
    };

    // In jsdom a click on a submit button does not run the form submission
    // algorithm, so the event is dispatched on the form itself.
    await app.get('form').trigger('submit');
    await flushPromises();

    expect(app.findAll('[role="alert"]')).toHaveLength(2);
    expect(field('Your email').attributes('aria-invalid')).toBe('true');
    expect(field('Card number').attributes('aria-invalid')).toBe('true');

    await field('Your email').setValue('ada@example.com');
    await app.get('form').trigger('submit');
    await flushPromises();
    expect(app.findAll('[role="alert"]')).toHaveLength(1);

    await field('Card number').setValue('4242424242424242');
    await app.get('form').trigger('submit');
    await flushPromises();

    expect(app.text()).toContain('Both fields were fine.');
  });

  it('gives each rendering its own ids when both share a document', async () => {
    // The page this example appears on has both renderings in it at once: the
    // tab that is not showing is hidden, not removed. Written-out ids were
    // therefore in the document twice, and every `for` and `aria-describedby`
    // resolved to whichever came first - so on the Vue tab a label pointed at
    // the React field. That is the association these pages exist to teach.
    render(<App />);
    const vue = mount(AppVue, { attachTo: document.body });
    await flushPromises();

    const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);

    vue.unmount();
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
