import type React from "react";

interface Props {
	title: string;
	children: React.ReactNode;
	className?: string;
}

/**
 * Reusable legal section component to eliminate duplication in legal pages
 */
const LegalSection: React.FC<Props> = ({ title, children, className = "" }) => {
	return (
		<section className={`mb-8 ${className}`}>
			<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-4">{title}</h2>
			{children}
		</section>
	);
};

export default LegalSection;