import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight, FaArrowUp, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { PROJECTS, type Project, type MediaItem } from "@/data/projects";
import FadeInUp from "@/components/common/animations/fade-in-up";
import ErrorBoundary from "@/components/common/error-boundary";
import SeoHead from "@/components/common/seo-head";
import BackgroundGradient from "@/components/layout/background-gradient";
import BottomBlur from "@/components/common/bottom-blur";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollToTop from "@/components/common/scroll-to-top";
import FloatingLanguageSwitcher from "@/components/common/floating-language-switcher";

const parseMetricValue = (value: string): { number: string | null; detail: string | null } => {
	const match = value.match(/^(\d+[\d.,]*)\s*(?:\((.+)\)|(.+))?$/);
	if (!match) return { number: null, detail: null };
	const number = match[1];
	const detail = (match[2] || match[3] || '').trim() || null;
	return { number, detail };
};

const getStatusColor = (status: Project['status']) => {
	switch (status) {
		case 'completed':
			return 'bg-lime text-violet-dark dark:bg-lime/20 dark:text-lime';
		case 'in-progress':
			return 'bg-orange text-white dark:bg-orange/20 dark:text-orange';
		case 'concept':
			return 'bg-violet text-white dark:bg-violet/40 dark:text-beige';
		default:
			return 'bg-violet text-white dark:bg-violet/40 dark:text-beige';
	}
};

const getStatusLabel = (status: Project['status'], t: any) => {
	switch (status) {
		case 'completed':
			return t('projects:status.completed');
		case 'in-progress':
			return t('projects:status.inProgress');
		case 'concept':
			return t('projects:status.concept');
		default:
			return status;
	}
};

