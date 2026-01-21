import { describe, expect, it, vi } from 'vitest';
import { defineComponent, h, onMounted, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { createWizardFactory } from './index';
import type { IWizardConfig } from '@wizzard-packages/core';

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

const factory = createWizardFactory<TestSchema>();

describe('Vue Wizard Selector Flexibility & Performance', () => {
  const config: IWizardConfig<TestSchema> = {
    steps: [{ id: 'step1', label: 'Step 1' }],
  };

  const initialData: TestSchema = {
    user: { name: 'Alice', age: 25, email: 'alice@example.com' },
    settings: { theme: 'light', notifications: true },
  };

  it('should avoid re-renders when irrelevant data changes using useWizardSelector', async () => {
    const SelectorConsumer = defineComponent({
      setup() {
        const userInfo = factory.useWizardSelector((state) => ({
          name: state.data.user.name,
          age: state.data.user.age,
        }));

        return () =>
          h('div', [
            h('div', { 'data-testid': 'user-name' }, userInfo.value.name),
            h('div', { 'data-testid': 'user-age' }, String(userInfo.value.age)),
          ]);
      },
    });

    const ActionsConsumer = defineComponent({
      setup() {
        const actions = factory.useWizardActions();
        return () =>
          h(
            'button',
            {
              'data-testid': 'update-settings-btn',
              onClick: () => actions.setData('settings.theme', 'dark'),
            },
            'Update Settings'
          );
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config, initialData });
        return () => h('div', [h(SelectorConsumer), h(ActionsConsumer)]);
      },
    });

    const wrapper = mount(Provider);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // Initial render
    expect(wrapper.find('[data-testid="user-name"]').text()).toBe('Alice');
    expect(wrapper.find('[data-testid="user-age"]').text()).toBe('25');

    // Update irrelevant data (settings.theme)
    await wrapper.find('[data-testid="update-settings-btn"]').trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // Selector should still return correct values even after irrelevant data changes
    expect(wrapper.find('[data-testid="user-name"]').text()).toBe('Alice');
    expect(wrapper.find('[data-testid="user-age"]').text()).toBe('25');
  });

  it('should update when selected data changes', async () => {
    const SelectorConsumer = defineComponent({
      setup() {
        const userName = factory.useWizardSelector((state) => state.data.user.name);
        return () => h('div', { 'data-testid': 'user-name' }, userName.value);
      },
    });

    const ActionsConsumer = defineComponent({
      setup() {
        const actions = factory.useWizardActions();
        return () =>
          h(
            'button',
            {
              'data-testid': 'update-name-btn',
              onClick: () => actions.setData('user.name', 'Bob'),
            },
            'Update Name'
          );
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config, initialData });
        return () => h('div', [h(SelectorConsumer), h(ActionsConsumer)]);
      },
    });

    const wrapper = mount(Provider);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-testid="user-name"]').text()).toBe('Alice');

    await wrapper.find('[data-testid="update-name-btn"]').trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-testid="user-name"]').text()).toBe('Bob');
  });

  it('should handle complex selectors with multiple derived values', async () => {
    const ComplexSelector = defineComponent({
      setup() {
        const derived = factory.useWizardSelector((state) => {
          const user = state.data.user;
          return {
            fullInfo: `${user.name} (${user.age})`,
            isAdult: user.age >= 18,
            hasEmail: !!user.email,
          };
        });
        return () =>
          h('div', [
            h('div', { 'data-testid': 'full-info' }, derived.value.fullInfo),
            h('div', { 'data-testid': 'is-adult' }, String(derived.value.isAdult)),
            h('div', { 'data-testid': 'has-email' }, String(derived.value.hasEmail)),
          ]);
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config, initialData });
        return () => h(ComplexSelector);
      },
    });

    const wrapper = mount(Provider);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-testid="full-info"]').text()).toBe('Alice (25)');
    expect(wrapper.find('[data-testid="is-adult"]').text()).toBe('true');
    expect(wrapper.find('[data-testid="has-email"]').text()).toBe('true');
  });

  it('should work with useWizardValue for specific paths', async () => {
    const ValueConsumer = defineComponent({
      setup() {
        const name = factory.useWizardValue('user.name');
        const age = factory.useWizardValue('user.age');
        const actions = factory.useWizardActions();

        return () =>
          h('div', [
            h('div', { 'data-testid': 'name' }, name.value),
            h('div', { 'data-testid': 'age' }, String(age.value)),
            h(
              'button',
              {
                'data-testid': 'update-age-btn',
                onClick: () => actions.setData('user.age', 30),
              },
              'Update Age'
            ),
          ]);
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config, initialData });
        return () => h(ValueConsumer);
      },
    });

    const wrapper = mount(Provider);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-testid="name"]').text()).toBe('Alice');
    expect(wrapper.find('[data-testid="age"]').text()).toBe('25');

    await wrapper.find('[data-testid="update-age-btn"]').trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-testid="name"]').text()).toBe('Alice');
    expect(wrapper.find('[data-testid="age"]').text()).toBe('30');
  });

  it('should maintain referential equality for unchanged selector results', async () => {
    const results: any[] = [];

    const SelectorConsumer = defineComponent({
      setup() {
        const userInfo = factory.useWizardSelector((state) => ({
          name: state.data.user.name,
          age: state.data.user.age,
        }));

        // Track reference changes
        const previousRef = ref<any>(null);

        return () => {
          const current = userInfo.value;
          if (previousRef.value !== null && previousRef.value !== current) {
            results.push({ changed: true, value: current });
          } else if (previousRef.value === null) {
            results.push({ initial: true, value: current });
          }
          previousRef.value = current;

          return h('div', { 'data-testid': 'user-info' }, `${current.name}-${current.age}`);
        };
      },
    });

    const ActionsConsumer = defineComponent({
      setup() {
        const actions = factory.useWizardActions();
        return () =>
          h(
            'button',
            {
              'data-testid': 'update-theme-btn',
              onClick: () => actions.setData('settings.theme', 'dark'),
            },
            'Update Theme'
          );
      },
    });

    const Provider = defineComponent({
      setup() {
        factory.useProvideWizard({ config, initialData });
        return () => h('div', [h(SelectorConsumer), h(ActionsConsumer)]);
      },
    });

    const wrapper = mount(Provider);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-testid="user-info"]').text()).toBe('Alice-25');

    // Update theme (irrelevant to user selector)
    await wrapper.find('[data-testid="update-theme-btn"]').trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // The selector should maintain the same reference if the selected data hasn't changed
    expect(wrapper.find('[data-testid="user-info"]').text()).toBe('Alice-25');
  });
});
