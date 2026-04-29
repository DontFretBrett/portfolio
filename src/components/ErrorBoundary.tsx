import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { trackError } from '../utils/analytics';

interface Props {
  children: ReactNode;
  /** Optional custom fallback UI. Defaults to a full-page error message. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches unhandled render errors anywhere in the subtree and renders a
 * graceful fallback instead of crashing the whole app.
 *
 * Error boundaries must be class components (React requirement).
 * Errors are forwarded to GA via trackError for production visibility.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    trackError('render_error', error.message);
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultErrorFallback />;
    }
    return this.props.children;
  }
}

function DefaultErrorFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-6" aria-hidden="true">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          An unexpected error occurred. Refreshing the page usually fixes it.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Refresh page
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
