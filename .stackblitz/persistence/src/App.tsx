import { createWizardFactory, LocalStorageAdapter } from 'wizzard-stepper-react';
import { Save, RefreshCcw } from 'lucide-react';

const { 
  WizardProvider, 
  useWizardActions, 
  useWizardValue, 
  useWizardState 
} = createWizardFactory<{ note: string }>();

const StepNote = () => {
  const note = useWizardValue('note');
  const { setData } = useWizardActions();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Auto-save Demo</h2>
      <p className="text-sm text-gray-500">
        Type something and refresh the page. Your data stays here!
      </p>
      <textarea
        value={note || ''}
        onChange={(e) => setData('note', e.target.value)}
        className="w-full h-32 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Try typing something..."
      />
    </div>
  );
};

const MyWizard = () => {
  const { currentStepId } = useWizardState();
  const { reset } = useWizardActions();

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-neutral-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center text-blue-600">
            <Save className="mr-2 h-5 w-5" />
            <span className="font-semibold">Persistence</span>
          </div>
          <button 
            onClick={reset}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Clear Storage"
          >
            <RefreshCcw className="h-5 w-5" />
          </button>
        </div>

        {currentStepId === 'main' && <StepNote />}
      </div>
    </div>
  );
};

const config = {
  persistence: {
    adapter: new LocalStorageAdapter('persistence_demo_'),
    mode: 'onChange' as const,
    debounceTime: 500
  },
  steps: [{ id: 'main', label: 'Main' }]
};

export default function App() {
  return (
    <WizardProvider config={config}>
      <MyWizard />
    </WizardProvider>
  );
}
