export interface TechDetail {
	name: string;
	role: string;
}

export interface Decision {
	title: string;
	description: string;
}

export interface Deliverable {
	title: string;
	description: string;
}

export interface Metric {
	label: string;
	value: string;
}

export interface ProjectDetail {
	deliverables: Deliverable[];
	decisions: Decision[];
	stack: TechDetail[];
	metrics?: Metric[];
}

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
	detail?: ProjectDetail;
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
		demoUrl: "https://lalunetterieducoin.fr/",
		detail: {
			deliverables: [
				{
					title: "Site vitrine multi-pages",
					description: "Application web de 7 pages (Accueil, Services, Offres, À propos, Contact, Mentions légales, CGV) avec routing côté client et lazy loading par route."
				},
				{
					title: "Système d'animation accessible",
					description: "Animations Framer Motion avec détection automatique de prefers-reduced-motion via un MotionProvider dédié, garantissant 0 violation d'accessibilité."
				},
				{
					title: "Pipeline qualité CI/CD complet",
					description: "Pipeline GitHub Actions intégrant linting, type checking, 632 tests unitaires/E2E, audits Lighthouse, scan de sécurité et tests axe-core automatisés."
				},
				{
					title: "Design system sur-mesure",
					description: "Système de couleurs sémantiques, typographie fluide avec clamp(), composants réutilisables (Picture responsive AVIF/WebP, Button, Cards) construits sur Tailwind CSS."
				}
			],
			decisions: [
				{
					title: "Pourquoi Vite plutôt que Next.js",
					description: "Site vitrine sans besoin de SSR ni de backend. Vite offre un DX ultra-rapide (HMR instantané) et un build statique optimisé, suffisant pour un déploiement statique."
				},
				{
					title: "Pourquoi des imports Lucide spécifiques plutôt que le barrel export",
					description: "Import depuis lucide-react/dist/esm/icons/[icon-name] au lieu de la racine pour garantir le tree-shaking et réduire le bundle. Règle ESLint custom pour l'enforcer."
				},
				{
					title: "Pourquoi LazyMotion plutôt que le bundle Framer Motion complet",
					description: "Chargement de domAnimation uniquement à la demande pour réduire le JavaScript initial, combiné au code splitting par route via React.lazy."
				}
			],
			stack: [
				{ name: "React 19", role: "Framework UI avec Suspense et lazy loading pour le code splitting par route" },
				{ name: "TypeScript 5.7", role: "Typage strict sur l'ensemble du codebase, vérifié en CI via tsc --noEmit" },
				{ name: "Vite 7", role: "Build tool et dev server avec plugin React, SVGR et rollup-plugin-visualizer" },
				{ name: "Tailwind CSS 3", role: "Styling utility-first avec design system sémantique custom (brand, accent, etc.)" },
				{ name: "Framer Motion", role: "Animations performantes avec LazyMotion et respect des préférences de mouvement" },
				{ name: "React Router DOM v7", role: "Routing côté client avec lazy loading des pages non-critiques" },
				{ name: "Vitest + Testing Library", role: "Tests unitaires et d'intégration (632 tests, couverture ~70%)" },
				{ name: "Playwright", role: "Tests E2E cross-browser (Chromium, Firefox, WebKit)" },
				{ name: "axe-core", role: "Tests d'accessibilité automatisés garantissant 0 violation WCAG 2.1 AA" },
				{ name: "Lighthouse CI", role: "Audits performance automatisés en CI avec seuils mobile/desktop" },
				{ name: "Sentry", role: "Monitoring d'erreurs en production avec source maps via plugin Vite" },
				{ name: "Husky + lint-staged + Commitlint", role: "Git hooks enforçant le format conventional commits, linting et formatting au commit" },
				{ name: "Sharp", role: "Optimisation d'images en AVIF/WebP via script custom" }
			],
			metrics: [
				{ label: "Tests", value: "632" },
				{ label: "Couverture", value: "~70%" },
				{ label: "Lighthouse mobile", value: "70+" },
				{ label: "Lighthouse desktop", value: "80+" },
				{ label: "Violations a11y", value: "0" },
				{ label: "ESLint warnings", value: "0" },
				{ label: "Bundle JS", value: "~800 KB" }
			]
		}
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
