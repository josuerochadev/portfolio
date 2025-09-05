import type React from "react";
import { useTranslation } from "react-i18next";
import LetterRippleEffect from "@/components/effects/letter-ripple";
import FadeInDown from "@/components/common/animations/fade-in-down";
import { ANIMATION, COLORS } from "@/constants";

const HeroTitle: React.FC = () => {
	const { t } = useTranslation('hero');
	return (
		<div className="flex flex-col items-center justify-start pt-8 sm:pt-12 mb-12 xs:mb-10 sm:mb-8 md:mb-0 relative z-10 px-2">
			<FadeInDown delay={ANIMATION.DELAYS.VERY_SHORT}>
				<h1 className="relative text-[clamp(4rem,12vw,12rem)] leading-[0.9] xs:leading-[0.85] sm:leading-[0.85] font-extrabold font-display text-left">
					<span className={`absolute left-0 -top-4 sm:-top-6 text-lg sm:text-xl md:text-2xl font-normal tracking-wide ${COLORS.VIOLET.TEXT}`}>
						{t('intro')}
					</span>
					<div className="ml-0 sm:ml-[3.5rem] flex flex-col sm:flex-row gap-y-2 sm:gap-x-2 items-center sm:items-start">
						<LetterRippleEffect text="Josué " />
						<LetterRippleEffect text="Rocha" />
					</div>
				</h1>
			</FadeInDown>
		</div>
	);
};

export default HeroTitle;