# Media Section Redesign

**Date:** 2026-05-22
**Scope:** Section "En images" de la page projet (`project-detail.tsx`)
**Objectif:** Casser la monotonie de la grille uniforme, aligner le style sur le DS existant, ajouter du polish (hover, lightbox, animations).

---

## 1. Data Model

### 1.1 Nouveau champ `group` sur `MediaItem`

```typescript
// src/data/projects.ts
export interface MediaItem {
  type: 'image' | 'video' | 'embed' | 'pdf';
  src: string;
  poster?: string;
  caption: string;
  group?: string; // ex: "Maquettes", "Design System", "Demo"
}
```

- Le champ est optionnel pour ne pas casser les projets existants.
- Si aucun `group` n'est defini, les medias s'affichent dans un flux unique sans sous-titre.

### 1.2 Mise a jour des donnees projet

Ajouter le champ `group` sur les medias existants de Tour de Controle et OKLM Drag Club, en se basant sur les noms de fichiers et les captions existantes pour determiner les groupes logiques.

---

## 2. Layout : Flux unique avec groupes thematiques

### 2.1 Principe

Remplacer la separation rigide (videos en haut, images en bas) par un **flux unique ordonne** ou les medias s'affichent dans l'ordre defini dans les donnees.

Quand le `group` change entre deux items consecutifs, un **sous-titre** s'insere dans le flux.

### 2.2 Sous-titres de groupe

```
text-sm font-sans font-semibold uppercase tracking-wider text-violet/40 dark:text-beige/40 mb-4 mt-8
```

Premier groupe : pas de `mt-8` (il suit directement le titre de section).

### 2.3 Rendu par type dans le flux

- **Videos / Embeds** : pleine largeur, sortent du masonry, s'affichent en block normal.
- **Images** : entrent dans le layout masonry (voir section 3).

Quand un groupe contient un mix de types, les videos/embeds s'affichent d'abord (full-width), puis les images du meme groupe suivent en masonry.

---

## 3. Layout Masonry pour les images

### 3.1 Technique : CSS `columns`

Utiliser le CSS natif `columns` plutot qu'une lib JS :

```css
columns: 3;
column-gap: 1rem;

@media (max-width: 1024px) { columns: 2; }
@media (max-width: 640px)  { columns: 1; }
```

Chaque `<figure>` recoit `break-inside: avoid` pour eviter les coupures.

### 3.2 Avantages

- Pas de dependance externe.
- Les images gardent leur ratio naturel — hauteurs variables, flux organique.
- Performant : le navigateur gere le layout nativement.

### 3.3 Classes Tailwind

```
columns-1 sm:columns-2 lg:columns-3 gap-4
```

Chaque figure :
```
break-inside-avoid mb-4
```

---

## 4. Alignement sur le Design System

### 4.1 Radius

Passer de `rounded-xl` / `rounded-2xl` mixte a **`rounded-2xl` uniforme** sur tous les conteneurs medias (images, videos, embeds). C'est le radius standard des cards, bento, deliverables, metrics dans le projet.

### 4.2 Bordures

Remplacer `border-violet/10 dark:border-beige/10` par le style card standard :

```
border border-lime/30 dark:border-lime/20
```

Cela aligne la section media avec toutes les autres sections de la page projet.

### 4.3 Fond

Ajouter le gradient frosted glass sur les conteneurs media :

```
bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
backdrop-blur-md
```

