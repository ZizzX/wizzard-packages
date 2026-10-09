/**
 * The theater plays its scenario on the wizard it provides, so what the form,
 * the console and the graph show is whatever the engine did. These play it on
 * fake timers and read the result the way a visitor would.
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SCOUT_MS } from '../lib/walk';
import { lineOf, lines, scenario } from '../theater/script';

import Theater from './Theater';

/** The highlighted file, as `index.astro` hands it over: one `.line` per line. */
const code = (
  <pre>
    <code>
      {lines.map((line, index) => (
        <span key={index} className="line">
          {line}
        </span>
      ))}
    </code>
  </pre>
);

/** Milliseconds from the start until cue `index` has run. */
const until = (index: number): number =>
  scenario.slice(0, index + 1).reduce((sum, cue) => sum + cue.delay, 0);

const wait = (ms: number): Promise<void> =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });

const refusal = scenario.findIndex((cue) => cue.light === lineOf("validate: ref('passport')"));
const act2 = scenario.findIndex((cue) => cue.act.kind !== 'write');
const unwritten = (): number => document.querySelectorAll('.line.unwritten').length;
const consoleText = (): string => document.querySelector('.theater-console')?.textContent ?? '';
const inert = (): boolean | undefined =>
  document.querySelector('.theater-form form')?.hasAttribute('inert');

/** Mounts the theater as the page does when there is time to play. */
async function playing(): Promise<void> {
  document.documentElement.classList.add('theater-pending');
  render(<Theater>{code}</Theater>);
  await wait(0);
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  document.documentElement.classList.remove('theater-pending');
});

