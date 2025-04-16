import type React from "react";
import { useState } from "react";
import { FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import LetterRippleEffect from "@/components/effects/letter_ripple";
import SmileGrid from "@/components/effects/smile_grid";
import FadeInUp from "@/components/common/animations/fade_in_up";
import FadeInDown from "@/components/common/animations/fade_in_down";

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
			className="relative flex flex-col justify-between min-h-[calc(100vh-6rem)] px-6 pt-12 pb-10 text-violet overflow-hidden"
		>
			<SmileGrid active={showSmiles} />

			{/* TITLE */}
			<div className="flex flex-col items-center justify-start">
				<FadeInDown delay={0.6}>
					<h1 className="relative text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] font-extrabold font-display text-left">
						<span className="absolute left-0 -top-6 text-xl md:text-2xl font-normal text-violet">
							I’m
						</span>
						<div className="flex flex-wrap gap-x-2 ml-[3.5rem]">
							<LetterRippleEffect text="Josué Rocha" />
						</div>
					</h1>
				</FadeInDown>
			</div>

			{/* PHRASES + CTA */}
			<div className="flex flex-col items-center justify-end gap-4 mt-10 mb-32">
				<div className="text-left mx-auto px-4 max-w-3xl space-y-1">
					{PHRASES.map(({ id, text }, index) => (
						<FadeInUp key={id} delay={0.8 + index * 0.15}>
							<div className="text-base sm:text-lg md:text-xl font-medium leading-snug cursor-default">
								<LetterRippleEffect text={text} />
							</div>
						</FadeInUp>
					))}
				</div>

				{/* SLOGAN */}
				<FadeInUp delay={1.5}>
					<p
						onMouseEnter={() => setShowSmiles(true)}
						onMouseLeave={() => setShowSmiles(false)}
						className="text-2xl font-bold font-display text-left max-w-2xl pt-2"
					>
						— This is my portfolio
					</p>
				</FadeInUp>

				{/* ACTION BUTTONS */}
				<div className="flex gap-4 flex-wrap justify-center pt-2">
					{ACTION_LINKS.map(({ href, icon, label, delay }) => (
						<FadeInUp key={label} delay={delay}>
							<a
								href={href}
								target={href.startsWith("http") ? "_blank" : undefined}
								rel="noopener noreferrer"
								className="button"
								aria-label={`Link to ${label.toLowerCase()}`}
							>
								{icon} {label}
							</a>
						</FadeInUp>
					))}
				</div>
			</div>
		</section>
	);
};

export default Hero;
