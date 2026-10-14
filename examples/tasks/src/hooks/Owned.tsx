import { WizardProvider } from '@wizzard-packages/react';

import { Steps } from './Steps';
import { wizard } from './wizard';

/**
 * Given `wizard`, the provider takes no other options: they were given to
 * `createWizard` already, and passing them here throws
 * `provider-wizard-and-options`.
 */
export function Owned() {
  return (
    <WizardProvider wizard={wizard}>
      <Steps />
    </WizardProvider>
  );
}
