/**
 * The recording and the flow are two files that have to agree, and nothing on
 * the page notices when they stop: a scrubber over a stale recording paints a
 * confident picture of a flow that no longer exists. `checkSession` is the one
 * thing that can tell, so it runs here.
 */
import { checkSession } from '@wizzard-packages/core/session';
import { describe, expect, it } from 'vitest';

import { flowA } from './fixtures';
import { recordingA } from './recording';

describe('the checked-in recording of R-A', () => {
  it('still belongs to the flow it was recorded against', () => {
    expect(checkSession(recordingA, flowA)).toEqual([]);
  });

  it('carries the refusal that makes it worth replaying', () => {
    const refused = recordingA.frames.filter((frame) => Object.keys(frame.errors).length > 0);
    expect(refused.length).toBeGreaterThan(0);
  });

  it('ends where the flow ends', () => {
    const last = recordingA.frames[recordingA.frames.length - 1];
    expect(last?.status).toBe('done');
  });
});
