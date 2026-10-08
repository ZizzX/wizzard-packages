# @wizzard-packages/validate

![npm](https://img.shields.io/npm/v/@wizzard-packages/validate)
![license](https://img.shields.io/npm/l/@wizzard-packages/validate)

One validation adapter for every schema library. Zod 3.24+, Zod 4, Valibot, ArkType, Effect and
Yup 1.5+ all speak [Standard Schema](https://standardschema.dev), so one function covers each of
them, and every library that adopts the spec later, without a release here. The schema library
is yours: this package never bundles one.

## Install

```bash
pnpm add @wizzard-packages/core@canary @wizzard-packages/validate@canary
```

## Use

A flow names its validator; the registry says what the name means.

<!-- example:validate -->

<!-- prettier-ignore -->
```ts
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
```

<!-- /example -->

It prints the refusal, one message per field:

<!-- example:validate-output -->

<!-- prettier-ignore -->
```txt
{
  ok: false,
  reason: 'invalid',
  by: 'trip',
  errors: {
    name: 'Invalid input: expected string, received undefined',
    age: 'Too small: expected number to be >=18'
  },
  code: 'nav-invalid',
  url: 'https://zizzx.github.io/wizzard-packages/errors/nav-invalid'
}
```

<!-- /example -->

Swap the Zod schema for a Valibot, ArkType, Effect or Yup one and nothing else changes.
`schema(s, { at: 'data.trip' })` validates one part of the form instead of all of it; errors
come back keyed by dot-path, one message per path.

## Supported

Node 20.11+, TypeScript 5+. ESM and CJS, types for both. No peer dependencies.
`@wizzard-packages/core` is a dependency, installed beside it above so your own code can import
the engine.

## Documentation

[Validation](https://zizzx.github.io/wizzard-packages/docs/validation/) covers `schema`, `opts.at` and the error keys.
Coming from `adapter-zod` or `adapter-yup`: [the migration guide](https://github.com/ZizzX/wizzard-packages/blob/main/docs/MIGRATION.md).

## License

MIT
