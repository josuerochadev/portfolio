import type React from "react";
import { Component, type ReactNode, type ErrorInfo } from "react";
import { COLORS } from "@/constants";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
	hasError: boolean;
	error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	// React lifecycle: called during render phase, must be pure (no side effects)
	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	// Commit phase: safe for side effects (logging, analytics)
	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
		
		// Optional callback for error reporting service (Sentry, etc.)
		if (this.props.onError) {
			this.props.onError(error, errorInfo);
		}
	}

	render(): ReactNode {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Graceful fallback: maintains design system consistency
			return (
				<div className="min-h-[200px] flex flex-col items-center justify-center p-6 rounded-lg border-2 border-red-200 bg-red-50">
					<div className="text-center max-w-md">
						<h3 className={`text-xl font-bold mb-2 ${COLORS.VIOLET.TEXT}`}>
							Oops! Something went wrong
						</h3>
						<p className="text-gray-600 mb-4">
							We're sorry, but something unexpected happened. Please try refreshing the page.
						</p>
						<button
							onClick={() => window.location.reload()}
							className="button"
						>
							Refresh Page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;