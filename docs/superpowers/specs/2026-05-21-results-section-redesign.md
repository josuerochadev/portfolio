# Redesign section Resultats — Page projet detail

Date: 2026-05-21
Status: Approved

## Contexte

La section "Resultats" de la page projet detail affiche des metrics (label + value) dans des cards colorees violet/lime. Le rendu actuel souffre de trois problemes :

1. Layout monotone — grille 3 colonnes uniforme, toutes les cards se ressemblent
2. Espace mort — trop de vide entre le label en haut et la valeur en bas des cards
3. Valeurs longues mal gerees — les listes entre parentheses encombrent les petites cards

## Design

### Parsing intelligent des valeurs

Une fonction `parseMetricValue(value: string)` extrait automatiquement le chiffre cle du detail textuel.

Patterns geres :
- `"3 (RSS Anchor.fm, Apple Podcasts API, Deezer API)"` -> number: "3", detail: "RSS Anchor.fm, Apple Podcasts API, Deezer API"
- `"6 series"` -> number: "6", detail: "series"
- `"32 (14 batch + 11 DB2 + 7 CICS)"` -> number: "32", detail: "14 batch + 11 DB2 + 7 CICS"
- `"JWT httpOnly + SameSite, bcrypt 12 rounds..."` -> number: null, detail: null (traitement full-text)

Regex proposee : `/^(\d+)\s*(?:\((.+)\)|(.+))?$/` avec fallback sur le texte brut si pas de match.

### Layout bento asymetrique

Grille CSS `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` avec col-span dynamique :

| Type de metric | Col span (lg) | Col span (sm) | Condition |
|---|---|---|---|
| Hero (index 0) | col-span-3 | col-span-2 | Toujours la premiere |
| Chiffre + detail court | col-span-1 | col-span-1 | number !== null && detail courte (< 40 chars) |
| Chiffre + liste longue | col-span-2 | col-span-2 | number !== null && detail longue (>= 40 chars) |
| Full-text (pas de chiffre) | col-span-2 | col-span-2 | number === null |

En mobile (< sm), tout passe en col-span-1 (pleine largeur par defaut).

### Alternance de couleurs

Au lieu du pattern rigide par index (0, 3 = violet), on alterne violet/lime par paire :
- Index pair -> violet ("nuit")
- Index impair -> lime ("citron")

Cela cree un rythme visuel regulier sans pattern previsible lie au contenu.

### Detail visuel des cards

**Card hero (premiere metric) :**
- `bg-violet dark:bg-dark-surface`, `col-span-3`
- Label: `text-xs font-sans font-bold uppercase tracking-[0.2em] text-beige/50`
- Chiffre: `text-5xl md:text-7xl font-display` avec `fontVariationSettings: var(--fv-ghost)`, `text-beige`
- Detail: `text-base text-beige/70` sous le chiffre
- Border: `border-violet/20 dark:border-beige/10`
- Shadow: `shadow-card`

**Cards chiffre compact (1 col) :**
- Alternance `bg-lime grain grain-citron` / `bg-violet`
- Label en haut, chiffre en `text-4xl md:text-5xl` Fraunces ghost
- Detail unitaire (ex: "series") en `text-sm` directement sous le chiffre
- `min-h-[140px]` au lieu de 180px
- Tokens: `surface-citron-fg/muted` pour lime, `text-beige` pour violet

**Cards chiffre + liste longue (2 col) :**
- Meme alternance couleur
- Layout interne `flex` horizontal : chiffre a gauche, `border-l` separateur, liste en `text-sm` a droite
- Le chiffre reste en gros display, la liste est en texte courant
- `min-h-[140px]`

**Cards full-text sans chiffre (2 col) :**
- Pas de gros chiffre
- Label + texte en `font-display font-semibold italic text-xl md:text-2xl`
- Meme style que l'actuel mais en plus large (col-span-2)

### Interactions

- `hover:shadow-card-hover hover:scale-[1.01]` (identique a l'existant)
- `transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]`
- Enveloppe `FadeInUp` conservee

## Fichiers impactes

- `src/pages/project-detail.tsx` — section Resultats (lignes 439-491) : refonte du rendu des metrics

## Hors scope

- Pas de modification des donnees dans `src/data/projects.ts`
- Pas de modification des traductions
- Pas de nouvelles dependances
- Dark mode : conserve le pattern existant (`dark:bg-dark-surface dark:border-beige/10`)
