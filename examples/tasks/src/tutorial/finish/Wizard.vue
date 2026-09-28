<script lang="ts">
// A counter rather than Vue's `useId`, which arrived in 3.5: the binding
// supports 3.3, and this file is meant to be copied.
let made = 0;
</script>

<script setup lang="ts">
import {
  useErrors,
  useField,
  useNavigation,
  useStep,
  useWizard,
  useWizardSelector,
} from '@wizzard-packages/vue';
import { computed, onMounted } from 'vue';

import type { Guest } from '../07-plugin/flow';
import { talks } from '../07-plugin/registry';
import { nextGuestId, reloadAgenda, withoutGuest } from './guests';

const wizard = useWizard();
onMounted(() => {
  reloadAgenda(wizard);
});
const { current, status } = useStep();
const { next, back, canBack, isBusy, isLast } = useNavigation();
const errors = useErrors();
// One per mounted form: the React and Vue renderings share the page.
const id = `registration-${(made += 1)}`;

// Inside the group the stack carries the guest's key; outside it, nothing does.
const key = useWizardSelector((s) => s.stack.find((f) => f.key !== undefined)?.key ?? null);

const name = useField<string | undefined>('attendee.name');
const email = useField<string | undefined>('attendee.email');
const kind = useField<string | undefined>('ticket.kind');
const list = useField<Guest[] | undefined>('ticket.guests');
const company = useField<string | undefined>('company.name');
const picks = useField<string[] | undefined>('sessions.picks');

// `useField` takes a fixed path, and these two move with the guest.
const data = useWizardSelector((s) => s.data);
const answer = (field: 'badge' | 'diet') =>
  computed({
    get: () =>
      ((data.value['guests'] as Record<string, Record<string, string>> | undefined) ?? {})[
        key.value ?? ''
      ]?.[field] ?? '',
    set: (value: string) => {
      if (key.value !== null) wizard.set(`guests.${key.value}.${field}`, value);
    },
  });
const badge = answer('badge');
const diet = answer('diet');

const guests = computed(() => list.value ?? []);
const who = computed(() => guests.value.find((g) => g.id === key.value)?.name || 'the guest');

const rename = (guestId: string, value: string): void => {
  list.value = guests.value.map((g) => (g.id === guestId ? { ...g, name: value } : g));
};
const toggle = (talk: string, on: boolean): void => {
  const now = picks.value ?? [];
  picks.value = on ? [...now, talk] : now.filter((p) => p !== talk);
};
const startOver = (): void => {
  wizard.reset();
  void wizard.start();
};
</script>

<template>
  <section v-if="status === 'done'">
    <h3>You are registered</h3>
    <button type="button" @click="startOver">Start over</button>
  </section>

  <form v-else @submit.prevent="next()">
    <template v-if="current === 'attendee'">
      <p>
        <label :for="`${id}-name`">Name</label>
        <input :id="`${id}-name`" v-model="name" :aria-invalid="errors['name'] !== undefined" />
        <span v-if="errors['name'] !== undefined" role="alert">{{ errors['name'] }}</span>
      </p>
      <p>
        <label :for="`${id}-email`">Email</label>
        <input :id="`${id}-email`" v-model="email" :aria-invalid="errors['email'] !== undefined" />
        <span v-if="errors['email'] !== undefined" role="alert">{{ errors['email'] }}</span>
      </p>
    </template>

    <template v-else-if="current === 'ticket'">
      <fieldset>
        <legend>Ticket</legend>
        <label v-for="k in ['standard', 'business']" :key="k">
          <input v-model="kind" type="radio" :name="`${id}-kind`" :value="k" /> {{ k }}
        </label>
      </fieldset>
      <p v-for="(g, at) in guests" :key="g.id">
        <input
          :aria-label="`Guest ${at + 1}`"
          :value="g.name"
          @input="rename(g.id, ($event.target as HTMLInputElement).value)"
        />
        <button type="button" @click="withoutGuest(wizard, g.id)">Remove</button>
      </p>
      <button type="button" @click="list = [...guests, { id: nextGuestId(guests), name: '' }]">
        Add a guest
      </button>
    </template>

    <p v-else-if="current === 'company'">
      <label :for="`${id}-company`">Company</label>
      <input :id="`${id}-company`" v-model="company" />
    </p>

    <p v-else-if="current === 'badge'">
      <label :for="`${id}-badge`">Name on {{ who }}'s badge</label>
      <input :id="`${id}-badge`" v-model="badge" />
    </p>

    <p v-else-if="current === 'diet'">
      <label :for="`${id}-diet`">What does {{ who }} eat?</label>
      <select :id="`${id}-diet`" v-model="diet">
        <option value="">Anything</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
      </select>
    </p>

    <fieldset v-else-if="current === 'sessions'">
      <legend>Sessions</legend>
      <label v-for="talk in talks" :key="talk">
        <input
          type="checkbox"
          :checked="(picks ?? []).includes(talk)"
          @change="toggle(talk, ($event.target as HTMLInputElement).checked)"
        />
        {{ talk }}
      </label>
    </fieldset>

    <p v-else-if="current === 'review'">
      {{ name }} ({{ email }}), {{ kind ?? 'standard' }} ticket{{
        guests.length > 0 ? `, with ${guests.map((g) => g.name).join(', ')}` : ''
      }}.
    </p>

    <button type="button" :disabled="!canBack || isBusy" @click="back()">Back</button>
    <button type="submit" :disabled="current === null || isBusy">
      {{ isLast ? 'Register' : 'Next' }}
    </button>
  </form>
</template>
