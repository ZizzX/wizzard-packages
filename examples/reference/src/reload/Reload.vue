<script setup lang="ts">
import type { RestoreOutcome } from '@wizzard-packages/plugins/persist';
import {
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
  useWizardSelector,
} from '@wizzard-packages/vue/v1';
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';

import { STORAGE_KEY } from './flow';
import { describeRestore, simulateUpgrade } from './outcome';
import { TAKEN } from './registry';

/**
 * R-B on the Vue binding. The same application as `App.tsx`, message for
 * message, with `onMounted` where the other has an effect.
 *
 * `busy` is read off the engine, never tracked here: it is true from the moment
 * `next()` starts until the validator answers, which is what disables the
 * button and what "Checking" is spelled from.
 */
const props = defineProps<{ restored: { outcome: RestoreOutcome | null } }>();

const LABELS: Record<string, string> = {
  account: 'Your account',
  workspace: 'Name your workspace',
  confirm: 'Confirm',
};

const wizard = useWizard();
const { current, active, isLast } = useStep();
const { back, canBack, isBusy } = useNavigation();
const errors = useErrors();

const email = useField<string>('account.email');
const name = useField<string>('workspace.name');
const status = useWizardSelector((s) => s.status);

const mounted = ref(false);
const outcome = ref<RestoreOutcome | null>(null);
const announcement = ref('');
const ended = ref(false);
const heading = useTemplateRef<HTMLHeadingElement>('heading');

onMounted(() => {
  mounted.value = true;
  outcome.value = props.restored.outcome;
});

// Until mount, this is the frame the server sent: the step the flow is about to
// enter, with the controls saying they are not ready.
const standing = computed(() =>
  mounted.value ? (current.value ?? active.value[0] ?? 'account') : 'account'
);
const starting = computed(() => !mounted.value || current.value === null);
const restoreLine = computed(() => describeRestore(mounted.value ? outcome.value : null));
const hint = computed(
  () => `Checked against the service when you continue. ${TAKEN.join(', ')} are taken.`
);

let moved = false;
watch(current, (to) => {
  if (to === null || !mounted.value) return;
  if (!moved) {
    moved = true;
    return;
  }
  heading.value?.focus();
  const at = active.value.indexOf(to) + 1;
  announcement.value = `${LABELS[to] ?? to}. Step ${at} of ${active.value.length}.`;
});

async function onNext(): Promise<void> {
  if (ended.value) {
    ended.value = false;
    announcement.value = '';
    wizard.reset();
    await wizard.start();
    return;
  }
  const result = await wizard.next();
  if (result.ok) {
    if (result.to === '@end') {
      ended.value = true;
      announcement.value = 'Finished.';
    }
    return;
  }
  if (result.reason === 'superseded' || result.reason === 'aborted') return;
  const fields = Object.values(result.errors ?? {});
  announcement.value =
    fields.length === 0 ? `That move was refused: ${result.reason}.` : fields.join(' ');
}

/**
 * Back while a check is in flight. `cancel()` aborts the navigation, so the
 * answer that arrives later belongs to an epoch that has passed and is
 * discarded; the move backwards is a new one and wins.
 */
async function onBack(): Promise<void> {
  wizard.cancel();
  await back();
}
</script>

<template>
  <div class="app">
    <p class="app-restore" role="status" aria-live="polite">{{ restoreLine }}</p>

    <template v-if="ended">
      <h2 ref="heading" tabindex="-1">Done</h2>
      <p>
        The session is still saved: reload and you come back to this. Start again replaces it with
        an empty one, because that is a commit like any other.
      </p>
      <div class="actions">
        <button class="button button-accent" type="button" @click="onNext()">Start again</button>
      </div>
    </template>

    <form v-else @submit.prevent="onNext()">
      <h2 ref="heading" tabindex="-1">{{ LABELS[standing] ?? standing }}</h2>

      <div v-if="standing === 'account'" class="field">
        <label class="field-label" for="reload-email">Email</label>
        <input
          id="reload-email"
          :value="mounted ? (email ?? '') : ''"
          type="email"
          autocomplete="email"
          :aria-invalid="errors['email'] ? true : undefined"
          :aria-describedby="errors['email'] ? 'reload-email-error' : undefined"
          @input="email = ($event.target as HTMLInputElement).value"
        />
        <span v-if="errors['email']" id="reload-email-error" class="field-error">
          {{ errors['email'] }}
        </span>
      </div>

      <div v-else-if="standing === 'workspace'" class="field">
        <label class="field-label" for="reload-name">Workspace name</label>
        <input
          id="reload-name"
          :value="mounted ? (name ?? '') : ''"
          :aria-invalid="errors['name'] ? true : undefined"
          :aria-describedby="
            errors['name'] ? 'reload-name-hint reload-name-error' : 'reload-name-hint'
          "
          @input="name = ($event.target as HTMLInputElement).value"
        />
        <span id="reload-name-hint" class="field-hint">{{ hint }}</span>
        <span v-if="errors['name']" id="reload-name-error" class="field-error">
          {{ errors['name'] }}
        </span>
      </div>

      <p v-else-if="standing === 'confirm'">
        Reload the page now and you come back to this step, with both answers still in it. What was
        stored is the durable snapshot, so nothing that described a moment - a navigation in flight,
        a validator's errors - came back with it.
      </p>

      <div class="actions">
        <button class="button button-accent" type="submit" :disabled="starting || isBusy">
          {{ isBusy ? 'Checking…' : isLast ? 'Finish' : 'Next' }}
        </button>
        <button
          class="button button-secondary"
          type="button"
          :disabled="starting || !canBack"
          @click="onBack()"
        >
          Back
        </button>
      </div>
    </form>

    <dl class="app-state">
      <dt>status</dt>
      <dd>{{ starting ? 'init' : status }}</dd>
      <dt>saved</dt>
      <dd>{{ STORAGE_KEY }}</dd>
    </dl>

    <p class="app-note">
      <button
        class="button button-secondary"
        type="button"
        :disabled="!mounted"
        @click="simulateUpgrade()"
      >
        Ship version 2 and reload
      </button>
      <span>
        Ages the saved session by one version and reloads, which is what everyone with a form open
        meets on the day an application changes what it collects.
      </span>
    </p>

    <p class="app-live" role="status" aria-live="polite">{{ announcement }}</p>
  </div>
</template>
