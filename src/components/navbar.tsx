import type React from "react";
import { useRef, useState } from "react";

const links = [
	{ label: "PROJECTS", href: "#projects" },
	{ label: "BIO", href: "#bio" },
	{ label: "GET IN TOUCH", href: "#contact" },
];

const Navbar: React.FC = () => {
	const barCount = 45;
	const navRef = useRef<HTMLDivElement>(null);
	const [mouseX, setMouseX] = useState<number | null>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = navRef.current?.getBoundingClientRect();
		if (!rect) return;
		setMouseX(e.clientX - rect.left);
	};

	return (
		<nav
			ref={navRef}
			onMouseMove={handleMouseMove}
			className="fixed top-0 w-full z-50 bg-beige text-violet font-bold text-sm uppercase tracking-wider font-sans overflow-hidden"
		>
			{/* Failles vertes dans un fond beige */}
			<div className="absolute inset-0 bg-beige z-0">
				<div className="relative w-full h-full">
					{Array.from({ length: barCount }).map((_, i) => {
						const total = barCount;
						const colWidth = 100 / total;
						const leftPercent = i * colWidth;

						const distance =
							mouseX !== null
								? Math.abs((mouseX / window.innerWidth) * total - i)
								: Number.POSITIVE_INFINITY;

						const baseWidth = 1; // faille la plus fine
						const maxWidth = 16;

						const width = Math.min(maxWidth, baseWidth + distance * 2.5);

						return (
							<div
								key={`bar-${i}-${Date.now()}`}
								className="absolute top-0 h-full bg-lime transition-all duration-200"
								style={{
									left: `${leftPercent}%`,
									width: `${width}px`,
								}}
							/>
						);
					})}
				</div>
			</div>

			{/* Liens centrés */}
			<div className="relative z-10 flex justify-center py-3">
				<ul className="flex gap-8">
					{links.map((link) => (
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
