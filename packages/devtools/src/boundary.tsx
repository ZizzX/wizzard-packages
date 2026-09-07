import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { renderFailed } from './messages';

/**
 * The graph renderer's error boundary. It wraps the drawing alone, so a flow
 * shape the renderer has not met - or a `layout` override that threw - costs
 * the graph and nothing else: the strip, the State tab, the Activity tab and
 * the export keep working, and the refusal the person was diagnosing stays on
 * screen (§12.7).
 *
 * A class is the only way React offers to catch a render error, which is why
 * this is the one class in the package.
 */

interface Props {
  children: ReactNode;
  /** Remounts the boundary when the drawn flow changes, so a fixed flow draws again. */
  resetKey?: unknown;
}

interface State {
  message: string | null;
}

export class GraphBoundary extends Component<Props, State> {
  state: State = { message: null };

  static getDerivedStateFromError(error: unknown): State {
    return { message: error instanceof Error ? error.message : String(error) };
  }

  componentDidUpdate(previous: Props): void {
    if (previous.resetKey !== this.props.resetKey && this.state.message !== null) {
      this.setState({ message: null });
    }
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    /**
     * The host's console is where a stack belongs; the panel shows the message.
     * Swallowing it entirely would hide the one trace that names the component.
     */
    try {
      console.error('[wizzard] devtools render error', error, info.componentStack);
    } catch {
      /* a console that throws is not this panel's problem */
    }
  }

  render(): ReactNode {
    if (this.state.message !== null) {
      return (
        <p className="wz-message" role="status">
          {renderFailed(this.state.message)}
        </p>
      );
    }
    return this.props.children;
  }
}
