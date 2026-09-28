import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';

import { talks } from '../07-plugin/registry';
import AppVue from './App.vue';
import { App } from './App';

/**
 * The tutorial ends on this wizard, rendered on both bindings. One walk drives
 * each of them through everything the seven steps added: the refusal, the
 * branch, a guest, the step that loads, and the plugin's trail.
 *
 * The walk reads the page the way a person does - by label and role - so the
 * same script holds for a React tree and a Vue one.
 */
const next = (): void => {
  fireEvent.click(screen.getByRole('button', { name: 'Next' }));
};

const walk = async (): Promise<void> => {
  fireEvent.input(await screen.findByLabelText('Name'), { target: { value: 'Ada' } });
  next();
  // Refused by the validator: still on the step, and told why.
  expect((await screen.findByRole('alert')).textContent).toBe('Enter an email address.');

  fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
  next();

  fireEvent.click(await screen.findByRole('radio', { name: 'business' }));
  fireEvent.click(screen.getByRole('button', { name: 'Add a guest' }));
  fireEvent.input(await screen.findByRole('textbox', { name: 'Guest 1' }), {
    target: { value: 'Grace' },
  });
  next();

  // On the route because the ticket is business - and off it again once the
  // ticket is standard.
  await screen.findByLabelText('Company');
  fireEvent.click(screen.getByRole('button', { name: 'Back' }));
  fireEvent.click(await screen.findByRole('radio', { name: 'standard' }));
  next();

  // Inside the group: the step knows whose pass it is, and a field whose path
  // names the guest shows what was typed into it - read back, not just written.
  fireEvent.input(await screen.findByLabelText("Name on Grace's badge"), {
    target: { value: 'G. Hopper' },
  });
  await screen.findByDisplayValue('G. Hopper');
  next();
  fireEvent.change(await screen.findByLabelText('What does Grace eat?'), {
    target: { value: 'vegan' },
  });
  await screen.findByDisplayValue('Vegan');
  fireEvent.click(screen.getByRole('button', { name: 'Back' }));
  await screen.findByDisplayValue('G. Hopper');
  next();
  await screen.findByDisplayValue('Vegan');
  next();

  // Entered once the agenda is in, so the talks are there to pick.
  fireEvent.click(await screen.findByRole('checkbox', { name: 'Flows as data' }));
  next();

  expect(
    (await screen.findByText(/standard ticket/)).textContent?.replace(/\s+/g, ' ').trim()
  ).toBe('Ada (ada@example.com), standard ticket, with Grace.');
  expect(screen.getByText(/^Landed on:/).textContent).toBe(
    'Landed on: attendee → ticket → company → ticket → badge → diet → badge → diet → sessions → review'
  );

  fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  await screen.findByRole('heading', { name: 'You are registered' });
};

describe('the tutorial, rendered', () => {
  beforeEach(() => {
    // `persist` writes to localStorage; a session left by an earlier test would
    // be restored and start the walk in the wrong place.
    localStorage.clear();
  });

  it('walks on React', async () => {
    const view = render(<App />);
    await walk();
    view.unmount();
  });

  it('walks on Vue', async () => {
    const view = mount(AppVue, { attachTo: document.body });
    await walk();
    view.unmount();
  });

  it.each([
    ['React', () => render(<App />).unmount],
    [
      'Vue',
      () => {
        const view = mount(AppVue, { attachTo: document.body });
        return () => view.unmount();
      },
    ],
  ] as const)('brings the agenda back after a reload on sessions, on %s', async (_name, open) => {
    let close = open();
    fireEvent.input(await screen.findByLabelText('Name'), { target: { value: 'Ada' } });
    fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
    next();
    fireEvent.click(await screen.findByRole('radio', { name: 'standard' }));
    next();
    await screen.findByRole('checkbox', { name: 'Flows as data' });
    close();

    // A new page: the session is in storage, the agenda that `load` fetched is
    // not. The restore lands on `sessions` without running its load.
    talks.splice(0);
    close = open();
    await screen.findByRole('checkbox', { name: 'Flows as data' });
    close();
  });

  it('keeps the React and the Vue session apart', async () => {
    // The page mounts both at once. Under one key the idle one would restore,
    // and later overwrite, the progress made in the other tab.
    const react = render(<App />);
    fireEvent.input(await screen.findByLabelText('Name'), { target: { value: 'Ada' } });
    fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
    next();
    await screen.findByRole('radio', { name: 'business' });
    // Unmounting flushes the pending write, as leaving the page does.
    react.unmount();

    const vue = mount(AppVue, { attachTo: document.body });
    expect(((await screen.findByLabelText('Name')) as HTMLInputElement).value).toBe('');
    vue.unmount();
  });
});
