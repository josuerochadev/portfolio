import type React from "react";
import LetterRippleEffect from "@/components/effects/letter-ripple";
import FadeInUp from "@/components/common/animations/fade-in-up";

const PHRASES = [
	{ id: "phrase-2", text: "a brazilian former lawyer" },
	{ id: "phrase-3", text: "based in France" },
	{ id: "phrase-4", text: "who turned developer" },
	{ id: "phrase-5", text: "in love with clean code" },
	{ id: "phrase-6", text: "and AGILE methodology" },
];

interface HeroPhrasesProps {
	showSmiles: boolean;
	setShowSmiles: (show: boolean) => void;
}

const HeroPhrases: React.FC<HeroPhrasesProps> = ({ showSmiles, setShowSmiles }) => {
	return (
		<>
			<div className="text-left mx-auto px-4 max-w-3xl space-y-1">
				{PHRASES.map(({ id, text }, index) => (
					<FadeInUp key={id} delay={0.2 + index * 0.05}>
						<div className="text-base sm:text-lg md:text-xl font-medium leading-snug cursor-default">
							<LetterRippleEffect text={text} />
						</div>
					</FadeInUp>
				))}
			</div>

			<FadeInUp delay={0.5}>
				<p
					onMouseEnter={() => setShowSmiles(true)}
					onMouseLeave={() => setShowSmiles(false)}
					className="text-2xl font-bold font-display text-left max-w-2xl pt-2 hover:text-orange transition-all duration-300"
					style={{ willChange: "color, transform" }}
				>
					— This is my portfolio
				</p>
			</FadeInUp>
		</>
	);
};

export default HeroPhrases;