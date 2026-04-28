import { useTranslation } from "react-i18next";
import FadeInUpOnScroll from "@/components/common/animations/fade-in-up-on-scroll";
import LetterRippleEffect from "@/components/effects/letter-ripple";
import ProfileBackground from "@/components/effects/profile-background";
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
			<ProfileBackground />
			{/* <PhotoFrame /> */}

			<div className="max-w-6xl mx-auto flex flex-col items-start">
					<FadeInUpOnScroll delay={0.2}>
					<h2 className="relative w-full px-4 text-[clamp(2rem,7vw,6rem)] leading-[1.1] font-display font-extrabold text-violet text-left flex flex-wrap gap-x-2">
						{t('heading').split(" ").map((word) => (
							<LetterRippleEffect key={word} text={`${word} `} />
						))}
					</h2>
				</FadeInUpOnScroll>

					<div className="w-full px-4 mt-6 mb-12">
					<div className="max-w-6xl mx-auto flex flex-wrap gap-x-6 gap-y-2">
						{adjectives.map((word, i) => (
							<FadeInUpOnScroll key={word} delay={0.6 + i * 0.1}>
								<span className="text-lg md:text-xl font-bold">{word}</span>
							</FadeInUpOnScroll>
						))}
					</div>
				</div>

				<Timeline />

					<div className="w-full px-4 max-w-4xl flex flex-col gap-12 text-left mt-12">
					{Object.entries(sections).map(([key, section], i) => (
						<FadeInUpOnScroll key={key} delay={1.8 + i * 0.2}>
							<div>
								<h3 className="text-2xl font-serif font-bold text-violet mb-2 capitalize">
									{section.title}
								</h3>
								<p className="text-base md:text-lg leading-relaxed text-violet">
									{section.text}
								</p>
							</div>
						</FadeInUpOnScroll>
					))}
				</div>
			</div>
		</section>
	);
}
