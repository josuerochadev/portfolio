# Portfolio — josuerocha.dev — Plan de repositionnement

## Vision

Un hub perso/pro — pas un outil de vente, pas un portfolio freelance.
Objectifs : etre reference sur mon nom, montrer la polyvalence (mainframe + web + IA),
raconter un parcours atypique. Pas de recherche de clients.

Le fil rouge : le droit comme socle analytique, le web comme terrain de jeu,
le mainframe comme specialisation. La rigueur traverse tout.

Regle absolue : ne pas toucher au design, a la palette, ni aux animations. Contenu only.

---

## Contexte personnel

**Josue Rocha** — Analyste et developpeur, web et mainframe. Ancien avocat bresilien
installe a Strasbourg. Consultant mainframe en ESN (ne pas mentionner l'employeur).
Trilingue FR/EN/PT.

---

## Structure cible de la page

```
Navbar       → ajouter lien Blog (placeholder, projet separe)
Hero         → accroche identitaire, pas commerciale
Parcours/Bio → AVANT les projets — histoire + details du parcours
Projets      → formations (CDA, POEI, IA) + projets perso, nouvelle orga
Contact      → simplifie : liens sociaux + email
Footer       → inchange
```

---

## SECTION 1 : Hero — accroche

### Etat actuel
- Phrases rotatives : "a mainframe & COBOL consultant", "a full stack web developer",
  "a former lawyer turned developer", "based in Strasbourg", "passionate about code that lasts"
- Tagline : "This is my portfolio"

### Ce qui change
La tagline doit devenir quelque chose de plus personnel et meta.
Les phrases rotatives sont a revoir aussi pour coller au nouveau ton.

### Pistes pour la tagline (a trancher en session)

Option A — meta, sobre :
> "Un peu de contexte."

Option B — fil rouge, identitaire :
> "Trois mondes, un fil rouge."

Option C — direct, decontracte :
> "Bienvenue dans mon coin du web."

Option D — narrative :
> "Du droit au mainframe, en passant par le web."

### Taches
- [ ] Choisir la tagline (3 langues)
- [ ] Revoir les phrases rotatives (ton moins consultant, plus parcours)
- [ ] Mettre a jour hero.json (fr/en/pt)

---

## SECTION 2 : Parcours / Bio — la section identite

### Etat actuel
- Apres les projets, section "And more about me"
- 3 blocs : approach, background, beyond code
- Phrase d'intro : "And more about me"

### Ce qui change
- Deplacee AVANT les projets
- Contenu enrichi : plus de details sur le parcours, le fil rouge
- Phrase d'intro a repenser (plus la meme vibe que "And more about me")
- Reflechir au format : timeline, cards, blocs narratifs... a definir en session

### Pistes de contenu (a affiner en session)
- Le parcours droit au Bresil (5 ans, droit du travail / affaires)
- L'arrivee en France, la decision de pivoter
- La formation CDA (O'Clock), le declic web
- La POEI mainframe, l'entree dans le legacy
- Aujourd'hui : consultant mainframe + projets web perso
- Competences integrees dans le parcours (pas une section a part)

### Taches
- [ ] Deplacer la section bio avant projets dans home-page.tsx
- [ ] Definir le nouveau contenu et format (session dediee)
- [ ] Reecrire les textes bio.json (fr/en/pt)
- [ ] Repenser la phrase d'intro de la section

---

## SECTION 3 : Projets — formations + realisations

### Etat actuel
- 5 projets : Lunetterie, Rayssa, Luciole, Stella, Tour de Controle
- Heading : "Here's a glimpse into my work — a taste of what I can bring"
- Interface : cards avec detail

### Ce qui change
- Ajouter les formations comme projets a part : cards dediees pour les fils rouges
  - Fil rouge CDA (O'Clock) — projet de fin de formation
  - Fil rouge POEI Mainframe — projet de fin de formation
  - Formation IA (Luciole est deja la, voir si on la garde en projet ou en formation)
- Separer visuellement formations et projets perso (2 groupes ou tabs, a definir)
- Changer le heading (moins vendeur)
- Repenser l'interface des cards (session dediee)

### Pistes pour le heading (a trancher en session)
- "Ce que je construis"
- "Projets & formations"
- "En pratique"

### Taches
- [ ] Ajouter les projets fils rouges (CDA, POEI) dans projects.ts
- [ ] Decider comment organiser formations vs projets perso (session dediee)
- [ ] Changer le heading de la section (3 langues)
- [ ] Repenser l'interface des cards projet (session dediee)
- [ ] Mettre a jour projects.json (fr/en/pt)
- [ ] Creer les images pour les nouveaux projets

---

## SECTION 4 : Contact — simplifie

### Etat actuel
- "Let's work together! Or just chat"
- Illustration main
- Pas de formulaire (etait prevu avec Web3Forms, abandonne)

### Ce qui change
- Ton : pas "let's work together" (freelance) → "let's connect" ou equivalent
- Liens directs : GitHub, LinkedIn, email
- Pas de formulaire de contact oriente mission
- Garder l'illustration si elle colle

### Taches
- [ ] Reecrire le heading contact (3 langues)
- [ ] Ajouter les liens sociaux + email dans la section
- [ ] Retirer toute reference a des missions/travail ensemble

---

## SECTION 5 : Navbar — lien Blog

### Ce qui change
- Ajouter un lien "Blog" dans la navbar
- Placeholder pour le moment (href="#" ou URL future)
- Le blog sera un projet separe (Hashnode ou autre)

### Taches
- [ ] Ajouter l'entree Blog dans la navbar
- [ ] Traduire le label (3 langues) — "Blog" est probablement universel
- [ ] Pointer vers un placeholder ou l'URL quand elle existe

---

## SECTION 6 : Dark mode (bonus)

### Objectif
Toggle dark/light mode. Priorite basse, polish.

### Taches
- [ ] Definir la palette dark dans tailwind.config.ts
- [ ] Composant ThemeToggle (sun/moon)
- [ ] localStorage + prefers-color-scheme
- [ ] Adapter les composants
- [ ] Tester contraste WCAG

---

## Ordre de priorite

1. **Section 2** — Parcours/Bio (deplacer + refondre le contenu)
2. **Section 3** — Projets (ajouter formations, reorg, nouveau heading)
3. **Section 1** — Hero (nouvelle tagline + phrases)
4. **Section 4** — Contact (simplifier)
5. **Section 5** — Navbar Blog (rapide)
6. **Section 6** — Dark mode (bonus)

---

## Notes techniques

- Branch : `feat/i18n-seo-a11y-security`
- Deploy : Vercel (auto-deploy sur `main`)
- Scores Lighthouse > 90
- Accessibilite verifiee apres chaque ajout
- Chaque section = une session de travail dediee
