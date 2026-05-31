import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight, FaArrowUp, FaGithub, FaExternalLinkAlt, FaPlay } from "react-icons/fa";
import { PROJECTS, type Project, type MediaItem } from "@/data/projects";
import FadeInUp from "@/components/common/animations/fade-in-up";
import MediaLightbox from "@/components/MediaLightbox";
import ErrorBoundary from "@/components/common/error-boundary";
import SeoHead from "@/components/common/seo-head";
import BackgroundGradient from "@/components/layout/background-gradient";
import BottomBlur from "@/components/common/bottom-blur";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollToTop from "@/components/common/scroll-to-top";
import FloatingLanguageSwitcher from "@/components/common/floating-language-switcher";

const parseMetricValue = (value: string): { number: string | null; detail: string | null } => {
	const match = value.match(/^(\d+[\d.,/]*)\s*(?:\((.+)\)|(.+))?$/);
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

const getGroupCount = (items: { item: MediaItem }[]) => {
	const embeds = items.filter(({ item }) => item.type === 'embed').length;
	const videos = items.filter(({ item }) => item.type === 'video').length;
	const images = items.filter(({ item }) => item.type === 'image').length;
	const parts: string[] = [];
	if (embeds > 0) parts.push(`${embeds} diagramme${embeds > 1 ? 's' : ''}`);
	if (videos > 0) parts.push(`${videos} vid\u00e9o${videos > 1 ? 's' : ''}`);
	if (images > 0) parts.push(`${images} image${images > 1 ? 's' : ''}`);
	return parts.join(', ');
};

export default function ProjectDetail() {
	const { t } = useTranslation(['projects', 'common']);
	const { projectId } = useParams<{ projectId: string }>();
	const projectIndex = PROJECTS.findIndex(p => p.id === projectId);
	const project = projectIndex >= 0 ? PROJECTS[projectIndex] : undefined;

	const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : undefined;
	const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : undefined;

	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
	const [activeGroupIndex, setActiveGroupIndex] = useState(0);

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

	const resolveCaption = (index: number): string => {
		if (Array.isArray(detailMedia) && detailMedia[index]?.caption) {
			return detailMedia[index].caption;
		}
		return mediaItems[index]?.caption ?? '';
	};

	const allCaptions = mediaItems.map((_, i) => resolveCaption(i));

	// Build media groups once
	const mediaGroups: { label: string | null; items: { item: MediaItem; flatIndex: number }[] }[] = [];
	if (hasMedia) {
		let currentGroup: string | null | undefined = undefined;
		mediaItems.forEach((item, flatIndex) => {
			const groupLabel = item.group ?? null;
			if (groupLabel !== currentGroup) {
				mediaGroups.push({ label: groupLabel, items: [] });
				currentGroup = groupLabel;
			}
			mediaGroups[mediaGroups.length - 1].items.push({ item, flatIndex });
		});
	}

	return (
		<ErrorBoundary>
			<SeoHead
				title={`${projectTitle} — Josu\u00e9 Rocha`}
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

										// Halton sequence + per-project offset → each card shows a truly different region
										const halton = (index: number, base: number) => {
											let f = 1, r = 0;
											let i = index + 1;
											while (i > 0) { f /= base; r += f * (i % base); i = Math.floor(i / base); }
											return r;
										};
										const offset = projectIndex * 7;
										const groupCrop = (i: number) => {
											const x = Math.round(halton(i + offset, 2) * 100);
											const y = Math.round(halton(i + offset, 3) * 100);
											return `${x}% ${y}%`;
										};
										const groupScale = (i: number) => 2.0 + halton(i + offset, 5) * 1.5; // 2.0–3.5

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
																	objectPosition: groupCrop(groupIndex),
																	transformOrigin: groupCrop(groupIndex),
																	transform: `scale(${groupScale(groupIndex).toFixed(2)})`,
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
						{hasMedia && (() => {
							const safeIndex = activeGroupIndex < mediaGroups.length ? activeGroupIndex : 0;
							const activeGroup = mediaGroups[safeIndex];
							const embeds = activeGroup.items.filter(({ item }) => item.type === 'embed');
							const videos = activeGroup.items.filter(({ item }) => item.type === 'video');
							const images = activeGroup.items.filter(({ item }) => item.type === 'image');

							return (
								<FadeInUp delay={0.55}>
									<section id="gallery" className="mb-24 scroll-mt-24">
										<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
											{t('projects:detail.gallery')}
										</h2>

										{/* Tabs */}
										{mediaGroups.length > 1 && (
											<div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Media groups">
												{mediaGroups.map((group, i) => {
													const isActive = i === safeIndex;
													return (
														<button
															key={group.label ?? `tab-${i}`}
															type="button"
															role="tab"
															aria-selected={isActive}
															onClick={() => setActiveGroupIndex(i)}
															className={`flex flex-col items-start px-4 py-2.5 rounded-xl text-left
																transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]
																border font-sans
																${isActive
																	? 'bg-orange text-beige border-orange shadow-cta scale-[1.02]'
																	: 'bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5 dark:from-lime/10 dark:via-orange/5 dark:to-violet/10 backdrop-blur-md border-lime/30 dark:border-lime/20 text-violet dark:text-beige hover:border-orange/50 hover:shadow-card'
																}`}
														>
															<span className="text-sm font-bold uppercase tracking-wider">
																{group.label ?? t('projects:detail.gallery')}
															</span>
															<span className={`text-xs mt-0.5 ${isActive ? 'text-beige/70' : 'text-violet/50 dark:text-beige/40'}`}>
																{getGroupCount(group.items)}
															</span>
														</button>
													);
												})}
											</div>
										)}

										{/* Active group content */}
										<motion.div
											key={safeIndex}
											initial={{ opacity: 0, y: 12 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, ease: [0.83, 0, 0.17, 1] }}
											role="tabpanel"
										>
											{/* Embeds — breakout width */}
											{embeds.length > 0 && (
												<div className="flex flex-col gap-8 mb-8 -mx-6 px-6 md:-mx-24 md:px-24 lg:-mx-32 lg:px-32">
													{embeds.map(({ item, flatIndex }) => {
														const caption = allCaptions[flatIndex];
														return (
															<figure
																key={item.src}
																className="flex flex-col gap-3 cursor-pointer group"
																onClick={() => setLightboxIndex(flatIndex)}
															>
																<div className="w-full rounded-2xl overflow-hidden p-2
																	bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
																	dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
																	backdrop-blur-md border border-lime/30 dark:border-lime/20 shadow-card
																	hover:shadow-card-hover hover:scale-[1.005]
																	transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]">
																	<iframe
																		src={item.src}
																		title={caption}
																		className="w-full border-0 rounded-xl"
																		style={{ height: '600px' }}
																		loading="lazy"
																	/>
																</div>
																<figcaption className="text-sm text-violet/60 dark:text-beige/60 text-center">
																	{caption}
																</figcaption>
															</figure>
														);
													})}
												</div>
											)}

											{/* Videos — poster + play overlay */}
											{videos.length > 0 && (
												<div className="flex flex-col gap-8 mb-8 -mx-6 px-6 md:-mx-24 md:px-24 lg:-mx-32 lg:px-32">
													{videos.map(({ item, flatIndex }) => {
														const caption = allCaptions[flatIndex];
														return (
															<figure
																key={item.src}
																className="flex flex-col gap-3 cursor-pointer group"
																onClick={() => setLightboxIndex(flatIndex)}
															>
																<div className="w-full rounded-2xl overflow-hidden p-2
																	bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
																	dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
																	backdrop-blur-md border border-lime/30 dark:border-lime/20 shadow-card
																	hover:shadow-card-hover hover:scale-[1.005]
																	transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]">
																	<div className="relative rounded-xl overflow-hidden">
																		{item.poster ? (
																			<img
																				src={item.poster}
																				alt={caption}
																				className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-300"
																				loading="lazy"
																			/>
																		) : (
																			<video
																				src={item.src}
																				preload="metadata"
																				className="w-full pointer-events-none"
																				muted
																			>
																				<track kind="captions" />
																			</video>
																		)}
																		{/* Play overlay */}
																		<div className="absolute inset-0 flex items-center justify-center
																			bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
																			<div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 dark:bg-beige/90
																				flex items-center justify-center
																				shadow-lg group-hover:scale-110 transition-transform duration-300">
																				<FaPlay className="w-5 h-5 md:w-6 md:h-6 text-violet ml-1" />
																			</div>
																		</div>
																	</div>
																</div>
																<figcaption className="text-sm text-violet/60 dark:text-beige/60 text-center">
																	{caption}
																</figcaption>
															</figure>
														);
													})}
												</div>
											)}

											{/* Images — masonry */}
											{images.length > 0 && (
												<div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mb-8">
													{images.map(({ item, flatIndex }) => {
														const caption = allCaptions[flatIndex];
														return (
															<figure
																key={item.src}
																className="break-inside-avoid mb-4 cursor-pointer group"
																onClick={() => setLightboxIndex(flatIndex)}
															>
																<div className="relative rounded-2xl overflow-hidden p-2
																	bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
																	dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
																	backdrop-blur-md border border-lime/30 dark:border-lime/20 shadow-card
																	hover:shadow-card-hover
																	transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]">
																	<div className="rounded-xl overflow-hidden relative">
																		<img
																			src={item.src}
																			alt={caption}
																			className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-300"
																			loading="lazy"
																		/>
																		{/* Hover overlay with caption */}
																		<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
																			opacity-0 group-hover:opacity-100 transition-opacity duration-300
																			flex items-end p-4">
																			<span className="text-sm text-white font-medium">
																				{caption}
																			</span>
																		</div>
																	</div>
																</div>
																<figcaption className="sr-only">{caption}</figcaption>
															</figure>
														);
													})}
												</div>
											)}
										</motion.div>
									</section>
								</FadeInUp>
							);
						})()}

						{/* Lightbox */}
						{lightboxIndex !== null && (
							<MediaLightbox
								items={mediaItems}
								captions={allCaptions}
								currentIndex={lightboxIndex}
								onClose={() => setLightboxIndex(null)}
								onNavigate={setLightboxIndex}
							/>
						)}

						{/* Résultats / Metrics — bento asymétrique */}
						{hasMetrics && (
							<FadeInUp delay={0.6}>
								<section id="results" className="mb-24 scroll-mt-24">
									<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
										{t('projects:detail.results')}
									</h2>
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
										{detailMetrics.map((metric, index) => {
											const { number, detail } = parseMetricValue(metric.value);
											const isHero = index === 0;
											const isNuit = index % 2 === 0;
											const isFullText = number === null;
											const isLast = index === detailMetrics.length - 1;

											// Col span: hero = 2, others = 1, last item fills remaining space
											const remainingAfterHero = detailMetrics.length - 1;
											const lastRowCount = remainingAfterHero % 3;
											const lastRowCountSm = remainingAfterHero % 2;
											const colSpan = isHero
												? 'sm:col-span-2'
												: isLast && lastRowCount === 1
													? 'lg:col-span-3'
													: isLast && lastRowCount === 2
														? 'lg:col-span-2'
														: '';
											const colSpanSm = !isHero && isLast && lastRowCountSm === 1
												? 'sm:col-span-2'
												: '';

											// Color classes
											const bgClass = isNuit
												? 'bg-violet dark:bg-dark-surface border-violet/20 dark:border-beige/10'
												: 'bg-lime dark:bg-dark-surface border-lime/30 dark:border-lime/20 grain grain-citron';
											const labelClass = isNuit
												? 'text-beige/50 dark:text-beige/50'
												: 'text-surface-citron-muted dark:text-beige/55';
											const numberClass = isNuit
												? 'text-beige dark:text-beige'
												: 'text-surface-citron-fg dark:text-beige';
											const detailClass = isNuit
												? 'text-beige/70 dark:text-beige/70'
												: 'text-surface-citron-muted dark:text-beige/60';

											return (
												<div
													key={metric.label}
													className={`flex flex-col gap-3 p-5 rounded-2xl
														border shadow-card
														hover:shadow-card-hover hover:scale-[1.01]
														transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]
														${colSpan} ${colSpanSm}
														${bgClass}`}
												>
													<span className={`text-xs font-sans font-bold uppercase tracking-[0.2em] ${labelClass}`}>
														{metric.label}
													</span>

													{/* Number card (hero or standard) */}
													{number !== null && (
														<div className="flex flex-col gap-1">
															<span
																className={`${isHero ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'} font-display font-extrabold leading-none ${numberClass}`}
															>
																{number}
															</span>
															{detail && (
																<span className={`${isHero ? 'text-base' : 'text-sm'} leading-relaxed ${detailClass}`}>
																	{detail}
																</span>
															)}
														</div>
													)}

													{/* Full-text card — no extractable number */}
													{isFullText && (
														<span className={`text-base md:text-lg font-display font-semibold italic leading-snug break-words ${numberClass}`}>
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

					{/* Bottom nav — end-of-page navigation */}
					<nav className="max-w-5xl mx-auto px-6 pb-20 flex flex-wrap gap-3" aria-label="Project navigation">
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
				</motion.div>
				<ScrollToTop />
				<Footer />
			</div>
		</ErrorBoundary>
	);
}
