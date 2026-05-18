<div align="center">

# josuerocha.dev

**Portfolio personnel trilingue, accessible et performant.**

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

[Demo](https://josuerocha.dev) · [Portfolio](https://josuerocha.dev) · [Signaler un bug](https://github.com/josuerochadev/portfolio/issues)

</div>

---

## A propos

Ce portfolio est le socle de ma presence en ligne en tant que developpeur. Il presente mes projets, mon parcours et mes competences techniques. Le site est trilingue (francais, anglais, portugais), concu avec une attention particuliere a l'accessibilite et aux performances web.

Construit pendant ma reconversion vers le mainframe, ce projet m'a permis de consolider mes acquis React/TypeScript tout en explorant les standards modernes du web (WCAG, Core Web Vitals, testing E2E).

<!-- Screenshot : remplacer par une capture recente du site -->
![Apercu du portfolio](public/assets/images/preview-og.webp)

## Fonctionnalites

- Interface trilingue FR/EN/PT avec detection automatique de la langue du navigateur
- Animations fluides avec Framer Motion et smooth scroll via Lenis
- Pages projet detaillees avec navigation contextuelle
- Conformite WCAG AA : skip links, navigation clavier, support reduced-motion, contrastes valides
- Error boundaries multi-niveaux (app, page, section)
- Score Lighthouse 85+ en performance, 95+ en accessibilite
- Deploiement continu sur Vercel avec preview sur chaque PR

## Stack technique

| Categorie | Outils |
|---|---|
| Framework | React 19, React Router v7 |
| Langage | TypeScript (strict) |
| Build | Vite 5 |
| Styles | Tailwind CSS 3, plugins forms/typography/aspect-ratio |
| Animations | Framer Motion, Lenis (smooth scroll) |
| i18n | i18next, react-i18next, i18next-browser-languagedetector |
| Tests unitaires | Vitest, Testing Library |
| Tests E2E | Playwright |
| Qualite | ESLint, Biome |
| Performance | Lighthouse CI |
| Analytics | Vercel Analytics |
| Deploiement | Vercel |

## Demarrer

### Prerequis

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/josuerochadev/portfolio.git
cd portfolio
npm install
npm run dev
```

Le site sera accessible sur `http://localhost:5173`.

### Scripts disponibles

| Script | Description |
|---|---|
| `npm run dev` | Serveur de developpement avec HMR |
| `npm run build` | Build de production |
| `npm run preview` | Preview du build de production |
| `npm run lint` | Linting ESLint |
| `npm run test` | Tests unitaires (mode watch) |
| `npm run test:run` | Tests unitaires (execution unique) |
| `npm run test:coverage` | Couverture de code |
| `npm run test:e2e` | Tests end-to-end Playwright |
| `npm run test:e2e:ui` | Interface graphique Playwright |
| `npm run lighthouse` | Audit Lighthouse CI |
| `npm run release:check` | Verification pre-release (tests + lint + changelog) |

## Architecture

```
src/
├── assets/              # Images et ressources statiques
├── components/
│   ├── common/          # Composants reutilisables (animations, layout)
│   ├── effects/         # Effets visuels (ripple, grilles)
│   ├── layout/          # Structure de page (navbar, footer)
│   └── sections/        # Sections specifiques (hero, bio)
├── constants/           # Constantes (couleurs, animations)
├── data/                # Donnees statiques des projets
├── hooks/               # Hooks personnalises
├── i18n/
│   └── locales/         # Traductions FR, EN, PT
├── pages/               # Pages (home, project-detail, legal, 404)
├── utils/               # Fonctions utilitaires
└── __tests__/           # Tests unitaires
e2e/                     # Tests end-to-end Playwright
docs/                    # Documentation technique (patterns, performance, workflow)
```

---

Construit par **[Josue Rocha](https://josuerocha.dev)** · [LinkedIn](https://linkedin.com/in/josuerocha) · [GitHub](https://github.com/josuerochadev)
