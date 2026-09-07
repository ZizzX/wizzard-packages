import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { WizardState } from '@wizzard-packages/core/v1';
import { diffState } from './headless';
import type { Change } from './headless';

/**
 * The State tab: what the observed commit holds, and what it changed.
 *
 * The diff is the point. A full state dump answers "what is it now"; the
 * question a person brings to devtools is "what did that click do", and that
 * is a row per changed path.
 */

export interface StatePanelProps {
  /** The observed commit: live, or the pinned row's snapshot. */
  state: WizardState | null;
  /** The commit before it. Absent on the first, which diffs against itself. */
  previous: WizardState | null;
  /** Breadcrumb of the observed stack, already resolved. */
  crumb: string;
  cap: number;
}

const VALUE_CHARS = 80;

/** `undefined` is a missing path, not a value; the table says which. */
const print = (value: unknown): string => {
  if (value === undefined) return 'missing';
  if (value === null) return 'null';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
};

function Value({ value }: { value: unknown }): ReactNode {
  const [open, setOpen] = useState(false);
  const text = print(value);
  const long = text.length > VALUE_CHARS;
  const className = value === undefined ? 'wz-missing' : undefined;
  if (!long) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      {open ? text : `${text.slice(0, VALUE_CHARS)}…`}{' '}
      <button type="button" className="wz-inline" onClick={() => setOpen(!open)}>
        {open ? 'less' : 'more'}
      </button>
    </span>
  );
}

function Rows({ changes, onLift }: { changes: readonly Change[]; onLift: () => void }): ReactNode {
  /** `diffState` closes a capped list with one row carrying the count. */
  const closing = changes[changes.length - 1];
  const hidden = closing?.hidden ?? 0;
  const rows = hidden > 0 ? changes.slice(0, -1) : changes;
  return (
    <>
      <table className="wz-diff">
        <thead>
          <tr>
            <th scope="col">path</th>
            <th scope="col">before</th>
            <th scope="col">after</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((change) => (
            <tr key={change.path}>
              <th scope="row">{change.path}</th>
              <td data-label="before">
                <Value value={change.before} />
              </td>
              <td data-label="after">
                <Value value={change.after} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hidden > 0 && (
        <p className="wz-note">
          … {hidden} paths not shown (cap){' '}
          <button type="button" className="wz-inline" onClick={onLift}>
            show all
          </button>
        </p>
      )}
    </>
  );
}

export function StatePanel({ state, previous, crumb, cap }: StatePanelProps): ReactNode {
  /**
   * The cap lifts once, for the commit it was lifted on. Carrying it forward
   * would quietly disable `limits.diffRows` for every later commit, and the
   * next large one would render every path the walk can reach.
   */
  const [liftedRev, setLiftedRev] = useState<number | null>(null);
  const lifted = state !== null && liftedRev === state.rev;
  const changes = useMemo(
    () =>
      state ? diffState(previous ?? state, state, lifted ? Number.MAX_SAFE_INTEGER : cap) : [],
    [state, previous, cap, lifted]
  );

  if (!state) {
    return <p className="wz-message">select an activity row, or stay live</p>;
  }

  return (
    <div className="wz-state">
      <p className="wz-frame-line">
        <span>{state.status}</span> · <span>{crumb || '—'}</span> · <span>rev {state.rev}</span> ·{' '}
        <span>nav {state.nav}</span>
      </p>
      {changes.length === 0 ? (
        <p className="wz-note">no changes in this commit</p>
      ) : (
        <Rows changes={changes} onLift={() => setLiftedRev(state.rev)} />
      )}
      <details className="wz-full">
        <summary>Full state</summary>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </details>
    </div>
  );
}
