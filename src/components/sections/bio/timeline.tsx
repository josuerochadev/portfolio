import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const TIMELINE_KEYS = ["law", "france", "firstCode", "cda", "mainframe", "now"];
const TIMELINE_IMAGES = [
	"/assets/videos/bio/1.webp",
	"/assets/videos/bio/2.webp",
	"/assets/videos/bio/3.webp",
	"/assets/videos/bio/4.webp",
	"/assets/videos/bio/5.webp",
	"/assets/videos/bio/6.webp",
];

function TimelineImage({ src, className }: { src: string; className?: string }) {
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
	imageSrc,
	imageRef,
	cardRef,
	index,
}: {
	step: { period: string; title: string; text: string };
	imageSrc: string;
	imageRef: (el: HTMLDivElement | null) => void;
	cardRef: (el: HTMLDivElement | null) => void;
	index: number;
}) {
	const isEven = index % 2 === 0;

	return (
		<div className="relative min-h-screen flex items-center justify-center">
			{/* GIF — offset to one side, zig-zag */}
			<div
				ref={imageRef}
				className={`
					absolute inset-0 flex items-center will-change-transform pointer-events-none
					${isEven ? "justify-start md:pl-[2%]" : "justify-end md:pr-[2%]"}
				`}
			>
				<TimelineImage
					src={imageSrc}
					className="max-h-[95vh] md:max-h-[140vh] w-auto max-w-[70%] md:max-w-[60%] object-contain select-none"
				/>
			</div>

			{/* Card — parallax wrapper + entrance animation inside */}
			<div
				ref={cardRef}
				className={`
					relative z-10 will-change-transform
					w-[85%] max-w-md
					${isEven ? "ml-auto md:mr-[5%]" : "mr-auto md:ml-[5%]"}
				`}
			>
				<motion.article
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
					className="
						bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
						dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
						backdrop-blur-md border border-lime/30 dark:border-lime/20 rounded-2xl shadow-md
						px-5 md:px-6 py-4 md:py-5
						flex flex-col justify-center
						hover:shadow-lg hover:scale-[1.01]
						transition-shadow duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]
					"
				>
					<span className="text-xs md:text-sm font-display font-semibold text-orange/70 tracking-wide uppercase mb-1">
						{step.period}
					</span>
					<h3 className="text-lg md:text-xl lg:text-2xl font-extrabold font-display leading-snug text-violet dark:text-beige">
						{step.title}
					</h3>
					<p className="text-sm md:text-base leading-relaxed text-violet/80 dark:text-beige/70 mt-3">
						{step.text}
					</p>
				</motion.article>
			</div>
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
	const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
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

	// Parallax effect with lerp smoothing (respects reduced motion)
	useEffect(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (prefersReducedMotion.matches) return;

		const currentGifY = new Array(TIMELINE_KEYS.length).fill(0);
		const currentCardY = new Array(TIMELINE_KEYS.length).fill(0);
		let rafId: number;
		let isRunning = true;

		const lerp = (current: number, target: number, factor: number) =>
			current + (target - current) * factor;

		const animate = () => {
			if (!isRunning) return;
			const vh = window.innerHeight;

			for (let i = 0; i < TIMELINE_KEYS.length; i++) {
				const step = stepRefs.current[i];
				const gif = imageRefs.current[i];
				const card = cardRefs.current[i];
				if (!step || !gif || !card) continue;

				const rect = step.getBoundingClientRect();
				const distFromCenter = rect.top + rect.height / 2 - vh / 2;

				const maxShift = vh * 0.4;
				const targetGifY = Math.max(-maxShift, Math.min(maxShift, distFromCenter * -0.08));
				const targetCardY = Math.max(-maxShift, Math.min(maxShift, distFromCenter * -0.22));

				currentGifY[i] = lerp(currentGifY[i], targetGifY, 0.08);
				currentCardY[i] = lerp(currentCardY[i], targetCardY, 0.08);

				gif.style.transform = `translateY(${currentGifY[i]}px)`;
				card.style.transform = `translateY(${currentCardY[i]}px)`;
			}

			rafId = requestAnimationFrame(animate);
		};

		rafId = requestAnimationFrame(animate);

		return () => {
			isRunning = false;
			cancelAnimationFrame(rafId);
		};
	}, []);

	const handleYearClick = useCallback((index: number) => {
		stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
	}, []);

	const years = TIMELINE_KEYS.map(
		(key) => timeline[key].period.match(/\d{4}/)?.[0] ?? "",
	);

	return (
		<div className="relative z-0 w-full">
			{/* Year picker — horizontal, sticky on scroll */}
			<nav aria-label="Timeline navigation" className="sticky top-4 sm:top-6 z-20 ml-4 md:ml-0 w-fit rounded-full flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5 dark:from-lime/10 dark:via-orange/5 dark:to-violet/10 backdrop-blur-md border border-lime/30 dark:border-lime/20 shadow-lg hover:shadow-xl hover:bg-lime dark:hover:bg-lime/20 active:scale-95 transition-transform duration-150 mb-6">
				{years.map((year, i) => (
					<React.Fragment key={year}>
						{i > 0 && <span className="text-violet/20 dark:text-beige/20 text-xs select-none" aria-hidden="true">&bull;</span>}
						<button
							type="button"
							onClick={() => handleYearClick(i)}
							className={`
								font-sans font-bold text-xs sm:text-sm uppercase tracking-wider
								transition-all duration-300 cursor-pointer active:scale-95
								${i === activeIndex
									? "text-orange"
									: "text-violet dark:text-beige hover:text-orange-dark dark:hover:text-orange"
								}
							`}
						>
							{year}
						</button>
					</React.Fragment>
				))}
			</nav>

			{/* Steps */}
			<div className="flex flex-col gap-y-[10vh] md:gap-y-[20vh] md:px-[8%]">
				{TIMELINE_KEYS.map((key, i) => (
					<div
						key={key}
						ref={(el) => { stepRefs.current[i] = el; }}
						data-index={i}
					>
						<TimelineStep
							step={timeline[key]}
							imageSrc={TIMELINE_IMAGES[i]}
							imageRef={(el) => { imageRefs.current[i] = el; }}
							cardRef={(el) => { cardRefs.current[i] = el; }}
							index={i}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
