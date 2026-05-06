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
		demoUrl: "https://luciole.onrender.com",
		detail: {
			deliverables: [
				{
					title: "Agent conversationnel ReAct",
					description: "Boucle Reason → Act → Observe avec routing intelligent vers 7 outils (search web, RAG, SQL, transcription audio, vision, digest email). Cascade de modèles gpt-4o-mini / gpt-4o selon la complexité détectée."
				},
				{
					title: "Pipeline de veille automatisé",
					description: "Collecte quotidienne de 38 flux RSS, filtrage thématique, scraping du contenu, enrichissement LLM parallélisé (5 threads), indexation RAG avec chunking et embeddings. Exécutable en one-shot ou via scheduler APScheduler."
				},
				{
					title: "Interface web Luciole",
					description: "Frontend Jinja2 avec design system custom, streaming SSE des réponses, authentification JWT avec comptes utilisateurs, historique de conversations persistant en SQLite, upload de fichiers (images, audio, PDF) avec validation magic bytes."
				},
				{
					title: "RAG hybride maison",
					description: "Recherche sémantique numpy (similarité cosine sur text-embedding-3-small) + BM25 lexical + score de fraîcheur + feedback utilisateur. Query expansion HyDE et re-ranking Cohere optionnel. Pas de framework RAG externe."
				}
			],
			decisions: [
				{
					title: "RAG numpy maison plutôt que LangChain/ChromaDB",
					description: "Similarité cosine calculée directement avec numpy sur des embeddings stockés en JSON. Élimine la dépendance à un vector store externe, réduit la complexité d'infra et permet un contrôle total sur le scoring hybride (sémantique + BM25 + fraîcheur + feedback)."
				},
				{
					title: "Cascade de modèles plutôt qu'un modèle unique",
					description: "Un classifier rapide (gpt-4o-mini) route chaque requête vers le modèle adapté : gpt-4o-mini pour les salutations/FAQ, gpt-4o pour le raisonnement complexe. Réduit les coûts API sur les requêtes simples tout en gardant la qualité sur les requêtes complexes."
				},
				{
					title: "Streaming SSE plutôt que requête/réponse classique",
					description: "Les réponses sont streamées via Server-Sent Events avec des événements typés (thinking, tool_result, chunk, done). L'utilisateur voit l'outil sélectionné et la réponse s'afficher en temps réel au lieu d'attendre plusieurs secondes."
				}
			],
			stack: [
				{ name: "Python 3.12", role: "Langage principal de l'agent, du pipeline et de l'API" },
				{ name: "FastAPI", role: "API REST + SSE streaming + pages HTML (Jinja2 templates)" },
				{ name: "OpenAI API (gpt-4o / gpt-4o-mini)", role: "Raisonnement agent, classification, résumé d'articles, génération de réponses" },
				{ name: "OpenAI text-embedding-3-small", role: "Embeddings 1536 dimensions pour l'indexation et la recherche RAG" },
				{ name: "OpenAI Whisper", role: "Transcription de fichiers audio uploadés par l'utilisateur" },
				{ name: "numpy", role: "Calcul vectorisé de similarité cosine pour la recherche sémantique RAG" },
				{ name: "rank_bm25", role: "Score lexical BM25 combiné au score sémantique pour le ranking hybride" },
				{ name: "Cohere rerank-multilingual-v3.0", role: "Re-ranking optionnel des résultats RAG pour affiner la pertinence" },
				{ name: "SQLite", role: "Persistance des conversations, messages, comptes utilisateurs et feedbacks" },
				{ name: "JWT (PyJWT + bcrypt)", role: "Authentification utilisateur avec cookies httpOnly sécurisés" },
				{ name: "slowapi", role: "Rate limiting par IP sur les endpoints sensibles (auth, ask, upload)" },
				{ name: "Langfuse", role: "Tracing et observabilité des appels LLM (latence, tokens, erreurs)" },
				{ name: "Tavily API", role: "Recherche web en temps réel pour la veille externe" },
				{ name: "Docker (multi-stage)", role: "Image de production avec prebuild RSS au build, utilisateur non-root, healthcheck" },
				{ name: "Render", role: "Hébergement de l'application conteneurisée (région Frankfurt, plan free)" }
			],
			metrics: [
				{ label: "Sources RSS surveillées", value: "38 flux (FR + EN)" },
				{ label: "Outils agent", value: "7 (SQL, search web, RAG, transcription, vision, preview digest, send digest)" },
				{ label: "Fichiers de tests", value: "18 fichiers (auth, conversations, streaming, upload, security, RAG, feedback, e2e…)" },
				{ label: "Dimensions embeddings", value: "1 536 (text-embedding-3-small)" },
				{ label: "Scoring RAG", value: "4 signaux combinés : cosine (50%) + BM25 (25%) + fraîcheur (25%) + bonus feedback" },
				{ label: "Sécurité", value: "Détection prompt injection (14 patterns), validation SQL, filtrage PII en sortie (IBAN, CB, email, téléphone)" },
				{ label: "Docker image", value: "Multi-stage 3 étapes (build → prebuild RSS → runtime non-root)" }
			]
		}
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
		category: "mainframe",
		detail: {
			deliverables: [
				{
					title: "Système de gestion financière (fil rouge COBOL)",
					description: "21 exercices progressifs couvrant un système bancaire complet : gestion VSAM (KSDS/ESDS/RRDS), sous-programmes CALL/CANCEL, tri/fusion SORT/MERGE, édition de relevés. 14 programmes COBOL et 43 JCL."
				},
				{
					title: "Application CICS transactionnelle multicouches",
					description: "Application CRUD clients avec architecture 3 couches (Présentation/Traitement/DAO) : 7 écrans BMS, 7 programmes COBOL, gestion des transactions et optimisations FSET/DATAONLY/CURSOR."
				},
				{
					title: "Fil rouge DB2 — SQL embarqué en COBOL",
					description: "12 exercices DB2 avec requêtes SQL (DDL/DML/SELECT avancé) et 10 programmes COBOL-DB2 utilisant curseurs, SQLCA et SQL embarqué pour interroger et manipuler des données relationnelles."
				},
				{
					title: "Base de cours structurée (40 000+ lignes)",
					description: "64 fichiers Markdown couvrant 7 domaines (z/OS, TSO/ISPF, JCL, VSAM, COBOL, DB2, CICS, algorithmique) servant de référence technique complète pour la formation."
				}
			],
			decisions: [
				{
					title: "Pourquoi GnuCOBOL + Hercules plutôt que mainframe seul",
					description: "Double environnement : GnuCOBOL pour le développement local rapide (compilation en secondes), Hercules/TK4- pour reproduire fidèlement le comportement z/OS (JCL, VSAM, ISPF). Permet d'itérer vite tout en validant sur une cible réaliste."
				},
				{
					title: "Pourquoi une architecture 3 couches en CICS",
					description: "Séparation Présentation (BMS/SEND MAP), Traitement (logique métier) et DAO (accès fichiers VSAM) dans des programmes distincts. Reproduit les patterns industriels mainframe et facilite la maintenance."
				},
				{
					title: "Pourquoi Markdown plutôt que PDF pour les cours",
					description: "Versionnement Git natif, recherche plein texte, diffs lisibles. Les 64 fichiers sont organisés par domaine et chapitre, facilitant la navigation et les mises à jour incrémentales."
				}
			],
			stack: [
				{ name: "COBOL", role: "Langage principal — 117 programmes couvrant fichiers séquentiels, VSAM, sous-programmes, tri et édition" },
				{ name: "JCL", role: "139 jobs pour la compilation, l'exécution, le tri (SORT/MERGE) et la gestion VSAM sur z/OS" },
				{ name: "CICS", role: "Moniteur transactionnel — écrans BMS, commandes SEND/RECEIVE MAP, gestion pseudo-conversationnelle" },
				{ name: "DB2/SQL", role: "Base relationnelle — DDL, DML, requêtes avancées (jointures, sous-requêtes, vues) et SQL embarqué en COBOL" },
				{ name: "VSAM/IDCAMS", role: "Gestion de fichiers indexés (KSDS, ESDS, RRDS), index alternatifs (AIX) et utilitaires AMS" },
				{ name: "GnuCOBOL", role: "Compilateur open-source pour développement et tests locaux sur macOS" },
				{ name: "Hercules (TK4-/TK5)", role: "Émulateur mainframe z/OS pour exécution JCL, ISPF et validation en environnement réaliste" },
				{ name: "Git", role: "Versionnement de l'ensemble du projet (234 commits, cours et exercices)" }
			],
			metrics: [
				{ label: "Programmes COBOL", value: "117" },
				{ label: "Jobs JCL", value: "139" },
				{ label: "Lignes de code (COBOL + JCL + SQL + BMS)", value: "~32 400" },
				{ label: "Fichiers de cours Markdown", value: "64 (~40 400 lignes)" },
				{ label: "Exercices fil rouge COBOL", value: "21" },
				{ label: "Domaines couverts", value: "7 (z/OS, JCL, VSAM, COBOL, DB2, CICS, Algorithmique)" },
				{ label: "Commits Git", value: "234" }
			]
		}
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
		category: "web-app",
		detail: {
			deliverables: [
				{
					title: "API REST sécurisée",
					description: "API Express.js/TypeScript avec authentification JWT via cookies httpOnly, rate limiting, validation Zod sur tous les endpoints, et contrôle d'accès par rôles."
				},
				{
					title: "Interface de gestion de caisse",
					description: "Interface React permettant l'ouverture/fermeture de caisses, la saisie de transactions par type de paiement, et le calcul automatique des écarts entre montants physiques et théoriques."
				},
				{
					title: "Gestion du personnel",
					description: "CRUD complet des utilisateurs avec système de rôles (Développeur, Gérant, Responsable, Serveur), réinitialisation de mot de passe, et journalisation des actions dans une table action_logs."
				},
				{
					title: "Infrastructure Docker multi-services",
					description: "Docker Compose orchestrant 6 services : PostgreSQL, Sqitch (migrations auto), backend Node.js, frontend React, Swagger UI et pgAdmin."
				}
			],
			decisions: [
				{
					title: "Pourquoi des cookies httpOnly plutôt que localStorage pour le JWT",
					description: "Migration explicite de localStorage vers des cookies httpOnly/Secure/SameSite pour éliminer le risque d'exfiltration de token via XSS. Le token n'est plus accessible côté client."
				},
				{
					title: "Pourquoi Sqitch plutôt qu'un ORM pour les migrations",
					description: "Sqitch permet d'écrire les migrations en SQL pur avec un système de deploy/revert/verify, offrant un contrôle total sur le schéma PostgreSQL sans couche d'abstraction."
				},
				{
					title: "Pourquoi Zod côté backend et frontend",
					description: "Zod est utilisé des deux côtés pour valider les entrées avec les mêmes règles (email, mot de passe complexe, numéro de téléphone français), garantissant une cohérence de validation full-stack."
				}
			],
			stack: [
				{ name: "React 18", role: "Frontend SPA avec routing (React Router 7) et pages protégées via un layout d'authentification" },
				{ name: "TypeScript", role: "Langage principal côté backend et frontend pour le typage statique" },
				{ name: "Express.js", role: "Framework serveur structuré en architecture MVC (controllers, models, routes, schemas)" },
				{ name: "PostgreSQL 15", role: "Base de données relationnelle avec 6 tables, triggers de mise à jour automatique et index sur les dates" },
				{ name: "Sqitch", role: "Gestion des migrations SQL avec deploy/revert/verify, exécuté automatiquement au démarrage Docker" },
				{ name: "Redux Toolkit", role: "State management côté frontend pour la gestion de l'état global de l'application" },
				{ name: "TanStack React Query", role: "Gestion du cache et du fetching de données côté frontend" },
				{ name: "Tailwind CSS", role: "Styling utilitaire avec Headless UI et Heroicons pour les composants d'interface" },
				{ name: "Vite", role: "Build tool et serveur de développement pour le frontend React" },
				{ name: "Docker Compose", role: "Orchestration de 6 services (DB, migrations, backend, frontend, Swagger, pgAdmin) sur un réseau bridge" },
				{ name: "JWT + bcryptjs", role: "Authentification par token (expiration 1h) stocké en cookie httpOnly, mots de passe hashés avec 12 salt rounds" },
				{ name: "Zod", role: "Validation des schémas d'entrée (body, query params) sur tous les endpoints API et formulaires frontend" },
				{ name: "Helmet + CORS + Rate Limiting", role: "Couche sécurité : headers HTTP, restriction d'origine, et limitation à 100 req/15min (5/h pour l'auth)" },
				{ name: "Jest + Supertest", role: "Tests d'intégration et e2e pour l'API backend" },
				{ name: "Swagger UI", role: "Documentation interactive de l'API accessible via un conteneur dédié sur le port 8080" }
			],
			metrics: [
				{ label: "Tables PostgreSQL", value: "6 tables avec FK, indexes et triggers" },
				{ label: "Endpoints API", value: "4 ressources (auth, users, transactions, cash-registers)" },
				{ label: "Rate limiting auth", value: "5 tentatives / heure par IP" },
				{ label: "Services Docker", value: "6 conteneurs orchestrés" },
				{ label: "Statut", value: "En cours de développement" }
			]
		}
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
		githubUrl: "https://github.com/josuerochadev/stella-ecommerce",
		detail: {
			deliverables: [
				{
					title: "Catalogue d'étoiles avec filtrage avancé",
					description: "Interface de navigation avec recherche, filtres par constellation et magnitude. 8 pages dont catalogue, détail produit, panier et wishlist."
				},
				{
					title: "Système d'authentification sécurisé",
					description: "Auth JWT avec refresh tokens, protection CSRF custom, rate limiting (5 tentatives/15min), hashage bcrypt et nettoyage automatique des tokens expirés via cron."
				},
				{
					title: "API REST documentée (48 endpoints)",
					description: "Backend Express avec 13 controllers, validation Joi, sanitization DOMPurify et documentation Swagger/OpenAPI auto-générée."
				},
				{
					title: "Tunnel d'achat complet",
					description: "Panier, wishlist, passage de commande avec suivi de statut (pending → processing → shipped → delivered), système de paiement multi-méthodes et gestion des remboursements."
				}
			],
			decisions: [
				{
					title: "Zustand plutôt que Redux",
					description: "4 stores légers (cart, user, wishlist, notification) avec factory functions et injection de dépendances. Évite le boilerplate Redux pour une app de cette taille."
				},
				{
					title: "CSRF custom plutôt que csurf (déprécié)",
					description: "Implémentation maison de la protection CSRF avec tokens signés JWT, remplaçant le package csurf abandonné. Tokens injectés automatiquement via intercepteurs Axios."
				},
				{
					title: "Repository pattern + DI container côté frontend",
					description: "Abstraction des appels API via des repositories (CartRepository, WishlistRepository, UserRepository) résolus par un conteneur DI simple, facilitant le découplage et les tests."
				}
			],
			stack: [
				{ name: "React 18 + TypeScript", role: "Frontend SPA avec lazy loading et error boundaries" },
				{ name: "Zustand", role: "State management global (4 stores : cart, user, wishlist, notifications)" },
				{ name: "Tailwind CSS", role: "Styling utility-first avec design responsive mobile/tablet/desktop" },
				{ name: "Axios", role: "Client HTTP avec intercepteurs pour injection auto des tokens CSRF et JWT" },
				{ name: "React Router v7", role: "Routing client-side avec code splitting via React.lazy()" },
				{ name: "Express.js", role: "Serveur API REST avec architecture MVC (13 controllers, 9 fichiers de routes)" },
				{ name: "PostgreSQL + Sequelize", role: "Base relationnelle avec ORM, 10 modèles et relations (FK, timestamps auto)" },
				{ name: "JWT + Bcrypt", role: "Auth stateless avec refresh tokens en base, hashage bcrypt 10 rounds" },
				{ name: "Helmet + Rate Limit", role: "Headers de sécurité HTTP et limitation de requêtes (100 req/15min général)" },
				{ name: "Joi", role: "Validation des entrées côté serveur (6 schémas couvrant tous les endpoints principaux)" },
				{ name: "Winston + Morgan", role: "Logging applicatif (fichier + console) et logging des requêtes HTTP" },
				{ name: "Swagger/OpenAPI", role: "Documentation API auto-générée accessible sur /api-docs" },
				{ name: "Jest + React Testing Library", role: "Tests unitaires et d'intégration (frontend jsdom, backend avec supertest)" },
				{ name: "Biome", role: "Linting et formatting unifié (remplace ESLint + Prettier)" },
				{ name: "DOMPurify", role: "Sanitization des inputs côté client et serveur (protection XSS)" }
			],
			metrics: [
				{ label: "Endpoints API", value: "48" },
				{ label: "Composants React", value: "56+" },
				{ label: "Modèles de données", value: "10" },
				{ label: "Hooks custom", value: "20" },
				{ label: "Services backend", value: "15" },
				{ label: "Schémas de validation", value: "6" }
			]
		}
	}
];