export default function ProjectDetail() {
	const { t } = useTranslation(['projects', 'common']);
	const { projectId } = useParams<{ projectId: string }>();
	const projectIndex = PROJECTS.findIndex(p => p.id === projectId);
	const project = projectIndex >= 0 ? PROJECTS[projectIndex] : undefined;

	const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : undefined;
	const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : undefined;

	if (!project) {
		return (
			<div className="min-h-screen flex items-center justify-center text-violet dark:text-beige">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">{t('projects:errors.notFound')}</h1>
					<Link to="/" className="text-orange-dark dark:text-orange hover:text-violet dark:hover:text-lime underline">
						{t('projects:errors.backToHome')}
					</Link>
				</div>
			</div>
		);
	}

	const projectTitle = t(`projects:items.${project.id}.title`, { defaultValue: project.title });
	const projectDescription = t(`projects:items.${project.id}.description`, { defaultValue: project.description });
	const projectContext = t(`projects:items.${project.id}.context`, { defaultValue: project.context });

	const detailDeliverables = t(`projects:items.${project.id}.detail.deliverables`, { returnObjects: true, defaultValue: [] }) as { title: string; description: string }[];
	const detailDecisions = t(`projects:items.${project.id}.detail.decisions`, { returnObjects: true, defaultValue: [] }) as { title: string; description: string }[];
	const detailStack = t(`projects:items.${project.id}.detail.stack`, { returnObjects: true, defaultValue: [] }) as { name: string; role: string; group?: string }[];
	const detailMetrics = t(`projects:items.${project.id}.detail.metrics`, { returnObjects: true, defaultValue: [] }) as { label: string; value: string }[];
	const detailMedia = t(`projects:items.${project.id}.detail.media`, { returnObjects: true, defaultValue: [] }) as { caption: string }[];
	const mediaItems = project.detail?.media ?? [];

	const hasDeliverables = Array.isArray(detailDeliverables) && detailDeliverables.length > 0;
	const hasDecisions = Array.isArray(detailDecisions) && detailDecisions.length > 0;
	const hasStack = Array.isArray(detailStack) && detailStack.length > 0;
	const hasMedia = mediaItems.length > 0;
	const hasMetrics = Array.isArray(detailMetrics) && detailMetrics.length > 0;

	return (
		<ErrorBoundary>
			<SeoHead
				title={`${projectTitle} — Josué Rocha`}
				description={projectDescription}
				ogImage={`https://josuerocha.dev${project.image.desktop}`}
				canonical={`https://josuerocha.dev/projet/${project.id}`}
			/>
			<div className="min-h-screen text-violet dark:text-beige">
				<BackgroundGradient />
				<BottomBlur />
				<Navbar />
				<FloatingLanguageSwitcher />
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
				>
					{/* Hero */}
					<header className="relative w-full h-screen flex items-center overflow-hidden">
						<img
							src={project.image.desktop}
							alt=""
							aria-hidden="true"
							className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

						<div className="relative z-10 w-full max-w-5xl mx-auto px-6">
							<div className="flex flex-wrap items-center gap-3 mb-4">
								<span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(project.status)}`}>
									{getStatusLabel(project.status, t)}
								</span>
								<span className="text-sm text-beige/70">
									{project.year}
								</span>
							</div>

							<h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4 text-beige">
								{projectTitle}
							</h1>

							<p className="text-xl font-bold leading-relaxed text-beige/80 max-w-3xl">
								{projectDescription}
							</p>

							<div className="flex flex-wrap gap-4 mt-8">
								{project.demoUrl && (
									<a
										href={project.demoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="button !text-beige hover:!text-violet"
									>
										<FaExternalLinkAlt className="inline-block mr-2" aria-hidden="true" /> DEMO
									</a>
								)}
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="button !text-beige hover:!text-violet"
									>
										<FaGithub className="inline-block mr-2" aria-hidden="true" /> CODE
									</a>
								)}
							</div>
						</div>
					</header>
					<div className="w-full h-0.5 bg-lime dark:bg-lime/40" />
					<div className="w-full h-12 bg-lime dark:bg-lime/40 opacity-60 dark:opacity-30 blur-2xl pointer-events-none" />

					{/* Project nav — non sticky */}
					<nav className="max-w-5xl mx-auto px-6 pt-10 pb-4 flex flex-wrap gap-3" aria-label="Project navigation">
						{prevProject && (
							<Link
								to={`/projet/${prevProject.id}`}
								className="px-4 py-2 rounded-full bg-orange/10 text-orange-dark dark:text-orange border border-orange/20
								hover:bg-orange hover:text-beige dark:hover:bg-orange/20 dark:hover:text-orange
								transition-all duration-300
								inline-flex items-center gap-2 font-medium text-sm
								hover:shadow-cta hover:scale-105 active:scale-95"
							>
								<FaArrowLeft className="inline-block" aria-hidden="true" />
								{t(`projects:items.${prevProject.id}.title`, { defaultValue: prevProject.title })}
							</Link>
						)}
						<Link
							to="/#projects"
							className="px-4 py-2 rounded-full bg-orange/10 text-orange-dark dark:text-orange border border-orange/20
							hover:bg-orange hover:text-beige dark:hover:bg-orange/20 dark:hover:text-orange
							transition-all duration-300
							inline-flex items-center gap-2 font-medium text-sm
							hover:shadow-cta hover:scale-105 active:scale-95"
						>
							<FaArrowUp className="inline-block" aria-hidden="true" />
							{t('projects:actions.backToProjects')}
						</Link>
						{nextProject && (
							<Link
								to={`/projet/${nextProject.id}`}
								className="px-4 py-2 rounded-full bg-orange/10 text-orange-dark dark:text-orange border border-orange/20
								hover:bg-orange hover:text-beige dark:hover:bg-orange/20 dark:hover:text-orange
								transition-all duration-300
								inline-flex items-center gap-2 font-medium text-sm
								hover:shadow-cta hover:scale-105 active:scale-95"
							>
								{t(`projects:items.${nextProject.id}.title`, { defaultValue: nextProject.title })}
								<FaArrowRight className="inline-block" aria-hidden="true" />
							</Link>
						)}
					</nav>

					{/* Body */}
					<main className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-20" role="main">

						{/* Le pourquoi */}
						<FadeInUp delay={0.2}>
							<section id="why" className="mb-24 scroll-mt-24">
								<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-6">
									{t('projects:detail.why')}
								</h2>
								<p className="text-2xl md:text-3xl font-display font-light leading-relaxed text-violet/80 dark:text-beige/80">
									{projectContext}
								</p>
							</section>
						</FadeInUp>

						{/* Ce que j'ai construit — bento cards */}
						{hasDeliverables && (
							<FadeInUp delay={0.3}>
								<section id="built" className="mb-24 scroll-mt-24">
									<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
										{t('projects:detail.built')}
									</h2>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
										{detailDeliverables.map((item, index) => (
											<div
												key={item.title}
												className="flex flex-col justify-between gap-4 p-6 rounded-2xl
													bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
													dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
													backdrop-blur-md border border-lime/30 dark:border-lime/20 shadow-card
													hover:shadow-card-hover hover:scale-[1.01]
													transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]"
											>
												<div className="flex flex-col gap-2">
													<h3 className="text-lg font-display font-semibold italic leading-snug">{item.title}</h3>
													<p className="text-sm text-violet/70 dark:text-beige/70 leading-relaxed [overflow-wrap:anywhere]">{item.description}</p>
												</div>
												<span
													className="text-4xl font-display font-thin text-orange-dark dark:text-orange leading-none tracking-[-0.03em] self-end"
													style={{ fontVariationSettings: 'var(--fv-ghost)' }}
												>
													{index + 1}.
												</span>
											</div>
										))}
									</div>
								</section>
							</FadeInUp>
						)}

						{/* Décisions techniques — cards */}
						{hasDecisions && (
							<FadeInUp delay={0.4}>
								<section id="decisions" className="mb-24 scroll-mt-24">
									<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
										{t('projects:detail.decisions')}
									</h2>
									<div className="flex flex-col">
										{detailDecisions.map((decision) => (
											<div
												key={decision.title}
												className="py-6 border-b border-violet/10 dark:border-beige/10 first:pt-0 last:border-b-0"
											>
												<h3 className="text-xl md:text-2xl font-display font-semibold italic leading-snug mb-2">{decision.title}</h3>
												<p className="text-violet/70 dark:text-beige/70 leading-relaxed [overflow-wrap:anywhere]">{decision.description}</p>
											</div>
										))}
									</div>
								</section>
							</FadeInUp>
						)}

						{/* Stack technique — bento grid */}
						{hasStack && (
							<FadeInUp delay={0.5}>
								<section id="stack" className="mb-24 scroll-mt-24">
									<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
										{t('projects:detail.stack')}
									</h2>
									{detailStack.some((tech) => tech.group) ? (() => {
										const groups = Object.entries(
											detailStack.reduce<Record<string, typeof detailStack>>((acc, tech) => {
												const g = tech.group || 'Autres';
												(acc[g] ??= []).push(tech);
												return acc;
											}, {})
										);
										const maxTechs = Math.max(...groups.map(([, t]) => t.length));
										const heroIndex = groups.findIndex(([, t]) => t.length === maxTechs);

										const crops = ['0% 0%', '100% 100%', '0% 90%', '95% 10%', '50% 0%', '100% 50%'];
										const scales = [1.8, 2.0, 1.6, 2.2, 1.5, 1.9];

										return (
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												{groups.map(([group, techs], groupIndex) => {
													const isHero = groupIndex === heroIndex;
													return (
														<div
															key={group}
															className={`relative rounded-2xl overflow-hidden
																bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
																dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
																backdrop-blur-md border border-lime/30 dark:border-lime/20 shadow-card
																hover:shadow-card-hover hover:scale-[1.01]
																transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]
																${isHero ? 'sm:col-span-2 min-h-[360px]' : 'min-h-[300px]'}`}
														>
															<img
																src={project.image.desktop}
																alt=""
																aria-hidden="true"
																className="absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-multiply dark:mix-blend-soft-light dark:opacity-[0.10]"
																style={{
																	objectPosition: crops[groupIndex % crops.length],
																	transform: `scale(${scales[groupIndex % scales.length]})`,
																}}
															/>

															<div className="relative z-10 p-8 flex flex-col h-full">
																<h3 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-orange-dark dark:text-orange mb-8">
																	{group}
																</h3>
																<div className={`flex flex-col gap-5 flex-1 ${isHero ? 'sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-5' : ''}`}>
																	{techs.map((tech) => (
																		<div key={tech.name} className="pb-3">
																			<span className="text-base font-bold font-display text-violet dark:text-beige block mb-1">
																				{tech.name}
																			</span>
																			<span className={`text-sm text-violet/70 dark:text-beige/60 leading-relaxed block ${isHero ? '' : 'line-clamp-2'}`}>
																				{tech.role}
																			</span>
																		</div>
																	))}
																</div>
															</div>
														</div>
													);
												})}
											</div>
										);
									})() : (
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 px-6 py-12 bg-lime dark:bg-dark-surface rounded-2xl grain grain-citron overflow-hidden">
											{detailStack.map((tech) => (
												<div
													key={tech.name}
													className="flex items-baseline gap-4 py-3 border-b border-surface-citron-border dark:border-beige/8 min-w-0"
												>
													<span className="text-sm font-bold font-display whitespace-nowrap text-surface-citron-fg dark:text-beige shrink-0">
														{tech.name}
													</span>
													<span className="text-sm text-surface-citron-muted dark:text-beige/55 leading-snug min-w-0 break-words">
														{tech.role}
													</span>
												</div>
											))}
										</div>
									)}
								</section>
							</FadeInUp>
						)}

						{/* Galerie / Media */}
						{hasMedia && (
							<FadeInUp delay={0.55}>
								<section id="gallery" className="mb-24 scroll-mt-24">
									<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
										{t('projects:detail.gallery')}
									</h2>

									{/* Embeds + Videos — full width */}
									<div className="flex flex-col gap-8 mb-8">
										{mediaItems.map((item, index) => {
											if (item.type !== 'embed' && item.type !== 'video') return null;
											const caption = Array.isArray(detailMedia) && detailMedia[index]?.caption
												? detailMedia[index].caption
												: item.caption;

											return (
												<figure key={item.src} className="flex flex-col gap-3">
													{item.type === 'embed' && (
														<div className="w-full rounded-2xl overflow-hidden border border-violet/10 dark:border-beige/10 shadow-card">
															<iframe
																src={item.src}
																title={caption}
																className="w-full border-0"
																style={{ height: '480px' }}
																loading="lazy"
															/>
														</div>
													)}
													{item.type === 'video' && (
														<div className="w-full rounded-2xl overflow-hidden border border-violet/10 dark:border-beige/10 shadow-card">
															<video
																src={item.src}
																poster={item.poster}
																controls
																preload="metadata"
																className="w-full"
															>
																<track kind="captions" />
															</video>
														</div>
													)}
													<figcaption className="text-sm text-violet/60 dark:text-beige/60 text-center">
														{caption}
													</figcaption>
												</figure>
											);
										})}
									</div>

									{/* Images — grid compact */}
									{mediaItems.some((item) => item.type === 'image') && (
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
											{mediaItems.map((item, index) => {
												if (item.type !== 'image') return null;
												const caption = Array.isArray(detailMedia) && detailMedia[index]?.caption
													? detailMedia[index].caption
													: item.caption;

												return (
													<figure key={item.src} className="flex flex-col gap-2">
														<div className="rounded-xl overflow-hidden border border-violet/10 dark:border-beige/10 shadow-card
															hover:shadow-card-hover hover:scale-[1.01] transition-all duration-300">
															<img
																src={item.src}
																alt={caption}
																className="w-full h-auto"
																loading="lazy"
															/>
														</div>
														<figcaption className="text-xs text-violet/50 dark:text-beige/50 text-center">
															{caption}
														</figcaption>
													</figure>
												);
											})}
										</div>
									)}
								</section>
							</FadeInUp>
						)}

						{/* Résultats / Metrics — bento lime + nuit */}
						{hasMetrics && (
							<FadeInUp delay={0.6}>
								<section id="results" className="mb-24 scroll-mt-24">
									<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
										{t('projects:detail.results')}
									</h2>
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
										{detailMetrics.map((metric, index) => {
											const isLong = metric.value.length > 20;
											const isNuit = index === 0 || index === 3;
											const isShortNumber = /^\d{1,3}$/.test(metric.value.trim());
											return (
												<div
													key={metric.label}
													className={`flex flex-col justify-between p-6 rounded-2xl min-h-[180px]
														border shadow-card
														hover:shadow-card-hover hover:scale-[1.01]
														transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]
														${isLong ? 'sm:col-span-2' : ''}
														${isNuit
															? 'bg-violet dark:bg-dark-surface border-violet/20 dark:border-beige/10'
															: 'bg-lime dark:bg-dark-surface border-lime/30 dark:border-lime/20 grain grain-citron'
														}`}
												>
													<span className={`text-xs font-sans font-bold uppercase tracking-[0.2em]
														${isNuit
															? 'text-beige/50 dark:text-beige/50'
															: 'text-surface-citron-muted dark:text-beige/55'
														}`}>
														{metric.label}
													</span>
													{isShortNumber ? (
														<span
															className={`text-5xl md:text-6xl font-display font-thin leading-none
																${isNuit ? 'text-beige dark:text-beige' : 'text-surface-citron-fg dark:text-beige'}`}
															style={{ fontVariationSettings: 'var(--fv-ghost)' }}
														>
															{metric.value}
														</span>
													) : (
														<span className={`text-xl md:text-2xl font-display font-semibold italic leading-snug break-words
															${isNuit ? 'text-beige dark:text-beige' : 'text-surface-citron-fg dark:text-beige'}`}>
															{metric.value}
														</span>
													)}
												</div>
											);
										})}
									</div>
								</section>
							</FadeInUp>
						)}
					</main>
				</motion.div>
				<ScrollToTop />
				<Footer />
			</div>
		</ErrorBoundary>
	);
}
