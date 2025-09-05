import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCalendar, FaCog } from "react-icons/fa";
import { PROJECTS, type Project } from "@/data/projects";
import FadeInUp from "@/components/common/animations/fade-in-up";
import BackgroundGradient from "@/components/layout/background-gradient";
import ErrorBoundary from "@/components/common/error-boundary";
import ResponsiveImage from "@/components/common/responsive-image";

const getStatusColor = (status: Project['status']) => {
	switch (status) {
		case 'completed':
			return 'bg-lime text-violet-dark';
		case 'in-progress':
			return 'bg-orange text-white';
		case 'concept':
			return 'bg-violet text-white';
		default:
			return 'bg-violet text-white';
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
	const project = PROJECTS.find(p => p.id === projectId);

	if (!project) {
		return (
			<div className="min-h-screen flex items-center justify-center text-violet">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">{t('projects:errors.notFound')}</h1>
					<Link to="/" className="text-orange hover:text-violet underline">
						{t('projects:errors.backToHome')}
					</Link>
				</div>
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className="min-h-screen text-violet">
				<BackgroundGradient />
				<main className="relative z-10 max-w-6xl mx-auto px-6 py-20" role="main">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
					<FadeInUp delay={0.2}>
						<Link 
							to="/#projects" 
							className="inline-flex items-center text-orange hover:text-violet mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 rounded px-2 py-1"
							aria-label={t('projects:actions.backToProjects')}
						>
							<FaArrowLeft className="mr-2" aria-hidden="true" />
							{t('projects:actions.backToProjects')}
						</Link>
					</FadeInUp>

					<div className="grid lg:grid-cols-2 gap-12 items-start">
						{/* Image */}
						<FadeInUp delay={0.4}>
							<div className="relative">
								<ResponsiveImage
									images={project.image}
									alt={`${project.title} - ${project.description}`}
									className="w-full h-auto rounded-2xl shadow-lg"
									loading="eager"
								/>
								<div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(project.status)}`}>
									{getStatusLabel(project.status, t)}
								</div>
							</div>
						</FadeInUp>

						{/* Content */}
						<div className="space-y-8">
							<FadeInUp delay={0.6}>
								<div>
									<h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">
										{project.title}
									</h1>
									<div className="flex items-center gap-4 text-violet/80 mb-6">
										<span className="flex items-center gap-2">
											<FaCalendar />
											{project.year}
										</span>
										<span className="flex items-center gap-2">
											<FaCog />
											{project.category}
										</span>
									</div>
								</div>
							</FadeInUp>

							<FadeInUp delay={0.8}>
								<div>
									<h2 className="text-2xl font-bold mb-4">{t('projects:labels.description')}</h2>
									<p className="text-lg leading-relaxed text-violet/90">
										{t(`projects:items.${project.id}.description`, { defaultValue: project.description })}
									</p>
								</div>
							</FadeInUp>

							<FadeInUp delay={1.0}>
								<div>
									<h2 className="text-2xl font-bold mb-4">{t('projects:labels.deliverables')}</h2>
									<p className="text-lg leading-relaxed text-violet/90">
										{t(`projects:items.${project.id}.deliverables`, { defaultValue: project.deliverables })}
									</p>
								</div>
							</FadeInUp>

							<FadeInUp delay={1.2}>
								<div>
									<h2 className="text-2xl font-bold mb-4">{t('projects:labels.context')}</h2>
									<p className="text-lg leading-relaxed text-violet/90">
										{t(`projects:items.${project.id}.context`, { defaultValue: project.context })}
									</p>
								</div>
							</FadeInUp>

							{project.technologies && (
								<FadeInUp delay={1.4}>
									<div>
										<h2 className="text-2xl font-bold mb-4">{t('projects:labels.technologies')}</h2>
										<div className="flex flex-wrap gap-2">
											{project.technologies.map((tech, index) => (
												<span
													key={index}
													className="px-3 py-1 bg-lime/20 text-violet border border-lime/30 rounded-full text-sm font-medium"
												>
													{tech}
												</span>
											))}
										</div>
									</div>
								</FadeInUp>
							)}

							<FadeInUp delay={1.6}>
								<div className="flex gap-4 pt-4">
									<button className="button" disabled aria-label={t('projects:actions.codeNotAvailable')}>
										<FaGithub className="mr-2" aria-hidden="true" />
										{t('projects:actions.codePrivate')}
									</button>
									<button className="button" disabled aria-label={t('projects:actions.demoNotAvailable')}>
										<FaExternalLinkAlt className="mr-2" aria-hidden="true" />
										{t('projects:actions.demoSoon')}
									</button>
								</div>
							</FadeInUp>
						</div>
					</div>
				</motion.div>
			</main>
		</div>
		</ErrorBoundary>
	);
}