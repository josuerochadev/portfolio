# Plan medias par projet — Pages detail portfolio

> Document de reference pour les seances de creation de contenu multimedia.
> Chaque projet a sa propre section avec la liste des medias a produire, leur priorite, et un prompt de demarrage pour la seance dediee.

---

## Statut

| Projet | Medias existants | Medias a produire | Statut |
|--------|-----------------|-------------------|--------|
| Tour de Controle | 20 (archi, 2 videos, 6 DS, 5 prints, maquette, 5 diagrammes) | ~6 optionnels | Quasi complet |
| OKLM Drag Club | 10 (pipeline, 2 videos, 7 DS) | ~7 | En cours |
| Luciole | 0 | ~12 | A faire |
| Stella | 0 | ~13 | A faire |
| POEI Mainframe | 0 | ~11 | A faire |

---

## 1. Luciole (agent IA conversationnel)

### Medias a produire

#### Demos (videos)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 1 | **Parcours chat** — question, streaming SSE, outil selectionne, reponse temps reel | `luciole-demo-chat.mp4` | Haute |
| 2 | **Parcours veille** — preview digest, envoi email, historique | `luciole-demo-veille.mp4` | Haute |
| 3 | Upload multimodal — envoi image/PDF, analyse Vision, reponse | `luciole-demo-upload.mp4` | Moyenne |
| 4 | Vue responsive — mobile/tablette | `luciole-responsive.mp4` | Moyenne |

#### Architecture (diagrammes interactifs ou images)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 5 | **Architecture globale** — Frontend Jinja2 <-> FastAPI <-> PostgreSQL/Langfuse + pipeline RSS | `architecture-diagram.html` | Haute |
| 6 | **Pipeline RAG** — RSS -> scraping -> chunking -> embeddings -> scoring hybride (cosine 50% + BM25 25% + fraicheur 25% + feedback 10%) | `rag-pipeline-diagram.html` | Haute |
| 7 | **Boucle agent ReAct** — Reason -> Act -> Observe avec les 7 outils (SQL, search web, RAG, vision, preview digest, send digest, reponse directe) | `react-agent-diagram.html` | Haute |
| 8 | Cascade de modeles — classifier -> flash-lite / flash / pro selon complexite | `model-cascade-diagram.html` ou image | Moyenne |

#### Design System (images)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 9 | Pages du DS Jinja2 — couleurs, typo, composants | `design-system-1.webp` a `design-system-N.webp` | Moyenne |

#### Monitoring & Tests (captures)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 10 | Capture Langfuse — traces d'un appel LLM (latence, tokens, couts) | `langfuse-trace.webp` | Basse |
| 11 | Resultats des 18 fichiers de test | `tests-results.webp` | Basse |
| 12 | Securite — detection prompt injection ou filtrage PII en action | `security-demo.webp` | Basse |

### Prompt de seance

```
On travaille sur les medias de la page projet Luciole (agent IA conversationnel).
Voir docs/superpowers/plans/2026-05-22-project-media-plan.md section "1. Luciole".

Objectifs de cette seance :
1. Creer les diagrammes HTML interactifs (architecture, pipeline RAG, boucle ReAct, cascade modeles)
2. Preparer les entries media[] dans projects.ts
3. Les videos et captures d'ecran seront fournies par moi, on les integrera au fur et a mesure

Commence par lire le repo Luciole (https://github.com/josuerochadev/luciole) pour comprendre l'architecture et produire des diagrammes fideles.
```

---

## 2. Stella (e-commerce)

### Medias a produire

#### Demos (videos)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 1 | **Parcours achat** — catalogue, filtres, detail etoile, ajout panier, commande | `stella-demo-achat.mp4` | Haute |
| 2 | **Parcours auth + profil** — inscription, login, wishlist, historique commandes | `stella-demo-auth.mp4` | Haute |
| 3 | Parcours admin — dashboard stats, gestion utilisateurs | `stella-demo-admin.mp4` | Moyenne |
| 4 | Vue responsive — mobile/tablette | `stella-responsive.mp4` | Moyenne |

