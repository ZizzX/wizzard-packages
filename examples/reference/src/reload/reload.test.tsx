import { render, screen } from '@testing-library/react';
import { flushPromises, mount } from '@vue/test-utils';
import { act } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

import AppVue from './App.vue';
import ReloadApp from './App';
import { APP_VERSION, STORAGE_KEY } from './flow';
import { LOOKUP_MS } from './registry';

/**
 * R-B: what survives a reload, what is refused, and what a check in flight does
 * to the buttons.
 *
 * A reload is an unmount and a mount with the same storage behind it, which is
 * what these do. The engine cannot tell the difference, and neither can the
 * plugin - that is the whole reason the snapshot is a value rather than a
 * living object.
 */
const type = async (input: HTMLElement, value: string): Promise<void> => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set as (
    this: HTMLInputElement,
    v: string
  ) => void;
  await act(async () => {
    setter.call(input as HTMLInputElement, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
};

const click = async (name: string | RegExp): Promise<void> => {
  await act(async () => {
    screen.getByRole('button', { name }).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
};

const settle = async (ms: number): Promise<void> => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, ms));
  });
};

const heading = (): string => screen.getByRole('heading').textContent ?? '';
const restoreLine = (): string => document.querySelector('.app-restore')?.textContent ?? '';
const field = (label: string): HTMLInputElement => screen.getByLabelText(label) as HTMLInputElement;

beforeEach(() => {
  localStorage.clear();
});

describe('R-B reload, React', () => {
  it('comes back where it was left, with what was typed', async () => {
    const first = render(<ReloadApp />);
    await act(async () => {});
    expect(restoreLine()).toBe('Nothing saved yet. This one will be, from the first answer.');

    await type(field('Email'), 'ada@example.com');
    await click('Next');
    expect(heading()).toBe('Name your workspace');

    // The write is coalesced to one per frame; unmounting flushes what is due.
    await settle(30);
    first.unmount();

    render(<ReloadApp />);
    await act(async () => {});
    expect(restoreLine()).toBe('Restored. You are back where you left off.');
    expect(heading()).toBe('Name your workspace');

    await click('Back');
    expect(field('Email').value).toBe('ada@example.com');
  });

  it('refuses a session written by an older version, and says which', async () => {
    const first = render(<ReloadApp />);
    await act(async () => {});
    await type(field('Email'), 'ada@example.com');
    await click('Next');
    await settle(30);
    first.unmount();

    // What "Ship version 2 and reload" does, without the reload.
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, unknown>;
    expect(stored['appVersion']).toBe(APP_VERSION);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...stored, appVersion: 0 }));

    render(<ReloadApp />);
    await act(async () => {});
    expect(restoreLine()).toBe(
      'Reset: the saved session was written by an older version of this application.'
    );
    expect(heading()).toBe('Your account');
    expect(field('Email').value).toBe('');
  });

  it('says it is checking, and Back throws the answer away', async () => {
    render(<ReloadApp />);
    await act(async () => {});
    await type(field('Email'), 'ada@example.com');
    await click('Next');

    await type(field('Workspace name'), 'acme');
    await click('Next');

    // The lookup is in the air: the engine is busy and the button says so.
    expect(screen.getByRole('button', { name: 'Checking…' })).toBeTruthy();
    expect((screen.getByRole('button', { name: 'Checking…' }) as HTMLButtonElement).disabled).toBe(
      true
    );

    await click('Back');
    expect(heading()).toBe('Your account');

    // The answer arrives for a navigation that no longer exists, and is
    // discarded rather than written over the step the visitor is now on.
    await settle(LOOKUP_MS + 50);
    expect(heading()).toBe('Your account');
    expect(document.querySelector('.field-error')).toBeNull();
  });

  it('refuses a name the service already has', async () => {
    render(<ReloadApp />);
    await act(async () => {});
    await type(field('Email'), 'ada@example.com');
    await click('Next');

    await type(field('Workspace name'), 'acme');
    await click('Next');
    await settle(LOOKUP_MS + 50);

    expect(heading()).toBe('Name your workspace');
    expect(document.querySelector('.field-error')?.textContent).toBe(
      '"acme" is taken. Try another one.'
    );

    await type(field('Workspace name'), 'ada-ltd');
    await click('Next');
    await settle(LOOKUP_MS + 50);
    expect(heading()).toBe('Confirm');
  });
});

describe('R-B reload, Vue', () => {
  it('restores a session the React rendering saved', async () => {
    const first = render(<ReloadApp />);
    await act(async () => {});
    await type(field('Email'), 'ada@example.com');
    await click('Next');
    await settle(30);
    first.unmount();

    const app = mount(AppVue, { attachTo: document.createElement('div') });
    await flushPromises();

    // One flow, one snapshot format, one storage key: the binding is a
    // rendering, and the session does not belong to it.
    expect(app.get('.app-restore').text()).toBe('Restored. You are back where you left off.');
    expect(app.get('h2').text()).toBe('Name your workspace');
    app.unmount();
  });
});
