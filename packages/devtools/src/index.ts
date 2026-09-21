/**
 * `@wizzard-packages/devtools`: the React panel, plus the headless pieces a
 * React host would otherwise import from a second entry.
 *
 * `/headless` is the same objects without React, for a Vue host, a Node test
 * or a docs site.
 *
 * Stability: `WizardDevtools` and its props are public API under semver.
 * `FlowGraphView` and `EDGE_DRAW_CAP` are exported for a host drawing its own
 * panel, on the same terms as the headless helpers - they may change in a
 * minor.
 *
 * The directive sits here rather than only on the component: a bundler reads
 * the entry it is given, and this is that file.
 *
 * @module @wizzard-packages/devtools
 */
'use client';

export { WizardDevtools } from './WizardDevtools';
export type { Tab, WizardDevtoolsProps } from './WizardDevtools';
export { EDGE_DRAW_CAP, FlowGraphView } from './FlowGraphView';
export type { FlowGraphViewProps, GraphView, LayoutInfo, TakenEdge } from './FlowGraphView';
export { devtools, recordSession } from './headless';
export type {
  DevtoolsOptions,
  DevtoolsPlugin,
  Outcome,
  OutcomeError,
  Pending,
  Recorder,
  RecordOptions,
  SessionBundle,
  WizardLike,
} from './headless';
