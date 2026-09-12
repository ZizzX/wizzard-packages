import { App } from '@examples/tasks/src/guards-and-force/App';

import { restartable } from '../components/StageBoundary';

/** "The three switches" on the React binding, mounted beside its source. */
export default restartable(App);
