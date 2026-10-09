/**
 * The hero theater's scenario, as data (docs/designs/hero-theater.md).
 *
 * A cue is one thing the theater does, and the stillness before it. Act 1 writes
 * `trip.flow.ts` a line at a time, and the graph grows by a step at the line
 * where that step's definition starts. Act 2 fills the form the way a visitor
 * would - one `set` per keystroke, one `next()` per press of the button - on a
 * real wizard, so what the console prints is what the engine answered.
 *
 * Nothing here touches the DOM or a clock: `usePlayer` keeps the time and the
 * theater draws each cue. The file Act 1 writes is the module the engine runs,
 * read here as text, so the two cannot drift apart. A line this file looks for
 * and does not find exactly once stops the build here, rather than lighting the
 * wrong line on the homepage; like `lib/walk.ts`, that error only ever meets
 * whoever edits the homepage, so it has no `[wizzard]` prefix and no errors page.
 */
import { SCOUT_MS } from '../lib/walk';

import { trip } from './trip.flow';
import source from './trip.flow.ts?raw';

import type { FlowDefinition, NavResult, Wizard } from '@wizzard-packages/core';

/** What a cue does. */
export type Act =
  /** Act 1: the first `upTo` lines of the file are on screen, and they define `steps`. */
  | { readonly kind: 'write'; readonly upTo: number; readonly steps: readonly string[] }
  /** Act 2: a field or a control writes `value` at `path`; `log` puts the call in the console. */
  | { readonly kind: 'set'; readonly path: string; readonly value: unknown; readonly log: boolean }
  /** Act 2: the form's button is pressed, and the console shows the answer. */
  | { readonly kind: 'next' };

export interface Cue {
  /** Milliseconds of stillness before the cue. */
  readonly delay: number;
  readonly act: Act;
  /** The line of the file lit while the cue plays, counted from 0. */
  readonly light?: number;
}

/** The file Act 1 writes, one entry per line. */
export const lines: readonly string[] = source.trimEnd().split('\n');

/**
 * The one line of the file that contains `text`, counted from 0. Throws when no
 * line does or more than one does: a marker that has drifted must stop the
 * build, not light the wrong line.
 */
export function lineOf(text: string): number {
  const found = lines.flatMap((line, index) => (line.includes(text) ? [index] : []));
  const [index] = found;
  if (found.length !== 1 || index === undefined) {
    throw new Error(
      `trip.flow.ts has ${found.length} lines containing "${text}", not one. ` +
        'The theater finds a line by its text, so the text has to be on exactly one line. ' +
        'Change the text in site/src/theater/script.ts, or the line in trip.flow.ts.'
    );
  }
  return index;
}

/** How long Act 1 takes, however long the file is. */
const WRITE_MS = 6000;
/** Between two keystrokes. */
const KEY_MS = 50;
/** Before a control changes: the eye has to find it first. */
const SET_MS = 400;
/** Before the button is pressed. */
const PRESS_MS = 500;
/** The stillness that opens a beat, so one beat reads as done before the next begins. */
const BEAT_MS = 800;

/** The line each trip step's definition starts on, in the trip's order. */
const starts = trip.order.map((id) => lineOf(`${id}: `));

const act1: readonly Cue[] = lines.map(
  (_, index): Cue => ({
    delay: Math.round(WRITE_MS / lines.length),
    act: {
      kind: 'write',
      upTo: index + 1,
      steps: trip.order.filter((_id, at) => (starts[at] ?? Infinity) <= index),
    },
  })
);

/**
 * Where one passenger's answer lives. The engine leaves an item's data to the
 * host, and the host keys it by the item, as `loop.key` does in the flow.
 */
export const answer = (key: string, field: 'name' | 'passport'): string =>
  `answers.${key}.${field}`;

/** `count` travellers, keyed the way the passenger group repeats them. */
export const travellers = (count: number): { id: string }[] =>
  Array.from({ length: count }, (_, index) => ({ id: `p${index + 1}` }));

/** Where the scenario starts, and where "Try it yourself" puts the form back. */
export const initialData = (): Record<string, unknown> => ({ passengers: travellers(1) });

