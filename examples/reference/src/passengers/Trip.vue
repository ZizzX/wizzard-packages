<script setup lang="ts">
import { useNavigation, useStep, useWizard, useWizardSelector } from '@wizzard-packages/vue/v1';
import { computed, ref, useTemplateRef, watch } from 'vue';

import { answerPath, initialData } from './flow';
import {
  answersOf,
  goToPassenger,
  keyOf,
  listOf,
  nextId,
  withoutAnswers,
  type Passenger,
} from './party';

/**
 * R-C on the Vue binding. The same application as `App.tsx`: the rendering
 * draws the list, one passenger's question, or the review, and the engine
 * decides which. It never counts passengers to work out where it is - the frame
 * carries the key, and everything on screen is read from that.
 */
const SEATS = ['Window', 'Aisle'];
const MEALS = ['Standard', 'Vegetarian', 'None'];

const wizard = useWizard();
const { current, active, index } = useStep();
const { back, canBack, isBusy } = useNavigation();

const data = useWizardSelector((s) => s.data);
const stack = useWizardSelector((s) => s.stack);

const announcement = ref('');
const heading = useTemplateRef<HTMLHeadingElement>('heading');

const list = computed(() => listOf(data.value));
const itemKey = computed(() => keyOf(stack.value));
const at = computed(() =>
  itemKey.value === null ? -1 : list.value.findIndex((p) => p.id === itemKey.value)
);
const standing = computed(() => current.value ?? active.value[0] ?? 'party');
// Reaching the end does not move the wizard: it stays on the last step and says
// `to: '@end'`. What changed is `status`.
//
// `status` and not `completed`: a forward `go` marks the step it left as
// completed, and Edit jumps away from Review, so `completed` would call the trip
// booked the moment somebody went back to change a seat. Nothing here is
// persisted, so `status` - which `toSnapshot` does not carry - is exactly right
// for this application and wrong for the one that reloads.
const finished = useWizardSelector((s) => s.status === 'done');

watch(current, (to) => {
  if (to === null) return;
  heading.value?.focus();
});

const answersFor = (id: string): { seat?: string; meal?: string } =>
  answersOf(data.value)[id] ?? {};

const nameOf = (id: string): string => list.value.find((p) => p.id === id)?.name ?? '';

const choose = (field: 'seat' | 'meal', value: string): void => {
  if (itemKey.value === null) return;
  wizard.set(answerPath(itemKey.value, field), value);
};

const chosen = (field: 'seat' | 'meal'): string | undefined =>
  itemKey.value === null ? undefined : answersFor(itemKey.value)[field];

const addPassenger = (): void => {
  wizard.set('passengers', [
    ...list.value,
    { id: nextId(list.value, answersOf(data.value)), name: '' },
  ]);
  announcement.value = `Passenger ${list.value.length} added.`;
};

const removePassenger = (id: string): void => {
  // Their answers go with them, in one commit: a key is a data path, and
  // leaving `answers.p3` behind is how the next passenger to be given that key
  // would inherit somebody else's seat.
  wizard.batch(() => {
    wizard.set(
      'passengers',
      list.value.filter((p: Passenger) => p.id !== id)
    );
    wizard.set('answers', withoutAnswers(data.value, id));
  });
  announcement.value = `Passenger removed. ${list.value.length} left.`;
};

const rename = (id: string, name: string): void => {
  wizard.set(
    'passengers',
    list.value.map((p: Passenger) => (p.id === id ? { ...p, name } : p))
  );
};

async function onNext(): Promise<void> {
  const result = await wizard.next();
  if (result.ok) {
    if (result.to === '@end') announcement.value = 'Booked.';
    return;
  }
  announcement.value = `That move was refused: ${result.reason}.`;
}

async function startAgain(): Promise<void> {
  announcement.value = '';
  wizard.reset(initialData());
  await wizard.start();
}

async function edit(id: string): Promise<void> {
  const reached = await goToPassenger(wizard, id);
  announcement.value = reached ? `Editing ${nameOf(id)}.` : `Could not reach ${nameOf(id)}.`;
}

