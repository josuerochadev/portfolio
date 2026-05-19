# Handoff — DS → Portfolio (Claude Code)

## Ce qui a changé dans le DS

Le fichier source de vérité est **`colors_and_type.css`**.
Toutes les modifications ci-dessous y sont déjà encodées.

---

## D01 — Poids Architectural (type)

### Nouveaux tokens
```css
--fv-editorial : "opsz" 144, "SOFT" 0, "WONK" 0;  /* actuel sur h1–h3 */
--fv-playful   : "opsz" 72, "SOFT" 100, "WONK" 1;  /* hero tagline, hover states */
--fv-ghost     : "opsz" 144, "SOFT" 0, "WONK" 0;   /* avec font-weight: 100 */
```

### Nouveaux styles sémantiques
```css
.ghost-num    /* Fraunces 100, clamp(3rem,6vw,5rem), --orange-dark — numéros de projets */
.italic-aside /* Fraunces italic 400, --fg-2, border-left 2.5px --lime — citations */
```

### À faire dans le codebase React
1. Dans `ProjectCard` / `ProjectList` : remplacer le numéro de projet par un `<span className="ghost-num">01.</span>` ou son équivalent Tailwind : `font-fraunces font-thin text-7xl text-orange-dark tracking-[-0.03em]`
2. Dans `Footer` : wrapper le tagline *"Crafted with care in Strasbourg."* dans `.italic-aside` (ou `font-fraunces italic font-normal border-l-[2.5px] border-lime pl-4 text-fg-2`)
3. Dans les composants avec gros titres de section : appliquer `font-variation-settings: var(--fv-editorial)` — c'est déjà dans le CSS mais certains composants le hardcodent
4. Pour l'axe WONK : appliquer `--fv-playful` sur `.hero-tagline:hover` et le `SmileGrid` context — remplace le `font-variation-settings` hardcodé

---

## D02 — Surfaces Actives

### Nouveaux tokens de surface
```css
/* Surface Citron */
--surface-citron-bg     : var(--lime);
--surface-citron-fg     : var(--violet-dark);
--surface-citron-muted  : rgba(85, 0, 204, 0.60);
--surface-citron-border : rgba(85, 0, 204, 0.15);
--surface-citron-card   : rgba(255, 255, 255, 0.28);

/* Surface Nuit */
--surface-nuit-bg       : var(--violet);
--surface-nuit-fg       : var(--beige);
--surface-nuit-muted    : rgba(245, 240, 232, 0.55);
--surface-nuit-border   : rgba(181, 255, 0, 0.22);
--surface-nuit-card     : linear-gradient(135deg, rgba(181,255,0,0.12), rgba(245,240,232,0.06));
```

### À faire dans le codebase React
1. **Section Skills** (`src/components/Skills.tsx` ou équiv.) : passer en surface **Citron** (`bg-lime`) — c'est déjà le cas pour le footer, maintenant c'est nommé et tokenisé
2. **Section Timeline / About** : candidat pour surface **Nuit** (`bg-violet`) si une alternance est souhaitée
3. Dans Tailwind config (`tailwind.config.ts`), ajouter les tokens de surface :
   ```ts
   'surface-citron-fg':     'var(--surface-citron-fg)',
   'surface-citron-border': 'var(--surface-citron-border)',
   // etc.
   ```
4. Cards dans un contexte Citron : remplacer `--card-bg` par `--surface-citron-card` et le border par `--surface-citron-border`

---

## D03 — Ombres Chromatiques

### Tokens mis à jour (remplacent les noirs Tailwind)
```css
/* Avant */
--card-shadow:       0 4px 6px -1px rgba(0,0,0,0.10), …;
--card-shadow-hover: 0 10px 15px -3px rgba(0,0,0,0.10), …;

/* Après — déjà dans colors_and_type.css */
--card-shadow:       0 8px 32px rgba(105,0,255,0.15), 0 2px 8px rgba(105,0,255,0.06);
--card-shadow-hover: 0 16px 48px rgba(105,0,255,0.22), 0 4px 12px rgba(105,0,255,0.10);
--shadow-cta:        0 4px 24px rgba(255,122,0,0.35), 0 1px 4px rgba(255,122,0,0.20);
--shadow-lime-glow:  0 0 40px rgba(181,255,0,0.30);
```

