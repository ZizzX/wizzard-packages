/**
 * The scrubber's whole claim is that frame N shows what the visitor saw at
 * moment N. These assertions are that claim, against the checked-in recording
 * of R-A, whose story is: start, a refusal, the email, the company, the card,
 * the end.
 */
import { describe, expect, it } from 'vitest';

import { flowA, registryA } from '../../../contract/fixtures';
import { recordingA } from '../../../contract/recording';

import { replayFrames } from './replay';

const frames = replayFrames(recordingA, flowA, registryA);

describe('replayFrames', () => {
  it('produces one frame per recorded state', () => {
    expect(frames).toHaveLength(recordingA.frames.length);
  });

  it('stands where the recorded stack stood', () => {
    expect(frames[1]?.view.standing).toBe('details');
    expect(frames[4]?.view.standing).toBe('company');
    expect(frames[6]?.view.standing).toBe('payment');
  });

  it('marks the frame whose step the engine refused', () => {
    // Frame 2 is the refused `next()`: the validator wanted an email.
    expect(frames[2]?.view.refused).toBe(true);
    expect(frames[1]?.view.refused).toBe(false);
  });

  it('does not call a step blocked for a refusal held against another one', () => {
    // The engine clears a step's errors when it commits past it, so no frame of
    // this recording carries one. A restored session can: `errors` is part of
    // the snapshot, and a run resumed on `company` still holds what `details`
    // was refused for. Blocking `company` for it would be a lie, so the state
    // is built rather than found.
    const stale = {
      ...(recordingA.frames[4] as (typeof recordingA.frames)[number]),
      errors: { details: { email: 'required' } },
    };
    const [frame] = replayFrames({ ...recordingA, frames: [stale] }, flowA, registryA);
    expect(frame?.view.standing).toBe('company');
    expect(frame?.view.refused).toBe(false);
  });

  it('reads the route out of the data of that frame', () => {
    // `payer` is business throughout, so `company` is on the route.
    expect(frames[1]?.active).toEqual(['details', 'company', 'payment']);
  });

  it('ends ended', () => {
    const last = frames[frames.length - 1];
    expect(last?.view.ended).toBe(true);
    expect(last?.caption).toBe('end reached');
  });

  it('counts a step against the route, not against the definition', () => {
    expect(frames[1]?.caption).toBe('step 1 of 3');
    expect(frames[6]?.caption).toBe('step 3 of 3');
  });

  it('counts the opening frame as step one, where it is about to stand', () => {
    // `init`, empty stack: no current step yet. The graph still has to draw
    // something, and drawing every node as upcoming would be a worse lie than
    // drawing the step the run is one call away from.
    expect(frames[0]?.state.stack).toEqual([]);
    expect(frames[0]?.view.standing).toBe('details');
    expect(frames[0]?.caption).toBe('step 1 of 3');
  });
});
