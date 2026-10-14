import { WizardProvider } from '@wizzard-packages/react';

import { Steps } from './Steps';
import { wizard } from './wizard';

/** Given `wizard`, the provider takes no other options: they were the engine's to take. */
export function Owned() {
  return (
    <WizardProvider wizard={wizard}>
      <Steps />
    </WizardProvider>
  );
}
