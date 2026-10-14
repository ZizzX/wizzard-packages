import { flushPromises, mount } from '@vue/test-utils';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { WizardProvider } from '@wizzard-packages/react';
import { provideWizard } from '@wizzard-packages/vue';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';

import { trip } from '../hooks/flow';
import { registry } from '../hooks/registry';
import StepsVue from '../hooks/Steps.vue';
import { Steps } from '../hooks/Steps';

/**
 * The component under test is `Steps` from the Hooks page, rendered inside a
 * provider built for the test. The provider starts the engine on mount and
 * destroys it on unmount, as it does in the application.
 */
describe('Steps, on React', () => {
  it('shows the refusal and moves once the name is filled in', async () => {
    render(
      <WizardProvider flow={trip} registry={registry}>
        <Steps />
      </WizardProvider>
    );
    const input = await screen.findByLabelText(/Trip name/);

    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });
    expect(screen.getByRole('alert').textContent).toBe('Give the trip a name.');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Lisbon' } });
      fireEvent.click(screen.getByText('Next'));
    });
    expect(await screen.findByText('Ready to book Lisbon.')).toBeTruthy();
  });
});

describe('Steps, on Vue', () => {
  // `provideWizard` must run in a parent of the component that uses the
  // composables, so the test mounts a parent of its own.
  const Harness = defineComponent({
    name: 'TestHarness',
    setup() {
      provideWizard({ flow: trip, registry });
      return () => h(StepsVue);
    },
  });

  it('shows the refusal and moves once the name is filled in', async () => {
    const app = mount(Harness);
    await flushPromises();
    const next = app.findAll('button').find((b) => b.text() === 'Next');

    await next?.trigger('click');
    await flushPromises();
    expect(app.find('[role="alert"]').text()).toBe('Give the trip a name.');

    await app.find('input').setValue('Lisbon');
    await next?.trigger('click');
    await flushPromises();
    expect(app.text()).toContain('Ready to book Lisbon.');
    app.unmount();
  });
});
