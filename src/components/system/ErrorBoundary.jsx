import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full border border-red-100">
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong.</h1>
                        <p className="text-lg mb-6">The application crashed. This is likely due to a bug in the code.</p>

                        <details className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 overflow-auto max-h-64">
                            <summary className="cursor-pointer font-semibold mb-2">Error Details</summary>
                            <pre className="text-xs text-red-500 whitespace-pre-wrap">
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>

                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
