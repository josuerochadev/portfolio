import type React from "react";
import FadeInUp from "./fade-in-up";
import { ANIMATION } from "@/constants";

interface Props {
	children: React.ReactNode[];
	startDelay?: number;
	increment?: number;
	className?: string;
}

/**
 * Renders multiple children with sequential FadeInUp animations
 * Eliminates DRY violations from manual delay calculations
 */
const SequentialFadeIn: React.FC<Props> = ({ 
	children, 
	startDelay = ANIMATION.DELAYS.SHORT, 
	increment = ANIMATION.DELAYS.SHORT,
	className = ""
}) => {
	return (
		<>
			{children.map((child, index) => (
				<FadeInUp 
					key={index} 
					delay={startDelay + (index * increment)}
					className={className}
				>
					{child}
				</FadeInUp>
			))}
		</>
	);
};

export default SequentialFadeIn;