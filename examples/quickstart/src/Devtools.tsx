import { createWizard } from '@wizzard-packages/core/v1';
import { WizardProvider } from '@wizzard-packages/react/v1';
import { WizardDevtools, devtools } from '@wizzard-packages/devtools';

import { signup } from './flow';
import { Wizard } from './App';

/**
 * The panel, wired the way the README's three steps describe it.
 *
 * Two things are easy to get wrong and both are here: the same `devtools()`
 * object goes to `createWizard` and to the panel - two instances leave the
 * refusal rows empty - and the container has a height, because the panel is
 * docked and fills what it is given rather than floating over the page.
 */
const dt = devtools();
const wizard = createWizard({ flow: signup, plugins: [dt] });

export function App(): React.ReactNode {
  return (
    <WizardProvider wizard={wizard}>
      <Wizard />
      <div style={{ height: 360 }}>
        <WizardDevtools plugin={dt} />
      </div>
    </WizardProvider>
  );
}
