import type {
  Attempt,
  Hooks,
  NavIntent,
  NavResult,
  PluginHost,
  WizardState,
} from '@wizzard-packages/core/v1';

/**
 * The devtools plugin: the one piece of devtools the engine has to be told
 * about. It listens to `onAttempt`, so a refused `next()` - which never
 * commits and therefore never reaches `subscribe` - is recorded with its
 * reason; the panel and the recorder read the rings it keeps.
 *
 * It observes and never writes. Every hook body catches its own errors, so a
 * devtools bug is reported in the panel rather than disabling the plugin
 * through the engine's `fail()` path.
 */

/** A thrown value as data. An `Error` serialises to `{}`; this does not. */
export interface OutcomeError {
  name: string;
  message: string;
  stack?: string;
}

export interface Outcome {
  id: number;
  intent: NavIntent;
  source: 'call' | 'start';
  /** `rev` when the attempt ended. */
  rev: number;
  /** Exactly one of `result` and `error` is set. */
  result?: NavResult;
  error?: OutcomeError;
}

export interface Pending {
  id: number;
  intent: NavIntent;
  source: 'call' | 'start';
}

export interface DevtoolsPlugin extends Hooks {
  readonly name: 'devtools';
  /** Ended attempts, oldest first, at most `outcomes` of them. */
  readonly outcomes: readonly Outcome[];
  /** The newest attempt that has started and not ended, if any. */
  readonly pending: Pending | null;
  /** True between `init` and the wizard's `destroy`. */
  readonly attached: boolean;
  /** `rev` of the last commit this plugin saw; behind the wizard's when it is not the installed instance. */
  readonly lastRev: number;
  /** Set when a hook body or a subscriber threw; the panel shows it. */
  readonly failure: OutcomeError | null;
  /** Fires on every outcome, pending change, attachment change and failure. */
  subscribe(listener: () => void): () => void;
}

export interface DevtoolsOptions {
  /** How many ended attempts to keep. Default 500. */
  outcomes?: number;
}

export const toOutcomeError = (value: unknown): OutcomeError =>
  value instanceof Error
    ? { name: value.name, message: value.message, ...(value.stack && { stack: value.stack }) }
    : { name: 'Error', message: String(value) };

export function devtools(options: DevtoolsOptions = {}): DevtoolsPlugin {
  const cap = Math.max(1, options.outcomes ?? 500);
  const listeners = new Set<() => void>();
  let outcomes: Outcome[] = [];
  const open = new Map<number, Pending>();
  let attached = false;
  let lastRev = -1;
  let failure: OutcomeError | null = null;
  let generation = 0;

  const notify = (): void => {
    for (const l of listeners) {
      try {
        l();
      } catch (error) {
        failure = toOutcomeError(error);
      }
    }
  };

  /** Runs a hook body under a catch, so the engine never has to disable this plugin. */
  const guarded = (body: () => void): void => {
    try {
      body();
    } catch (error) {
      failure = toOutcomeError(error);
      notify();
    }
  };

  const onAttempt = (a: Attempt): void => {
    if (a.phase === 'start') {
      open.set(a.id, { id: a.id, intent: a.intent, source: a.source });
    } else {
      open.delete(a.id);
      const outcome: Outcome = {
        id: a.id,
        intent: a.intent,
        source: a.source,
        rev: a.rev,
        ...(a.phase === 'end' ? { result: a.result } : { error: toOutcomeError(a.error) }),
      };
      outcomes = [...outcomes, outcome].slice(-cap);
    }
    notify();
  };

  return {
    name: 'devtools',
    get outcomes() {
      return outcomes;
    },
    get pending() {
      let last: Pending | null = null;
      for (const p of open.values()) last = p;
      return last;
    },
    get attached() {
      return attached;
    },
    get lastRev() {
      return lastRev;
    },
    get failure() {
      return failure;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    // A second `init` while attached means a second wizard (StrictMode, Fast
    // Refresh): the plugin follows the newest one and starts its rings over,
    // and the first wizard's teardown, arriving later, is ignored. Ceiling: an
    // attempt of the first wizard that is still in flight at that moment ends
    // into the second's ring, because the hook payload names no wizard.
    init(host: PluginHost) {
      const mine = ++generation;
      guarded(() => {
        outcomes = [];
        open.clear();
        failure = null;
        attached = true;
        lastRev = host.getState().rev;
        notify();
      });
      return () => {
        if (mine !== generation) return;
        guarded(() => {
          attached = false;
          open.clear();
          notify();
        });
      };
    },
    onCommit(state: WizardState) {
      lastRev = state.rev;
    },
    onAttempt(a: Attempt) {
      guarded(() => onAttempt(a));
    },
  };
}
