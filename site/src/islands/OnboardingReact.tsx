import OnboardingApp from '@examples/reference/src/onboarding/App';

import { restartable } from '../components/StageBoundary';

/** R-A, mounted. The site owns the net; the example owns the application. */
export default restartable(OnboardingApp);
