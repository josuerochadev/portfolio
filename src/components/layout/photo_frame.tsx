// src/components/layout/photo_frame.tsx

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function PhotoFrame() {
	const triggerRef = useRef(null);
	const wrapperRef = useRef(null);
	const isInView = useInView(triggerRef, { margin: "-100px 0px -30% 0px" });

	const [visible, setVisible] = useState(false);
	const [isDragged, setIsDragged] = useState(false);
	const [isClosed, setIsClosed] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	// Parallax inverso só se não for drag
	const { scrollYProgress } = useScroll({ target: triggerRef });
	const y = useTransform(scrollYProgress, [0, 1], [100, -40]);

	useEffect(() => {
		if (isInView && !isClosed) setVisible(true);
	}, [isInView, isClosed]);

	if (!visible || isClosed)
		return (
			<div ref={triggerRef} className="absolute top-[50%] h-[1px] w-full" />
		);

	return (
		<div ref={wrapperRef} className="fixed inset-0 z-[999] pointer-events-none">
			<motion.div
				style={isDragged ? undefined : { y, rotate: -3 }}
				drag
				dragConstraints={wrapperRef}
				onDragStart={() => {
					setIsDragged(true);
					setIsDragging(true);
				}}
				onDragEnd={() => setIsDragging(false)}
				className={`absolute left-[calc(50%-130px)] top-[38%] cursor-grab active:cursor-grabbing pointer-events-auto z-[9999] transition-shadow ${
					isDragging ? "shadow-2xl" : "shadow-lg"
				}`}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }}
			>
				{/* Botão para fechar */}
				<button
					type="button"
					onClick={() => setIsClosed(true)}
					aria-label="Close photo"
					title="Close photo"
					className="absolute top-[-10px] right-[-10px] bg-beige border border-violet text-orange rounded-full w-7 h-7 text-sm font-bold shadow-md z-10"
				>
					×
				</button>

					<img
					src={`${import.meta.env.BASE_URL}assets/videos/profile.gif`}
					alt="GIF of Josué in frame"
					className="w-[180px] sm:w-[220px] md:w-[260px] h-auto rounded-md"
					draggable={false}
					/>
			</motion.div>
		</div>
	);
}
