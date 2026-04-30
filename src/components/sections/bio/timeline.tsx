import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

const TIMELINE_KEYS = ["law", "france", "firstCode", "cda", "mainframe", "now"];
const TIMELINE_GIFS = [
	"/assets/videos/bio/1.gif",
	"/assets/videos/bio/2.gif",
	"/assets/videos/bio/3.gif",
	"/assets/videos/bio/4.gif",
	"/assets/videos/bio/5.gif",
	"/assets/videos/bio/6.gif",
];

function TimelineStep({
	step,
	gifSrc,
}: {
	step: { period: string; title: string; text: string };
	gifSrc: string;
}) {
	return (
		<div className="min-h-screen grid grid-cols-1 md:grid-cols-[5fr_3fr] items-center gap-4 md:gap-0">
			{/* GIF */}
			<div className="flex items-center justify-center">
				<img
					src={gifSrc}
					alt=""
					aria-hidden="true"
					className="max-h-[80vh] md:max-h-[100vh] w-auto object-contain pointer-events-none select-none"
					loading="lazy"
				/>
			</div>

			{/* Card */}
			<article
				className="
					w-[90%] mx-auto md:w-full md:-ml-[15%]
					bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
					backdrop-blur-md border border-lime/30 rounded-2xl shadow-md
					px-5 md:px-6 py-4 md:py-5
					flex flex-col justify-center
					hover:shadow-lg
					transition-shadow duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]
				"
			>
				<h4 className="text-lg md:text-xl lg:text-2xl font-extrabold font-display leading-snug text-violet">
					{step.title}
				</h4>
				<p className="text-sm md:text-base leading-relaxed text-violet/80 mt-3">
					{step.text}
				</p>
			</article>
		</div>
	);
}

export default function Timeline() {
	const { t } = useTranslation("bio");
	const timeline = t("timeline", { returnObjects: true }) as Record<
		string,
		{ period: string; title: string; text: string }
	>;

	const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveIndex(Number(entry.target.dataset.index));
					}
				}
			},
			{ threshold: 0.3 },
		);

		for (const ref of stepRefs.current) {
			if (ref) observer.observe(ref);
		}

		return () => observer.disconnect();
	}, []);

	const handleYearClick = useCallback((index: number) => {
		stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
	}, []);

	const years = TIMELINE_KEYS.map(
		(key) => timeline[key].period.match(/\d{4}/)?.[0] ?? "",
	);

	return (
		<div className="w-full md:grid md:grid-cols-[auto_1fr] md:px-[8%]">
			{/* Year picker — sticky sidebar, single instance */}
			<nav className="hidden md:flex sticky top-0 h-screen items-center pr-0">
				<div className="flex flex-col gap-3 items-end">
					{years.map((year, i) => (
						<button
							key={year}
							type="button"
							onClick={() => handleYearClick(i)}
							className={`
								font-display transition-all duration-300 cursor-pointer
								${i === activeIndex
									? "text-orange font-bold text-lg"
									: "text-violet/30 hover:text-violet/60 text-sm"
								}
							`}
						>
							{year}
						</button>
					))}
				</div>
			</nav>

			{/* Steps */}
			<div className="flex flex-col gap-y-[10vh] md:gap-y-[20vh]">
				{TIMELINE_KEYS.map((key, i) => (
					<div
						key={key}
						ref={(el) => { stepRefs.current[i] = el; }}
						data-index={i}
					>
						<TimelineStep
							step={timeline[key]}
							gifSrc={TIMELINE_GIFS[i]}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