### À faire dans le codebase React
1. Dans `tailwind.config.ts`, remplacer `shadow-md` / `shadow-lg` hardcodés par les tokens :
   ```ts
   boxShadow: {
     card:       'var(--card-shadow)',
     'card-hover': 'var(--card-shadow-hover)',
     cta:        'var(--shadow-cta)',
     'lime-glow': 'var(--shadow-lime-glow)',
   }
   ```
2. Sur tous les `.card` et composants `ProjectCard`, `TimelineCard`, `YearPicker` : remplacer `shadow-md` → `shadow-card` et `hover:shadow-lg` → `hover:shadow-card-hover`
3. Sur le bouton CTA principal (`.hero-buttons a`, `ContactButton`) : ajouter `shadow-cta` en hover
4. Sur la navbar et le focus ring : ajouter `shadow-lime-glow` (navbar: `box-shadow` du `border-bottom`, focus: `outline` + `box-shadow`)
5. **Dark mode** : les tokens dark mode sont déjà mis à jour dans `colors_and_type.css` (ombres plus intenses car fond sombre)

---

## D04 — Grain & Matière

### Nouveau token utilitaire
```css
.grain        /* opacity: 0.04 — beige body, sections neutres */
.grain-citron /* opacity: 0.07 — surfaces lime (footer, skills) */
.grain-dark   /* opacity: 0.05 — surfaces sombres */
```
L'implémentation SVG est dans `colors_and_type.css` (pseudo-élément `::after`).

### À faire dans le codebase React
1. **`body`** ou wrapper root : ajouter la classe `grain` (ou créer un `<div className="grain fixed inset-0 pointer-events-none z-0">` avec le filtre SVG)
2. **Section footer** (bg lime) : ajouter `grain-citron`
3. **Section Skills** si surface Citron (cf. D02) : ajouter `grain-citron`
4. En Tailwind, ajouter dans le CSS global :
   ```css
   @layer utilities {
     .grain::after        { /* copier le contenu de colors_and_type.css */ }
     .grain-citron::after { opacity: 0.07; }
     .grain-dark::after   { opacity: 0.05; }
   }
   ```
5. **Framer Motion** : les éléments animés à l'intérieur d'un `.grain` doivent avoir `position: relative; z-index: 1` pour passer au-dessus du `::after`

---

## Ordre d'implémentation recommandé

| Priorité | Direction | Effort | Impact |
|---|---|---|---|
| 1 | D03 Ombres chromatiques | Faible — 4 tokens + Tailwind config | Élevé — change le mood global |
| 2 | D01 Ghost num + italic aside | Faible — 2 classes + 2 composants | Moyen — renforce la signature |
| 3 | D04 Grain | Moyen — wrapper + CSS global | Moyen — qualité tactile |
| 4 | D02 Surfaces actives | Moyen — 2-3 sections + tokens | Élevé — rythme visuel entre sections |

---

## Fichiers DS mis à jour

| Fichier | Ce qui a changé |
|---|---|
| `colors_and_type.css` | +surface tokens, +fv tokens, +shadow tokens (chromatiques), +.ghost-num, +.italic-aside, +.grain |
| `preview/_card.css` | +dark mode rules (html.dark body, .muted, .label-xs, .mono) |
| `preview/_theme.js` | **Nouveau** — toggle light/dark, localStorage, postMessage listener |
| `preview/surfaces.html` | **Nouveau** — 3 surfaces côte à côte |
| `preview/shadows-chromatic.html` | **Nouveau** — avant/après ombres |
| `preview/type-ghost-num.html` | **Nouveau** — ghost-num + italic-aside + contraste de poids |
| `preview/*.html` (21 fichiers) | Hex hardcodés → `var(--token)` + `<script src="_theme.js">` |
