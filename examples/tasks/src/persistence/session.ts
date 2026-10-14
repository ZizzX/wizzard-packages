import { createWizard, type FlowDefinition, type Wizard } from '@wizzard-packages/core';
import {
  decodeSnapshot,
  toSnapshot,
  type DecodeOptions,
  type RestoreResult,
} from '@wizzard-packages/core/snapshot';

/** Anything with the two methods; `localStorage` and `sessionStorage` qualify. */
export interface Store {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/**
 * The writing half. Every commit replaces the state, and `subscribe` hears
 * each one, so the stored session is never older than the last answer.
 * `toSnapshot` keeps what survives a reload - where the user is, how they got
 * there, what they answered - and drops what describes a moment, such as a
 * move in flight. The returned function stops the saving.
 */
export const keepSaved = (wizard: Wizard, store: Store, key: string): (() => void) =>
  wizard.subscribe(() => {
    store.setItem(key, JSON.stringify(toSnapshot(wizard.getState(), wizard.getFlow())));
  });

/**
 * The reading half. Nothing stored is the first visit; anything else goes
 * through `decodeSnapshot`, which never throws: it answers `restored: false`
 * with a reason when the payload no longer fits `flow`.
 */
export const readSaved = (
  flow: FlowDefinition,
  store: Store,
  key: string,
  options?: DecodeOptions
): RestoreResult | null => {
  const stored = store.getItem(key);
  if (stored === null) return null;
  let payload: unknown;
  try {
    payload = JSON.parse(stored);
  } catch {
    // Corrupted in place. `decodeSnapshot` refuses it as `snapshot/unreadable`.
    payload = undefined;
  }
  return decodeSnapshot(flow, payload, options);
};

/** A wizard over `flow`, restored from `store` when it holds a session that still fits. */
export const openWizard = (flow: FlowDefinition, store: Store, key: string): Wizard => {
  const result = readSaved(flow, store, key);
  // `state` is read once, here; a refused session starts fresh rather than half-restored.
  return createWizard({ flow, ...(result?.restored === true && { state: result.state }) });
};
