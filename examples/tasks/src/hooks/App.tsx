import { WizardProvider } from '@wizzard-packages/react';

import { trip } from './flow';
import { registry } from './registry';
import { Steps } from './Steps';

/**
 * The provider takes the options of `createWizard`, builds the engine on first
 * render, starts it on mount and destroys it on unmount. Every hook below it
 * reads that engine; outside it they throw `provider-missing`.
 */
export function App() {
  return (
    <WizardProvider flow={trip} registry={registry}>
      <Steps />
    </WizardProvider>
  );
}
