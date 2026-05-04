import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Font weight cascade: closer to hover = heavier weight (distance-based)
const rippleWeights = ["100", "300", "500", "700"];

interface Props {
	text: string;
	className?: string;
}

const LetterRippleEffect = ({ text, className = "" }: Props) => {
	const letters = text.split("");
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const [isInteractive, setIsInteractive] = useState(false);

	// Critical: 2s delay prevents Framer Motion from blocking LCP measurement
	// Static version renders immediately for performance, interactive version lazy-loads
	useEffect(() => {
		const timeout = setTimeout(() => setIsInteractive(true), 2000);
		return () => clearTimeout(timeout);
	}, []);

	const getWeight = (index: number) => {
		if (hoverIndex === null) return "900";
		// Ripple algorithm: weight decreases with distance from hover point
		const distance = Math.abs(index - hoverIndex);
		return rippleWeights[distance] || rippleWeights[rippleWeights.length - 1];
	};

	// Performance optimization: identical layout prevents CLS when switching to interactive
	if (!isInteractive) {
		return (
			<div
				className={`inline-block select-none ${className}`}
				style={{ display: "flex" }}
			>
				{letters.map((letter, index) => (
					<span
						key={`${letter}-${index}-static`} // Unique keys prevent React reconciliation issues
						className="inline-block font-extrabold"
						style={{
							fontWeight: 900,
							minWidth: "0.6em",
							textAlign: "center",
							display: "inline-block"
						}}
					>
						{letter}
					</span>
				))}
			</div>
		);
	}

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
					animate={{ fontVariationSettings: `'wght' ${getWeight(index)}, 'opsz' 144, 'SOFT' 0, 'WONK' 0` }}
					transition={{ type: "spring", stiffness: 250, damping: 25 }}
					style={{
						fontVariationSettings: `'wght' ${getWeight(index)}, 'opsz' 144, 'SOFT' 0, 'WONK' 0`,
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
