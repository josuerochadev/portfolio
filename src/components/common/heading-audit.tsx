import type React from "react";

interface Props {
	level: 1 | 2 | 3 | 4 | 5 | 6;
	children: React.ReactNode;
	className?: string;
}

/**
 * Semantic heading component that ensures proper hierarchy
 * Helps maintain WCAG compliance for heading structure
 */
const HeadingAudit: React.FC<Props> = ({ level, children, className = "" }) => {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;
	
	// Development warning for heading hierarchy
	if (process.env.NODE_ENV === 'development') {
		const currentHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
		const lastHeading = currentHeadings[currentHeadings.length - 1];
		
		if (lastHeading) {
			const lastLevel = parseInt(lastHeading.tagName.charAt(1));
			if (level > lastLevel + 1) {
				console.warn(`⚠️ Accessibility Warning: Heading h${level} skips levels. Previous heading was h${lastLevel}`);
			}
		}
	}

	return <Tag className={className}>{children}</Tag>;
};

export default HeadingAudit;