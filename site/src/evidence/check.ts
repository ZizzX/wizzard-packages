import { validateFlow } from '@wizzard-packages/core/validate-flow';

import type { FlowDefinition } from '@wizzard-packages/core';

export const flow: FlowDefinition = {
  id: 'signup',
  order: ['account', 'company'],
  steps: {
    account: {},
    company: { when: { $eq: [{ $get: 'account.type' }, 'company'] } },
  },
};

export const problems = validateFlow(flow);