Note : ce fond est visible principalement sur le padding autour du media (pas sur l'image/video elle-meme). Appliquer un `p-2` ou `p-3` sur le conteneur pour laisser le gradient apparaitre comme un cadre subtil.

### 4.4 Ombres

Conserver le systeme existant :
- Etat normal : `shadow-card`
- Etat hover : `shadow-card-hover`

### 4.5 Transitions

Aligner sur le timing du projet :
```
transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]
```

---

## 5. Hover et interactions

### 5.1 Hover sur les images

Remplacer le caption statique en dessous par un **overlay au hover** :

- L'image fait un zoom doux : `scale-[1.03]` avec `transition-transform duration-300`
- Le conteneur clip le zoom : `overflow-hidden rounded-2xl`
- Un overlay sombre apparait : `bg-gradient-to-t from-black/60 via-black/20 to-transparent`
- Le caption s'affiche en blanc en bas de l'overlay : `text-sm text-white font-medium`
- L'overlay et le texte transitionnent en opacite : `opacity-0 group-hover:opacity-100 transition-opacity duration-300`

Le caption reste accessible en tant que `alt` sur l'image et dans un `<figcaption>` avec `sr-only` quand l'overlay est masque.

### 5.2 Hover sur les videos/embeds

Plus subtil, pas d'overlay :
- `hover:shadow-card-hover hover:scale-[1.01]`
- Le caption reste en dessous, visible en permanence.

---

## 6. Lightbox

### 6.1 Comportement

- Clic sur un media (image, video, embed) ouvre une **modal plein ecran**.
- Fond : `bg-black/80 backdrop-blur-sm`
- Le media s'affiche centre, taille max `max-w-5xl max-h-[85vh] object-contain`
- Caption affiche en dessous du media en blanc.
- Navigation : fleches gauche/droite (boutons + touches clavier ArrowLeft/ArrowRight)
- Fermeture : clic sur le backdrop, bouton X, touche Escape
- Transition d'ouverture : fade-in + scale depuis 0.95

### 6.2 Scope de navigation

La lightbox navigue entre **tous les medias** du projet (pas seulement ceux du meme groupe). L'index courant et le total s'affichent discretement : `3 / 20`.

### 6.3 Implementation

Composant `MediaLightbox` separe, rendu dans un portal (`createPortal` vers `document.body`).

Props :
```typescript
interface MediaLightboxProps {
  items: MediaItem[];
  captions: string[];       // captions resolues (i18n)
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}
```

Gestion du focus trap et du scroll lock (`overflow-hidden` sur body quand ouvert).

### 6.4 Pas de dependance externe

Pas de lib lightbox. Le composant est simple et custom, coherent avec le DS du projet.

---

## 7. Animations d'entree

### 7.1 Staggered fade-in

Le composant `FadeInUp` existant enveloppe deja la section. Pour un effet staggered par item :

- Chaque `<figure>` recoit un `FadeInUp` individuel avec `delay={0.05 * index}` (50ms entre chaque item).
- Cap le delay max a 0.5s pour eviter que les derniers items mettent trop longtemps a apparaitre.
- Les sous-titres de groupe ont aussi un `FadeInUp` avec le delay du premier item de leur groupe.

---

## 8. Responsive

| Breakpoint | Colonnes masonry | Videos/Embeds | Lightbox |
|------------|-----------------|---------------|----------|
| < 640px    | 1               | Full width    | Full screen, pas de fleches (swipe ou tap cotes) |
| 640-1024px | 2               | Full width    | Fleches visibles |
| > 1024px   | 3               | Full width    | Fleches visibles |

Sur mobile, la lightbox prend tout l'ecran sans padding lateral. Les fleches de navigation sont remplacees par des zones de tap (moitie gauche / moitie droite de l'ecran).

---

## 9. Accessibilite

- `<figure>` + `<figcaption>` conserves pour la semantique.
- Images : `alt` descriptif (caption).
- Lightbox : focus trap, `role="dialog"`, `aria-label`, fermeture par Escape.
- Navigation lightbox : `aria-label` sur les boutons ("Image precedente", "Image suivante").
- Overlay hover : caption aussi en `<figcaption class="sr-only">` pour les lecteurs d'ecran.
- Videos : `<track kind="captions" />` conserve.

---

## 10. Fichiers impactes

| Fichier | Modification |
|---------|-------------|
| `src/data/projects.ts` | Ajouter `group?` a `MediaItem`, enrichir les donnees existantes |
| `src/pages/project-detail.tsx` | Refonte section media : flux unique, masonry, hover overlay, click lightbox |
| `src/components/MediaLightbox.tsx` | Nouveau composant lightbox |
| `src/i18n/locales/fr/projects.json` | Ajouter traductions des noms de groupes si necessaire |
| `src/i18n/locales/en/projects.json` | Idem |

Pas de nouvelle dependance npm.

---

## 11. Hors scope

- Refonte des autres sections de la page projet.
- Upload ou gestion dynamique des medias.
- Optimisation des assets (compression, formats) — les fichiers existants sont deja en WebP.
- Swipe gesture sur mobile pour la lightbox (zone de tap suffit pour V1).
