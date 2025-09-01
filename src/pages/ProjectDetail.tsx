import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCalendar, FaCog } from "react-icons/fa";
import { PROJECTS, type Project } from "@/data/projects";
import FadeInUp from "@/components/common/animations/fade_in_up";
import BackgroundGradient from "@/components/layout/background_gradient";

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

const getStatusLabel = (status: Project['status']) => {
	switch (status) {
		case 'completed':
			return 'Terminé';
		case 'in-progress':
			return 'En cours';
		case 'concept':
			return 'Concept';
		default:
			return status;
	}
};

export default function ProjectDetail() {
	const { projectId } = useParams<{ projectId: string }>();
	const project = PROJECTS.find(p => p.id === projectId);

	if (!project) {
		return (
			<div className="min-h-screen flex items-center justify-center text-violet">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Projet non trouvé</h1>
					<Link to="/" className="text-orange hover:text-violet underline">
						← Retour à l'accueil
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen text-violet">
			<BackgroundGradient />
			<div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<FadeInUp delay={0.2}>
						<Link 
							to="/#projects" 
							className="inline-flex items-center text-orange hover:text-violet mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 rounded px-2 py-1"
						>
							<FaArrowLeft className="mr-2" />
							Retour aux projets
						</Link>
					</FadeInUp>

					<div className="grid lg:grid-cols-2 gap-12 items-start">
						{/* Image */}
						<FadeInUp delay={0.4}>
							<div className="relative">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-auto rounded-2xl shadow-lg"
								/>
								<div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(project.status)}`}>
									{getStatusLabel(project.status)}
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
									<div className="flex items-center gap-4 text-violet/70 mb-6">
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
									<h2 className="text-2xl font-bold mb-4">Description</h2>
									<p className="text-lg leading-relaxed text-violet/90">
										{project.description}
									</p>
								</div>
							</FadeInUp>

							<FadeInUp delay={1.0}>
								<div>
									<h2 className="text-2xl font-bold mb-4">Livrables</h2>
									<p className="text-lg leading-relaxed text-violet/90">
										{project.deliverables}
									</p>
								</div>
							</FadeInUp>

							<FadeInUp delay={1.2}>
								<div>
									<h2 className="text-2xl font-bold mb-4">Contexte</h2>
									<p className="text-lg leading-relaxed text-violet/90">
										{project.context}
									</p>
								</div>
							</FadeInUp>

							{project.technologies && (
								<FadeInUp delay={1.4}>
									<div>
										<h2 className="text-2xl font-bold mb-4">Technologies</h2>
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
									<button className="button" disabled>
										<FaGithub className="mr-2" />
										Code (Privé)
									</button>
									<button className="button" disabled>
										<FaExternalLinkAlt className="mr-2" />
										Demo (Bientôt)
									</button>
								</div>
							</FadeInUp>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}