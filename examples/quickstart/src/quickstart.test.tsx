import { mount, flushPromises } from '@vue/test-utils';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it } from 'vitest';

import AppVue from './App.vue';
import { App } from './App';

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
});
