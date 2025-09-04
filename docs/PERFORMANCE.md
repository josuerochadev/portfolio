# Guide Performance - Portfolio

## 🎯 Objectifs Performance

- **Lighthouse Score**: >90 (actuellement 85+)
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **Bundle Size**: <500kb (gzippé)

## ⚡ Optimisations implémentées

### 1. Code Splitting & Lazy Loading

```typescript
// Route-level splitting
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'));
const NotFound = lazy(() => import('./pages/not-found'));

// Component-level pour les sections lourdes
const HeavyChart = lazy(() => import('./components/heavy-chart'));
```

**Impact**: -40% initial bundle size

### 2. Image Optimizations

```typescript
// WebP avec fallback automatique
<picture>
  <source srcSet="/assets/hero-image.webp" type="image/webp" />
  <img src="/assets/hero-image.jpg" alt="Hero" loading="lazy" />
</picture>
```

**Conversions effectuées**:
- `hand.svg` (125kb) → `hand.webp` (8kb) = **94% réduction**
- Format WebP systématique pour toutes les images >10kb

### 3. Font Loading Strategy

```css
/* Variable fonts pour réduire les requêtes */
@font-face {
  font-family: 'InterVariable';
  src: url('/fonts/inter-variable.woff2') format('woff2-variations');
  font-display: swap; /* Évite FOIT */
  font-weight: 100 900;
}
```

**Optimisations**:
- `font-display: swap` pour éviter FOIT
- Preload des fonts critiques
- Variable fonts (1 fichier vs 9 poids)

### 4. Animation Performance

```typescript
// GPU-accelerated animations uniquement
const optimizedVariants = {
  hidden: { opacity: 0, transform: 'translateY(20px)' },
  visible: { opacity: 1, transform: 'translateY(0px)' }
};

// Évite les propriétés coûteuses (width, height, top, left)
// Utilise transform et opacity uniquement
```

**Métriques**:
- **60fps** maintenu sur mobile
- Pas de Layout Thrashing
- GPU Layers optimisés

### 5. Bundle Analysis

```bash
# Visualisation avec rollup-plugin-visualizer
pnpm build && open dist/stats.html
```

**Top chunks actuels**:
1. **Vendor chunk** (150kb): React, Framer Motion
2. **App chunk** (80kb): Code application
3. **Route chunks** (10-20kb chacun): Pages lazy-loadées

### 6. Critical Path Optimization

```typescript
// Preload des ressources critiques
<link rel="preload" href="/fonts/inter-variable.woff2" as="font" crossorigin />
<link rel="preconnect" href="https://vercel.com" />

// Resource hints pour les navigations probables
<link rel="prefetch" href="/privacy" />
```

## 📊 Métriques actuelles

### Lighthouse (Desktop)
- **Performance**: 85-90
- **Accessibility**: 95+
- **Best Practices**: 100
- **SEO**: 100

### Core Web Vitals
- **LCP**: ~2.8s (objectif: <2.5s)
- **FID**: <50ms ✅
- **CLS**: <0.05 ✅

### Bundle Sizes
- **Initial**: ~180kb gzippé
- **Total**: ~380kb gzippé
- **Route chunks**: 10-25kb chacun

## 🔍 Profiling & Monitoring

### 1. Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
- name: Run Lighthouse CI
  run: pnpm lighthouse
```

### 2. Bundle Analyzer
```json
// package.json
"analyze": "rollup-plugin-visualizer --open"
```

### 3. Performance API
```typescript
// utils/performance.ts
export const measurePerformance = () => {
  // Core Web Vitals tracking
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);  
  getLCP(sendToAnalytics);
};
```

## 🚀 Optimisations futures

### Phase 1: LCP <2.5s
- [ ] **Critical CSS inlining** pour above-the-fold
- [ ] **Image optimization** avec next-gen formats (AVIF)
- [ ] **Font subsetting** pour les caractères utilisés

### Phase 2: Score 90+
- [ ] **Service Worker** pour mise en cache agressive
- [ ] **Resource hints** plus granulaires
- [ ] **Tree shaking** avancé pour Framer Motion

### Phase 3: Advanced
- [ ] **Edge-side rendering** avec Vercel Edge Functions
- [ ] **Adaptive loading** basé sur la connexion
- [ ] **Predictive prefetching** avec ML

## 🛠️ Outils de développement

### Performance DevTools
```typescript
// Hook pour debug performance
const usePerformanceMonitor = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Monitor component renders
      console.time('Component Render');
      return () => console.timeEnd('Component Render');
    }
  });
};
```

### Bundle Analysis
```bash
# Commandes utiles
pnpm build                    # Build avec stats
pnpm analyze                  # Visualisation bundle
pnpm lighthouse              # Audit performance
```

### Chrome DevTools
- **Performance tab**: Profiling des animations
- **Network tab**: Waterfall des ressources
- **Lighthouse tab**: Audit automatisé

## 📈 Stratégies d'amélioration

### 1. Critical Rendering Path
```html
<!-- Ordre optimisé -->
<head>
  <!-- Critical CSS inline -->
  <style>{criticalCSS}</style>
  
  <!-- Preload fonts -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" />
  
  <!-- DNS prefetch -->
  <link rel="dns-prefetch" href="//vercel.com" />
</head>
```

### 2. Progressive Enhancement
```typescript
// Fallbacks gracieux
const AnimatedComponent = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return prefersReducedMotion ? (
    <StaticComponent />
  ) : (
    <MotionComponent />
  );
};
```

### 3. Adaptive Loading
```typescript
// Stratégie basée sur la connexion
const useNetworkAdaptive = () => {
  const connection = navigator.connection;
  const isSlowConnection = connection?.effectiveType === '2g';
  
  return {
    shouldLazyLoad: isSlowConnection,
    imageQuality: isSlowConnection ? 'low' : 'high'
  };
};
```

## 🎯 Performance Budget

### JavaScript
- **Initial bundle**: <200kb gzippé
- **Route chunk**: <30kb gzippé  
- **Vendor chunk**: <150kb gzippé

### Images
- **Hero images**: <50kb optimisées
- **Icons**: SVG ou fonts uniquement
- **Format**: WebP avec fallback

### Fonts
- **Maximum**: 2 font families
- **Weights**: Variable fonts preferés
- **Loading**: `font-display: swap`

---

**Objectif 2025**: Score Lighthouse 95+ constant