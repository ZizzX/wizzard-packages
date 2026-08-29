import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, onMounted, onUpdated } from 'vue';

import {
  describeBindingContract,
  type BindingHarness,
  type Probe,
} from '../../../../contract/binding-suite';
import { provideWizard, useErrors, useField, useNavigation, useStep } from './index';

let renders = 0;

/** Renders exactly the test ids the contract suite reads, and nothing else. */
const ProbeComponent = defineComponent({
  setup() {
    // The same measurement as the React probe: count commits from the
    // framework's own post-render hooks, never from inside render.
    onMounted(() => {
      renders += 1;
    });
    onUpdated(() => {
      renders += 1;
    });

    const step = useStep();
    const nav = useNavigation();
    const errors = useErrors();
    const name = useField<string>('name');

    return () =>
      h('div', [
        h('span', { 'data-testid': 'step' }, step.current.value ?? ''),
        h('span', { 'data-testid': 'progress' }, String(step.progress.value)),
        h('span', { 'data-testid': 'can-back' }, nav.canBack.value ? 'yes' : 'no'),
        h(
          'span',
          { 'data-testid': 'errors' },
          Object.entries(errors.value)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ')
        ),
        h('span', { 'data-testid': 'name-value' }, name.value ?? ''),
        h('input', {
          'data-testid': 'name-input',
          value: name.value ?? '',
          onInput: (event: Event) => {
            name.value = (event.target as HTMLInputElement).value;
          },
        }),
        h('button', { 'data-testid': 'next', onClick: () => void nav.next() }, 'next'),
        h('button', { 'data-testid': 'back', onClick: () => void nav.back() }, 'back'),
      ]);
  },
});

const harness: BindingHarness = {
  name: 'vue',
  mount: async ({ flow, registry, data }) => {
    const Root = defineComponent({
      setup() {
        provideWizard({ flow, registry, data });
        return () => h(ProbeComponent);
      },
    });

    renders = 0;
    const wrapper = mount(Root, { attachTo: document.body });
    const find = (testId: string) => wrapper.get(`[data-testid="${testId}"]`);

    /** Two ticks: one for the engine commit, one for the render it triggers. */
    const settle = async (): Promise<void> => {
      await nextTick();
      await nextTick();
    };

    const probe: Probe = {
      text: (testId) => find(testId).text(),
      click: async (testId) => {
        await find(testId).trigger('click');
        await settle();
      },
      fill: async (testId, value) => {
        await find(testId).setValue(value);
        await settle();
      },
      renders: () => renders,
      unmount: () => {
        wrapper.unmount();
      },
    };

    await settle();
    return probe;
  },
};

describeBindingContract(harness);
