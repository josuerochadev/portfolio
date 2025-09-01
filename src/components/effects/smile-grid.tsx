import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmileIcon from "@/assets/images/ui/smile.svg?react";

interface SmileGridProps {
	active: boolean;
}

interface Smile {
	x: number;
	y: number;
	size: number;
	id: string;
}

// Function to generate random smiles
const generateSmiles = (count: number): Smile[] => {
	const smiles: Smile[] = [];
	for (let i = 0; i < count; i++) {
		smiles.push({
			id: `${i}-${Date.now()}-${Math.random()}`,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 8 + 2, // Random size between 2 and 10
		});
	}
	return smiles;
};

const smileTransition = {
	duration: 4,
	ease: "easeInOut",
};

// SmileGrid component
const SmileGrid: React.FC<SmileGridProps> = ({ active }) => {
	const [smiles, setSmiles] = useState<Smile[]>([]);

	useEffect(() => {
		if (!active) return;
		const newSmiles = generateSmiles(6);
		setSmiles((prev) => [...prev, ...newSmiles]);
	}, [active]);

	return (
		<div
			className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
			style={{ transformStyle: "preserve-3d" }}
		>
			<AnimatePresence>
				{smiles.map((smile) => (
					<motion.div
						key={smile.id}
						initial={{ opacity: 0, rotateY: 0, y: 0, z: 0 }}
						animate={{
							opacity: 1,
							rotateY: [0, 360],
							y: -150,
							z: 15,
							rotateZ: [0, 15, -15, 0],
						}}
						exit={{ opacity: 0 }}
						transition={smileTransition}
						style={{
							top: `${smile.y}%`,
							left: `${smile.x}%`,
							width: `${smile.size}rem`,
							height: `${smile.size}rem`,
							willChange: "transform, opacity",
							position: "absolute",
						}}
						onAnimationComplete={() =>
							setSmiles((prev) => prev.filter((s) => s.id !== smile.id))
						}
					>
						<SmileIcon className="text-lime w-full h-full" />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
};

export default SmileGrid;
