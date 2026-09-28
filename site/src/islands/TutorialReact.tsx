import { App } from '@examples/tasks/src/tutorial/finish/App';

import { restartable } from '../components/StageBoundary';

/** The tutorial's finished wizard on the React binding, mounted beside its source. */
export default restartable(App);
