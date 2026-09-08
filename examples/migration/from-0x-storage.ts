/**
 * Reading a 0.x wizard out of storage, so a v1 wizard can start where the user
 * left off.
 *
 * The data object itself needs no migration - both versions address values by
 * dot path, and a 0.x step id is a v1 slice key. What does not carry is the
 * envelope around it. 0.x wrote one key per step, `wizard_<stepId>`, each
 * holding a timestamped copy of the whole data object, plus a
 * `wizard___wizzard_meta__` key with the position. v1 writes one key holding a
 * whole `Snapshot`. So a v1 wizard pointed at 0.x storage restores nothing: it
 * finds no key it recognises and starts empty, silently.
 *
 * Thirty lines, run once, and then the old keys can be dropped. This is not
 * shipped as a package - it is here, tested, so it can be copied.
 *
 * It reads the step ids it is given rather than scanning the prefix, because
 * that is what `WizardStore.hydrate()` did, and the difference is not cosmetic:
 * see the note on `stepIds` below.
 */

/** The one part of `Storage` this needs. A plain object works in a test. */
export interface ReadableStorage {
  getItem(key: string): string | null;
}

export interface LegacyWizard {
  /** The newest data object across every step key, by the same rule 0.x used. */
  data: Record<string, unknown>;
  /** Where the user was, when the meta key recorded it. */
  currentStepId?: string;
  /** Steps 0.x had marked visited, for a flow whose policy reads them. */
  visited: string[];
  completed: string[];
}

const META = '__wizzard_meta__';

/** 0.x wrapped every value it stored, but tolerated a bare one on read. */
function unwrap(raw: string): { data: unknown; timestamp: number } | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // A key written by something else, or half-written by a killed tab. The
    // 0.x reader swallowed this too, and a migration is the wrong place to
    // start throwing at data that was already being ignored.
    return null;
  }
  if (parsed !== null && typeof parsed === 'object' && 'data' in parsed && 'timestamp' in parsed) {
    const { data, timestamp } = parsed as { data: unknown; timestamp: unknown };
    return { data, timestamp: typeof timestamp === 'number' ? timestamp : 0 };
  }
  return { data: parsed, timestamp: 0 };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Returns what a v1 wizard needs, or `null` when there is no 0.x state to
 * carry - which is the common case, and must not be confused with an empty one.
 */
export function readLegacyWizard(
  storage: ReadableStorage,
  /**
   * The step ids of the 0.x config, in its order. Required, and not discovered
   * by scanning the prefix, because `hydrate()` read exactly these and in
   * exactly this order. Two things follow from that, and both change which
   * answers survive: a key left behind by a step the config no longer listed
   * was never read, however fresh it was; and `>=` means that when two steps
   * carry the same timestamp - one tick of a fast machine - the later step in
   * the config wins. Scanning the prefix instead reproduces neither.
   */
  stepIds: readonly string[],
  prefix = 'wizard_'
): LegacyWizard | null {
  let data: Record<string, unknown> | null = null;
  // `-1` and not `0`: 0.x stored `timestamp: 0` for a value written by an
  // adapter without `getStepWithMeta`, and that value still has to win over
  // nothing at all.
  let newest = -1;

  for (const stepId of stepIds) {
    const raw = storage.getItem(prefix + stepId);
    if (raw === null) continue;
    const entry = unwrap(raw);
    if (entry === null) continue;
    // Latest wins across steps, the rule 0.x's `hydrate()` used: every step key
    // held the whole data object, so the newest one is the whole truth and the
    // others are stale copies of it.
    if (entry.timestamp >= newest && isRecord(entry.data)) {
      newest = entry.timestamp;
      data = entry.data;
    }
  }

  const rawMeta = storage.getItem(prefix + META);
  const metaEntry = rawMeta === null ? null : unwrap(rawMeta);
  const meta = metaEntry !== null && isRecord(metaEntry.data) ? metaEntry.data : null;

  if (data === null && meta === null) return null;

  const strings = (value: unknown): string[] =>
    Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];

  return {
    data: data ?? {},
    ...(typeof meta?.currentStepId === 'string' ? { currentStepId: meta.currentStepId } : {}),
    visited: strings(meta?.visited),
    completed: strings(meta?.completed),
  };
}
