/**
 * The panel's stylesheet, as a string the panel injects once.
 *
 * A `.css` file would make the package's consumers configure a bundler for it;
 * inline `style` attributes cannot express `:focus-visible`, and the focus ring
 * is part of the accessibility contract (§12.10). One `<style>` element is what
 * is left, and it is scoped by the `wz-` prefix.
 *
 * Six custom properties are the whole theme (§3.8). A host overrides them on
 * any ancestor; the defaults meet 4.5:1 for text and 3:1 for graph strokes.
 */
export const CSS = `
.wz-panel {
  --wz-bg: #ffffff;
  --wz-fg: #16181d;
  --wz-muted: #5b6270;
  --wz-accent: #1c4fd8;
  --wz-line: #c9ced8;
  --wz-danger: #b3261e;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 320px;
  background: var(--wz-bg);
  color: var(--wz-fg);
  font-size: 14px;
  line-height: 1.45;
  box-sizing: border-box;
}
.wz-panel *, .wz-panel *::before, .wz-panel *::after { box-sizing: inherit; }
.wz-panel button {
  min-height: 44px;
  padding: 0 12px;
  font: inherit;
  color: inherit;
  background: transparent;
  border: 1px solid var(--wz-line);
  border-radius: 6px;
  cursor: pointer;
}
.wz-panel button[disabled] { opacity: 0.6; cursor: default; }
.wz-panel button.wz-inline {
  min-height: 0;
  padding: 0 4px;
  border: 0;
  color: var(--wz-accent);
  text-decoration: underline;
}
.wz-panel :focus-visible { outline: 2px solid var(--wz-accent); outline-offset: 2px; }

.wz-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding: 6px 10px;
  border-bottom: 1px solid var(--wz-line);
  color: var(--wz-muted);
}
.wz-strip .wz-outcome { color: var(--wz-fg); }
.wz-strip .wz-refused { color: var(--wz-danger); }

.wz-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  padding: 6px 10px;
  border-bottom: 1px solid var(--wz-line);
}
.wz-toolbar [role='tab'][aria-selected='true'] {
  border-color: var(--wz-accent);
  color: var(--wz-accent);
}
.wz-toolbar .wz-density { color: var(--wz-muted); }

.wz-body { display: flex; flex: 1; min-height: 0; }
.wz-body > .wz-content { flex: 1; min-width: 0; overflow: auto; padding: 10px; }
.wz-panel[data-narrow='false'] .wz-inspector {
  width: 280px;
  border-left: 1px solid var(--wz-line);
  overflow: auto;
}
.wz-panel[data-narrow='true'] .wz-body { flex-direction: column; }
.wz-panel[data-narrow='true'] .wz-inspector {
  border-top: 1px solid var(--wz-line);
  max-height: 45%;
  overflow: auto;
}
.wz-inspector { padding: 10px; }
.wz-inspector header { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.wz-inspector h3 { margin: 0; font-size: 14px; }
.wz-inspector dl { display: grid; grid-template-columns: auto 1fr; gap: 2px 10px; margin: 8px 0; }
.wz-inspector dt { color: var(--wz-muted); }
.wz-inspector dd { margin: 0; overflow-wrap: anywhere; }

.wz-graph { height: 100%; }
.wz-svg { width: 100%; height: 100%; min-height: 200px; }
.wz-node rect { fill: var(--wz-bg); stroke: var(--wz-line); stroke-width: 1.5; }
.wz-node.wz-visited rect { stroke: var(--wz-fg); }
.wz-node.wz-unvisited rect { stroke-dasharray: 4 3; }
.wz-node.wz-active rect { fill: var(--wz-accent); }
.wz-node.wz-active text { fill: var(--wz-bg); }
.wz-node.wz-selected rect { stroke: var(--wz-accent); stroke-width: 3; }
.wz-node.wz-opaque rect { stroke-dasharray: 2 3; }
.wz-node .wz-inner { fill: none; }
.wz-node .wz-stack { fill: var(--wz-bg); }
.wz-node text { fill: var(--wz-fg); font-size: 13px; }
.wz-node .wz-sub { fill: var(--wz-muted); font-size: 11px; }
.wz-node .wz-end { fill: var(--wz-fg); }
.wz-edge polyline { stroke: var(--wz-fg); stroke-width: 1.2; }
.wz-edge marker path, .wz-svg marker path { fill: var(--wz-fg); }
.wz-edge-order polyline { stroke: var(--wz-muted); }
.wz-edge-back polyline { stroke-dasharray: 5 3; stroke: var(--wz-muted); }
.wz-edge.wz-dangling polyline { stroke: var(--wz-danger); }
.wz-edge.wz-taken polyline { stroke-width: 3; }
.wz-edge-label { fill: var(--wz-muted); font-size: 11px; }
.wz-ghost rect { fill: none; stroke: var(--wz-danger); stroke-dasharray: 3 3; }
.wz-ghost text { fill: var(--wz-danger); font-size: 12px; }
.wz-ghost line { stroke: var(--wz-danger); }

.wz-rows { margin: 0; padding: 0; list-style: none; }
.wz-row { padding: 6px 8px; border-bottom: 1px solid var(--wz-line); cursor: pointer; }
.wz-row.wz-refusal { color: var(--wz-danger); }
.wz-row.wz-pinned { background: color-mix(in srgb, var(--wz-accent) 12%, transparent); }
.wz-row.wz-pending { color: var(--wz-muted); cursor: default; }

.wz-diff, .wz-mirror { width: 100%; border-collapse: collapse; }
.wz-diff th, .wz-diff td, .wz-mirror th, .wz-mirror td {
  text-align: left;
  vertical-align: top;
  padding: 4px 6px;
  border-bottom: 1px solid var(--wz-line);
  font-size: 12px;
  overflow-wrap: anywhere;
}
.wz-panel[data-narrow='true'] .wz-diff td { display: block; }
.wz-panel[data-narrow='true'] .wz-diff td::before { content: attr(data-label) ': '; color: var(--wz-muted); }
.wz-missing { color: var(--wz-muted); font-style: italic; }
.wz-frame-line { margin: 0 0 8px; color: var(--wz-muted); }
.wz-note { color: var(--wz-muted); margin: 8px 0; }
.wz-message { color: var(--wz-danger); margin: 8px 0; overflow-wrap: anywhere; }
.wz-full pre { overflow: auto; font-size: 12px; }

.wz-export { display: flex; flex-direction: column; gap: 8px; height: 100%; }
.wz-export-meta { display: flex; flex-wrap: wrap; gap: 10px; margin: 0; padding: 0; list-style: none; color: var(--wz-muted); }
.wz-export-actions { display: flex; gap: 8px; }
.wz-json { flex: 1; min-height: 160px; width: 100%; font-family: ui-monospace, monospace; font-size: 12px; }

.wz-legend { margin-left: auto; }
.wz-legend ul { display: flex; flex-wrap: wrap; gap: 10px; margin: 6px 0 0; padding: 0; list-style: none; color: var(--wz-muted); }

.wz-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
`;