#### Architecture (diagrammes)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 5 | **Architecture globale** — React <-> Express <-> PostgreSQL + Sequelize 9 modeles | `architecture-diagram.html` | Haute |
| 6 | **Schema des 9 modeles Sequelize** — relations et associations (ERD) | `erd.webp` ou `erd-diagram.html` | Haute |
| 7 | Diagramme DI container — flux register -> resolve -> singleton | `di-container-diagram.html` | Moyenne |
| 8 | Flux auth JWT + CSRF — double protection cookies httpOnly + token synchronise | `auth-flow-diagram.html` | Moyenne |

#### Design System (images)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 9 | Tokens, palettes, composants Tailwind | `design-system-1.webp` a `design-system-N.webp` | Moyenne |

#### Documentation & Tests (captures)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 10 | Swagger API — capture des 12 tags documentes | `swagger-api.webp` | Moyenne |
| 11 | Resultats Playwright — 3 specs E2E (auth, catalog, navigation) | `e2e-results.webp` | Basse |
| 12 | Resultats Jest — 101 assertions backend + 35 frontend | `tests-results.webp` | Basse |
| 13 | Pipeline GitHub Actions — CI lint/typecheck/tests/E2E/security audit | `ci-pipeline.webp` | Basse |

### Prompt de seance

```
On travaille sur les medias de la page projet Stella (e-commerce).
Voir docs/superpowers/plans/2026-05-22-project-media-plan.md section "2. Stella".

Objectifs de cette seance :
1. Creer les diagrammes HTML interactifs (architecture, ERD 9 modeles, DI container, flux auth)
2. Creer le design system en images si disponible
3. Preparer les entries media[] dans projects.ts
4. Les videos et captures d'ecran seront fournies par moi

Commence par lire le repo Stella (https://github.com/josuerochadev/stella-ecommerce) pour comprendre l'architecture.
```

---

## 3. POEI Mainframe (gestion clientele z/OS)

### Medias a produire

#### Demos (videos)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 1 | **Demo web** — simulation des programmes batch et ecrans CICS via l'API Flask | `mainframe-demo.mp4` | Haute |
| 2 | **Ecrans CICS** — navigation dans les 7 transactions (AFFI, AJOU, MAJO, SUPP, DELG, LGEN, STAT) | `mainframe-cics.mp4` | Haute |
| 3 | Compilation GnuCOBOL en terminal — montrer que le code compile reellement | `mainframe-compilation.mp4` | Moyenne |

#### Architecture (diagrammes)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 4 | **Double architecture** — z/OS (COBOL/JCL/VSAM/CICS/DB2) + Docker (GnuCOBOL/Flask/SQLite) | `architecture-diagram.html` | Haute |
| 5 | Schema DB2 — 5 tables avec relations | `erd.webp` ou `erd-diagram.html` | Haute |
| 6 | Flux CICS pseudo-conversationnel — SEND MAP -> RETURN TRANSID -> RECEIVE MAP avec COMMAREA | `cics-flow-diagram.html` | Haute |

#### Maquettes & Code (images)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 7 | **Captures ecrans BMS** — les 7 maps d'ecran (les "interfaces" du mainframe) | `bms-1.webp` a `bms-7.webp` | Haute |
| 8 | Code COBOL annote — capture d'un programme representatif (ex: CRUD CICS) | `cobol-sample.webp` | Moyenne |
| 9 | JCL de compilation — capture d'un job representatif | `jcl-sample.webp` | Moyenne |

#### Tests & Environnement (captures)
| # | Contenu | Fichier attendu | Priorite |
|---|---------|-----------------|----------|
| 10 | GitHub Actions CI — 15/15 programmes qui compilent | `ci-results.webp` | Basse |
| 11 | Terminal Hercules TK5 — capture de l'emulateur z/OS en action | `hercules-tk5.webp` | Basse |

### Prompt de seance

```
On travaille sur les medias de la page projet POEI Mainframe (gestion clientele z/OS).
Voir docs/superpowers/plans/2026-05-22-project-media-plan.md section "3. POEI Mainframe".

Objectifs de cette seance :
1. Creer les diagrammes HTML (double architecture z/OS+Docker, ERD DB2, flux CICS pseudo-conversationnel)
2. Preparer les entries media[] dans projects.ts
3. Les videos, captures BMS et captures d'ecran seront fournies par moi

Commence par lire le repo Mainframe (https://github.com/josuerochadev/fil-rouge-mainframe) pour comprendre l'architecture.
```

