import { mount, flushPromises } from '@vue/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';

import AppVue from './App.vue';
import { App } from './App';
import expectedOutput from './headless.out.txt?raw';

/**
 * The check the README's promise rests on: the example a visitor pastes runs,
 * and the value they typed is still there after Back.
 *
 * Both bindings drive the same flow file. A binding that drifts fails here
 * before it reaches a reader.
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

describe('quickstart', () => {
  it('keeps what was typed when React goes back', async () => {
    render(<App />);

    // `findBy` rather than `getBy`: the binding starts the engine in an effect,
    // so the first step arrives one tick after the first paint.
    await type((await screen.findByRole('textbox')) as HTMLInputElement, 'Ada');
    await click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Hello, Ada.')).toBeTruthy();

    await click(screen.getByRole('button', { name: 'Back' }));
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Ada');
  });

  it('keeps what was typed when Vue goes back', async () => {
    const app = mount(AppVue);
    await flushPromises();

    await app.get('input').setValue('Ada');
    await app.get('button[type="button"]:last-of-type').trigger('click');
    await flushPromises();
    expect(app.text()).toContain('Hello, Ada.');

    await app.get('button[type="button"]').trigger('click');
    await flushPromises();
    expect(app.get('input').element.value).toBe('Ada');
  });

  /**
   * The frame a server renders, and the one a slow connection shows for longer
   * than anyone would like: the engine has not started, so there is no current
   * step. The field is drawn anyway - it is the step the flow is about to enter
   * - and Next says it cannot be pressed yet, rather than being pressed and
   * doing nothing.
   */
  it('draws the first step with Next out of reach before React starts', async () => {
    render(<App />);

    expect(screen.getByRole('textbox')).toBeDefined();
    expect((screen.getByRole('button', { name: 'Next' }) as HTMLButtonElement).disabled).toBe(true);

    await waitFor(() => {
      expect((screen.getByRole('button', { name: 'Next' }) as HTMLButtonElement).disabled).toBe(
        false
      );
    });
  });

  it('draws the first step with Next out of reach before Vue starts', async () => {
    const app = mount(AppVue);

    expect(app.find('input').exists()).toBe(true);
    expect(app.get('button[type="button"]:last-of-type').attributes('disabled')).toBeDefined();

    await flushPromises();
    expect(app.get('button[type="button"]:last-of-type').attributes('disabled')).toBeUndefined();
  });

  /**
   * The headless example is a script, and the documentation page prints its
   * output beside it. The output is a file rather than a transcript someone
   * pasted, and this is what keeps the two the same.
   */
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
