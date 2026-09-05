import { decodeSnapshot, toSnapshot, type RestoreReason } from '@wizzard-packages/core/snapshot';

import type { FlowDefinition, Hooks } from '@wizzard-packages/core/v1';

/**
 * Keeps a wizard across a reload.
 *
 * What is stored is the durable snapshot from core, never the running state:
 * the fields that describe a moment - a navigation in flight, a step loading,
 * a validator's errors - are the ones that make a restored wizard come back
 * stuck. What is read back is validated before it is installed, because
 * storage is a trust boundary like any other input.
 *
 * The plugin never throws. A browser that refuses storage, a quota that fills
 * up, a snapshot from a flow that has since changed: each of them means this
 * session is not coming back, and none of them is a reason to break the wizard
 * the person is filling in right now.
 */
export interface PersistOptions {
  /** Storage key. One per flow, or one per flow per user. */
  key: string;
  /**
   * Where to put it. `localStorage` by default, `sessionStorage` for anything
   * that should not outlive the tab - which is the right answer for a form with
   * anything sensitive in it, since this stores whatever the flow collects.
   */
  storage?: SyncStorage;
  /**
   * The application's own version. Bumped when the meaning of the stored data
   * changes, which is different from the flow changing shape.
   */
  version?: number;
  /** Upgrades a snapshot written by an older format. See `decodeSnapshot`. */
  migrate?: (snapshot: { v: number } & Record<string, unknown>) => unknown;
  /**
   * What happened when the wizard started. A host that says nothing leaves the
   * person guessing why the form they half filled in is empty again.
   */
  onRestore?: (outcome: RestoreOutcome) => void;
}

/** The synchronous slice of the Storage interface this needs. */
export interface SyncStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

interface NotRestored {
  restored: false;
  reason: RestoreReason | 'persist/nothing-stored' | 'persist/unavailable';
}

export type RestoreOutcome = { restored: true } | NotRestored;

/** Coalescing window. One write per frame, not one per keystroke. */
const WRITE_AFTER_MS = 16;

const DOCS = 'https://zizzx.github.io/wizzard-packages/errors';

export function persist(options: PersistOptions): Hooks {
  const { key, version, migrate, onRestore } = options;
  let storage: SyncStorage | undefined;
  let flowOf: (() => FlowDefinition) | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pending: string | undefined;
  /** One warning per code, not one per commit. */
  const warned = new Set<string>();

  /**
   * Problem, cause, fix, link - the shape every diagnostic in this library
   * takes. A message that names only the symptom leaves the reader to find the
   * rest, which is the thing the template exists to stop.
   */
  const warn = (code: string, problem: string, cause: string, fix: string): void => {
    if (warned.has(code)) return;
    warned.add(code);
    console.warn(`[wizzard] ${problem}. ${cause}. ${fix}. ${DOCS}/${code.replace('/', '-')}`);
  };

  const flush = (): void => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
    if (pending === undefined || storage === undefined) return;
    const value = pending;
    pending = undefined;
    try {
      storage.setItem(key, value);
    } catch (error) {
      // Quota, or a browser that allows reads and refuses writes. Either way
      // the session is not coming back, and neither is a reason to interrupt
      // the one in progress.
      warn(
        'persist/write-failed',
        'The wizard could not be saved',
        `storage refused the write (${describe(error)})`,
        'free some space, or pass a storage of your own; this session will not survive a reload'
      );
      storage = undefined;
    }
  };

  return {
    name: 'persist',

    init(host) {
      flowOf = () => host.getFlow();

      /**
       * Starting clean is a decision worth announcing. A form that was half
       * filled in and is now empty looks like a bug to whoever is filling it,
       * and silence is why they would think so.
       */
      const refuse = (reason: NotRestored['reason']): (() => void) => {
        warn(
          'persist/not-restored',
          'The saved wizard was not restored, so it starts fresh',
          `the stored session was refused (${reason})`,
          'this is expected after a flow or version change; clear the key to stop the warning'
        );
        onRestore?.({ restored: false, reason });
        return teardown;
      };

      storage = options.storage ?? defaultStorage();
      if (storage === undefined) {
        warn(
          'persist/unavailable',
          'The wizard cannot be saved',
          'this browser did not allow storage, which private windows commonly do',
          'pass a storage of your own, or accept that this session will not survive a reload'
        );
        onRestore?.({ restored: false, reason: 'persist/unavailable' });
        return;
      }

      let raw: string | null;
      try {
        raw = storage.getItem(key);
      } catch (error) {
        warn(
          'persist/unavailable',
          'The saved wizard could not be read',
          `storage refused the read (${describe(error)})`,
          'pass a storage of your own, or accept that this session starts fresh'
        );
        storage = undefined;
        onRestore?.({ restored: false, reason: 'persist/unavailable' });
        return;
      }

      // A pending write is worth more than the frame it was waiting for: a
      // person who edits a field and closes the tab has not asked to lose it.
      const onHide = (): void => {
        flush();
      };
      // Typed as possibly absent because it is: a wizard built during server
      // rendering has no window to listen to, and the DOM lib's types say
      // otherwise.
      const target = globalThis as Partial<
        Pick<Window, 'addEventListener' | 'removeEventListener'>
      >;
      target.addEventListener?.('pagehide', onHide);
      const teardown = (): void => {
        target.removeEventListener?.('pagehide', onHide);
        flush();
      };

      if (raw === null) {
        onRestore?.({ restored: false, reason: 'persist/nothing-stored' });
        return teardown;
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        // Corrupt, truncated, or written by something else entirely.
        return refuse('snapshot/unreadable');
      }

      // `JSON.parse` happily returns null, a number or a string, and reading a
      // property off the first of those throws - inside `init`, where throwing
      // disables the plugin rather than starting a session cleanly.
      if (parsed === null || typeof parsed !== 'object') return refuse('snapshot/unreadable');

      const stored = parsed as { appVersion?: unknown; snapshot?: unknown };
      if (version !== undefined && stored.appVersion !== version) {
        return refuse('snapshot/other-flow');
      }

      const result = decodeSnapshot(host.getFlow(), stored.snapshot, {
        migrate,
        epoch: host.getState().nav,
      });

      if (!result.restored) return refuse(result.reason);

      // Through `commit`, like every other write: the restore is a commit, the
      // epoch moves with it, and anything begun before it is superseded.
      host.commit(result.state);
      onRestore?.({ restored: true });
      return teardown;
    },

    onCommit(state) {
      if (storage === undefined || flowOf === undefined) return;
      // The flow comes from the host rather than the state, because identity is
      // the whole point of storing it: a snapshot has to know which flow it
      // belongs to, and `patchFlow` can change that flow under a running wizard.
      pending = JSON.stringify({
        ...(version === undefined ? {} : { appVersion: version }),
        snapshot: toSnapshot(state, flowOf()),
      });
      timer ??= setTimeout(flush, WRITE_AFTER_MS);
    },
  };
}

const describe = (error: unknown): string =>
  error instanceof Error ? `${error.name}: ${error.message}` : String(error);

/**
 * `localStorage` unless the browser refuses to admit it exists. Private modes
 * throw on the property itself rather than on the call, which is why this is a
 * try and not a check.
 */
function defaultStorage(): SyncStorage | undefined {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}
