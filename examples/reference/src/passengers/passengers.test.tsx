import { render, screen } from '@testing-library/react';
import { flushPromises, mount } from '@vue/test-utils';
import { act } from 'react';
import { describe, expect, it } from 'vitest';

import AppVue from './App.vue';
import PassengersApp from './App';

/**
 * R-C: a block of steps run once per passenger, and the frame stack that makes
 * going back into one of them possible.
 *
 * The interesting assertions are about identity: the second passenger stays the
 * second passenger after the third is finished, and stays themselves when one
 * is removed from in front of them.
 */
const click = async (name: string | RegExp): Promise<void> => {
  await act(async () => {
    screen.getByRole('button', { name }).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
};

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

const heading = (): string => screen.getByRole('heading', { level: 2 }).textContent ?? '';
const where = (): string => document.querySelector('.app-where')?.textContent ?? '';
const stack = (): string => document.querySelectorAll('.app-state dd')[0]?.textContent ?? '';

/** Names the passengers already in the list, adding rows until there are `n`. */
async function party(names: readonly string[]): Promise<void> {
  for (let i = 1; i < names.length; i++) await click('Add a passenger');
  const inputs = screen.getAllByRole('textbox');
  for (const [i, name] of names.entries()) await type(inputs[i] as HTMLElement, name);
}

/** Answers the passenger on screen and moves on. */
async function answer(seat: string, meal: string): Promise<void> {
  await click(seat);
  await click('Next');
  await click(meal);
  await click('Next');
}

describe('R-C passengers, React', () => {
  it('runs the block once per passenger and reviews them all', async () => {
    render(<PassengersApp />);
    await act(async () => {});
    expect(heading()).toBe('Who is travelling');

    await party(['Ada', 'Grace', 'Alan']);
    await click('Next');

    expect(where()).toContain('Passenger 1 of 3, Ada');
    // The stack is two deep inside a group: the frame that names the item, and
    // the child step it is standing on.
    expect(stack()).toBe('trip.people[p1] / passenger.seat');
    await answer('Window', 'Standard');

    expect(where()).toContain('Passenger 2 of 3, Grace');
    await answer('Aisle', 'Vegetarian');

    expect(where()).toContain('Passenger 3 of 3, Alan');
    await answer('Window', 'None');

    expect(heading()).toBe('Review');
    const rows = screen.getAllByRole('row').slice(1);
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('AdaWindowStandard'),
      expect.stringContaining('GraceAisleVegetarian'),
      expect.stringContaining('AlanWindowNone'),
    ]);
  });

  it('goes back into the second passenger after the third is finished', async () => {
    render(<PassengersApp />);
    await act(async () => {});
    await party(['Ada', 'Grace', 'Alan']);
    await click('Next');
    await answer('Window', 'Standard');
    await answer('Aisle', 'Vegetarian');
    await answer('Window', 'None');
    expect(heading()).toBe('Review');

    await click('Edit Grace');
    expect(where()).toContain('Passenger 2 of 3, Grace');
    expect(stack()).toBe('trip.people[p2] / passenger.seat');
    // Their answer is where they left it, addressed by key rather than index.
    expect(screen.getByRole('button', { name: 'Aisle' }).getAttribute('aria-pressed')).toBe('true');

    await click('Window');
    await click('Next');
    expect(heading()).toBe('Meal');
    expect(screen.getByRole('button', { name: 'Vegetarian' }).getAttribute('aria-pressed')).toBe(
      'true'
    );
  });

  it('keeps a passenger themselves when the one in front is removed', async () => {
    render(<PassengersApp />);
    await act(async () => {});
    await party(['Ada', 'Grace', 'Alan']);
    await click('Next');
    await answer('Window', 'Standard');
    await answer('Aisle', 'Vegetarian');
    await answer('Window', 'None');

    // `back()` pops whole stacks, so it walks the block in reverse rather than
    // leaving it. Getting to the list is a jump, which the flow's `free` policy
    // allows and the review offers.
    await click('Change who is travelling');
    expect(heading()).toBe('Who is travelling');
    // Ada's row is the first one.
    await act(async () => {
      screen
        .getAllByRole('button', { name: 'Remove' })[0]
        ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await click('Next');
    // Grace is first now, and still Grace: the index moved, the key did not.
    expect(where()).toContain('Passenger 1 of 2, Grace');
    expect(screen.getByRole('button', { name: 'Aisle' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('walks past the group when nobody is travelling', async () => {
    render(<PassengersApp />);
    await act(async () => {});
    await click('Remove');
    await click('Next');
    // The group's own `when` is false, so it is not on the route at all.
    expect(heading()).toBe('Review');
    expect(stack()).toBe('trip.review');
  });
});

describe('R-C passengers, the two ways a list goes wrong', () => {
  it('does not hand a new passenger the answers of a removed one', async () => {
    render(<PassengersApp />);
    await act(async () => {});
    await party(['Ada', 'Grace', 'Alan']);
    await click('Next');
    await answer('Window', 'Standard');
    await answer('Aisle', 'Vegetarian');
    await answer('Window', 'None');
    await click('Change who is travelling');

    // Drop the last passenger, who is the one whose key is about to be free.
    await act(async () => {
      screen
        .getAllByRole('button', { name: 'Remove' })[2]
        ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await click('Add a passenger');
    await act(async () => {});

    for (let i = 0; i < 6 && !where().includes('Passenger 3 of 3'); i++) await click('Next');
    expect(where()).toContain('Passenger 3 of 3');
    // A key is a data path. Removing somebody removes their answers, so the
    // person given that key next starts empty rather than in their seat.
    expect(screen.getByRole('button', { name: 'Window' }).getAttribute('aria-pressed')).toBe(
      'false'
    );
  });

  it('books the trip and stops navigating once it is booked', async () => {
    render(<PassengersApp />);
    await act(async () => {});
    await click('Next');
    await answer('Window', 'Standard');
    expect(heading()).toBe('Review');

    await click('Book the trip');
    expect(
      screen.getByText('Booked. Nothing below moves until this one starts again.')
    ).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Book the trip' })).toBeNull();

    await click('Start again');
    expect(heading()).toBe('Who is travelling');
  });
});

describe('R-C passengers, Vue', () => {
  it('runs the same block once per passenger', async () => {
    const app = mount(AppVue, { attachTo: document.createElement('div') });
    await flushPromises();
    expect(app.get('h2').text()).toBe('Who is travelling');

    const press = async (label: string): Promise<void> => {
      const button = app.findAll('button').find((b) => b.text() === label);
      if (button === undefined) throw new Error(`no button named ${label}`);
      await button.trigger('click');
      await flushPromises();
    };

    await press('Add a passenger');
    await app.findAll('.party input')[0]!.setValue('Ada');
    await app.findAll('.party input')[1]!.setValue('Grace');
    await press('Next');

    expect(app.get('.app-where').text()).toContain('Passenger 1 of 2, Ada');
    expect(app.findAll('.app-state dd')[0]!.text()).toBe('trip.people[p1] / passenger.seat');
    app.unmount();
  });
});
