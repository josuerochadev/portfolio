// src/components/navbar.tsx
import type React from "react";
import { useRef, useState } from "react";
import SmileIcon from "../assets/images/smile.svg?react";

// Navigation links
const links = [
	{ label: "Home", href: "#hero" },
	{ label: "Work", href: "#projects" },
	{ label: "About", href: "#bio" },
	{ label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
	const barCount = 45;
	const navRef = useRef<HTMLDivElement>(null);
	const [mouseX, setMouseX] = useState<number | null>(null);

	// Handle mouse movement
	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = navRef.current?.getBoundingClientRect();
		if (!rect) return;
		setMouseX(e.clientX - rect.left);
	};

	return (
		<nav
			ref={navRef}
			onMouseMove={handleMouseMove}
			className="relative w-full bg-lime text-violet font-bold text-lg uppercase tracking-wider font-sans overflow-hidden py-6"
		>
			{/* Background bars (glitch effect) */}
			<div className="absolute inset-0 bg-lime z-[1]">
				<div className="relative w-full h-full">
					{Array.from({ length: barCount }).map((_, i) => {
						const total = barCount;
						const colWidth = 100 / total;
						const leftPercent = i * colWidth;
						const distance =
							mouseX !== null
								? Math.abs((mouseX / window.innerWidth) * total - i)
								: Number.POSITIVE_INFINITY;
						const proximity = Math.max(0, 12 - distance);
						const width = proximity > 0 ? proximity * 2.2 : 0;
						return (
							<div
								key={`bar-${leftPercent}`}
								className="absolute top-0 h-full bg-beige transition-all duration-100 ease-out"
								style={{
									left: `${leftPercent}%`,
									width: `${width}px`,
								}}
							/>
						);
					})}
				</div>
			</div>

			{/* Navigation links */}
			<div className="relative z-20 flex justify-center">
				<ul className="flex gap-8 items-center">
					{/* Home link */}
					<li>
						<a
							href="#hero"
							className="transition-colors duration-200 text-violet hover:text-orange"
						>
							<SmileIcon className="w-10 h-10" />
						</a>
					</li>
					{links.slice(1).map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								className="transition-colors duration-200 hover:text-orange"
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
