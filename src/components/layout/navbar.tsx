import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { navLinkHover } from "@/utils/motion_variants";
import SmileIcon from "@/assets/images/ui/smile.svg?react";

// Navigation links
const NAV_LINKS = [
	{ label: "Home", href: "#hero" },
	{ label: "Work", href: "#projects" },
	{ label: "About", href: "#bio" },
	{ label: "Contact", href: "#contact" },
];

// Number of bars to display
const BAR_COUNT = 45;

const Navbar: React.FC = () => {
	const navRef = useRef<HTMLDivElement>(null);
	const mouseX = useRef<number | null>(null);
	const [tick, setTick] = useState(0); // Força re-render suave

	// Atualiza mouseX sem trigger de re-render
	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = navRef.current?.getBoundingClientRect();
		if (!rect) return;
		mouseX.current = e.clientX - rect.left;
	};

	// Força atualização contínua (reactive loop)
	useEffect(() => {
		let animationFrameId: number;

		const update = () => {
			setTick((prev) => (prev + 1) % 1000); // força um re-render leve
			animationFrameId = requestAnimationFrame(update);
		};

		animationFrameId = requestAnimationFrame(update);

		return () => cancelAnimationFrame(animationFrameId);
	}, []);

	const getBarWidth = (index: number): number => {
		if (mouseX.current === null) return 0;
		const distance = Math.abs(
			(mouseX.current / window.innerWidth) * BAR_COUNT - index,
		);
		const proximity = Math.max(0, 12 - distance);
		return proximity > 0 ? proximity * 2.2 : 0;
	};

	return (
		<nav
			ref={navRef}
			onMouseMove={handleMouseMove}
			className="relative w-full bg-transparent backdrop-blur-md text-violet font-bold text-lg uppercase tracking-wider font-sans overflow-hidden py-6 z-10 border-b-2 border-lime"
		>
			{/* Animated bars background */}
			<div className="absolute inset-0 z-[1]">
				<div
					className="relative w-full h-full"
					style={{ willChange: "transform" }}
				>
					{Array.from({ length: BAR_COUNT }).map((_, i) => {
						const left = `${(100 / BAR_COUNT) * i}%`;
						const width = `${getBarWidth(i)}px`;
						const opacity = getBarWidth(i) > 0 ? 1 : 0;

						return (
							<div
								key={`bar-${
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									i
								}`}
								className="absolute top-0 h-full bg-lime backdrop-blur-md will-change-transform transition-[width,opacity] duration-100 ease-[cubic-bezier(0.83,0,0.17,1)]"
								style={{ left, width, opacity }}
							/>
						);
					})}
				</div>
			</div>

			{/* Navigation links */}
			<div className="relative z-20 flex justify-center">
				<ul className="flex gap-8 items-center">
					<li>
						<a
							href="#hero"
							className="transition-colors duration-200 text-violet hover:text-orange"
							aria-label="Home"
						>
							<SmileIcon className="w-10 h-10" />
						</a>
					</li>

					{NAV_LINKS.slice(1).map(({ href, label }) => (
						<li key={href}>
							<motion.a
								href={href}
								variants={navLinkHover}
								initial="initial"
								animate="initial"
								whileHover="hover"
								className="inline-block cursor-pointer"
							>
								{label}
							</motion.a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
