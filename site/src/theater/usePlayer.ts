/**
 * Plays the hero theater's scenario (docs/designs/hero-theater.md): one cue at a
 * time, each after its delay, and the next only once the last has finished, so
 * a cue that calls `next()` holds the scenario until the engine has answered.
 *
 * Stopping is taking over. The player forgets where it was and the engine stays
 * wherever the last cue left it; a cue already running finishes, because what it
 * started is already moving, and nothing follows it. What a cue does is the
 * caller's business, and so is putting the world back before `replay()`.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

export interface Player {
  /** From the first cue until the last has run, or until `stop()`. */
  readonly playing: boolean;
  /** Stops on the cue reached. */
  readonly stop: () => void;
  /** Starts again from the first cue. */
  readonly replay: () => void;
}

/**
 * Runs `run` for each of `cues` in order. A hidden tab holds the next cue until
 * the tab is shown, so a page opened in the background starts its scenario when
 * somebody looks at it, rather than playing it to nobody. Without `autoplay`
 * nothing runs until `replay()`.
 */
export function usePlayer<C extends { readonly delay: number }>(
  cues: readonly C[],
  run: (cue: C, index: number) => unknown,
  autoplay = true
): Player {
  const [playing, setPlaying] = useState(autoplay);
  const latest = useRef({ cues, run });
  // Every start takes the next number. A timer or a promise left over from an
  // earlier start sees that it has been overtaken, and does nothing.
  const generation = useRef(0);
  const cancel = useRef(() => {});

  useEffect(() => {
    latest.current = { cues, run };
  });

  const halt = useCallback(() => {
    generation.current += 1;
    cancel.current();
    cancel.current = () => {};
  }, []);

  const start = useCallback(() => {
    halt();
    const mine = generation.current;
    const live = (): boolean => generation.current === mine;

    const whenShown = (then: () => void): void => {
      if (document.visibilityState !== 'hidden') return then();
      const wake = (): void => {
        if (document.visibilityState === 'hidden') return;
        document.removeEventListener('visibilitychange', wake);
        then();
      };
      document.addEventListener('visibilitychange', wake);
      cancel.current = () => document.removeEventListener('visibilitychange', wake);
    };

    const at = (index: number): void => {
      if (!live()) return;
      const cue = latest.current.cues[index];
      if (cue === undefined) {
        setPlaying(false);
        return;
      }
      const timer = setTimeout(() => {
        whenShown(() => {
          Promise.resolve()
            .then(() => latest.current.run(cue, index))
            .then(
              () => at(index + 1),
              (error: unknown) => {
                console.error(error);
                if (!live()) return;
                halt();
                setPlaying(false);
              }
            );
        });
      }, cue.delay);
      cancel.current = () => clearTimeout(timer);
    };

    at(0);
  }, [halt]);

  useEffect(() => {
    if (autoplay) start();
    else setPlaying(false);
    return halt;
  }, [autoplay, halt, start]);

  const stop = useCallback(() => {
    halt();
    setPlaying(false);
  }, [halt]);

  const replay = useCallback(() => {
    setPlaying(true);
    start();
  }, [start]);

  return { playing, stop, replay };
}
