import { useMemo } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import type { NavIntent, NavResult } from '@wizzard-packages/core/v1';
import type { Outcome, Pending } from './headless';
import type { CommitRow } from './useObserved';
import { noPlugin } from './messages';

/**
 * Activity: one ordered list of what the wizard did - commits it made, moves
 * it refused, and the one in flight. The 0.x Actions tab listed dispatched
 * actions; a refusal dispatches nothing, so the tab that was supposed to
 * explain a stuck wizard was silent exactly when it mattered.
 *
 * A refusal is not a commit, so it cannot come from `subscribe`: the rows
 * marked `refusal` come from the plugin, and without it the header says so.
 */

export type ActivityRow =
  | { kind: 'commit'; key: string; rev: number; row: CommitRow }
  | { kind: 'outcome'; key: string; rev: number; outcome: Outcome };

export interface ActivityViewProps {
  commits: readonly CommitRow[];
  dropped: number;
  outcomes: readonly Outcome[];
  pending: Pending | null;
  /** null: no plugin prop. 'not-installed': a plugin that is not the wizard's. */
  pluginProblem: 'absent' | 'not-installed' | null;
  /** The pinned row, by key; null while live. */
  selected: string | null;
  onSelect: (row: ActivityRow | null) => void;
  destroyed: boolean;
  cap: number;
}

export const intentText = (intent: NavIntent): string =>
  intent.type === 'go' ? `go(${String(intent.to)})` : intent.type;

/**
 * What a refused move says. The engine gives a reason, a field map, or a
 * plugin name; the panel prints what it was given and says when it was given
 * less, rather than guessing a cause (§13.2).
 */
export const outcomeText = (outcome: Outcome): string => {
  if (outcome.error) return `✗ ${intentText(outcome.intent)} threw · ${outcome.error.message}`;
  const result = outcome.result as NavResult | undefined;
  if (!result) return `${intentText(outcome.intent)} · no result`;
  if (result.ok) {
    const arrow = result.to ? ` → ${String(result.to)}` : '';
    return `${outcome.source === 'start' ? '▶' : '✓'} ${intentText(outcome.intent)}${arrow}`;
  }
  const reason = String(result.reason);
  const by = result.by ? ` · by ${result.by}` : '';
  /** `errors` is field to message, flat: the engine refuses one step at a time. */
  const fields = result.errors
    ? Object.entries(result.errors)
        .map(([field, text]) => `${field}: ${text}`)
        .join(', ')
    : '';
  if (fields) return `✗ ${intentText(outcome.intent)} ${reason} · ${fields}`;
  if (by) return `✗ ${intentText(outcome.intent)} ${reason}${by}`;
  return `✗ ${intentText(outcome.intent)} ${reason} · the engine reported no field or plugin`;
};

export const commitText = (row: CommitRow): string =>
  `#${row.rev} · ${row.step ?? '—'} · ${row.changes} ${row.changes === 1 ? 'change' : 'changes'}`;

/** Commits and outcomes interleaved by the rev they were observed at. */
export function mergeRows(
  commits: readonly CommitRow[],
  outcomes: readonly Outcome[],
  cap: number
): ActivityRow[] {
  const rows: ActivityRow[] = [
    ...commits.map((row) => ({ kind: 'commit' as const, key: `c${row.rev}`, rev: row.rev, row })),
    ...outcomes.map((outcome) => ({
      kind: 'outcome' as const,
      key: `o${outcome.id}`,
      rev: outcome.rev,
      outcome,
    })),
  ];
  rows.sort((a, b) => a.rev - b.rev || a.key.localeCompare(b.key));
  return rows.slice(-cap);
}

export function ActivityView({
  commits,
  dropped,
  outcomes,
  pending,
  pluginProblem,
  selected,
  onSelect,
  destroyed,
  cap,
}: ActivityViewProps): ReactNode {
  const rows = useMemo(() => mergeRows(commits, outcomes, cap), [commits, outcomes, cap]);

  const header = destroyed
    ? 'wizard destroyed'
    : dropped > 0
      ? `showing the last ${commits.length}`
      : null;

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>): void => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const at = rows.findIndex((row) => row.key === selected);
    const next = at === -1 ? rows.length - 1 : at + (event.key === 'ArrowDown' ? 1 : -1);
    const row = rows[Math.min(rows.length - 1, Math.max(0, next))];
    if (row) onSelect(row);
  };

  return (
    <div className="wz-activity">
      {pluginProblem && <p className="wz-message">{noPlugin(pluginProblem)}</p>}
      {header && <p className="wz-note">{header}</p>}
      {rows.length === 0 && !pending ? (
        <p className="wz-note">no activity yet</p>
      ) : (
        <ul
          className="wz-rows"
          role="listbox"
          aria-label="Activity"
          tabIndex={0}
          onKeyDown={onKeyDown}
          {...(selected ? { 'aria-activedescendant': `wz-row-${selected}` } : {})}
        >
          {rows.map((row) => (
            <li
              key={row.key}
              id={`wz-row-${row.key}`}
              role="option"
              aria-selected={selected === row.key}
              className={[
                'wz-row',
                row.kind === 'outcome' && !row.outcome.result?.ok && 'wz-refusal',
                selected === row.key && 'wz-pinned',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelect(selected === row.key ? null : row)}
            >
              {row.kind === 'commit' ? commitText(row.row) : outcomeText(row.outcome)}
            </li>
          ))}
          {pending && (
            <li className="wz-row wz-pending" role="option" aria-selected={false}>
              … {intentText(pending.intent)}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
