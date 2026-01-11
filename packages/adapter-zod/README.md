# @wizzard-packages/adapter-zod

Zod validation adapter for Wizzard Stepper.

## Install

```bash
pnpm add @wizzard-packages/adapter-zod zod
```

## Usage

```ts
import { ZodAdapter } from '@wizzard-packages/adapter-zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
});

const adapter = new ZodAdapter(schema);

const steps = [
  {
    id: 'name',
    label: 'Name',
    component: NameStep,
    validationAdapter: adapter,
  },
];
```

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs: https://github.com/ZizzX/wizzard-packages#readme
