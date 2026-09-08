/**
 * A recorded run of R-A, for the inspector's Replay mode.
 *
 * Not written by hand: it was dumped from the real engine driven through
 * `flowA` with `registryA` — start, a `next()` refused because the validator
 * wants an email, then the email, the company, the card and the end. That is
 * what makes it worth replaying: the refusal at frame 2 is a real refusal,
 * produced by the same validator the hero runs.
 *
 * `contract/recording.test.ts` replays it through `checkSession` against
 * `flowA`, so a change to the flow that leaves this file behind fails there
 * rather than on the page.
 */
import type { RecordedSession } from '@wizzard-packages/core/session';

export const recordingA: RecordedSession = {
  flow: 'signup',
  version: 1,
  frames: [
    {
      status: 'init',
      stack: [],
      history: [],
      data: {
        payer: 'business',
      },
      ctx: {},
      errors: {},
      visited: [],
      completed: [],
      dirty: [],
      busy: [],
      rev: 0,
      nav: 0,
    },
    {
      status: 'idle',
      stack: [
        {
          flow: 'signup',
          step: 'details',
        },
      ],
      history: [],
      data: {
        payer: 'business',
      },
      ctx: {},
      errors: {},
      visited: ['details'],
      completed: [],
      dirty: [],
      busy: [],
      rev: 2,
      nav: 1,
    },
    {
      status: 'idle',
      stack: [
        {
          flow: 'signup',
          step: 'details',
        },
      ],
      history: [],
      data: {
        payer: 'business',
      },
      ctx: {},
      errors: {
        details: {
          email: 'required',
        },
      },
      visited: ['details'],
      completed: [],
      dirty: [],
      busy: [],
      rev: 4,
      nav: 2,
    },
    {
      status: 'idle',
      stack: [
        {
          flow: 'signup',
          step: 'details',
        },
      ],
      history: [],
      data: {
        payer: 'business',
        email: 'ada@example.com',
      },
      ctx: {},
      errors: {
        details: {
          email: 'required',
        },
      },
      visited: ['details'],
      completed: [],
      dirty: ['email'],
      busy: [],
      rev: 5,
      nav: 2,
    },
    {
      status: 'idle',
      stack: [
        {
          flow: 'signup',
          step: 'company',
        },
      ],
      history: [
        [
          {
            flow: 'signup',
            step: 'details',
          },
        ],
      ],
      data: {
        payer: 'business',
        email: 'ada@example.com',
      },
      ctx: {},
      errors: {},
      visited: ['details', 'company'],
      completed: ['details'],
      dirty: ['email'],
      busy: [],
      rev: 8,
      nav: 3,
    },
    {
      status: 'idle',
      stack: [
        {
          flow: 'signup',
          step: 'company',
        },
      ],
      history: [
        [
          {
            flow: 'signup',
            step: 'details',
          },
        ],
      ],
      data: {
        payer: 'business',
        email: 'ada@example.com',
        company: 'Acme Ltd',
      },
      ctx: {},
      errors: {},
      visited: ['details', 'company'],
      completed: ['details'],
      dirty: ['email', 'company'],
      busy: [],
      rev: 9,
      nav: 3,
    },
    {
      status: 'idle',
      stack: [
        {
          flow: 'signup',
          step: 'payment',
        },
      ],
      history: [
        [
          {
            flow: 'signup',
            step: 'details',
          },
        ],
        [
          {
            flow: 'signup',
            step: 'company',
          },
        ],
      ],
      data: {
        payer: 'business',
        email: 'ada@example.com',
        company: 'Acme Ltd',
      },
      ctx: {},
      errors: {},
      visited: ['details', 'company', 'payment'],
      completed: ['details', 'company'],
      dirty: ['email', 'company'],
      busy: [],
      rev: 11,
      nav: 4,
    },
    {
      status: 'idle',
      stack: [
        {
          flow: 'signup',
          step: 'payment',
        },
      ],
      history: [
        [
          {
            flow: 'signup',
            step: 'details',
          },
        ],
        [
          {
            flow: 'signup',
            step: 'company',
          },
        ],
      ],
      data: {
        payer: 'business',
        email: 'ada@example.com',
        company: 'Acme Ltd',
        card: '4242 4242 4242 4242',
      },
      ctx: {},
      errors: {},
      visited: ['details', 'company', 'payment'],
      completed: ['details', 'company'],
      dirty: ['email', 'company', 'card'],
      busy: [],
      rev: 12,
      nav: 4,
    },
    {
      status: 'done',
      stack: [
        {
          flow: 'signup',
          step: 'payment',
        },
      ],
      history: [
        [
          {
            flow: 'signup',
            step: 'details',
          },
        ],
        [
          {
            flow: 'signup',
            step: 'company',
          },
        ],
      ],
      data: {
        payer: 'business',
        email: 'ada@example.com',
        company: 'Acme Ltd',
        card: '4242 4242 4242 4242',
      },
      ctx: {},
      errors: {},
      visited: ['details', 'company', 'payment'],
      completed: ['details', 'company', 'payment'],
      dirty: ['email', 'company', 'card'],
      busy: [],
      rev: 14,
      nav: 5,
    },
  ],
};
