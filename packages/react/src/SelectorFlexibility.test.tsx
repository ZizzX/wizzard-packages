import { act, render, screen } from '@testing-library/react';
import { IWizardConfig } from '@wizzard-packages/core';
import { useEffect, useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createWizardFactory } from './factory';

interface TestSchema {
  user: {
    name: string;
    age: number;
    email: string;
  };
  settings: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

const { WizardProvider, useWizardShallowSelector, useWizardActions } =
  createWizardFactory<TestSchema>();

const SelectorConsumer = ({ onRender }: { onRender: () => void }) => {
  // Option 1: Direct shallow equal in useWizardSelector
  // const userInfo = useWizardSelector(state => ({
  //   name: state.data.user.name,
  //   age: state.data.user.age
  // }), shallowEqual);

  // Option 2: New dedicated shallow selector hook
  const userInfo = useWizardShallowSelector((state) => ({
    name: state.data.user.name,
    age: state.data.user.age,
  }));

  const renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    onRender();
  });

  return (
    <div>
      <div data-testid="user-name">{userInfo.name}</div>
      <div data-testid="user-age">{userInfo.age}</div>
      <div data-testid="render-count">{renderCount.current}</div>
    </div>
  );
};

describe('useWizardSelector Flexibility & Performance', () => {
  const config: IWizardConfig<TestSchema> = {
    steps: [{ id: 'step1', label: 'Step 1' }],
  };

  const initialData: TestSchema = {
    user: { name: 'Alice', age: 25, email: 'alice@example.com' },
    settings: { theme: 'light', notifications: true },
  };

  it('should avoid re-renders when irrelevant data changes and returning a new object', async () => {
    const onRender = vi.fn();

    render(
      <WizardProvider config={config} initialData={initialData}>
        <SelectorConsumer onRender={onRender} />
        <ActionsConsumer />
      </WizardProvider>
    );

    // Initial render
    expect(screen.getByTestId('user-name').textContent).toBe('Alice');
    expect(onRender).toHaveBeenCalledTimes(1);

    // Update irrelevant data
    await act(async () => {
      screen.getByTestId('update-settings-btn').click();
    });

    // If useWizardSelector is working correctly with stability checks,
    // it should NOT re-render because user.name and user.age didn't change.
    // However, our current selector returns a NEW object every time if the state changes.
    // Let's see if it re-renders.
    expect(onRender).toHaveBeenCalledTimes(1);
  });
});

const ActionsConsumer = () => {
  const { setData } = useWizardActions();
  return (
    <button
      data-testid="update-settings-btn"
      onClick={() => setData('settings.theme' as any, 'dark')}
    >
      Update Settings
    </button>
  );
};
