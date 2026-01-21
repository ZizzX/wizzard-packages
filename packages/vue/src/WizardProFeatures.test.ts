import { describe, expect, it, vi } from 'vitest';
import { defineComponent, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { createWizardFactory } from './index';
import type { IWizardConfig, IStepConfig } from '@wizzard-packages/core';

interface TestSchema {
  name?: string;
  email?: string;
  showStep2?: boolean;
  blockNext?: boolean;
  showStep2Data?: string;
  step2Data?: string;
  user?: {
    address?: {
      city?: string;
    };
    name?: string;
  };
}

type StepId = 'step1' | 'step2' | 'step3' | 'security';

const factory = createWizardFactory<TestSchema, StepId>();

describe('Vue Wizard Pro Features', () => {
  it('should calculate progress and activeStepsCount correctly', async () => {
    const steps: IStepConfig<TestSchema, StepId>[] = [
      { id: 'step1', label: 'Step 1' },
      {
        id: 'step2',
        label: 'Step 2',
        condition: async (data: TestSchema) => {
          await new Promise((r) => setTimeout(r, 20));
          return !!data.showStep2;
        },
      },
      { id: 'step3', label: 'Step 3' },
    ];

    const config: IWizardConfig<TestSchema, StepId> = { steps };

    const Consumer = defineComponent({
      setup() {
        const state = factory.useWizardState();
        const actions = factory.useWizardActions();
        return () =>
          h('div', [
            h('div', { 'data-testid': 'current-step' }, state.value.currentStepId || 'EMPTY'),
            h('div', { 'data-testid': 'progress' }, String(state.value.progress)),
            h('div', { 'data-testid': 'steps-count' }, String(state.value.activeStepsCount)),
            h(
              'button',
              { 'data-testid': 'show-2-btn', onClick: () => actions.setData('showStep2', true) },
              'Show 2'
            ),
          ]);
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config });
        return () => h(Consumer);
      },
    });

    const wrapper = mount(Provider);
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="current-step"]').text()).toBe('step1');

    // Wait for async condition to settle
    await new Promise((r) => setTimeout(r, 50));
    await nextTick();
    await nextTick();

    // Initially only 2 steps active (step1, step3) because step2 condition is async and defaults to false
    expect(wrapper.find('[data-testid="steps-count"]').text()).toBe('2');
    // Progress: (1/2) * 100 = 50
    expect(wrapper.find('[data-testid="progress"]').text()).toBe('50');
  });

  it.skip('should handle async step conditions dynamically', async () => {
    const steps: IStepConfig<TestSchema, StepId>[] = [
      { id: 'step1', label: 'Step 1' },
      {
        id: 'step2',
        label: 'Step 2',
        condition: async (data: TestSchema) => {
          await new Promise((r) => setTimeout(r, 20));
          return !!data.showStep2;
        },
      },
      { id: 'step3', label: 'Step 3' },
    ];

    const config: IWizardConfig<TestSchema, StepId> = { steps };

    const Consumer = defineComponent({
      setup() {
        const state = factory.useWizardState();
        const actions = factory.useWizardActions();
        return () =>
          h('div', [
            h('div', { 'data-testid': 'steps-count' }, String(state.value.activeStepsCount)),
            h(
              'button',
              { 'data-testid': 'show-2-btn', onClick: () => actions.setData('showStep2', true) },
              'Show 2'
            ),
          ]);
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config });
        return () => h(Consumer);
      },
    });

    const wrapper = mount(Provider);
    await nextTick();
    await nextTick();

    // Wait for async condition to settle
    await new Promise((r) => setTimeout(r, 50));
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="steps-count"]').text()).toBe('2');

    // Show step 2
    await wrapper.find('[data-testid="show-2-btn"]').trigger('click');
    await nextTick();
    await nextTick();

    // Wait for async condition to resolve
    await new Promise((r) => setTimeout(r, 50));
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="steps-count"]').text()).toBe('3');
  });

  it('should respect beforeLeave guards', async () => {
    const steps: IStepConfig<TestSchema, StepId>[] = [
      { id: 'step1', label: 'Step 1' },
      { id: 'step2', label: 'Step 2' },
      {
        id: 'step3',
        label: 'Step 3',
        beforeLeave: async (data: TestSchema, dir: string) => {
          if (dir === 'next' && data.blockNext) return false;
          return true;
        },
      },
    ];

    const config: IWizardConfig<TestSchema, StepId> = { steps };

    const Consumer = defineComponent({
      setup() {
        const state = factory.useWizardState();
        const actions = factory.useWizardActions();
        return () =>
          h('div', [
            h('div', { 'data-testid': 'current-step' }, state.value.currentStepId || 'EMPTY'),
            h(
              'button',
              {
                'data-testid': 'next-btn',
                onClick: async () => await actions.nextStep({ validate: false }),
              },
              'Next'
            ),
            h(
              'button',
              { 'data-testid': 'block-btn', onClick: () => actions.setData('blockNext', true) },
              'Block'
            ),
          ]);
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config });
        return () => h(Consumer);
      },
    });

    const wrapper = mount(Provider);
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="current-step"]').text()).toBe('step1');

    // Go to step 2
    await wrapper.find('[data-testid="next-btn"]').trigger('click');
    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="current-step"]').text()).toBe('step2');

    // Go to step 3
    await wrapper.find('[data-testid="next-btn"]').trigger('click');
    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="current-step"]').text()).toBe('step3');

    // Block movement from step 3
    await wrapper.find('[data-testid="block-btn"]').trigger('click');
    await nextTick();

    // Try to go next from step 3 (guard should prevent it)
    await wrapper.find('[data-testid="next-btn"]').trigger('click');
    await nextTick();
    await nextTick();
    await nextTick();

    // Should still be on step3
    expect(wrapper.find('[data-testid="current-step"]').text()).toBe('step3');
  });

  it.skip('should reset wizard state', async () => {
    const steps: IStepConfig<TestSchema, StepId>[] = [
      { id: 'step1', label: 'Step 1' },
      { id: 'step2', label: 'Step 2' },
      { id: 'step3', label: 'Step 3' },
    ];

    const config: IWizardConfig<TestSchema, StepId> = { steps };

    const Consumer = defineComponent({
      setup() {
        const state = factory.useWizardState();
        const actions = factory.useWizardActions();
        return () =>
          h('div', [
            h('div', { 'data-testid': 'current-step' }, state.value.currentStepId || 'EMPTY'),
            h('div', { 'data-testid': 'history' }, state.value.history.join(',')),
            h(
              'button',
              { 'data-testid': 'show-2-btn', onClick: () => actions.setData('showStep2', true) },
              'Show 2'
            ),
            h(
              'button',
              {
                'data-testid': 'next-btn',
                onClick: async () => await actions.nextStep({ validate: false }),
              },
              'Next'
            ),
            h('button', { 'data-testid': 'reset-btn', onClick: () => actions.reset() }, 'Reset'),
          ]);
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config });
        return () => h(Consumer);
      },
    });

    const wrapper = mount(Provider);
    await nextTick();
    await nextTick();

    // Go to next step to change state
    await wrapper.find('[data-testid="show-2-btn"]').trigger('click');
    await nextTick();

    await wrapper.find('[data-testid="next-btn"]').trigger('click');
    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="history"]').text()).toContain('step2');

    // Reset
    await wrapper.find('[data-testid="reset-btn"]').trigger('click');
    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="current-step"]').text()).toBe('step1');
    expect(wrapper.find('[data-testid="history"]').text()).toBe('step1');
  });

  it('should validate all active steps even after immediate data update', async () => {
    const config: IWizardConfig<TestSchema, StepId> = {
      steps: [
        { id: 'step1', label: 'Step 1' },
        {
          id: 'step2',
          label: 'Step 2',
          condition: (data: TestSchema) => data.showStep2Data === 'true',
          validationAdapter: {
            validate: (data: TestSchema) =>
              ({
                isValid: !!data.step2Data,
                errors: !data.step2Data ? { someField: 'Required' } : {},
              }) as any,
          },
        },
      ],
    };

    const Consumer = defineComponent({
      setup() {
        const actions = factory.useWizardActions();
        const result = defineComponent({
          data() {
            return {
              validationResult: null as any,
            };
          },
          methods: {
            async validate() {
              actions.setData('showStep2Data', 'true');
              this.validationResult = await actions.validateAll();
            },
          },
        });
        return { result, actions };
      },
      render() {
        return h('div');
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config });
        return () => h(Consumer);
      },
    });

    const wrapper = mount(Provider);
    await nextTick();
    await nextTick();

    const consumer = wrapper.findComponent(Consumer);
    const actions = (consumer.vm as any).actions;

    // 1. Initially only step1 is active.
    // 2. Update data to show step2 AND call validateAll immediately
    actions.setData('showStep2Data', 'true');
    await nextTick();
    const validationResult = await actions.validateAll();
    await nextTick();

    // This should be FALSE because step2 is now active but step2Data is missing
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors.step2).toBeDefined();
  });

  it.skip('should record history when using goToStep directly', async () => {
    const config: IWizardConfig<TestSchema, StepId> = {
      steps: [
        { id: 'step1', label: 'Step 1' },
        { id: 'step2', label: 'Step 2' },
        { id: 'step3', label: 'Step 3' },
      ],
    };

    const Consumer = defineComponent({
      setup() {
        const state = factory.useWizardState();
        const actions = factory.useWizardActions();
        return () =>
          h('div', [
            h('div', { 'data-testid': 'history' }, state.value.history.join(',')),
            h(
              'button',
              { 'data-testid': 'goto-2', onClick: async () => await actions.goToStep('step2') },
              'Go 2'
            ),
            h(
              'button',
              { 'data-testid': 'goto-3', onClick: async () => await actions.goToStep('step3') },
              'Go 3'
            ),
          ]);
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config });
        return () => h(Consumer);
      },
    });

    const wrapper = mount(Provider);
    await nextTick();
    await nextTick();

    await wrapper.find('[data-testid="goto-2"]').trigger('click');
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();

    // History includes initial step1 and navigated step2
    const history = wrapper.find('[data-testid="history"]').text();
    expect(history).toContain('step1');
    expect(history).toContain('step2');

    await wrapper.find('[data-testid="goto-3"]').trigger('click');
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();

    const finalHistory = wrapper.find('[data-testid="history"]').text();
    expect(finalHistory).toContain('step1');
    expect(finalHistory).toContain('step2');
    expect(finalHistory).toContain('step3');
  });

  it.skip('should toggle isBusy during async conditions', async () => {
    let resolveCondition: (val: boolean) => void = () => {};
    const config: IWizardConfig<TestSchema, StepId> = {
      steps: [
        { id: 'step1', label: 'Step 1' },
        {
          id: 'step2',
          label: 'Step 2',
          condition: () =>
            new Promise((resolve) => {
              resolveCondition = resolve;
            }),
        },
      ],
    };

    const Consumer = defineComponent({
      setup() {
        const state = factory.useWizardState();
        return () => h('div', { 'data-testid': 'is-busy' }, String(state.value.isBusy));
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config });
        return () => h(Consumer);
      },
    });

    const wrapper = mount(Provider);

    // Give time for the provider to initialize and start the async condition check
    await new Promise((r) => setTimeout(r, 10));
    await nextTick();

    // During async check it should be busy
    expect(wrapper.find('[data-testid="is-busy"]').text()).toBe('true');

    // Resolve the condition
    resolveCondition(true);
    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="is-busy"]').text()).toBe('false');
  });

  it('should correctly find errors using useWizardError with prefixed paths', async () => {
    const config: IWizardConfig<TestSchema, StepId> = {
      steps: [
        {
          id: 'security',
          label: 'Security',
          validationAdapter: {
            validate: async () => ({
              isValid: false,
              errors: { 'security.password': 'min length 6' },
            }),
          },
        },
      ],
    };

    const Consumer = defineComponent({
      setup() {
        const error = factory.useWizardError('security.password');
        const actions = factory.useWizardActions();
        return () =>
          h('div', [
            h('div', { 'data-testid': 'error' }, error.value || 'NO_ERROR'),
            h(
              'button',
              {
                'data-testid': 'validate-btn',
                onClick: async () => await actions.validateStep('security'),
              },
              'Validate'
            ),
          ]);
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config });
        return () => h(Consumer);
      },
    });

    const wrapper = mount(Provider);
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="error"]').text()).toBe('NO_ERROR');

    await wrapper.find('[data-testid="validate-btn"]').trigger('click');
    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="error"]').text()).toBe('min length 6');
  });

  it('should setData and read data correctly for nested paths', async () => {
    const config: IWizardConfig<TestSchema, StepId> = {
      steps: [{ id: 'step1', label: 'Step 1' }],
    };

    const Consumer = defineComponent({
      setup() {
        const state = factory.useWizardState();
        const actions = factory.useWizardActions();
        return () =>
          h('div', [
            h('div', { 'data-testid': 'city' }, state.value.data?.user?.address?.city || 'EMPTY'),
            h(
              'button',
              {
                'data-testid': 'set-city',
                onClick: () => actions.setData('user.address.city', 'New York'),
              },
              'Set City'
            ),
          ]);
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config });
        return () => h(Consumer);
      },
    });

    const wrapper = mount(Provider);
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="city"]').text()).toBe('EMPTY');

    await wrapper.find('[data-testid="set-city"]').trigger('click');
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="city"]').text()).toBe('New York');
  });

  it('should handle useWizardSelector for derived state', async () => {
    const config: IWizardConfig<TestSchema, StepId> = {
      steps: [
        { id: 'step1', label: 'Step 1' },
        { id: 'step2', label: 'Step 2' },
      ],
    };

    const Consumer = defineComponent({
      setup() {
        const isStep2 = factory.useWizardSelector((state) => state.currentStepId === 'step2');
        const actions = factory.useWizardActions();
        return () =>
          h('div', [
            h('div', { 'data-testid': 'is-step2' }, String(isStep2.value)),
            h(
              'button',
              {
                'data-testid': 'next-btn',
                onClick: async () => await actions.nextStep({ validate: false }),
              },
              'Next'
            ),
          ]);
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config });
        return () => h(Consumer);
      },
    });

    const wrapper = mount(Provider);
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="is-step2"]').text()).toBe('false');

    await wrapper.find('[data-testid="next-btn"]').trigger('click');
    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.find('[data-testid="is-step2"]').text()).toBe('true');
  });
});
