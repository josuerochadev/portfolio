import { motion } from "framer-motion";

export default function BackgroundGradient() {
	return (
		<div
			className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none"
			aria-hidden="true"
		>
			{/* Moving gradient — light mode */}
			<motion.div
				className="absolute inset-0 bg-[length:300%_300%] animate-gradient-move dark:opacity-0 transition-opacity duration-500"
				style={{
					backgroundImage: `
            radial-gradient(at 20% 30%, #ffefc1 0%, transparent 60%),
            radial-gradient(at 80% 80%, #e2a788 0%, transparent 60%),
            linear-gradient(135deg, #c4817f, #fef3c7, #b28d6e)
          `,
					backgroundBlendMode: "overlay, soft-light, normal",
					willChange: "background-position",
				}}
			/>
			{/* Moving gradient — dark mode */}
			<motion.div
				className="absolute inset-0 bg-[length:300%_300%] animate-gradient-move opacity-0 dark:opacity-100 transition-opacity duration-500"
				style={{
					backgroundImage: `
            radial-gradient(at 20% 30%, rgba(105,0,255,0.15) 0%, transparent 60%),
            radial-gradient(at 80% 80%, rgba(181,255,0,0.08) 0%, transparent 60%),
            linear-gradient(135deg, #0F0A1A, #1A1230, #0F0A1A)
          `,
					backgroundBlendMode: "overlay, soft-light, normal",
					willChange: "background-position",
				}}
			/>
		</div>
	);
}
