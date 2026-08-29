import {
  createWizard,
  getPath,
  type Snapshot,
  type Wizard,
  type WizardOptions,
} from '@wizzard-packages/core/v1';
import {
  computed,
  inject,
  onScopeDispose,
  provide,
  shallowRef,
  type ComputedRef,
  type InjectionKey,
  type Ref,
  type WritableComputedRef,
} from 'vue';

/**
 * The Vue binding.
 *
 * The same job as the React one and the same shape, deliberately: bridge the
 * engine into the framework and stop. In 0.x this file reimplemented navigation
 * and quietly diverged — it dropped middleware, never called hydrate, and
 * inverted the validation default. A shared contract suite now runs against
 * both bindings so that cannot happen again unnoticed.
 *
 * Reactivity rides on snapshot identity. The engine returns the same object
 * until a commit, so a `shallowRef` holding it invalidates exactly once per
 * commit and every `computed` derived from it caches for free.
 */

const KEY: InjectionKey<Wizard> = Symbol('wizzard');

export function provideWizard(source: Wizard | WizardOptions): Wizard {
  const wizard = 'getSnapshot' in source ? source : createWizard(source);
  provide(KEY, wizard);
  return wizard;
}

export function useWizard(): Wizard {
  const wizard = inject(KEY, null);
  if (!wizard) throw new Error('[wizzard] useWizard must be used under provideWizard');
  return wizard;
}

/**
 * The snapshot as a ref. Unsubscribes with the component scope, so a wizard
 * outliving a route does not accumulate dead listeners.
 */
export function useWizardSnapshot(): Ref<Snapshot> {
  const wizard = useWizard();
  const snapshot = shallowRef<Snapshot>(wizard.getSnapshot());
  const stop = wizard.subscribe(() => {
    snapshot.value = wizard.getSnapshot();
  });
  onScopeDispose(stop);
  return snapshot;
}

export function useWizardSelector<T>(selector: (snapshot: Snapshot) => T): ComputedRef<T> {
  const snapshot = useWizardSnapshot();
  return computed(() => selector(snapshot.value));
}

export interface Navigation {
  next: Wizard['next'];
  back: Wizard['back'];
  go: Wizard['go'];
  cancel: Wizard['cancel'];
  canBack: ComputedRef<boolean>;
  isBusy: ComputedRef<boolean>;
  isLast: ComputedRef<boolean>;
}

export function useNavigation(): Navigation {
  const wizard = useWizard();
  const snapshot = useWizardSnapshot();
  return {
    next: wizard.next,
    back: wizard.back,
    go: wizard.go,
    cancel: wizard.cancel,
    canBack: computed(() => snapshot.value.canBack),
    isBusy: computed(() => snapshot.value.isBusy),
    isLast: computed(() => snapshot.value.isLast),
  };
}

/** The current step and everything a stepper UI needs to draw itself. */
export function useStep(): {
  [K in
    | 'current'
    | 'index'
    | 'isFirst'
    | 'isLast'
    | 'progress'
    | 'breadcrumbs'
    | 'active'
    | 'status']: ComputedRef<Snapshot[K]>;
} {
  const snapshot = useWizardSnapshot();
  return {
    current: computed(() => snapshot.value.current),
    index: computed(() => snapshot.value.index),
    isFirst: computed(() => snapshot.value.isFirst),
    isLast: computed(() => snapshot.value.isLast),
    progress: computed(() => snapshot.value.progress),
    breadcrumbs: computed(() => snapshot.value.breadcrumbs),
    active: computed(() => snapshot.value.active),
    status: computed(() => snapshot.value.status),
  };
}

/** One field, by dot path, usable directly with `v-model`. */
export function useField<T = unknown>(path: string): WritableComputedRef<T> {
  const wizard = useWizard();
  const snapshot = useWizardSnapshot();
  return computed({
    get: () => getPath(snapshot.value.data, path) as T,
    set: (value: T) => {
      wizard.set(path, value);
    },
  });
}

/** Errors for one step, or for the current one when no id is given. */
export function useErrors(stepId?: string): ComputedRef<Readonly<Record<string, string>>> {
  const snapshot = useWizardSnapshot();
  return computed(() => {
    const id = stepId ?? snapshot.value.current;
    return id === null ? EMPTY : (snapshot.value.errors[id] ?? EMPTY);
  });
}

const EMPTY: Readonly<Record<string, string>> = Object.freeze({});

export type { Snapshot, Wizard, WizardOptions };
