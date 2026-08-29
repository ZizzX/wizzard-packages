# @wizzard-packages/validate

One validation adapter for every schema library, in 317 bytes gzipped.

0.x shipped `adapter-zod` and `adapter-yup`: two packages that differed only in
how they spelled "list the failures". [Standard Schema](https://standardschema.dev)
makes that difference disappear. Zod 3.24+, Zod 4, Valibot, ArkType, Effect and
Yup 1.5+ all expose the same `~standard` property, so one function covers all of
them — and every library that adopts the spec later, without a release here.

The schema library is yours. This package never bundles one.

## Install

```sh
npm i @wizzard-packages/validate
```

## Use

A flow names its validator; the registry says what the name means.

```ts
import { createWizard } from '@wizzard-packages/core/v1';
import { schema } from '@wizzard-packages/validate';
import { z } from 'zod';

const flow = {
  id: 'booking',
  order: ['trip', 'payment'],
  steps: {
    trip: { validate: { $ref: 'tripRules' } },
    payment: {},
  },
};

const wizard = createWizard({
  flow,
  registry: {
    tripRules: schema(z.object({ name: z.string().min(1), age: z.number().min(18) })),
  },
});

await wizard.next(); // { ok: false, reason: 'invalid', errors: { name: '…', age: '…' } }
```

Swap `z.object(...)` for a Valibot, ArkType, Effect or Yup schema and nothing
else changes.

## `schema(s, opts?)`

Returns a resolver: `(args, scope) => Record<string, string> | null`. Keys are
dot-paths, values are the first message reported for that path. `null` means the
value is good.

### `opts.at`

Which value to validate, as a path into the same scope the flow's expressions
address — `data`, `data.trip`, `ctx.user`. Defaults to `data`, the whole form,
because most schemas describe the fields of the step being left and object
schemas ignore keys they do not mention.

```ts
schema(tripSchema, { at: 'data.trip' });
```

A missing path hands the schema `undefined` rather than throwing, so a schema
that allows an absent value stays in charge of that decision.

## Error keys

| Issue path            | Key           |
| --------------------- | ------------- |
| `['name']`            | `name`        |
| `['guests', 1, 'na']` | `guests.1.na` |
| absent or `[]`        | `''`          |

The empty key holds an error about the value as a whole — a cross-field
refinement, say. When two issues share a path the first wins: schemas report in
declaration order, and letting a later refinement overwrite the first hides the
obvious failure behind the subtle one.

## Migrating from the 0.x adapters

`ZodAdapter` and `YupAdapter` are classes passed as `validationAdapter`. In v1 a
validator is a plain resolver named by the flow.

```diff
-import { ZodAdapter } from '@wizzard-packages/adapter-zod';
-new WizardStore({ steps, validationAdapter: new ZodAdapter(tripSchema) });
+import { schema } from '@wizzard-packages/validate';
+createWizard({ flow, registry: { tripRules: schema(tripSchema) } });
```

The error map has the same shape in both, so anything rendering `errors[field]`
carries over untouched.

## License

MIT
