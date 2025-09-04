# Architecture du Projet Portfolio

## Structure des Dossiers

```
src/
├── pages/                    # Pages principales de l'application
│   ├── HomePage.tsx         # Page d'accueil (lazy-loaded)
│   ├── LegalNotice.tsx      # Mentions légales
│   ├── PrivacyPolicy.tsx    # Politique de confidentialité
│   ├── ProjectDetail.tsx    # Détail des projets
│   └── NotFound.tsx         # Page 404
│
├── components/              # Composants réutilisables
│   ├── layout/             # Composants de mise en page
│   │   ├── navbar.tsx      # Navigation principale
│   │   ├── footer.tsx      # Pied de page
│   │   ├── background-gradient.tsx
│   │   └── photo-frame.tsx
│   │
│   ├── sections/           # Sections de la page d'accueil
│   │   ├── hero.tsx        # Section héro
│   │   ├── projects.tsx    # Section projets
│   │   ├── bio.tsx         # Section biographie
│   │   └── contact.tsx     # Section contact
│   │
│   ├── common/             # Composants génériques
│   │   ├── animations/     # Composants d'animation
│   │   │   ├── fade-in-down.tsx
│   │   │   ├── fade-in-up.tsx
│   │   │   └── fade-in-up-on-scroll.tsx
│   │   ├── scroll-to-top.tsx
│   │   ├── bottom-blur.tsx
│   │   └── ScrollToTopOnRouteChange.tsx
│   │
│   └── effects/            # Effets visuels spéciaux
│       ├── letter-ripple.tsx
│       ├── profile-background.tsx
│       └── smile-grid.tsx
│
├── utils/                   # Utilitaires
│   └── motion-variants.ts   # Variantes d'animation Framer Motion
│
├── data/                    # Données statiques
│   └── projects.ts          # Données des projets
│
├── assets/                  # Ressources statiques
│   └── images/
│       ├── bio/
│       └── ui/
│
├── __tests__/              # Tests centralisés
│   ├── components/
│   │   └── layout/
│   └── data/
│
└── test/                   # Configuration des tests
    └── setup.ts
```

## Conventions de Nommage

- **Fichiers** : kebab-case (ex: `fade-in-up.tsx`)
- **Composants** : PascalCase (ex: `HomePage`, `FadeInUp`)
- **Variables/Fonctions** : camelCase (ex: `showCurtain`, `handleClick`)
- **Constantes** : SCREAMING_SNAKE_CASE (ex: `PROJECTS`)

## Principes d'Organisation

### Pages (`src/pages/`)
Contient toutes les pages principales de l'application. Chaque page correspond à une route React Router.

### Composants (`src/components/`)
- **layout** : Composants de structure (navbar, footer)
- **sections** : Sections spécifiques à la page d'accueil
- **common** : Composants réutilisables dans tout le projet
- **effects** : Effets visuels et animations complexes

### Tests (`src/__tests__/`)
Structure miroir du code source pour faciliter la navigation et la maintenance.

### Lazy Loading
Toutes les pages sont chargées de manière paresseuse pour optimiser les performances :
```typescript
const HomePage = lazy(() => import("./pages/HomePage"));
```

## Amélioration par Rapport à l'Ancienne Structure

### Avant :

- HomePage dans `components/pages/` (incohérent)
- Tests dispersés dans différents dossiers
- Nommage snake_case/kebab-case mixte

### Après :

- Séparation claire pages/composants
- Tests centralisés
- Convention de nommage uniforme
- Lazy loading cohérent pour toutes les pages