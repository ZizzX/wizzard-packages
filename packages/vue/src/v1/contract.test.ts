import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { computed, defineComponent, h, nextTick, onMounted, onUpdated, ref } from 'vue';

import {
  describeBindingContract,
  type BindingHarness,
  type Probe,
} from '../../../../contract/binding-suite';
import {
  provideWizard,
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
  useWizardSnapshot,
} from './index';

interface Passenger {
  id: string;
  name?: string;
}

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
    const refusal = ref('');
    const name = useField<string>('name');

    // The repeat-group probe, read entirely out of the engine - the same values
    // the React probe derives, from the same two places: the key off the stack,
    // and its position in the list the group repeats over.
    const wizard = useWizard();
    const snapshot = useWizardSnapshot();
    const items = computed(() => (snapshot.value.data.passengers as Passenger[] | undefined) ?? []);
    const itemKey = computed(
      () => [...snapshot.value.stack].reverse().find((frame) => frame.key !== undefined)?.key ?? ''
    );
    const itemIndex = computed(() =>
      itemKey.value === '' ? -1 : items.value.findIndex((p) => p.id === itemKey.value)
    );
    const itemName = computed(() =>
      itemIndex.value < 0 ? '' : (items.value[itemIndex.value]?.name ?? '')
    );

    return () =>
      h('div', [
        h('span', { 'data-testid': 'step' }, step.current.value ?? ''),
        h('span', { 'data-testid': 'progress' }, String(step.progress.value)),
        h('span', { 'data-testid': 'can-back' }, nav.canBack.value ? 'yes' : 'no'),
        h('span', { 'data-testid': 'busy' }, nav.isBusy.value ? 'yes' : 'no'),
        h(
          'span',
          { 'data-testid': 'errors' },
          Object.entries(errors.value)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ')
        ),
        h('span', { 'data-testid': 'refusal' }, refusal.value),
        h('span', { 'data-testid': 'name-value' }, name.value ?? ''),
        h('input', {
          'data-testid': 'name-input',
          value: name.value ?? '',
          onInput: (event: Event) => {
            name.value = (event.target as HTMLInputElement).value;
          },
        }),
        h(
          'button',
          {
            'data-testid': 'next',
            onClick: () =>
              void nav.next().then((result) => {
                if (!result.ok) refusal.value = `${result.code} ${result.url}`;
              }),
          },
          'next'
        ),
        h('button', { 'data-testid': 'back', onClick: () => void nav.back() }, 'back'),
        // A stepper's crumb, read off the breadcrumbs rather than named, so the
        // probe knows nothing about the flow it is mounted on.
        h(
          'button',
          {
            'data-testid': 'go-first',
            onClick: () => {
              const first = step.breadcrumbs.value[0];
              if (first === undefined) return;
              void nav.go(first.id).then((result) => {
                if (!result.ok) refusal.value = `${result.code} ${result.url}`;
              });
            },
          },
          'go first'
        ),

        h('span', { 'data-testid': 'item-key' }, itemKey.value),
        h(
          'span',
          { 'data-testid': 'item-index' },
          itemIndex.value < 0 ? '' : String(itemIndex.value)
        ),
        h('span', { 'data-testid': 'item-name' }, itemName.value),
        h('input', {
          'data-testid': 'item-input',
          value: itemName.value,
          onInput: (event: Event) => {
            if (itemIndex.value < 0) return;
            wizard.set(
              `passengers.${itemIndex.value}.name`,
              (event.target as HTMLInputElement).value
            );
          },
        }),
        h(
          'button',
          {
            'data-testid': 'add-item',
            onClick: () => {
              wizard.set('passengers', [...items.value, { id: `p${items.value.length + 1}` }]);
            },
          },
          'add'
        ),
        h(
          'button',
          {
            'data-testid': 'remove-item',
            onClick: () => {
              wizard.set('passengers', items.value.slice(1));
            },
          },
          'remove'
        ),
      ]);
  },
});

const harness: BindingHarness = {
  name: 'vue',
  outsideProvider: () => {
    const Bare = defineComponent({
      setup() {
        useWizard();
        return () => h('span');
      },
    });
    // With no app error handler Vue rethrows a setup error out of mount, and
    // warns about it first; the test asserts on the error, so the warning is noise.
    const quiet = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    try {
      mount(Bare).unmount();
      return undefined;
    } catch (error) {
      return error;
    } finally {
      quiet.mockRestore();
    }
  },
  mount: async ({ flow, registry, data, groups, subFlows }) => {
    const Root = defineComponent({
      setup() {
        provideWizard({ flow, registry, data, groups, subFlows });
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
