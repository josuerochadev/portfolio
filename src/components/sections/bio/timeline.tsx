import { useTranslation } from "react-i18next";
import { FaBalanceScale, FaGlobeEurope, FaCode, FaRocket, FaServer, FaLaptopCode } from "react-icons/fa";
import FadeInUpOnScroll from "@/components/common/animations/fade-in-up-on-scroll";

const TIMELINE_ICONS: Record<string, React.ElementType> = {
	law: FaBalanceScale,
	france: FaGlobeEurope,
	firstCode: FaCode,
	cda: FaRocket,
	mainframe: FaServer,
	now: FaLaptopCode,
};

const TIMELINE_KEYS = ["law", "france", "firstCode", "cda", "mainframe", "now"];

export default function Timeline() {
	const { t } = useTranslation("bio");
	const timeline = t("timeline", { returnObjects: true }) as Record<
		string,
		{ year: string; title: string; text: string }
	>;

	return (
		<div className="w-full px-4 max-w-4xl flex flex-col gap-0 relative">
			{/* Vertical line */}
			<div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-violet/15" />

			{TIMELINE_KEYS.map((key, i) => {
				const step = timeline[key];
				const Icon = TIMELINE_ICONS[key];

				return (
					<FadeInUpOnScroll key={key} delay={0.8 + i * 0.15}>
						<div className="relative flex items-start gap-5 py-5">
							{/* Icon dot */}
							<div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-beige border-2 border-violet/20 flex items-center justify-center">
								<Icon className="w-4 h-4 text-violet" />
							</div>

							{/* Content */}
							<div className="flex-1 min-w-0">
								<span className="text-sm font-bold text-orange-dark tracking-wide">
									{step.year}
								</span>
								<h4 className="text-lg md:text-xl font-serif font-bold text-violet mt-0.5">
									{step.title}
								</h4>
								<p className="text-base leading-relaxed text-violet/80 mt-1">
									{step.text}
								</p>
							</div>
						</div>
					</FadeInUpOnScroll>
				);
			})}
		</div>
	);
}