const printFrame = (frame: { flow: string; step: string; key?: string }): string =>
  frame.key === undefined
    ? `${frame.flow}.${frame.step}`
    : `${frame.flow}.${frame.step}[${frame.key}]`;
</script>

<template>
  <div class="app">
    <template v-if="standing === 'party'">
      <h2 ref="heading" tabindex="-1">Who is travelling</h2>
      <p>
        Each passenger answers the same two questions. The definition says so once; the engine runs
        the block as many times as there are people in this list.
      </p>

      <ul class="party">
        <li v-for="(person, position) in list" :key="person.id">
          <label class="field">
            <span class="field-label">Passenger {{ position + 1 }}</span>
            <input
              :value="person.name"
              placeholder="Name"
              @input="rename(person.id, ($event.target as HTMLInputElement).value)"
            />
          </label>
          <button class="button button-secondary" type="button" @click="removePassenger(person.id)">
            Remove
          </button>
        </li>
      </ul>

      <div class="actions">
        <button class="button button-secondary" type="button" @click="addPassenger">
          Add a passenger
        </button>
      </div>
    </template>

    <template v-else-if="(standing === 'seat' || standing === 'meal') && itemKey !== null">
      <p class="app-where">
        Passenger {{ at + 1 }} of {{ list.length
        }}{{ nameOf(itemKey) === '' ? '' : `, ${nameOf(itemKey)}` }} &mdash; step {{ index + 1 }} of
        {{ active.length }}
      </p>
      <h2 ref="heading" tabindex="-1">{{ standing === 'seat' ? 'Seat' : 'Meal' }}</h2>

      <fieldset class="field">
        <legend class="field-label">
          {{ standing === 'seat' ? 'Where would they sit' : 'What would they eat' }}
        </legend>
        <div class="segmented">
          <button
            v-for="option in standing === 'seat' ? SEATS : MEALS"
            :key="option"
            type="button"
            :aria-pressed="chosen(standing) === option"
            @click="choose(standing, option)"
          >
            {{ option }}
          </button>
        </div>
      </fieldset>
    </template>

    <template v-else-if="standing === 'review'">
      <h2 ref="heading" tabindex="-1">Review</h2>
      <table class="party-review">
        <thead>
          <tr>
            <th scope="col">Passenger</th>
            <th scope="col">Seat</th>
            <th scope="col">Meal</th>
            <th scope="col"><span class="visually-hidden">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, position) in list" :key="person.id">
            <th scope="row">
              {{ person.name === '' ? `Passenger ${position + 1}` : person.name }}
            </th>
            <td>{{ answersFor(person.id).seat ?? 'not chosen' }}</td>
            <td>{{ answersFor(person.id).meal ?? 'not chosen' }}</td>
            <td>
              <button class="button button-secondary" type="button" @click="edit(person.id)">
                Edit {{ person.name === '' ? `passenger ${position + 1}` : person.name }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="finished">Booked. Nothing below moves until this one starts again.</p>

      <div v-else class="actions">
        <button class="button button-secondary" type="button" @click="wizard.go('party')">
          Change who is travelling
        </button>
      </div>
    </template>

    <div class="actions">
      <button v-if="finished" class="button button-accent" type="button" @click="startAgain()">
        Start again
      </button>
      <template v-else>
        <button
          class="button button-accent"
          type="button"
          :disabled="current === null || isBusy"
          @click="onNext()"
        >
          {{ standing === 'review' ? 'Book the trip' : 'Next' }}
        </button>
        <button
          class="button button-secondary"
          type="button"
          :disabled="current === null || !canBack || isBusy"
          @click="back()"
        >
          Back
        </button>
      </template>
    </div>

    <dl class="app-state">
      <dt>stack</dt>
      <dd>{{ stack.map(printFrame).join(' / ') || 'not started' }}</dd>
      <dt>passengers</dt>
      <dd>{{ list.length === 0 ? 'none' : list.map((p: Passenger) => p.id).join(', ') }}</dd>
    </dl>

    <p class="app-live" role="status" aria-live="polite">
      {{ current === null ? 'Starting.' : announcement }}
    </p>
  </div>
</template>
