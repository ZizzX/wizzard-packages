/**
 * The hero is the page's whole claim: the form, the caption and the graph are
 * three views of one engine, so any two of them disagreeing is worse than a
 * missing feature. Both cases here were found in review and both came from a
 * view deriving its state from something other than the engine.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import HeroFlow from './HeroFlow';

describe('the hero instrument', () => {
  it('moves off a step the payer choice has just excluded', async () => {
    const user = userEvent.setup();
    render(<HeroFlow />);

    // Business, so `company` is on the route. Walk on to it.
    await user.type(await screen.findByLabelText('Email'), 'someone@company.com');
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(await screen.findByLabelText('Company name')).toBeDefined();

    // Personal drops `company` from the route. The engine was standing on it.
    await user.click(screen.getByRole('button', { name: 'Personal' }));

    // The form asks the question of a step that is actually on the route, and
    // the caption agrees with it.
    expect(await screen.findByLabelText('Card number')).toBeDefined();
    expect(screen.getByText('details -> payment -> end')).toBeDefined();
  });

  it('keeps a refusal visible when another control writes a cheerful message', async () => {
    const user = userEvent.setup();
    const { container } = render(<HeroFlow />);

    // Refused: the validator wants an email and there is none.
    await user.click(await screen.findByRole('button', { name: 'Next' }));
    const field = await screen.findByLabelText('Email');
    expect(field.getAttribute('aria-invalid')).toBe('true');
    expect(container.querySelector('.node.error')).not.toBeNull();

    // Choosing a payer says something upbeat. The refusal is still real: the
    // engine still holds `email: required` and the next `next()` still fails.
    await user.click(screen.getByRole('button', { name: 'Business' }));

    expect(field.getAttribute('aria-invalid')).toBe('true');
    expect(container.querySelector('.node.error')).not.toBeNull();
  });

  it('clears the refusal on the engine when the field is edited', async () => {
    const user = userEvent.setup();
    const { container } = render(<HeroFlow />);

    await user.click(await screen.findByRole('button', { name: 'Next' }));
    const field = await screen.findByLabelText('Email');
    expect(field.getAttribute('aria-invalid')).toBe('true');

    await user.type(field, 'a');

    expect(field.getAttribute('aria-invalid')).toBe('false');
    expect(container.querySelector('.node.error')).toBeNull();
  });
});
