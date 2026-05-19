# Design System — Brief d'amélioration pour Claude Code

## Contexte

Ce design system documente le portfolio de Josué Rocha (`josuerocha.dev`).
Stack source : React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion.
Le DS est en HTML/CSS pur (pas de build step) — les previews sont des fichiers HTML statiques.

---

## Structure actuelle

```
/
├── README.md                        # Documentation complète (brand voice, tokens, iconographie)
├── SKILL.md                         # Quick-reference pour prototypage
├── colors_and_type.css              # Source de vérité des tokens CSS
├── fonts/                           # Fraunces + Rubik woff2 auto-hébergés
├── assets/                          # smile.svg, sun.svg, favicon.svg, project thumbs
├── preview/                         # Cards du Design System tab (HTML statiques)
│   ├── _card.css                    # Base styles partagés par les cards
│   ├── colors-primary.html
│   ├── colors-neutrals.html
│   ├── colors-alphas.html
│   ├── gradients.html
│   ├── type-display-xl.html
│   ├── type-display-md.html
│   ├── type-body.html
│   ├── type-eyebrow.html
│   ├── type-fraunces-weights.html
│   ├── component-cards.html
│   ├── component-buttons.html
│   ├── component-skill-chips.html
│   ├── component-navbar.html
│   ├── spacing-radii.html
│   ├── spacing-shadows.html
│   ├── spacing-scale.html
│   ├── easing.html
│   ├── brand-smile.html
│   ├── brand-icons.html
│   ├── brand-dark-mode.html
│   └── brand-imagery.html
└── ui_kit/
    └── Portfolio Homepage.html      # Récréation interactive de la homepage
```

---

## Problèmes à corriger

### 1. Les preview cards n'utilisent pas les variables CSS

**Problème :** Les hex sont hardcodés en inline styles dans la majorité des cards.
Si un token change dans `colors_and_type.css`, les cards ne se mettent pas à jour.

**Fix attendu :** Toutes les cards doivent importer `_card.css` (qui lui-même importe
`colors_and_type.css`) et utiliser les variables CSS pour les couleurs, fonts et spacing.

Exemple de ce qu'il faut corriger dans `colors-primary.html` :
```html
<!-- ❌ Avant -->
<div style="background:#6900FF; color:#F5F0E8;">

<!-- ✅ Après -->
<div style="background:var(--violet); color:var(--beige);">
```

Faire ce remplacement systématiquement dans **tous** les fichiers `preview/*.html`.

---

### 2. Ajouter un toggle Light / Dark dans chaque preview card

**Problème :** Toutes les cards sont fixées en light mode.

**Fix attendu :** Ajouter dans `_card.css` les règles dark mode via `.dark` sur `<html>`.
Ajouter dans `_card.css` un petit bouton toggle flottant (bottom-right, 24×24px) qui :
- Ajoute/retire la class `.dark` sur `<html>`
- Persiste l'état dans `localStorage` avec la key `ds-theme`
- S'applique via un `<script>` inline dans chaque card OU via un script partagé `_theme.js`

Le toggle doit être visuellement cohérent avec le design system (glass capsule, lime border).

Règles dark mode à ajouter dans `_card.css` :
```css
html.dark body { background: var(--dark-bg); color: var(--beige); }
html.dark .muted { color: rgba(245,240,232,0.5); }
html.dark .label-xs { color: rgba(245,240,232,0.4); }
html.dark .mono { color: var(--beige); }
```

---

### 3. Cards manquantes à créer

Créer les fichiers suivants dans `preview/` avec le même format que les cards existantes :

#### `preview/component-theme-toggle.html`
Montrer le bouton ThemeToggle dans ses deux états (light / dark icon).
- Position fixe bottom-left dans la vraie UI → montrer en contexte dans la card
- Deux variantes côte à côte : état light (icône lune) et état dark (icône soleil)
- Même glass capsule que tous les autres boutons

#### `preview/component-timeline.html`
Montrer un step de la timeline (une `.timeline-card` avec period + title + text).
- Montrer le pattern complet : period eyebrow (orange/70) + titre Fraunces 800 + body texte
- Montrer 2 cards côte à côte : default + hover state (scale 1.01)

#### `preview/component-year-picker.html`
Montrer la `timeline-nav` capsule avec les années.
- Capsule pill avec 4-5 boutons d'année séparés par des `•`
- Montrer un état actif (orange-dark) vs inactif (violet)
- Same glass capsule recipe

#### `preview/component-project-card.html`
Montrer l'article projet complet (image + numéro + name + pills).
- Le pattern distinctif : numéro Fraunces 100 64px orange-dark à gauche du titre
- Montrer le layout en column (mobile) et flex row (desktop simulé)

#### `preview/component-footer.html`
Montrer le footer complet.
- Background lime (light) / dark-surface (dark)
- Logo name en Fraunces + nav links + tagline italique + divider + legal links

#### `preview/type-display-num.html`
Specimen pour la numérotation de projet.
- `1.` en Fraunces 100, 64px, orange-dark — c'est un pattern très distinctif
- Montrer côte à côte : 1. / 2. / 3. avec le titre à côté comme dans la vraie UI

#### `preview/component-states.html`
Card dédiée aux états interactifs.
- Focus ring : `outline: 2px solid #C56200, offset 2px` (light) / `#FF7A00` (dark)
- Disabled button : `opacity: 0.5, pointer-events: none`
- Hover button (glass → lime bg, orange text)
- Active / pressed : `scale(0.95)`
- Tous ces états côte à côte avec leur label

