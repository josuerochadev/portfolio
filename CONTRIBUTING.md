# Guide de Contribution - Portfolio

## 🎯 Vue d'ensemble

Ce portfolio suit des standards stricts de qualité, performance et accessibilité. Toute contribution doit respecter ces principes.

## 🔧 Setup développement

### Prérequis
- **Node.js** 18+
- **pnpm** (recommandé) ou npm
- **Git** configuré

### Installation
```bash
git clone https://github.com/josuerochadev/portfolio.git
cd portfolio
pnpm install
pnpm dev
```

## 📋 Standards de code

### Architecture
- **Composants** : Un seul composant par fichier
- **Séparation** : `/pages` vs `/components` stricte
- **Nommage** : kebab-case pour fichiers, PascalCase pour composants
- **Imports** : Utilisez `@/` pour les imports relatifs

### TypeScript
- **Mode strict** obligatoire
- **Interfaces** pour tous les props
- **Type safety** : pas de `any`
- **Exports** : export default uniquement

### Styling
- **Tailwind only** : Pas de CSS custom sauf index.css
- **Constants** : Utilisez `@/constants` pour couleurs/animations
- **Responsive** : Mobile-first approach
- **Accessibility** : Respectez WCAG AA minimum

### Performance
- **Lighthouse** : Score >85 minimum (objectif 90+)
- **Bundle size** : <500kb gzippé total
- **Lazy loading** : Obligatoire pour les pages
- **Images** : WebP avec fallback, lazy loading

## 🎨 Patterns obligatoires

### Animations
```typescript
// ✅ Utilisez les composants existants
<SequentialFadeIn startDelay={0.2}>
  {content}
</SequentialFadeIn>

// ❌ Évitez les duplications manuelles
<FadeInUp delay={0.2}>...</FadeInUp>
<FadeInUp delay={0.4}>...</FadeInUp>
```

### Layout
```typescript
// ✅ Template unifié
<PageLayout maxWidth="4xl" withAnimation>
  <SequentialFadeIn>
    {pageContent}
  </SequentialFadeIn>
</PageLayout>
```

### Error Handling
```typescript
// ✅ Protection granulaire
<SectionErrorBoundary sectionName="ComponentName">
  <YourComponent />
</SectionErrorBoundary>
```

## ♿ Accessibilité

### Règles strictes
- **Headings** : Hiérarchie H1→H2→H3 (utilisez `HeadingAudit`)
- **Skip links** : Navigation clavier obligatoire
- **Contraste** : AA minimum (utilisez `utils/accessibility`)
- **ARIA** : Labels pour tous les interactifs
- **Focus** : Visible et logique

### Validation
```bash
# Tests accessibilité
pnpm test:e2e
# Audit automatique des couleurs inclus
```

## 🧪 Tests

### Tests obligatoires
- **E2E** : Playwright pour parcours utilisateur
- **Unitaires** : Vitest pour logique métier
- **Performance** : Lighthouse CI automatique

### Commandes
```bash
pnpm test              # Tests unitaires
pnpm test:e2e          # Tests E2E
pnpm lighthouse        # Audit performance
pnpm lint              # Linting
```

## 🚀 Workflow contribution

### 1. Préparation
```bash
git checkout dev
git pull origin dev
git checkout -b feature/nom-de-votre-feature
```

### 2. Développement
- **Commits atomiques** avec messages clairs
- **Tests** passants avant push
- **Linting** sans erreurs

### 3. Pull Request
- **Base** : `dev` (pas `main`)
- **Tests** : CI doit être vert
- **Description** : Context + changes + test plan
- **Screenshots** : Si changements visuels

### 4. Review process
- **Performance** : Lighthouse >85
- **Accessibility** : Tests E2E passants
- **Code quality** : Review manuel
- **Bundle impact** : Vérification taille

## 📝 Conventions commit

Format : `type(scope): description`

```bash
feat(hero): add ripple effect animation
fix(navbar): resolve mobile menu overlay issue
perf(images): convert SVG to optimized WebP
docs(readme): update installation instructions
refactor(animations): eliminate FadeInUp duplications
```

Types acceptés : `feat`, `fix`, `perf`, `refactor`, `docs`, `test`, `style`

## 🔍 Code Review

### Checklist reviewer
- [ ] **Performance** : Bundle size, Lighthouse score
- [ ] **Accessibility** : WCAG, navigation clavier
- [ ] **TypeScript** : Pas d'any, interfaces complètes
- [ ] **Tests** : Couverture appropriée
- [ ] **Architecture** : Patterns respectés
- [ ] **Comments** : Clean Code (WHY not WHAT)

### Checklist contributeur
- [ ] Tests passants (`pnpm test && pnpm test:e2e`)
- [ ] Linting propre (`pnpm lint`)
- [ ] Performance maintenue (`pnpm lighthouse`)
- [ ] Responsive testé (mobile + desktop)
- [ ] Accessibility validée

## 🛡️ Standards qualité

### Performance budget
- **Initial bundle** : <200kb gzippé
- **Route chunks** : <30kb gzippé
- **Images** : <50kb optimisées
- **LCP** : <2.5s
- **CLS** : <0.1

### Code quality
- **Complexity** : Fonction <15 lignes idéalement
- **DRY** : Éliminez duplications >3 occurrences
- **Comments** : Techniques uniquement, pas d'évidences
- **Imports** : Organisés, pas d'unused

## 🚫 Choses à éviter

### ❌ Interdictions
- CSS custom dans composants (utilisez Tailwind)
- Duplications d'animations manuelles
- `any` en TypeScript
- Commentaires évidents (`// Button component`)
- Images non-optimisées
- Routes non-lazy-loadées

### ⚠️ À minimiser
- Libraries externes (bundle impact)
- Animations sur propriétés layout (width, height)
- Inline styles
- Hardcoded values (utilisez constants)

## 📚 Ressources

### Documentation interne
- **Architecture** : `/architecture.md`
- **Patterns** : `/docs/PATTERNS.md`
- **Performance** : `/docs/PERFORMANCE.md`

### Standards externes
- **WCAG Guidelines** : https://www.w3.org/WAI/WCAG21/quickref/
- **React Best Practices** : https://react.dev/learn
- **TypeScript Handbook** : https://www.typescriptlang.org/docs/

---

**Questions ?** Ouvrez une issue ou consultez la documentation interne.

**Merci** de contribuer à maintenir ce portfolio aux standards professionnels ! 🚀