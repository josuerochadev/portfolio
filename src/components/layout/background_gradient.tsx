import { motion } from "framer-motion";

export default function BackgroundGradient() {
	return (
		<div
			className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none"
			aria-hidden="true"
		>
			{/* Moving gradient */}
			<motion.div
				className="absolute inset-0 bg-[length:300%_300%] animate-gradient-move"
				style={{
					backgroundImage: `
      radial-gradient(at 20% 30%, #ffefc1 0%, transparent 60%),
      radial-gradient(at 80% 80%, #e2a788 0%, transparent 60%),
      linear-gradient(135deg, #c4817f, #fef3c7, #b28d6e)
    `,
					backgroundBlendMode: "overlay, soft-light, normal",
				}}
			/>
		</div>
	);
}
