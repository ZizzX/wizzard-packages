import { useSyncExternalStore } from 'react';
import { WizardStore, type IWizardConfig } from '@wizzard-packages/core';

type Data = { name: string };

type StepId = 'name' | 'review';

const config: IWizardConfig<Data, StepId> = {
  steps: [
    { id: 'name', label: 'Name', component: null },
    { id: 'review', label: 'Review', component: null },
  ],
};

const store = new WizardStore<Data, StepId>({ name: '' });

store.dispatch({
  type: 'INIT',
  payload: { data: { name: '' }, config },
});

const useWizardSnapshot = () =>
  useSyncExternalStore(store.subscribe, () => store.getSnapshot());

export default function App() {
  const snapshot = useWizardSnapshot();
  const data = snapshot.data;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-xl font-semibold">Core engine only</h2>
        <p className="text-sm text-gray-500">
          This example uses @wizzard-packages/core directly with a custom UI.
        </p>

        {snapshot.currentStepId === 'name' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              value={data.name || ''}
              onChange={(e) =>
                store.update({ ...data, name: e.target.value }, 'name')
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              placeholder="Type your name"
            />
          </div>
        )}

        {snapshot.currentStepId === 'review' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Review data:</p>
            <pre className="bg-gray-50 p-3 rounded-lg text-left text-xs text-gray-800">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={() => store.goToStep('name')}
            disabled={snapshot.currentStepId === 'name'}
            className="px-4 py-2 text-sm rounded-lg border text-gray-600 disabled:opacity-40"
          >
            Back
          </button>
          <button
            onClick={() => store.goToStep('review')}
            disabled={snapshot.currentStepId === 'review'}
            className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
