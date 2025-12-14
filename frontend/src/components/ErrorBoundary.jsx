import { Component } from 'react';
import { useNavigate } from 'react-router';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
          <div className="card bg-base-200 shadow-xl max-w-md">
            <div className="card-body text-center">
              <h2 className="card-title text-error justify-center">
                Oops! Something went wrong
              </h2>
              <p className="text-base-content opacity-70">
                We're sorry for the inconvenience. Please try refreshing the page.
              </p>
              {import.meta.env.DEV && this.state.error && (
                <div className="mt-4 p-4 bg-base-300 rounded text-left text-xs overflow-auto max-h-40">
                  <p className="font-bold text-error">{this.state.error.toString()}</p>
                  <pre className="mt-2 text-xs opacity-70">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              )}
              <div className="card-actions justify-center mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => window.location.href = '/'}
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
