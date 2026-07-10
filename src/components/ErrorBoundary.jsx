import { Component } from 'react';

/**
 * Error Boundary — catches render errors in child component tree
 * and displays a graceful fallback instead of crashing the entire app.
 *
 * Wrap around lazy-loaded sections or any subtree that might fail.
 *
 * @example
 *   <ErrorBoundary>
 *     <Suspense fallback={<LoadingSpinner />}>
 *       <LazyComponent />
 *     </Suspense>
 *   </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log to an error reporting service in production
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              minHeight: '50vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              gap: '1rem',
              padding: '2rem',
            }}
          >
            <i className="ph ph-warning-circle" style={{ fontSize: '2.5rem' }} />
            <p style={{ fontSize: '1.1rem' }}>Something went wrong loading this section.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                padding: '0.6rem 1.2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
