import { flushPromises, mount } from '@vue/test-utils';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AppVue from './App.vue';
import OwnedVue from './Owned.vue';
import { App } from './App';
import { Owned } from './Owned';
import { wizard } from './wizard';

/**
 * The page's claims, checked on both bindings: the provider starts the engine,
 * the hooks read and write it, a refused `next()` shows its message, and an
 * engine passed in is started but never destroyed by the binding.
 */
describe('hooks, on React', () => {
  it('starts, refuses an empty name, and moves once there is one', async () => {
    render(<App />);
    const input = await screen.findByLabelText(/Trip name/);
    expect(screen.getByText('0% done')).toBeTruthy();

    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });
    expect(screen.getByRole('alert').textContent).toBe('Give the trip a name.');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Lisbon' } });
    });
    expect(screen.getByText('6 characters')).toBeTruthy();

    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });
    await waitFor(() => expect(screen.getByText('Ready to book Lisbon.')).toBeTruthy());
    expect(screen.getByText('50% done')).toBeTruthy();
  });

  it('starts an engine it was given and leaves it alive on unmount', async () => {
    const { unmount } = render(<Owned />);
    await screen.findByLabelText(/Trip name/);
    expect(wizard.getSnapshot().current).toBe('details');
    unmount();
    expect(wizard.isDestroyed()).toBe(false);
  });
});

describe('hooks, on Vue', () => {
  it('starts, refuses an empty name, and moves once there is one', async () => {
    const app = mount(AppVue);
    await flushPromises();
    expect(app.text()).toContain('0% done');

    await app.findAll('button')[1]?.trigger('click');
    await flushPromises();
    expect(app.find('[role="alert"]').text()).toBe('Give the trip a name.');

    await app.find('input').setValue('Lisbon');
    expect(app.text()).toContain('6 characters');

    await app.findAll('button')[1]?.trigger('click');
    await flushPromises();
    expect(app.text()).toContain('Ready to book Lisbon.');
    expect(app.text()).toContain('50% done');
    app.unmount();
  });

  it('starts an engine it was given and leaves it alive on unmount', async () => {
    const app = mount(OwnedVue);
    await flushPromises();
    expect(wizard.getSnapshot().current).toBe('details');
    app.unmount();
    expect(wizard.isDestroyed()).toBe(false);
    wizard.destroy();
  });
});
