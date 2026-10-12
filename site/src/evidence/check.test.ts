/**
 * The homepage card quoting check.ts says two things about its flow: that it
 * runs, with Company never shown, and that validateFlow says why. Both are
 * checked here against the engine, and so is the fix the message names.
 */
import { createWizard } from '@wizzard-packages/core';
import { validateFlow } from '@wizzard-packages/core/validate-flow';
import { describe, expect, it } from 'vitest';

import { flow, problems } from './check';

/** The steps a visitor sees, choosing a company account. */
async function visited(definition: typeof flow): Promise<string[]> {
  const wizard = createWizard({ flow: definition });
  await wizard.start();
  wizard.set('account.type', 'company');
  const seen = [String(wizard.getSnapshot().current)];
  while ((await wizard.next()).ok && wizard.getSnapshot().status !== 'done') {
    seen.push(String(wizard.getSnapshot().current));
  }
  return seen;
}

const fixed = JSON.parse(
  JSON.stringify(flow).replace('"account.type"', '"data.account.type"')
) as typeof flow;

describe('the flow the validateFlow card quotes', () => {
  it('runs, and never shows Company', async () => {
    expect(await visited(flow)).toEqual(['account']);
  });

  it('is refused for the path that reads from no root, and only for it', () => {
    expect(problems.map((problem) => [problem.code, problem.path])).toEqual([
      ['get-unknown-root', 'steps.company.when.$eq[0]'],
    ]);
  });

  it('shows Company and passes the check once the path starts with data', async () => {
    expect(validateFlow(fixed)).toEqual([]);
    expect(await visited(fixed)).toEqual(['account', 'company']);
  });
});
