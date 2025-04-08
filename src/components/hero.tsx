import type React from "react";
import { useEffect, useState } from "react";
import { FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
	const [scrollY, setScrollY] = useState(0);
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const phrases = [
		{
			id: "phrase-1",
			text: "I’m Josué Rocha",
			className: "text-5xl font-extrabold font-display",
		},
		{ id: "phrase-2", text: "a brazilian former lawyer" },
		{ id: "phrase-3", text: "based in France" },
		{ id: "phrase-4", text: "who turned developer" },
		{ id: "phrase-5", text: "in love with clean code" },
		{ id: "phrase-6", text: "and AGILE methodology" },
		{
			id: "phrase-7",
			text: "— This is my portfolio",
			className: "text-2xl font-bold pt-6 font-display",
		},
	];

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};
		const handleResize = () => {
			setDimensions({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<section
			id="hero"
			className="relative flex items-center justify-center h-screen overflow-hidden px-4"
		>
			{/* Contenu principal */}
			<div className="flex flex-col items-start text-left text-violet font-sans space-y-2">
				{phrases.map(({ id, text, className }, index) => (
					<motion.p
						key={id}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.15, type: "spring", stiffness: 80 }}
						className={`${className || "text-xl font-sans font-extrabold"} leading-snug`}
					>
						{text}
					</motion.p>
				))}

				<motion.div
					className="flex gap-4 pt-8"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: phrases.length * 0.15 + 0.2, type: "spring" }}
				>
					<a href="/resume.pdf" className="button">
						<FaFileAlt className="inline-block mr-2" /> RESUME
					</a>
					<a
						href="https://github.com/josuexrocha"
						target="_blank"
						rel="noopener noreferrer"
						className="button"
					>
						<FaGithub className="inline-block mr-2" /> GITHUB
					</a>
					<a
						href="https://www.linkedin.com/in/josuexrocha/"
						target="_blank"
						rel="noopener noreferrer"
						className="button"
					>
						<FaLinkedin className="inline-block mr-2" /> LINKEDIN
					</a>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
