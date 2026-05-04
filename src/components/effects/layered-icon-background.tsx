import { motion } from "framer-motion";
import type { IconType } from "react-icons";

const LAYERS = [
	{ id: "l1", scale: 1.0, delay: 0, opacity: 0.06, rotate: 0, x: 0, y: 0 },
	{ id: "l2", scale: 1.1, delay: 0.1, opacity: 0.08, rotate: 2, x: 2, y: -1 },
	{ id: "l3", scale: 1.2, delay: 0.2, opacity: 0.1, rotate: -3, x: -2, y: 1 },
	{ id: "l4", scale: 1.3, delay: 0.3, opacity: 0.12, rotate: 1, x: 1, y: 2 },
	{ id: "l5", scale: 1.4, delay: 0.4, opacity: 0.14, rotate: -2, x: -1, y: -2 },
	{ id: "l6", scale: 1.5, delay: 0.5, opacity: 0.16, rotate: 2, x: 3, y: -1 },
	{ id: "l7", scale: 1.6, delay: 0.6, opacity: 0.18, rotate: -1, x: -3, y: 2 },
];

export default function LayeredIconBackground({
	icon: Icon,
	align = "left",
	size = 150,
}: {
	icon: IconType;
	align?: "left" | "right";
	size?: number;
}) {
	return (
		<div
			className={`
				absolute inset-0 z-[-1] pointer-events-none flex items-center
				${align === "left" ? "justify-start pl-[5%]" : "justify-end pr-[5%]"}
			`}
		>
			{LAYERS.map((layer) => (
				<motion.div
					key={layer.id}
					className="absolute text-lime dark:text-lime/60"
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
					<Icon style={{ width: size, height: size }} />
				</motion.div>
			))}
		</div>
	);
}
