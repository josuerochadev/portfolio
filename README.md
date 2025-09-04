# Portfolio - Josué Rocha

## 🎯 Description

Portfolio moderne et performant développé avec les dernières technologies React, mettant l'accent sur l'expérience utilisateur, l'accessibilité, et les performances web optimisées.

**Objectifs du projet:**
- Présenter mon travail et compétences de développeur
- Démontrer la maîtrise des technologies modernes du web
- Atteindre des scores Lighthouse exceptionnels (>90)
- Respecter les standards d'accessibilité WCAG

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ 
- pnpm (recommandé) ou npm

### Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/portfolio.git
cd portfolio

# Installer les dépendances
pnpm install

# Lancer en développement
pnpm dev
```

Le site sera accessible sur `http://localhost:5173`

## 📦 Scripts disponibles

```bash
# Développement
pnpm dev                    # Serveur de développement avec HMR
pnpm preview                # Preview de la build de production

# Build & déploiement
pnpm build                  # Build pour production
pnpm vercel-build           # Build optimisé pour Vercel

# Tests & qualité
pnpm test                   # Tests unitaires avec Vitest
pnpm test:run               # Tests sans mode watch
pnpm test:coverage          # Couverture de code
pnpm test:e2e               # Tests end-to-end avec Playwright
pnpm test:e2e:ui            # Interface graphique Playwright
pnpm lint                   # Linting avec ESLint

# Performance
pnpm lighthouse             # Audit Lighthouse CI
```

## 🛠️ Stack technique

### Frontend
- **React 19** - Framework UI avec les dernières fonctionnalités
- **TypeScript** - Typage statique pour une meilleure DX
- **Vite** - Build tool ultra-rapide avec HMR
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations fluides et performantes

### Routing & Navigation  
- **React Router v7** - Navigation SPA moderne
- **Lenis** - Smooth scroll optimisé

### Testing
- **Vitest** - Tests unitaires ultra-rapides
- **Playwright** - Tests E2E multi-navigateurs
- **Testing Library** - Tests orientés utilisateur

### Qualité & Performance
- **ESLint** + **TypeScript ESLint** - Linting avancé
- **Biome** - Formatter ultra-rapide
- **Lighthouse CI** - Monitoring des performances
- **Vercel Analytics** - Métriques temps réel

## 🏗️ Architecture du projet

```
src/
├── components/          # Composants réutilisables
│   ├── common/         # Composants génériques (animations, layout)
│   ├── effects/        # Effets visuels (ripple, grilles)
│   ├── layout/         # Structure de page (navbar, footer)
│   └── sections/       # Sections spécifiques (hero, contact)
├── pages/              # Pages de l'application
├── utils/              # Fonctions utilitaires
├── constants/          # Constantes (couleurs, animations)
└── __tests__/          # Tests unitaires
```

## 🎨 Fonctionnalités

### ✨ Animations & Interactions
- Animations Framer Motion optimisées
- Effet ripple interactif sur le nom
- Smooth scroll avec Lenis
- Lazy loading intelligent des composants

### 🎯 Performance  
- Score Lighthouse >85 (objectif 90+)
- Optimisation LCP < 2.5s
- Images WebP avec fallback
- Code splitting automatique

### ♿ Accessibilité
- Conformité WCAG AA/AAA
- Navigation clavier complète
- Skip links pour screen readers
- Contrastes de couleurs validés
- Support reduced-motion

### 🛡️ Robustesse
- Error boundaries comprensifs
- Tests E2E multi-navigateurs  
- TypeScript strict
- Gestion d'état optimisée

## 🚀 Déploiement

Le projet est configuré pour un déploiement automatique sur **Vercel** :

1. Push sur `main` déclenche un déploiement
2. Les PR créent des preview deployments
3. Lighthouse CI vérifie les performances automatiquement

## 📊 Performances actuelles

- **Lighthouse Performance**: 85+ (objectif 90+)
- **Accessibility**: 95+
- **Best Practices**: 100
- **SEO**: 100

## 🤝 Contribution

Ce portfolio est un projet personnel, mais les suggestions d'amélioration sont bienvenues via les issues GitHub.

## 📄 Licence

Projet personnel - Tous droits réservés

---

**Développé avec ❤️ par Josué Rocha**  
Portfolio moderne, performant et accessible