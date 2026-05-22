export interface TechDetail {
	name: string;
	role: string;
	group?: string;
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

export interface MediaItem {
	type: 'image' | 'video' | 'embed' | 'pdf';
	src: string;
	poster?: string;
	caption: string;
}

export interface ProjectDetail {
	deliverables: Deliverable[];
	decisions: Decision[];
	stack: TechDetail[];
	metrics?: Metric[];
	media?: MediaItem[];
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
			"Agent IA conversationnel qui automatise la veille technologique : collecte, analyse et synthétise 200+ articles/jour depuis 42 sources RSS.",
		deliverables:
			"Agent ReAct avec 7 outils, pipeline d'ingestion RSS automatique, interface web avec streaming SSE, système RAG maison, sécurité anti-injection, conformité RGPD, déploiement Docker",
		context:
			"Projet réalisé en équipe de 4 dans le cadre d'une formation IA de 70h. Les équipes IT passent environ 15 min par article en veille manuelle — cet agent réduit ce temps à quelques secondes par question.",
		image: {
			desktop: "/assets/images/projects/optimized/project-luciole-desktop.webp",
			mobile: "/assets/images/projects/optimized/project-luciole-mobile.webp",
			thumbnail: "/assets/images/projects/optimized/project-luciole-thumb.webp"
		},
		technologies: ["Python 3.12", "FastAPI", "Gemini API", "RAG", "PostgreSQL", "Docker", "Langfuse", "SSE"],
		status: "completed",
		year: "2026",
		type: "formation",
		category: "ai",
		githubUrl: "https://github.com/josuerochadev/formation-ia",
		demoUrl: "https://luciole-production.up.railway.app",
		detail: {
			deliverables: [
				{
					title: "Agent conversationnel ReAct",
					description: "Boucle Reason → Act → Observe avec routing intelligent vers 7 outils (search web, RAG, SQL, vision, preview digest, send digest, réponse directe). Cascade de modèles Gemini flash / flash-lite / pro selon la complexité détectée."
				},
				{
					title: "Pipeline de veille automatisé",
					description: "Collecte quotidienne de 42 flux RSS (FR + EN), filtrage thématique, scraping du contenu via trafilatura, enrichissement LLM parallélisé (5 threads), indexation RAG avec chunking et embeddings. Exécutable en one-shot ou via scheduler APScheduler."
				},
				{
					title: "Interface web Luciole",
					description: "Frontend Jinja2 avec design system custom, streaming SSE des réponses, authentification JWT avec comptes utilisateurs, historique de conversations persistant en PostgreSQL (Neon), upload de fichiers (images, PDF) avec validation magic bytes."
				},
				{
					title: "RAG hybride maison",
					description: "Recherche sémantique numpy (similarité cosine sur gemini-embedding-001) + BM25 lexical + score de fraîcheur + feedback utilisateur. Query expansion HyDE et re-ranking Cohere optionnel. Pas de framework RAG externe."
				},
				{
					title: "Conformité RGPD et export données",
					description: "Rétention automatique (90j articles, 30j logs, 180j messages) avec purge périodique. Export complet des données utilisateur via /users/me/export et suppression cascade de toutes les données personnelles."
				},
				{
					title: "Analyse multimodale (Vision + PDF)",
					description: "Upload d'images (PNG, JPEG, WebP) et PDF avec validation magic bytes, analyse via Gemini Vision. Extraction de la première page PDF pour analyse visuelle. Nettoyage automatique des fichiers après 1h."
				},
				{
					title: "Digest email automatisé",
					description: "Génération de rapports HTML regroupés par catégorie, envoi via SMTP TLS. Prévisualisation avant envoi via l'outil preview_digest, gestion de la liste de destinataires par variable d'environnement."
				}
			],
			decisions: [
				{
					title: "RAG numpy maison plutôt que LangChain/ChromaDB",
					description: "Similarité cosine calculée directement avec numpy sur des embeddings stockés en JSON. Élimine la dépendance à un vector store externe, réduit la complexité d'infra et permet un contrôle total sur le scoring hybride (sémantique + BM25 + fraîcheur + feedback)."
				},
				{
					title: "Cascade de modèles plutôt qu'un modèle unique",
					description: "Un classifier rapide (gemini-2.5-flash-lite) route chaque requête vers le modèle adapté : flash-lite pour les salutations/FAQ, flash pour le raisonnement standard, pro pour les requêtes complexes. Réduit les coûts API tout en gardant la qualité."
				},
				{
					title: "Streaming SSE plutôt que requête/réponse classique",
					description: "Les réponses sont streamées via Server-Sent Events avec des événements typés (thinking, tool_result, chunk, done). L'utilisateur voit l'outil sélectionné et la réponse s'afficher en temps réel au lieu d'attendre plusieurs secondes."
				}
			],
			stack: [
				{ name: "Python 3.12", role: "Langage principal de l'agent, du pipeline et de l'API", group: "Agent & LLM" },
				{ name: "FastAPI", role: "API REST + SSE streaming + pages HTML (Jinja2 templates)", group: "Agent & LLM" },
				{ name: "Gemini (via SDK OpenAI)", role: "Raisonnement agent (gemini-2.5-flash / flash-lite / pro), classification, résumé d'articles, génération de réponses", group: "Agent & LLM" },
				{ name: "gemini-embedding-001", role: "Embeddings 768 dimensions pour l'indexation et la recherche RAG", group: "RAG & Recherche" },
				{ name: "numpy", role: "Calcul vectorisé de similarité cosine pour la recherche sémantique RAG", group: "RAG & Recherche" },
				{ name: "rank_bm25", role: "Score lexical BM25 combiné au score sémantique pour le ranking hybride", group: "RAG & Recherche" },
				{ name: "Cohere rerank-multilingual-v3.0", role: "Re-ranking optionnel des résultats RAG pour affiner la pertinence", group: "RAG & Recherche" },
				{ name: "Tavily API", role: "Recherche web en temps réel pour la veille externe", group: "RAG & Recherche" },
				{ name: "trafilatura", role: "Scraping et extraction de contenu web des articles RSS", group: "RAG & Recherche" },
				{ name: "PostgreSQL (Neon)", role: "Persistance des conversations, messages, comptes utilisateurs, articles et feedbacks (ThreadedConnectionPool min 2, max 10)", group: "Backend & Données" },
				{ name: "JWT (PyJWT + bcrypt)", role: "Authentification utilisateur avec cookies httpOnly sécurisés", group: "Sécurité & Ops" },
				{ name: "slowapi", role: "Rate limiting par IP sur les endpoints sensibles (auth, ask, upload)", group: "Sécurité & Ops" },
				{ name: "Langfuse", role: "Tracing et observabilité des appels LLM (latence, tokens, erreurs)", group: "Sécurité & Ops" },
				{ name: "Docker (multi-stage)", role: "Image de production avec prebuild RSS au build, utilisateur non-root, healthcheck", group: "Sécurité & Ops" },
				{ name: "Railway", role: "Hébergement de l'application conteneurisée (nixpacks)", group: "Sécurité & Ops" }
			],
			metrics: [
				{ label: "Sources RSS surveillées", value: "42 flux (FR + EN)" },
				{ label: "Articles traités", value: "200+/jour avec déduplication (URL + similarité titre 0.85)" },
				{ label: "Outils agent", value: "7 (SQL, search web, RAG, vision, preview digest, send digest, réponse directe)" },
				{ label: "Fichiers de tests", value: "18 fichiers (auth, conversations, streaming, upload, security, RAG, feedback, e2e…)" },
				{ label: "Dimensions embeddings", value: "768 (gemini-embedding-001)" },
				{ label: "Scoring RAG", value: "4 signaux combinés : cosine (50%) + BM25 (25%) + fraîcheur (25%) + bonus feedback (10%)" },
				{ label: "Sécurité", value: "Détection prompt injection (14 patterns), validation SQL, filtrage PII (IBAN, CB, email, téléphone), marqueurs anti-hallucination explicites" },
				{ label: "Conformité RGPD", value: "Rétention 90j articles, 30j logs, 180j messages — export utilisateur + suppression cascade" },
				{ label: "Rate limiting", value: "7 endpoints via slowapi (register 5/min, login 10/min, ask 10/min, upload 20/min, feedback 30/min…)" },
				{ label: "Observabilité", value: "Tracing LLM Langfuse (latence, tokens, coûts, erreurs) + endpoint /metrics protégé par API key" },
				{ label: "ADRs documentés", value: "3 (OpenAI→Gemini, SQLite→PostgreSQL, Render→Railway)" },
				{ label: "Graceful degradation", value: "Tavily, Langfuse et Cohere tous optionnels avec fallback automatique si indisponibles" },
				{ label: "Mémoire conversationnelle", value: "Isolation par conversation, limite 50 messages, pruning automatique, titrage LLM dynamique" },
				{ label: "Connection pooling", value: "ThreadedConnectionPool psycopg2 (min 2, max 10 connexions)" }
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
		technologies: ["COBOL 85", "JCL", "VSAM KSDS", "DB2/SQL", "CICS TS", "BMS", "z/OS (Hercules TK5)", "GnuCOBOL", "Docker", "Flask", "SQLite", "GitHub Actions"],
		status: "completed",
		year: "2025",
		type: "formation",
		category: "mainframe",
		detail: {
			deliverables: [
				{
					title: "14 programmes batch COBOL avec 43 JCL",
					description: "Traitements séquentiels complets : création VSAM KSDS, tri/fusion SORT/MERGE, sous-programmes CALL, édition de relevés de compte avec ruptures et totaux."
				},
				{
					title: "Système DB2 avec SQL embarqué",
					description: "11 programmes COBOL-SQL sur un schéma à 5 tables (CLIENT, REGION, PROFESSI, NATCOMPT, MOUVEMENT). Curseurs paramétrés, gestion transactionnelle COMMIT/ROLLBACK, vues et index."
				},
				{
					title: "Application CICS interactive — 7 transactions",
					description: "CRUD complet de gestion clients en pseudo-conversationnel : pagination générique, navigation VSAM temps réel via index alternatifs (AIX/PATH), statistiques par région. 7 maps BMS avec optimisations FSET/DATAONLY/CURSOR dynamique."
				},
				{
					title: "Conteneur Docker avec API web et CI/CD",
					description: "Image Docker compilant les 15 programmes batch, simulant DB2 via SQLite et rejouant les écrans CICS. Pipeline GitHub Actions compilant et exécutant des smoke tests à chaque push."
				}
			],
			decisions: [
				{
					title: "GnuCOBOL + Docker plutôt que z/OS seul",
					description: "Les programmes ont été écrits pour z/OS mais adaptés pour GnuCOBOL (ASSIGN TO fichier au lieu de DD names, LINE SEQUENTIAL) afin de permettre compilation locale, CI et démo web sans mainframe."
				},
				{
					title: "SQLite pour simuler DB2 hors z/OS",
					description: "Les programmes DB2 utilisent EXEC SQL non compilable par GnuCOBOL. Un module Python (db2_sim.py) réplique le schéma sur SQLite pour rendre les requêtes exécutables dans le conteneur Docker."
				},
				{
					title: "Pseudo-conversationnel CICS avec COMMAREA",
					description: "Choix du pattern pseudo-conversationnel standard z/OS pour les 7 transactions CICS : chaque interaction SEND MAP libère la tâche, le contexte est préservé via COMMAREA au RETURN TRANSID."
				}
			],
			stack: [
				{ name: "COBOL 85", role: "Langage principal — 32 programmes couvrant batch, DB2 et CICS", group: "Mainframe z/OS" },
				{ name: "JCL", role: "60 jobs de contrôle : création VSAM, tri SORT, compilation, assemblage BMS", group: "Mainframe z/OS" },
				{ name: "z/OS (Hercules TK5)", role: "Environnement d'exécution mainframe émulé pour développement et tests", group: "Mainframe z/OS" },
				{ name: "VSAM KSDS", role: "Stockage indexé des fichiers clients/comptes avec index alternatifs (AIX)", group: "Mainframe z/OS" },
				{ name: "CICS TS", role: "Moniteur transactionnel pour les 7 écrans interactifs pseudo-conversationnels", group: "Mainframe z/OS" },
				{ name: "BMS", role: "7 maps d'écran définissant les interfaces utilisateur des transactions CICS", group: "Mainframe z/OS" },
				{ name: "DB2/SQL", role: "Base relationnelle à 5 tables, 14 scripts SQL (DDL, DML, vues, index)", group: "Base de données" },
				{ name: "SQLite", role: "Simulation du schéma DB2 dans le conteneur Docker", group: "Base de données" },
				{ name: "GnuCOBOL", role: "Compilateur open source pour exécution hors z/OS (CI et conteneur Docker)", group: "Portabilité & CI" },
				{ name: "Docker", role: "Conteneurisation de l'API web avec compilation automatique des programmes batch", group: "Portabilité & CI" },
				{ name: "Flask + Gunicorn", role: "API REST servant l'interface web, la simulation DB2 et le replay d'écrans CICS", group: "Portabilité & CI" },
				{ name: "GitHub Actions", role: "CI compilant les 15 programmes batch et exécutant des smoke tests à chaque push", group: "Portabilité & CI" }
			],
			metrics: [
				{ label: "Programmes COBOL", value: "32 (14 batch + 11 DB2 + 7 CICS)" },
				{ label: "Total fichiers sources", value: "118 (COBOL, JCL, SQL, BMS)" },
				{ label: "Compilation CI", value: "15/15 programmes batch passent" },
				{ label: "Transactions CICS", value: "7 (AFFI, AJOU, MAJU, SUPP, DELG, LIST, STAT)" },
				{ label: "Tables DB2", value: "5 tables, 14 scripts SQL" }
			]
		}
	},
	{
		id: "tour-de-controle",
		title: "Tour de Contrôle",
		description:
			"Application full-stack de gestion de caisse pour la restauration, avec dashboard temps réel, gestion d'équipe par rôles, journal de transactions filtrable et audit trail complet.",
		deliverables:
			"API REST documentée Swagger, interface React complète, authentification JWT avec RBAC, détection automatique des écarts de caisse, CRUD personnel, base PostgreSQL avec migrations Sqitch, Docker Compose 5 services",
		context:
			"Répondre au besoin réel d'un restaurant : centraliser la gestion des caisses et du personnel dans un outil unique, fiable et sécurisé.",
		image: {
			desktop: "/assets/images/projects/optimized/project-tour-de-controle-desktop.webp",
			mobile: "/assets/images/projects/optimized/project-tour-de-controle-mobile.webp",
			thumbnail: "/assets/images/projects/optimized/project-tour-de-controle-thumb.webp"
		},
		technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "Zod", "PostgreSQL", "Redis", "Docker Compose", "JWT", "Swagger", "Jest", "Playwright"],
		status: "in-progress",
		year: "2025",
		type: "formation",
		category: "web-app",
		detail: {
			deliverables: [
				{
					title: "Gestion des caisses (La Caisse)",
					description: "Ouverture et fermeture de caisse avec saisie du fond physique et détection automatique des écarts. Historique complet des sessions par caissier."
				},
				{
					title: "Suivi des transactions (Le Flux)",
					description: "Enregistrement des transactions par type de paiement (CB, espèces, ticket-restaurant, etc.), avec filtres avancés et pagination."
				},
				{
					title: "Gestion du personnel (L'Équipage)",
					description: "CRUD complet des membres d'équipe avec 4 niveaux de rôle (Développeur, Gérant, Responsable, Serveur) et reset de mot de passe par email."
				},
				{
					title: "Dashboard temps réel (La Vigie)",
					description: "Vue synthétique des KPIs en temps réel avec graphique de répartition des paiements, et audit trail complet de toutes les actions (qui, quoi, quand) stocké en JSONB, filtrable par date et utilisateur."
				}
			],
			decisions: [
				{
					title: "JWT via cookies httpOnly plutôt que localStorage",
					description: "Les tokens d'authentification sont stockés dans des cookies httpOnly pour éliminer le risque de vol via XSS. Le flag sameSite=none est activé en production pour gérer le cross-domain entre Railway et Vercel."
				},
				{
					title: "Sqitch plutôt qu'un ORM pour les migrations",
					description: "Les migrations de base de données sont gérées avec Sqitch (SQL pur), ce qui garantit un contrôle total sur le schéma et évite les abstractions d'un ORM pour un projet orienté requêtes métier précises."
				},
				{
					title: "Monorepo avec Docker Compose plutôt qu'une architecture découplée dès le départ",
					description: "Frontend, backend et base de données sont orchestrés via Docker Compose pour simplifier le démarrage local et la cohérence des environnements, tout en restant déployables séparément (Vercel + Railway + Neon)."
				}
			],
			stack: [
				{ name: "React 18 + TypeScript", role: "Interface utilisateur avec typage strict, lazy loading des routes, 13 pages, 13 composants réutilisables, gestion d'état via Context API + hooks custom", group: "Frontend" },
				{ name: "Vite", role: "Bundler et serveur de développement frontend", group: "Frontend" },
				{ name: "Tailwind CSS", role: "Design system custom (tokens couleur, typographie, composants réutilisables)", group: "Frontend" },
				{ name: "Express.js + TypeScript", role: "API REST avec 6 modules de routes, validation Zod bout-en-bout, organisée en MVC", group: "Backend & API" },
				{ name: "Zod", role: "Validation et typage des données entrantes côté client et serveur", group: "Backend & API" },
				{ name: "Swagger / OpenAPI", role: "Documentation interactive de l'API, disponible en environnement de développement", group: "Backend & API" },
				{ name: "PostgreSQL 15 (Neon)", role: "Base de données relationnelle hébergée, SQL pur sans ORM, audit trail en JSONB (action_logs)", group: "Base de données" },
				{ name: "Sqitch", role: "Migrations SQL versionnées avec deploy/verify/revert", group: "Base de données" },
				{ name: "Redis", role: "Blacklist JWT pour logout instantané, cache de sessions et rate limiting", group: "Base de données" },
				{ name: "JWT + cookies httpOnly", role: "Authentification stateless avec SameSite + Secure, blacklist Redis pour logout instantané", group: "Sécurité" },
				{ name: "Bcrypt (12 rounds)", role: "Hachage des mots de passe, tokens de reset avec TTL 15 min", group: "Sécurité" },
				{ name: "Helmet", role: "Headers de sécurité HTTP (CSP, HSTS, X-Content-Type-Options)", group: "Sécurité" },
				{ name: "Sentry", role: "Monitoring d'erreurs en production", group: "Sécurité" },
				{ name: "Jest + Supertest", role: "Tests d'intégration de l'API (78 tests)", group: "Tests & qualité" },
				{ name: "Vitest", role: "Tests unitaires frontend (18 tests)", group: "Tests & qualité" },
				{ name: "Playwright", role: "Tests end-to-end du parcours utilisateur", group: "Tests & qualité" },
				{ name: "Husky + lint-staged", role: "Qualité du code au pre-commit, conventional commits", group: "Tests & qualité" },
				{ name: "Docker Compose", role: "Orchestration de 5 containers (PostgreSQL, Redis, Backend, Frontend, Sqitch)", group: "Déploiement" },
				{ name: "Railway", role: "Hébergement du backend Express en production", group: "Déploiement" },
				{ name: "Vercel", role: "Déploiement du frontend React en production", group: "Déploiement" }
			],
			metrics: [
				{ label: "Modules de routes API", value: "6" },
				{ label: "Pages frontend", value: "13" },
				{ label: "Composants réutilisables", value: "13" },
				{ label: "Tests d'intégration backend", value: "78" },
				{ label: "Tests unitaires frontend", value: "18" },
				{ label: "Niveaux de rôle RBAC", value: "4 (Developer, Manager, Supervisor, Server)" },
				{ label: "ADRs documentés", value: "5 (décisions architecturales)" },
				{ label: "Sécurité", value: "JWT httpOnly + SameSite, bcrypt 12 rounds, Zod client+serveur, CSRF, Helmet, audit trail JSONB" },
				{ label: "Déploiement", value: "Demo live (Vercel + Railway + Neon)" }
			],
			media: [
				{
					type: "embed",
					src: "/assets/media/projects/tour-de-controle/architecture-diagram.html",
					caption: "Architecture — Frontend ↔ API ↔ PostgreSQL / Redis + déploiement Vercel / Railway / Neon"
				},
				{
					type: "video",
					src: "/assets/media/projects/tour-de-controle/tour-demo.mp4",
					caption: "Parcours utilisateur — login, dashboard, caisse, transactions"
				},
				{
					type: "video",
					src: "/assets/media/projects/tour-de-controle/tour-responsive.mp4",
					caption: "Vue responsive — mobile et tablette"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/design-system-1.webp",
					caption: "Design System — Cover"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/design-system-2.webp",
					caption: "Design System — Brand (Le Phare)"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/design-system-3.webp",
					caption: "Design System — Couleurs (La Palette)"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/design-system-4.webp",
					caption: "Design System — Typographie (Le Système)"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/design-system-5.webp",
					caption: "Design System — Formes & Espacement (Le Rythme)"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/design-system-6.webp",
					caption: "Design System — Composants (La Boîte à Outils)"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/print-1.webp",
					caption: "Print — Cover"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/print-2.webp",
					caption: "Print — Vue La Vigie (Dashboard)"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/print-3.webp",
					caption: "Print — Vue La Caisse"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/print-4.webp",
					caption: "Print — Vue Le Flux (Transactions)"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/print-5.webp",
					caption: "Print — Vue L'Équipage (Personnel)"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/erd.webp",
					caption: "Schéma base de données — ERD (6 tables, relations FK)"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/mcd.webp",
					caption: "Modèle conceptuel de données — MCD Merise"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/use-cases.webp",
					caption: "Diagramme de cas d'utilisation — 4 rôles RBAC"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/sequence.webp",
					caption: "Diagramme de séquence — flux auth, caisse, admin"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/arborescence.webp",
					caption: "Arborescence — sitemap et navigation de l'application"
				},
				{
					type: "image",
					src: "/assets/media/projects/tour-de-controle/maquette-caisse.webp",
					caption: "Maquette — 7 vues de la gestion de caisse"
				}
			]
		}
	},
	{
		id: "oklm-drag-club",
		title: "OKLM Drag Club",
		description:
			"Site vitrine statique pour un podcast drag, qui agrège automatiquement les épisodes depuis le flux RSS et génère les liens d'écoute multi-plateformes au build.",
		deliverables:
			"Site Next.js statique, agrégation RSS + APIs Apple/Deezer au build, SEO dynamique avec JSON-LD et OG générées, endpoint de redéploiement sécurisé",
		context:
			"Donner une vitrine web à un podcast indépendant en automatisant la publication des épisodes sans base de données ni CMS.",
		image: {
			desktop: "/assets/images/projects/optimized/project-oklm-drag-club-desktop.webp",
			mobile: "/assets/images/projects/optimized/project-oklm-drag-club-mobile.webp",
			thumbnail: "/assets/images/projects/optimized/project-oklm-drag-club-thumb.webp"
		},
		technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Vitest", "Sentry", "Vercel"],
		status: "completed",
		year: "2025",
		type: "project",
		category: "showcase",
		githubUrl: "https://github.com/josuerochadev/oklm-drag-club",
		demoUrl: "https://oklmdragclub.com",
		detail: {
			deliverables: [
				{
					title: "Site vitrine statique avec données RSS",
					description: "Site Next.js entièrement statique qui agrège les épisodes depuis le flux RSS Anchor.fm au build, avec merge de données manuelles (overrides.json) pour les liens manquants."
				},
				{
					title: "Agrégation multi-plateformes automatique",
					description: "Fetch parallèle des APIs Apple Podcasts (iTunes Lookup) et Deezer au build pour générer automatiquement les liens d'écoute par épisode, avec fallback gracieux si une API échoue."
				},
				{
					title: "SEO dynamique et Open Graph",
					description: "Sitemap générée dynamiquement, JSON-LD structuré par page (PodcastSeries et PodcastEpisode), et images Open Graph générées côté serveur pour la home, chaque émission et chaque épisode."
				},
				{
					title: "Endpoint de redéploiement sécurisé",
					description: "Route API POST /api/rebuild protégée par comparaison timing-safe qui déclenche un deploy hook Vercel, permettant de republier le site sans push git quand un nouvel épisode sort."
				},
				{
					title: "Accessibilité et durcissement sécurité",
					description: "Skip links, ARIA labels sur tous les composants interactifs, gestion du focus clavier sur le menu mobile, respect de prefers-reduced-motion. Sanitisation HTML des descriptions RSS (anti-XSS), headers CSP et permissions policy restrictive, fonction safeJsonLd() qui échappe les balises </script>."
				}
			],
			decisions: [
				{
					title: "Pipeline RSS → APIs tierces → overrides locaux plutôt qu'un CMS",
					description: "Le RSS Anchor.fm est la source de vérité, enrichi par merge automatique avec les APIs Apple Podcasts et Deezer. Un fichier overrides.json local corrige les manques (liens manquants, classification par émission). Trois sources fusionnées en un seul modèle de données, avec détection automatique de l'émission et de la saison par regex. Aucune base de données à maintenir, build rapide, coût zéro."
				},
				{
					title: "Détection automatique des émissions par titre plutôt que tagging manuel",
					description: "La fonction detectShow() classifie chaque épisode dans sa série (Drag Race France, Dragula, Les Traîtres…) via pattern matching sur le titre RSS, avec override possible dans overrides.json."
				},
				{
					title: "Liens externes uniquement, pas de player audio embarqué",
					description: "Choix délibéré de rediriger vers Spotify/Apple/Deezer/Amazon plutôt que d'embarquer un lecteur. Simplifie le site, respecte les analytics du podcaster, et évite les problèmes de droits."
				}
			],
			stack: [
				{ name: "Next.js 16 (App Router)", role: "Framework fullstack — rendu statique au build, routes dynamiques pour épisodes et émissions, route API pour le rebuild hook", group: "Framework & UI" },
				{ name: "React 19", role: "Server Components par défaut, Client Components uniquement pour l'interactivité (filtres, menu mobile, bouton partage)", group: "Framework & UI" },
				{ name: "TypeScript (strict)", role: "Typage strict sans any — types dédiés pour les épisodes, émissions (ShowId union type), et les réponses API externes", group: "Framework & UI" },
				{ name: "Tailwind CSS v4", role: "Design system néo-brutaliste : palette OKLCH (--lime, --forest, --violet…), typographie Archivo Black, ombres offset, badges colorés par émission. Implémenté via @tailwindcss/postcss + CSS variables custom", group: "Framework & UI" },
				{ name: "fast-xml-parser", role: "Parsing du flux RSS Anchor.fm (XML → JSON) au build avec support des attributs iTunes et media:content", group: "Pipeline de données" },
				{ name: "Sentry (@sentry/nextjs)", role: "Monitoring d'erreurs en production", group: "Production" },
				{ name: "Vitest", role: "Tests unitaires pour le parsing RSS, la détection d'émissions et les utilitaires (slugify, formatDuration, toRoman)", group: "Tests & qualité" },
				{ name: "Husky + lint-staged + commitlint", role: "Qualité du code : ESLint au pre-commit, validation du overrides.json, et conventions de commit (Conventional Commits)", group: "Tests & qualité" },
				{ name: "Vercel", role: "Déploiement avec deploy hooks pour rebuild à la demande, domaine custom oklmdragclub.com", group: "Production" }
			],
			metrics: [
				{ label: "Sources de données", value: "3 (RSS Anchor.fm, Apple Podcasts API, Deezer API)" },
				{ label: "Fichiers de test", value: "3 suites (rss, shows, utils)" },
				{ label: "Émissions supportées", value: "6 séries" },
				{ label: "Plateformes d'écoute", value: "4 (Spotify, Apple Podcasts, Deezer, Amazon Music)" },
				{ label: "Images OG générées", value: "3 niveaux (home, émission, épisode)" },
				{ label: "Accessibilité", value: "Skip links, ARIA labels, focus clavier, prefers-reduced-motion" },
				{ label: "Sécurité", value: "Sanitisation HTML, CSP headers, safeJsonLd(), permissions policy" }
			],
			media: [
				{
					type: "embed",
					src: "/assets/media/projects/oklm-drag-club/pipeline-diagram.html",
					caption: "Pipeline de données — RSS → APIs → Build statique"
				},
				{
					type: "video",
					src: "/assets/media/projects/oklm-drag-club/oklm-demo.mp4",
					caption: "Parcours utilisateur — navigation, filtres, épisodes"
				},
				{
					type: "video",
					src: "/assets/media/projects/oklm-drag-club/oklm-responsive.mp4",
					caption: "Vue responsive — mobile et tablette"
				},
				{
					type: "image",
					src: "/assets/media/projects/oklm-drag-club/design-system-1.webp",
					caption: "Design System — Cover"
				},
				{
					type: "image",
					src: "/assets/media/projects/oklm-drag-club/design-system-2.webp",
					caption: "Design System — Couleurs OKLCH"
				},
				{
					type: "image",
					src: "/assets/media/projects/oklm-drag-club/design-system-3.webp",
					caption: "Design System — Typographie"
				},
				{
					type: "image",
					src: "/assets/media/projects/oklm-drag-club/design-system-4.webp",
					caption: "Design System — Composants"
				},
				{
					type: "image",
					src: "/assets/media/projects/oklm-drag-club/design-system-5.webp",
					caption: "Design System — Formulaires"
				},
				{
					type: "image",
					src: "/assets/media/projects/oklm-drag-club/design-system-6.webp",
					caption: "Design System — Grille & Spacing"
				},
				{
					type: "image",
					src: "/assets/media/projects/oklm-drag-club/design-system-7.webp",
					caption: "Design System — Iconographie"
				}
			]
		}
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
					title: "Catalogue d'étoiles avec recherche et filtres",
					description: "Parcourez un catalogue d'étoiles avec recherche textuelle, filtres avancés et pages de détail. Les données sont paginées côté serveur et mises en cache via node-cache."
				},
				{
					title: "Authentification sécurisée JWT + CSRF",
					description: "Inscription, connexion et déconnexion avec tokens JWT stockés en cookies httpOnly. Chaque requête mutante est protégée par un token CSRF synchronisé via intercepteur Axios."
				},
				{
					title: "Flux d'achat complet",
					description: "Panier avec contrôle des quantités, liste de souhaits persistante, formulaire de commande avec simulation de paiement et historique des commandes avec suivi de statut."
				},
				{
					title: "Dashboard admin",
					description: "Interface réservée aux administrateurs exposant des statistiques système (utilisateurs, commandes, revenus) et la gestion des utilisateurs via des endpoints dédiés."
				}
			],
			decisions: [
				{
					title: "Zustand plutôt que Redux",
					description: "Redux Toolkit est surdimensionné pour 5 stores : le boilerplate slices/thunks n'apporte pas de valeur. Zustand pèse ~1 KB gzippé, ne nécessite pas de Provider, et offre des re-renders granulaires nativement."
				},
				{
					title: "Conteneur DI custom plutôt que Awilix ou InversifyJS",
					description: "Le conteneur custom (~220 lignes, zéro dépendance) couvre exactement les besoins du projet : register, resolve, singleton. InversifyJS requiert TypeScript et décorateurs, incompatible avec un backend JavaScript pur."
				},
				{
					title: "Repository pattern côté frontend",
					description: "Les appels HTTP (Axios) sont encapsulés dans des repositories typés, séparés des stores Zustand et des composants. Cela symétrise l'architecture avec le backend et permet de mocker les appels API dans les tests sans toucher à Axios."
				}
			],
			stack: [
				{ name: "React 18 + TypeScript 5", role: "Framework UI avec typage statique complet côté client", group: "Frontend" },
				{ name: "Zustand", role: "State management global (panier, wishlist, auth) — 5 stores", group: "Frontend" },
				{ name: "React Router v7", role: "Routing client-side avec routes protégées", group: "Frontend" },
				{ name: "Tailwind CSS", role: "Styling utility-first avec design system personnalisé (tokens, palettes, élévations)", group: "Frontend" },
				{ name: "Axios", role: "Client HTTP avec intercepteurs pour l'injection automatique du token CSRF et du header Authorization", group: "Frontend" },
				{ name: "Node.js + Express", role: "Serveur API RESTful organisé en couches MVC avec conteneur DI", group: "Backend & API" },
				{ name: "Sequelize + PostgreSQL 15", role: "ORM relationnel avec 8 modèles (User, Star, Cart, CartItem, Order, OrderStar, Review, Wishlist)", group: "Backend & API" },
				{ name: "Swagger / OpenAPI", role: "Documentation interactive de l'API exposée sur /api-docs, 9 groupes de routes documentés", group: "Backend & API" },
				{ name: "JWT + tokens CSRF", role: "Authentification stateless via cookies httpOnly et protection CSRF sur toutes les routes mutantes", group: "Sécurité" },
				{ name: "Joi + DOMPurify", role: "Validation de schéma côté serveur (Joi) et sanitisation HTML côté client (DOMPurify)", group: "Sécurité" },
				{ name: "Helmet + express-rate-limit", role: "Headers de sécurité HTTP (CSP, HSTS) et limitation de débit par IP", group: "Sécurité" },
				{ name: "Winston", role: "Logging structuré avec transports fichier et console, niveaux error/warn/info", group: "Monitoring & Logs" },
				{ name: "Sentry", role: "Monitoring d'erreurs en production — intégré côté frontend (React) et backend (Express)", group: "Monitoring & Logs" },
				{ name: "Jest + Supertest", role: "Tests unitaires des services backend et tests frontend avec jsdom", group: "Tests & qualité" },
				{ name: "Biome", role: "Linter et formateur unifié partagé entre client et serveur (remplace ESLint + Prettier)", group: "Tests & qualité" },
				{ name: "Docker + docker-compose", role: "Orchestration locale des 3 services (client, serveur, PostgreSQL) en un seul docker-compose up", group: "Déploiement & CI" },
				{ name: "GitHub Actions", role: "Pipeline CI : lint, typecheck et tests déclenchés à chaque push", group: "Déploiement & CI" }
			],
			metrics: [
				{ label: "Groupes de routes API", value: "9 (stars, auth, users, orders, cart, wishlist, reviews, payments, admin)" },
				{ label: "Fichiers de tests unitaires backend", value: "4 (cartService, orderService, paymentValidator, bcryptHashingService)" },
				{ label: "Assertions / blocs de test backend", value: "101 occurrences describe/it/test sur 4 fichiers" },
				{ label: "Fichiers de tests frontend", value: "4 (passwordValidation, cartCalculations, orderTypes, AuthContainer)" },
				{ label: "Modèles Sequelize", value: "8" },
				{ label: "ADRs documentés", value: "5 (zustand, DI container, JS backend, sequelize sync, repository pattern)" }
			]
		}
	}
];
