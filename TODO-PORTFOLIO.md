# Portfolio - Plan d'amelioration

## Contexte personnel

**Josue Rocha** - Consultant Mainframe Junior chez une ESN a Strasbourg
- Specialisation : COBOL, z/OS, JCL, DB2, CICS - secteur banque & assurance
- Formation POEI Mainframe (M2i, oct 2025 - jan 2026)
- Ancien parcours : Titre Pro CDA (O'Clock), reconversion depuis le droit
- Passion : dev web moderne (React, TypeScript, Next.js)
- Langues : FR, EN, PT

**Positionnement du portfolio :**
Un dev mainframe qui maitrise aussi le web moderne. Profil hybride rare = argument de differenciation.
Le portfolio sert a montrer la polyvalence, la rigueur (mainframe) ET la creativite (web).

---

## Projets GitHub a integrer/mettre a jour

| Projet | Repo | Stack | Statut reel | Action |
|--------|------|-------|-------------|--------|
| La Lunetterie du Coin | `la-lunetterie-du-coin` + `la-lunetterie-du-coin-backend` | React/TS/Vite + Node/Express/PostgreSQL | Avance | Mettre "in-progress", ajouter lien GitHub |
| Rayssa Harmes Avocate | `rayssa-harmes-avocate` | Next.js 14, Tailwind, Framer Motion | Avance | Passer de "concept" a "completed" ou "in-progress" |
| Stella E-commerce | `stella-ecommerce` | Full-stack (client/server) | En dev | Garder "in-progress", ajouter details |
| Agent IA Veille Techno | `formation-ia` | Python, RAG, LLM, ReAct | Termine (formation) | AJOUTER au portfolio |
| Tour de Controle | `tour-de-controle` | Full-stack + Docker | En dev | Evaluer si montrable |
| LeetCode 75 C++ | `leetcode-75-cpp` | C++ | En cours | Mentionner dans bio/competences |
| POEI COBOL | `poei-cobol` | COBOL, JCL, z/OS, DB2 | Termine | Mentionner dans bio, pas forcement projet carte |
| IBM zXplore | `ibm-zxplore-learning-path` | z/OS, JCL, COBOL | Termine | Idem |

---

## SECTION 1 : Mise a jour du contenu & positionnement

### Objectif
Refleter le profil actuel : consultant mainframe + dev web passione.

### Taches
- [x] Reecrire la bio (section `bio.json` dans les 3 langues)
- [x] Mettre a jour les phrases hero (`hero.json`)
- [x] Mettre a jour les meta SEO (description, JSON-LD, OG, Twitter)
- [x] Mettre a jour les adjectives dans bio
- [ ] Refonte visuelle de la section bio (session dediee)

### Idees pour la bio visuelle (a travailler dans une session dediee)
- Timeline visuelle du parcours (droit -> web -> mainframe) avec icones et dates
- Chiffres cles en gros (5 ans droit, 3 langues, 2 mondes tech)
- Tags/badges pour les competences au lieu de paragraphes
- Cards ou layout en grille au lieu de blocs de texte
- Icones par etape du parcours (balance justice, code, mainframe)

### Prompt pour cette session :
```
Je veux mettre a jour le contenu de mon portfolio. Je suis consultant mainframe junior
(COBOL, z/OS, JCL, DB2, CICS) dans le secteur banque/assurance chez une ESN a Strasbourg.
Mon parcours : reconversion droit -> dev web (O'Clock, titre pro CDA) -> POEI mainframe -> poste actuel.
Mon angle : profil hybride, rigueur du legacy + passion du web moderne.

Mets a jour :
1. Les fichiers i18n bio.json (fr/en/pt)
2. Les phrases hero (hero.json, fr/en/pt)
3. Le JSON-LD dans index.html
4. Les meta descriptions

Garde un ton professionnel mais humain, pas corporate.
```

---

## SECTION 2 : Mise a jour des projets

### Objectif
Remplacer les projets "concept" par des vrais projets avec code source.

### Taches
- [x] Mettre a jour `src/data/projects.ts` (5 projets reels)
- [x] Ajouter githubUrl et demoUrl a l'interface Project
- [x] Retirer poete et parcours CDA
- [x] Ajouter Luciole (Agent IA) et Tour de Controle
- [x] Passer Rayssa en "completed", Stella en "completed"
- [x] Mettre a jour les traductions projets (projects.json x3 langues)
- [ ] Creer les images optimisees pour Luciole et Tour de Controle (actuellement images placeholder)
- [ ] Creer repo perso `josuerochadev/tour-de-controle` (hors org O'Clock)
- [ ] Ajouter githubUrl Tour de Controle une fois repo cree
- [ ] Ajouter les boutons GitHub/Demo dans le composant project-detail.tsx
- [ ] Repenser l'interface de la page projet (layout, cards, interactions) — session dediee

### Prompt pour cette session :
```
Mets a jour les projets du portfolio. Voici l'etat reel de mes repos :

1. la-lunetterie-du-coin : React/TS/Vite + backend Node/Express/PostgreSQL. App de prise
   de RDV pour opticien. Statut : avance, en finalisation.
2. rayssa-harmes-avocate : Next.js 14, Tailwind, i18n. Site pro pour avocate. Avance.
3. stella-ecommerce : Full-stack avec client/server separes. E-commerce fictif. En dev.
4. formation-ia : Agent IA Python - veille techno avec RSS, enrichissement LLM, RAG,
   agent conversationnel ReAct. Projet de formation termine.
5. [tour-de-controle si pertinent]

Retire les projets purement conceptuels sans code (poete, parcours CDA).
Ajoute les champs githubUrl et demoUrl a l'interface Project.
Mets a jour projects.ts et les fichiers projects.json (fr/en/pt).
```

---

## SECTION 3 : Dark Mode

### Objectif
Ajouter un toggle dark/light mode avec une palette coherente.

### Palette proposee

| Token | Light mode | Dark mode |
|-------|-----------|-----------|
| `bg-primary` | #F5F0E8 (beige) | #1A1A2E (navy-dark) |
| `bg-secondary` | #FFFFFF | #16213E |
| `text-primary` | #1A1A2E (violet-dark) | #F5F0E8 (beige) |
| `text-secondary` | #4A4A4A | #B8B8CC |
| `accent-1` | #B5FF00 (lime) | #B5FF00 (lime - inchange) |
| `accent-2` | #FF7A00 (orange) | #FF9F40 (orange clair) |
| `accent-3` | #6900FF (violet) | #9D4EDD (violet clair) |
| `surface` | #FFFFFF | #0F0F23 |
| `border` | #E5E5E5 | #2A2A4A |

### Taches
- [ ] Definir la palette dark dans `tailwind.config.ts` (CSS variables)
- [ ] Ajouter class `dark` sur `<html>` + toggle
- [ ] Creer composant `ThemeToggle` (sun/moon icon)
- [ ] Stocker preference dans localStorage + respecter `prefers-color-scheme`
- [ ] Adapter les composants existants (navbar, cards, footer, etc.)
- [ ] Tester le contraste WCAG en dark mode

### Prompt pour cette session :
```
Ajoute un dark mode au portfolio. Utilise la strategie "class" de Tailwind.
Palette dark definie dans TODO-PORTFOLIO.md section 3.
- CSS variables dans index.css pour les couleurs
- Toggle dans un composant ThemeToggle (icone sun/moon)
- Persistence localStorage + detection prefers-color-scheme
- Adapter tous les composants pour utiliser les variables
```

---

## SECTION 4 : Formulaire de contact

### Objectif
Formulaire fonctionnel et gratuit pour recevoir des emails.

### Options gratuites evaluees

| Service | Gratuit | Limite | Setup |
|---------|---------|--------|-------|
| **Formspree** | 50 soumissions/mois | Simple, pas de backend | HTML action ou fetch |
| **Web3Forms** | 250 emails/mois | Cle API, pas de backend | fetch POST |
| **EmailJS** | 200 emails/mois | SDK JS, templates | SDK cote client |
| **Resend** | 100 emails/jour | API, domaine custom | Serverless function |
| **Getform** | 50 soumissions/mois | Dashboard, spam filter | HTML action ou fetch |

### Recommandation : **Web3Forms** ou **Formspree**
- Pas de backend necessaire (tout cote client)
- Anti-spam (honeypot + hCaptcha gratuit)
- Gratuit largement suffisant pour un portfolio

### Taches
- [ ] Choisir le service (Web3Forms recommande : 250/mois, gratuit)
- [ ] Creer un composant `ContactForm.tsx`
  - Champs : nom, email, message
  - Validation cote client (required, email format)
  - Honeypot anti-spam
  - Etat loading/success/error
  - Accessible (labels, aria, focus management)
- [ ] Integrer dans la section contact existante
- [ ] Traduire labels et messages (i18n)
- [ ] Tester l'envoi

### Prompt pour cette session :
```
Ajoute un formulaire de contact fonctionnel au portfolio.
Utilise Web3Forms (gratuit, 250 emails/mois, pas de backend).
- Composant ContactForm.tsx avec : nom, email, message
- Validation client + honeypot anti-spam
- Etats : idle, loading, success, error
- i18n (ajouter les traductions dans common.json ou un contact.json)
- Accessible (labels, aria-describedby pour erreurs, focus trap sur erreurs)
- Style coherent avec le design existant (lime CTA, beige bg, etc.)
- fetch POST vers https://api.web3forms.com/submit
```

---

## SECTION 5 : Blog technique

### Objectif
Blog simple, gratuit, integre au portfolio ou en lien.

### Options gratuites

| Solution | Avantages | Inconvenients |
|----------|-----------|---------------|
| **MDX dans le projet** | Integre, meme design, SEO | Plus de build time, setup |
| **Hashnode** | Gratuit, domaine custom, SEO | Externe, moins de controle |
| **dev.to** | Communaute, gratuit | Pas de custom design |
| **Notion + Super.so** | Facile a ecrire | Payant pour custom domain |
| **GitHub Pages + Astro** | Gratuit, rapide, MD | Projet separe |

### Recommandation : **Hashnode** pour commencer
- Zero setup, tu ecris direct
- Custom domain gratuit (blog.josuerochadev.com)
- API GraphQL pour afficher les articles sur le portfolio
- SEO excellent out of the box
- Migration facile vers MDX plus tard si besoin

### Taches
- [ ] Creer compte Hashnode + configurer domaine
- [ ] Ecrire 2-3 premiers articles :
  - "Du droit au mainframe : mon parcours de reconversion"
  - "COBOL en 2026 : pourquoi c'est encore pertinent"
  - "Ce que le mainframe m'a appris sur le code propre"
- [ ] Ajouter un lien "Blog" dans la navbar du portfolio
- [ ] (Optionnel) Fetch les derniers articles via API Hashnode pour les afficher

### Prompt pour cette session :
```
Ajoute un lien Blog dans la navbar du portfolio qui pointe vers une URL externe
(mon Hashnode). Ajoute aussi une petite section "Derniers articles" sur la home page
qui affiche 2-3 cards avec titre + date. Pour l'instant, utilise des donnees en dur
dans un fichier articles.ts, on connectera l'API Hashnode plus tard.
Traduis le tout en 3 langues.
```

---

## SECTION 6 : Section competences

### Objectif
Visualisation claire des competences pour les recruteurs.

### Taches
- [ ] Creer composant `Skills.tsx` ou integrer dans bio
- [ ] Categories :
  - **Mainframe** : COBOL, JCL, z/OS, TSO/ISPF, DB2/SQL, CICS, VSAM
  - **Frontend** : React, TypeScript, Next.js, Tailwind CSS, Framer Motion
  - **Backend** : Node.js, Express, PostgreSQL, Prisma
  - **Outils** : Git, Docker, Vite, Vitest, Playwright
  - **IA/Data** : Python, LLM, RAG, LangChain
  - **Langues** : Francais (natif), Anglais (courant), Portugais (natif)
- [ ] Design : tags/badges groupes par categorie, pas de barres de pourcentage
- [ ] Animation : fade-in sequentiel au scroll
- [ ] i18n des labels de categories

### Prompt pour cette session :
```
Ajoute une section Competences au portfolio, entre la section Bio et Contact.
Design : categories avec des badges/tags (pas de barres de progression).
Categories : Mainframe, Frontend, Backend, Outils, IA/Data, Langues.
Utilise le composant FadeInUpOnScroll existant pour l'animation.
Traduis les noms de categories dans les 3 langues.
Style : fond violet-dark, badges en lime/orange/violet selon categorie.
```

---

## Ordre de priorite recommande

1. **Section 1** - Contenu & positionnement (rapide, fort impact)
2. **Section 2** - Projets reels (credibilite)
3. **Section 6** - Competences (lisibilite recruteur)
4. **Section 4** - Formulaire contact (conversion)
5. **Section 3** - Dark mode (polish)
6. **Section 5** - Blog (long terme)

---

## Notes techniques

- Branch de travail actuelle : `feat/i18n-seo-a11y-security`
- Deploiement : Vercel (auto-deploy sur `main`)
- Tester chaque section individuellement avant merge
- Garder les scores Lighthouse > 90
- Verifier l'accessibilite apres chaque ajout (axe, heading audit)
