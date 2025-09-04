import type React from "react";
import { useEffect, useState } from "react";

interface Props {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

/**
 * Wrapper that respects user's motion preferences
 * Disables animations if user prefers reduced motion
 */
const ReducedMotionWrapper: React.FC<Props> = ({ children, fallback }) => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mediaQuery.matches);

		const handleChange = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(event.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	if (prefersReducedMotion && fallback) {
		return <>{fallback}</>;
	}

	if (prefersReducedMotion) {
		// Return children without animation wrappers
		return <div style={{ opacity: 1, transform: "none" }}>{children}</div>;
	}

	return <>{children}</>;
};

export default ReducedMotionWrapper;