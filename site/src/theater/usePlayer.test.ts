/**
 * The player keeps the theater's time. These run it on fake timers with cues
 * that only record that they ran: what a cue does is the theater's business,
 * and when it runs is this hook's.
 */
import { act, renderHook } from '@testing-library/react';
import { StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { usePlayer, type Player } from './usePlayer';

const cues = [{ delay: 100 }, { delay: 100 }, { delay: 100 }];

/** Moves the clock, and lets every promise the timers started settle. */
const wait = (ms: number): Promise<void> =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });

const show = (state: DocumentVisibilityState): void => {
  Object.defineProperty(document, 'visibilityState', { configurable: true, value: state });
  document.dispatchEvent(new Event('visibilitychange'));
};

/** A player that records the index of every cue it runs. */
function recorded(autoplay = true): {
  ran: number[];
  player: { readonly current: Player };
  unmount: () => void;
} {
  const ran: number[] = [];
  const { result, unmount } = renderHook(() =>
    usePlayer(
      cues,
      (_cue, index) => {
        ran.push(index);
      },
      autoplay
    )
  );
  return { ran, player: result, unmount };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  Reflect.deleteProperty(document, 'visibilityState');
});

describe('usePlayer', () => {
  it('runs each cue after its delay, in order, and stops playing after the last', async () => {
    const { ran, player } = recorded();
    expect(player.current.playing).toBe(true);
    await wait(99);
    expect(ran).toEqual([]);
    await wait(1);
    expect(ran).toEqual([0]);
    await wait(200);
    expect(ran).toEqual([0, 1, 2]);
    expect(player.current.playing).toBe(false);
  });

  it('holds the next cue until a running one has finished', async () => {
    const ran: number[] = [];
    let finish = (): void => {};
    renderHook(() =>
      usePlayer(cues, (_cue, index) => {
        ran.push(index);
        if (index === 0) {
          return new Promise<void>((resolve) => {
            finish = resolve;
          });
        }
        return undefined;
      })
    );
    await wait(1000);
    expect(ran).toEqual([0]);
    await act(async () => {
      finish();
    });
    await wait(100);
    expect(ran).toEqual([0, 1]);
  });

  it('stops on the cue reached', async () => {
    const { ran, player } = recorded();
    await wait(100);
    act(() => {
      player.current.stop();
    });
    await wait(1000);
    expect(ran).toEqual([0]);
    expect(player.current.playing).toBe(false);
  });

  // Taking over while the engine is still answering a `next()`: the press
  // finishes, because the engine is already moving, and nothing follows it.
  it('lets a cue stopped mid-run finish, and plays nothing after it', async () => {
    const ran: number[] = [];
    let finish = (): void => {};
    const { result } = renderHook(() =>
      usePlayer(cues, (_cue, index) => {
        ran.push(index);
        if (index === 0) {
          return new Promise<void>((resolve) => {
            finish = resolve;
          });
        }
        return undefined;
      })
    );
    await wait(100);
    act(() => {
      result.current.stop();
    });
    await act(async () => {
      finish();
    });
    await wait(1000);
    expect(ran).toEqual([0]);
  });

  it('starts over on replay, after a stop and after the end', async () => {
    const { ran, player } = recorded();
    await wait(300);
    expect(player.current.playing).toBe(false);
    act(() => {
      player.current.replay();
    });
    expect(player.current.playing).toBe(true);
    await wait(100);
    expect(ran).toEqual([0, 1, 2, 0]);
    act(() => {
      player.current.stop();
    });
    act(() => {
      player.current.replay();
    });
    await wait(100);
    expect(ran).toEqual([0, 1, 2, 0, 0]);
  });

  it('runs nothing without autoplay until replay', async () => {
    const { ran, player } = recorded(false);
    expect(player.current.playing).toBe(false);
    await wait(1000);
    expect(ran).toEqual([]);
    act(() => {
      player.current.replay();
    });
    await wait(100);
    expect(ran).toEqual([0]);
  });

  it('holds while the tab is hidden, and goes on from the same cue when it is shown', async () => {
    const { ran } = recorded();
    await wait(100);
    expect(ran).toEqual([0]);
    act(() => {
      show('hidden');
    });
    await wait(1000);
    expect(ran).toEqual([0]);
    act(() => {
      show('visible');
    });
    await wait(0);
    expect(ran).toEqual([0, 1]);
    await wait(99);
    expect(ran).toEqual([0, 1]);
    await wait(1);
    expect(ran).toEqual([0, 1, 2]);
  });

  it('stops, and reports a cue that throws', async () => {
    const report = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('the cue failed');
    const ran: number[] = [];
    const { result } = renderHook(() =>
      usePlayer(cues, (_cue, index) => {
        ran.push(index);
        if (index === 0) throw error;
      })
    );
    await wait(1000);
    expect(ran).toEqual([0]);
    expect(result.current.playing).toBe(false);
    expect(report).toHaveBeenCalledWith(error);
    report.mockRestore();
  });

  it('plays once under StrictMode', async () => {
    const ran: number[] = [];
    renderHook(
      () =>
        usePlayer(cues, (_cue, index) => {
          ran.push(index);
        }),
      { wrapper: StrictMode }
    );
    await wait(1000);
    expect(ran).toEqual([0, 1, 2]);
  });

  // The island learns about reduced motion only once it runs in the browser, so
  // it renders with autoplay off and turns it on a moment later.
  it('plays, and says so, when autoplay turns on after the first render', async () => {
    const ran: number[] = [];
    const { result, rerender } = renderHook(
      ({ auto }: { auto: boolean }) =>
        usePlayer(
          cues,
          (_cue, index) => {
            ran.push(index);
          },
          auto
        ),
      { initialProps: { auto: false } }
    );
    rerender({ auto: true });
    expect(result.current.playing).toBe(true);
    await wait(100);
    expect(ran).toEqual([0]);
    expect(result.current.playing).toBe(true);
  });

  // Reduced motion switched on and off again mid-scenario: starting over would
  // replay Act 2 onto a wizard the first run already half filled.
  it('does not start over when autoplay comes back after cues have run', async () => {
    const ran: number[] = [];
    const { result, rerender } = renderHook(
      ({ auto }: { auto: boolean }) =>
        usePlayer(
          cues,
          (_cue, index) => {
            ran.push(index);
          },
          auto
        ),
      { initialProps: { auto: true } }
    );
    await wait(100);
    rerender({ auto: false });
    expect(result.current.playing).toBe(false);
    rerender({ auto: true });
    await wait(1000);
    expect(ran).toEqual([0]);
    expect(result.current.playing).toBe(false);
  });

  it('plays nothing after it unmounts', async () => {
    const { ran, unmount } = recorded();
    await wait(100);
    unmount();
    await wait(1000);
    expect(ran).toEqual([0]);
  });
});
