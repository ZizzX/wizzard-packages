/**
 * The boundary is the net under everything the page has not met yet, so the
 * thing to assert is not that it catches — that is React's job — but that it
 * lets go. A boundary that has caught stays caught until its key changes, and
 * the first version of this one keyed on the flow's id: a reader correcting a
 * flow keeps the id, so the one way out of a failure was the one that did not
 * work.
 *
 * Tested against a child that throws on purpose rather than against a pasted
 * flow, because every flow that used to reach the renderer and throw is now
 * refused before it gets there. A test that needs a live crash to prove the
 * recovery would rot the moment the next crash is fixed.
 */
import { render, screen } from '@testing-library/react';
import { useState, type ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { StageBoundary } from './StageBoundary';

function Boom({ throwing }: { throwing: boolean }): ReactNode {
  if (throwing) throw new Error('the drawing exploded');
  return <p>drawn</p>;
}

/** The page's shape: a control that redraws, and the boundary around the draw. */
function Page({ resetOnDraw }: { resetOnDraw: boolean }): ReactNode {
  const [draws, setDraws] = useState(0);
  const [throwing, setThrowing] = useState(true);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setThrowing(false);
          setDraws((n) => n + 1);
        }}
      >
        Draw
      </button>
      {/* `flow` stands for the key that does not change when a reader corrects
          a flow in place, which is what the first version keyed on. */}
      <StageBoundary resetKey={resetOnDraw ? draws : 'flow'}>
        <Boom throwing={throwing} />
      </StageBoundary>
    </>
  );
}

describe('StageBoundary', () => {
  beforeEach(() => {
    // React logs a caught error, and so does the boundary. Both are expected
    // here and neither is the thing under test.
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows the failure instead of taking the page with it', () => {
    render(<Page resetOnDraw />);
    expect(screen.getByRole('alert').textContent).toContain('could not be drawn');
    expect(screen.getByText('the drawing exploded')).toBeDefined();
    // The control the reader needs is still there, which is the whole point.
    expect(screen.getByRole('button', { name: 'Draw' })).toBeDefined();
  });

  it('lets go when the key counts draws', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<Page resetOnDraw />);

    await user.click(screen.getByRole('button', { name: 'Draw' }));

    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByText('drawn')).toBeDefined();
  });

  it('stays caught when the key cannot change, which is the bug it had', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<Page resetOnDraw={false} />);

    await user.click(screen.getByRole('button', { name: 'Draw' }));

    // Nothing is wrong with the child any more, and the page is still stuck.
    expect(screen.getByRole('alert')).toBeDefined();
    expect(screen.queryByText('drawn')).toBeNull();
  });
});
