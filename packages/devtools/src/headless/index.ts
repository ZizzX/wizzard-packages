/**
 * `@wizzard-packages/devtools/headless`: everything devtools does that needs
 * no React and no DOM. A Vue host or a Node test records the same bundle the
 * panel's Record button does, and the docs site imports the layout, the
 * printer and the diff from here.
 *
 * Stability: `devtools`, `recordSession` and the bundle types are public API
 * under semver. `layoutGraph`, `formatExpr` and `diffState` are exported for the
 * docs site and may change in a minor.
 */
export { devtools, toOutcomeError } from './plugin';
export type { DevtoolsOptions, DevtoolsPlugin, Outcome, OutcomeError, Pending } from './plugin';
export { recordSession } from './record';
export type { BundleMeta, RecordOptions, Recorder, SessionBundle, WizardLike } from './record';
export { layoutGraph, NODE_H, NODE_W, REPEAT_H } from './layout';
export type { LayoutOptions, Positioned, PositionedEdge, PositionedGraph } from './layout';
export { formatExpr } from './format';
export { diffState } from './diff';
export type { Change } from './diff';
