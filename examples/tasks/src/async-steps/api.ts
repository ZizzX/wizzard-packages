import type { StepDef } from '@wizzard-packages/core';

/**
 * Stands in for the server. Timers rather than resolved promises, so every
 * answer arrives a whole task later - long after anything that did not wait
 * would have moved on.
 */
const later = <T>(value: () => T, signal?: AbortSignal): Promise<T> =>
  new Promise((settle, fail) => {
    if (signal?.aborted) {
      fail(signal.reason);
      return;
    }
    const timer = setTimeout(() => {
      try {
        settle(value());
      } catch (error) {
        fail(error);
      }
    }, 10);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        fail(signal.reason);
      },
      { once: true }
    );
  });

export const fetchSeats = (plane: string, signal?: AbortSignal): Promise<string[]> =>
  later(() => (plane === 'a320' ? ['1A', '1C', '2A'] : []), signal);

let offerCalls = 0;

/** How many times the offer was asked for - the run prints it. */
export const offerRequests = (): number => offerCalls;

/**
 * The body of the `offer` step, as the server sends it. The first request
 * fails, the way a flaky network does, so the run can show what a failed load
 * leaves behind.
 */
export const fetchOffer = (signal: AbortSignal): Promise<StepDef> => {
  offerCalls += 1;
  const failing = offerCalls === 1;
  return later(() => {
    if (failing) throw new Error('network down');
    return { label: 'Upgrade to business for 120 EUR' };
  }, signal);
};
