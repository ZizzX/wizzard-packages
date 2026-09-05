import { isGroup, type FlowDefinition } from './flow';

import type { WizardState } from './state';
import type { FlowProblem } from './validate-flow';

/**
 * A recorded run of a flow: the frames a scrubber replays, plus enough identity
 * to tell whether they still belong to the flow being replayed.
 *
 * Pure JSON, like the flow itself. A recording is written by hand for a demo or
 * dumped from a running wizard, and nothing downstream can tell which.
 */
export interface RecordedSession {
  /** Id of the flow this was recorded against. */
  flow: string;
  /** `FlowDefinition.version` at record time. Absent means the producer stamped none. */
  version?: number;
  /** Snapshots in the order they were taken. */
  frames: readonly WizardState[];
}

/** Same cap as the graph builder: thirty-two distinct flows deep is not nesting. */
const MAX_DEPTH = 32;

/** Every flow a frame may legitimately name: the root, its inline sub-flows, the registry. */
function knownFlows(
  flow: FlowDefinition,
  subFlows: Readonly<Record<string, FlowDefinition>> | undefined
): Map<string, FlowDefinition> {
  const known = new Map<string, FlowDefinition>();
  for (const [id, def] of Object.entries(subFlows ?? {})) known.set(id, def);

  const seen = new Set<FlowDefinition>();
  const walk = (f: FlowDefinition, depth: number): void => {
    if (seen.has(f) || depth > MAX_DEPTH) return;
    seen.add(f);
    known.set(f.id, f);
    for (const step of Object.values(f.steps)) {
      if (isGroup(step) && typeof step.flow !== 'string') walk(step.flow, depth + 1);
    }
  };
  walk(flow, 0);

  return known;
}

/**
 * A recording arrives as JSON, so it gets to be any shape at all. Checked
 * against what this module actually reads, not against the whole of
 * `WizardState` — a field nobody looks at cannot mis-render anything.
 */
function isFrameShaped(frame: unknown): frame is WizardState {
  if (frame === null || typeof frame !== 'object') return false;
  const f = frame as Partial<WizardState>;
  return (
    Array.isArray(f.stack) &&
    Array.isArray(f.visited) &&
    typeof f.status === 'string' &&
    typeof f.rev === 'number' &&
    typeof f.nav === 'number'
  );
}

/**
 * Checks a recording before a scrubber is allowed to replay it.
 *
 * The failure this exists to catch is drift: a recording made against an older
 * flow still renders. Every frame draws, every breadcrumb lights up, and the
 * whole thing is a plausible lie — the worst kind of bug, because nothing looks
 * broken. So identity is checked first, and the frames are checked against the
 * flow they claim to come from rather than against themselves.
 *
 * Pure, and never throws: a bad recording is reported the way a bad flow is,
 * in the same `FlowProblem` register `validateFlow` uses.
 */
export function checkSession(
  session: RecordedSession,
  flow: FlowDefinition,
  subFlows?: Readonly<Record<string, FlowDefinition>>
): FlowProblem[] {
  const problems: FlowProblem[] = [];
  const report = (path: string, message: string): void => {
    problems.push({ path, message });
  };
  const drift = 'this recording does not match this flow';

  if (session.flow !== flow.id) {
    report('flow', `${drift}: recorded against ${session.flow}, replayed against ${flow.id}`);
  }
  // Only when both sides stamped one. An unstamped producer is a gap in the
  // recording, not evidence of drift, and reporting it would train people to
  // ignore the one message that matters.
  if (
    session.version !== undefined &&
    flow.version !== undefined &&
    session.version !== flow.version
  ) {
    report(
      'version',
      `${drift}: recorded against version ${session.version}, flow is version ${flow.version}`
    );
  }

  if (!Array.isArray(session.frames) || session.frames.length === 0) {
    report('frames', 'recording has no frames');
    return problems;
  }

  const known = knownFlows(flow, subFlows);
  let previous: WizardState | undefined;

  session.frames.forEach((frame, index) => {
    const at = `frames[${index}]`;

    if (!isFrameShaped(frame)) {
      report(at, 'is not a wizard state — the recording is truncated or corrupt');
      return;
    }

    // `rev` is the memoization key for every selector and `nav` the epoch token
    // that defeats races. Either moving backwards is a state the engine could
    // not have produced, so the frames were reordered or spliced.
    if (previous !== undefined) {
      if (frame.rev < previous.rev) {
        report(`${at}.rev`, `moves backwards: ${previous.rev} then ${frame.rev}`);
      }
      if (frame.nav < previous.nav) {
        report(`${at}.nav`, `moves backwards: ${previous.nav} then ${frame.nav}`);
      }
    }
    previous = frame;

    if (frame.stack.length === 0) {
      if (frame.status !== 'init') {
        report(`${at}.stack`, `is empty, but status is ${frame.status}`);
      }
      return;
    }

    frame.stack.forEach((entry, depth) => {
      const path = `${at}.stack[${depth}]`;
      const owner = known.get(entry.flow);
      if (owner === undefined) {
        report(path, `names an unknown flow: ${entry.flow}`);
        return;
      }

      const step = owner.steps[entry.step];
      if (step === undefined) {
        report(path, `names a step ${entry.flow} does not have: ${entry.step}`);
        return;
      }

      if (entry.i === undefined) return;
      if (!Number.isInteger(entry.i) || entry.i < 0) {
        report(`${path}.i`, `is not an iteration index: ${entry.i}`);
      } else if (!isGroup(step) || step.repeat === undefined) {
        report(`${path}.i`, `has an iteration index, but ${entry.step} is not a repeat group`);
      }
    });

    // `select.ts` reads `visited` to colour every breadcrumb. A current step
    // missing from it mis-highlights this frame and every frame after it.
    const current = frame.stack[frame.stack.length - 1];
    if (current !== undefined && !frame.visited.includes(current.step)) {
      report(`${at}.visited`, `does not contain the current step: ${current.step}`);
    }
  });

  return problems;
}
