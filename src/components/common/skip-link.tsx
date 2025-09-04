import type React from "react";
import { COLORS, COMPONENTS } from "@/constants";

/**
 * Skip navigation link for screen reader users
 * Hidden by default, visible on focus for accessibility compliance
 */
const SkipLink: React.FC = () => {
	return (
		<a
			href="#main-content"
			className={`
				absolute -top-40 left-6 z-[9999]
				${COLORS.VIOLET.BG} ${COLORS.LIME.TEXT} 
				px-4 py-2 text-sm font-medium
				${COMPONENTS.ROUNDED.MD}
				${COMPONENTS.FOCUS_RING}
				focus:top-6
				transition-all duration-200
			`}
		>
			Skip to main content
		</a>
	);
};

export default SkipLink;