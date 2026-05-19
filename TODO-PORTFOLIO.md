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
- [x] Choisir la tagline (3 langues) — Option A retenue : "— Un peu de contexte."
- [x] Revoir les phrases rotatives (ton moins consultant, plus parcours)
- [x] Mettre a jour hero.json (fr/en/pt)

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
- [x] Deplacer la section bio avant projets dans home-page.tsx
- [x] Definir le nouveau contenu et format — timeline zig-zag avec 6 etapes + cards parallax
- [x] Reecrire les textes bio.json (fr/en/pt)
- [x] Repenser la phrase d'intro — "Un parcours atypique ? Plutot bien type, je dirais."

---

## SECTION 3 : Projets — formations + realisations

### Etat actuel (FAIT)
- [x] Heading : "Apprendre, construire, recommencer" (3 langues)
- [x] 6 projets : Luciole, POEI Mainframe, Tour de Controle, Lunetterie, Rayssa, Stella
- [x] Champ type: 'formation' | 'project' dans le modele
- [x] Separation UI formations / projets avec sous-titres phrases
- [x] Nouvelles images optimisees (webp, 3 tailles)
- [x] Traductions FR/EN/PT a jour

### Pages detail projet — Refonte (FAIT)

Structure cible par page (mini case study) :

```
1. Hero projet                    [x]
   - Titre + badge statut + annee
   - Description courte (1-2 lignes)
   - Tags technos
   - Boutons : Demo live | Code source (masques si non dispo)

2. Visuel principal               [ ] placeholders "Capture a venir" en place
   - Screenshot/mockup full-width
   - Ou video/GIF de demo embedded (si pertinent)

3. Le pourquoi                    [x]
   - Contexte / probleme a resoudre

4. Ce que j'ai construit          [x]
   - 3-4 blocs livrables cles

5. Decisions techniques           [x]
   - 2-3 choix importants expliques

6. Stack technique                [x]
   - Grille de technos avec role de chacune

7. Resultats / Chiffres           [x]
   - Metrics par projet

8. Navigation                     [x]
   - Projet precedent / suivant
   - Retour a la section projets
```

### Statut par projet

| Projet | Page detail | Contenu pret | Demo/liens |
|--------|-------------|--------------|------------|
| La Lunetterie du Coin | [x] | oui | oui (live + github) |
| Rayssa Harmes Avocate | [x] | oui | oui (live + github) |
| Luciole | [x] | oui | oui (live + github) |
| Gestionnaire clients mainframe | [x] | oui | non |
| Tour de Controle | [x] | oui (verifie depuis repo) | non |
| Stella | [x] | oui (verifie depuis repo) | non |

### Taches
- [x] Implementer le squelette page detail (project-detail.tsx)
- [x] Ajouter les champs manquants au modele (decisions, metrics, stack, deliverables)
- [x] Remplir le contenu pour chaque projet
- [x] Ajouter navigation prev/next
- [x] Traduire les nouvelles sections (fr/en/pt)
- [ ] Remplacer les placeholders galerie par de vraies captures

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
- [x] Reecrire le heading contact — "Ecris-moi un mot" (3 langues)
- [x] Ajouter les liens sociaux + email dans la section (GitHub, LinkedIn, email)
- [x] Retirer toute reference a des missions/travail ensemble

---

## SECTION 5 : Navbar — lien Blog (FAIT)

### Ce qui change
- Ajouter un lien "Blog" dans la navbar
- Placeholder pour le moment (href="#" ou URL future)
- Le blog sera un projet separe (Hashnode ou autre)

### Taches
- [x] Ajouter l'entree Blog dans la navbar
- [x] Traduire le label (3 langues) — "Blog" est probablement universel
- [x] Pointer vers un placeholder ou l'URL quand elle existe

---

## SECTION 6 : Dark mode (FAIT)

### Objectif
Toggle dark/light mode. Priorite basse, polish.

### Taches
- [x] Definir la palette dark dans tailwind.config.ts
- [x] Composant ThemeToggle (sun/moon)
- [x] localStorage + prefers-color-scheme
- [x] Adapter les composants
- [ ] Tester contraste WCAG

---

## Ordre de priorite

1. ~~**Section 1** — Hero (nouvelle tagline + phrases)~~ fait
2. ~~**Section 2** — Parcours/Bio (deplacer + refondre le contenu)~~ fait
3. ~~**Section 3** — Projets (ajouter formations, reorg, pages detail)~~ fait
4. ~~**Section 4** — Contact (simplifier)~~ fait
5. ~~**Section 5** — Navbar Blog (rapide)~~ fait
6. ~~**Section 6** — Dark mode (bonus)~~ fait

## Ce qui reste

- [ ] Galerie projets — remplacer les placeholders "Capture a venir" par de vraies captures
- [ ] Dark mode — tester contraste WCAG
- [ ] Merger feat/projects sur main + deploy Vercel

---

## Notes techniques

- Branch courante : `feat/projects` (pages detail projets)
- Deploy : Vercel (auto-deploy sur `main`)
- Scores Lighthouse > 90
- Accessibilite verifiee apres chaque ajout
- Chaque section = une session de travail dediee
- Section competences retiree de la home (sera integree dans les pages projets)
