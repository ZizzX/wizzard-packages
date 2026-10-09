import {
  defineFlow,
  getPath,
  group,
  step,
  type AsyncRegistry,
  type SubFlows,
} from '@wizzard-packages/core';
import { empty, eq, get, not, ref } from '@wizzard-packages/core/expr';

const passenger = defineFlow({
  id: 'passenger',
  order: ['details'],
  steps: { details: step({ label: 'Passenger', validate: ref('passport') }) },
});

export const trip = defineFlow({
  id: 'trip',
  version: 1,
  order: ['route', 'people', 'company', 'payment'],
  steps: {
    route: step({ label: 'Route' }),
    people: group({
      label: 'Passengers',
      flow: 'passenger',
      when: not(empty(get('data.passengers'))),
      repeat: { over: get('data.passengers'), keyBy: 'id' },
    }),
    company: step({ label: 'Company', when: eq(get('data.business'), true) }),
    payment: step({ label: 'Payment' }),
  },
});

export const subFlows: SubFlows = { passenger };

export const registry: AsyncRegistry = {
  passport: (_args, { data, loop }) =>
    getPath(data, `answers.${loop?.key}.passport`) ? null : { passport: 'required' },
};
