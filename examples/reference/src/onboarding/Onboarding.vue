<script setup lang="ts">
import {
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
  useWizardSelector,
} from '@wizzard-packages/vue/v1';
import { computed, ref, useTemplateRef, watch } from 'vue';

/**
 * R-A on the Vue binding.
 *
 * The same application as `App.tsx`, step for step and message for message: the
 * two files exist so that a reader can put them side by side and see that the
 * engine, the route and the validation are the same object, and only the
 * rendering differs.
 *
 * Accessibility is by hand for the same reason it is in the React file - the
 * bindings supply no ARIA in 1.0, and these two are what that contract will be
 * written from.
 */
const LABELS: Record<string, string> = {
  details: 'Your details',
  verify: 'Verify your email',
  company: 'Company details',
  payment: 'Payment',
  review: 'Review',
};

const wizard = useWizard();
const { current, active, isLast } = useStep();
const { back, canBack, isBusy } = useNavigation();
const errors = useErrors();

const email = useField<string>('details.email');
const payer = useField<string>('details.payer');
const code = useField<string>('verify.code');
const company = useField<string>('company.name');
const vat = useField<string>('company.vat');
const card = useField<string>('payment.card');

const returning = useWizardSelector((s) => s.ctx['returning'] === true);
const completed = useWizardSelector((s) => s.completed);
const dirty = useWizardSelector((s) => s.dirty);
const data = useWizardSelector((s) => s.data);

const announcement = ref('');
const ended = ref(false);
const heading = useTemplateRef<HTMLHeadingElement>('heading');

// Before `start` has run - on the server, and for the first paint - there is no
// current step, so the form draws the step the flow is about to enter and says
// so, instead of a spinner over an empty box.
const standing = computed(() => current.value ?? active.value[0] ?? 'details');
const starting = computed(() => current.value === null);

/**
 * What the flow submits: the slices of the steps that are on the route.
 *
 * A branch the visitor walked away from keeps its answers - the engine clears
 * nothing when a `when` goes false - and it is the application that decides
 * those answers are not part of this submission. `verify` is missing for the
 * other reason: `clearOnLeave` dropped it the moment the step was left.
 */
const submission = computed(() => {
  const out: Record<string, unknown> = {};
  for (const id of active.value) {
    if (data.value[id] !== undefined) out[id] = data.value[id];
  }
  return out;
});

// Focus follows the flow, but only once the visitor has moved: taking focus on
// the first paint would drag a reader who was still reading the page above.
let moved = false;
watch(current, (to) => {
  if (to === null) return;
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
    // `reset` keeps `ctx` - it is the host's, not the run's - so the fast path
    // has to be put back by hand, or starting again silently takes it.
    wizard.setCtx({ returning: false });
    wizard.reset();
    await wizard.start();
    return;
  }
  const result = await wizard.next();
  if (result.ok) {
    if (result.to === '@end') {
      ended.value = true;
      announcement.value = 'Onboarding complete.';
    }
    return;
  }
  // A refusal is the one thing the live region must carry: the fields below
  // show it too, but a screen reader is not looking at them.
  const fields = Object.values(result.errors ?? {});
  announcement.value =
    fields.length === 0 ? `That move was refused: ${result.reason}.` : fields.join(' ');
}
</script>

