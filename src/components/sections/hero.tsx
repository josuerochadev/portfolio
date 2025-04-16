// src/components/hero.tsx
import type React from "react";
import { useState } from "react";
import { FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUpSpring, fadeInDownSpring } from "../../utils/motion_variants";
import LetterRippleEffect from "../effects/letter_ripple";
import SmileGrid from "../effects/smile_grid";

const PHRASES = [
	{ id: "phrase-2", text: "a brazilian former lawyer" },
	{ id: "phrase-3", text: "based in France" },
	{ id: "phrase-4", text: "who turned developer" },
	{ id: "phrase-5", text: "in love with clean code" },
	{ id: "phrase-6", text: "and AGILE methodology" },
];

const ACTION_LINKS = [
	{
		href: "/resume.pdf",
		icon: <FaFileAlt className="inline-block mr-2" />,
		label: "RESUME",
		delay: 1.7,
	},
	{
		href: "https://github.com/josuexrocha",
		icon: <FaGithub className="inline-block mr-2" />,
		label: "GITHUB",
		delay: 1.85,
	},
	{
		href: "https://www.linkedin.com/in/josuexrocha/",
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
			className="relative flex flex-col justify-between min-h-[calc(100vh-6rem)] px-6 pt-8 pb-10 text-violet overflow-hidden"
		>
			<SmileGrid active={showSmiles} />

			{/* TITLE */}
			<div className="flex flex-col items-center justify-start">
				<motion.div
					className="w-full max-w-7xl flex justify-center"
					variants={fadeInDownSpring}
					initial="initial"
					animate="animate"
					transition={{ delay: 0.6 }}
				>
					<h1 className="relative text-[clamp(4rem,13vw,11rem)] leading-[0.85] font-extrabold font-display text-left">
						<span className="absolute left-0 -top-6 text-xl md:text-2xl font-normal text-violet">
							I’m
						</span>
						<div className="flex flex-wrap gap-x-2 ml-[3.5rem]">
							<LetterRippleEffect text="Josué Rocha" />
						</div>
					</h1>
				</motion.div>
			</div>

			{/* PHRASES + CTA */}
			<div className="flex flex-col items-center justify-end gap-4 mt-10 mb-32">
				<div className="text-left mx-auto px-4 max-w-3xl space-y-1">
					{PHRASES.map(({ id, text }, index) => (
						<motion.div
							key={id}
							className="text-base sm:text-lg md:text-xl font-medium leading-snug cursor-default"
							variants={fadeInUpSpring}
							initial="initial"
							animate="animate"
							transition={{
								...fadeInUpSpring.transition,
								delay: 0.8 + index * 0.15,
							}}
						>
							<LetterRippleEffect text={text} />
						</motion.div>
					))}
				</div>

				{/* SLOGAN */}
				<motion.p
					onMouseEnter={() => setShowSmiles(true)}
					onMouseLeave={() => setShowSmiles(false)}
					className="text-2xl font-bold font-display text-left max-w-2xl pt-2"
					variants={fadeInUpSpring}
					initial="initial"
					animate="animate"
					whileHover={{
						scale: 1.1,
						color: "#ff7a00",
						transition: { duration: 0.3 },
					}}
					transition={{ delay: 1.5 }}
				>
					— This is my portfolio
				</motion.p>

				{/* ACTION BUTTONS */}
				<div className="flex gap-4 flex-wrap justify-center pt-2">
					{ACTION_LINKS.map(({ href, icon, label, delay }) => (
						<motion.div
							key={label}
							variants={fadeInUpSpring}
							initial="initial"
							animate="animate"
							transition={{ ...fadeInUpSpring.transition, delay }}
						>
							<a
								href={href}
								target={href.startsWith("http") ? "_blank" : undefined}
								rel="noopener noreferrer"
								className="button"
								aria-label={`Link to ${label.toLowerCase()}`}
							>
								{icon} {label}
							</a>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Hero;