/** `text` typed into the field at `path`: one keystroke, one `set`. */
const typeInto = (path: string, text: string): Cue[] => {
  const keys = [...text];
  return keys.map(
    (_, index): Cue => ({
      delay: KEY_MS,
      act: { kind: 'set', path, value: keys.slice(0, index + 1).join(''), log: false },
    })
  );
};

/** A control changed: a box ticked, a stepper moved. */
const control = (path: string, value: unknown, log = false): Cue => ({
  delay: SET_MS,
  act: { kind: 'set', path, value, log },
});

/** The form's button pressed. */
const press = (): Cue => ({ delay: PRESS_MS, act: { kind: 'next' } });

/** `cue`, lighting the line of the file that explains it. */
const lit = (cue: Cue, text: string): Cue => ({ ...cue, light: lineOf(text) });

/** One beat: its cues, the first held back by `hold`. */
const beat = (hold: number, ...cues: Cue[]): Cue[] =>
  cues.map((cue, index) => (index === 0 ? { ...cue, delay: cue.delay + hold } : cue));

const act2: readonly Cue[] = [
  // The route, and a second traveller.
  ...beat(
    BEAT_MS,
    ...typeInto('route.from', 'Almaty'),
    ...typeInto('route.to', 'Tbilisi'),
    control('passengers', travellers(2))
  ),
  // A business trip: Company's condition holds, and Company joins the route.
  ...beat(BEAT_MS, lit(control('business', true, true), "eq(get('data.business'), true)")),
  // Into the passenger group, on the first of the two - once the scout has shown
  // Company joining the route: a press puts the graph back on the engine.
  ...beat(SCOUT_MS, lit(press(), 'repeat: {')),
  // The first passenger has a passport, and passes.
  ...beat(
    BEAT_MS,
    ...typeInto(answer('p1', 'name'), 'Ada Lovelace'),
    ...typeInto(answer('p1', 'passport'), 'C0FFEE42'),
    press()
  ),
  // The second has none, and the validator refuses the move.
  ...beat(
    BEAT_MS,
    ...typeInto(answer('p2', 'name'), 'Alan Turing'),
    lit(press(), "validate: ref('passport')")
  ),
  // The error is read, the passport typed, and the group left for Company.
  ...beat(2 * BEAT_MS, ...typeInto(answer('p2', 'passport'), 'B1TC0DE7'), press()),
  // The company's name.
  ...beat(BEAT_MS, ...typeInto('company.name', 'Analytical Engines'), press()),
  // Payment: the button books the trip.
  ...beat(BEAT_MS, press()),
];

/** The whole scenario: Act 1, then Act 2. */
export const scenario: readonly Cue[] = [...act1, ...act2];

/**
 * The trip as far as Act 1 has written it: only `steps`, in the trip's order.
 * Given every step it is the trip, so the last graph Act 1 draws is the one the
 * engine runs.
 */
export function flowUpTo(steps: readonly string[]): FlowDefinition {
  return {
    ...trip,
    order: trip.order.filter((id) => steps.includes(id)),
    steps: Object.fromEntries(Object.entries(trip.steps).filter(([id]) => steps.includes(id))),
  };
}

/** A move's answer as the console prints it: where it went, or why it did not. */
export function summarize(result: NavResult): string {
  if (result.ok) return `{ ok: true, to: '${result.to}' }`;
  if (result.errors === undefined) return `{ ok: false, reason: '${result.reason}' }`;
  const errors = Object.entries(result.errors).map(([field, message]) => `${field}: '${message}'`);
  return `{ ok: false, errors: { ${errors.join(', ')} } }`;
}

/**
 * The console's line for a cue: the call for a logged write, `next()` and then
 * its answer for a press, and `null` for what the console does not show.
 */
export function printCall(act: Act, result?: NavResult): string | null {
  if (act.kind === 'next') {
    return result === undefined ? 'next()' : `next() -> ${summarize(result)}`;
  }
  if (act.kind === 'set' && act.log) return `set('${act.path}', ${JSON.stringify(act.value)})`;
  return null;
}

/** Does to `wizard` what `act` says, and returns `next()`'s answer when the act is a press. */
export async function perform(wizard: Wizard, act: Act): Promise<NavResult | undefined> {
  if (act.kind === 'set') wizard.set(act.path, act.value);
  if (act.kind === 'next') return wizard.next();
  return undefined;
}
