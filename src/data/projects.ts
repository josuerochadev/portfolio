export interface Project {
	id: string;
	title: string;
	description: string;
	deliverables: string;
	context: string;
	image: string;
	technologies?: string[];
	status: 'completed' | 'in-progress' | 'concept';
	year: string;
	category: 'web-app' | 'showcase' | 'e-commerce' | 'portfolio' | 'personal';
}

export const PROJECTS: Project[] = [
	{
		id: "lunetterie-du-coin",
		title: "La Lunetterie du Coin",
		description:
			"Application web sur mesure pour faciliter la prise de rendez-vous chez un opticien local.",
		deliverables:
			"Architecture full stack, back-end Node/Express, front-end React, rappels automatisés",
		context:
			"Projet client développé pour un opticien indépendant. Actuellement en cours de finalisation (v1).",
		image: "/assets/images/projects/project1-desktop.webp",
		technologies: ["React", "Node.js", "Express", "PostgreSQL", "TypeScript"],
		status: "in-progress",
		year: "2024",
		category: "web-app"
	},
	{
		id: "site-vitrine-avocate",
		title: "Site vitrine pour une avocate",
		description:
			"Plateforme multilingue minimaliste pour accroître la présence numérique et faciliter le contact client.",
		deliverables:
			"Wireframes, intégration Tailwind, formulaire sécurisé, design responsive mobile-first",
		context:
			"Phase conceptuelle d'un projet freelance pour une professionnelle du droit axée sur la visibilité locale et la conformité RGPD.",
		image: "/assets/images/projects/project3.webp",
		technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
		status: "concept",
		year: "2024",
		category: "showcase"
	},
	{
		id: "site-vitrine-poete",
		title: "Site vitrine pour un poète",
		description:
			"Portfolio artistique élégant pour présenter les œuvres et la biographie d'un poète contemporain.",
		deliverables:
			"Design poétique, galerie interactive, blog intégré, optimisation SEO",
		context:
			"Projet personnel pour valoriser l'art littéraire avec une approche moderne et accessible.",
		image: "/assets/images/projects/project2.webp",
		technologies: ["Astro", "Vue.js", "Tailwind CSS", "Markdown"],
		status: "concept",
		year: "2024",
		category: "showcase"
	},
	{
		id: "ecommerce-etoiles",
		title: "E-commerce fictif - Achat d'étoiles en ligne",
		description:
			"Boutique en ligne conceptuelle permettant l'achat symbolique d'étoiles avec certificats personnalisés.",
		deliverables:
			"Système de paiement, catalogue interactif, générateur de certificats, dashboard admin",
		context:
			"Projet d'apprentissage pour maîtriser les technologies e-commerce et l'UX complexe.",
		image: "/assets/images/projects/project1-desktop.webp",
		technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
		status: "concept",
		year: "2024",
		category: "e-commerce"
	},
	{
		id: "parcours-titre-pro-cda",
		title: "Mon parcours vers le titre pro CDA",
		description:
			"Documentation complète et portfolio de mon parcours de reconversion professionnelle vers le développement.",
		deliverables:
			"Blog technique, documentation projets, timeline interactive, témoignages",
		context:
			"Projet personnel pour documenter et partager mon expérience de reconversion du droit vers le développement.",
		image: "/assets/images/projects/project2.webp",
		technologies: ["React", "Markdown", "Git", "Various APIs"],
		status: "in-progress",
		year: "2024-2025",
		category: "personal"
	}
];
