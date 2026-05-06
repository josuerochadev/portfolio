import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { PROJECTS, type Project } from "@/data/projects";
import FadeInUp from "@/components/common/animations/fade-in-up";
import ErrorBoundary from "@/components/common/error-boundary";
import SeoHead from "@/components/common/seo-head";
import BackgroundGradient from "@/components/layout/background-gradient";
import BottomBlur from "@/components/common/bottom-blur";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollToTop from "@/components/common/scroll-to-top";

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

	const detailDeliverables = t(`projects:items.${project.id}.detail.deliverables`, { returnObjects: true, defaultValue: [] }) as { title: string; description: string }[];
	const detailDecisions = t(`projects:items.${project.id}.detail.decisions`, { returnObjects: true, defaultValue: [] }) as { title: string; description: string }[];
	const detailStack = t(`projects:items.${project.id}.detail.stack`, { returnObjects: true, defaultValue: [] }) as { name: string; role: string }[];
	const detailMetrics = t(`projects:items.${project.id}.detail.metrics`, { returnObjects: true, defaultValue: [] }) as { label: string; value: string }[];

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
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
				>
					{/* Hero — full width, image background */}
					<header className="relative w-full min-h-screen flex items-end overflow-hidden">
						<img
							src={project.image.desktop}
							alt=""
							aria-hidden="true"
							className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

						<div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12 pt-32">
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
										className="button"
									>
										<FaExternalLinkAlt className="inline-block mr-2" aria-hidden="true" /> DEMO
									</a>
								)}
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="button"
									>
										<FaGithub className="inline-block mr-2" aria-hidden="true" /> CODE
									</a>
								)}
							</div>

							<button
								onClick={() => navigate(-1)}
								className="mt-8 flex items-center gap-2 text-sm font-medium text-beige/70 hover:text-orange transition-colors"
								aria-label={t('projects:actions.backToProjects')}
								type="button"
							>
								<FaArrowLeft aria-hidden="true" />
								{t('projects:actions.backToProjects')}
							</button>
						</div>
					</header>
					<div className="w-full h-1 bg-lime" />
					<div className="w-full h-12 bg-lime dark:bg-lime/40 opacity-60 dark:opacity-30 blur-2xl pointer-events-none" />

					{/* Body */}
					<main className="relative z-10 max-w-5xl mx-auto px-6 py-20" role="main">

						{/* Le pourquoi */}
						<FadeInUp delay={0.2}>
							<section className="mb-20">
								<h2 className="text-sm md:text-base font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-4">
									{t('projects:detail.why')}
								</h2>
								<p className="text-lg leading-relaxed text-violet/85 dark:text-beige/85 max-w-3xl">
									{projectContext}
								</p>
							</section>
						</FadeInUp>

						{/* Ce que j'ai construit */}
						{Array.isArray(detailDeliverables) && detailDeliverables.length > 0 && (
							<FadeInUp delay={0.3}>
								<section className="mb-20">
									<h2 className="text-sm md:text-base font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
										{t('projects:detail.built')}
									</h2>
									<div className="flex flex-col gap-8">
										{detailDeliverables.map((item) => (
											<div key={item.title}>
												<h3 className="text-lg font-display font-semibold italic mb-1">{item.title}</h3>
												<p className="text-violet/75 dark:text-beige/75 leading-relaxed">{item.description}</p>
											</div>
										))}
									</div>
								</section>
							</FadeInUp>
						)}

						{/* Galerie / Illustrations */}
						<FadeInUp delay={0.35}>
							<section className="mb-20">
								<h2 className="text-sm md:text-base font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
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
						{Array.isArray(detailDecisions) && detailDecisions.length > 0 && (
							<FadeInUp delay={0.4}>
								<section className="mb-20">
									<h2 className="text-sm md:text-base font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
										{t('projects:detail.decisions')}
									</h2>
									<div className="flex flex-col gap-8">
										{detailDecisions.map((decision) => (
											<div key={decision.title}>
												<h3 className="text-lg font-display font-semibold italic mb-2">{decision.title}</h3>
												<p className="text-violet/75 dark:text-beige/75 leading-relaxed max-w-3xl">{decision.description}</p>
											</div>
										))}
									</div>
								</section>
							</FadeInUp>
						)}

						{/* Stack technique */}
						{Array.isArray(detailStack) && detailStack.length > 0 && (
							<FadeInUp delay={0.5}>
								<section className="mb-20">
									<h2 className="text-sm md:text-base font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
										{t('projects:detail.stack')}
									</h2>
									<div className="flex flex-wrap gap-x-6 gap-y-4">
										{detailStack.map((tech) => (
											<div key={tech.name} className="flex flex-col">
												<span className="px-3 py-1 bg-violet/10 dark:bg-beige/10 border border-violet/20 dark:border-beige/20 rounded-full text-sm font-medium">
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
						{Array.isArray(detailMetrics) && detailMetrics.length > 0 && (
							<FadeInUp delay={0.6}>
								<section className="mb-20">
									<h2 className="text-sm md:text-base font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
										{t('projects:detail.results')}
									</h2>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
										{detailMetrics.map((metric) => (
											<div key={metric.label} className="text-center">
												<span className="block text-3xl font-display font-extrabold text-orange-dark dark:text-orange">
													{metric.value}
												</span>
												<span className="text-xs font-sans uppercase tracking-wider text-violet/65 dark:text-beige/65 mt-1">{metric.label}</span>
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
				<ScrollToTop />
				<div className="relative w-full h-12 bg-lime dark:bg-lime/40 opacity-60 dark:opacity-30 blur-2xl pointer-events-none -mb-12" />
				<Footer />
			</div>
		</ErrorBoundary>
	);
}
