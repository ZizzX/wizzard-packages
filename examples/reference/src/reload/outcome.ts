import type { RestoreOutcome } from '@wizzard-packages/plugins/persist';

import { STORAGE_KEY } from './flow';

/**
 * What a person is told about the session they did or did not get back.
 *
 * A form that was half filled in and is now empty looks like a bug to whoever
 * filled it, and silence is why they would think so. The plugin answers with a
 * reason for exactly this: the host turns it into a sentence, because only the
 * host knows what the form is called and who is reading it.
 *
 * Shared by both renderings so the two cannot drift into saying different
 * things about the same event.
 */
export function describeRestore(outcome: RestoreOutcome | null): string {
  if (outcome === null) return 'Starting.';
  if (outcome.restored) return 'Restored. You are back where you left off.';

  switch (outcome.reason) {
    case 'persist/nothing-stored':
      return 'Nothing saved yet. This one will be, from the first answer.';
    case 'persist/unavailable':
      return 'Saving unavailable: this browser did not allow storage, which private windows do.';
    case 'snapshot/other-flow':
      return 'Reset: the saved session was written by an older version of this application.';
    case 'snapshot/version':
      return 'Reset: the saved session is in a format this build does not read.';
    case 'snapshot/unknown-step':
      return 'Reset: the saved session was standing on a step this flow no longer has.';
    default:
      return `Reset: the saved session could not be read (${outcome.reason}).`;
  }
}

/**
 * Ages the stored session, then reloads.
 *
 * A version bump is the one refusal a visitor cannot produce by hand, and it is
 * the one worth seeing: it is what happens to everybody with a session open on
 * the day an application ships a change to what it collects.
 */
export function simulateUpgrade(): void {
  const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
  if (raw === null || raw === undefined) return;
  const stored = JSON.parse(raw) as Record<string, unknown>;
  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...stored, appVersion: 0 }));
  globalThis.location.reload();
}
