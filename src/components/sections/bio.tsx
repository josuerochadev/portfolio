// src/components/bio.tsx
import { motion } from "framer-motion";
import { fadeInUpSpring } from "../../utils/motion_variants";
import LetterRippleEffect from "../effects/letter_ripple";
import ProfileBackground from "../effects/profile_background";

const ADJECTIVES = ["creative", "curious", "empathetic", "resilient", "bold"];

const SECTIONS = [
	{
		title: "approach",
		text: "My work is guided by thoughtful planning, clean and reusable code, and a collaborative spirit. I believe that design and development walk hand in hand.",
	},
	{
		title: "background",
		text: "I started my career as a lawyer in Brazil, then moved to France, where I transitioned into tech. My experience taught me analytical thinking, empathy, and adaptability.",
	},
	{
		title: "beyond code",
		text: "Outside of development, I love cinema, running, dogs, and cooking. These hobbies keep me balanced and continuously inspired.",
	},
];

export default function Bio() {
	return (
		<section
			id="bio"
			className="relative z-10 w-full px-6 py-20 text-violet overflow-hidden"
		>
			<ProfileBackground />

			<div className="max-w-6xl mx-auto flex flex-col items-center">
				{/* TITLE */}
				<motion.h2
					className="relative w-full px-4 text-[clamp(2rem,7vw,7rem)] leading-[1.1] font-display font-extrabold text-violet text-center flex flex-wrap justify-left gap-x-2"
					variants={fadeInUpSpring}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true, amount: 0.7 }}
					transition={{ delay: 0.6 }}
				>
					{"And more about me".split(" ").map((word) => (
						<LetterRippleEffect key={word} text={`${word} `} />
					))}
				</motion.h2>

				{/* ADJECTIVES */}
				<div className="w-full px-4">
					<div className="max-w-6xl mx-auto flex flex-wrap justify-start gap-6 mt-4 mb-20">
						{ADJECTIVES.map((word, i) => (
							<motion.span
								key={word}
								className="text-lg md:text-xl font-bold"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.5 }}
								transition={{
									delay: 0.8 + i * 0.1,
									type: "spring",
									stiffness: 100,
								}}
							>
								{word}
							</motion.span>
						))}
					</div>
				</div>

				{/* TEXT BLOCK */}
				<div className="w-full px-4 max-w-4xl flex flex-col gap-20 text-center md:text-left">
					{SECTIONS.map((section, i) => (
						<motion.div
							key={section.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.6 }}
							transition={{
								delay: 1 + i * 0.2,
								type: "spring",
								stiffness: 100,
							}}
						>
							<h3 className="text-2xl font-serif font-bold text-violet mb-2 capitalize">
								{section.title}
							</h3>
							<p className="text-base md:text-lg leading-relaxed text-violet">
								{section.text}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
