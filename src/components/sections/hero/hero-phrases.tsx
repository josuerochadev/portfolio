import type React from "react";
import { useTranslation } from "react-i18next";
import LetterRippleEffect from "@/components/effects/letter-ripple";
import FadeInUp from "@/components/common/animations/fade-in-up";
import { ANIMATION, COLORS, TRANSITIONS } from "@/constants";

interface HeroPhrasesProps {
	setShowSmiles: (show: boolean) => void;
}

const HeroPhrases: React.FC<HeroPhrasesProps> = ({ setShowSmiles }) => {
	const { t } = useTranslation('hero');
	const phrases = t('phrases', { returnObjects: true }) as string[];
	return (
		<>
			<div className="text-left mx-auto px-4 max-w-3xl space-y-1">
				{phrases.map((phrase, index) => (
					<FadeInUp key={`phrase-${index}`} delay={ANIMATION.DELAYS.SHORT + index * ANIMATION.DELAYS.VERY_SHORT}>
						<div className="text-base sm:text-lg md:text-xl font-medium leading-snug cursor-default">
							<LetterRippleEffect text={phrase} />
						</div>
					</FadeInUp>
				))}
			</div>

			<p
				onMouseEnter={() => setShowSmiles(true)}
				onMouseLeave={() => setShowSmiles(false)}
				className={`text-2xl font-bold font-display text-left max-w-2xl pt-2 ${COLORS.ORANGE.HOVER_TEXT} ${TRANSITIONS.DEFAULT}`}
			>
				{t('tagline')}
			</p>
		</>
	);
};

export default HeroPhrases;