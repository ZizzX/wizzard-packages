import { isGroup, type FlowDefinition } from './flow';

/**
 * Checks a flow before it is trusted.
 *
 * Meant for development and for the moment a flow arrives from a backend — the
 * two places where a flow can be wrong in ways types cannot catch, because a
 * flow is JSON and JSON carries no types.
 *
 * The last check is the one that keeps the whole design honest: a function
 * anywhere in the flow means `JSON.stringify` would silently drop it, and the
 * flow would no longer round-trip. That is not a style violation, it is the
 * difference between a flow that can be sent over a wire and one that cannot.
 */
export interface FlowProblem {
  path: string;
  message: string;
}

const ROOTS = ['data', 'ctx', 'loop', 'step'];

export function validateFlow(
  flow: FlowDefinition,
  registry?: Readonly<Record<string, unknown>>
): FlowProblem[] {
  const problems: FlowProblem[] = [];
  const ids = Object.keys(flow.steps);
  const report = (path: string, message: string): void => {
    problems.push({ path, message });
  };

  if (ids.length === 0) report('steps', 'flow has no steps');
  let repeats = false;

  if (flow.order) {
    for (const id of flow.order) {
      if (!(id in flow.steps)) report(`order`, `unknown step: ${id}`);
    }
    for (const id of ids) {
      if (!flow.order.includes(id)) {
        report(`steps.${id}`, 'not in order, so it is reachable only via on.next');
      }
    }
    if (new Set(flow.order).size !== flow.order.length) {
      report('order', 'contains a duplicate');
    }
  }

  const checkExpr = (expr: unknown, path: string): void => {
    if (typeof expr === 'function') {
      report(path, 'contains a function, so the flow cannot be serialized');
      return;
    }
    if (expr === null || typeof expr !== 'object') return;
    if (Array.isArray(expr)) {
      expr.forEach((child, i) => {
        checkExpr(child, `${path}[${i}]`);
      });
      return;
    }
    for (const [key, value] of Object.entries(expr)) {
      if (key === '$get' && typeof value === 'string') {
        const root = value.split('.')[0] ?? '';
        if (!ROOTS.includes(root)) {
          report(path, `$get must start with ${ROOTS.join(', ')} — got ${value}`);
        }
        continue;
      }
      if (key === '$ref' && typeof value === 'string') {
        if (registry && !(value in registry)) {
          report(path, `unknown resolver: ${value}`);
        }
        continue;
      }
      checkExpr(value, `${path}.${key}`);
    }
  };

  for (const [id, step_] of Object.entries(flow.steps)) {
    const at = `steps.${id}`;
    checkExpr(step_, at);

    const targets = step_.on?.next;
    const list = targets === undefined ? [] : Array.isArray(targets) ? targets : [targets];
    for (const target of list) {
      const to = typeof target === 'string' ? target : target.to;
      if (to !== '@end' && !(to in flow.steps)) {
        report(`${at}.on.next`, `unknown target: ${to}`);
      }
    }

    const back = step_.on?.back;
    if (back !== undefined && back !== 'auto') {
      const to = typeof back === 'string' ? back : back.to;
      if (!(to in flow.steps)) report(`${at}.on.back`, `unknown target: ${to}`);
    }

    // A flow from a backend has no types behind it, so the shape is checked here
    // rather than discovered as a TypeError in the middle of a navigation.
    const clear = step_.clearOnLeave as unknown;
    if (
      clear !== undefined &&
      clear !== true &&
      !(Array.isArray(clear) && clear.every((p) => typeof p === 'string'))
    ) {
      report(`${at}.clearOnLeave`, 'must be true or a list of data paths');
    }

    // Both mechanisms at once is legal but almost always a mistake: the branch
    // wins and the reachability rule is silently ignored.
    if (step_.when !== undefined && step_.on?.next !== undefined) {
      report(at, 'has both when and on.next — on.next wins, and when is ignored here');
    }

    if (isGroup(step_) && step_.repeat !== undefined) {
      repeats = true;
      // Reachability reads `when` and nothing else, so a repeat over an empty
      // list is still an active step: it draws a breadcrumb for a section with
      // nothing in it and counts towards progress. Teaching reachability about
      // `over` would put group code in the entry every flat flow carries, so
      // the fix is the author's, and it is one line.
      if (step_.when === undefined) {
        report(
          at,
          'is a repeat group with no when — an empty over is walked past, but the group still ' +
            'draws a breadcrumb and counts towards progress; guard it with ' +
            '{ $not: { $empty: <the same expression as over> } }'
        );
      }
    }
  }

  // A repeat frame stores the item key its `keyBy` produced, so the stored
  // state depends on a field of the definition — the only construct in the flow
  // that does. Unversioned, a snapshot written before `keyBy` changed restores
  // clean and lands on an item that no longer means what it meant.
  if (repeats && flow.version === undefined) {
    report(
      'version',
      'flow has a repeat group but no version, so a snapshot taken inside it cannot be refused ' +
        'when keyBy changes — stamp a version and bump it with the shape'
    );
  }

  return problems;
}

/** Convenience for a dev-time assertion. */
export function assertFlow(
  flow: FlowDefinition,
  registry?: Readonly<Record<string, unknown>>
): void {
  const problems = validateFlow(flow, registry);
  if (problems.length === 0) return;
  const lines = problems.map((p) => `  ${p.path}: ${p.message}`).join('\n');
  throw new Error(`[wizzard] invalid flow ${flow.id}:\n${lines}`);
}
