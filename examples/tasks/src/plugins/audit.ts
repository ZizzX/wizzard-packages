import type { Hooks } from '@wizzard-packages/core';

/**
 * A plugin that uses the three hooks a plugin holding state of its own needs:
 * `init` to start, `onCommit` and `onAttempt` to observe, and the function
 * `init` returns to stop.
 */
export const audit = (log: (line: string) => void): Hooks => {
  let commits = 0;
  return {
    name: 'audit',
    // Once, inside `createWizard`, before anything else reads the wizard. The
    // host reads state and flow and commits through the engine's one write
    // path - here, a coupon every new checkout starts with.
    init: (host) => {
      host.commit({ data: { ...host.getState().data, cart: { coupon: 'WELCOME' } } });
      log(`audit: ${host.getFlow().id} opened`);
      // Called by `destroy()`.
      return () => {
        log(`audit: closed after ${commits} commits`);
      };
    },
    // Every write, navigation or not. The commit `init` made is not reported:
    // the plugin already knows about it.
    onCommit: () => {
      commits += 1;
    },
    // Every attempt to move, twice: when it starts, and when it ends with its
    // result or errors with what was thrown. A refused move writes nothing,
    // so only this hook sees it.
    onAttempt: (attempt) => {
      if (attempt.phase === 'end') {
        const { result } = attempt;
        log(
          `attempt ${attempt.id} ${attempt.intent.type} (${attempt.source}): ` +
            (result.ok ? `reached ${String(result.to)}` : `${result.reason} by ${result.by}`)
        );
      }
    },
  };
};
