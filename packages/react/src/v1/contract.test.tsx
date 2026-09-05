import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Profiler, type ReactElement } from 'react';
import { afterEach } from 'vitest';

import {
  describeBindingContract,
  type BindingHarness,
  type Probe,
} from '../../../../contract/binding-suite';
import { useErrors, useField, useNavigation, useStep, WizardProvider } from './index';

afterEach(cleanup);

/** Renders exactly the test ids the contract suite reads, and nothing else. */
function Probe(): ReactElement {
  const step = useStep();
  const nav = useNavigation();
  const errors = useErrors();
  const [name, setName] = useField<string>('name');

  return (
    <div>
      <span data-testid="step">{step.current ?? ''}</span>
      <span data-testid="progress">{step.progress}</span>
      <span data-testid="can-back">{nav.canBack ? 'yes' : 'no'}</span>
      <span data-testid="busy">{nav.isBusy ? 'yes' : 'no'}</span>
      <span data-testid="errors">
        {Object.entries(errors)
          .map(([field, message]) => `${field}: ${message}`)
          .join(', ')}
      </span>
      <span data-testid="name-value">{name ?? ''}</span>
      <input
        data-testid="name-input"
        value={name ?? ''}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <button
        data-testid="next"
        onClick={() => {
          void nav.next();
        }}
      >
        next
      </button>
      <button
        data-testid="back"
        onClick={() => {
          void nav.back();
        }}
      >
        back
      </button>
    </div>
  );
}

const harness: BindingHarness = {
  name: 'react',
  mount: async ({ flow, registry, data }) => {
    // Counted with Profiler rather than inside the component: a render-phase
    // side effect is exactly what the hooks lint exists to stop, and onRender
    // fires after commit, which is what we actually want to count.
    let renders = 0;
    render(
      <Profiler
        id="probe"
        onRender={() => {
          renders += 1;
        }}
      >
        <WizardProvider flow={flow} registry={registry} data={data}>
          <Probe />
        </WizardProvider>
      </Profiler>
    );

    const probe: Probe = {
      text: (testId) => screen.getByTestId(testId).textContent ?? '',
      click: async (testId) => {
        await act(async () => {
          fireEvent.click(screen.getByTestId(testId));
        });
      },
      fill: async (testId, value) => {
        await act(async () => {
          fireEvent.change(screen.getByTestId(testId), { target: { value } });
        });
      },
      renders: () => renders,
      unmount: cleanup,
    };
    return Promise.resolve(probe);
  },
};

describeBindingContract(harness);
