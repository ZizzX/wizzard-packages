import type { RecordedSession } from '@wizzard-packages/core/session';
import type { FlowDefinition, SubFlows, Wizard, WizardState } from '@wizzard-packages/core/v1';

import type { DevtoolsPlugin, Outcome } from './plugin';

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

export interface Recorder {
  /** Copies, redacts, measures. Never mutates the frames or the wizard. */
  bundle(): SessionBundle;
  /**
   * Ends the recording. Called before any settled frame exists - a recording
   * started while a navigation was in flight - it waits for the first one, so
   * a bundle is never produced with zero frames.
   */
  stop(): void;
  readonly frames: number;
  readonly capped: BundleMeta['capped'];
  readonly stopping: boolean;
  readonly stopped: boolean;
}

const DOCS =
  'https://github.com/ZizzX/wizzard-packages/blob/main/docs/errors.md#devtools-export-failed';

const isBundle = (v: unknown): v is SessionBundle => {
  const b = v as Partial<SessionBundle> | null;
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
  let ended = false;

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
        const detail = String((error as Error).message ?? error).split('\n')[0] ?? '';
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
            `[wizzard] export stopped: redact threw ${String((error as Error).message ?? error)}. Nothing was copied. The hook must return a SessionBundle; fix it, or remove it to export unredacted development data. ${DOCS}`
          );
        }
        if (!isBundle(out)) {
          throw new Error(
            `[wizzard] export stopped: redact returned something that is not a SessionBundle. Nothing was copied. The hook must return the bundle it was given, changed as needed; fix it, or remove it to export unredacted development data. ${DOCS}`
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
