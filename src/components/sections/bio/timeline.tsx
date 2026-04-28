import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";

const TIMELINE_KEYS = ["law", "france", "firstCode", "cda", "mainframe", "now"];

const TOTAL_CARDS = TIMELINE_KEYS.length;
const STICKY_BASE = 80;
const STICKY_OFFSET = 32;
const BAR_COUNT = 20;

function ProgressBar({ progress }: { progress: ReturnType<typeof useTransform> }) {
	return (
		<div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col-reverse gap-[3px] h-[40vh]">
			{Array.from({ length: BAR_COUNT }).map((_, i) => {
				const segmentStart = i / BAR_COUNT;
				const segmentEnd = (i + 1) / BAR_COUNT;

				return (
					<ProgressSegment
						key={`bar-${i}`}
						progress={progress}
						start={segmentStart}
						end={segmentEnd}
					/>
				);
			})}
		</div>
	);
}

function ProgressSegment({
	progress,
	start,
	end,
}: {
	progress: ReturnType<typeof useTransform>;
	start: number;
	end: number;
}) {
	const opacity = useTransform(progress, [start, end], [0.1, 1]);
	const width = useTransform(progress, [start, end], [4, 10]);

	return (
		<motion.div
			className="rounded-full bg-lime"
			style={{
				opacity,
				width,
				height: `${100 / BAR_COUNT}%`,
			}}
		/>
	);
}

function StackedCard({
	step,
	index,
}: {
	step: { period: string; title: string; text: string };
	index: number;
}) {
	const stickyTop = STICKY_BASE + index * STICKY_OFFSET;

	return (
		<article
			className="
				sticky relative overflow-hidden
				bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
				backdrop-blur-md border border-lime/30 rounded-2xl shadow-md
				p-6 md:p-8
				hover:shadow-lg hover:scale-[1.01]
				transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]
			"
			style={{ top: stickyTop, zIndex: index + 1 }}
		>
			<span
				className="absolute -right-2 -top-4 md:-right-4 md:-top-6 font-display font-extralight text-[7rem] md:text-[10rem] leading-none text-orange/10 select-none pointer-events-none"
				aria-hidden="true"
			>
				{step.period}
			</span>

			<div className="relative z-10 mb-4">
				<h4 className="text-2xl md:text-3xl font-extrabold font-display leading-snug text-violet">
					{step.title}
				</h4>
			</div>

			<p className="text-base md:text-lg leading-relaxed text-violet/80 max-w-[60ch]">
				{step.text}
			</p>
		</article>
	);
}

export default function Timeline() {
	const { t } = useTranslation("bio");
	const timeline = t("timeline", { returnObjects: true }) as Record<
		string,
		{ period: string; title: string; text: string }
	>;
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 80%", "end 20%"],
	});

	return (
		<div ref={containerRef} className="w-full max-w-5xl mx-auto">
			<ProgressBar progress={scrollYProgress} />

			{TIMELINE_KEYS.map((key, i) => (
				<React.Fragment key={key}>
					{i > 0 && <div className="h-[100vh]" />}
					<StackedCard step={timeline[key]} index={i} />
				</React.Fragment>
			))}

			<div className="h-[50vh]" />
		</div>
	);
}
