import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import FadeInUpOnScroll from "@/components/common/animations/fade-in-up-on-scroll";
import LetterRippleEffect from "@/components/effects/letter-ripple";
import { motion } from "framer-motion";

const handImage = "/assets/images/ui/hand-test.webp";

const SOCIAL_LINKS = [
	{
		href: "https://github.com/josuexrocha",
		icon: <FaGithub className="inline-block mr-2" />,
		label: "GITHUB",
	},
	{
		href: "https://www.linkedin.com/in/josuexrocha/",
		icon: <FaLinkedin className="inline-block mr-2" />,
		label: "LINKEDIN",
	},
	{
		href: "mailto:josuexr@icloud.com",
		icon: <FaEnvelope className="inline-block mr-2" />,
		label: "EMAIL",
	},
];

export default function Contact() {
	const { t } = useTranslation('projects');
	return (
		<section
			id="contact"
			className="relative px-6 pt-32 pb-56 min-h-[80vh] text-center overflow-hidden"
		>
			{/* LIGHT STRIP BOTTOM */}
			<div className="absolute bottom-0 left-0 w-full h-12 bg-lime dark:bg-lime/40 opacity-60 dark:opacity-30 blur-2xl z-[1] pointer-events-none" />

			{/* HAND SVG */}
			<div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none dark:opacity-20 transition-opacity duration-300">
				<motion.img
					src={handImage}
					alt={t('contact.handAlt')}
					className="w-full max-w-[1400px] h-auto select-none pb-24"
					initial={{ opacity: 0, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					style={{ willChange: "transform" }}
					transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.99] }}
					viewport={{ once: true, amount: 0.3 }}
					loading="lazy"
				/>
			</div>

			{/* TITLE */}
			<FadeInUpOnScroll delay={0.2}>
				<h2 className="relative z-10 text-[clamp(2rem,6vw,5rem)] leading-tight font-display font-extrabold text-violet dark:text-beige flex flex-wrap justify-center gap-x-2">
					{t('contact.heading').split(" ").map((word) => (
						<LetterRippleEffect key={word} text={`${word} `} />
					))}
				</h2>
			</FadeInUpOnScroll>

			{/* CARD */}
			<FadeInUpOnScroll delay={0.4}>
				<div className="relative z-10 max-w-xl mx-auto mt-8 bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5 dark:from-lime/10 dark:via-orange/5 dark:to-violet/10 backdrop-blur-md border border-lime/30 dark:border-lime/20 rounded-2xl shadow-card p-8">
					<p className="text-base sm:text-lg font-display font-light text-violet dark:text-beige leading-relaxed mb-6">
						{t('contact.description')}
					</p>
					<div className="flex gap-4 flex-wrap justify-center">
						{SOCIAL_LINKS.map(({ href, icon, label }) => (
							<a
								key={label}
								href={href}
								target={href.startsWith("mailto") ? undefined : "_blank"}
								rel="noopener noreferrer"
								className="px-4 py-2 rounded-full bg-orange/10 text-orange-dark dark:text-orange border border-orange/20
								hover:bg-orange hover:text-beige dark:hover:bg-orange/20 dark:hover:text-orange
								transition-all duration-300
								inline-flex items-center gap-2 font-medium text-sm
								hover:shadow-cta hover:scale-105 active:scale-95"
								aria-label={`Link to ${label.toLowerCase()}`}
							>
								{icon} {label}
							</a>
						))}
					</div>
				</div>
			</FadeInUpOnScroll>
		</section>
	);
}
