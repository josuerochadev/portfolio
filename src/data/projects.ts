export interface Project {
	id: string;
	title: string;
	description: string;
	deliverables: string;
	context: string;
	image: {
		desktop: string;
		mobile: string;
		thumbnail: string;
	};
	technologies?: string[];
	status: 'completed' | 'in-progress' | 'concept';
	year: string;
	type: 'formation' | 'project';
	category: 'web-app' | 'showcase' | 'e-commerce' | 'ai' | 'personal' | 'mainframe';
	githubUrl?: string;
	demoUrl?: string;
}

export const PROJECTS: Project[] = [
	{
		id: "luciole",
		title: "Luciole",
		description:
			"Agent IA conversationnel qui automatise la veille technologique : collecte, analyse et synthétise 200+ articles/jour depuis 40+ sources RSS.",
		deliverables:
			"Agent ReAct avec 8 outils, pipeline d'ingestion RSS automatique, interface web avec streaming SSE, système RAG maison, sécurité anti-injection, déploiement Docker",
		context:
			"Les équipes IT passent environ 15 min par article en veille manuelle. Cet agent réduit ce temps à quelques secondes par question.",
		image: {
			desktop: "/assets/images/projects/optimized/project-luciole-desktop.webp",
			mobile: "/assets/images/projects/optimized/project-luciole-mobile.webp",
			thumbnail: "/assets/images/projects/optimized/project-luciole-thumb.webp"
		},
		technologies: ["Python 3.12", "FastAPI", "OpenAI API", "RAG", "SQLite", "Docker", "Langfuse", "SSE"],
		status: "completed",
		year: "2026",
		type: "formation",
		category: "ai",
		githubUrl: "https://github.com/josuerochadev/formation-ia",
		demoUrl: "https://luciole.onrender.com"
	},
	{
		id: "poei-mainframe-gestion-clientele",
		title: "Gestionnaire de clients mainframe",
		description:
			"Système de gestion de clientèle bancaire développé sur mainframe z/OS en trois volets : traitements batch COBOL/JCL, exploitation relationnelle DB2/SQL et application transactionnelle CICS en temps réel.",
		deliverables:
			"Programmes COBOL batch et transactionnels, scripts SQL, écrans BMS, JCL de compilation et d'exploitation, fichiers VSAM, rapport de projet complet",
		context:
			"Simuler le cycle complet d'une application mainframe autour d'un même domaine métier — de la gestion batch à l'écran transactionnel en temps réel.",
		image: {
			desktop: "/assets/images/projects/optimized/project-poei-mainframe-desktop.webp",
			mobile: "/assets/images/projects/optimized/project-poei-mainframe-mobile.webp",
			thumbnail: "/assets/images/projects/optimized/project-poei-mainframe-thumb.webp"
		},
		technologies: ["COBOL", "JCL", "VSAM", "DB2/SQL", "CICS", "BMS", "SORT", "IDCAMS", "TSO/ISPF", "SPUFI", "CEDA/CEMT/CEDF", "z/OS"],
		status: "completed",
		year: "2025",
		type: "formation",
		category: "mainframe"
	},
	{
		id: "tour-de-controle",
		title: "Tour de Contrôle",
		description:
			"Application web de gestion de caisse et du personnel pour la restauration, avec suivi des transactions et détection d'écarts.",
		deliverables:
			"API REST documentée Swagger, interface React complète, authentification JWT avec RBAC, détection automatique des écarts de caisse, CRUD personnel, base PostgreSQL avec migrations Sqitch, Docker Compose 6 services",
		context:
			"Répondre au besoin réel d'un restaurant : centraliser la gestion des caisses et du personnel dans un outil unique, fiable et sécurisé.",
		image: {
			desktop: "/assets/images/projects/optimized/project-tour-de-controle-desktop.webp",
			mobile: "/assets/images/projects/optimized/project-tour-de-controle-mobile.webp",
			thumbnail: "/assets/images/projects/optimized/project-tour-de-controle-thumb.webp"
		},
		technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Redux Toolkit", "Node.js", "Express", "PostgreSQL", "Redis", "Docker Compose", "JWT", "Swagger", "Jest"],
		status: "in-progress",
		year: "2025",
		type: "formation",
		category: "web-app"
	},
	{
		id: "lunetterie-du-coin",
		title: "La Lunetterie du Coin",
		description:
			"Site vitrine moderne pour un opticien indépendant, avec prise de rendez-vous et formulaire de contact intégrés.",
		deliverables:
			"Site multi-pages, design system custom, animations Framer Motion, formulaire Formspree, prise de RDV Calendly, SEO complet, pipeline CI/CD, monitoring Sentry",
		context:
			"Donner une présence web professionnelle et performante à un opticien indépendant, en misant sur l'accessibilité, la performance et un design bold maximalist.",
		image: {
			desktop: "/assets/images/projects/optimized/project-lunetterie-desktop.webp",
			mobile: "/assets/images/projects/optimized/project-lunetterie-mobile.webp",
			thumbnail: "/assets/images/projects/optimized/project-lunetterie-thumb.webp"
		},
		technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "React Router v7", "Vitest", "Playwright", "Lighthouse CI", "Sentry", "Vercel"],
		status: "completed",
		year: "2024",
		type: "project",
		category: "showcase",
		githubUrl: "https://github.com/josuerochadev/la-lunetterie-du-coin",
		demoUrl: "https://lalunetterieducoin.fr/"
	},
	{
		id: "site-vitrine-avocate",
		title: "Rayssa Harmes Avocate",
		description:
			"Site vitrine professionnel pour une avocate à Strasbourg, optimisé pour le SEO local et la conversion de prospects en rendez-vous.",
		deliverables:
			"Site 13 pages, formulaire de contact Formspree, prise de RDV Calendly, SEO local avec JSON-LD, design responsive, conformité RGPD, suite de tests complète",
		context:
			"Une avocate en exercice à Strasbourg avait besoin d'un site professionnel pour se positionner sur les recherches locales et permettre à ses clients de prendre rendez-vous facilement.",
		image: {
			desktop: "/assets/images/projects/optimized/project-rayssa-desktop.webp",
			mobile: "/assets/images/projects/optimized/project-rayssa-mobile.webp",
			thumbnail: "/assets/images/projects/optimized/project-rayssa-thumb.webp"
		},
		technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Calendly", "Formspree", "Plausible Analytics", "Vitest", "Playwright", "Vercel"],
		status: "completed",
		year: "2024",
		type: "project",
		category: "showcase",
		githubUrl: "https://github.com/josuerochadev/rayssa-harmes-avocate",
		demoUrl: "https://www.harmes-avocat.fr/"
	},
	{
		id: "stella-ecommerce",
		title: "Stella",
		description:
			"Application e-commerce full stack permettant de parcourir, filtrer et acheter des étoiles, avec authentification sécurisée, panier et système d'avis.",
		deliverables:
			"Catalogue interactif, authentification JWT/CSRF, panier et wishlist, système de commandes, API RESTful documentée Swagger, panel admin, module de paiement",
		context:
			"Projet personnel développé pour démontrer des compétences full stack en conditions réelles : architecture MVC, sécurité multicouche, ORM et tests automatisés.",
		image: {
			desktop: "/assets/images/projects/optimized/project-stella-desktop.webp",
			mobile: "/assets/images/projects/optimized/project-stella-mobile.webp",
			thumbnail: "/assets/images/projects/optimized/project-stella-thumb.webp"
		},
		technologies: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Node.js", "Express", "Sequelize", "PostgreSQL", "JWT", "Jest", "Swagger"],
		status: "in-progress",
		year: "2024",
		type: "project",
		category: "e-commerce",
		githubUrl: "https://github.com/josuerochadev/stella-ecommerce"
	}
];
