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

function TimelineGif({ src, className }: { src: string; className?: string }) {
	return (
		<img
			src={src}
			alt=""
			aria-hidden="true"
			className={className}
			loading="lazy"
		/>
	);
}

function TimelineStep({
	step,
	gifSrc,
	gifRef,
	cardRef,
}: {
	step: { period: string; title: string; text: string };
	gifSrc: string;
	gifRef: (el: HTMLDivElement | null) => void;
	cardRef: (el: HTMLElement | null) => void;
}) {
	return (
		<div className="min-h-screen grid grid-cols-1 md:grid-cols-[5fr_3fr] gap-4 md:gap-0">
			{/* GIF */}
			<div
				ref={gifRef}
				className="flex items-center justify-center md:self-center will-change-transform"
			>
				<TimelineGif
					src={gifSrc}
					className="max-h-[95vh] md:max-h-[140vh] w-auto object-contain pointer-events-none select-none"
				/>
			</div>

			{/* Card */}
			<article
				ref={cardRef}
				className="
					md:self-start md:mt-[50vh]
					will-change-transform
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
	const gifRefs = useRef<(HTMLDivElement | null)[]>([]);
	const cardRefs = useRef<(HTMLElement | null)[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	// Active step detection
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

	// Parallax effect (desktop only)
	useEffect(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		if (!mq.matches) return;

		let rafId: number;

		const handleScroll = () => {
			rafId = requestAnimationFrame(() => {
				const vh = window.innerHeight;

				for (let i = 0; i < TIMELINE_KEYS.length; i++) {
					const step = stepRefs.current[i];
					const gif = gifRefs.current[i];
					const card = cardRefs.current[i];
					if (!step || !gif || !card) continue;

					const rect = step.getBoundingClientRect();
					const distFromCenter = rect.top + rect.height / 2 - vh / 2;

					if (Math.abs(distFromCenter) < vh * 2) {
						const maxShift = vh * 0.35;
						const gifY = Math.max(-maxShift, Math.min(maxShift, distFromCenter * -0.25));
						const cardY = Math.max(-maxShift, Math.min(maxShift, distFromCenter * 0.15));
						gif.style.transform = `translateY(${gifY}px)`;
						card.style.transform = `translateY(${cardY}px)`;
					}
				}
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			cancelAnimationFrame(rafId);
		};
	}, []);

	const handleYearClick = useCallback((index: number) => {
		stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
	}, []);

	const years = TIMELINE_KEYS.map(
		(key) => timeline[key].period.match(/\d{4}/)?.[0] ?? "",
	);

	return (
		<div className="relative z-0 w-full md:grid md:grid-cols-[auto_1fr] md:px-[8%]">
			{/* Year picker — sticky sidebar, tighter gap to GIF */}
			<nav className="hidden md:flex sticky top-0 h-screen items-center z-10 -mr-8">
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
							gifRef={(el) => { gifRefs.current[i] = el; }}
							cardRef={(el) => { cardRefs.current[i] = el; }}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
