import { render, screen } from '@testing-library/react';
import { flushPromises, mount } from '@vue/test-utils';
import { act } from 'react';
import { describe, expect, it } from 'vitest';

import AppVue from './App.vue';
import OnboardingApp from './App';

/**
 * R-A, driven the way a person drives it.
 *
 * What is asserted here is the behaviour the release claims: a branch that
 * appears and disappears with the data, a back stack that crosses it, a
 * credential that is never part of the submission, and a fast path written as
 * an explicit target list. Both bindings run the same flow file, so one that
 * drifts from the other fails here rather than on the site.
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

const click = async (name: string): Promise<void> => {
  await act(async () => {
    screen.getByRole('button', { name }).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
};

const heading = (): string => screen.getByRole('heading').textContent ?? '';
const field = (label: string): HTMLInputElement => screen.getByLabelText(label) as HTMLInputElement;
const route = (): string => screen.getByText('route').nextElementSibling?.textContent ?? '';
const submitted = (): unknown => JSON.parse(screen.getByText(/^\{/).textContent ?? '{}');

/** Fills the step on screen and moves on. */
const fill = async (label: string, value: string): Promise<void> => {
  await type(screen.getByLabelText(label), value);
};

describe('R-A onboarding, React', () => {
  it('refuses the first move and says why', async () => {
    render(<OnboardingApp />);
    await act(async () => {});

    await click('Next');
    expect(heading()).toBe('Your details');
    expect(screen.getByText('Enter your email address.')).toBeTruthy();
    expect(field('Email').getAttribute('aria-invalid')).toBe('true');
    // The refusal reaches a screen reader too, not only the field.
    expect(screen.getByRole('status').textContent).toContain('Enter your email address.');
  });

  it('routes a business payer through Company and submits neither the code nor the branch it left', async () => {
    render(<OnboardingApp />);
    await act(async () => {});

    await fill('Email', 'ada@example.com');
    await click('Business');
    await click('Next');
    expect(heading()).toBe('Verify your email');

    await fill('Six-digit code', '123456');
    await click('Next');
    expect(heading()).toBe('Company details');

    await fill('Company name', 'Acme');
    await fill('VAT number', 'GB123');
    await click('Next');
    expect(heading()).toBe('Payment');

    await fill('Card number', '4242 4242 4242 4242');
    await click('Next');
    expect(heading()).toBe('Review');

    const body = submitted() as Record<string, unknown>;
    expect(Object.keys(body)).toEqual(['details', 'company', 'payment']);
    // `clearOnLeave: true` dropped the code the moment the step was left.
    expect(body['verify']).toBeUndefined();
  });

  it('walks back across the branch and drops it when the payer changes', async () => {
    render(<OnboardingApp />);
    await act(async () => {});

    await fill('Email', 'ada@example.com');
    await click('Business');
    await click('Next');
    await fill('Six-digit code', '123456');
    await click('Next');
    await fill('Company name', 'Acme');
    await fill('VAT number', 'GB123');
    await click('Next');
    expect(heading()).toBe('Payment');

    // Back crosses the branch step, then the step whose data was cleared.
    await click('Back');
    expect(heading()).toBe('Company details');
    // The answers survived: nothing is cleared by going back to a step.
    expect(field('Company name').value).toBe('Acme');

    await click('Back');
    expect(heading()).toBe('Verify your email');
    // The code did not survive - it is the one field the flow forgets.
    expect(field('Six-digit code').value).toBe('');

    await click('Back');
    expect(heading()).toBe('Your details');
    await click('Personal');
    expect(route()).toBe('details → verify → payment → review');

    await click('Next');
    await fill('Six-digit code', '654321');
    await click('Next');
    // Company is off the route, so `next` from verify falls through to payment.
    expect(heading()).toBe('Payment');
  });

  it('takes the fast path when the visitor says they already have an account', async () => {
    render(<OnboardingApp />);
    await act(async () => {});

    await fill('Email', 'ada@example.com');
    await click('Business');
    await click('Next');
    await fill('Six-digit code', '123456');

    await act(async () => {
      screen
        .getByLabelText('I already have an account')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await click('Next');
    // An explicit target beats the order: Company and Payment are still on the
    // route, and the flow jumped over both.
    expect(heading()).toBe('Review');
    expect(route()).toContain('company');
  });
});

describe('R-A onboarding, Vue', () => {
  it('draws the same route and drops the same branch', async () => {
    const app = mount(AppVue, { attachTo: document.createElement('div') });
    await flushPromises();

    await app.get('#email').setValue('ada@example.com');
    await app.findAll('.segmented button')[1]!.trigger('click');
    // The form is submitted, not the button clicked: jsdom does not run the
    // submission algorithm for a synthetic click on a submit button.
    await app.get('form').trigger('submit');
    await flushPromises();
    expect(app.get('h2').text()).toBe('Verify your email');
    // Focus followed the flow, and the live region said where it went.
    expect(app.get('[role="status"]').text()).toBe('Verify your email. Step 2 of 5.');

    await app.get('#code').setValue('123456');
    await app.get('form').trigger('submit');
    await flushPromises();
    expect(app.get('h2').text()).toBe('Company details');

    expect(app.get('dl').text()).toContain('details → verify → company → payment → review');
    app.unmount();
  });
});
