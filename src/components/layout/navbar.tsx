// src/components/navbar.tsx
import type React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { navLinkHover } from "../../utils/motion_variants";
import SmileIcon from "../../assets/images/ui/smile.svg?react";

// Navigation links
const NAV_LINKS = [
	{ label: "Home", href: "#hero" },
	{ label: "Work", href: "#projects" },
	{ label: "About", href: "#bio" },
	{ label: "Contact", href: "#contact" },
];

// Number of bars to display
const BAR_COUNT = 45;

// Navbar component
const Navbar: React.FC = () => {
	// State to track mouse position
	const navRef = useRef<HTMLDivElement>(null);
	const [mouseX, setMouseX] = useState<number | null>(null);

	// Effect to handle mouse movement
	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = navRef.current?.getBoundingClientRect();
		if (!rect) return;
		setMouseX(e.clientX - rect.left);
	};

	// Function to calculate the width of each bar based on mouse position
	const getBarWidth = (index: number): number => {
		if (mouseX === null) return 0;
		const distance = Math.abs((mouseX / window.innerWidth) * BAR_COUNT - index);
		const proximity = Math.max(0, 12 - distance);
		return proximity > 0 ? proximity * 2.2 : 0;
	};

	return (
		<nav
			ref={navRef}
			onMouseMove={handleMouseMove}
			className="relative w-full bg-transparent backdrop-blur-xl text-violet font-bold text-lg uppercase tracking-wider font-sans overflow-hidden py-6 z-10 border-b-2 border-lime"
		>
			{/* Animated bars background */}
			<div className="absolute inset-0 z-[1]">
				<div className="relative w-full h-full">
					{Array.from({ length: BAR_COUNT }).map((_, i) => {
						const left = `${(100 / BAR_COUNT) * i}%`;
						const width = `${getBarWidth(i)}px`;
						return (
							<div
								key={`bar-${i}-${Math.random().toString(36).substr(2, 9)}`}
								className="absolute top-0 h-full bg-lime backdrop-blur-md transition-all duration-100 ease-out"
								style={{ left, width }}
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

					{/* Map through navigation links */}
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
