import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeInUpOnScroll from "@/components/common/animations/fade-in-up-on-scroll";

const TIMELINE_KEYS = ["law", "france", "firstCode", "cda", "mainframe", "now"];

function TimelineLine() {
	const lineRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: lineRef,
		offset: ["start 80%", "end 20%"],
	});
	const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

	return (
		<div ref={lineRef} className="absolute inset-0 flex justify-center pointer-events-none">
			<motion.div
				className="w-[6px] md:w-[8px] h-full rounded-full origin-top"
				style={{
					scaleY,
					background: "linear-gradient(to bottom, rgba(105,0,255,0.3), rgba(255,122,0,0.5), rgba(181,255,0,0.6))",
				}}
			/>
		</div>
	);
}

export default function Timeline() {
	const { t } = useTranslation("bio");
	const timeline = t("timeline", { returnObjects: true }) as Record<
		string,
		{ year: string; title: string; text: string }
	>;

	return (
		<div className="w-full px-4 max-w-5xl relative">
			<TimelineLine />

			<div className="flex flex-col gap-6 md:gap-10">
				{TIMELINE_KEYS.map((key, i) => {
					const step = timeline[key];
					const isEven = i % 2 === 0;

					return (
						<FadeInUpOnScroll key={key} delay={0.8 + i * 0.12}>
							{/* Mobile layout */}
							<div className="md:hidden relative flex items-start gap-4">
								<div className="relative z-10 flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-violet/30 border-[3px] border-beige shadow-sm" />
								<div
									className="flex-1 bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
									backdrop-blur-md border border-lime/30 rounded-2xl shadow-md p-4
									hover:shadow-lg transition-all duration-300"
								>
									<div className="flex items-end gap-3 mb-2">
										<span className="text-4xl font-display font-extralight text-orange-dark leading-none">
											{step.year}
										</span>
									</div>
									<h4 className="text-xl font-display font-extrabold text-violet">
										{step.title}
									</h4>
									<p className="text-sm leading-relaxed text-violet/80 mt-2">
										{step.text}
									</p>
								</div>
							</div>

							{/* Desktop layout — alternating sides */}
							<div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] items-center">
								{/* Left content or spacer */}
								<div className={isEven ? "pr-6" : ""}>
									{isEven && (
										<div
											className="bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
											backdrop-blur-md border border-lime/30 rounded-2xl shadow-md p-5
											hover:shadow-lg hover:scale-[1.01]
											transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]"
										>
											<div className="flex items-end gap-3 mb-2">
												<span className="text-5xl font-display font-extralight text-orange-dark leading-none">
													{step.year}
												</span>
											</div>
											<h4 className="text-2xl font-display font-extrabold text-violet mt-1">
												{step.title}
											</h4>
											<p className="text-base leading-relaxed text-violet/80 mt-2">
												{step.text}
											</p>
										</div>
									)}
								</div>

								{/* Center dot */}
								<div className="flex justify-center">
									<div className="relative z-10 w-5 h-5 rounded-full bg-violet/30 border-[3px] border-beige shadow-sm" />
								</div>

								{/* Right content or spacer */}
								<div className={!isEven ? "pl-6" : ""}>
									{!isEven && (
										<div
											className="bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
											backdrop-blur-md border border-lime/30 rounded-2xl shadow-md p-5
											hover:shadow-lg hover:scale-[1.01]
											transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]"
										>
											<div className="flex items-end gap-3 mb-2">
												<span className="text-5xl font-display font-extralight text-orange-dark leading-none">
													{step.year}
												</span>
											</div>
											<h4 className="text-2xl font-display font-extrabold text-violet mt-1">
												{step.title}
											</h4>
											<p className="text-base leading-relaxed text-violet/80 mt-2">
												{step.text}
											</p>
										</div>
									)}
								</div>
							</div>
						</FadeInUpOnScroll>
					);
				})}
			</div>
		</div>
	);
}
