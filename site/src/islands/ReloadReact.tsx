import ReloadApp from '@examples/reference/src/reload/App';
import { useState, type ReactNode } from 'react';

import { StageBoundary } from '../components/StageBoundary';

/**
 * R-B, mounted. The site owns the net; the example owns the application.
 *
 * The boundary and the remount key live here rather than in the example,
 * because a reader copying `App.tsx` into their own project is copying an
 * application, not a page that has to survive a stranger's browser.
 */
export default function ReloadReact(): ReactNode {
  const [attempt, setAttempt] = useState(0);

  return (
    <StageBoundary
      resetKey={attempt}
      onRestart={() => {
        setAttempt((n) => n + 1);
      }}
    >
      <ReloadApp key={attempt} />
    </StageBoundary>
  );
}
