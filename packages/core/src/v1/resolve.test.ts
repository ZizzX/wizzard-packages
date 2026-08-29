import { describe, expect, it } from 'vitest';

import { add, beginNav, commit, isCurrent, remove } from './commit';
import type { Scope } from './expr';
import { END, type FlowDefinition } from './flow';
import { allowedByPolicy, reachable, resolveBack, resolveNext } from './resolve';
import { initialState, type WizardState } from './state';

const flow: FlowDefinition = {
  id: 'booking',
  order: ['trip', 'company', 'payment', 'review'],
  steps: {
    trip: {},
    // The case 0.x could not express without a flash: reachability known before paint.
    company: { when: { $eq: [{ $get: 'data.trip.payer' }, 'business'] } },
    payment: {},
    review: {},
  },
};

const at = (step: string, over: Partial<WizardState> = {}): WizardState => ({
  ...initialState(),
  stack: [{ flow: 'booking', step }],
  ...over,
});

const scopeFor = (payer: string): Scope => ({ data: { trip: { payer } }, ctx: {} });

describe('resolveNext', () => {
  it('walks `order` when there is no explicit target', () => {
    expect(resolveNext(flow, at('trip'), scopeFor('business'))).toBe('company');
    expect(resolveNext(flow, at('company'), scopeFor('business'))).toBe('payment');
  });

  it('skips a step whose `when` is false rather than showing it disabled', () => {
    expect(resolveNext(flow, at('trip'), scopeFor('private'))).toBe('payment');
  });

  it('picks the first step when the stack is empty', () => {
    expect(resolveNext(flow, initialState(), scopeFor('private'))).toBe('trip');
  });

  it('ends the flow after the last step', () => {
    expect(resolveNext(flow, at('review'), scopeFor('private'))).toBe(END);
  });

  it('takes the first explicit target whose guard passes', () => {
    const branching: FlowDefinition = {
      id: 'b',
      order: ['a', 'vip', 'normal'],
      steps: {
        a: {
          on: {
            next: [{ to: 'vip', when: { $eq: [{ $get: 'data.tier' }, 'gold'] } }, { to: 'normal' }],
          },
        },
        vip: {},
        normal: {},
      },
    };
    const s: Scope = { data: { tier: 'gold' }, ctx: {} };
    expect(resolveNext(branching, at('a'), s)).toBe('vip');
    expect(resolveNext(branching, at('a'), { data: { tier: 'bronze' }, ctx: {} })).toBe('normal');
  });

  it('accepts a bare string target', () => {
    const jump: FlowDefinition = {
      id: 'j',
      order: ['a', 'b', 'c'],
      steps: { a: { on: { next: 'c' } }, b: {}, c: {} },
    };
    expect(resolveNext(jump, at('a'), scopeFor('x'))).toBe('c');
  });

  it('does not jump to an explicit target that is itself unreachable', () => {
    const jump: FlowDefinition = {
      id: 'j',
      order: ['a', 'b'],
      steps: { a: { on: { next: 'b' } }, b: { when: false } },
    };
    expect(resolveNext(jump, at('a'), scopeFor('x'))).toBe(END);
  });

  it('returns null for a step that is not in the flow', () => {
    expect(resolveNext(flow, at('ghost'), scopeFor('private'))).toBeNull();
  });

  it('honours an explicit @end', () => {
    const f: FlowDefinition = {
      id: 'f',
      order: ['a', 'b'],
      steps: { a: { on: { next: '@end' } }, b: {} },
    };
    expect(resolveNext(f, at('a'), scopeFor('x'))).toBe(END);
  });
});

describe('resolveBack', () => {
  it('skips backwards over steps that are no longer reachable', () => {
    expect(resolveBack(flow, at('payment'), scopeFor('private'))).toBe('trip');
    expect(resolveBack(flow, at('payment'), scopeFor('business'))).toBe('company');
  });

  it('returns null at the first step', () => {
    expect(resolveBack(flow, at('trip'), scopeFor('private'))).toBeNull();
  });

  it('follows an explicit back target', () => {
    const f: FlowDefinition = {
      id: 'f',
      order: ['a', 'b', 'c'],
      steps: { a: {}, b: {}, c: { on: { back: 'a' } } },
    };
    expect(resolveBack(f, at('c'), scopeFor('x'))).toBe('a');
  });
});

describe('reachable', () => {
  it('reflects the data, and changes when the data changes', () => {
    expect(reachable(flow, scopeFor('private'))).toEqual(['trip', 'payment', 'review']);
    expect(reachable(flow, scopeFor('business'))).toEqual(['trip', 'company', 'payment', 'review']);
  });
});

describe('allowedByPolicy', () => {
  const active = ['trip', 'payment', 'review'];

  it('lets `free` go anywhere', () => {
    const f = { ...flow, policy: 'free' as const };
    expect(allowedByPolicy(f, at('trip'), 'review', active)).toBe(true);
  });

  it('lets `visited` return only to steps already seen', () => {
    const f = { ...flow, policy: 'visited' as const };
    expect(allowedByPolicy(f, at('review', { visited: ['trip'] }), 'trip', active)).toBe(true);
    expect(allowedByPolicy(f, at('trip', { visited: ['trip'] }), 'review', active)).toBe(false);
  });

  it('lets `sequential` move one step at a time, over the reachable list', () => {
    const f = { ...flow, policy: 'sequential' as const };
    expect(allowedByPolicy(f, at('trip'), 'payment', active)).toBe(true);
    expect(allowedByPolicy(f, at('trip'), 'review', active)).toBe(false);
  });

  it('refuses a target that is not reachable at all', () => {
    const f = { ...flow, policy: 'sequential' as const };
    expect(allowedByPolicy(f, at('trip'), 'company', active)).toBe(false);
  });
});

describe('commit', () => {
  it('bumps rev on every write, so memoized selectors invalidate', () => {
    const a = initialState();
    const b = commit(a, { status: 'idle' });
    expect(b.rev).toBe(a.rev + 1);
    expect(b.status).toBe('idle');
    expect(a.status).toBe('init');
  });

  it('marks a navigation stale as soon as a newer one starts', () => {
    const { state: s1, token: first } = beginNav(initialState());
    expect(isCurrent(s1, first)).toBe(true);
    const { state: s2, token: second } = beginNav(s1);
    expect(isCurrent(s2, first)).toBe(false);
    expect(isCurrent(s2, second)).toBe(true);
  });

  it('keeps the set-like lists free of duplicates and identical when unchanged', () => {
    const list = ['a'];
    expect(add(list, 'a')).toBe(list);
    expect(add(list, 'b')).toEqual(['a', 'b']);
    expect(remove(list, 'zzz')).toBe(list);
    expect(remove(list, 'a')).toEqual([]);
  });
});
