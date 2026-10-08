import { createWizard } from '@wizzard-packages/core';
import { schema } from '@wizzard-packages/validate';
import { z } from 'zod';

const wizard = createWizard({
  flow: {
    id: 'booking',
    order: ['trip', 'payment'],
    steps: { trip: { validate: { $ref: 'tripRules' } }, payment: {} },
  },
  registry: {
    tripRules: schema(z.object({ name: z.string().min(1), age: z.number().min(18) })),
  },
});

await wizard.start(); // the first move, which validates nothing: no step has been left yet
wizard.set('age', 16);
console.log(await wizard.next());
