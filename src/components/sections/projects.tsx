import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { PROJECTS } from "@/data/projects";

import FadeInUpOnScroll from "@/components/common/animations/fade-in-up-on-scroll";
import LetterRippleEffect from "@/components/effects/letter-ripple";
import ResponsiveImage from "@/components/common/responsive-image";
import SunIcon from "@/assets/images/ui/sun.svg?react";

export default function Projects() {
	const { t } = useTranslation('projects');
	const sectionRef = useRef(null);

	const { scrollYProgress } = useScroll({ target: sectionRef });
	const rotation = useTransform(scrollYProgress, [0, 1], [0, 90]);

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="relative w-full px-6 py-20 text-violet dark:text-beige overflow-hidden"
		>

			<div className="absolute top-[100px] right-[-200px] w-[1600px] h-[1600px] z-0 pointer-events-none dark:opacity-[0.15] transition-opacity duration-300">
				<motion.div
					className="w-full h-full"
					style={{ rotate: rotation }}
				>
					<SunIcon className="w-full h-full" />
				</motion.div>
			</div>

			<div className="max-w-6xl mx-auto flex flex-col gap-20 relative z-10">
				<FadeInUpOnScroll delay={0.2}>
					<h2 className="relative max-w-6xl mx-auto px-4 text-[clamp(2rem,7vw,7rem)] leading-[1.1] font-display font-extrabold text-violet dark:text-beige text-center flex flex-wrap justify-left gap-x-2">
						{t('heading')
							.split(" ")
							.map((word, i) => (
								<LetterRippleEffect
									key={`projects-title-${word}-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
i}`}
									text={`${word} `}
								/>
							))}
					</h2>
				</FadeInUpOnScroll>


				<div className="flex flex-col gap-20">
					{PROJECTS.map((project, index) => {
						type ProjectTranslation = {
							title?: string;
							description?: string;
							deliverables?: string;
							context?: string;
						};
						const projectTranslations = t(`items.${project.id}`, { returnObjects: true }) as ProjectTranslation;
						return (
						<FadeInUpOnScroll key={project.title} delay={0.3 + index * 0.15}>
							<article
								className="w-full flex flex-col lg:flex-row gap-6 items-start
								bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
								dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
								backdrop-blur-md border border-lime/30 dark:border-lime/20 rounded-2xl shadow-md p-6
								hover:shadow-lg hover:scale-[1.01]
								transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]"
							>
								<div className="w-full lg:w-1/2 aspect-[4/3]">
									<ResponsiveImage
										images={project.image}
										alt={`Preview of ${project.title}`}
										className="w-full h-full rounded-xl shadow-sm"
										loading="lazy"
									/>
								</div>
								<div className="w-full lg:w-1/2 flex flex-col gap-2">
									<div className="flex items-end gap-4 mb-2">
										<span className="text-6xl font-display font-extralight text-orange-dark leading-none">
											{index + 1}.
										</span>
										<h3 className="text-3xl font-extrabold font-display leading-snug">
											{projectTranslations?.title || project.title}
										</h3>
									</div>
									<p className="text-lg leading-snug">{projectTranslations?.description || project.description}</p>
									<p className="text-xl font-bold mt-2">{t('labels.deliverables')}</p>
									<p className="text-base mb-1">{projectTranslations?.deliverables || project.deliverables}</p>
									<p className="text-xl font-bold">{t('labels.context')}</p>
									<p className="text-base">{projectTranslations?.context || project.context}</p>
									<Link
										to={`/projet/${project.id}`}
										className="mt-6 px-4 py-2 rounded-full bg-orange/10 text-orange-dark dark:text-orange border border-orange/20
										hover:bg-orange hover:text-beige dark:hover:bg-orange/20 dark:hover:text-orange
										transition-all duration-300
										inline-flex items-center gap-2 self-start font-medium text-sm
										hover:shadow-md hover:scale-105 active:scale-95"
										aria-label={`${t('labels.seeMore')} ${projectTranslations?.title || project.title}`}
									>
										<FaEye className="inline-block" /> {t('labels.moreDetails')}
									</Link>
								</div>
							</article>
						</FadeInUpOnScroll>
					);
					})}
				</div>
			</div>
		</section>
	);
}
