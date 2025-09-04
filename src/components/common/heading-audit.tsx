import type React from "react";

interface Props {
	level: 1 | 2 | 3 | 4 | 5 | 6;
	children: React.ReactNode;
	className?: string;
}

// Runtime WCAG heading validation: catches h1->h3 jumps (should be h1->h2)
// Development-only DOM inspection prevents production overhead
const HeadingAudit: React.FC<Props> = ({ level, children, className = "" }) => {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements; // Dynamic tag: h1-h6
	
	// Critical: validates heading levels don't skip (h1->h3 breaks screen readers)
	if (process.env.NODE_ENV === 'development') {
		// DOM snapshot: all headings rendered so far (order matters)
		const currentHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
		const lastHeading = currentHeadings[currentHeadings.length - 1];
		
		if (lastHeading) {
			const lastLevel = parseInt(lastHeading.tagName.charAt(1)); // Extract level from 'H3'->3
			if (level > lastLevel + 1) {
				console.warn(`⚠️ Accessibility Warning: Heading h${level} skips levels. Previous heading was h${lastLevel}`);
			}
		}
	}

	return <Tag className={className}>{children}</Tag>;
};

export default HeadingAudit;