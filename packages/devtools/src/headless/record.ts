import { checkSession, type RecordedSession } from '@wizzard-packages/core/session';

import type { DevtoolsPlugin, Outcome } from './plugin';
import type { FlowDefinition, SubFlows, Wizard, WizardState } from '@wizzard-packages/core';

/**
 * Records a wizard into a bundle another developer can replay without the
 * sender's application: the flow, its sub-flows, the settled states in order,
 * the attempts that ended while recording, and what was left out.
 *
 * Pure over the `Wizard` interface, so a test or a Node script records the
 * same file the panel's Record button does.
 */

export type WizardLike = Pick<Wizard, 'subscribe' | 'getState' | 'getFlow'> &
  Partial<Pick<Wizard, 'isDestroyed'>>;

/**
 * Facts about a bundle, filled in by `bundle()`: the counts, whether `redact`
 * ran, the cap or flow change that ended the recording if one did, and the
 * bundle's size.
 */
export interface BundleMeta {
  frames: number;
  outcomes: number;
  redacted: boolean;
  /** Which cap stopped the recording, if one did. */
  capped: 'frames' | 'outcomes' | false;
  /** Why the recording ended early, if it did. */
  stopped: 'flow-changed' | null;
  /** Size of the bundle as UTF-8. */
  bytes: number;
}

/**
 * A recorded session as one JSON object: the flow, its sub-flows, core's
 * `RecordedSession`, the outcomes, and {@link BundleMeta}.
 */
export interface SessionBundle {
  /** The format. A reader rejects any other number. */
  version: 1;
  flow: FlowDefinition;
  subFlows?: SubFlows;
  /** Core's format, unchanged: `checkSession` validates it. */
  session: RecordedSession;
  outcomes: readonly Outcome[];
  meta: BundleMeta;
}

/** Options for {@link recordSession}. */
export interface RecordOptions {
  /** Outcomes come from here; `[]` without it. */
  plugin?: DevtoolsPlugin;
  /** Copied into the bundle so it replays alone. */
  subFlows?: SubFlows;
  /** Runs once, at export, on a copy of the whole bundle. */
  redact?: (bundle: SessionBundle) => SessionBundle;
  /** Defaults: 2000 frames, 500 outcomes. Reaching either stops the recording. */
  limits?: { frames?: number; outcomes?: number };
}

/** Controls one recording started by {@link recordSession}. */
export interface Recorder {
  /** Copies, redacts, measures. Never mutates the frames or the wizard. */
  bundle(): SessionBundle;
  /**
   * Ends the recording. Called before any settled frame exists - a recording
   * started while a navigation was in flight - it waits for the first one, so
   * a bundle is never produced with zero frames.
   */
  stop(): void;
  /** Frames recorded so far. */
  readonly frames: number;
  readonly capped: BundleMeta['capped'];
  /** True from a `stop()` called before the first frame until that frame arrives. */
  readonly stopping: boolean;
  /** True once the recording has ended, for any reason. */
  readonly stopped: boolean;
}

const DOCS = 'https://zizzx.github.io/wizzard-packages/errors/devtools-export-failed';

/** What was thrown, as its message when it has one: a `throw null` has no `.message` to read. */
const messageOf = (error: unknown): unknown =>
  (error as { message?: unknown } | null | undefined)?.message ?? error;

const isBundle = (v: unknown): v is SessionBundle => {
  // Read as the untrusted value it is: any field may be missing or of any type.
  const b = v as {
    version?: unknown;
    flow?: { id?: unknown; steps?: unknown };
    outcomes?: unknown;
    session?: { flow?: unknown; frames?: unknown };
  } | null;
  return (
    typeof b === 'object' &&
    b !== null &&
    b.version === 1 &&
    typeof b.flow?.id === 'string' &&
    typeof b.flow.steps === 'object' &&
    b.flow.steps !== null &&
    Array.isArray(b.outcomes) &&
    typeof b.session?.flow === 'string' &&
    Array.isArray(b.session.frames)
  );
};

/**
 * Starts recording a wizard and returns the {@link Recorder} that controls it.
 *
 * Every state the wizard settles in becomes a frame, starting with the current
 * one; a state committed while a navigation is in flight is skipped. With
 * `plugin`, the attempts that end during the recording are kept as well. The
 * recording ends on `stop()`, when a limit is reached, or when the wizard's
 * flow changes, and `bundle()` turns it into a {@link SessionBundle} that
 * replays without the application.
 */
