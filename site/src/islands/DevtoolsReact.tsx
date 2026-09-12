import { App } from '@examples/quickstart/src/Devtools';

import { restartable } from '../components/StageBoundary';

/** The devtools panel over the quickstart wizard, mounted beside its source. */
export default restartable(App);
