import { describe, expect, test, vi } from 'vitest';
import { WizardStore } from '@wizzard/core';
import { devToolsMiddleware } from './devToolsMiddleware';

const initialData = { name: 'Alice', age: 30 };
const config = {
  steps: [
    { id: 'step1', label: 'Step 1' },
    { id: 'step2', label: 'Step 2' },
  ],
};

describe('devToolsMiddleware', () => {
  test('serializes data before sending to Redux DevTools', () => {
    const mockDevTools = {
      init: vi.fn(),
      send: vi.fn(),
      subscribe: vi.fn(),
      unsubscribe: vi.fn(),
      error: vi.fn(),
    };
    const globalContext = (typeof window !== 'undefined' ? window : globalThis) as any;
    globalContext.__REDUX_DEVTOOLS_EXTENSION__ = {
      connect: () => mockDevTools,
    };

    const store = new WizardStore(initialData, [devToolsMiddleware]);
    store.dispatch({
      type: 'INIT',
      payload: { data: initialData, config },
    });

    const tempSet = new Set(['step1']);
    store.dispatch({
      type: 'SET_VISITED_STEPS',
      payload: { steps: tempSet },
    });

    expect(mockDevTools.send).toHaveBeenCalled();
    const sendCall = mockDevTools.send.mock.calls.find(
      (call) => call[0].type === 'SET_VISITED_STEPS'
    );
    expect(sendCall).toBeDefined();
  });
});
