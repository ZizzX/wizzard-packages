import { useCallback, useMemo, useRef, useSyncExternalStore } from 'react';
import type { FlowDefinition, WizardState } from '@wizzard-packages/core/v1';
import { diffState } from './headless';
import type { DevtoolsPlugin, Outcome, Pending, WizardLike } from './headless';
import { stopped } from './messages';

/**
 * One snapshot over both sources the panel reads - the wizard and the plugin -
 * behind one `useSyncExternalStore` call. Two stores would tear: a render could
 * pair a new commit with the outcome list from before it, and the strip would
 * then say a move succeeded while the state below it is the refused one.
 *
 * Every callback registered here runs under a catch. The engine calls its
 * subscribers bare, so a throwing listener would surface inside the host's own
 * `set()`; on a failure the panel unsubscribes, keeps what it has, and reports
 * it (`devtools-stopped`).
 */

/** A settled commit, kept with what it takes to draw it after later commits arrive. */
export interface CommitRow {
  rev: number;
  /** The state as it was committed. A pinned row keeps its own copy. */
  state: WizardState;
  /** The definition observed at the time; `patchFlow` replaces it (§14.3). */
  flow: FlowDefinition;
  /** Top frame's step, or null on an empty stack. */
  step: string | null;
  /** How many paths changed against the previous commit. */
  changes: number;
}

export interface Observed {
  state: WizardState | null;
  flow: FlowDefinition | null;
  /** Settled commits, oldest first, capped by `limits.activity`. */
  commits: readonly CommitRow[];
  /** Dropped from the front of the ring; the Activity header says so. */
  dropped: number;
  outcomes: readonly Outcome[];
  pending: Pending | null;
  attached: boolean;
  lastRev: number;
  destroyed: boolean;
  /** Set once a devtools callback threw. The panel stops updating. */
  failure: string | null;
}

const EMPTY: Observed = {
  state: null,
  flow: null,
  commits: [],
  dropped: 0,
  outcomes: [],
  pending: null,
  attached: false,
  lastRev: -1,
  destroyed: false,
  failure: null,
};

const topStep = (state: WizardState): string | null =>
  state.stack.length > 0 ? (state.stack[state.stack.length - 1]?.step ?? null) : null;

/**
 * The store behind the hook. It is a plain object rather than a hook body
 * because `useSyncExternalStore` needs `subscribe` and `getSnapshot` to be
 * stable across renders, and the ring has to survive them.
 */
function createObserver(
  wizard: WizardLike | null,
  plugin: DevtoolsPlugin | undefined,
  cap: number
): { subscribe: (onChange: () => void) => () => void; snapshot: () => Observed } {
  let commits: CommitRow[] = [];
  let dropped = 0;
  let snapshot: Observed = EMPTY;
  let failure: string | null = null;

  const read = (): Observed => {
    if (!wizard) return { ...EMPTY, failure };
    const state = wizard.getState();
    return {
      state,
      flow: wizard.getFlow(),
      commits,
      dropped,
      outcomes: plugin?.outcomes ?? [],
      pending: plugin?.pending ?? null,
      attached: plugin?.attached ?? false,
      lastRev: plugin?.lastRev ?? -1,
      destroyed: wizard.isDestroyed?.() ?? false,
      failure: failure ?? (plugin?.failure ? stopped(plugin.failure.message) : null),
    };
  };

  /**
   * A busy state is a navigation in flight, not a commit: `beginNav` bumps
   * `rev` and notifies before anything settles, and a frame recorded there
   * fails `checkSession`. The strip reads those notifications for its pending
   * segment; the ring takes settled states only (§14.2).
   */
  const record = (state: WizardState, flow: FlowDefinition): void => {
    if (state.status === 'busy') return;
    const last = commits[commits.length - 1];
    if (last && last.rev === state.rev) return;
    const row: CommitRow = {
      rev: state.rev,
      state,
      flow,
      step: topStep(state),
      changes: diffState(last?.state ?? state, state).length,
    };
    commits = [...commits, row];
    if (commits.length > cap) {
      dropped += commits.length - cap;
      commits = commits.slice(-cap);
    }
  };

  return {
    subscribe(onChange) {
      if (!wizard) return () => {};
      const unsubscribes: (() => void)[] = [];
      /** Any throw from here stops the panel rather than reaching the host. */
      const stop = (error: unknown): void => {
        failure = stopped(error instanceof Error ? error.message : String(error));
        for (const off of unsubscribes.splice(0)) {
          try {
            off();
          } catch {
            /* the panel is already stopping */
          }
        }
        snapshot = { ...snapshot, failure };
        onChange();
      };

      const update = (): void => {
        try {
          record(wizard.getState(), wizard.getFlow());
          snapshot = read();
          onChange();
        } catch (error) {
          stop(error);
        }
      };

      try {
        record(wizard.getState(), wizard.getFlow());
        snapshot = read();
        unsubscribes.push(wizard.subscribe(update));
        if (plugin) {
          unsubscribes.push(
            plugin.subscribe(() => {
              try {
                snapshot = read();
                onChange();
              } catch (error) {
                stop(error);
              }
            })
          );
        }
      } catch (error) {
        stop(error);
      }

      return () => {
        for (const off of unsubscribes.splice(0)) {
          try {
            off();
          } catch {
            /* unsubscribing twice is not an error worth reporting */
          }
        }
      };
    },
    snapshot() {
      if (snapshot === EMPTY && wizard) {
        try {
          snapshot = read();
        } catch (error) {
          failure = stopped(error instanceof Error ? error.message : String(error));
          snapshot = { ...EMPTY, failure };
        }
      }
      return snapshot;
    },
  };
}

export function useObserved(
  wizard: WizardLike | null,
  plugin: DevtoolsPlugin | undefined,
  cap: number
): Observed {
  const observer = useMemo(() => createObserver(wizard, plugin, cap), [wizard, plugin, cap]);
  const subscribe = useCallback((onChange: () => void) => observer.subscribe(onChange), [observer]);
  const getSnapshot = useCallback(() => observer.snapshot(), [observer]);
  /** The server never has a wizard to read; the panel is a client component. */
  const serverSnapshot = useRef(EMPTY).current;
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
