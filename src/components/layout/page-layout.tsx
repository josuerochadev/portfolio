import type React from "react";
import { motion } from "framer-motion";
import BackgroundGradient from "./background-gradient";
import { ANIMATION } from "@/constants";

interface Props {
	children: React.ReactNode;
	maxWidth?: "4xl" | "6xl" | "full";
	className?: string;
	withAnimation?: boolean;
}

// Unified page template: eliminates 5+ layout duplications across routes
// Animation toggle prevents motion.div overhead when not needed (e.g., 404 page)
const PageLayout: React.FC<Props> = ({ 
	children, 
	maxWidth = "4xl", 
	className = "",
	withAnimation = true 
}) => {
	const maxWidthClasses = {
		"4xl": "max-w-4xl",
		"6xl": "max-w-6xl", 
		"full": "max-w-full"
	};

	const content = (
		<div className="min-h-screen text-violet dark:text-beige">
			<BackgroundGradient />
			<main className={`relative z-10 ${maxWidthClasses[maxWidth]} mx-auto px-6 py-20 ${className}`} role="main">
				{children}
			</main>
		</div>
	);

	if (!withAnimation) {
		return content;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: ANIMATION.DURATIONS.MEDIUM }}
		>
			{content}
		</motion.div>
	);
};

export default PageLayout;