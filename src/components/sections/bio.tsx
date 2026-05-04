import { useTranslation } from "react-i18next";
import FadeInUpOnScroll from "@/components/common/animations/fade-in-up-on-scroll";
import LetterRippleEffect from "@/components/effects/letter-ripple";
import LayeredIconBackground from "@/components/effects/layered-icon-background";
import { FaUser, FaStar } from "react-icons/fa";
// import PhotoFrame from "@/components/layout/photo-frame";
import Timeline from "@/components/sections/bio/timeline";

export default function Bio() {
	const { t } = useTranslation('bio');

	const adjectives = Object.values(t('adjectives', { returnObjects: true })) as string[];
	const sections = t('sections', { returnObjects: true }) as Record<string, { title: string; text: string }>;
	return (
		<section
			id="bio"
			className="relative z-10 w-full px-6 py-20 text-violet"
		>
			<div className="max-w-6xl mx-auto flex flex-col items-start">
					<FadeInUpOnScroll delay={0.2}>
					<h2 className="relative w-full px-4 text-[clamp(2rem,7vw,6rem)] leading-[1.1] font-display font-extrabold text-violet text-left flex flex-wrap gap-x-2">
						{t('heading').split(" ").map((word) => (
							<LetterRippleEffect key={word} text={`${word} `} />
						))}
					</h2>
				</FadeInUpOnScroll>

					<div className="relative z-10 w-full px-4 mt-6 mb-6">
					<div className="max-w-6xl mx-auto flex flex-wrap gap-x-6 gap-y-2">
						{adjectives.map((word, i) => (
							<FadeInUpOnScroll key={word} delay={0.6 + i * 0.1}>
								<span className="text-lg md:text-xl font-bold">{word}</span>
							</FadeInUpOnScroll>
						))}
					</div>
				</div>

				<Timeline />

				<div className="w-full px-4 mt-24 md:mt-32 flex justify-start">
					<div className="w-24 h-px bg-gradient-to-r from-lime/60 to-transparent" />
				</div>

				<div className="w-full px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left">
					{Object.entries(sections).map(([key, section], i) => (
						<FadeInUpOnScroll key={key} delay={0.2 + i * 0.15}>
							<div className="relative min-h-[120px]">
								<h3 className="text-2xl font-serif font-bold text-violet mb-2 capitalize">
									{section.title}
								</h3>
								<p className="text-base md:text-lg leading-relaxed text-violet">
									{section.text}
								</p>
								<LayeredIconBackground
									icon={i === 0 ? FaUser : FaStar}
									align={i === 0 ? "left" : "right"}
								/>
							</div>
						</FadeInUpOnScroll>
					))}
				</div>
			</div>
		</section>
	);
}
