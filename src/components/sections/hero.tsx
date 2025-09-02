import type React from "react";
import { useState } from "react";
import { FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import SmileGrid from "@/components/effects/smile-grid";

const PHRASES = [
	{ id: "phrase-2", text: "a brazilian former lawyer" },
	{ id: "phrase-3", text: "based in France" },
	{ id: "phrase-4", text: "who turned developer" },
	{ id: "phrase-5", text: "in love with clean code" },
	{ id: "phrase-6", text: "and AGILE methodology" },
];

const ACTION_LINKS = [
	{
		href: "/Josue_Rocha_CV_Dev2025.pdf",
		icon: <FaFileAlt className="inline-block mr-2" />,
		label: "RESUME",
		delay: 1.7,
	},
	{
		href: "https://github.com/josuerochadev",
		icon: <FaGithub className="inline-block mr-2" />,
		label: "GITHUB",
		delay: 1.85,
	},
	{
		href: "https://www.linkedin.com/in/josuerochadev/",
		icon: <FaLinkedin className="inline-block mr-2" />,
		label: "LINKEDIN",
		delay: 2.0,
	},
];

const Hero: React.FC = () => {
	const [showSmiles, setShowSmiles] = useState(false);

	return (
		<section
			id="hero"
			className="relative flex flex-col justify-between min-h-[calc(100vh-6rem)] px-6 pt-12 pb-10 text-violet overflow-hidden"
		>
			<SmileGrid active={showSmiles} />

			{/* LIGHT STRIP static */}
			<div className="absolute top-0 left-0 w-full h-12 bg-lime blur-2xl z-0 pointer-events-none opacity-60" />

			{/* TITLE - Immediate render for LCP */}
			<div className="flex flex-col items-center justify-start pt-8 sm:pt-12 mb-6 sm:mb-0 relative z-10 px-2">
				<h1 className="relative text-[clamp(4rem,12vw,12rem)] leading-[0.85] font-extrabold font-display text-left">
					<span className="absolute left-0 -top-4 sm:-top-6 text-lg sm:text-xl md:text-2xl font-normal text-violet">
						I'm
					</span>
					<div className="ml-0 sm:ml-[3.5rem] flex flex-col sm:flex-row gap-y-2 sm:gap-x-2 items-center sm:items-start">
						<span className="font-extrabold">Josué </span>
						<span className="font-extrabold">Rocha</span>
					</div>
				</h1>
			</div>

			{/* PHRASES + CTA - Static for instant LCP */}
			<div className="flex flex-col items-center justify-end gap-4 mt-10 mb-32">
				<div className="text-left mx-auto px-4 max-w-3xl space-y-1">
					{PHRASES.map(({ id, text }) => (
						<div key={id} className="text-base sm:text-lg md:text-xl font-medium leading-snug cursor-default">
							{text}
						</div>
					))}
				</div>

				{/* SLOGAN - Static */}
				<p
					onMouseEnter={() => setShowSmiles(true)}
					onMouseLeave={() => setShowSmiles(false)}
					className="text-2xl font-bold font-display text-left max-w-2xl pt-2 hover:text-orange transition-all duration-300"
				>
					— This is my portfolio
				</p>

				{/* ACTION BUTTONS - Static */}
				<div className="flex gap-4 flex-wrap justify-center pt-2">
					{ACTION_LINKS.map(({ href, icon, label }) => (
						<a
							key={label}
							href={href}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel="noopener noreferrer"
							className="button"
							aria-label={`Link to ${label.toLowerCase()}`}
						>
							{icon} {label}
						</a>
					))}
				</div>
			</div>
		</section>
	);
};

export default Hero;
