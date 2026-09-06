import { isGroup, type FlowDefinition } from './flow';

import type { Frame, WizardState } from './state';
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

/**
 * Every flow a frame may legitimately name: the root, its inline sub-flows, the
 * registry. Exported for the same reason `checkFrames` is - `decodeSnapshot`
 * resolves the flows a stored frame names against exactly this set.
 */
export function knownFlows(
  flow: FlowDefinition,
  subFlows: Readonly<Record<string, FlowDefinition>> | undefined
): Map<string, FlowDefinition> {
  const known = new Map<string, FlowDefinition>();
  const seen = new Set<FlowDefinition>();

  const walk = (f: FlowDefinition, depth: number): void => {
    if (seen.has(f) || depth > MAX_DEPTH) return;
    seen.add(f);
    known.set(f.id, f);
    for (const step of Object.values(f.steps)) {
      if (isGroup(step) && typeof step.flow !== 'string') walk(step.flow, depth + 1);
    }
  };

  // A registered flow is walked like any other, so an inline grandchild inside
  // it resolves too — `buildGraph` follows inline children after resolving a
  // reference, and a frame deep in one is not evidence of drift. Registered
  // under the key the flow is referenced by *and* its own id, which a producer
  // is free to disagree about.
  for (const [id, def] of Object.entries(subFlows ?? {})) {
    walk(def, 0);
    known.set(id, def);
  }
  // Last, so the root's own definitions win a collision with the registry.
  walk(flow, 0);

  return known;
}

/**
 * Exported because the snapshot decoder validates the same thing: a frame
 * arriving as JSON is a frame arriving as JSON, and two copies of this check
 * would drift the way 0.x's three navigation copies drifted.
 */
export const isStackEntry = (entry: unknown): entry is Frame => {
  if (entry === null || typeof entry !== 'object') return false;
  const e = entry as Partial<Frame>;
  return (
    typeof e.flow === 'string' &&
    typeof e.step === 'string' &&
    (e.key === undefined || typeof e.key === 'string')
  );
};

/**
 * A recording arrives as JSON, so it gets to be any shape at all. Checked
 * against what this module actually reads, not against the whole of
 * `WizardState` — a field nobody looks at cannot mis-render anything.
 *
 * The stack is checked element by element rather than just for being an array:
 * everything below reads `entry.flow`, and a `stack: [null]` that got this far
 * would throw out of a checker whose whole promise is that it does not.
 */
function isFrameShaped(frame: unknown): frame is WizardState {
  if (frame === null || typeof frame !== 'object') return false;
  const f = frame as Partial<WizardState>;
  return (
    Array.isArray(f.stack) &&
    f.stack.every(isStackEntry) &&
    Array.isArray(f.visited) &&
    typeof f.status === 'string' &&
    typeof f.rev === 'number' &&
    typeof f.nav === 'number'
  );
}

/**
 * What a frame can be wrong about, so a caller can decide which ones it minds.
 *
 * `decodeSnapshot` minds fewer of them than a recording does: a frame naming a
 * flow nobody registered is pruned by the traversal on the first navigation,
 * where the same frame in a recording is drift worth reporting.
 */
export type FrameProblem = 'unknown-flow' | 'unknown-step' | 'nesting' | 'key';

/**
 * One stack, checked against the flows its frames may name.
 *
 * Exported because the snapshot decoder checks the same thing: a frame arriving
 * as JSON is a frame arriving as JSON, and two copies of this walk would drift
 * the way 0.x's three navigation copies drifted. The kind is reported beside
 * the message rather than baked into it, because the two callers disagree about
 * which kinds are fatal and neither should have to parse a sentence to find out.
 */
export function checkFrames(
  stack: readonly Frame[],
  known: Map<string, FlowDefinition>,
  report: (depth: number, problem: FrameProblem, message: string) => void
): void {
  stack.forEach((entry, depth) => {
    const owner = known.get(entry.flow);
    if (owner === undefined) {
      report(depth, 'unknown-flow', `names an unknown flow: ${entry.flow}`);
      return;
    }

    const step = owner.steps[entry.step];
    if (step === undefined) {
      report(depth, 'unknown-step', `names a step ${entry.flow} does not have: ${entry.step}`);
      return;
    }

    // Only the last entry is the current step; the ones before it enclose it.
    // A parent that is not a group, or a group leading somewhere other than
    // where the child says it is, is a stack the engine could not have built —
    // and the shape drift hides in when nobody stamped a version.
    const child = stack[depth + 1];
    if (child !== undefined) {
      if (!isGroup(step)) {
        report(depth, 'nesting', `encloses another frame, but ${entry.step} is not a group`);
      } else {
        // A string `flow` is the key the group is referenced by, and the
        // definition behind that key is free to carry a different id. The
        // frame names the id, so compare against what the reference actually
        // resolves to, falling back to the bare reference when nothing does.
        const ref = typeof step.flow === 'string' ? step.flow : step.flow.id;
        const into = known.get(ref)?.id ?? ref;
        if (into !== child.flow) {
          report(
            depth,
            'nesting',
            `is a group into ${into}, but the frame below it is in ${child.flow}`
          );
        }
      }
    }

    // `isStackEntry` already refused a `key` that is not a string, so what is
    // left is whether the step it sits on can have one at all.
    if (entry.key !== undefined && (!isGroup(step) || step.repeat === undefined)) {
      report(depth, 'key', `has an item key, but ${entry.step} is not a repeat group`);
    }
  });
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

    checkFrames(frame.stack, known, (depth, problem, message) => {
      report(`${at}.stack[${depth}]${problem === 'key' ? '.key' : ''}`, message);
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
