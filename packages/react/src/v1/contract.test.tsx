import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Profiler, type ReactElement } from 'react';
import { afterEach } from 'vitest';

import {
  describeBindingContract,
  type BindingHarness,
  type Probe,
} from '../../../../contract/binding-suite';
import {
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
  useWizardSelector,
  WizardProvider,
} from './index';

interface Passenger {
  id: string;
  name?: string;
}

afterEach(cleanup);

/** Renders exactly the test ids the contract suite reads, and nothing else. */
function Probe(): ReactElement {
  const step = useStep();
  const nav = useNavigation();
  const errors = useErrors();
  const [name, setName] = useField<string>('name');

  // The repeat-group probe. Every value is read back out of the engine - the
  // key off the stack, the position by looking that key up in the list the
  // group repeats over - because a binding that kept its own idea of which
  // item is current is exactly the drift this suite exists to catch.
  const wizard = useWizard();
  const stack = useWizardSelector((s) => s.stack);
  const [passengers] = useField<Passenger[] | undefined>('passengers');
  const items = passengers ?? [];
  const itemKey = [...stack].reverse().find((frame) => frame.key !== undefined)?.key ?? '';
  const itemIndex = itemKey === '' ? -1 : items.findIndex((p) => p.id === itemKey);
  const itemName = itemIndex < 0 ? '' : (items[itemIndex]?.name ?? '');

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

      <span data-testid="item-key">{itemKey}</span>
      <span data-testid="item-index">{itemIndex < 0 ? '' : String(itemIndex)}</span>
      <span data-testid="item-name">{itemName}</span>
      <input
        data-testid="item-input"
        value={itemName}
        onChange={(event) => {
          if (itemIndex >= 0) wizard.set(`passengers.${itemIndex}.name`, event.target.value);
        }}
      />
      <button
        data-testid="add-item"
        onClick={() => {
          wizard.set('passengers', [...items, { id: `p${items.length + 1}` }]);
        }}
      >
        add
      </button>
      <button
        data-testid="remove-item"
        onClick={() => {
          wizard.set('passengers', items.slice(1));
        }}
      >
        remove
      </button>
    </div>
  );
}

const harness: BindingHarness = {
  name: 'react',
  mount: async ({ flow, registry, data, groups, subFlows }) => {
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
        <WizardProvider
          flow={flow}
          registry={registry}
          data={data}
          groups={groups}
          subFlows={subFlows}
        >
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
