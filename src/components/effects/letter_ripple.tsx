import { useState } from "react";
import { motion } from "framer-motion";

const rippleWeights = ["100", "300", "500", "700"];

interface Props {
	text: string;
	className?: string;
}

const LetterRippleEffect = ({ text, className = "" }: Props) => {
	const letters = text.split("");
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);

	const getWeight = (index: number) => {
		if (hoverIndex === null) return "900";
		const distance = Math.abs(index - hoverIndex);
		return rippleWeights[distance] || rippleWeights[rippleWeights.length - 1];
	};

	return (
		<div
			className={`inline-block select-none ${className}`}
			style={{ display: "flex" }}
		>
			{letters.map((letter, index) => (
				<motion.span
					key={`${letter}-${index}-${text}`}
					onMouseEnter={() => setHoverIndex(index)}
					onMouseLeave={() => setHoverIndex(null)}
					animate={{ fontVariationSettings: `'wght' ${getWeight(index)}` }}
					transition={{ type: "spring", stiffness: 250, damping: 25 }}
					style={{
						willChange: "font-variation-settings, transform",
						fontVariationSettings: `'wght' ${getWeight(index)}`,
						display: "inline-block",
						minWidth: "0.6em",
						textAlign: "center",
						fontWeight: 900,
					}}
				>
					{letter}
				</motion.span>
			))}
		</div>
	);
};

export default LetterRippleEffect;