describe('the hero theater', () => {
  it('is the final frame, live, when the page did not ask it to play', async () => {
    render(<Theater>{code}</Theater>);
    await wait(0);
    expect(screen.queryByRole('button', { name: 'Stop' })).toBeNull();
    expect(unwritten()).toBe(0);
    expect(inert()).toBe(false);
    expect(screen.getByRole('log', { name: 'Console' })).toBeDefined();
  });

  it('takes the class from the page and starts on an empty editor', async () => {
    await playing();
    expect(document.documentElement.classList.contains('theater-pending')).toBe(false);
    expect(screen.getByRole('button', { name: 'Stop' })).toBeDefined();
    expect(unwritten()).toBe(lines.length);
    expect(inert()).toBe(true);
    // Silent while it plays: no live region to announce every call.
    expect(screen.queryByRole('log')).toBeNull();
  });

  it('is refused on the second passenger, with the error under the passport', async () => {
    await playing();
    await wait(until(refusal));
    expect(screen.getByText('Passenger 2 of 2')).toBeDefined();
    const passport = screen.getByLabelText('Passport');
    expect(passport.getAttribute('aria-invalid')).toBe('true');
    expect(screen.getByText('required')).toBeDefined();
    expect(consoleText()).toContain("next() -> { ok: false, errors: { passport: 'required' } }");
    expect(document.querySelector('.node.group.error')).not.toBeNull();
  });

  it('leaves the refusal behind when the visitor goes back to the passenger before', async () => {
    await playing();
    await wait(until(refusal));
    fireEvent.pointerDown(screen.getByLabelText('Passport'));
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    await wait(0);
    expect(screen.getByText('Passenger 1 of 2')).toBeDefined();
    expect(screen.getByLabelText('Passport').getAttribute('aria-invalid')).toBe('false');
    expect(screen.queryByText('required')).toBeNull();
    expect(document.querySelector('.node.group.error')).toBeNull();
  });

  it('takes the passenger group off the route when nobody travels', async () => {
    render(<Theater>{code}</Theater>);
    await wait(0);
    fireEvent.change(screen.getByLabelText('Travellers'), { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await wait(0);
    expect(consoleText()).toContain("next() -> { ok: true, to: 'payment' }");
  });

  it('scouts the route when the data moves a step across it, and Next puts the engine back', async () => {
    render(<Theater>{code}</Theater>);
    await wait(0);
    const graph = (): SVGSVGElement | null => document.querySelector('.theater-graph svg');
    expect(graph()?.classList.contains('scout')).toBe(false);

    fireEvent.click(screen.getByLabelText('Business trip'));
    await wait(0);
    expect(graph()?.classList.contains('scout')).toBe(true);
    expect(document.querySelector('.node.probed.heals .walk-eval')?.textContent).toBe(
      'true == true'
    );

    // A second change is a second scout, over the route the first one left.
    fireEvent.click(screen.getByLabelText('Business trip'));
    await wait(0);
    expect(document.querySelector('.node.probed:not(.heals) .walk-eval')?.textContent).toBe(
      'false != true'
    );

    // One traveller or two: nothing changes sides, so the scout playing is left
    // to play, not started over.
    const playing = document.querySelector('.walk-eval');
    fireEvent.change(screen.getByLabelText('Travellers'), { target: { value: '2' } });
    await wait(0);
    expect(document.querySelector('.walk-eval')).toBe(playing);

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await wait(0);
    expect(graph()?.classList.contains('scout')).toBe(false);
    expect(document.querySelector('.comet, .walk-eval, .ring')).toBeNull();
  });

  it('scouts Company joining the route at the second beat, and holds the press for it', async () => {
    await playing();
    const ticked = scenario.findIndex(
      (cue) => cue.act.kind === 'set' && cue.act.path === 'business'
    );
    await wait(until(ticked));
    expect(document.querySelector('.node.probed.heals .walk-eval')?.textContent).toBe(
      'true == true'
    );
    await wait(SCOUT_MS - 1);
    expect(document.querySelector('.theater-graph svg')?.classList.contains('scout')).toBe(true);
  });

  it('books the trip, and offers it back', async () => {
    await playing();
    await wait(until(scenario.length - 1));
    expect(screen.getByText('Almaty -> Tbilisi, 2 passengers')).toBeDefined();
    expect(consoleText()).toContain("next() -> { ok: true, to: '@end' }");
    expect(screen.queryByRole('button', { name: 'Stop' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Try it yourself' }));
    await wait(0);
    expect((screen.getByLabelText('From') as HTMLInputElement).value).toBe('');
    expect(consoleText()).not.toContain('next()');
    // A restart takes Company off the route, and that is not a change to scout.
    expect(document.querySelector('.theater-graph svg')?.classList.contains('scout')).toBe(false);

    await wait(until(scenario.length - 1));
    expect(screen.queryByText('Booked')).toBeNull();
  });

  it('plays again from the empty editor', async () => {
    await playing();
    await wait(until(scenario.length - 1));
    fireEvent.click(screen.getByRole('button', { name: 'Play again' }));
    await wait(0);
    expect(unwritten()).toBe(lines.length);
    expect(screen.getByRole('button', { name: 'Stop' })).toBeDefined();
    await wait(until(refusal));
    expect(screen.getByLabelText('Passport').getAttribute('aria-invalid')).toBe('true');
  });

  it('hands the visitor the form on the beat a press in it lands on', async () => {
    await playing();
    await wait(until(act2 + 2));
    const typed = (screen.getByLabelText('From') as HTMLInputElement).value;
    expect(typed).toBe('Alm');

    fireEvent.pointerDown(screen.getByLabelText('From'));
    await wait(until(scenario.length - 1));
    expect(screen.queryByRole('button', { name: 'Stop' })).toBeNull();
    expect((screen.getByLabelText('From') as HTMLInputElement).value).toBe(typed);
    expect(screen.getByRole('log', { name: 'Console' })).toBeDefined();

    // From here the calls are the visitor's, and the console says so.
    fireEvent.click(screen.getByLabelText('Business trip'));
    await wait(0);
    expect(consoleText()).toContain("set('business', true)");
  });

  it('finishes the file at once when stopped while it is being written', async () => {
    await playing();
    await wait(until(5));
    expect(unwritten()).toBe(lines.length - 6);

    fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
    await wait(until(scenario.length - 1));
    expect(unwritten()).toBe(0);
    expect(inert()).toBe(false);
    // Every step, and the end: the whole trip, not the part written so far.
    expect(document.querySelectorAll('.theater-graph svg .node')).toHaveLength(5);
  });
});