export function recordSession(wizard: WizardLike, options: RecordOptions = {}): Recorder {
  const { plugin, subFlows, redact } = options;
  const maxFrames = Math.max(1, options.limits?.frames ?? 2000);
  const maxOutcomes = Math.max(1, options.limits?.outcomes ?? 500);
  const flow = wizard.getFlow();
  const frames: WizardState[] = [];
  const outcomes: Outcome[] = [];
  let capped: BundleMeta['capped'] = false;
  let stopped: BundleMeta['stopped'] = null;
  let stopping = false;
  // Widened: `take` below can end the recording before `subscribe` is reached.
  let ended = false as boolean;

  // Only attempts that end during the recording belong to it. The plugin's
  // ring holds the ones that ended before; anything else it shows is new.
  const seen = new Set<number>(plugin?.outcomes.map((o) => o.id));

  const unsubscribers: (() => void)[] = [];
  const finish = (): void => {
    ended = true;
    stopping = false;
    for (const u of unsubscribers.splice(0)) u();
  };

  const take = (state: WizardState): void => {
    if (state.status === 'busy') return;
    frames.push(state);
    if (frames.length >= maxFrames) {
      capped = 'frames';
      finish();
    } else if (stopping) {
      finish();
    }
  };

  take(wizard.getState());
  if (!ended) {
    unsubscribers.push(
      wizard.subscribe(() => {
        if (ended) return;
        if (wizard.getFlow() !== flow) {
          stopped = 'flow-changed';
          finish();
          return;
        }
        take(wizard.getState());
      })
    );
    if (plugin) {
      unsubscribers.push(
        plugin.subscribe(() => {
          if (ended) return;
          for (const o of plugin.outcomes) {
            if (seen.has(o.id)) continue;
            seen.add(o.id);
            outcomes.push(o);
            if (outcomes.length >= maxOutcomes) {
              capped = 'outcomes';
              finish();
              return;
            }
          }
        })
      );
    }
  }

  return {
    get frames() {
      return frames.length;
    },
    get capped() {
      return capped;
    },
    get stopping() {
      return stopping;
    },
    get stopped() {
      return ended;
    },
    stop() {
      if (ended) return;
      if (frames.length === 0) stopping = true;
      else finish();
    },
    bundle() {
      const raw: SessionBundle = {
        version: 1,
        flow,
        ...(subFlows && { subFlows }),
        session: {
          flow: flow.id,
          ...(flow.version !== undefined && { version: flow.version }),
          frames,
        },
        outcomes,
        meta: { frames: 0, outcomes: 0, redacted: false, capped, stopped, bytes: 0 },
      };
      // The state is JSON by contract, so a JSON round-trip is the copy: nothing
      // live reaches the redactor. A cycle is the usual way it fails; a BigInt
      // or a throwing `toJSON` are the others, and are named as what they are.
      let copy: SessionBundle;
      try {
        copy = JSON.parse(JSON.stringify(raw)) as SessionBundle;
      } catch (error) {
        const detail = String(messageOf(error)).split('\n')[0] ?? '';
        const cause = /circular|cyclic/i.test(detail)
          ? 'holds a circular reference'
          : 'cannot be serialised as JSON';
        throw new Error(
          `[wizzard] export stopped: the state ${cause} (${detail}). Recorded state must be JSON. Fix the value; redact runs after the copy and cannot remove it. ${DOCS}`
        );
      }
      let out = copy;
      if (redact) {
        try {
          out = redact(copy);
        } catch (error) {
          throw new Error(
            `[wizzard] export stopped: redact threw ${String(messageOf(error))}. Nothing was copied. The hook must return a SessionBundle; fix it, or remove it to export unredacted development data. ${DOCS}`
          );
        }
        if (!isBundle(out)) {
          throw new Error(
            `[wizzard] export stopped: redact returned something that is not a SessionBundle. Nothing was copied. The hook must return the bundle it was given, changed as needed; fix it, or remove it to export unredacted development data. ${DOCS}`
          );
        }
        // The frames are what a reader replays, so the reader's own check runs here.
        const problem = checkSession(out.session, out.flow, out.subFlows)[0] as
          | ReturnType<typeof checkSession>[number]
          | undefined;
        if (problem !== undefined) {
          throw new Error(
            `[wizzard] export stopped: redact returned a session checkSession rejects (${problem.path}, ${problem.code}). Nothing was copied. The hook must keep every frame a state of the recorded flow; fix it, or remove it to export unredacted development data. ${DOCS}`
          );
        }
      }
      const meta: BundleMeta = {
        frames: out.session.frames.length,
        outcomes: out.outcomes.length,
        redacted: redact !== undefined,
        capped,
        stopped,
        bytes: 0,
      };
      const done = { ...out, meta };
      // `bytes` counts itself: measured with the field at 0, then widened by
      // the digits the final number takes, so the value is the exact size.
      const base = new TextEncoder().encode(JSON.stringify(done)).length - 1;
      for (let digits = 1; ; digits++) {
        if (String(base + digits).length === digits) {
          meta.bytes = base + digits;
          break;
        }
      }
      return done;
    },
  };
}
