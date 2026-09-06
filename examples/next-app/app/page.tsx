import { WizardProvider } from '@wizzard-packages/react/v1';

import { signup } from './flow';
import { Steps } from './steps';

// A server component, deliberately without 'use client'. The provider is
// imported straight from the package's built output, so this page only
// builds when the directive survived that build. Without it the React
// Server Components compiler tries to run createContext on the server and
// `next build` fails.
export default function Page() {
  return (
    <WizardProvider flow={signup}>
      <Steps />
    </WizardProvider>
  );
}