#### `preview/motion-easing.html`
Remplacer `easing.html` (courbes SVG statiques) par une démo interactive :
- 3 balles animées, une par courbe d'easing
- Bouton "Play" qui déclenche une animation `translateX` de 0 → 400px
- Les 3 balles partent en même temps, arrivent à des moments différents
- Labels avec les noms (`smooth`, `bounce`, `cubic`) et les valeurs cubic-bezier
- Utiliser `CSS animations` ou `Web Animations API` — pas de dépendance externe

---

### 4. Section "Do / Don't" visuelle

Créer `preview/brand-do-dont.html` avec une grille 2 colonnes :
- Colonne gauche : fond légèrement vert (rgba(0,200,0,.05)), titre "✓ Do"
- Colonne droite : fond légèrement rouge (rgba(200,0,0,.05)), titre "✗ Don't"
- 6-8 règles visuelles illustrées (pas juste du texte) :
  - ✓ Fraunces pour les titres / ✗ Fraunces en corps de texte
  - ✓ border-radius 9999px pour les boutons / ✗ boutons carrés
  - ✓ lime border sur les cards / ✗ border violet sur les cards
  - ✓ flat color + alpha / ✗ couleurs inventées hors palette
  - ✓ SVG inline pour smile (currentColor) / ✗ `<img>` pour smile (pas de currentColor)
  - ✓ ALL CAPS tracking-wider pour les labels / ✗ Sentence case sur les boutons

---

### 5. Index HTML du design system

Créer `index.html` à la racine du projet. C'est la home page du DS.

Structure attendue :
```
Header : logo smile SVG + "Josué Rocha Design System" en Fraunces
Nav sticky : Colors | Type | Spacing | Components | Brand | UI Kit

Sections (une par groupe) avec :
- Titre de section en Fraunces
- Grille de cards (iframes 3-4 par ligne, hauteur fixe 200px)
  chaque iframe pointe vers le fichier preview correspondant
- Lien "Open full" sur chaque card

Footer : lien vers le repo GitHub + "Source: josuerochadev/portfolio"
```

Design : utilise exactement les tokens de `colors_and_type.css`.
Le background de l'index utilise le gradient animé du portfolio (`--bg-gradient-light`).
L'index doit avoir son propre toggle dark mode.

**Important :** Les iframes dans l'index doivent transmettre le thème courant aux cards.
Pattern suggéré : quand le toggle de l'index change, itérer sur toutes les iframes et
poster un `message` à chacune → chaque card écoute et applique `.dark` en conséquence.

```js
// Dans index.html — toggle
iframes.forEach(iframe => iframe.contentWindow.postMessage({ theme }, '*'));

// Dans chaque card — listener
window.addEventListener('message', e => {
  if (e.data?.theme) document.documentElement.classList.toggle('dark', e.data.theme === 'dark');
});
```

---

### 6. Inline le SVG smile dans `component-navbar.html`

**Problème :** `<img src="../assets/smile.svg">` dans la navbar preview ne supporte pas
`currentColor` — l'icône ne change pas de couleur avec le thème.

**Fix :** Remplacer le `<img>` par le SVG inline (path déjà disponible dans
`ui_kit/Portfolio Homepage.html` — chercher `viewBox="0 0 810 810"`).

---

### 7. Tokens d'opacité documentés

Dans `colors_and_type.css`, ajouter une section commentée :

```css
/* ---------- Opacity scale (the ONLY values used) ---------- */
/* /5  = rgba(..., 0.05)  — barely-there, page bg hints        */
/* /10 = rgba(..., 0.10)  — card gradient endpoints            */
/* /20 = rgba(..., 0.20)  — card gradient mid, dark borders    */
/* /30 = rgba(..., 0.30)  — card borders light, gradient start */
/* /60 = rgba(..., 0.60)  — light strip blur, fg-2 approx      */
/* /80 = rgba(..., 0.80)  — fg-2 (secondary text)              */
/* /90 = rgba(..., 0.90)  — fg-1 body on dark                  */
```

---

## Contraintes techniques

- **Zéro dépendance externe** — pas de CDN, pas de bundler. HTML/CSS/JS vanilla uniquement.
- **Fonts** déjà dans `/fonts/` — les `@font-face` sont dans `colors_and_type.css`.
- **Assets** dans `/assets/` — chemins relatifs depuis `preview/` : `../assets/smile.svg`.
- Chaque card doit fonctionner **standalone** (ouvrable directement dans un navigateur).
- Tester que l'index fonctionne en ouvrant `index.html` via `file://` (pas de server requis).

---

## Ordre d'implémentation recommandé

1. Fix tokens CSS dans les cards existantes (le plus rapide, le plus impactant)
2. Créer `_theme.js` et ajouter le toggle dark à `_card.css` + toutes les cards
3. Créer les 7 nouvelles cards
4. Créer `index.html` avec synchronisation du thème via postMessage
5. Inline le SVG dans `component-navbar.html`
6. Ajouter les commentaires d'opacité dans `colors_and_type.css`

---

## Résultat attendu

À la fin de ces travaux, le design system doit :
- S'ouvrir sur `index.html` comme point d'entrée unique
- Montrer tous les tokens, composants et patterns en light ET dark mode
- Utiliser ses propres variables CSS (manger sa propre cuisine)
- Documenter visuellement les états interactifs (focus, hover, disabled, active)
- Servir de référence autonome sans avoir à ouvrir le code source du portfolio
