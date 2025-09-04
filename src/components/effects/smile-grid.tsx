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

// Stable pseudo-random generator using seed
const seededRandom = (seed: number) => {
	let x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
};

// Function to generate smiles with stable positions
const generateSmiles = (count: number): Smile[] => {
	const smiles: Smile[] = [];
	const timestamp = Date.now();
	
	for (let i = 0; i < count; i++) {
		const seed = timestamp + i;
		smiles.push({
			id: `smile-${timestamp}-${i}`,
			x: seededRandom(seed) * 100,
			y: seededRandom(seed + 1000) * 100,
			size: seededRandom(seed + 2000) * 8 + 2, // Size between 2 and 10
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
		const newSmiles = generateSmiles(3); // Reduced for performance
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
