# @wizzard-packages/adapter-yup

Yup validation adapter for Wizzard Stepper.

## Install

```bash
pnpm add @wizzard-packages/adapter-yup yup
```

## Usage

```ts
import { YupAdapter } from '@wizzard-packages/adapter-yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required(),
});

const adapter = new YupAdapter(schema);

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