---

## 4. OKLM Drag Club (site vitrine podcast) — Completer

### Medias existants
- Pipeline diagram (embed HTML)
- 2 videos (demo + responsive)
- 7 images design system

### Medias a ajouter

| # | Contenu | Fichier attendu | Priorite | Group |
|---|---------|-----------------|----------|-------|
| 1 | OG images generees — home, emission, episode (les 3 niveaux) | `og-images.webp` | Haute | SEO & Performance |
| 2 | Lighthouse score — perf/accessibility/SEO/best practices | `lighthouse.webp` | Haute | SEO & Performance |
| 3 | JSON-LD structure — PodcastSeries + PodcastEpisode dans DevTools | `json-ld.webp` | Moyenne | SEO & Performance |
| 4 | Vue reseau RSS -> APIs — log du build montrant les fetches Apple/Deezer | `build-log.webp` | Moyenne | Architecture |
| 5 | Structure overrides.json — la solution hybride auto + override | `overrides-json.webp` | Basse | Architecture |
| 6 | Terminal du build — output Next.js montrant les pages generees | `build-output.webp` | Basse | Architecture |
| 7 | Resultats Vitest — 4 suites de tests | `tests-results.webp` | Basse | Tests |

### Prompt de seance

```
On travaille sur les medias de la page projet OKLM Drag Club (site vitrine podcast).
Voir docs/superpowers/plans/2026-05-22-project-media-plan.md section "4. OKLM Drag Club".

Le projet a deja 10 medias (pipeline, 2 videos, 7 DS). On veut completer avec le volet SEO/technique.
Objectifs :
1. Ajouter les nouvelles entries media[] dans projects.ts (OG, Lighthouse, JSON-LD, etc.)
2. Les captures d'ecran seront fournies par moi
```

---

## 5. Tour de Controle — Ajouts optionnels

### Medias existants (20)
Architecture, 2 videos, 6 DS, 5 prints, maquette caisse, ERD, MCD, use cases, sequence, arborescence

### Medias optionnels a ajouter

| # | Contenu | Fichier attendu | Priorite | Group |
|---|---------|-----------------|----------|-------|
| 1 | Parcours caisse isole — ouverture, transactions, fermeture, detection ecart | `tour-demo-caisse.mp4` | Moyenne | Demo |
| 2 | Parcours admin — RBAC, gestion personnel, audit trail | `tour-demo-admin.mp4` | Moyenne | Demo |
| 3 | Swagger API — capture des 6 modules de routes | `swagger-api.webp` | Basse | Architecture |
| 4 | Pipeline CI/CD — Docker Compose -> tests -> Vercel/Railway/Neon | `ci-pipeline.webp` | Basse | Architecture |
| 5 | Captures Sentry — dashboard erreurs prod | `sentry-dashboard.webp` | Basse | Monitoring |
| 6 | Resultats tests — Jest 113 + Vitest 36 | `tests-results.webp` | Basse | Tests |

### Prompt de seance

```
On travaille sur les medias de la page projet Tour de Controle.
Voir docs/superpowers/plans/2026-05-22-project-media-plan.md section "5. Tour de Controle".

Le projet a deja 20 medias. On veut ajouter quelques complements optionnels.
Objectifs :
1. Ajouter les nouvelles entries media[] dans projects.ts au fur et a mesure des captures fournies
2. Eventuellement creer une video demo caisse isolee et/ou admin
```

---

## Ordre de seances recommande

1. **Luciole** — Le plus de medias a creer, le plus impressionnant techniquement (agent IA, RAG, streaming)
2. **Stella** — E-commerce complet, beaucoup de diagrammes a produire
3. **POEI Mainframe** — Projet unique, les ecrans BMS et le double diagramme sont tres differenciants
4. **OKLM** — Juste des captures a ajouter, rapide
5. **Tour de Controle** — Deja quasi complet, ajouts mineurs

## Convention de nommage

- Dossier : `public/assets/media/projects/{project-id}/`
- Videos : `{project-id}-demo-{feature}.mp4` ou `{project-id}-responsive.mp4`
- Images DS : `design-system-{N}.webp`
- Diagrammes : `{nom}-diagram.html`
- Captures : `{nom}.webp`
