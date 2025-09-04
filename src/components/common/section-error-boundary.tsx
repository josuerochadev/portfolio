import type React from "react";
import ErrorBoundary from "./error-boundary";
import { COLORS } from "@/constants";

interface Props {
	children: React.ReactNode;
	sectionName: string;
}

const SectionErrorBoundary: React.FC<Props> = ({ children, sectionName }) => {
	const fallback = (
		<section className="min-h-[300px] flex items-center justify-center py-20">
			<div className="text-center max-w-md mx-auto px-6">
				<div className="mb-4">
					<span className="text-4xl">⚠️</span>
				</div>
				<h3 className={`text-lg font-bold mb-2 ${COLORS.VIOLET.TEXT}`}>
					{sectionName} Section Unavailable
				</h3>
				<p className={`text-sm ${COLORS.VARIANTS.VIOLET_70}`}>
					This section encountered an error and couldn't load properly. 
					The rest of the site continues to work normally.
				</p>
			</div>
		</section>
	);

	const handleError = (error: Error) => {
		console.error(`Error in ${sectionName} section:`, error);
	};

	return (
		<ErrorBoundary fallback={fallback} onError={handleError}>
			{children}
		</ErrorBoundary>
	);
};

export default SectionErrorBoundary;