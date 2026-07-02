import { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
            <p className='text-display-xs font-bold text-neutral-25'>
              Something went wrong
            </p>
            <p className='text-sm text-neutral-500'>
              Please try refreshing the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className='mt-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-neutral-25 transition-colors hover:bg-neutral-700'
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
