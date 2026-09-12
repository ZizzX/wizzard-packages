import { App } from '@examples/tasks/src/clear-branch-data/App';

import { restartable } from '../components/StageBoundary';

/** "Clear abandoned branch data" on the React binding, mounted beside its source. */
export default restartable(App);
