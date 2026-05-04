import type React from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { navLinkHover } from "@/utils/motion-variants";
import SmileIcon from "@/assets/images/ui/smile.svg?react";

// Navigation links
const NAV_LINKS: { key: string; href: string; external?: boolean }[] = [
	{ key: "home", href: "#hero" },
	{ key: "work", href: "#projects" },
	{ key: "about", href: "#bio" },
	{ key: "contact", href: "#contact" },
	{ key: "blog", href: "#", external: true },
];

// Number of bars to display
const BAR_COUNT = 45;

const Navbar: React.FC = () => {
	const navRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation('common');

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = navRef.current?.getBoundingClientRect();
		if (!rect) return;
		
		const mouseX = e.clientX - rect.left;
		const bars = navRef.current?.querySelectorAll('.animated-bar');
		
		if (!bars) return;

		bars.forEach((bar, index) => {
			const distance = Math.abs((mouseX / window.innerWidth) * BAR_COUNT - index);
			const proximity = Math.max(0, 12 - distance);
			const width = proximity > 0 ? proximity * 2.2 : 0;
			const opacity = width > 0 ? 1 : 0;
			
			(bar as HTMLElement).style.width = `${width}px`;
			(bar as HTMLElement).style.opacity = opacity.toString();
		});
	};

	return (
		<nav
			ref={navRef}
			onMouseMove={handleMouseMove}
			aria-label="Main navigation"
			className="relative w-full bg-transparent backdrop-blur-md text-violet font-bold text-sm sm:text-lg uppercase tracking-wider font-sans overflow-hidden py-4 sm:py-6 z-50 border-b-2 border-lime"
		>
			{/* Animated bars background */}
			<div className="absolute inset-0 z-[1]">
				<div
					className="relative w-full h-full"
					style={{ willChange: "transform" }}
				>
					{Array.from({ length: BAR_COUNT }).map((_, i) => {
						const left = `${(100 / BAR_COUNT) * i}%`;

						return (
							<div
								key={`bar-${i}`}
								className="animated-bar absolute top-0 h-full bg-lime backdrop-blur-md transition-[width,opacity] duration-100 ease-[cubic-bezier(0.83,0,0.17,1)]"
								style={{ left, width: '0px', opacity: 0 }}
							/>
						);
					})}
				</div>
			</div>

			{/* Navigation links */}
			<div className="relative z-20 flex justify-between items-center max-w-6xl mx-auto px-4">
				<ul className="flex gap-3 sm:gap-6 md:gap-8 items-center mx-auto">
					<li>
						<a
							href="#hero"
							className="transition-colors duration-200 text-violet hover:text-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 rounded-lg"
							aria-label="Home"
						>
							<SmileIcon className="w-8 h-8 sm:w-10 sm:h-10" />
						</a>
					</li>

					{NAV_LINKS.slice(1).map(({ href, key, external }) => (
						<li key={key}>
							<motion.a
								href={href}
								{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
								variants={navLinkHover}
								initial="initial"
								animate="initial"
								whileHover="hover"
								className="inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 rounded px-1 py-1 sm:px-2 text-xs sm:text-base"
							>
								{t(`navigation.${key}`)}
							</motion.a>
						</li>
					))}
				</ul>
				
			</div>
		</nav>
	);
};

export default Navbar;
