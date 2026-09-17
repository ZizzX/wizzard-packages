import {
  explain,
  MAX_EXPR_DEPTH,
  notRegisteredText,
  pageFor,
  tooDeepText,
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

/** The characters of a path a problem keeps, from its end, when the document is deeper than that. */
const MAX_PATH = 512;

export function validateFlow(
  flow: FlowDefinition,
  registry?: Readonly<Record<string, unknown>>
): FlowProblem[] {
  const problems: FlowProblem[] = [];
  const report = (code: string, path: string, text: Explained): void => {
    problems.push({ path, message: explain(code, text), code, fix: text[2], url: pageFor(code) });
  };

  // The shape of one flow: its steps and its order. `at` is empty for the root
  // and ends in `flow.` for an inline sub-flow, whose order is walked on its own.
  const checkShape = (f: FlowDefinition, at: string): void => {
    const ids = Object.keys(f.steps);
    if (ids.length === 0) {
      report('flow-no-steps', `${at}steps`, [
        `flow "${f.id}" has no steps`,
        'A wizard is its steps, so there is nothing to start on or to finish',
        'Add at least one step, or check that the definition arrived whole',
      ]);
    }

    if (f.order) {
      for (const id of f.order) {
        if (!(id in f.steps)) {
          report('order-unknown-step', `${at}order`, [
            `order names "${id}", which is not a step`,
            'order lists the default path by step id, and every id in it has to be a key of steps',
            'Correct the id in order, or add the step it names',
          ]);
        }
      }
      for (const id of ids) {
        if (!f.order.includes(id)) {
          report('step-not-in-order', `${at}steps.${id}`, [
            `step "${id}" is not in order`,
            'next() and back() walk order, so the step is reachable only through a transition or go()',
            "Add it to order, or lead to it from another step's on.next",
          ]);
        }
      }
      // One pass, and one report per id however many times it repeats.
      const once = new Set<string>();
      const twice = new Set<string>();
      for (const id of f.order) (once.has(id) ? twice : once).add(id);
      for (const id of twice) {
        report('order-duplicate', `${at}order`, [
          `order names "${id}" more than once`,
          'A step has one position in order, and next() and back() find their way from it',
          `Keep one occurrence of ${id}`,
        ]);
      }
    }
  };

  checkShape(flow, '');

  // Iterative and without a depth limit: `ui` and a `$ref`'s `args` are the
  // host's data, and a function at any depth is one `JSON.stringify` drops.
  // Each frame on the stack is one open object or list and the index of its
  // next child, so memory follows the depth of the document and not the width
  // of its lists. The path is joined from the frames only for a report, and
  // keeps its last `MAX_PATH` characters, so a deep document with many problems
  // costs a bounded string for each. An object is on `inside` while its subtree
  // is walked, which is what finds a cycle.
  type Frame = [
    value: object,
    part: string,
    parent: Frame | undefined,
    keys: string[],
    next: number,
  ];
  const pathOf = (parent: Frame | undefined, part: string): string => {
    let path = part;
    for (; parent && path.length < MAX_PATH; parent = parent[2]) path = parent[1] + path;
    return parent ? `...${path.slice(-MAX_PATH)}` : path;
  };
  const inside = new Set<object>();
  const checkExpr = (root: unknown, at: string, refs = true): void => {
    const stack: Frame[] = [];
    const visit = (value: unknown, part: string, parent: Frame | undefined): void => {
      if (typeof value === 'function') {
        const path = pathOf(parent, part);
        report('flow-not-serializable', path, [
          `${path} is a function`,
          'JSON.stringify drops a function, so the flow would not survive being stored or sent',
          'Move the function into the registry and name it with a $ref',
        ]);
        return;
      }
      if (value === null || typeof value !== 'object') return;
      if (inside.has(value)) {
        const path = pathOf(parent, part);
        report('flow-not-serializable', path, [
          `${path} contains itself`,
          'JSON.stringify throws on a cycle, so the flow could not be stored or sent',
          'Replace the reference with a copy of the value',
        ]);
        return;
      }
      inside.add(value);
      stack.push([value, part, parent, Array.isArray(value) ? [] : Object.keys(value), 0]);
    };

    visit(root, at, undefined);
    for (let top = stack[stack.length - 1]; top; top = stack[stack.length - 1]) {
      const [value, , , keys, next] = top;
      const list = Array.isArray(value) ? (value as unknown[]) : undefined;
      if (next >= (list ?? keys).length) {
        stack.pop();
        inside.delete(value);
        continue;
      }
      top[4] = next + 1;
      if (list) {
        visit(list[next], `[${next}]`, top);
        continue;
      }
      const key = keys[next] as string;
      const child = (value as Record<string, unknown>)[key];
      if (refs && key === '$get' && typeof child === 'string') {
        const root = child.split('.')[0] ?? '';
        if (!ROOTS.includes(root)) {
          report('get-unknown-root', pathOf(top[2], top[1]), [
            `$get "${child}" does not start with ${ROOTS.join(', ')}`,
            'The first segment names where a path reads from, and any other start evaluates to undefined',
            `Start the path with the root it belongs to, such as data.${child}`,
          ]);
        }
      } else if (refs && key === '$ref' && typeof child === 'string') {
        if (registry && !(child in registry)) {
          report('resolver-not-registered', pathOf(top[2], top[1]), notRegisteredText(child));
        }
      } else {
        visit(child, `.${key}`, top);
      }
    }
  };

  // Every field of the flow, not only its steps: `validate`, `policy` or a
  // host's own field is stored and sent with them. Beside `steps` nothing is
  // evaluated, so a `$ref` or `$get` there is the host's data - a JSON Schema's
  // `$ref`, say - and only a function or a cycle is looked for. The flow itself is on
  // `inside`, so a field that points back at it is one cycle, not a second walk.
  inside.add(flow);
  for (const [key, value] of Object.entries(flow)) {
    if (key !== 'steps') checkExpr(value, key, false);
    else for (const [id, step_] of Object.entries(flow.steps)) checkExpr(step_, `steps.${id}`);
  }
  inside.delete(flow);

  // Where the engine evaluates an expression, and only there: `ui` is the host's
  // JSON and may carry `$`-keys of its own. The evaluator throws on an object
  // with no operator among its keys. Of an object with several it takes one,
  // and `evaluate` and `evaluateAsync` test them in different orders, so every
  // operator present is followed rather than guessing which one runs. A
  // `$ref`'s `args` are data handed to the resolver, never evaluated, and are
  // not looked inside.
  // Depth counts objects and lists alike, as the evaluator does. The evaluator
  // refuses a branch only when it reaches it - `$and` and `$or` short-circuit,
  // as they do for an unknown operator - so this reports every branch it could
  // refuse, before the data decides which ones run. The walk itself cannot
  // overflow the stack on a pasted or hostile document.
  // An object already on the way down is a cycle, which `checkExpr` reports;
  // following it would add a second, wrong problem at the depth limit.
  const above = new Set<object>();
  // One `expr-too-deep` for each expression, at the first branch past the
  // limit: its fix is the same for every branch, and a problem for each of ten
  // thousand siblings would cost more than the document that carried them.
  let tooDeep = false;
  const checkOperators = (e: unknown, path: string, depth = 0): void => {
    if (depth === 0) tooDeep = false;
    if (e === null || typeof e !== 'object' || above.has(e)) return;
    if (depth >= MAX_EXPR_DEPTH) {
      if (!tooDeep) report('expr-too-deep', path, tooDeepText);
      tooDeep = true;
      return;
    }
    above.add(e);
    if (Array.isArray(e)) {
      e.forEach((child, i) => {
        checkOperators(child, `${path}[${i}]`, depth + 1);
      });
    } else {
      const ops = OPERATORS.filter((key) => key in e);
      if (ops.length === 0) {
        report('expr-unknown-operator', path, unknownOperatorText(Object.keys(e)[0]));
      }
      for (const op of ops) {
        const value = (e as Record<string, unknown>)[op];
        // An operator's list of operands is never walked as a value, only its
        // items are, two levels down - so a list of literals right at the limit
        // evaluates, and is not reported. `$not` and `$empty` take one operand,
        // and a list there is a literal like any other.
        // A `$get` names a path and is read, never evaluated, like a `$ref`'s `args`.
        if (op === '$ref' || op === '$get') continue;
        if (Array.isArray(value) && op !== '$not' && op !== '$empty') {
          value.forEach((item, i) => {
            checkOperators(item, `${path}.${op}[${i}]`, depth + 2);
          });
        } else {
          checkOperators(value, `${path}.${op}`, depth + 1);
        }
      }
    }
    above.delete(e);
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

  // The shape of one step, against the flow that holds it: a target in an inline
  // sub-flow names a step of that sub-flow, not of the root.
  const checkStep = (f: FlowDefinition, id: string, step_: StepDef, at: string): void => {
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
      if (to !== '@end' && !(to in f.steps)) unknownTarget(to, `${at}.on.next`);
    }

    const back = step_.on?.back;
    if (back !== undefined && back !== 'auto') {
      const to = typeof back === 'string' ? back : back.to;
      if (!(to in f.steps)) unknownTarget(to, `${at}.on.back`);
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
    if (depth > 0) checkShape(f, path.slice(0, -'steps'.length));

    let found = false;
    for (const [id, step_] of Object.entries(f.steps)) {
      checkStep(f, id, step_, `${path}.${id}`);
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
