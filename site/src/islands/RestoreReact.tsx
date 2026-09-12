import { App } from '@examples/tasks/src/restore-after-reload/App';

import { restartable } from '../components/StageBoundary';

/** "Restore after reload" on the React binding, mounted beside its source. */
export default restartable(App);
