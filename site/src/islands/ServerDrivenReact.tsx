import { App } from '@examples/tasks/src/server-driven/App';

import { restartable } from '../components/StageBoundary';

/** "Server-driven flows" on the React binding, mounted beside its source. */
export default restartable(App);
