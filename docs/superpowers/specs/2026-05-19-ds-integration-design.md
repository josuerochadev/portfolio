# Design System - Integration & Nettoyage

## Contexte

Claude Design a livre un DS complet pour le portfolio (dossier `Josue Rocha Portfolio Design System/`). Ce DS contient :
- `HANDOFF.md` : 4 directions de design (D01-D04) a integrer dans le codebase React
- `NEXT_STEPS.md` (dans README.md) : 7 taches d'amelioration du DS lui-meme (preview cards, dark mode, index)
- `colors_and_type.css` : source de verite des tokens CSS

Le codebase portfolio actuel : React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion.

## Strategie

Deux chantiers sequentiels, du moins risque au plus risque :
1. **Chantier B** (DS interne) : zero impact sur le portfolio, nettoie le DS
2. **Chantier A** (Integration portfolio) : applique les nouveaux tokens au codebase React

## Chantier B - DS interne (zero regression)

### B1. Fix hex hardcodes dans les preview cards
- Remplacer tous les hex inline par `var(--token)` dans les 21 fichiers `preview/*.html`
- Source de verite : `colors_and_type.css`
- Chaque card importe deja `_card.css` qui importe `colors_and_type.css`

### B2. Toggle dark mode
- Creer `preview/_theme.js` (toggle + localStorage + postMessage listener)
- Ajouter regles dark mode dans `preview/_card.css`
- Ajouter `<script src="_theme.js">` dans chaque preview card
- Bouton toggle flottant bottom-right, glass capsule, lime border

### B3. Commentaires opacite dans colors_and_type.css
- Ajouter la section commentee documentant l'echelle d'opacite (/5, /10, /20, /30, /60, /80, /90)

### B4. Inline SVG smile dans component-navbar.html
- Remplacer `<img src="../assets/smile.svg">` par le SVG inline (path depuis ui_kit)
- Permet `currentColor` pour le theming

### B5. 7 nouvelles preview cards
- `component-theme-toggle.html` : bouton dans ses 2 etats
- `component-timeline.html` : step timeline (default + hover)
- `component-year-picker.html` : capsule nav avec annees
- `component-project-card.html` : article projet complet
- `component-footer.html` : footer complet
- `type-display-num.html` : specimen numerotation ghost-num
- `component-states.html` : etats interactifs (focus, hover, disabled, active)

### B6. Card Do/Don't
- `preview/brand-do-dont.html` : grille 2 colonnes avec regles visuelles illustrees

### B7. Motion easing interactive
- Remplacer `easing.html` par `motion-easing.html` avec 3 balles animees + bouton Play
- Web Animations API, zero dependance

### B8. Index.html du DS
- Page d'accueil avec nav sticky, grille d'iframes pointant vers les preview cards
- Toggle dark mode synchronise via postMessage vers toutes les iframes
- Utilise les tokens de `colors_and_type.css`

## Chantier A - Integration portfolio (par risque croissant)

### A1. Ombres chromatiques (D03) - Risque faible
**Fichiers :** `tailwind.config.ts`, `index.css`
**Actions :**
- Ajouter tokens shadow dans `tailwind.config.ts` : `card`, `card-hover`, `cta`, `lime-glow`
- Les valeurs viennent de `colors_and_type.css` (ombres violet au lieu de noir)
- Remplacer `shadow-glow-lime` / `shadow-glow-lime-lg` par `shadow-card` / `shadow-card-hover` dans :
  - `projects.tsx` (project cards)
  - `timeline.tsx` (timeline cards + year picker)
- Ajouter `shadow-cta` sur le CTA hero en hover
- Ajouter `shadow-lime-glow` sur focus ring

**Validation :** Verifier visuellement light + dark mode, aucun changement de layout attendu.

### A2. Ghost-num + italic-aside (D01 partiel) - Risque faible
**Fichiers :** `projects.tsx`, `footer.tsx`, `index.css`
**Actions :**
- `projects.tsx` ligne 116 : le `<span>` du numero est deja en `font-display font-extralight text-6xl text-orange-dark`. Ajuster vers les specs DS : `font-thin` (100 au lieu de 200), `tracking-[-0.03em]`
- `footer.tsx` ligne 50 : wrapper le tagline italic avec style `.italic-aside` (border-left lime, Fraunces italic)
- Ajouter les CSS custom properties `--fv-editorial`, `--fv-playful`, `--fv-ghost` dans `index.css`

**Validation :** Changements visuels mineurs, pas de changement de layout.

### A3. Font-variation tokens (D01 complet) - Risque moyen
**Fichiers :** `index.css`, composants avec `fontVariationSettings` hardcode
**Actions :**
- Identifier tous les `fontVariationSettings` hardcodes (footer.tsx ligne 34, possiblement hero)
- Remplacer par references aux CSS custom properties `var(--fv-editorial)`, `var(--fv-playful)`
- Appliquer `--fv-playful` sur hover du hero-tagline et SmileGrid

**Validation :** Tester le letter-ripple, les hover states. Le risque est dans les animations existantes.

### A4. Grain & matiere (D04) - Risque moyen
**Fichiers :** `index.css`, `page-layout.tsx`, `footer.tsx`, `skills.tsx`
**Actions :**
- Ajouter les classes utilitaires `.grain`, `.grain-citron`, `.grain-dark` dans `index.css` (pseudo-element `::after` avec filtre SVG)
- Ajouter `.grain` sur le body/wrapper root
- Ajouter `.grain-citron` sur le footer (bg lime)
- S'assurer que les elements animes Framer Motion ont `position: relative; z-index: 1` pour passer au-dessus du `::after`

**Validation :** Verifier que le grain ne casse pas les interactions, le scroll, ou les animations.

### A5. Surfaces actives (D02) - Risque moyen
**Fichiers :** `tailwind.config.ts`, `index.css`, `skills.tsx`, possiblement `timeline.tsx`
**Actions :**
- Ajouter les tokens surface (citron + nuit) dans `tailwind.config.ts` et `index.css`
- Appliquer surface Citron sur la section Skills
- Evaluer surface Nuit sur la section Timeline/About (candidat, pas obligatoire)
- Adapter les cards dans un contexte Citron (card-bg et border specifiques)

**Validation :** Changement visuel majeur de sections entieres. Tester light + dark, mobile + desktop.

## Ordre d'execution final

1. B1 (fix hex) → B2 (dark toggle) → B3 (opacite) → B4 (SVG inline)
2. B5 (nouvelles cards) → B6 (do/dont) → B7 (motion easing)
3. B8 (index.html)
4. A1 (ombres) → A2 (ghost-num) → A3 (fv tokens) → A4 (grain) → A5 (surfaces)

Chaque etape est verifiable independamment. On valide visuellement avant de passer a la suivante.

## Contraintes

- DS : zero dependance externe, HTML/CSS/JS vanilla, fonctionne en `file://`
- Portfolio : React 19 + Tailwind CSS, respecter les patterns existants
- Claude Design ne voit pas toujours le projet complet → valider chaque changement par rapport au code reel
- Faire attention a la navbar (Claude Design se trompe dessus)
