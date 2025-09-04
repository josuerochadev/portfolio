import type React from "react";
import FadeInUp from "./fade-in-up";
import { ANIMATION } from "@/constants";

interface Props {
	children: React.ReactNode[];
	startDelay?: number;
	increment?: number;
	className?: string;
}

// Eliminates 43+ FadeInUp duplications by automating staggered delays
// Performance: avoids manual delay calculations and ensures consistent timing
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