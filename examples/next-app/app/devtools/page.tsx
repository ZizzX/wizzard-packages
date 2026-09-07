'use client';

import { useState } from 'react';
import { defineFlow, step } from '@wizzard-packages/core/v1';
import type { AsyncRegistry } from '@wizzard-packages/core/v1';
import { devtools, WizardDevtools } from '@wizzard-packages/devtools';
import {
  useErrors,
  useField,
  useNavigation,
  useStep,
  WizardProvider,
} from '@wizzard-packages/react/v1';

// The consumer proof for devtools: a page that can refuse a move, so the panel
// has a refusal to report.
//
// This route is a client component, unlike `/`. A plugin and a registry are
// functions, and a server component cannot hand functions to a client one, so
// the wizard that carries them has to be created on this side of the boundary.
// `/` stays a server component and keeps proving the `'use client'` directive
// survives the package build.

const signup = defineFlow({
  id: 'signup-diagnosis',
  order: ['name', 'review'],
  steps: {
    name: step<{ full: string }>({ label: 'Your name', validate: { $ref: 'nameFilled' } }),
    review: step({ label: 'Review' }),
  },
});

const registry: AsyncRegistry = {
  nameFilled: (_args, scope) => {
    const full = (scope.data as { name?: { full?: string } }).name?.full;
    return full?.trim() ? null : { full: 'Your name is required' };
  },
};

function Steps() {
  const { current, isLast } = useStep();
  const { next, back, canBack } = useNavigation();
  const [full, setFull] = useField<string>('name.full');
  const errors = useErrors();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {current === 'name' && (
        <label>
          Your name
          <input value={full ?? ''} onChange={(e) => setFull(e.target.value)} />
          {errors.full && <span role="alert">{errors.full}</span>}
        </label>
      )}
      {current === 'review' && <p>Hello, {full || 'stranger'}.</p>}

      <button type="button" onClick={() => back()} disabled={!canBack}>
        Back
      </button>
      <button type="button" onClick={() => next()} disabled={isLast}>
        Next
      </button>
    </form>
  );
}

export default function Page() {
  // Created once, and the same object goes to both the engine and the panel:
  // the plugin is the only part of devtools the engine has to be told about.
  const [plugin] = useState(() => devtools());

  return (
    <WizardProvider flow={signup} registry={registry} plugins={[plugin]}>
      <Steps />
      <WizardDevtools plugin={plugin} />
    </WizardProvider>
  );
}
