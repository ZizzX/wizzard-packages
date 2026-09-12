import { App } from '@examples/tasks/src/block-next/App';

import { restartable } from '../components/StageBoundary';

/** "Block Next until valid" on the React binding, mounted beside its source. */
export default restartable(App);
