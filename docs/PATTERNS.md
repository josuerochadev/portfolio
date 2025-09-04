# Patterns de Développement - Portfolio

## 🎯 Vue d'ensemble

Ce document détaille les patterns spécifiques utilisés dans le portfolio, avec exemples concrets et justifications.

## 🎨 Animation Patterns

### Sequential Fade Pattern
**Utilisé dans**: Privacy Policy, Legal Notice, 404 pages

```typescript
// Pattern avant optimisation - DRY violation
<FadeInUp delay={0.2}><section1 /></FadeInUp>
<FadeInUp delay={0.4}><section2 /></FadeInUp>
<FadeInUp delay={0.6}><section3 /></FadeInUp>

// Pattern optimisé - Composant réutilisable
<SequentialFadeIn startDelay={0.2} increment={0.2}>
  {[
    <LegalSection key="data-collection" title="Collecte des données">
      {content}
    </LegalSection>,
    <LegalSection key="data-usage" title="Utilisation des données">
      {content}
    </LegalSection>
  ]}
</SequentialFadeIn>
```

**Bénéfices**:
- **Code reduction**: 60% moins de lignes
- **Maintenance**: Configuration centralisée des timings
- **Consistance**: Délais uniformes sur tout le site

### Ripple Effect Pattern
**Utilisé dans**: Hero title, interactions CTA

```typescript
// Implémentation avec canvas et animation frame
const LetterRippleEffect: React.FC<{text: string}> = ({ text }) => {
  // Canvas-based ripple sur hover/click
  // Optimisation GPU avec transform3d
  // Cleanup automatique des animations
}
```

### Staggered Entrance Pattern
**Principe**: Animations échelonnées pour guider l'attention

```typescript
// Configuration dans constants/
export const ANIMATION = {
  DURATIONS: { FAST: 0.3, MEDIUM: 0.6, SLOW: 0.8 },
  DELAYS: { SHORT: 0.2, MEDIUM: 0.5, LONG: 0.8 }
};

// Utilisation cohérente
<FadeInDown delay={ANIMATION.DELAYS.SHORT}>
  <h1>Title</h1>
</FadeInDown>
```

## 🏗️ Layout Patterns

### Page Template Pattern
**Problème**: Structure répétitive sur chaque page

```typescript
// Template unifié
const PageLayout: React.FC<Props> = ({ 
  children, 
  maxWidth = "4xl", 
  withAnimation = true 
}) => {
  const content = (
    <div className="min-h-screen text-violet">
      <BackgroundGradient />
      <main className={`relative z-10 ${maxWidthClasses[maxWidth]} mx-auto px-6 py-20`}>
        {children}
      </main>
    </div>
  );

  return withAnimation ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION.DURATIONS.MEDIUM }}
    >
      {content}
    </motion.div>
  ) : content;
};
```

**Usage typique**:
```typescript
// Page standardisée en 3 lignes
export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <SequentialFadeIn>
        {pageContent}
      </SequentialFadeIn>
    </PageLayout>
  );
}
```

### Section Error Boundary Pattern
**Protection granulaire** contre les erreurs React

```typescript
// HomePage.tsx - Isolation par section
<main id="main-content">
  <SectionErrorBoundary sectionName="Hero">
    <Hero />
  </SectionErrorBoundary>
  
  <SectionErrorBoundary sectionName="About">
    <About />
  </SectionErrorBoundary>
</main>
```

## 🎯 Component Composition Patterns

### Hero Modular Pattern
**Refactoring**: Hero monolithique → 3 sous-composants

```typescript
// Avant: 122 lignes dans un seul fichier
// Après: 4 fichiers avec responsabilités séparées

// hero/index.tsx - Orchestrateur (42 lignes)
export default function Hero() {
  return (
    <section className="hero-container">
      <HeroTitle />
      <HeroPhrases />
      <HeroActionButtons />
    </section>
  );
}

// hero/hero-title.tsx - Titre avec ripple effect
// hero/hero-phrases.tsx - Carousel de phrases
// hero/hero-action-buttons.tsx - CTA avec animations
```

**Avantages**:
- **Testabilité**: Tests isolés par composant
- **Maintenance**: Changements localisés
- **Réutilisabilité**: Sous-composants exportables

### Legal Section Pattern
**Template** pour contenu légal structuré

```typescript
const LegalSection: React.FC<{title: string, children: ReactNode}> = ({ 
  title, 
  children 
}) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-4 text-violet">{title}</h2>
    <div className="prose prose-lg">
      {children}
    </div>
  </section>
);

// Usage - Structure HTML sémantique automatique
<LegalSection title="RGPD Rights">
  <p>Content with proper typography...</p>
  <ul>...</ul>
</LegalSection>
```

## ♿ Accessibility Patterns

### Skip Link Pattern
**Navigation clavier** pour screen readers

```typescript
// skip-link.tsx
export default function SkipLink() {
  return (
    <a 
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-violet text-white px-4 py-2 rounded"
    >
      Aller au contenu principal
    </a>
  );
}

// Usage dans App.tsx
<div id="app">
  <SkipLink />
  <Navbar />
  <main id="main-content">
    {content}
  </main>
</div>
```

### Heading Hierarchy Pattern
**Validation WCAG** automatique

```typescript
// heading-audit.tsx - Développement uniquement
if (process.env.NODE_ENV === 'development') {
  const currentHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const lastHeading = currentHeadings[currentHeadings.length - 1];
  
  if (lastHeading) {
    const lastLevel = parseInt(lastHeading.tagName.charAt(1));
    if (level > lastLevel + 1) {
      console.warn(`⚠️ Accessibility Warning: Heading h${level} skips levels`);
    }
  }
}
```

### Reduced Motion Pattern
**Respect** des préférences utilisateur

```typescript
const ReducedMotionWrapper: React.FC<Props> = ({ children, fallback }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return shouldReduceMotion ? fallback || children : children;
};

// Usage
<ReducedMotionWrapper fallback={<StaticLogo />}>
  <AnimatedLogo />
</ReducedMotionWrapper>
```

## 🛡️ Error Handling Patterns

### Cascade Error Boundary
**Hiérarchie** de protection

```
App ErrorBoundary (Global)
├── Page ErrorBoundary (Route level)
└── Section ErrorBoundary (Component level)
```

### Graceful Degradation
```typescript
// error-boundary.tsx
class SectionErrorBoundary extends Component {
  render() {
    if (this.state.hasError) {
      return (
        <section className="error-fallback">
          <p>Cette section rencontre un problème technique.</p>
          <button onClick={this.handleReset}>
            Réessayer
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}
```

## 🔧 Performance Patterns

### Lazy Loading with Suspense
```typescript
// Route-level code splitting
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'));

// App.tsx
<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/privacy" element={<PrivacyPolicy />} />
  </Routes>
</Suspense>
```

### Optimized Re-renders
```typescript
// Memoization stratégique
const HeroPhrases = memo(({ phrases }: Props) => {
  // Stable references avec useMemo
  const stableConfig = useMemo(() => ({
    loop: true,
    duration: 3000
  }), []);
  
  return <AnimatedText config={stableConfig} />;
});
```

## 📊 Monitoring Patterns

### Performance Tracking
```typescript
// Custom hook pour Core Web Vitals
const usePerformanceMetrics = () => {
  useEffect(() => {
    // LCP, FID, CLS tracking
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getLCP(sendToAnalytics);
  }, []);
};
```

---

Ces patterns garantissent **cohérence**, **maintenabilité** et **performance** à travers tout le portfolio.