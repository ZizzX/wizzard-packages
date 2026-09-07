---
title: Getting started
description: Install wizzard, define a flow, and render it with React or Vue.
---

A flow is a definition: the order of steps, the conditions that include them, and the
validation that guards them. The engine reads that definition; your components render whatever
step it says the flow is on.

## Install

```sh
npm i @wizzard-packages/core @wizzard-packages/react
```

Vue instead of React:

```sh
npm i @wizzard-packages/core @wizzard-packages/vue
```

## The flow

```ts
import { defineFlow } from '@wizzard-packages/core/v1';

export const signup = defineFlow({
  id: 'signup',
  version: 1,
  order: ['details', 'company', 'payment'],
  steps: {
    details: { label: 'Details', validate: { $ref: 'needsEmail' } },
    company: { label: 'Company', when: { $eq: [{ $get: 'data.payer' }, 'business'] } },
    payment: { label: 'Payment', on: { back: 'details' } },
  },
  policy: 'free',
});
```

Three things are already true of this object and of nothing you wrote by hand: `company` is
part of the flow only while `payer` is `business`, `next()` from `details` is refused until
`needsEmail` passes, and going back from `payment` lands on `details` rather than on whatever
came before it.

## What is next

The rest of this documentation is being written alongside the 1.0.0 release. Until it lands,
the engine's behaviour is specified by the tests in `packages/core/src/v1` and the reference
flows in `contract/fixtures.ts`.
