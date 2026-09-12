import PassengersApp from '@examples/reference/src/passengers/App';

import { restartable } from '../components/StageBoundary';

/** R-C, mounted. The site owns the net; the example owns the application. */
export default restartable(PassengersApp);
