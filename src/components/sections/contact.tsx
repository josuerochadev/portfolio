import FadeInUpOnScroll from "@/components/common/animations/fade_in_up_on_scroll";
import LetterRippleEffect from "@/components/effects/letter_ripple";
import Hand from "@/assets/images/ui/hand.svg?react";
import { motion } from "framer-motion";

export default function Contact() {
	return (
		<section
			id="contact"
			className="relative px-6 py-32 md:py-48 min-h-[65vh] text-center overflow-hidden"
		>
			{/* TITLE */}
			<FadeInUpOnScroll delay={0.2}>
				<h2 className="relative z-10 text-[clamp(2rem,6vw,5rem)] leading-tight font-display font-extrabold text-violet flex flex-wrap justify-center gap-x-2">
					{"Let's work together! Or just chat".split(" ").map((word) => (
						<LetterRippleEffect key={word} text={`${word} `} />
					))}
				</h2>
			</FadeInUpOnScroll>

			{/* SVG */}
			<motion.div
				className="absolute bottom-0 left-0 w-full max-w-[1400px] z-0 pointer-events-none"
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.99] }}
				viewport={{ once: true, amount: 0.3 }}
			>
				<Hand className="w-full h-auto" />
			</motion.div>
		</section>
	);
}
