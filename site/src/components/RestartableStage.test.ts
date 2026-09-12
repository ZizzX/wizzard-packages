/**
 * The Vue half of `restartable`. Same contract, different mechanism:
 * `onErrorCaptured` instead of a boundary class, a scoped slot instead of a
 * child element, so both need their own proof that Restart mounts the
 * application again rather than only clearing the message.
 */
import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import RestartableStage from './RestartableStage.vue';

/** Controlled from the test: the application is broken until it is not. */
const behaviour = { throwing: true };

const BrokenExample = defineComponent({
  name: 'BrokenExample',
  setup() {
    return () => {
      if (behaviour.throwing) throw new Error('the example exploded');
      return h('p', 'running');
    };
  },
});

const mountStage = () =>
  mount(RestartableStage, {
    slots: {
      default: (props: { attempt: number }) => h(BrokenExample, { key: props.attempt }),
    },
  });

describe('RestartableStage', () => {
  beforeEach(() => {
    behaviour.throwing = true;
    // Vue logs the captured error, and so does the stage. Both are expected.
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // The hook catches the child's render error and writes it to a ref, so the
  // message is on screen one tick later - the failed mount itself cannot draw
  // it. Asserting before that tick tests the empty frame in between.
  it('shows that the example stopped, with the reason and a way back', async () => {
    const stage = mountStage();
    await flushPromises();

    expect(stage.get('[role="alert"]').text()).toContain('This example stopped');
    expect(stage.text()).toContain('the example exploded');
    expect(stage.get('button').text()).toBe('Restart example');
  });

  it('mounts the application again when Restart is pressed', async () => {
    const stage = mountStage();
    await flushPromises();

    behaviour.throwing = false;
    await stage.get('button').trigger('click');
    await flushPromises();

    expect(stage.find('[role="alert"]').exists()).toBe(false);
    expect(stage.text()).toContain('running');
  });
});
