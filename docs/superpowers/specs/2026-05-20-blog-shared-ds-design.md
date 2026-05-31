# Blog Shared Design System — Spec

## Context

The blog (`blog.josuerocha.dev`) is a separate Astro 6 project that must look pixel-perfect with the portfolio (`josuerocha.dev`). Both share the same navbar, footer, theme toggle, language switcher, background gradient, bottom blur, and scroll-to-top.

## Architecture Decision

**Repos separés + React Islands dans Astro.**

The blog installs `@astrojs/react` and imports React components (navbar, footer, etc.) as Astro islands with `client:load`. This guarantees pixel-perfect consistency with a single source of truth per component.

## Changes — Portfolio Side

### 1. Navbar: Add Blog link

- Uncomment `{ key: "blog", section: "", external: true }` in `NAV_LINKS` (navbar.tsx line 15)
- Position: between Work and Contact
- External link pointing to `https://blog.josuerocha.dev`
- Translations already exist in all 3 `common.json` files (`"blog": "Blog"`)

### 2. Footer: Add Blog link

- Uncomment `{ key: "blog", section: "" }` in `FOOTER_NAV` (footer.tsx line 11)
- Handle as external link to `https://blog.josuerocha.dev`

## Changes — Blog Side

### 1. Dependencies to install

```
@astrojs/react react react-dom framer-motion react-i18next i18next i18next-browser-languagedetector react-icons
```

### 2. Astro config

- Add `@astrojs/react` integration
- Enable React islands

### 3. Shared React components to copy

Each component is adapted for cross-domain navigation:

| Component | Portfolio source | Adaptation |
|-----------|-----------------|------------|
| Navbar | `components/layout/navbar.tsx` | Links point to `https://josuerocha.dev/#section`, Blog link points to `/` (local) |
| Footer | `components/layout/footer.tsx` | Same cross-domain links, legal pages link to portfolio |
| ThemeToggle | `components/common/theme-toggle.tsx` | No changes needed |
| FloatingLanguageSwitcher | `components/common/floating-language-switcher.tsx` | No changes needed |
| BackgroundGradient | `components/layout/background-gradient.tsx` | No changes needed |
| BottomBlur | `components/common/bottom-blur.tsx` | No changes needed |
| ScrollToTop | `components/common/scroll-to-top.tsx` | No changes needed |
| LetterRippleEffect | `components/effects/letter-ripple.tsx` | No changes needed |

### 4. Supporting files to copy

- `hooks/use-theme.ts` — theme hook (class-based dark mode)
- `constants/index.ts` — animation/color/transition tokens
- `utils/motion-variants.ts` — Framer Motion presets
- `i18n/index.ts` — i18next config (only `common` namespace needed for shared components)
- `i18n/locales/{fr,en,pt}/common.json` — translations for navbar/footer/toggle
- `assets/images/ui/smile.svg` — logo used in navbar and scroll-to-top

### 5. Fonts

Copy from portfolio `public/fonts/` to blog `public/fonts/`:
- `fraunces-latin.woff2`, `fraunces-latin-ext.woff2`
- `rubik-latin.woff2`, `rubik-latin-ext.woff2`

Add matching `@font-face` declarations and anti-flash script in BaseLayout.

### 6. Tailwind token bridge

The blog uses Tailwind 4 (CSS-first). Portfolio components use Tailwind 3 class names like `bg-beige`, `text-violet`, `dark:bg-dark-bg`, etc. These must be defined as CSS custom properties + `@theme` in the blog's global CSS so the classes resolve correctly.

### 7. Navigation behavior

- **On portfolio**: Navbar links scroll to sections (SPA), Blog link is external (`https://blog.josuerocha.dev`)
- **On blog**: Navbar links are external (`https://josuerocha.dev/#section`), Blog link scrolls to top or links to `/`
- **Prop**: Components accept a `context: 'portfolio' | 'blog'` prop to determine link behavior

### 8. Dark mode anti-flash

Add inline script in BaseLayout `<head>` (same as portfolio's index.html) to apply dark class before first paint.
