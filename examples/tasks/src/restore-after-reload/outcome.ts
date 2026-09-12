import type { RestoreOutcome } from '@wizzard-packages/plugins/persist';

/**
 * What the person is told about the session they did or did not get back.
 *
 * A form that was half filled in and is now empty looks like a bug to whoever
 * filled it, and silence is why they would think so. The plugin answers with a
 * reason for exactly this; turning it into a sentence is the host's job,
 * because only the host knows what the form is called.
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
    case 'snapshot/version':
      return 'Reset: the saved session is in a format this build does not read.';
    default:
      return `Reset: the saved session could not be read (${outcome.reason}).`;
  }
}
