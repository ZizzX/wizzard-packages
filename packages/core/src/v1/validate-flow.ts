import {
  explain,
  notRegisteredText,
  pageFor,
  unknownOperatorText,
  WizardError,
  type Explained,
} from './diagnostic';
import { isGroup, type FlowDefinition, type StepDef, type Target } from './flow';

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
  /** `[wizzard] <what>. <why>. <fix>. <url>` - the template every failure uses. */
  message: string;
  /**
   * Kebab-case and stable: what a handler switches on, and the slug of the page
   * that explains the problem. `validateFlow` and `checkSession` both set it.
   */
  code: string;
  /** What to change. Also the third sentence of `message`. */
  fix: string;
  /** The page for `code`, built from the code alone. */
  url: string;
}

const ROOTS = ['data', 'ctx', 'loop', 'step'];

/** Every operator `expr.ts` evaluates. An expression object with none of them throws there. */
const OPERATORS = [
  '$get',
  '$ref',
  '$not',
  '$and',
  '$or',
  '$eq',
  '$ne',
  '$gt',
  '$gte',
  '$lt',
  '$lte',
  '$in',
  '$empty',
];

/** Same cap as `graph.ts` and `session.ts`: thirty-two flows deep is not nesting. */
const MAX_DEPTH = 32;

