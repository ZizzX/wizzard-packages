import ReloadApp from '@examples/reference/src/reload/App';

import { restartable } from '../components/StageBoundary';

/** R-B, mounted. The site owns the net; the example owns the application. */
export default restartable(ReloadApp);
