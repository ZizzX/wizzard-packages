// Read by React Server Components bundlers from `dist`; inert everywhere else.
// `directive.test.ts` checks it survives the build.
'use client';

import {
  createWizard,
  getPath,
  type FlowDefinition,
  type Snapshot,
  type Wizard,
  type WizardOptions,
} from '@wizzard-packages/core/v1';
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

/**
 * The React binding.
 *
 * It does one job: bridge an external store into React. Navigation, guards,
 * validation and ordering are the engine's, not this file's. That is the whole
 * point — in 0.x this layer was 2118 lines and reimplemented next and prev,
 * which is how it drifted away from the Vue layer that reimplemented them
 * again.
 *
 * `getSnapshot` is identity-stable between commits because the engine memoizes
 * it on `rev`, so `useSyncExternalStore` is satisfied without the guards 0.x
 * needed to stop itself re-rendering forever.
 */

const WizardContext = createContext<Wizard | null>(null);

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server - where neither
 * runs, and where React warns about the layout one. The standard shim.
 */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export interface WizardProviderProps extends Partial<WizardOptions> {
  /** An existing engine. Supply this or `flow`, not both. */
  wizard?: Wizard;
  children?: ReactNode;
}

export function WizardProvider({ wizard, children, ...options }: WizardProviderProps): ReactNode {
  // Created once. A new engine on every render would restart the wizard.
  const [instance, setInstance] = useState<Wizard>(
    () => wizard ?? createWizard(options as unknown as WizardOptions)
  );
  const engine = wizard ?? instance;
  const ownsEngine = wizard === undefined;

  // A fresh engine has an empty stack, so without this the first paint has no
  // current step and the tree below renders nothing. `start` is idempotent and
  // the effect never runs on the server, which is where the wizard must not
  // navigate at all.
  // A layout effect, so the start begins before the browser paints rather than
  // after it. It cannot remove the first frame entirely - the pipeline is
  // asynchronous, so the step arrives a microtask later - but it is the earlier
  // of the two moments React offers, and on the server neither runs at all.
  //
  // The rejection is caught rather than dropped: a first step with a loader
  // that fails is an ordinary network error, and an unhandled rejection is not
  // an error channel.
  useIsomorphicLayoutEffect(() => {
    engine.start().catch((error: unknown) => {
      console.error('[wizzard] the wizard could not start.', error);
    });
  }, [engine]);

  // An engine this provider created is also this provider's to dispose, or a
  // plugin's teardown never runs. One the caller passed in is theirs.
  //
  // The `isDestroyed` branch is for StrictMode, which mounts, unmounts and
  // mounts again while `useState` keeps the same instance: without it the
  // second mount would be handed an engine that was already torn down.
  useEffect(() => {
    if (!ownsEngine) return;
    if (instance.isDestroyed()) {
      setInstance(createWizard(options as unknown as WizardOptions));
      return;
    }
    return () => {
      instance.destroy();
    };
    // The options object is a fresh literal on every render; the engine is
    // created once and re-created only after a destroy, which is what the
    // dependencies below describe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, ownsEngine]);

  return createElement(WizardContext.Provider, { value: engine }, children);
}

/** `useWizard<typeof signup>()` types `go`, `get` and `set` against that flow. */
export function useWizard<F extends FlowDefinition = FlowDefinition>(): Wizard<F> {
  const wizard = useContext(WizardContext);
  if (!wizard) throw new Error('[wizzard] useWizard must be used inside a WizardProvider');
  return wizard as Wizard<F>;
}

/**
 * Subscribes to a slice of the snapshot.
 *
 * The cache is the documented shape for a selector over `useSyncExternalStore`:
 * the returned value has to be referentially stable while nothing it depends on
 * changed, or React re-renders forever. Recomputation is skipped entirely when
 * the snapshot itself has not changed, which is the common case.
 */
export function useWizardSelector<T>(
  selector: (snapshot: Snapshot) => T,
  isEqual: (a: T, b: T) => boolean = Object.is
): T {
  const wizard = useWizard();
  const cache = useRef<{ snapshot: Snapshot; value: T } | null>(null);

  const getSelection = useCallback((): T => {
    const snapshot = wizard.getSnapshot();
    const previous = cache.current;
    if (previous && previous.snapshot === snapshot) return previous.value;

    const value = selector(snapshot);
    if (previous && isEqual(previous.value, value)) {
      cache.current = { snapshot, value: previous.value };
      return previous.value;
    }
    cache.current = { snapshot, value };
    return value;
    // `selector` and `isEqual` are read fresh on every call on purpose: pinning
    // them would make an inline arrow selector stale.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wizard]);

  return useSyncExternalStore(wizard.subscribe, getSelection, getSelection);
}

/** The whole snapshot. Re-renders on every commit; fine for a small tree. */
export function useWizardSnapshot(): Snapshot {
  const wizard = useWizard();
  return useSyncExternalStore(wizard.subscribe, wizard.getSnapshot, wizard.getSnapshot);
}

export interface Navigation {
  next: Wizard['next'];
  back: Wizard['back'];
  go: Wizard['go'];
  cancel: Wizard['cancel'];
  canBack: boolean;
  isBusy: boolean;
  isLast: boolean;
}

export function useNavigation(): Navigation {
  const wizard = useWizard();
  // Three selectors rather than one packed value: each returns a primitive, so
  // each is stable on its own and a change in one does not re-render on the
  // others.
  const canBack = useWizardSelector((s) => s.canBack);
  const isBusy = useWizardSelector((s) => s.isBusy);
  const isLast = useWizardSelector((s) => s.isLast);

  return {
    next: wizard.next,
    back: wizard.back,
    go: wizard.go,
    cancel: wizard.cancel,
    canBack,
    isBusy,
    isLast,
  };
}

/** The current step and everything a stepper UI needs to draw itself. */
export function useStep(): Pick<
  Snapshot,
  'current' | 'index' | 'isFirst' | 'isLast' | 'progress' | 'breadcrumbs' | 'active' | 'status'
> {
  return useWizardSelector(
    (s) => ({
      current: s.current,
      index: s.index,
      isFirst: s.isFirst,
      isLast: s.isLast,
      progress: s.progress,
      breadcrumbs: s.breadcrumbs,
      active: s.active,
      status: s.status,
    }),
    // Compared field by field, including the breadcrumb statuses: a step
    // turning red has to repaint the stepper, and comparing only `current`
    // would silently swallow that.
    shallowEqual
  );
}

/** One field, by dot path. Re-renders only when that path changes. */
export function useField<T = unknown>(path: string): [T, (value: T) => void] {
  const wizard = useWizard();
  const value = useWizardSelector((s) => getPath(s.data, path) as T);
  const set = useCallback(
    (next: T) => {
      wizard.set(path, next);
    },
    [wizard, path]
  );
  return [value, set];
}

/** Errors for one step, or for the current one when no id is given. */
export function useErrors(stepId?: string): Readonly<Record<string, string>> {
  return useWizardSelector(
    (s) => {
      const id = stepId ?? s.current;
      return id === null ? EMPTY : (s.errors[id] ?? EMPTY);
    },
    (a, b) => a === b
  );
}

const EMPTY: Readonly<Record<string, string>> = Object.freeze({});

/** One level deep, with arrays compared element-wise. Enough for a snapshot slice. */
function shallowEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((item, i) => shallowEqual(item, b[i]));
  }
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;

  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;
  const keys = Object.keys(left);
  if (keys.length !== Object.keys(right).length) return false;
  return keys.every((key) => shallowEqual(left[key], right[key]));
}

export type { Snapshot, Wizard, WizardOptions };
