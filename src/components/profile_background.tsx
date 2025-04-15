// src/components/ProfileBackground.tsx
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

export default function ProfileBackground() {
	const layers = [
		{
			id: "layer1",
			scale: 1.0,
			delay: 0,
			opacity: 0.02,
			rotate: 0,
			x: 0,
			y: 0,
		},
		{
			id: "layer2",
			scale: 1.1,
			delay: 0.1,
			opacity: 0.03,
			rotate: 2,
			x: 2,
			y: -1,
		},
		{
			id: "layer3",
			scale: 1.2,
			delay: 0.2,
			opacity: 0.04,
			rotate: -3,
			x: -2,
			y: 1,
		},
		{
			id: "layer4",
			scale: 1.3,
			delay: 0.3,
			opacity: 0.05,
			rotate: 1,
			x: 1,
			y: 2,
		},
		{
			id: "layer5",
			scale: 1.4,
			delay: 0.4,
			opacity: 0.06,
			rotate: -2,
			x: -1,
			y: -2,
		},
		{
			id: "layer6",
			scale: 1.5,
			delay: 0.5,
			opacity: 0.07,
			rotate: 2,
			x: 3,
			y: -1,
		},
		{
			id: "layer7",
			scale: 1.6,
			delay: 0.6,
			opacity: 0.08,
			rotate: -1,
			x: -3,
			y: 2,
		},
	];

	return (
		<div className="absolute right-[30%] top-[400px] z-0 pointer-events-none">
			{layers.map((layer) => (
				<motion.div
					key={layer.id}
					className="absolute left-0 top-0 text-lime"
					initial={{
						scale: layer.scale,
						opacity: layer.opacity,
						rotate: layer.rotate,
						x: layer.x,
						y: layer.y,
					}}
					animate={{
						scale: layer.scale + 0.06,
						opacity: layer.opacity + 0.08,
						rotate: layer.rotate + 2,
						x: layer.x + 1,
						y: layer.y - 1,
					}}
					transition={{
						duration: 4,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
						delay: layer.delay,
					}}
				>
					<FaUser className="w-[250px] h-[250px]" />
				</motion.div>
			))}
		</div>
	);
}
