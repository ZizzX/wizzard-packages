/**
 * The inspector's three modes are three claims, and each one is only worth
 * making if it cannot quietly stop being true: Live runs the engine, Replay
 * shows a run that really happened, and Preview draws a stranger's flow without
 * running anything. The cases here are the ones where a wrong implementation
 * still looks right on screen.
 */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { flowA } from '../../../contract/fixtures';

import Inspector from './Inspector';

const panel = (): HTMLElement => screen.getByText('Step detail').parentElement as HTMLElement;

describe('the inspector', () => {
  it('opens on Live with the example already drawn', async () => {
    const { container } = render(<Inspector />);
    expect(await screen.findByLabelText('Email')).toBeDefined();
    expect(container.querySelectorAll('.node').length).toBeGreaterThan(0);
  });

  it('inspects a node without navigating to it', async () => {
    const user = userEvent.setup();
    const { container } = render(<Inspector />);
    await screen.findByLabelText('Email');

    // `company` is not the step the flow is standing on. Reading it must not
    // move the flow there - the form still asks the first step's question.
    await user.click(container.querySelector('#node-company') as SVGGElement);

    expect(within(panel()).getByRole('heading', { name: 'Company' })).toBeDefined();
    expect(within(panel()).getByText('data.payer == "business"')).toBeDefined();
    expect(screen.getByLabelText('Email')).toBeDefined();
  });

  it('leaves the end behind when the run goes back', async () => {
    const user = userEvent.setup();
    render(<Inspector />);

    // Walk the business route to the end: email, company, card.
    await user.type(await screen.findByLabelText('Email'), 'ada@example.com');
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.type(await screen.findByLabelText('Company name'), 'Acme Ltd');
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.type(await screen.findByLabelText('Card number'), '4242');
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(await screen.findByRole('button', { name: 'Restart' })).toBeDefined();

    // Back is still offered, because `payment` has a back target. Taking it
    // moves the engine, so the form has to stop saying the flow is complete.
    await user.click(screen.getByRole('button', { name: 'Back' }));

    expect(await screen.findByRole('button', { name: 'Next' })).toBeDefined();
    expect(screen.queryByText('Flow complete')).toBeNull();
    expect(screen.getByLabelText('Email')).toBeDefined();
  });

  it('replays the recording, and the scrubber moves the run', async () => {
    const user = userEvent.setup();
    render(<Inspector />);
    await user.click(await screen.findByRole('button', { name: 'Replay' }));

    expect(screen.getByLabelText('Frame of the recorded run')).toBeDefined();
    expect(screen.getByText(/frame 9 of 9/)).toBeDefined();

    // The run opens at its end, where a reader can see where it got to. Walking
    // back is what the scrubber is for.
    await user.click(screen.getByRole('button', { name: /Previous/ }));
    expect(screen.getByText(/frame 8 of 9/)).toBeDefined();

    await user.click(screen.getByRole('button', { name: /^Next/ }));
    expect(screen.getByText(/frame 9 of 9/)).toBeDefined();
    // At the end there is nowhere further to go, and the control says so
    // rather than disappearing.
    expect(screen.getByRole('button', { name: /^Next/ }).hasAttribute('disabled')).toBe(true);
  });

  it('shows what one step of the recorded run changed', async () => {
    const user = userEvent.setup();
    render(<Inspector />);
    await user.click(await screen.findByRole('button', { name: 'Replay' }));

    // The last frame is the one that ended the run.
    expect(screen.getByRole('table', { name: /what this step changed/i })).toBeDefined();
    expect(screen.getByRole('rowheader', { name: 'status' })).toBeDefined();
  });

  it('lists the problems with a paste and keeps the graph it had', async () => {
    const user = userEvent.setup();
    const { container } = render(<Inspector />);
    await screen.findByLabelText('Email');
    const before = container.querySelectorAll('.node').length;

    await user.click(screen.getByText('Paste your own flow'));
    await user.type(screen.getByLabelText(/A flow is JSON/), '{{ nope');
    await user.click(screen.getByRole('button', { name: 'Draw this flow' }));

    expect(screen.getByRole('alert')).toBeDefined();
    expect(container.querySelectorAll('.node').length).toBe(before);
    // Still Live: a paste that could not be read changes nothing about the mode.
    expect(screen.getByLabelText('Email')).toBeDefined();
  });

  it('draws a pasted flow as structure, and runs nothing', async () => {
    const user = userEvent.setup();
    render(<Inspector />);
    await screen.findByLabelText('Email');

    await user.click(screen.getByText('Paste your own flow'));
    await user.click(screen.getByRole('button', { name: 'Load example' }));
    await user.click(screen.getByRole('button', { name: 'Draw this flow' }));

    expect(screen.getByText(/structure preview/)).toBeDefined();
    // The form is gone: nothing is running, so there is nothing to drive.
    expect(screen.queryByLabelText('Email')).toBeNull();
  });

  it('says why Replay is not on offer for a pasted flow', async () => {
    const user = userEvent.setup();
    render(<Inspector />);
    await screen.findByLabelText('Email');

    await user.click(screen.getByText('Paste your own flow'));
    // Pasted rather than typed: `userEvent.type` reads `{` as the start of a
    // key description, and JSON is mostly braces.
    await user.click(screen.getByLabelText(/A flow is JSON/));
    await user.paste(JSON.stringify({ id: 'other', order: ['one'], steps: { one: {} } }));
    await user.click(screen.getByRole('button', { name: 'Draw this flow' }));

    expect(screen.getByText(/structure preview/)).toBeDefined();

    const replay = screen.getByRole('button', { name: 'Replay' });
    expect(replay.hasAttribute('disabled')).toBe(true);
    // The reason is the checker's own sentence, naming both flows.
    expect(screen.getByText(/Replay is off:/).textContent).toContain(flowA.id);
  });
});

describe('recovering from a flow that could not be drawn', () => {
  it('draws the next paste after one fails in the renderer', async () => {
    const user = userEvent.setup();
    const { container } = render(<Inspector />);
    await screen.findByLabelText('Email');

    await user.click(screen.getByText('Paste your own flow'));
    const box = screen.getByLabelText(/A flow is JSON/);

    // A `to` that is an object: `validateFlow` accepts it, because `in`
    // stringifies its left operand, and the drawing used to die on it.
    await user.click(box);
    await user.paste('{"id":"x","steps":{"a":{"on":{"next":[{"to":{}}]}},"[object Object]":{}}}');
    await user.click(screen.getByRole('button', { name: 'Draw this flow' }));
    expect(screen.getByText(/structure preview/)).toBeDefined();

    // The reader corrects the flow and keeps the id, which is what everybody
    // does. The page has to draw it.
    await user.clear(box);
    await user.click(box);
    await user.paste('{"id":"x","order":["a","b"],"steps":{"a":{},"b":{}}}');
    await user.click(screen.getByRole('button', { name: 'Draw this flow' }));

    expect(container.querySelector('.stage-failed')).toBeNull();
    expect(container.querySelectorAll('.node').length).toBeGreaterThan(0);
  });
});
