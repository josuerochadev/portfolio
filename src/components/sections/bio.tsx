import FadeInUpOnScroll from "@/components/common/animations/fade_in_up_on_scroll";
import LetterRippleEffect from "@/components/effects/letter_ripple";
import ProfileBackground from "@/components/effects/profile_background";

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
				<FadeInUpOnScroll delay={0.2}>
					<h2 className="relative w-full px-4 text-[clamp(2rem,7vw,6rem)] leading-[1.1] font-display font-extrabold text-violet text-center flex flex-wrap justify-left gap-x-2">
						{"And more about me".split(" ").map((word) => (
							<LetterRippleEffect key={word} text={`${word} `} />
						))}
					</h2>
				</FadeInUpOnScroll>

				{/* ADJECTIVES */}
				<div className="w-full px-4">
					<div className="max-w-6xl mx-auto flex flex-wrap justify-start gap-6 mt-4 mb-20">
						{ADJECTIVES.map((word, i) => (
							<FadeInUpOnScroll key={word} delay={0.6 + i * 0.1}>
								<span className="text-lg md:text-xl font-bold">{word}</span>
							</FadeInUpOnScroll>
						))}
					</div>
				</div>

				{/* TEXT BLOCK */}
				<div className="w-full px-4 max-w-4xl flex flex-col gap-20 text-center md:text-left">
					{SECTIONS.map((section, i) => (
						<FadeInUpOnScroll key={section.title} delay={1 + i * 0.2}>
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
