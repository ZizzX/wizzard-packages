import { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * The net under the drawing.
 *
 * Everything known to break a pasted flow is checked in `readFlow`, which now
 * builds the graph itself so that a shape the builder cannot handle is a
 * message rather than a crash. This is for what is not known yet: the page
 * accepts a stranger's JSON, and the honest position is that the next member of
 * that family has not been found rather than that there is none.
 *
 * Without it a render error takes the whole island — the graph, the panel and
 * the paste box the reader would fix the flow in — and leaves an empty page
 * with the fault invisible.
 *
 * A class is the only way React offers to catch a render error.
 */
interface Props {
  children: ReactNode;
  /** Changing this clears the failure, so the next paste draws again. */
  resetKey?: unknown;
}

interface State {
  message: string | null;
}

export class StageBoundary extends Component<Props, State> {
  override state: State = { message: null };

  static getDerivedStateFromError(error: unknown): State {
    return { message: error instanceof Error ? error.message : String(error) };
  }

  override componentDidUpdate(previous: Props): void {
    if (previous.resetKey !== this.props.resetKey && this.state.message !== null) {
      this.setState({ message: null });
    }
  }

  override componentDidCatch(error: unknown, info: ErrorInfo): void {
    // Kept out of the page and in the console, where whoever is debugging the
    // flow is already looking.
    console.error('[inspector] the drawing failed', error, info.componentStack);
  }

  override render(): ReactNode {
    const { message } = this.state;
    if (message === null) return this.props.children;

    return (
      <div className="stage-failed" role="alert">
        <p>This flow could not be drawn.</p>
        <p className="stage-failed-why">{message}</p>
        <p>
          The flow itself is unharmed — paste a different one, or reload to go back to the example.
          If it is a flow you can share, an issue with it attached is worth opening.
        </p>
      </div>
    );
  }
}
