import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { PROJECTS, type Project } from "@/data/projects";
import FadeInUp from "@/components/common/animations/fade-in-up";
import ErrorBoundary from "@/components/common/error-boundary";
import SeoHead from "@/components/common/seo-head";

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
	const navigate = useNavigate();
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

	return (
		<ErrorBoundary>
			<SeoHead
				title={`${projectTitle} — Josué Rocha`}
				description={projectDescription}
				ogImage={`https://josuerocha.dev${project.image.desktop}`}
				canonical={`https://josuerocha.dev/projet/${project.id}`}
			/>
			<div className="min-h-screen text-violet dark:text-beige">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
				>
					{/* Hero — full width, image background */}
					<header className="relative w-full min-h-[70vh] flex items-end overflow-hidden">
						<img
							src={project.image.desktop}
							alt=""
							aria-hidden="true"
							className="absolute inset-0 w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-beige via-beige/80 to-transparent dark:from-dark-bg dark:via-dark-bg/80 dark:to-transparent" />

						<div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12 pt-32">
							<button
								onClick={() => navigate(-1)}
								className="mb-8 px-4 py-2 rounded-full bg-orange/10 text-orange-dark dark:text-orange border border-orange/20
								hover:bg-orange hover:text-beige dark:hover:bg-orange/20 dark:hover:text-orange
								transition-all duration-300
								inline-flex items-center gap-2 font-medium text-sm
								hover:shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
								aria-label={t('projects:actions.backToProjects')}
								type="button"
							>
								<FaArrowLeft className="inline-block" aria-hidden="true" />
								{t('projects:actions.backToProjects')}
							</button>

							<div className="flex flex-wrap items-center gap-3 mb-4">
								<span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(project.status)}`}>
									{getStatusLabel(project.status, t)}
								</span>
								<span className="text-sm text-violet/70 dark:text-beige/60">
									{project.year}
								</span>
							</div>

							<h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4">
								{projectTitle}
							</h1>

							<p className="text-xl leading-relaxed text-violet/85 dark:text-beige/85 max-w-3xl">
								{projectDescription}
							</p>

							<div className="flex flex-wrap gap-4 mt-8">
								{project.demoUrl && (
									<a
										href={project.demoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="px-5 py-2.5 rounded-full bg-orange text-beige
										hover:bg-orange-dark transition-all duration-300
										inline-flex items-center gap-2 font-medium text-sm
										hover:shadow-md hover:scale-105 active:scale-95"
									>
										<FaExternalLinkAlt aria-hidden="true" /> Demo live
									</a>
								)}
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="px-5 py-2.5 rounded-full bg-violet/10 text-violet dark:bg-beige/10 dark:text-beige
										border border-violet/20 dark:border-beige/20
										hover:bg-violet hover:text-beige dark:hover:bg-beige/20
										transition-all duration-300
										inline-flex items-center gap-2 font-medium text-sm
										hover:shadow-md hover:scale-105 active:scale-95"
									>
										<FaGithub aria-hidden="true" /> Code source
									</a>
								)}
							</div>
						</div>
					</header>

					{/* Body */}
					<main className="relative z-10 max-w-5xl mx-auto px-6 py-20" role="main">

						{/* Le pourquoi */}
						<FadeInUp delay={0.2}>
							<section className="mb-20">
								<h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
									{t('projects:detail.why')}
								</h2>
								<p className="text-lg leading-relaxed text-violet/85 dark:text-beige/85 max-w-3xl">
									{projectContext}
								</p>
							</section>
						</FadeInUp>

						{/* Ce que j'ai construit */}
						{project.detail?.deliverables && project.detail.deliverables.length > 0 && (
							<FadeInUp delay={0.3}>
								<section className="mb-20">
									<h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
										{t('projects:detail.built')}
									</h2>
									<div className="flex flex-col">
										{project.detail.deliverables.map((item, i) => (
											<div key={item.title}>
												<div className="flex gap-4 items-start py-6">
													<div className="w-1 min-h-full bg-lime/40 rounded-full flex-shrink-0 mt-1" />
													<div>
														<h3 className="text-lg font-display font-bold mb-1">{item.title}</h3>
														<p className="text-violet/75 dark:text-beige/75 leading-relaxed">{item.description}</p>
													</div>
												</div>
												{i < project.detail!.deliverables.length - 1 && (
													<div className="w-24 h-px bg-gradient-to-r from-lime/40 to-transparent" />
												)}
											</div>
										))}
									</div>
								</section>
							</FadeInUp>
						)}

						{/* Galerie / Illustrations */}
						<FadeInUp delay={0.35}>
							<section className="mb-20">
								<h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
									{t('projects:detail.gallery')}
								</h2>
								<div className="grid md:grid-cols-2 gap-6">
									{[1, 2, 3, 4].map((n) => (
										<div
											key={n}
											className="aspect-video rounded-xl bg-violet/5 dark:bg-beige/5 border border-violet/10 dark:border-beige/10 flex items-center justify-center"
										>
											<span className="text-sm text-violet/40 dark:text-beige/40 font-medium">
												Capture à venir
											</span>
										</div>
									))}
								</div>
							</section>
						</FadeInUp>

						{/* Décisions techniques */}
						{project.detail?.decisions && project.detail.decisions.length > 0 && (
							<FadeInUp delay={0.4}>
								<section className="mb-20">
									<h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
										{t('projects:detail.decisions')}
									</h2>
									<div className="flex flex-col gap-8">
										{project.detail.decisions.map((decision) => (
											<div key={decision.title}>
												<h3 className="text-lg font-display font-bold italic mb-2">{decision.title}</h3>
												<p className="text-violet/75 dark:text-beige/75 leading-relaxed max-w-3xl">{decision.description}</p>
											</div>
										))}
									</div>
								</section>
							</FadeInUp>
						)}

						{/* Stack technique */}
						{project.detail?.stack && project.detail.stack.length > 0 && (
							<FadeInUp delay={0.5}>
								<section className="mb-20">
									<h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
										{t('projects:detail.stack')}
									</h2>
									<div className="flex flex-wrap gap-x-6 gap-y-4">
										{project.detail.stack.map((tech) => (
											<div key={tech.name} className="flex flex-col">
												<span className="px-3 py-1 bg-lime/20 dark:bg-lime/10 border border-lime/30 dark:border-lime/20 rounded-full text-sm font-medium">
													{tech.name}
												</span>
												<span className="text-xs text-violet/55 dark:text-beige/55 mt-1 pl-3 max-w-[200px]">
													{tech.role}
												</span>
											</div>
										))}
									</div>
								</section>
							</FadeInUp>
						)}

						{/* Résultats / Metrics */}
						{project.detail?.metrics && project.detail.metrics.length > 0 && (
							<FadeInUp delay={0.6}>
								<section className="mb-20">
									<h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
										{t('projects:detail.results')}
									</h2>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
										{project.detail.metrics.map((metric) => (
											<div key={metric.label} className="text-center">
												<span className="block text-3xl font-display font-extrabold text-orange-dark dark:text-orange">
													{metric.value}
												</span>
												<span className="text-sm text-violet/65 dark:text-beige/65 mt-1">{metric.label}</span>
											</div>
										))}
									</div>
								</section>
							</FadeInUp>
						)}

						{/* Navigation prev/next */}
						<FadeInUp delay={0.7}>
							<nav className="flex justify-between items-center pt-12 border-t border-violet/10 dark:border-beige/10" aria-label="Project navigation">
								{prevProject ? (
									<Link
										to={`/projet/${prevProject.id}`}
										className="flex items-center gap-2 text-sm font-medium text-violet/70 dark:text-beige/70 hover:text-orange-dark dark:hover:text-orange transition-colors"
									>
										<FaArrowLeft aria-hidden="true" />
										<span>{t(`projects:items.${prevProject.id}.title`, { defaultValue: prevProject.title })}</span>
									</Link>
								) : <span />}
								{nextProject ? (
									<Link
										to={`/projet/${nextProject.id}`}
										className="flex items-center gap-2 text-sm font-medium text-violet/70 dark:text-beige/70 hover:text-orange-dark dark:hover:text-orange transition-colors"
									>
										<span>{t(`projects:items.${nextProject.id}.title`, { defaultValue: nextProject.title })}</span>
										<FaArrowRight aria-hidden="true" />
									</Link>
								) : <span />}
							</nav>
						</FadeInUp>
					</main>
				</motion.div>
			</div>
		</ErrorBoundary>
	);
}
