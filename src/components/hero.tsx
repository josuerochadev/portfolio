import type React from "react";
import { useEffect, useState } from "react";
import { FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUpSpring, fadeInDownSpring } from "../utils/motion_variants";
import LetterRippleEffect from "./letter_ripple_effect";
import SmileGrid from "./smile_grid";

const Hero: React.FC = () => {
	const [, setScrollY] = useState(0);
	const [, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [showSmiles, setShowSmiles] = useState(false);

	const phrases = [
		{ id: "phrase-2", text: "a brazilian former lawyer" },
		{ id: "phrase-3", text: "based in France" },
		{ id: "phrase-4", text: "who turned developer" },
		{ id: "phrase-5", text: "in love with clean code" },
		{ id: "phrase-6", text: "and AGILE methodology" },
	];

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		const handleResize = () =>
			setDimensions({ width: window.innerWidth, height: window.innerHeight });
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
			className="relative flex flex-col justify-between min-h-[calc(100vh-6rem)] px-6 pt-8 pb-10 bg-beige dark:bg-darkgray text-violet overflow-hidden"
		>
			{/* Smile Grid Background */}
			<SmileGrid active={showSmiles} />

			{/* TITLE BLOCK */}
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

			{/* PHRASES + SLOGAN + BUTTONS BLOCK */}
			<div className="flex flex-col items-center justify-end gap-4 mt-10 mb-16">
				<div className="text-left mx-auto px-4 max-w-3xl space-y-1">
					{phrases.map(({ id, text }, index) => (
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

				<motion.p
					onMouseEnter={() => setShowSmiles(true)}
					onMouseLeave={() => setShowSmiles(false)}
					className="text-2xl font-bold font-display text-left max-w-2xl pt-2"
					variants={fadeInUpSpring}
					initial="initial"
					animate="animate"
					whileHover={{
						scale: 1.1,
						color: "#ff7a00", // Tailwind "orange" approx in hex
						transition: { duration: 0.3 },
					}}
					transition={{ delay: 1.5 }}
				>
					— This is my portfolio
				</motion.p>

				<div className="flex gap-4 flex-wrap justify-center pt-2">
					{[
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
					].map(({ href, icon, label, delay }) => (
						<motion.div
							key={label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay,
								type: "spring",
								stiffness: 100,
								damping: 20,
							}}
						>
							<a
								href={href}
								target={href.startsWith("http") ? "_blank" : undefined}
								rel="noopener noreferrer"
								className="button"
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
