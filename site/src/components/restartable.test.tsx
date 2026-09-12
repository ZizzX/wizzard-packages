/**
 * The wrapper every example island is, tested where the islands cannot be: a
 * live example only fails when something in it is broken, and a test that
 * needed a real crash would rot the moment that crash was fixed.
 *
 * What matters is the way out. An example that stopped offers Restart, and
 * Restart has to mount the application again rather than clear the message and
 * leave the same dead tree on screen.
 */
import { render, screen } from '@testing-library/react';
import { type ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { restartable } from './StageBoundary';

/** Controlled from the test: the application is broken until it is not. */
const behaviour = { throwing: true };

function Example(): ReactNode {
  if (behaviour.throwing) throw new Error('the example exploded');
  return <p>running</p>;
}

const Island = restartable(Example);

describe('restartable', () => {
  beforeEach(() => {
    behaviour.throwing = true;
    // React logs a caught error, and so does the boundary. Both are expected.
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows that the example stopped, with the reason and a way back', () => {
    render(<Island />);

    expect(screen.getByRole('alert').textContent).toContain('This example stopped');
    expect(screen.getByText('the example exploded')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Restart example' })).toBeDefined();
  });

  it('mounts the application again when Restart is pressed', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<Island />);

    behaviour.throwing = false;
    await user.click(screen.getByRole('button', { name: 'Restart example' }));

    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByText('running')).toBeDefined();
  });
});