export function validateFlow(
  flow: FlowDefinition,
  registry?: Readonly<Record<string, unknown>>
): FlowProblem[] {
  const problems: FlowProblem[] = [];
  const ids = Object.keys(flow.steps);
  const report = (code: string, path: string, text: Explained): void => {
    problems.push({ path, message: explain(code, text), code, fix: text[2], url: pageFor(code) });
  };

  if (ids.length === 0) {
    report('flow-no-steps', 'steps', [
      `flow "${flow.id}" has no steps`,
      'A wizard is its steps, so there is nothing to start on or to finish',
      'Add at least one step, or check that the definition arrived whole',
    ]);
  }

  if (flow.order) {
    for (const id of flow.order) {
      if (!(id in flow.steps)) {
        report('order-unknown-step', 'order', [
          `order names "${id}", which is not a step`,
          'order lists the default path by step id, and every id in it has to be a key of steps',
          'Correct the id in order, or add the step it names',
        ]);
      }
    }
    for (const id of ids) {
      if (!flow.order.includes(id)) {
        report('step-not-in-order', `steps.${id}`, [
          `step "${id}" is not in order`,
          'next() and back() walk order, so the step is reachable only through a transition or go()',
          "Add it to order, or lead to it from another step's on.next",
        ]);
      }
    }
    // One pass, and one report per id however many times it repeats.
    const once = new Set<string>();
    const twice = new Set<string>();
    for (const id of flow.order) (once.has(id) ? twice : once).add(id);
    for (const id of twice) {
      report('order-duplicate', 'order', [
        `order names "${id}" more than once`,
        'A step has one position in order, and next() and back() find their way from it',
        `Keep one occurrence of ${id}`,
      ]);
    }
  }

  const checkExpr = (expr: unknown, path: string): void => {
    if (typeof expr === 'function') {
      report('flow-not-serializable', path, [
        `${path} is a function`,
        'JSON.stringify drops a function, so the flow would not survive being stored or sent',
        'Move the function into the registry and name it with a $ref',
      ]);
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
          report('get-unknown-root', path, [
            `$get "${value}" does not start with ${ROOTS.join(', ')}`,
            'The first segment names where a path reads from, and any other start evaluates to undefined',
            `Start the path with the root it belongs to, such as data.${value}`,
          ]);
        }
        continue;
      }
      if (key === '$ref' && typeof value === 'string') {
        if (registry && !(value in registry)) {
          report('resolver-not-registered', path, notRegisteredText(value));
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
    const unknownTarget = (to: string, path: string): void => {
      report('target-unknown-step', path, [
        `unknown target "${to}"`,
        'A transition leads to a key of steps, or to @end from on.next',
        'Correct the id, or add the step it names',
      ]);
    };
    for (const target of list) {
      const to = typeof target === 'string' ? target : target.to;
      if (to !== '@end' && !(to in flow.steps)) unknownTarget(to, `${at}.on.next`);
    }

    const back = step_.on?.back;
    if (back !== undefined && back !== 'auto') {
      const to = typeof back === 'string' ? back : back.to;
      if (!(to in flow.steps)) unknownTarget(to, `${at}.on.back`);
    }

    // A flow from a backend has no types behind it, so the shape is checked here
    // rather than discovered as a TypeError in the middle of a navigation.
    const clear = step_.clearOnLeave as unknown;
    if (
      clear !== undefined &&
      clear !== true &&
      !(Array.isArray(clear) && clear.every((p) => typeof p === 'string'))
    ) {
      report('clear-on-leave-invalid', `${at}.clearOnLeave`, [
        `clearOnLeave of step "${id}" is neither true nor a list of data paths`,
        'It is read when the step is left, and any other value fails that navigation',
        'Set it to true, or put the paths in a list',
      ]);
    }

    // Both at once is legal and does two things: `when` still decides whether
    // this step is on the path, and `on.next` only where it leads. A condition
    // meant to choose the next step is easily written on the step instead.
    if (step_.when !== undefined && step_.on?.next !== undefined) {
      report('when-with-next', at, [
        `step "${id}" has both when and on.next`,
        'when decides whether the step is on the path, and on.next only where it leads, so a condition on the step never picks the next one',
        "To pick the next step, move the condition into a transition's when; if both are meant, leave them",
      ]);
    }
  }

  // Where the engine evaluates an expression, and only there: `ui` is the host's
  // JSON and may carry `$`-keys of its own. The evaluator throws on an object
  // with no operator among its keys. Of an object with several it takes one,
  // and `evaluate` and `evaluateAsync` test them in different orders, so every
  // operator present is followed rather than guessing which one runs. A
  // `$ref`'s `args` are data handed to the resolver, never evaluated, and are
  // not looked inside.
  const checkOperators = (e: unknown, path: string): void => {
    if (e === null || typeof e !== 'object') return;
    if (Array.isArray(e)) {
      e.forEach((child, i) => {
        checkOperators(child, `${path}[${i}]`);
      });
      return;
    }
    const ops = OPERATORS.filter((key) => key in e);
    if (ops.length === 0) {
      report('expr-unknown-operator', path, unknownOperatorText(Object.keys(e)[0]));
    }
    for (const op of ops) {
      if (op !== '$ref') checkOperators((e as Record<string, unknown>)[op], `${path}.${op}`);
    }
  };

  const targetWhen = (target: Target | 'auto' | undefined, path: string): void => {
    if (typeof target === 'object') checkOperators(target.when, `${path}.when`);
  };

  const checkExpressions = (step_: StepDef, at: string): void => {
    checkOperators(step_.when, `${at}.when`);
    checkOperators(step_.guards?.enter, `${at}.guards.enter`);
    checkOperators(step_.guards?.exit, `${at}.guards.exit`);
    const next = step_.on?.next;
    if (Array.isArray(next)) {
      next.forEach((target: Target, i) => {
        targetWhen(target, `${at}.on.next[${i}]`);
      });
    } else {
      targetWhen(next as Target | undefined, `${at}.on.next`);
    }
    targetWhen(step_.on?.back, `${at}.on.back`);
    if (!isGroup(step_)) return;
    checkOperators(step_.repeat?.over, `${at}.repeat.over`);
    for (const [key, value] of Object.entries(step_.input ?? {})) {
      checkOperators(value, `${at}.input.${key}`);
    }
  };

  // Repeat groups anywhere in the flow, not only among its own steps. A group
  // whose `flow` is an inline definition carries its sub-flow inside this one,
  // so a repeat two levels down is still this flow's to stamp a version for -
  // `toSnapshot` writes the root's version and no other. A string reference
  // names a definition this function was never handed, and is nothing it can
  // look inside; that flow is validated wherever it is defined.
  const seen = new Set<FlowDefinition>();
  const scanRepeats = (f: FlowDefinition, path: string, depth: number): boolean => {
    if (depth > MAX_DEPTH || seen.has(f)) return false;
    seen.add(f);

    let found = false;
    for (const [id, step_] of Object.entries(f.steps)) {
      checkExpressions(step_, `${path}.${id}`);
      if (!isGroup(step_)) continue;
      if (step_.repeat !== undefined) {
        found = true;
        // Reachability reads `when` and nothing else, so a repeat over an empty
        // list is still an active step: it draws a breadcrumb for a section with
        // nothing in it and counts towards progress. Teaching reachability about
        // `over` would put group code in the entry every flat flow carries, so
        // the fix is the author's, and it is one line.
        if (step_.when === undefined) {
          report('repeat-without-when', `${path}.${id}`, [
            `repeat group "${id}" has no when`,
            'An empty over is walked past, but the group still draws a breadcrumb and counts towards progress',
            'Guard it with { $not: { $empty: <the same expression as over> } }',
          ]);
        }
      }
      if (typeof step_.flow !== 'string') {
        found = scanRepeats(step_.flow, `${path}.${id}.flow.steps`, depth + 1) || found;
      }
    }
    return found;
  };

  const repeats = scanRepeats(flow, 'steps', 0);

  // A repeat frame stores the item key its `keyBy` produced, so the stored
  // state depends on a field of the definition — the only construct in the flow
  // that does. Unversioned, a snapshot written before `keyBy` changed restores
  // clean and lands on an item that no longer means what it meant.
  if (repeats && flow.version === undefined) {
    report('repeat-without-version', 'version', [
      `flow "${flow.id}" has a repeat group but no version`,
      'A snapshot taken inside the group stores an item key, and cannot be refused when keyBy changes',
      'Stamp a version on the flow, and bump it whenever its shape changes',
    ]);
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
  const lines = problems.map((p) => `\n  ${p.path}: ${p.message}`).join('');
  throw new WizardError(
    'flow-invalid',
    'assertFlow',
    `flow "${flow.id}" failed validation:${lines}`,
    'assertFlow throws when validateFlow reports anything',
    'Fix each problem listed, or call validateFlow to render them instead'
  );
}
