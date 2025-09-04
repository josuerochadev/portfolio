import type React from "react";
import ErrorBoundary from "./error-boundary";

interface Props {
	children: React.ReactNode;
	fallbackContent?: React.ReactNode;
}

const AnimationErrorBoundary: React.FC<Props> = ({ children, fallbackContent }) => {
	const fallback = fallbackContent || (
		<div className="opacity-50">
			{/* Render static version if animation fails */}
			<div>Content loaded (animations disabled)</div>
		</div>
	);

	const handleError = (error: Error) => {
		console.warn("Animation component failed, falling back to static content:", error.message);
	};

	return (
		<ErrorBoundary fallback={fallback} onError={handleError}>
			{children}
		</ErrorBoundary>
	);
};

export default AnimationErrorBoundary;