<template>
  <div v-if="ended" class="app">
    <h2 ref="heading" tabindex="-1">Done</h2>
    <p>The submission is what the flow collected, and nothing else.</p>
    <pre class="app-data">{{ JSON.stringify(submission, null, 2) }}</pre>
    <div class="actions">
      <button class="button button-accent" type="button" @click="onNext()">Start again</button>
    </div>
    <p class="app-live" role="status" aria-live="polite">{{ announcement }}</p>
  </div>

  <form v-else class="app" @submit.prevent="onNext()">
    <h2 ref="heading" tabindex="-1">{{ LABELS[standing] ?? standing }}</h2>

    <template v-if="standing === 'details'">
      <!--
        The label is a `for`/`id` pair rather than a wrapper, and the hint and
        the error are named by `aria-describedby`: that keeps the accessible
        name of the input to the label alone, while a screen reader still reads
        the refusal with the field it belongs to.
      -->
      <div class="field">
        <label class="field-label" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          :aria-invalid="errors['email'] ? true : undefined"
          :aria-describedby="errors['email'] ? 'email-error' : undefined"
        />
        <span v-if="errors['email']" id="email-error" class="field-error">
          {{ errors['email'] }}
        </span>
      </div>
      <fieldset class="field">
        <legend class="field-label">Who is paying</legend>
        <div class="segmented">
          <button
            v-for="choice in ['personal', 'business']"
            :key="choice"
            type="button"
            :aria-pressed="payer === choice"
            @click="payer = choice"
          >
            {{ choice === 'personal' ? 'Personal' : 'Business' }}
          </button>
        </div>
        <p v-if="errors['payer']" class="field-error">{{ errors['payer'] }}</p>
      </fieldset>
    </template>

    <template v-else-if="standing === 'verify'">
      <div class="field">
        <label class="field-label" for="code">Six-digit code</label>
        <input
          id="code"
          v-model="code"
          inputmode="numeric"
          autocomplete="one-time-code"
          :aria-invalid="errors['code'] ? true : undefined"
          :aria-describedby="errors['code'] ? 'code-hint code-error' : 'code-hint'"
        />
        <span id="code-hint" class="field-hint">Any six digits will do here.</span>
        <span v-if="errors['code']" id="code-error" class="field-error">{{ errors['code'] }}</span>
      </div>
      <label class="check">
        <input
          type="checkbox"
          :checked="returning"
          @change="wizard.setCtx({ returning: ($event.target as HTMLInputElement).checked })"
        />
        I already have an account
      </label>
    </template>

    <template v-else-if="standing === 'company'">
      <div class="field">
        <label class="field-label" for="company-name">Company name</label>
        <input
          id="company-name"
          v-model="company"
          :aria-invalid="errors['name'] ? true : undefined"
          :aria-describedby="errors['name'] ? 'company-name-error' : undefined"
        />
        <span v-if="errors['name']" id="company-name-error" class="field-error">
          {{ errors['name'] }}
        </span>
      </div>
      <div class="field">
        <label class="field-label" for="vat">VAT number</label>
        <input
          id="vat"
          v-model="vat"
          :aria-invalid="errors['vat'] ? true : undefined"
          :aria-describedby="errors['vat'] ? 'vat-error' : undefined"
        />
        <span v-if="errors['vat']" id="vat-error" class="field-error">{{ errors['vat'] }}</span>
      </div>
    </template>

    <div v-else-if="standing === 'payment'" class="field">
      <label class="field-label" for="card">Card number</label>
      <input
        id="card"
        v-model="card"
        inputmode="numeric"
        autocomplete="cc-number"
        :aria-invalid="errors['card'] ? true : undefined"
        :aria-describedby="errors['card'] ? 'card-hint card-error' : 'card-hint'"
      />
      <span id="card-hint" class="field-hint">Sixteen digits, spaces allowed.</span>
      <span v-if="errors['card']" id="card-error" class="field-error">{{ errors['card'] }}</span>
    </div>

    <template v-else-if="standing === 'review'">
      <p>This is what the flow will submit.</p>
      <pre class="app-data">{{ JSON.stringify(submission, null, 2) }}</pre>
    </template>

    <div class="actions">
      <button class="button button-accent" type="submit" :disabled="starting || isBusy">
        {{ isLast ? 'Submit' : 'Next' }}
      </button>
      <button
        class="button button-secondary"
        type="button"
        :disabled="starting || !canBack || isBusy"
        @click="back()"
      >
        Back
      </button>
    </div>

    <dl class="app-state">
      <dt>route</dt>
      <dd>{{ active.join(' → ') }}</dd>
      <dt>completed</dt>
      <dd>{{ completed.length === 0 ? 'none' : completed.join(', ') }}</dd>
      <dt>edited</dt>
      <dd>{{ dirty.length === 0 ? 'none' : dirty.join(', ') }}</dd>
    </dl>

    <p class="app-live" role="status" aria-live="polite">
      {{ starting ? 'Starting.' : announcement }}
    </p>
  </form>
</template>
